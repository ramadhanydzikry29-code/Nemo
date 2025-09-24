window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.getElementById('splash').style.display = 'none';
  }, 2200);
  typeAbout();
});

// SPA Navigation
document.querySelectorAll('.nav-list a, .main-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    const page = this.getAttribute('data-page');
    if (page) {
      e.preventDefault();
      document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(page).classList.add('active');
      document.querySelectorAll('.nav-list a').forEach(nav => nav.classList.remove('active'));
      document.querySelector(`.nav-list a[data-page="${page}"]`).classList.add('active');
      window.location.hash = page;
      if (page === 'home') typeAbout();
    }
  });
});
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#','');
  if (hash && document.getElementById(hash)) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(hash).classList.add('active');
    document.querySelectorAll('.nav-list a').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.nav-list a[data-page="${hash}"]`).classList.add('active');
    if (hash === 'home') typeAbout();
  }
});
// Hamburger menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const nav = document.querySelector('nav');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Partikel background biru besar & kecil
const canvas = document.getElementById('bg-particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const particles = [];
  const PARTICLE_COUNT = Math.floor(window.innerWidth / 35) + 18;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const big = Math.random() > 0.55;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: big ? Math.random() * 11 + 10 : Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * (big ? 0.11 : 0.25),
      dy: (Math.random() - 0.5) * (big ? 0.11 : 0.25),
      alpha: Math.random() * 0.45 + 0.27,
      color: big ? "#00bfff" : "#3a6cf6"
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.r*2.2;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -p.r || p.x > canvas.width + p.r) p.dx *= -1;
      if (p.y < -p.r || p.y > canvas.height + p.r) p.dy *= -1;
      p.alpha += (Math.random() - 0.5) * 0.008;
      p.alpha = Math.max(0.18, Math.min(0.7, p.alpha));
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// Typewriter animasi About Me (lebih cepat)
function typeAbout() {
  const el = document.getElementById('about-desc');
  const text = `Saya Dzikry Ramadhany, mahasiswa Ilmu Komputer di Universitas Negeri Medan yang punya ketertarikan pada cyber security.
Pengalaman saya sebagai cyber data akun game memberikan pemahaman praktis soal pentingnya perlindungan data.
Di luar akademis, saya menjaga keseimbangan dengan hobi lari dan main game, membentuk saya jadi pribadi tangguh dan strategis.
Saya berambisi terus belajar dan berkontribusi di dunia keamanan siber.`;
  let i = 0;
  el.textContent = '';
  function typing() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) setTimeout(typing, 8 + Math.random()*10);
  }
  typing();
}

// Tombol animasi interaktif
document.querySelectorAll('.btn, .main-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('active');
  });
  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('active');
  });
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.92)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1)';
  });
});

// Modal zoom sertifikat
const modal = document.getElementById("modal-cert");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
document.querySelectorAll('.achievement-card img').forEach(function(img) {
  img.onclick = function(){
    modal.style.display = "flex";
    modalImg.src = this.src;
    modalCaption.innerText = this.alt;
  }
});
document.querySelector('.modal .close').onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Animasi Technology (bounce + deskripsi html/css/js)
const techDesc = document.getElementById('tech-desc');
const techCards = document.querySelectorAll('.tech-card');
const techInfo = {
  html: "HTML (HyperText Markup Language) adalah pondasi dari halaman web. HTML digunakan untuk membuat struktur, elemen, dan isi pada website seperti teks, gambar, tombol, dan lain-lain.",
  css: "CSS (Cascading Style Sheets) bertugas mengatur tampilan dan layout website. Dengan CSS kamu bisa membuat desain, warna, animasi, dan website jadi responsif.",
  js: "JavaScript adalah bahasa pemrograman untuk membuat website jadi interaktif dan dinamis. JS bisa dipakai untuk validasi form, membuat animasi, popup, hingga aplikasi web."
};
techCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    techCards.forEach(c => c.classList.remove('active-tech'));
    this.classList.add('active-tech');
    techDesc.textContent = techInfo[this.dataset.tech];
  });
  card.addEventListener('mouseleave', function() {
    this.classList.remove('active-tech');
    techDesc.textContent = '';
  });
  card.addEventListener('click', function() {
    techCards.forEach(c => c.classList.remove('active-tech'));
    this.classList.add('active-tech');
    techDesc.textContent = techInfo[this.dataset.tech];
  });
});

// Contact form (demo only)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda sudah terkirim.');
    contactForm.reset();
  });
}// ...kode sebelumnya...
document.querySelectorAll('.achievement-card img, .project-card img').forEach(function(img) {
  img.onclick = function(){
    modal.style.display = "flex";
    modalImg.src = this.src;
    modalCaption.innerText = this.alt;
  }
});