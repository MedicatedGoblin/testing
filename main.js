let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

let tierBreaks = [];
let editingTiers = false;

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
const editTiersBtn = document.getElementById("editTiersBtn");
const doneTiersBtn = document.getElementById("doneTiersBtn");

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

  // If no tierBreaks or number of players changed, initialize evenly
  if (!Array.isArray(tierBreaks) || tierBreaks.length === 0 || tierBreaks[tierBreaks.length-1] !== visiblePlayers.length) {
    const n = visiblePlayers.length;
    const defaultBreaks = [];
    for (let i = 0; i < n; i += 5) defaultBreaks.push(i);
    if (defaultBreaks[defaultBreaks.length - 1] !== n) defaultBreaks.push(n);
    tierBreaks = defaultBreaks;
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
    // Draw tier bar
    const tierRow = document.createElement("tr");
    tierRow.className = "tier-divider-tr" + (editingTiers ? " editing" : "");
    const tierTd = document.createElement("td");
    tierTd.colSpan = 6;
    tierTd.className = "tier-divider-td";
    // Tier label
    const label = document.createElement("span");
    label.className = "tier-divider-label";
    label.textContent = `TIER ${t+1}`;
    tierTd.appendChild(label);

    // Remove button (not for Tier 1), only show in edit mode
    if (editingTiers && t > 0) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-tier-btn";
      removeBtn.title = "Remove this tier";
      removeBtn.innerHTML = "&#10005;";
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        removeTierAt(t);
      };
      tierTd.appendChild(removeBtn);
    }
    tierRow.appendChild(tierTd);
    tableBody.appendChild(tierRow);

    // Draw player rows in this tier
    for (let i = tierBreaks[t]; i < tierBreaks[t+1]; i++) {
      if (i >= visiblePlayers.length) continue;
      const player = visiblePlayers[i];
      const tr = document.createElement("tr");
      tr.classList.add(player.position);
      if (player.drafted) tr.classList.add("strikethrough");
      if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
      if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");

      // --- TABLE CELLS ---
      // Checkbox
      const cbCell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = player.drafted;
      cb.dataset.id = player.id;
      cb.addEventListener("change", () => { toggleDrafted(player.id); });
      cbCell.appendChild(cb);

      // Number
      const numCell = document.createElement("td");
      numCell.textContent = (i+1);

      // Up/down arrows for player ranking (ONLY in edit mode)
      const arrowCell = document.createElement("td");
      if (editingTiers) {
        const upArrow = document.createElement("button");
        upArrow.innerHTML = "&#8593;";
        upArrow.className = "player-tier-arrow";
        upArrow.title = "Move player up";
        upArrow.disabled = (i === 0 || i === tierBreaks[t]);
        upArrow.onclick = (e) => { e.stopPropagation(); movePlayer(i, i-1); };

        const downArrow = document.createElement("button");
        downArrow.innerHTML = "&#8595;";
        downArrow.className = "player-tier-arrow";
        downArrow.title = "Move player down";
        downArrow.disabled = (i === visiblePlayers.length-1 || i === tierBreaks[t+1]-1);
        downArrow.onclick = (e) => { e.stopPropagation(); movePlayer(i, i+1); };

        arrowCell.appendChild(upArrow);
        arrowCell.appendChild(downArrow);
      }

      // Name
      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      if (tr.classList.contains("recent-pick")) {
        const pickNumberBox = document.createElement("span");
        pickNumberBox.className = "pick-number-box";
        pickNumberBox.textContent = `Pick ${player.pickNumber}`;
        nameCell.appendChild(pickNumberBox);
      }

      // Position
      const posCell = document.createElement("td");
      posCell.textContent = player.position;

      // Drafted By
      const draftedByCell = document.createElement("td");
      draftedByCell.textContent = player.draftedBy || "";

      // Row construction
      tr.appendChild(cbCell);
      tr.appendChild(numCell);
      tr.appendChild(arrowCell); // always the third col, empty unless editing
      tr.appendChild(nameCell);
      tr.appendChild(posCell);
      tr.appendChild(draftedByCell);

      tr.addEventListener("dblclick", () => { toggleDrafted(player.id); });
      tableBody.appendChild(tr);

      // My picks panel
      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }

      // --- ADD TIER BAR ---
      if (editingTiers && !(t === tierBreaks.length-2 && i === tierBreaks[t+1]-1)) {
        const addTierTr = document.createElement("tr");
        addTierTr.className = "add-tier-row";
        const addTierTd = document.createElement("td");
        addTierTd.colSpan = 6;
        const addTierBar = document.createElement("div");
        addTierBar.className = "add-tier-bar editing";
        addTierBar.innerHTML = `<span class="add-tier-label">&#43; Add Tier Here</span>`;
        addTierBar.onclick = (e) => { e.stopPropagation(); insertTierAt(i+1); };
        addTierTd.appendChild(addTierBar);
        addTierTr.appendChild(addTierTd);
        tableBody.appendChild(addTierTr);
      }
    }
  }
}

function insertTierAt(idx) {
  if (!tierBreaks.includes(idx) && idx > 0 && idx < getVisiblePlayers().length) {
    tierBreaks.push(idx);
    tierBreaks.sort((a,b) => a-b);
    renderTable();
  }
}
function removeTierAt(tierIdx) {
  if (tierIdx === 0) return;
  tierBreaks.splice(tierIdx, 1);
  renderTable();
}
function movePlayer(fromIdx, toIdx) {
  if (toIdx < 0 || toIdx >= getVisiblePlayers().length) return;
  const visible = getVisiblePlayers();
  const fromPlayer = visible[fromIdx];
  const toPlayer = visible[toIdx];
  const fromGlobal = players.findIndex(p => p.id === fromPlayer.id);
  const toGlobal = players.findIndex(p => p.id === toPlayer.id);
  [players[fromGlobal], players[toGlobal]] = [players[toGlobal], players[fromGlobal]];
  renderTable();
}

// ...all your unchanged code below remains the same...

function toggleDrafted(id) { /* ... as before ... */ }
function saveAll() { /* ... as before ... */ }
function loadAll() { /* ... as before ... */ }
function filterByPosition(pos) { currentFilter = pos; renderTable(); }
function resetAll() { /* ... as before ... */ }
function handleFileSubmit() { /* ... as before ... */ }
function removePlayerFile() { /* ... as before ... */ }
function clearFileInput() { fileInput.value = ""; }
function populateTeamCountOptions() { /* ... as before ... */ }
function generateTeamNameInputs() { /* ... as before ... */ }
function syncYourTeamSelectOptions() { /* ... as before ... */ }
yourTeamSelect.addEventListener("change", () => { /* ... as before ... */ });
teamCountSelect.addEventListener("change", () => { /* ... as before ... */ });
function validateStartDraftButton() { /* ... as before ... */ }
function updateCurrentPickDisplay() { /* ... as before ... */ }

// ---- INIT ----
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

// TIER EDIT BUTTONS
editTiersBtn.addEventListener("click", () => {
  editingTiers = true;
  editTiersBtn.style.display = "none";
  doneTiersBtn.style.display = "";
  renderTable();
});
doneTiersBtn.addEventListener("click", () => {
  editingTiers = false;
  editTiersBtn.style.display = "";
  doneTiersBtn.style.display = "none";
  renderTable();
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
