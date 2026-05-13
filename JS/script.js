const header = document.getElementById("siteHeader");
const spacer = document.getElementById("headerSpacer");

function syncHeaderSpace() {
  spacer.style.height = header.offsetHeight + "px";
}

window.addEventListener("load", syncHeaderSpace);
window.addEventListener("resize", syncHeaderSpace);

const navWrapper = document.getElementById("navWrapper");

function handleNavScroll() {
  if (window.scrollY > 40) {
    navWrapper.classList.add("nav-scrolled");
  } else {
    navWrapper.classList.remove("nav-scrolled");
  }
}

window.addEventListener("scroll", handleNavScroll);

// ==============================
// Navbar scroll effect
// ==============================
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (!nav) return;

  if (window.scrollY > 30) {
    nav.classList.remove("bg-[#0b0b0b]");
    nav.classList.add("bg-black/70", "backdrop-blur-md", "shadow-lg");
    nav.classList.remove("py-8");
    nav.classList.add("py-4");
  } else {
    nav.classList.add("bg-[#0b0b0b]");
    nav.classList.remove("bg-black/70", "backdrop-blur-md", "shadow-lg");
    nav.classList.add("py-8");
    nav.classList.remove("py-4");
  }
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

function openMenu() {
  // panel in
  menu.classList.remove("translate-x-full");
  // overlay in
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100");

  // X flip
  closeBtn.classList.add("rotate-[360deg]");

  // lock scroll
  document.body.classList.add("overflow-hidden");
}

function closeMenu() {
  menu.classList.add("translate-x-full");
  overlay.classList.add("opacity-0", "pointer-events-none");
  overlay.classList.remove("opacity-100");
  closeBtn.classList.remove("rotate-[360deg]");
  document.body.classList.remove("overflow-hidden");
}


menuBtn?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

// ESC close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
// ==============================
// Make TOP BAR fixed always
// ==============================
const topBar = document.querySelector("header > div");

if (topBar) {
  topBar.classList.remove("sticky", "top-0");
  topBar.classList.add("fixed", "top-0", "left-0", "w-full", "z-[60]");
}

// Push the content down so it doesn't go under the fixed bars
document.body.classList.add("pt-[57px]");

const cookieBar = document.getElementById("cookieBar");
const acceptCookies = document.getElementById("acceptCookies");

acceptCookies.addEventListener("click", () => {
  cookieBar.classList.add("opacity-0", "pointer-events-none");
  setTimeout(() => {
    cookieBar.style.display = "none";
  }, 300);
});

const chatBtn = document.getElementById("chatBtn");
const chatPanel = document.getElementById("chatPanel");

const chatHome = document.getElementById("chatHome");
const chatMessages = document.getElementById("chatMessages");

const tabHome = document.getElementById("tabHome");
const tabMessages = document.getElementById("tabMessages");

const newConversation = document.getElementById("newConversation");
const backToHome = document.getElementById("backToHome");

const chatIcon = document.getElementById("chatIcon");
const chatArrow = document.getElementById("chatArrow");

function showHome() {
  chatHome.classList.remove("hidden");
  chatMessages.classList.add("hidden");

  tabHome.classList.add("text-[#f7b500]", "font-bold");
  tabHome.classList.remove("text-black/40");

  tabMessages.classList.remove("text-[#f7b500]", "font-bold");
  tabMessages.classList.add("text-black/40");
}

function showMessages() {
  chatHome.classList.add("hidden");
  chatMessages.classList.remove("hidden");

  tabMessages.classList.add("text-[#f7b500]", "font-bold");
  tabMessages.classList.remove("text-black/40");

  tabHome.classList.remove("text-[#f7b500]", "font-bold");
  tabHome.classList.add("text-black/40");
}

function openChat() {
  chatPanel.classList.remove(
    "opacity-0",
    "pointer-events-none",
    "translate-y-2",
  );
  chatPanel.classList.add("opacity-100", "translate-y-0");

  // swap icons (guaranteed)
  chatIcon.style.display = "none";
  chatArrow.style.display = "inline-block";

  // rotate
  chatArrow.classList.add("chat-rotate");
}

function closeChat() {
  chatPanel.classList.add("opacity-0", "pointer-events-none", "translate-y-2");
  chatPanel.classList.remove("opacity-100", "translate-y-0");

  // swap icons back (guaranteed)
  chatArrow.style.display = "none";
  chatIcon.style.display = "inline-block";

  chatArrow.classList.remove("chat-rotate");
}

// toggle
chatBtn.addEventListener("click", () => {
  const isOpen = chatPanel.classList.contains("opacity-100");
  isOpen ? closeChat() : openChat();
});

// tabs
tabHome.addEventListener("click", showHome);
tabMessages.addEventListener("click", showMessages);

// card actions
newConversation.addEventListener("click", () => {
  openChat(); 
  showMessages(); 
});
backToHome?.addEventListener("click", showHome);

const chatMenu = document.getElementById("chatMenu");

function closeChatMenu() {
  if (!chatMenu) return;
  chatMenu.classList.add("opacity-0", "pointer-events-none", "translate-y-2");
  chatMenu.classList.remove("opacity-100", "translate-y-0");
}


newConversation.addEventListener("click", () => {
  openChat();
  showMessages();
  closeChatMenu();
});

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeChat();
});

// default
showHome();

// ==============================
// Bike tilt effect (mouse move) - reusable
// IMPORTANT: This supports translateX (for scroll) + rotate (for mouse)
// ==============================
function addMouseTiltEffect(el) {
  if (!el) return;

  el.style.transformStyle = "preserve-3d";
  el.style.transition = "transform 120ms ease-out";

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotY = (x - 0.5) * 14;
    const rotX = -(y - 0.5) * 14;

    // take translateX from dataset (used by scroll effect)
    const tx = Number(el.dataset.tx || 0);

    el.style.transform = `
      perspective(900px)
      translateX(${tx}px)
      rotateX(${rotX}deg)
      rotateY(${rotY}deg)
    `;
  });

  el.addEventListener("mouseleave", () => {
    const tx = Number(el.dataset.tx || 0);

    el.style.transform = `
      perspective(900px)
      translateX(${tx}px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  });
}

// ==============================
// Apply effects to bike images
// ==============================
const bike = document.getElementById("bikeImg");
const bikeSlideImg = document.getElementById("bikeSliderImg");
const bikeProducts_1 = document.getElementById("bike-1");
const bikeProducts_2 = document.getElementById("bike-2");

// mouse tilt for both
addMouseTiltEffect(bike);
addMouseTiltEffect(bikeSlideImg);
addMouseTiltEffect(bikeProducts_1);
addMouseTiltEffect(bikeProducts_2);
// ==============================
// bike image scroll + mouse (page based)
// ==============================

let lastScrollY = window.scrollY;
let ticking = false;

const MOVE_RIGHT_PX = 100;

// mouse ratios (page based)
let mouseXRatio = 0;
let mouseYRatio = 0;

// ==============================
// Mouse move (relative to PAGE)
// ==============================
window.addEventListener("mousemove", (e) => {
  mouseXRatio = e.clientX / window.innerWidth - 0.5;
  mouseYRatio = e.clientY / window.innerHeight - 0.5;

  applyBikeTransform();
});

// ==============================
// Scroll direction logic
// ==============================
function updateBikeByScrollDirection() {
  const currentY = window.scrollY;
  const goingDown = currentY > lastScrollY;

  if (bikeSlideImg) {
    const tx = goingDown ? MOVE_RIGHT_PX : 0;

    // store base translateX from scroll
    bikeSlideImg.dataset.tx = tx;

    applyBikeTransform();
  }

  lastScrollY = currentY;
  ticking = false;
}

// ==============================
// Apply combined transform
// ==============================
function applyBikeTransform() {
  if (!bikeSlideImg) return;

  const baseTx = Number(bikeSlideImg.dataset.tx || 0);

  // mouse influence
  const mouseTranslateX = mouseXRatio * 40;
  const rotateY = mouseXRatio * 20;
  const rotateX = -mouseYRatio * 15;

  bikeSlideImg.style.transform = `
    perspective(900px)
    translateX(${baseTx + mouseTranslateX}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;
}

// ==============================
// Scroll listener (optimized)
// ==============================
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateBikeByScrollDirection);
    ticking = true;
  }
});

(function () {
  const track = document.getElementById("tTrack");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");

  let idx = 0; // 0 or 1

  function render() {
    track.style.transform = `translateX(-${idx * 100}%)`;

    // disable logic like original
    if (idx === 0) {
      prev.classList.add("tArrow--disabled");
      next.classList.remove("tArrow--disabled");
    } else {
      next.classList.add("tArrow--disabled");
      prev.classList.remove("tArrow--disabled");
    }
  }

  next.addEventListener("click", () => {
    if (idx < 1) idx++;
    render();
  });

  prev.addEventListener("click", () => {
    if (idx > 0) idx--;
    render();
  });

  render();
})();
