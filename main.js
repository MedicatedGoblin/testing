let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

const NUM_TIERS = 6; // 6 breaks = 5 tiers
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

function getTierBreaks(numPlayers) {
  let breaks = [1, 5, 10, 15, 20, 25].filter(b => b <= numPlayers);
  if (!breaks.includes(numPlayers)) breaks.push(numPlayers);
  return breaks;
}

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
  if (!Array.isArray(tierBreaks) || tierBreaks.length === 0 || tierBreaks[tierBreaks.length - 1] !== visiblePlayers.length) {
    tierBreaks = getTierBreaks(visiblePlayers.length);
  }
  // Clean and sort tier breaks
  tierBreaks = tierBreaks
    .filter((b, i, arr) => b > 0 && b <= visiblePlayers.length && (i === 0 || b > arr[i - 1]))
    .sort((a, b) => a - b);
  if (tierBreaks[tierBreaks.length - 1] !== visiblePlayers.length) {
    tierBreaks[tierBreaks.length - 1] = visiblePlayers.length;
  }

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  let tierNum = 1;
  let tierBreakIdx = 0; // current index in tierBreaks

  for (let i = 0; i <= visiblePlayers.length; i++) {
    // --- Always render Tier 1 divider at i == 0, and others at tier break positions ---
    if (i === 0 || (tierBreakIdx < tierBreaks.length && i === tierBreaks[tierBreakIdx])) {
      // Insert tier divider row
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

      // For tiers above 1 (i.e. tierNum > 1), add arrows
      if (tierNum > 1 && tierNum <= tierBreaks.length) {
        // Up arrow (can't go above previous break+1)
        const upArrow = document.createElement("button");
        upArrow.textContent = "▲";
        upArrow.className = "tier-arrow";
        const minUp = tierBreaks[tierNum - 2] + 1;
        upArrow.disabled = (tierBreaks[tierNum - 1] - 1 < minUp);
        upArrow.onclick = () => moveTier(tierNum - 1, -1);

        // Down arrow (can't go below next break-1)
        const downArrow = document.createElement("button");
        downArrow.textContent = "▼";
        downArrow.className = "tier-arrow";
        const maxDown = (tierNum === tierBreaks.length) ? visiblePlayers.length : tierBreaks[tierNum];
        downArrow.disabled = (tierBreaks[tierNum - 1] + 1 >= maxDown);
        downArrow.onclick = () => moveTier(tierNum - 1, 1);

        bar.appendChild(upArrow);
        bar.appendChild(downArrow);
      }
      bar.appendChild(barInner);
      bar.appendChild(label);

      td.appendChild(bar);
      tr.appendChild(td);
      tableBody.appendChild(tr);
      tierNum++;
      if (i > 0) tierBreakIdx++; // skip to next break index, except for i==0
    }
    // Player row
    if (i < visiblePlayers.length) {
      const player = visiblePlayers[i];
      const tr = document.createElement("tr");
      tr.classList.add(player.position);
      if (player.drafted) tr.classList.add("strikethrough");
      if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
      if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");
      tr.addEventListener("dblclick", () => {
        toggleDrafted(player.id);
      });

      const cbCell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = player.drafted;
      cb.dataset.id = player.id;
      cb.addEventListener("change", () => {
        toggleDrafted(player.id);
      });
      cbCell.appendChild(cb);

      const numCell = document.createElement("td");
      numCell.textContent = player.id;

      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      if (tr.classList.contains("recent-pick")) {
        const pickNumberBox = document.createElement("span");
        pickNumberBox.className = "pick-number-box";
        pickNumberBox.textContent = `Pick ${player.pickNumber}`;
        nameCell.appendChild(pickNumberBox);
      }

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

      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }
}

// FINAL: Moves the divider up or down one row (never overlaps, always valid)
function moveTier(tierIdx, direction) {
  if (tierIdx <= 0 || tierIdx >= tierBreaks.length) return; // Don't move Tier 1
  const visiblePlayers = getVisiblePlayers();
  const prevBreak = tierBreaks[tierIdx - 1];
  const nextBreak = (tierIdx === tierBreaks.length - 1) ? visiblePlayers.length : tierBreaks[tierIdx + 1];
  let newPos = tierBreaks[tierIdx] + direction;
  // Must always be > prevBreak and < nextBreak
  if (newPos <= prevBreak || newPos >= nextBreak) return;
  tierBreaks[tierIdx] = newPos;
  renderTable();
}

// ----- The rest of your original logic -----

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
    tierBreaks = null;
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
  tierBreaks = null;
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
