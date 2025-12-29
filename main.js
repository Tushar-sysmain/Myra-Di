/* ======================
   PARTICLES (HEARTS)
====================== */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const hearts = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 20 + 10,
    v: Math.random() * 1 + .5
  }));

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hearts.forEach(h => {
      ctx.font = `${h.s}px serif`;
      ctx.fillText("💖", h.x, h.y);
      h.y -= h.v;
      if (h.y < -20) h.y = canvas.height + 20;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ======================
   FLIP CARDS
====================== */
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

/* ======================
   CANDLES
====================== */
document.querySelectorAll(".candle").forEach(c => {
  c.onclick = () => c.textContent = "💨";
});

/* ======================
   SURPRISE REVEAL
====================== */
function revealSurprise() {
  document.getElementById("surprise").style.display = "flex";
  confetti({ particleCount: 200, spread: 100, origin:{ y:.6 } });
}

/* ======================
   MUSIC FADE IN & CONTROLS
====================== */
const music = document.querySelector("audio");
const bg = document.getElementById("bgMusic");

function initMusic() {
  const audioElement = music || bg;
  if (!audioElement) return;

  audioElement.volume = 0;
  audioElement.play().catch(()=>{});

  let vol = 0;
  const fadeIn = setInterval(()=>{
    if(vol < 0.5){ vol += 0.01; audioElement.volume = vol; }
    else clearInterval(fadeIn);
  }, 120);

  // Add volume controls
  // const controls = document.createElement('div');
  // controls.id = 'music-controls';
  // controls.innerHTML = `
  //   <button id="play-pause">⏸️</button>
  //   <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="0.5">
  // `;
  controls.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(255,255,255,0.9);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    display: flex;
    gap: 10px;
    align-items: center;
  `;
  document.body.appendChild(controls);

  const playPauseBtn = document.getElementById('play-pause');
  const volumeSlider = document.getElementById('volume-slider');

  playPauseBtn.addEventListener('click', () => {
    if (audioElement.paused) {
      audioElement.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      audioElement.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    audioElement.volume = e.target.value;
  });
}

initMusic();
setTimeout(revealSurprise, 1500);

