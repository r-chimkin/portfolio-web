document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("vinyl-player");
  const record = player?.querySelector(".vinyl-record");
  const song = document.getElementById("portfolio-song");
  
  const initialMsg = document.getElementById("initial-msg");
  const introMsg = document.getElementById("intro-msg");

  // --- 1. Auto-Resume Music & Sync UI on Page Load ---
  const savedTime = sessionStorage.getItem("songTime");
  const isPlaying = sessionStorage.getItem("isPlaying");

  if (song && isPlaying === "true") {
    song.currentTime = parseFloat(savedTime) || 0;
    
    // Attempt auto-play (handles browser autoplay restrictions gracefully)
    song.play().then(() => {
      // If auto-play succeeds, reflect active state on vinyl and messages
      if (record) record.classList.add("spinning");
      if (player) player.classList.add("active");
      
      if (initialMsg && introMsg) {
        initialMsg.classList.replace("active-msg", "hidden-msg");
        introMsg.classList.replace("hidden-msg", "active-msg");
      }
    }).catch(() => {
      // Autoplay blocked: clear session state until user clicks again
      sessionStorage.removeItem("isPlaying");
    });
  }

  // --- 2. Vinyl Click Toggle Handler ---
  if (player && song) {
    player.addEventListener("click", () => {
      if (song.paused) {
        song.play();
        if (record) record.classList.add("spinning");
        player.classList.add("active");

        // Switch headings
        if (initialMsg && introMsg) {
          initialMsg.classList.replace("active-msg", "hidden-msg");
          introMsg.classList.replace("hidden-msg", "active-msg");
        }
      } else {
        song.pause();
        if (record) record.classList.remove("spinning");
        player.classList.remove("active");

        // Reset session storage on manual pause
        sessionStorage.removeItem("isPlaying");

        // Switch back to welcome heading
        if (initialMsg && introMsg) {
          introMsg.classList.replace("active-msg", "hidden-msg");
          initialMsg.classList.replace("hidden-msg", "active-msg");
        }
      }
    });
  }
});

// --- 3. Save Music Position Before Navigating ---
window.addEventListener("beforeunload", () => {
  const song = document.getElementById("portfolio-song");
  if (song && !song.paused) {
    sessionStorage.setItem("songTime", song.currentTime);
    sessionStorage.setItem("isPlaying", "true");
  }
});

// --- 4. Disable Desktop Zoom Controls (Ctrl/Fn + Scroll & Keys) ---
window.addEventListener("wheel", (e) => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && ["+", "-", "=", "0"].includes(e.key)) {
    e.preventDefault();
  }
});

window.addEventListener("gesturestart", (e) => {
  e.preventDefault();
});