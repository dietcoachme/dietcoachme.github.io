/* DietCoach.me – kleine Interaktionen, keine Abhängigkeiten. */

// ► Hier eintragen, sobald die Konten angelegt sind:
const CALENDLY_URL = "";            // z. B. "https://calendly.com/dietcoach-ella/erstgespraech"
const FORMSPREE_ID = "";            // z. B. "xyzabcd" aus https://formspree.io/f/xyzabcd
const CONTACT_EMAIL = "DietcoachMe@gmail.com";

document.documentElement.classList.add("js");

// Header: transparent über dem Hero, hell beim Scrollen
const header = document.querySelector(".site-header");
if (header && !header.classList.contains("site-header--light")) {
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 60);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile-Menü
const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
}

// Einblenden beim Scrollen (Hero sofort beim Laden)
requestAnimationFrame(() => document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("is-visible")));
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Leichter Parallax-Effekt für Vollbild-Bilder
const parallax = document.querySelectorAll(".break img");
if (parallax.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const update = () => {
    parallax.forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = `translateY(${progress * -8}%)`;
    });
  };
  update();
  window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
}

// Terminbuchung: Calendly, falls eingerichtet – sonst zum Anfrageformular
document.querySelectorAll("[data-booking]").forEach((a) => {
  if (CALENDLY_URL) {
    a.href = CALENDLY_URL;
    a.target = "_blank";
    a.rel = "noopener";
  }
});

// Paket aus Preiskarte ins Formular übernehmen
document.querySelectorAll("[data-package]").forEach((a) => {
  a.addEventListener("click", () => {
    const select = document.querySelector("#paket");
    if (select) select.value = a.dataset.package;
  });
});

// Anfrageformular
const form = document.querySelector("#anfrage-form");
if (form) {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    if (!FORMSPREE_ID) {
      // Noch kein Formular-Dienst eingerichtet: E-Mail-Programm mit vorbereitetem Text öffnen
      const body = [...data.entries()]
        .filter(([k]) => k !== "datenschutz")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Anfrage über dietcoach.me")}&body=${encodeURIComponent(body)}`;
      return;
    }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.className = "form-status";
    status.textContent = "Wird gesendet …";
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.classList.add("is-ok");
      status.textContent = "Danke für deine Nachricht! Ich melde mich innerhalb von 24 Stunden bei dir. – Ella";
    } catch {
      status.classList.add("is-error");
      status.textContent = `Das hat leider nicht geklappt. Schreib mir gern direkt an ${CONTACT_EMAIL} oder per WhatsApp.`;
    } finally {
      button.disabled = false;
    }
  });
}

// YouTube erst nach Klick laden (Datenschutz)
document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1&rel=0`;
    iframe.title = button.getAttribute("aria-label").replace("Video abspielen: ", "");
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    button.replaceWith(iframe);
  });
});

// Jahr im Footer
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
