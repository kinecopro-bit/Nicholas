import { talks } from "./talks.js";
// Analytics loads separately so a blocked CDN (ad-blockers) never breaks the page.
import("./firebase.js").catch(() => {});

// TEDx list
const list = document.getElementById("talk-list");
if (list) {
  list.innerHTML = talks
    .map((t) => `<li><a href="${t.url}" target="_blank" rel="noopener" data-track="ted-talk"><span>${t.speaker}</span><em>${t.title}</em></a></li>`)
    .join("");
}

// Open the TEDx accordion when a link points at it
const acc = document.getElementById("tedx-acc");
const openTed = () => { if (location.hash === "#tedx" && acc) acc.open = true; };
addEventListener("hashchange", openTed);
document.querySelectorAll('a[href="#tedx"]').forEach((a) => a.addEventListener("click", () => { if (acc) acc.open = true; }));
openTed();

// Count-up metrics
const fmt = (n, d) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const count = (el) => {
  const to = parseFloat(el.dataset.to), d = parseInt(el.dataset.dec || "0", 10);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = fmt(to, d); return; }
  const t0 = performance.now(), dur = 1400;
  const tick = (t) => {
    const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(to * e, d);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    en.target.querySelectorAll("[data-to]").forEach(count);
    if (en.target.dataset.to) count(en.target);
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Nav: shadow on scroll + mobile toggle
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });
const toggle = document.querySelector(".nav-toggle");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll(".links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }));

document.getElementById("year").textContent = new Date().getFullYear();
