let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

// New for tiers:
let tierConfig = [0, 0, 0, 0, 0, 0]; // Holds start index of each tier. Always length 6 (5 tiers = 6 markers, end is len)
const NUM_TIERS = 5;

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

// Validate if draft can start (all teams named, your team selected, file submitted)
function validateStartDraftButton() {
  let valid = true;

  // Clear all previous errors first
  fileInput.classList.remove("error");
  submitFileBtn.classList.remove("error");
  startDraftBtn.classList.remove("error");
  yourTeamSelect.classList.remove("error");

  // Validate team names: all must be non-empty
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

  // Validate your team selected
  if (yourTeamSelect.value === "" || yourTeamSelect.value === null) {
    yourTeamSelect.classList.add("error");
    valid = false;
  } else {
    yourTeamSelect.classList.remove("error");
  }

  // Validate player list loaded (file submitted)
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

  if (currentPick >= draftOrder.length) currentPick = 0; // reset if draft finished previously

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
  localStorage.setItem("tierConfig", JSON.stringify(tierConfig));
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

  const storedTierConfig = localStorage.getItem("tierConfig");
  if (storedTierConfig) {
    const parsed = JSON.parse(storedTierConfig);
    if (Array.isArray(parsed) && parsed.length === NUM_TIERS+1) {
      tierConfig = parsed;
    }
  }

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
  tierConfig = [0, 0, 0, 0, 0, 0];
  generateTeamNameInputs();
  renderTable();
  updateCurrentPickDisplay();
  clearFileInput();
}

// ---- TIER DIVIDER TABLE RENDER (FantasyPros style) ----

function renderTable() {
  const keyword = searchInput.value.toLowerCase();
  const hidePicked = document.getElementById("hidePickedCheckbox").checked;
  // Array of filtered players
  let visiblePlayers = players.filter(player => {
    const matchesFilter = currentFilter === "ALL" || player.position === currentFilter;
    const matchesSearch = player.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch && (!hidePicked || !player.drafted);
  });

  // --- Assign players to tiers based on tierConfig ---
  if (tierConfig.length !== NUM_TIERS + 1 || tierConfig[NUM_TIERS] !== visiblePlayers.length) {
    // Reset tier config if out of sync
    const perTier = Math.floor(visiblePlayers.length / NUM_TIERS);
    tierConfig = [];
    for (let t = 0; t < NUM_TIERS; t++) {
      tierConfig.push(t * perTier);
    }
    tierConfig.push(visiblePlayers.length);
  }

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  for (let t = 0; t < NUM_TIERS; t++) {
    // Add the tier divider
    const trTier = document.createElement("tr");
    trTier.className = "tier-divider";
    trTier.setAttribute("draggable", "true");
    trTier.dataset.tierIndex = t;
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = `Tier ${t + 1}`;
    trTier.appendChild(td);
    tableBody.appendChild(trTier);

    // Add players for this tier
    for (let i = tierConfig[t]; i < tierConfig[t + 1]; i++) {
      const player = visiblePlayers[i];
      if (!player) continue;
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

      // Add to "my picks" lists
      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }

  // --- DRAG/DROP LOGIC FOR TIERS ---

  let dragTier = null;

  const updateDropHighlight = (targetTr) => {
    document.querySelectorAll(".tier-divider").forEach(tr => {
      tr.classList.remove("tier-divider-drop-target");
    });
    if (targetTr) targetTr.classList.add("tier-divider-drop-target");
  };

  document.querySelectorAll(".tier-divider").forEach(tr => {
    tr.ondragstart = (e) => {
      dragTier = parseInt(tr.dataset.tierIndex);
      tr.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      // Create a ghost drag image
      const img = document.createElement("div");
      img.style.background = "#1976d2";
      img.style.width = "100px";
      img.style.height = "14px";
      document.body.appendChild(img);
      e.dataTransfer.setDragImage(img, 50, 7);
      setTimeout(() => document.body.removeChild(img), 0);
    };
    tr.ondragend = () => {
      dragTier = null;
      updateDropHighlight(null);
      tr.classList.remove("dragging");
    };
    tr.ondragover = (e) => {
      e.preventDefault();
      const overIndex = parseInt(tr.dataset.tierIndex);
      if (overIndex !== dragTier) {
        updateDropHighlight(tr);
      }
    };
    tr.ondragleave = (e) => {
      updateDropHighlight(null);
    };
    tr.ondrop = (e) => {
      e.preventDefault();
      const overIndex = parseInt(tr.dataset.tierIndex);
      if (overIndex !== dragTier && dragTier !== null) {
        // Move the tier in tierConfig
        // Each tier is defined by range [tierConfig[i], tierConfig[i+1])
        // Moving tier dragTier to overIndex
        // This is done by moving the tier's slice to new position
        if (overIndex < dragTier) {
          // Move up: insert before overIndex
          const movedStart = tierConfig[dragTier];
          const movedEnd = tierConfig[dragTier+1];
          const numMoved = movedEnd - movedStart;
          const tierSplices = tierConfig.slice();
          tierSplices.splice(dragTier,1);
          tierSplices.splice(overIndex,0,movedStart);
          // Now fix boundaries
          // Recalculate all boundaries
          for (let i = 0; i < NUM_TIERS+1; i++) {
            if (i === 0) tierConfig[i] = 0;
            else if (i === NUM_TIERS) tierConfig[i] = visiblePlayers.length;
            else {
              // Previous + tier size
              if (i <= overIndex) {
                tierConfig[i] = tierConfig[i-1] + (tierSplices[i]-tierSplices[i-1]);
              } else if (i === overIndex+1) {
                tierConfig[i] = tierConfig[i-1] + numMoved;
              } else {
                tierConfig[i] = tierConfig[i-1] + (tierSplices[i-1]-tierSplices[i-2]);
              }
            }
          }
        } else if (overIndex > dragTier) {
          // Move down: insert after overIndex
          const movedStart = tierConfig[dragTier];
          const movedEnd = tierConfig[dragTier+1];
          const numMoved = movedEnd - movedStart;
          const tierSplices = tierConfig.slice();
          tierSplices.splice(dragTier,1);
          tierSplices.splice(overIndex,0,movedStart);
          // Recalculate
          for (let i = 0; i < NUM_TIERS+1; i++) {
            if (i === 0) tierConfig[i] = 0;
            else if (i === NUM_TIERS) tierConfig[i] = visiblePlayers.length;
            else {
              if (i <= dragTier) {
                tierConfig[i] = tierConfig[i-1] + (tierSplices[i]-tierSplices[i-1]);
              } else if (i === overIndex) {
                tierConfig[i] = tierConfig[i-1] + numMoved;
              } else {
                tierConfig[i] = tierConfig[i-1] + (tierSplices[i-1]-tierSplices[i-2]);
              }
            }
          }
        }
        // Save config and re-render
        localStorage.setItem("tierConfig", JSON.stringify(tierConfig));
        renderTable();
      }
    };
  });
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
    // Reset tierConfig to default
    tierConfig = [0, 0, 0, 0, 0, 0];
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
  tierConfig = [0, 0, 0, 0, 0, 0];
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

// --- INIT ---
populateTeamCountOptions();
generateTeamNameInputs();
loadAll();
renderTable();
updateCurrentPickDisplay();
validateStartDraftButton();

// --- Event listeners ---
submitFileBtn.addEventListener("click", handleFileSubmit);
removeFileBtn.addEventListener("click", removePlayerFile);
searchInput.addEventListener("input", renderTable);
fileInput.addEventListener("change", () => {
  fileInput.classList.remove("error");
  submitFileBtn.classList.remove("error");
  validateStartDraftButton();
});

// --- ESPN integration ---

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
