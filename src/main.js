import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="decorative-blob blob-1"></div>
  <div class="decorative-blob blob-2"></div>
  <div class="hello-card">
    <h1 class="title">Hello World!</h1>
    <p class="subtitle">Welcome to your beautiful new Vite project.</p>
    <button class="interaction-btn" id="magic-btn">Click for Magic</button>
  </div>
`;

const button = document.querySelector('#magic-btn');
const card = document.querySelector('.hello-card');

button.addEventListener('click', () => {
  card.style.transform = 'scale(1.02) rotateX(2deg) rotateY(2deg)';
  button.textContent = 'Sparkles Activated ✨';
  
  setTimeout(() => {
    card.style.transform = '';
  }, 300);

  createSparkles();
});

function createSparkles() {
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    const size = Math.random() * 10 + 5;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    sparkle.style.borderRadius = '50%';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.boxShadow = '0 0 10px currentColor';
    sparkle.style.zIndex = '100';
    sparkle.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    sparkle.style.opacity = '1';
    
    document.body.appendChild(sparkle);
    
    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${(Math.random() - 0.5) * 500}px, ${(Math.random() - 0.5) * 500}px) scale(0)`;
      sparkle.style.opacity = '0';
    });
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
}

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  const isHovering = card.matches(':hover');
  
  if (isHovering) {
    card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  }
});

card.addEventListener('mouseleave', () => {
  // Let float animation take over, but reset specific rotations
  setTimeout(() => {
    card.style.transform = '';
  }, 300);
});
