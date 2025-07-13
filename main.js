let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

let tierBreaks = [];
let editingTiers = false;
let addingTierMode = false;
let addTierIdx = null; // Used to highlight add location

// -- Grabbing DOM elements --
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
const addTierModeBtn = document.getElementById("addTierModeBtn");
const cancelAddTierBtn = document.getElementById("cancelAddTierBtn");

// ---- Table and Tiers ----
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
    // Blue slim line with left label
    const trDivider = document.createElement("tr");
    trDivider.className = "tier-divider-tr";
    const tdDivider = document.createElement("td");
    tdDivider.className = "tier-divider-td";
    tdDivider.colSpan = 6;

    const tierLine = document.createElement("div");
    tierLine.className = "tier-divider-line";
    // Label
    const label = document.createElement("span");
    label.className = "tier-divider-label";
    label.textContent = tierLabel;
    tierLine.appendChild(label);

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
      downBtn.disabled = t === tierBreaks.length - 2;
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
      // Grey line + plus
      const greyLine = document.createElement("div");
      greyLine.className = "add-tier-line";
      tdAddBar.appendChild(greyLine);
      const plus = document.createElement("span");
      plus.className = "add-tier-plus";
      plus.innerHTML = "+";
      tdAddBar.appendChild(plus);

      // Highlight when hovered
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
// ---- Tier Editing Logic ----
function enterEditMode() {
  editingTiers = true;
  editTiersBtn.style.display = "none";
  doneTiersBtn.style.display = "";
  addTierModeBtn.style.display = "";
  cancelAddTierBtn.style.display = addingTierMode ? "" : "none";
  renderTable();
}
function exitEditMode() {
  editingTiers = false;
  addingTierMode = false;
  addTierIdx = null;
  editTiersBtn.style.display = "";
  doneTiersBtn.style.display = "none";
  addTierModeBtn.style.display = "none";
  cancelAddTierBtn.style.display = "none";
  renderTable();
}
function movePlayer(i, dir) {
  const visiblePlayers = getVisiblePlayers();
  if (i + dir < 0 || i + dir >= visiblePlayers.length) return;
  // Swap players
  const a = players.findIndex(p => p.id === visiblePlayers[i].id);
  const b = players.findIndex(p => p.id === visiblePlayers[i + dir].id);
  if (a < 0 || b < 0) return;
  [players[a], players[b]] = [players[b], players[a]];
  renderTable();
}
function moveTier(t, dir) {
  // Can't move tier 1 (t == 0)
  if (t <= 0 || t >= tierBreaks.length - 1) return;
  const swapWith = t + dir;
  if (swapWith <= 0 || swapWith >= tierBreaks.length - 1) return;
  // Swap the breaks
  [tierBreaks[t], tierBreaks[swapWith]] = [tierBreaks[swapWith], tierBreaks[t]];
  tierBreaks = [...tierBreaks].sort((a,b)=>a-b);
  renderTable();
}
function removeTier(t) {
  if (t <= 0 || t >= tierBreaks.length - 1) return; // Can't remove tier 1 or last
  tierBreaks.splice(t, 1);
  renderTable();
}
function insertTier(t) {
  // t is insert after break t-1, before t
  const visiblePlayers = getVisiblePlayers();
  // Can't insert before Tier 1 or after last
  if (t <= 0 || t >= tierBreaks.length) return;
  const prev = tierBreaks[t-1], next = tierBreaks[t];
  const mid = Math.floor((prev + next)/2);
  // If there's no space, don't insert
  if (next - prev < 2) return;
  tierBreaks.splice(t, 0, mid);
  addingTierMode = false;
  addTierIdx = null;
  exitAddTierMode();
  renderTable();
}
function enterAddTierMode() {
  addingTierMode = true;
  addTierModeBtn.style.display = "none";
  cancelAddTierBtn.style.display = "";
  renderTable();
}
function exitAddTierMode() {
  addingTierMode = false;
  addTierModeBtn.style.display = "";
  cancelAddTierBtn.style.display = "none";
  addTierIdx = null;
  renderTable();
}

// -- Event Listeners for edit controls --
editTiersBtn.onclick = enterEditMode;
doneTiersBtn.onclick = exitEditMode;
addTierModeBtn.onclick = enterAddTierMode;
cancelAddTierBtn.onclick = exitAddTierMode;

// ---- Original team/draft logic below ----
function populateTeamCountOptions() {
  const options = [10, 8, 12, 14];
  teamCountSelect.innerHTML = "";
  options.forEach(num => {
    const option = document.createElement("option");
    option.value = num;
    option.textContent = num;
    teamCountSelect.appendChild(option);
  });
}
function generateTeamNameInputs() {
  const teamCount = parseInt(teamCountSelect.value, 10);
  teamNamesContainer.innerHTML = "";
  for (let i = 0; i < teamCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `teamName${i}`;
    input.placeholder = `Team ${i + 1}`;
    input.value = teamNames[i] || "";
    input.addEventListener("input", () => {
      teamNames[i] = input.value.trim();
      syncYourTeamSelectOptions();
      saveAll();
      validateStartDraftButton();
    });
    teamNamesContainer.appendChild(input);
    teamNamesContainer.appendChild(document.createElement("br"));
  }
}
function syncYourTeamSelectOptions() {
  const prevValue = yourTeamSelect.value;
  yourTeamSelect.innerHTML = '<option value="" disabled selected>-- Select Team --</option>';
  teamNames = teamNames.map(name => name.trim());
  const teamCount = parseInt(teamCountSelect.value, 10);

  for (let i = 0; i < teamCount; i++) {
    const name = teamNames[i] || "";
    if (name) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = name;
      yourTeamSelect.appendChild(option);
    }
  }

  if (!yourTeamSelect.querySelector(`option[value="${prevValue}"]`)) {
    yourTeamSelect.value = "";
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
  } else {
    yourTeamSelect.value = prevValue;
    if (prevValue !== "") {
      myTeamIndex = parseInt(prevValue, 10);
      myPickSelect.innerHTML = "";
      const option = document.createElement("option");
      option.value = myTeamIndex + 1;
      option.textContent = myTeamIndex + 1;
      myPickSelect.appendChild(option);
      myPickSelect.value = option.value;
      myPickSelect.disabled = true;
    }
  }
}
yourTeamSelect.addEventListener("change", () => {
  const val = yourTeamSelect.value;
  if (val === "") {
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
  } else {
    myTeamIndex = parseInt(val, 10);
    myPickSelect.innerHTML = "";
    const option = document.createElement("option");
    option.value = myTeamIndex + 1;
    option.textContent = myTeamIndex + 1;
    myPickSelect.appendChild(option);
    myPickSelect.value = option.value;
    myPickSelect.disabled = true;
  }
  saveAll();
  renderTable();
  validateStartDraftButton();
});
teamCountSelect.addEventListener("change", () => {
  saveAll();
  generateTeamNameInputs();
  syncYourTeamSelectOptions();
  validateStartDraftButton();
});

function filterByPosition(pos) { currentFilter = pos; renderTable(); }
function resetAll() {
  if (!confirm("Are you sure you want to reset everything?")) return;
  players = players.map(p => ({ ...p, drafted: false, draftedBy: null, pickNumber: null }));
  currentPick = 0;
  draftOrder = [];
  teamNames = [];
  myTeamIndex = -1;
  teamCountSelect.value = "10";
  yourTeamSelect.value = "";
  myPickSelect.innerHTML = "";
  myPickSelect.disabled = true;
  startDraftBtn.disabled = true;
  localStorage.clear();
  generateTeamNameInputs();
  renderTable();
  updateCurrentPickDisplay();
  clearFileInput();
}
function handleFileSubmit() {
  if (!fileInput.files.length) {
    alert("Please select a player file before submitting.");
    fileInput.classList.add("error");
    return;
  }
  fileInput.classList.remove("error");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split("\n").filter(line => line.trim());
    players = lines.map((line, index) => {
      const parts = line.trim().split(/\s+/);
      const tag = parts.pop();
      const name = parts.join(" ");
      let position = "OTHER";
      if (tag) {
        if (tag.includes("RB")) position = "RB";
        else if (tag.includes("WR")) position = "WR";
        else if (tag.includes("QB")) position = "QB";
        else if (tag.includes("TE")) position = "TE";
      }
      return { id: index + 1, name, tag, position, drafted: false, draftedBy: null, pickNumber: null };
    }).filter(p => p.name && p.tag);

    currentPick = 0;
    draftOrder = [];
    tierBreaks = [];
    saveAll();
    renderTable();
    updateCurrentPickDisplay();
    removeFileBtn.disabled = false;
    validateStartDraftButton();
  };
  reader.readAsText(file);
}
function removePlayerFile() {
  players = [];
  draftOrder = [];
  currentPick = 0;
  tierBreaks = [];
  saveAll();
  renderTable();
  updateCurrentPickDisplay();
  clearFileInput();
  removeFileBtn.disabled = true;
  validateStartDraftButton();
}
function clearFileInput() { fileInput.value = ""; }
function validateStartDraftButton() {
  let valid = true;
  fileInput.classList.remove("error");
  submitFileBtn.classList.remove("error");
  startDraftBtn.classList.remove("error");
  yourTeamSelect.classList.remove("error");
  const teamCount = parseInt(teamCountSelect.value, 10);
  let teamsValid = true;
  for (let i = 0; i < teamCount; i++) {
    const input = document.getElementById(`teamName${i}`);
    if (!input || input.value.trim() === "") {
      input?.classList.add("error");
      teamsValid = false;
      valid = false;
    } else {
      input.classList.remove("error");
    }
  }
  if (!teamsValid) valid = false;
  if (yourTeamSelect.value === "" || yourTeamSelect.value === null) {
    yourTeamSelect.classList.add("error");
    valid = false;
  } else {
    yourTeamSelect.classList.remove("error");
  }
  if (players.length === 0) {
    fileInput.classList.add("error");
    submitFileBtn.classList.add("error");
    valid = false;
  } else {
    fileInput.classList.remove("error");
    submitFileBtn.classList.remove("error");
  }
  startDraftBtn.disabled = !valid;
}
function setupDraft() {
  validateStartDraftButton();
  if (startDraftBtn.disabled) {
    alert("Please fix the highlighted errors before starting the draft.");
    return;
  }
  const namesSet = new Set();
  for (const name of teamNames) {
    if (!name) { alert("All teams must have a name."); return; }
    if (namesSet.has(name.toLowerCase())) {
      alert("Team names must be unique."); return;
    }
    namesSet.add(name.toLowerCase());
  }
  const teamCount = parseInt(teamCountSelect.value, 10);
  draftOrder = [];
  let forward = true;
  for (let round = 0; round < 20; round++) {
    const roundOrder = Array.from({ length: teamCount }, (_, i) => i);
    draftOrder.push(...(forward ? roundOrder : roundOrder.reverse()));
    forward = !forward;
  }
  if (currentPick >= draftOrder.length) currentPick = 0;
  updateCurrentPickDisplay();
  saveAll();
  renderTable();
}
function updateCurrentPickDisplay() {
  if (currentPick >= draftOrder.length) {
    currentPickDisplay.textContent = "Draft Complete!";
    startDraftBtn.disabled = true;
    return;
  }
  const teamIndex = draftOrder[currentPick];
  const teamName = teamNames[teamIndex] || "";
  currentPickDisplay.textContent = `Pick ${currentPick + 1} - ${teamName}`;
}
function toggleDrafted(id) {
  const player = players.find(p => p.id === id);
  if (!player) return;
  if (!player.drafted) {
    if (currentPick >= draftOrder.length) { alert("All picks completed!"); return; }
    player.drafted = true;
    const teamIndex = draftOrder[currentPick];
    player.draftedBy = teamNames[teamIndex];
    player.pickNumber = currentPick + 1;
    currentPick++;
  } else {
    if (player.pickNumber === currentPick) {
      player.drafted = false;
      player.draftedBy = null;
      player.pickNumber = null;
      currentPick--;
    } else if (player.pickNumber < currentPick) {
      alert("You can only undo the most recent pick.");
      return;
    }
  }
  updateCurrentPickDisplay();
  saveAll();
  renderTable();
}
function saveAll() {
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("teamNames", JSON.stringify(teamNames));
  localStorage.setItem("draftOrder", JSON.stringify(draftOrder));
  localStorage.setItem("currentPick", currentPick);
  localStorage.setItem("myTeamIndex", myTeamIndex);
  localStorage.setItem("teamCount", teamCountSelect.value);
  localStorage.setItem("yourTeamSelect", yourTeamSelect.value);
  localStorage.setItem("tierBreaks", JSON.stringify(tierBreaks));
}
function loadAll() {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) players = JSON.parse(storedPlayers);
  const storedTeamNames = localStorage.getItem("teamNames");
  if (storedTeamNames) teamNames = JSON.parse(storedTeamNames);
  const storedDraftOrder = localStorage.getItem("draftOrder");
  if (storedDraftOrder) draftOrder = JSON.parse(storedDraftOrder);
  const storedCurrentPick = localStorage.getItem("currentPick");
  if (storedCurrentPick) currentPick = parseInt(storedCurrentPick, 10);
  const storedMyTeamIndex = localStorage.getItem("myTeamIndex");
  if (storedMyTeamIndex) myTeamIndex = parseInt(storedMyTeamIndex, 10);
  const storedTeamCount = localStorage.getItem("teamCount");
  if (storedTeamCount) teamCountSelect.value = storedTeamCount;
  else teamCountSelect.value = "10";
  const storedTierBreaks = localStorage.getItem("tierBreaks");
  if (storedTierBreaks) tierBreaks = JSON.parse(storedTierBreaks);
  generateTeamNameInputs();
  for (let i = 0; i < teamNames.length; i++) {
    const input = document.getElementById(`teamName${i}`);
    if (input) input.value = teamNames[i] || "";
  }
  syncYourTeamSelectOptions();
  if (myTeamIndex >= 0 && yourTeamSelect.querySelector(`option[value="${myTeamIndex}"]`)) {
    yourTeamSelect.value = myTeamIndex;
    myPickSelect.innerHTML = "";
    const option = document.createElement("option");
    option.value = myTeamIndex + 1;
    option.textContent = myTeamIndex + 1;
    myPickSelect.appendChild(option);
    myPickSelect.value = option.value;
    myPickSelect.disabled = true;
    startDraftBtn.disabled = false;
  } else {
    yourTeamSelect.value = "";
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
    startDraftBtn.disabled = true;
  }
}
// --- INIT ---
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
