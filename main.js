// -------- Variables ---------
let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

let tierBreaks = [];
let editingTiers = false;
let addingTierMode = false;
let addTierIdx = null;

const fileInput = document.getElementById("fileInput");
const submitFileBtn = document.getElementById("submitFileBtn");
const removeFileBtn = document.getElementById("removeFileBtn");
const searchInput = document.getElementById("searchInput");
const tableBody = document.querySelector("#playerTable tbody");
const teamCountSelect = document.getElementById("teamCount");
const yourTeamSelect = document.getElementById("yourTeamSelect");
const myPickSelect = document.getElementById("myPickIndex");
const startDraftBtn = document.getElementById("startDraftBtn");
const currentPickDisplay = document.getElementById("currentPickDisplay");
const teamNamesContainer = document.getElementById("teamNames");

// -------- Render Table ----------
function getVisiblePlayers() {
  const keyword = searchInput.value.toLowerCase();
  const hidePicked = document.getElementById("hidePickedCheckbox").checked;
  return players.filter(player => {
    const matchesFilter = currentFilter === "ALL" || player.position === currentFilter;
    const matchesSearch = player.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch && (!hidePicked || !player.drafted);
  });
}

function renderTable() {
  const visiblePlayers = getVisiblePlayers();
  // On first render or player count change, break into even tiers of 5
  if (!Array.isArray(tierBreaks) || tierBreaks.length === 0 || tierBreaks[tierBreaks.length-1] !== visiblePlayers.length) {
    const n = visiblePlayers.length;
    let breaks = [0];
    for (let i = 5; i < n; i += 5) breaks.push(i);
    breaks.push(n);
    tierBreaks = breaks;
  }
  tierBreaks = tierBreaks.filter(b => b >= 0 && b <= visiblePlayers.length);
  if (tierBreaks[0] !== 0) tierBreaks.unshift(0);
  if (tierBreaks[tierBreaks.length-1] !== visiblePlayers.length) tierBreaks.push(visiblePlayers.length);

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  for (let t = 0; t < tierBreaks.length - 1; t++) {
    // ---- Slim blue tier line ----
    let tierLabel = `Tier ${t + 1}`;
    // Blue slim line with right label
    const trDivider = document.createElement("tr");
    trDivider.className = "tier-divider-tr";
    const tdDivider = document.createElement("td");
    tdDivider.className = "tier-divider-td";
    tdDivider.colSpan = 6;

    const tierLine = document.createElement("div");
    tierLine.className = "tier-divider-line";
    // Label (now at right side of bar)
    const label = document.createElement("span");
    label.className = "tier-divider-label";
    label.textContent = tierLabel;

    // Controls: only in edit mode, not for Tier 1 (locked)
    if (editingTiers && t > 0) {
      const controls = document.createElement("span");
      controls.className = "tier-divider-controls";
      // Up
      const upBtn = document.createElement("button");
      upBtn.title = "Move tier up";
      upBtn.innerHTML = "↑";
      upBtn.onclick = e => { e.stopPropagation(); moveTier(t, -1); };
      upBtn.disabled = t <= 1;
      controls.appendChild(upBtn);
      // Down
      const downBtn = document.createElement("button");
      downBtn.title = "Move tier down";
      downBtn.innerHTML = "↓";
      downBtn.onclick = e => { e.stopPropagation(); moveTier(t, 1); };
      downBtn.disabled = t >= tierBreaks.length - 2;
      controls.appendChild(downBtn);
      // Remove (red X)
      const delBtn = document.createElement("button");
      delBtn.title = "Delete this tier";
      delBtn.className = "remove-tier-btn";
      delBtn.innerHTML = "×";
      delBtn.onclick = e => { e.stopPropagation(); removeTier(t); };
      controls.appendChild(delBtn);
      tierLine.appendChild(controls);
    }
    tierLine.appendChild(label); // label to the right
    tdDivider.appendChild(tierLine);
    trDivider.appendChild(tdDivider);
    tableBody.appendChild(trDivider);

    // --- Add tier insert bar (in add-tier mode, edit only) ---
    if (editingTiers && addingTierMode && t < tierBreaks.length - 2) {
      const trAddBar = document.createElement("tr");
      trAddBar.className = "add-tier-bar-row";
      const tdAddBar = document.createElement("td");
      tdAddBar.className = "add-tier-bar";
      tdAddBar.colSpan = 6;
      const greyLine = document.createElement("div");
      greyLine.className = "add-tier-line";
      tdAddBar.appendChild(greyLine);
      const plus = document.createElement("span");
      plus.className = "add-tier-plus";
      plus.innerHTML = "+";
      tdAddBar.appendChild(plus);
      trAddBar.onmouseenter = () => {
        addTierIdx = t + 1;
        tdAddBar.style.background = "#f5f7fa";
        greyLine.style.background = "#1976d2";
        plus.style.background = "#1976d2";
        plus.style.color = "#fff";
        plus.style.borderColor = "#1976d2";
      };
      trAddBar.onmouseleave = () => {
        addTierIdx = null;
        tdAddBar.style.background = "";
        greyLine.style.background = "#bbb";
        plus.style.background = "#fff";
        plus.style.color = "#1976d2";
        plus.style.borderColor = "#1976d2";
      };
      tdAddBar.onclick = () => {
        insertTier(t + 1);
        addTierIdx = null;
      };
      trAddBar.appendChild(tdAddBar);
      tableBody.appendChild(trAddBar);
    }

    // ---- Player rows for this tier ----
    for (let i = tierBreaks[t]; i < tierBreaks[t+1]; i++) {
      const player = visiblePlayers[i];
      const tr = document.createElement("tr");
      tr.classList.add(player.position);

      if (player.drafted) tr.classList.add("strikethrough");
      if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
      if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");

      // Checkbox cell
      const cbCell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = player.drafted;
      cb.dataset.id = player.id;
      cb.addEventListener("change", () => { toggleDrafted(player.id); });
      cbCell.appendChild(cb);

      // Number cell (ranking, 1-based by visiblePlayers)
      const numCell = document.createElement("td");
      numCell.textContent = i + 1;

      // Edit controls (edit only, move up/down)
      const controlCell = document.createElement("td");
      if (editingTiers) {
        // up/down arrows
        const up = document.createElement("button");
        up.className = "player-tier-arrow";
        up.innerHTML = "▲";
        up.title = "Move player up";
        up.disabled = i === 0 || i === tierBreaks[t];
        up.onclick = e => { e.stopPropagation(); movePlayer(i, -1); };
        controlCell.appendChild(up);
        const down = document.createElement("button");
        down.className = "player-tier-arrow";
        down.innerHTML = "▼";
        down.title = "Move player down";
        down.disabled = i === visiblePlayers.length - 1 || i === tierBreaks[t+1] - 1;
        down.onclick = e => { e.stopPropagation(); movePlayer(i, 1); };
        controlCell.appendChild(down);
      }

      // Name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;

      // Position, Drafted By
      const posCell = document.createElement("td");
      posCell.textContent = player.position;
      const draftedByCell = document.createElement("td");
      draftedByCell.textContent = player.draftedBy || "";

      tr.appendChild(cbCell);
      tr.appendChild(numCell);
      tr.appendChild(controlCell);
      tr.appendChild(nameCell);
      tr.appendChild(posCell);
      tr.appendChild(draftedByCell);

      tableBody.appendChild(tr);

      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }
}

// -------- Tier Move/Insert/Remove --------
function moveTier(idx, direction) {
  // direction: -1 for up, +1 for down
  if (idx <= 0 || idx >= tierBreaks.length - 1) return; // Tier 1 stuck at top
  const swapIdx = idx + direction;
  if (swapIdx <= 0 || swapIdx >= tierBreaks.length - 1) return;
  const tmp = tierBreaks[idx];
  tierBreaks[idx] = tierBreaks[swapIdx];
  tierBreaks[swapIdx] = tmp;
  tierBreaks.sort((a, b) => a - b);
  saveAll();
  renderTable();
}

function insertTier(idx) {
  if (idx <= 0 || idx >= tierBreaks.length) return;
  // Place at mid-point between breaks
  const prev = tierBreaks[idx - 1];
  const next = tierBreaks[idx];
  if (next - prev < 2) return; // must have at least 1 player above and below
  const newBreak = prev + Math.ceil((next - prev) / 2);
  if (!tierBreaks.includes(newBreak)) {
    tierBreaks.push(newBreak);
    tierBreaks.sort((a, b) => a - b);
    saveAll();
    renderTable();
  }
}

function removeTier(idx) {
  if (idx <= 0 || idx >= tierBreaks.length - 1) return; // Can't remove Tier 1 or last
  tierBreaks.splice(idx, 1);
  saveAll();
  renderTable();
}

function movePlayer(i, dir) {
  // dir: -1 (up), +1 (down)
  if (i + dir < 0 || i + dir >= players.length) return;
  // Move in main players array, so ordering is persistent
  const idx = players.findIndex(p => p.id === getVisiblePlayers()[i].id);
  if (idx < 0 || idx + dir < 0 || idx + dir >= players.length) return;
  const temp = players[idx];
  players[idx] = players[idx + dir];
  players[idx + dir] = temp;
  saveAll();
  renderTable();
}

// --------- Edit Toggle -----------
document.getElementById('editTiersBtn').addEventListener('click', function() {
  editingTiers = !editingTiers;
  addingTierMode = false;
  this.textContent = editingTiers ? "Done Editing" : "Edit Tiers";
  renderTable();
});
document.getElementById('addTierModeBtn').addEventListener('click', function() {
  addingTierMode = !addingTierMode;
  renderTable();
});

// --------- Other unchanged logic ---------
// ...The rest of your fantasy draft, file, and draft management code goes here...
// (no change to player drafting, file load, search, team selection, etc.)

// --------- INIT -----------
populateTeamCountOptions();
generateTeamNameInputs();
loadAll();
renderTable();
updateCurrentPickDisplay();
validateStartDraftButton();

submitFileBtn.addEventListener("click", handleFileSubmit);
removeFileBtn.addEventListener("click", removePlayerFile);
searchInput.addEventListener("input", renderTable);
fileInput.addEventListener("change", () => {
  fileInput.classList.remove("error");
  submitFileBtn.classList.remove("error");
  validateStartDraftButton();
});

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "DRAFTED_PLAYERS") {
    const picks = event.data.payload;
    picks.forEach(pickedName => {
      const rows = document.querySelectorAll("#playerTable tbody tr");
      for (const row of rows) {
        const nameCell = row.cells[3];
        if (nameCell && nameCell.textContent.trim().toLowerCase().includes(pickedName.toLowerCase())) {
          const checkbox = row.querySelector("input[type='checkbox']");
          if (checkbox && !checkbox.checked) {
            checkbox.click();
          }
          break;
        }
      }
    });
  }
});
