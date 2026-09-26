const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 8);
});

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

const form = document.querySelector("#message-form");
const note = document.querySelector(".form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) {
    note.textContent = "Bitte fülle alle Felder aus.";
    note.classList.add("show");
    return;
  }

  const subject = encodeURIComponent("Nachricht zu TapKärtchen");
  const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);
  window.location.href = `mailto:ana.tulei@email.de?subject=${subject}&body=${body}`;

  note.textContent = "Dein E-Mail-Programm sollte sich jetzt öffnen. Danke für die Nachricht.";
  note.classList.add("show");
  form.reset();
});
