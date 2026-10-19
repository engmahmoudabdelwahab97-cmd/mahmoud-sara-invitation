(() => {
  const cfg = window.INVITATION_CONFIG || {};
  const bride = cfg.brideName || "[Bride's Name]";
  ["brideCover","brideIntro","brideFooter"].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = bride;
  });
  document.title = `${cfg.groomName || "Mahmoud"} & ${bride} — Engagement Invitation`;
  const mapLink = document.getElementById("mapLink");
  if (mapLink && cfg.mapUrl) mapLink.href = cfg.mapUrl;

  document.getElementById("openInvitation").addEventListener("click", () => {
    document.getElementById("invitation").scrollIntoView({behavior:"smooth"});
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
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try { await music.play(); musicToggle.innerHTML = "♫ <span>Pause</span>"; }
      catch { alert("Add your music file as assets/music.mp3, then try again."); }
    } else { music.pause(); musicToggle.innerHTML = "♫ <span>Music</span>"; }
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
