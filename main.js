
let players = [];
let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

(window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "DRAFTED_PLAYERS") {
    const picks = event.data.payload;
    console.log("📩 Received drafted picks:", picks);
    picks.forEach(pickedName => {
      const rows = document.querySelectorAll("#playerTable tbody tr");
      for (const row of rows) {
        const nameCell = row.cells[2];
        if (nameCell && nameCell.textContent.trim().toLowerCase().includes(pickedName.toLowerCase())) {
          const checkbox = row.querySelector("input[type='checkbox']");
          if (checkbox && !checkbox.checked) {
            checkbox.click();
            console.log("☑️ Auto-checked:", pickedName);
          }
          break;
        }
      }
    });
  }
}));
