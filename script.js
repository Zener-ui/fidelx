const SIGNUP_URL = "https://fidelx-frontend.vercel.app/";

// Centralize every signup CTA
document.querySelectorAll("[data-signup]").forEach((el) => {
  el.setAttribute("href", SIGNUP_URL);
});

// Sticky nav
const nav = document.querySelector(".nav");
addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", scrollY > 40),
  { passive: true }
);

// Reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Mobile menu (links only — CTA stays in the bar)
const menuBtn = document.querySelector(".menu");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  mobileNav.hidden = false;

  const close = () => {
    mobileNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}
