const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];
const colors = ["#ff4d4d","#4da6ff","#4dff88","#ffd24d","#b84dff"];
const minSize = 10, maxSize = 20;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.speedX += (Math.random() - 0.5) * 0.01;
    this.speedY += (Math.random() - 0.5) * 0.01;
    const maxSpeed = 0.7;
    this.speedX = Math.max(Math.min(this.speedX, maxSpeed), -maxSpeed);
    this.speedY = Math.max(Math.min(this.speedY, maxSpeed), -maxSpeed);
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) particles.push(new Particle());
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

const avatar = document.querySelector(".avatar-container");
const heroH1 = document.querySelector(".hero-section h1");
const heroP = document.querySelector(".hero-section p");
const scrollIndicator = document.querySelector(".scroll-indicator");

function handleHeroFade() {
  const scrollY = window.scrollY;
  const fade = scrollY > 50;
  avatar.style.opacity = fade ? 0 : 1;
  heroH1.style.opacity = fade ? 0 : 1;
  heroP.style.opacity = fade ? 0 : 1;
  canvas.style.opacity = fade ? 0 : 1;
  scrollIndicator.style.opacity = fade ? 0 : 1;
}
window.addEventListener("scroll", handleHeroFade);

window.addEventListener("load", () => {
  // Ensure hero elements and canvas start visible
  avatar.style.opacity = 1;
  heroH1.style.opacity = 1;
  heroP.style.opacity = 1;
  canvas.style.opacity = 1;
  scrollIndicator.style.opacity = 1;

  // Smooth scroll to top after initial render
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
});

scrollIndicator.addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});

const projectCards = document.querySelectorAll(".project-card");

function handleScrollCards() {
  const trigger = window.innerHeight * 0.9;
  projectCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", handleScrollCards);
window.addEventListener("load", handleScrollCards);
