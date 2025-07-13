let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

let tierBreaks = [];
let editingTiers = false; // new: edit mode flag

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
  // Remove any breaks out of bounds
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

      // Name
      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      if (tr.classList.contains("recent-pick")) {
        const pickNumberBox = document.createElement("span");
        pickNumberBox.className = "pick-number-box";
        pickNumberBox.textContent = `Pick ${player.pickNumber}`;
        nameCell.appendChild(pickNumberBox);
      }

      // Up/down arrows for player ranking
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

      // Add the arrows into a cell
      const arrowCell = document.createElement("td");
      arrowCell.appendChild(upArrow);
      arrowCell.appendChild(downArrow);

      // Position
      const posCell = document.createElement("td");
      posCell.textContent = player.position;

      // Drafted By
      const draftedByCell = document.createElement("td");
      draftedByCell.textContent = player.draftedBy || "";

      // Row construction
      tr.appendChild(cbCell);
      tr.appendChild(numCell);
      tr.appendChild(arrowCell);
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

function toggleDrafted(id) {
  const player = players.find(p => p.id === id);
  if (!player) return;

  if (!player.drafted) {
    if (currentPick >= draftOrder.length) {
      alert("All picks completed!");
      return;
    }
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

function filterByPosition(pos) {
  currentFilter = pos;
  renderTable();
}

function resetAll() {
  if (!confirm("Are you sure you want to reset everything?")) return;
  players = players.map(p => ({
    ...p,
    drafted: false,
    draftedBy: null,
    pickNumber: null,
  }));
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
      return {
        id: index + 1,
        name,
        tag,
        position,
        drafted: false,
        draftedBy: null,
        pickNumber: null,
      };
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

function clearFileInput() {
  fileInput.value = "";
}

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

// ESPN integration stays unchanged
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
