// Theme Toggle
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;
themeSwitch.addEventListener("change", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );
  updateThreeColors();
});
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeSwitch.checked = true;
}

// Three.js Header
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

const particles = new THREE.Group();
const colors = body.classList.contains("light-mode")
  ? [0x6699ff, 0xff6666]
  : [0x66ff99, 0xff6666];
const geometry = new THREE.SphereGeometry(0.3, 16, 16);
for (let i = 0; i < 200; i++) {
  const material = new THREE.MeshBasicMaterial({
    color: colors[Math.floor(Math.random() * 2)],
  });
  const particle = new THREE.Mesh(geometry, material);
  particle.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
  particles.add(particle);
}
scene.add(particles);

function updateThreeColors() {
  const newColors = body.classList.contains("light-mode")
    ? [0x6699ff, 0xff6666]
    : [0x66ff99, 0xff6666];
  particles.children.forEach((particle) => {
    particle.material.color.set(newColors[Math.floor(Math.random() * 2)]);
  });
}

function animateThree() {
  requestAnimationFrame(animateThree);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animateThree();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power2.out" });
gsap.from("#header h1", {
  scale: 0.5,
  opacity: 0,
  duration: 1.5,
  delay: 0.5,
  ease: "elastic.out(1, 0.5)",
});
gsap.from(".social-links a", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  delay: 1,
  ease: "power2.out",
});

// Typed.js
var typed = new Typed("#typed-text", {
  strings: [
    "Code Visionary",
    "Data Maestro",
    "ML Innovator",
    "Cinematic Coder",
  ],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 2000,
  loop: true,
});

// AOS
AOS.init({ duration: 1500, once: true });

// Tilt.js
$(".tilt-card").tilt({
  maxTilt: 25,
  scale: 1.15,
  speed: 600,
  glare: true,
  maxGlare: 0.5,
});

// Tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const transition = document.querySelector(".page-transition");
    gsap.to(transition, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        document
          .querySelector(this.getAttribute("href"))
          .scrollIntoView({ behavior: "smooth" });
        gsap.to(transition, { opacity: 0, duration: 0.5 });
      },
    });
  });
});

// Ripple Effect
$(".ripple").on("click", function (e) {
  let x = e.clientX - e.target.getBoundingClientRect().left;
  let y = e.clientY - e.target.getBoundingClientRect().top;
  let ripples = $("<span class='ripple-effect'></span>");
  ripples.css({ left: x, top: y });
  $(this).append(ripples);
  setTimeout(() => ripples.remove(), 800);
});

// Contact Form (Mock)
$("#contact-form").on("submit", function (e) {
  e.preventDefault();
  alert("Message sent! (This is a mock response.)");
});
