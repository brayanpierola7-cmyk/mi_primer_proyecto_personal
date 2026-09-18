const openBtn = document.getElementById('openBtn');
const inicio = document.getElementById('inicio');
const sorpresa = document.getElementById('sorpresa');
const musicBtn = document.getElementById('musicBtn');
const musica = document.getElementById('musica');
const stars = document.querySelector('.stars');
const petals = document.querySelector('.petals');
const fireflies = document.querySelector('.fireflies');
const celebration = document.getElementById('celebration');

function crearEstrellas() {
  const simbolos = ['✦','✧','⋆','★','·'];
  for (let i = 0; i < 45; i++) {
    const s = document.createElement('span');
    s.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.fontSize = (8 + Math.random() * 15) + 'px';
    s.style.setProperty('--speed', (1.3 + Math.random() * 2.5) + 's');
    s.style.animationDelay = (-Math.random() * 3) + 's';
    stars.appendChild(s);
  }
}

function crearPetalos() {
  const simbolos = ['🌼','🌻','✦','·'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (12 + Math.random() * 16) + 'px';
    p.style.setProperty('--duration', (6 + Math.random() * 7) + 's');
    p.style.setProperty('--delay', (-Math.random() * 10) + 's');
    petals.appendChild(p);
  }
}

function crearLuciérnagas() {
  for (let i = 0; i < 16; i++) {
    const f = document.createElement('span');
    f.style.left = Math.random() * 100 + 'vw';
    f.style.top = (35 + Math.random() * 55) + 'vh';
    f.style.animationDelay = (-Math.random() * 4) + 's';
    fireflies.appendChild(f);
  }
}

function celebrar() {
  celebration.classList.remove('hidden');
  const simbolos = ['💛','🌻','✨','💫'];

  for (let i = 0; i < 24; i++) {
    const item = document.createElement('span');
    item.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDelay = (Math.random() * .8) + 's';
    item.style.fontSize = (18 + Math.random() * 18) + 'px';
    celebration.appendChild(item);
    setTimeout(() => item.remove(), 4500);
  }

  setTimeout(() => celebration.classList.add('hidden'), 5000);
}

openBtn.addEventListener('click', () => {
  inicio.classList.add('hidden');
  sorpresa.classList.remove('hidden');
  celebrar();

  // El navegador permite iniciar audio después de una interacción del usuario.
  musica.play().then(() => {
    musicBtn.textContent = '⏸️ Pausar música';
  }).catch(() => {
    musicBtn.textContent = '🎵 Reproducir música';
  });
});

musicBtn.addEventListener('click', () => {
  if (musica.paused) {
    musica.play().then(() => {
      musicBtn.textContent = '⏸️ Pausar música';
    }).catch(() => {
      musicBtn.textContent = '🎵 Reproducir música';
    });
  } else {
    musica.pause();
    musicBtn.textContent = '🎵 Reproducir música';
  }
});

musica.addEventListener('ended', () => {
  musicBtn.textContent = '🔁 Reproducir música';
});

crearEstrellas();
crearPetalos();
crearLuciérnagas();
