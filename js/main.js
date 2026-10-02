const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && window.Lenis) {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const navToggle = document.getElementById("nav-toggle");
const navOverlay = document.getElementById("nav-overlay");

if (navToggle && navOverlay) {
  navToggle.addEventListener("click", () => {
    const isOpen = navOverlay.getAttribute("data-open") === "true";
    navOverlay.setAttribute("data-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  navOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navOverlay.setAttribute("data-open", "false");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const projectCards = document.querySelectorAll(".project-card");

if (prefersReducedMotion || !window.gsap) {
  projectCards.forEach((card) => {
    card.style.opacity = 1;
    card.style.transform = "none";
  });
} else {
  gsap.registerPlugin(ScrollTrigger);
  projectCards.forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });
}

const filterBar = document.getElementById("filter-bar");
const projectGrid = document.getElementById("project-grid");

if (filterBar && projectGrid) {
  filterBar.addEventListener("click", (event) => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;

    filterBar.querySelectorAll(".filter-chip").forEach((el) => el.setAttribute("data-active", "false"));
    chip.setAttribute("data-active", "true");

    const filter = chip.dataset.filter;
    projectGrid.querySelectorAll(".project-card").forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.style.display = matches ? "" : "none";
    });
  });
}
