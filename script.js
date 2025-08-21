const generateBtn = document.getElementById("generateBtn");
const characterCard = document.getElementById("characterCard");
const charImage = document.getElementById("charImage");
const charName = document.getElementById("charName");
const charDescription = document.getElementById("charDescription");

const TOTAL_CHARACTERS = 826; 

generateBtn.addEventListener("click", generateCharacter);

async function generateCharacter() {
  const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
  const url = `https://rickandmortyapi.com/api/character/${randomId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    charImage.src = data.image;
    charImage.alt = data.name;
    charName.textContent = data.name;

    // Cria descrição automática em português
    charDescription.textContent = `${data.name} é um personagem ${data.status.toLowerCase()} da espécie ${data.species.toLowerCase()} e gênero ${data.gender.toLowerCase()}. Ele atualmente está localizado em ${data.location.name}.`;

    characterCard.style.opacity = 0;
    characterCard.classList.remove("hidden");
    setTimeout(() => characterCard.style.opacity = 1, 50);
  } catch (err) {
    console.error(err);
    alert("Erro ao buscar personagem!");
  }
}

// ===== Partículas sutis =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const PARTICLE_COUNT = 60;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.dx = (Math.random() - 0.5) * 0.3;
    this.dy = (Math.random() - 0.5) * 0.3;
    this.color = `rgba(255,255,255,${Math.random() * 0.5})`;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if(this.x < 0 || this.x > width) this.dx *= -1;
    if(this.y < 0 || this.y > height) this.dy *= -1;
    this.draw();
  }
}

function initParticles() {
  for(let i=0; i<PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0,0,width,height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

initParticles();
animate();
