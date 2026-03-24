// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-card, .demo-card, .price-card, .pricing-details, .section-header, .process-block').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
  const scrollY = window.scrollY + 150;
  let currentId = '';
  sections.forEach(section => {
    if (section.offsetTop <= scrollY) {
      currentId = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === currentId);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Particle animation
(function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.baseX = this.x;
      this.baseY = this.y;
      this.targetX = this.x;
      this.targetY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
    }
    
    update() {
      this.baseX += this.speedX;
      this.baseY += this.speedY;
      if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
      if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;
      
      let dx = mouse.x - this.baseX;
      let dy = mouse.y - this.baseY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius && mouse.x !== null) {
        let force = (mouse.radius - distance) / mouse.radius;
        this.targetX = this.baseX - (dx / distance) * force * 50;
        this.targetY = this.baseY - (dy / distance) * force * 50;
      } else {
        this.targetX = this.baseX;
        this.targetY = this.baseY;
      }
      
      // Interpolation fluide
      this.x += (this.targetX - this.x) * 0.1;
      this.y += (this.targetY - this.y) * 0.1;
    }
    
    draw() {
      ctx.fillStyle = 'rgba(0, 255, 65, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particles = [];
    let n = Math.min((canvas.width * canvas.height) / 15000, 150);
    for (let i = 0; i < n; i++) particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      for (let j = i; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          ctx.strokeStyle = 'rgba(0, 255, 65, ' + (0.25 * (1 - dist / 220)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => { resize(); init(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
  resize(); init(); animate();
})();
