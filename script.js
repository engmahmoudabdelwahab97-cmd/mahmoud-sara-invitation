(() => {
  const cfg = window.INVITATION_CONFIG || {};
  const bride = cfg.brideName || "[Bride's Name]";
  ["brideCover","brideIntro","brideFooter"].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = bride;
  });
  document.title = `${cfg.groomName || "Mahmoud"} & ${bride} — Engagement Invitation`;
  const mapLink = document.getElementById("mapLink");
  if (mapLink && cfg.mapUrl) mapLink.href = cfg.mapUrl;
  const venueName = document.getElementById("venueName");
  if (venueName && cfg.venueName) venueName.textContent = cfg.venueName;
  const venueAddress = document.getElementById("venueAddress");
  if (venueAddress && cfg.venueAddress) venueAddress.textContent = cfg.venueAddress;

  const openInvitation = document.getElementById("openInvitation");
  openInvitation.addEventListener("click", () => {
    // The cover is a true entry gate: reveal the rest only after this deliberate click.
    document.body.classList.add("invitation-open");
    openInvitation.setAttribute("aria-expanded", "true");

    // This direct user gesture is the best opportunity to start audio on mobile browsers.
    startMusic();

    window.setTimeout(() => {
      document.getElementById("invitation").scrollIntoView({behavior:"smooth", block:"start"});
    }, 120);
  });

  const target = new Date(cfg.eventDate || "2026-10-23T00:00:00").getTime();
  function updateCountdown() {
    let diff = target - Date.now();
    if (diff < 0) diff = 0;
    const vals = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
    Object.entries(vals).forEach(([id, val]) => {
      const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2,"0");
    });
  }
  updateCountdown(); setInterval(updateCountdown, 1000);

  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  function updateMusicButton(playing, blocked = false) {
    musicToggle.classList.toggle("is-playing", playing);
    musicToggle.innerHTML = playing ? "♫ <span>Pause</span>" : (blocked ? "♫ <span>Tap for music</span>" : "♫ <span>Music</span>");
    musicToggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    musicToggle.setAttribute("title", playing ? "Pause music" : "Play music");
  }

  async function startMusic() {
    if (!music.paused) { updateMusicButton(true); return true; }
    try {
      await music.play();
      updateMusicButton(true);
      return true;
    } catch (err) {
      // Autoplay with sound is blocked by some browsers until the visitor interacts.
      updateMusicButton(false, true);
      return false;
    }
  }

  // No autoplay before the guest presses “Open Invitation”. That button is the intentional entry point.

  music.addEventListener("play", () => updateMusicButton(true));
  music.addEventListener("pause", () => updateMusicButton(false));

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      const ok = await startMusic();
      if (!ok) updateMusicButton(false, true);
    } else {
      music.pause();
      updateMusicButton(false);
    }
  });

  function whatsappUrl(message) {
    const number = (cfg.whatsappNumber || "").replace(/\D/g,"");
    if (!number) {
      alert("Before using RSVP or wishes, add your WhatsApp number in config.js (with country code, digits only).");
      return null;
    }
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
  document.getElementById("rsvpForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const count = document.getElementById("guestCount").value;
    const msg = `Engagement RSVP for ${cfg.groomName || "Mahmoud"} & ${bride}\nName: ${name}\nGuests: ${count}\nReply: Joyfully Accept`;
    const url = whatsappUrl(msg);
    if (url) window.open(url, "_blank", "noopener");
  });
  document.getElementById("declineButton").addEventListener("click", () => {
    const name = document.getElementById("guestName").value.trim();
    if (!name) { document.getElementById("guestName").focus(); alert("Please enter your name first."); return; }
    const count = document.getElementById("guestCount").value;
    const url = whatsappUrl(`Engagement RSVP for ${cfg.groomName || "Mahmoud"} & ${bride}\nName: ${name}\nGuests: ${count}\nReply: Regretfully Decline`);
    if (url) window.open(url, "_blank", "noopener");
  });
  document.getElementById("wishForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("wishName").value.trim();
    const wish = document.getElementById("wishMessage").value.trim();
    const url = whatsappUrl(`A wish for ${cfg.groomName || "Mahmoud"} & ${bride}\nFrom: ${name}\nMessage: ${wish}`);
    if (url) window.open(url, "_blank", "noopener");
  });
})();
