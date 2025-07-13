let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

// Tier breaks: sorted array of indexes AFTER WHICH the tier break goes
let tierBreaks = [];

const fileInput = document.getElementById("fileInput");
const submitFileBtn = document.getElementById("submitFileBtn");
const removeFileBtn = document.getElementById("removeFileBtn");
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tierTableBody") || document.querySelector("#playerTable tbody");
const teamCountSelect = document.getElementById("teamCount");
const yourTeamSelect = document.getElementById("yourTeamSelect");
const myPickSelect = document.getElementById("myPickIndex");
const startDraftBtn = document.getElementById("startDraftBtn");
const currentPickDisplay = document.getElementById("currentPickDisplay");
const teamNamesContainer = document.getElementById("teamNames");

function getVisiblePlayers() {
  const keyword = searchInput.value.toLowerCase();
  const hidePicked = document.getElementById("hidePickedCheckbox").checked;
  return players
    .filter(player => {
      const matchesFilter = currentFilter === "ALL" || player.position === currentFilter;
      const matchesSearch = player.name.toLowerCase().includes(keyword);
      return matchesFilter && matchesSearch && (!hidePicked || !player.drafted);
    });
}

function getTierIndex(playerIdx) {
  // Returns tier number (1-based) for player at index playerIdx
  if (tierBreaks.length === 0) return 1;
  let tier = 1;
  for (let i = 0; i < tierBreaks.length; i++) {
    if (playerIdx > tierBreaks[i]) tier++;
    else break;
  }
  return tier;
}

function renderTable() {
  const visiblePlayers = getVisiblePlayers();
  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  // Always show a "+" above the first player
  renderPlusRow(0, visiblePlayers);

  let tierIdx = 1;
  for (let i = 0; i < visiblePlayers.length; i++) {
    // If there's a tier break BEFORE this player, insert divider
    if (tierBreaks.includes(i - 1)) {
      renderTierDivider(tierIdx + 1, i);
      tierIdx++;
    }

    // Render player row
    const player = visiblePlayers[i];
    const tr = document.createElement("tr");
    tr.classList.add(player.position);
    if (player.drafted) tr.classList.add("strikethrough");
    if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
    if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");
    tr.addEventListener("dblclick", () => {
      toggleDrafted(player.id);
    });

    // Checkbox
    const cbCell = document.createElement("td");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = player.drafted;
    cb.dataset.id = player.id;
    cb.addEventListener("change", () => {
      toggleDrafted(player.id);
    });
    cbCell.appendChild(cb);

    // Number - show LIVE BOARD number (not player.id)
    const numCell = document.createElement("td");
    numCell.textContent = i + 1; // <--- live row number!

    // Name & arrows
    const nameCell = document.createElement("td");
    nameCell.textContent = player.name;
    if (tr.classList.contains("recent-pick")) {
      const pickNumberBox = document.createElement("span");
      pickNumberBox.className = "pick-number-box";
      pickNumberBox.textContent = `Pick ${player.pickNumber}`;
      nameCell.appendChild(pickNumberBox);
    }

    // Up/down movement
    const arrowUp = document.createElement("button");
    arrowUp.textContent = "▲";
    arrowUp.className = "player-tier-arrow";
    arrowUp.disabled = i === 0;
    arrowUp.onclick = (e) => {
      e.stopPropagation();
      if (i > 0) {
        // swap in full players array (not visiblePlayers)
        const idx1 = players.indexOf(visiblePlayers[i]);
        const idx2 = players.indexOf(visiblePlayers[i - 1]);
        if (idx1 !== -1 && idx2 !== -1) {
          [players[idx1], players[idx2]] = [players[idx2], players[idx1]];
          saveAll();
          renderTable();
        }
      }
    };

    const arrowDown = document.createElement("button");
    arrowDown.textContent = "▼";
    arrowDown.className = "player-tier-arrow";
    arrowDown.disabled = i === visiblePlayers.length - 1;
    arrowDown.onclick = (e) => {
      e.stopPropagation();
      if (i < visiblePlayers.length - 1) {
        // swap in full players array (not visiblePlayers)
        const idx1 = players.indexOf(visiblePlayers[i]);
        const idx2 = players.indexOf(visiblePlayers[i + 1]);
        if (idx1 !== -1 && idx2 !== -1) {
          [players[idx1], players[idx2]] = [players[idx2], players[idx1]];
          saveAll();
          renderTable();
        }
      }
    };

    nameCell.prepend(arrowDown);
    nameCell.prepend(arrowUp);

    // Position, Drafted By
    const posCell = document.createElement("td");
    posCell.textContent = player.position;
    const draftedByCell = document.createElement("td");
    draftedByCell.textContent = player.draftedBy || "";

    tr.appendChild(cbCell);
    tr.appendChild(numCell);
    tr.appendChild(nameCell);
    tr.appendChild(posCell);
    tr.appendChild(draftedByCell);

    tableBody.appendChild(tr);

    // "My picks" lists
    if (player.draftedBy === teamNames[myTeamIndex]) {
      const li = document.createElement("li");
      li.textContent = `${player.name} (${player.tag})`;
      document.getElementById("my" + player.position).appendChild(li);
    }

    // Always show "+" between every row
    renderPlusRow(i + 1, visiblePlayers);
  }
}

function renderPlusRow(idx, visiblePlayers) {
  // Don't render plus if already a break after idx-1 (or before -1)
  if (idx === 0 || !tierBreaks.includes(idx - 1)) {
    const plusTr = document.createElement("tr");
    plusTr.className = "plus-row-tr";
    const plusTd = document.createElement("td");
    plusTd.className = "plus-row-td";
    plusTd.colSpan = 5;

    const plusBtn = document.createElement("button");
    plusBtn.className = "plus-divider-btn";
    plusBtn.innerHTML = "+";
    plusBtn.title = "Insert Tier Break Here";
    plusBtn.onclick = (e) => {
      e.stopPropagation();
      if (!tierBreaks.includes(idx - 1)) {
        tierBreaks.push(idx - 1);
        tierBreaks = tierBreaks.filter(v => v >= -1 && v < visiblePlayers.length - 1);
        tierBreaks.sort((a, b) => a - b);
        saveAll();
        renderTable();
      }
    };
    plusTd.appendChild(plusBtn);
    plusTr.appendChild(plusTd);
    tableBody.appendChild(plusTr);
  }
}

function renderTierDivider(tierNum, idx) {
  const tr = document.createElement("tr");
  tr.className = "tier-divider-tr";
  const td = document.createElement("td");
  td.className = "tier-divider-td";
  td.colSpan = 5;

  const bar = document.createElement("div");
  bar.className = "tier-divider-bar";
  const barInner = document.createElement("div");
  barInner.className = "tier-divider-bar-inner";
  const label = document.createElement("span");
  label.className = "tier-divider-label";
  label.textContent = `Tier ${tierNum}`;

  // Remove tier button
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-tier-btn";
  removeBtn.innerHTML = "×";
  removeBtn.title = "Remove this tier break";
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    tierBreaks = tierBreaks.filter(v => v !== idx - 1);
    saveAll();
    renderTable();
  };
  bar.appendChild(barInner);
  bar.appendChild(label);
  bar.appendChild(removeBtn);
  td.appendChild(bar);
  tr.appendChild(td);
  tableBody.appendChild(tr);
}

// All other unchanged logic: file submit, remove file, draft setup, save/load, etc.
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
        pickNumber: null
      };
    }).filter(p => p.name && p.tag);

    // Reset tier breaks to none
    tierBreaks = [];
    currentPick = 0;
    draftOrder = [];
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
  else tierBreaks = [];

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
  tierBreaks = [];
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
    if (!name) {
      alert("All teams must have a name.");
      return;
    }
    if (namesSet.has(name.toLowerCase())) {
      alert("Team names must be unique.");
      return;
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

// Init
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
        const nameCell = row.cells[2];
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
