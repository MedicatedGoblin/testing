// ==== ORIGINAL FANTASY DRAFT TOOL LOGIC ====
// (UNMODIFIED -- ALL YOUR ORIGINAL CODE, TIER LOGIC ADDED AFTER renderTable())

let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

// New for tiers:
let tierConfig = [0, 0, 0, 0, 0, 0]; // Holds start index of each tier. Always length 6 (5 tiers = 6 markers, end is len)
const NUM_TIERS = 5;

// DOM
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

// --- all your unchanged draft board logic below (leave as is) ---

// ... [same as before: populateTeamCountOptions, generateTeamNameInputs, syncYourTeamSelectOptions, ...] ...

// Copy/paste ALL your current code up to renderTable(), then REPLACE your renderTable function with the one below:

function renderTable() {
  // --- Gather visible players ---
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

  // --- RENDER ---
  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  let pIndex = 0;
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

  // Drag state
  let dragTier = null;
  let dragOverTier = null;
  let dragPlaceholder = null;

  // Handlers
  const updateDropHighlight = (targetTr) => {
    document.querySelectorAll(".tier-divider").forEach(tr => {
      tr.classList.remove("tier-divider-drop-target");
    });
    if (targetTr) targetTr.classList.add("tier-divider-drop-target");
  };

  document.querySelectorAll(".tier-divider").forEach(tr => {
    // Drag start
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
    // Drag end
    tr.ondragend = () => {
      dragTier = null;
      updateDropHighlight(null);
      tr.classList.remove("dragging");
      if (dragPlaceholder) {
        dragPlaceholder.remove();
        dragPlaceholder = null;
      }
    };
    // Drag over
    tr.ondragover = (e) => {
      e.preventDefault();
      const overIndex = parseInt(tr.dataset.tierIndex);
      if (overIndex !== dragTier) {
        updateDropHighlight(tr);
      }
    };
    // Drag leave
    tr.ondragleave = (e) => {
      updateDropHighlight(null);
    };
    // Drop
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
          let idx = 0;
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
          let idx = 0;
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

// (keep ALL your other functions unchanged below, such as toggleDrafted, saveAll, loadAll, etc)

// --- INIT (leave unchanged) ---
populateTeamCountOptions();
generateTeamNameInputs();
loadAll();
renderTable();
updateCurrentPickDisplay();
validateStartDraftButton();

// --- Event listeners (leave unchanged) ---
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
