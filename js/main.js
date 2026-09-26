const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll("[data-page]");

const titles = {
  start: "TapKärtchen — Ein kleiner Tap, eine klare Stimme",
  idee: "Die Idee — TapKärtchen",
  kontakt: "Kontakt — TapKärtchen",
};

function currentPage() {
  const hash = (location.hash || "#start").replace("#", "").toLowerCase();
  return titles[hash] ? hash : "start";
}

function showPage(name, { updateHash = true } = {}) {
  const pageName = titles[name] ? name : "start";

  pages.forEach((page) => {
    const isActive = page.id === `page-${pageName}`;
    page.hidden = !isActive;
    page.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  document.title = titles[pageName];

  if (updateHash && location.hash !== `#${pageName}`) {
    history.replaceState(null, "", `#${pageName}`);
  }

  navLinks?.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "auto" });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 8);
});

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navItems.forEach((el) => {
  el.addEventListener("click", (event) => {
    const page = el.dataset.page;
    if (!page || !titles[page]) return;
    event.preventDefault();
    showPage(page);
  });
});

window.addEventListener("hashchange", () => {
  showPage(currentPage(), { updateHash: false });
});

showPage(currentPage(), { updateHash: true });

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
  window.location.href = `mailto:tuleia.trading@gmail.com?subject=${subject}&body=${body}`;

  note.textContent = "Dein E-Mail-Programm sollte sich jetzt öffnen. Danke für die Nachricht.";
  note.classList.add("show");
  form.reset();
});
