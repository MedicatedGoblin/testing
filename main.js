let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

// Tiers as break indexes (positions BETWEEN players)
const NUM_TIERS = 6; // 6 breaks, which means 5 tiers
let tierBreaks = []; // e.g., [1,5,10,15,20,25]; index positions in visiblePlayers

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
  // Sync tier breaks
  if (!Array.isArray(tierBreaks) || tierBreaks[tierBreaks.length - 1] !== visiblePlayers.length) {
    tierBreaks = getTierBreaks(visiblePlayers.length);
  }
  // Ensure no duplicate or out-of-bounds breaks
  tierBreaks = tierBreaks.filter((b, i, arr) =>
    b > 0 && b <= visiblePlayers.length && (i === 0 || b > arr[i - 1])
  );
  if (tierBreaks[tierBreaks.length - 1] !== visiblePlayers.length) {
    tierBreaks[tierBreaks.length - 1] = visiblePlayers.length;
  }

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  let tierNum = 1, tierDivRows = [];

  for (let i = 0; i <= visiblePlayers.length; i++) {
    // Insert divider *before* player if this index is a tier break (except index 0)
    if (tierBreaks.includes(i) && i !== 0) {
      // Insert thin tier divider
      const tr = document.createElement("tr");
      tr.className = "tier-divider-tr";
      tr.dataset.tierIndex = tierNum;
      const td = document.createElement("td");
      td.className = "tier-divider-td";
      td.colSpan = 5;

      // The blue bar and label
      const bar = document.createElement("div");
      bar.className = "tier-divider-bar";
      const barInner = document.createElement("div");
      barInner.className = "tier-divider-bar-inner";
      const label = document.createElement("span");
      label.className = "tier-divider-label";
      label.textContent = `Tier ${tierNum}`;
      label.setAttribute("draggable", "true");
      label.dataset.tierIndex = tierNum;
      bar.appendChild(barInner);
      bar.appendChild(label);
      td.appendChild(bar);
      tr.appendChild(td);
      tableBody.appendChild(tr);
      tierDivRows.push({ tr, label, idx: i, tierNum });

      tierNum++;
    }
    if (i < visiblePlayers.length) {
      // Add the player row
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

      // "My picks" lists
      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }

  // --- Drag/drop logic for tier dividers ---
  let dragIdx = null, dropIndicator = null;
  tierDivRows.forEach(({ label, tr, idx, tierNum }) => {
    if (tierNum === 1 || tierNum > NUM_TIERS) {
      label.setAttribute("draggable", "false");
      return;
    }
    label.setAttribute("draggable", "true");

    label.ondragstart = (e) => {
      dragIdx = idx;
      label.classList.add("dragging");
      // Ghost blue bar
      const ghost = document.createElement("div");
      ghost.style.width = "100px";
      ghost.style.height = "10px";
      ghost.style.background = "#1976d2";
      ghost.style.borderRadius = "6px";
      ghost.style.boxShadow = "0 2px 10px #1976d233";
      ghost.style.margin = "0 auto";
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 50, 5);
      setTimeout(() => document.body.removeChild(ghost), 0);
    };

    label.ondragend = () => {
      dragIdx = null;
      label.classList.remove("dragging");
      if (dropIndicator && dropIndicator.parentNode)
        dropIndicator.parentNode.removeChild(dropIndicator);
      dropIndicator = null;
      document.querySelectorAll('.tier-divider-bar-inner').forEach(barInner => {
        barInner.classList.remove('tier-divider-drop-target');
      });
    };
  });

  // Allow drop between any two players
  let trList = Array.from(tableBody.querySelectorAll("tr"));
  trList.forEach((row, i) => {
    if (row.classList.contains("tier-divider-tr")) {
      const barInner = row.querySelector(".tier-divider-bar-inner");
      if (!barInner) return;

      row.ondragover = (e) => {
        e.preventDefault();
        if (dragIdx === null) return;
        barInner.classList.add("tier-divider-drop-target");
      };
      row.ondragleave = () => {
        barInner.classList.remove("tier-divider-drop-target");
      };
      row.ondrop = (e) => {
        e.preventDefault();
        if (dragIdx === null) return;
        const allBreaks = [...tierBreaks];
        const thisIdx = tierDivRows.find(tierRow => tierRow.tr === row).idx;
        if (thisIdx === dragIdx) return; // No-op
        const idxList = tierDivRows.map(t => t.idx);
        let dragPos = idxList.indexOf(dragIdx);
        let dropPos = idxList.indexOf(thisIdx);
        if (dropPos < 0 || dragPos < 0) return;
        const toMove = allBreaks.splice(dragPos, 1)[0];
        allBreaks.splice(dropPos, 0, toMove);
        allBreaks.sort((a,b) => a-b);
        tierBreaks = allBreaks.filter((v, i, arr) => i===0 || v !== arr[i-1]);
        renderTable();
      };
    }
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

// Add your toggleDrafted, saveAll, loadAll, filterByPosition, updateCurrentPickDisplay, validateStartDraftButton, setupDraft from your previous code below here
// --- INSERT ALL YOUR EXISTING "HELPER" FUNCTIONS HERE ---
// For brevity, I won’t repeat them unless you want me to paste everything out, but you must keep ALL these.


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
