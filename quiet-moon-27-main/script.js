/* ====== إعدادات تقدر تغيرها بسهولة ====== */
const CONFIG = {
  password: 'love',                       // الباسورد الافتراضي
  songName: 'عمري الحقيقي ابتدي وياك',                 // غيّره لاسم الأغنية
  startDate: '2024-01-01',                // تاريخ بدايتكم (تقدر تغيره من الصفحة بعد فتح القفل)
  letter:
`عاوز اقولك اني بحبك و بتمني اليوم اللي تكوني بتاعتى يا اجمل حاجة شافتها عيني مهما قولت مش هخلص بس انتي اقرب حد ليا اقرب ليا من نفسي و بحبك و عاوزك معايا دايما ربنا يخليكي ليا دايما و نفضل سوا`,
  letterEnd: 'بحبك',
  heartMessages: [                        // رسايل القلب (غيّرها زي ما تحب) - بعد آخر ضغطة القلب بيدبل
    'أول ضغطة: بحبك أكتر من إمبارح.',
    'ضحكتك بتصلّح اليوم كله عندي.',
    'إنتي أجمل حاجة حصلتلي.',
    'مهما بعدنا، قلبي دايماً عندك.',
    'كل يوم معاكي هدية من ربنا.',
    'ربنا يخليكي ليا ويفضل قلبك جنبي.',
    'فاضل ضغطة واحدة والعداد يخلص...'
  ],
  heartFinal: 'العداد خلص و حبي ليكي مخلصش',
  loveMessage:
`بصي يا أجمل حاجة حصلتلي، ❤️🥹

أنا مش عارف إزاي قدرتي تدخلي قلبي بالشكل ده، بس بقيتي من الحاجات اللي بتخلّي يومي أحلى لمجرد إنك موجودة فيه. بحب رغيكي وضحكتك وتفاصيلك الصغيرة اللي يمكن إنتِ متاخديش بالك منها، وبحب حتى إني ألاقي نفسي ببتسم لما أفتكرك فجأة 😂❤️

نفسي أفضل أشوفك مبسوطة، وأكون الشخص اللي تحكيله كل حاجة، الحلوة والوحشة، وتلاقي معاه راحة وأمان. ويا رب ييجي اليوم اللي أبصلك فيه وأقولك: أهو إحنا بقينا سوا بجد، ومفيش حاجة أحلى من كده. 🫶🏻

بحبك يا أحلى صدفة، ويا رب تفضلي دايمًا حتة حلوة في أيامي. ❤️🌷
`,
  images: 6
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
};
const pw = () => store.get('lovePass', CONFIG.password);

/* ====== الصفحات ====== */
function show(id) {
  $$('.page').forEach(p => p.classList.toggle('active', p.id === id));
  window.scrollTo(0, 0);
}

/* ====== المشغل ====== */
const song = $('#song'), player = $('#player'), playBtn = $('#playBtn');
$('#songName').textContent = CONFIG.songName;
const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
function updateTime() { $('#songTime').textContent = `${fmt(song.currentTime)} / ${fmt(song.duration)}`; }
song.addEventListener('timeupdate', updateTime);
song.addEventListener('loadedmetadata', updateTime);
song.addEventListener('play', () => { playBtn.textContent = '❚❚'; player.classList.remove('paused'); });
song.addEventListener('pause', () => { playBtn.textContent = '▶'; player.classList.add('paused'); });
playBtn.onclick = () => song.paused ? song.play() : song.pause();

/* ====== الانتقالات (فخمة وهادية) ====== */
const rnd = (a, b) => a + Math.random() * (b - a);
const HEART = 'M50 88 C10 58 0 30 22 16 C36 8 48 16 50 26 C52 16 64 8 78 16 C100 30 90 58 50 88Z';
function linePetals(n) {
  let s = '';
  for (let i = 0; i < n; i++)
    s += `<path pathLength="1" transform="rotate(${i * 360 / n} 50 50)" d="M50 50 C38 36 40 14 50 6 C60 14 62 36 50 50Z"/>`;
  return s + '<circle pathLength="1" cx="50" cy="50" r="5"/>';
}
function lineArt(inner) {
  return `<svg class="v-art" viewBox="0 0 100 100" fill="none" stroke="url(#goldLine)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <defs><linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7D98E"/><stop offset="1" stop-color="#EAA221"/></linearGradient></defs>${inner}</svg>`;
}
function sparkles(t, n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i'), z = rnd(2, 6);
    s.className = 'v-spark';
    s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(30, 100)}%;width:${z}px;height:${z}px;animation-delay:${rnd(.2, 1.6)}s;animation-duration:${rnd(1.8, 3)}s`;
    s.style.setProperty('--rise', rnd(60, 260) + 'px');
    t.appendChild(s);
  }
}

function transitionTo(id, type = 'bloom') {
  const t = $('#transition');
  t.className = 'transition ' + type;
  t.innerHTML = '';
  if (type === 'bloom') {
    // ستارة دايرية بتتفتح من النص + قلب بخطوط دهبية بيترسم + حلقات ضوء
    t.innerHTML = '<div class="v-iris"></div><div class="v-ring"></div><div class="v-ring r2"></div><div class="v-ring r3"></div>'
      + lineArt(`<path pathLength="1" d="${HEART}"/>`);
  } else {
    // شرائح رأسية بتطلع ورا بعض + شعاع ضوء + وردة بخطوط دهبية بتترسم
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'v-slat';
      s.style.cssText = `left:${i * 12.5}%;animation-delay:${i * .07}s`;
      t.appendChild(s);
    }
    t.insertAdjacentHTML('beforeend', '<div class="v-sweep"></div>' + lineArt(linePetals(8)));
  }
  sparkles(t, 46);
  setTimeout(() => show(id), 1300);
  setTimeout(() => { t.innerHTML = ''; t.className = 'transition'; }, 3300);
}

/* ====== الصفحة 1 ====== */
function unlock() {
  const input = $('#pass');
  if (input.value.trim() !== pw()) {
    $('#passMsg').textContent = 'الباسورد غلط، جرّبي تاني';
    input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake');
    return;
  }
  $('#envelope').classList.add('open');
  player.hidden = false;
  song.play().catch(() => {});
  transitionTo('p2', 'bloom');
  setTimeout(startTyping, 2300);
}
$('#unlockBtn').onclick = unlock;
$('#pass').addEventListener('keydown', e => e.key === 'Enter' && unlock());

/* ====== الصفحة 2: كتابة حرف بحرف ====== */
let typingStarted = false;
function typeInto(el, text, speed, done) {
  let i = 0;
  (function tick() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, speed + Math.random() * 50);
    else done && done();
  })();
}
function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  typeInto($('#typed'), CONFIG.letter, 70, () => {
    $('.end-wrap').appendChild($('#caret'));
    setTimeout(() => typeInto($('#typedEnd'), CONFIG.letterEnd, 220, () => { $('#continueBtn').hidden = false; }), 500);
  });
}
$('#continueBtn').onclick = () => { transitionTo('p3', 'curtain'); };

/* ====== الصفحة 3 ====== */
// العداد
const startInput = $('#startDate');
startInput.value = store.get('startDate', CONFIG.startDate);
function tickCounter() {
  const diff = Math.max(0, Date.now() - new Date(startInput.value + 'T00:00:00').getTime());
  $('#cDays').textContent = Math.floor(diff / 864e5);
  $('#cHours').textContent = Math.floor(diff / 36e5) % 24;
  $('#cMins').textContent = Math.floor(diff / 6e4) % 60;
  $('#cSecs').textContent = Math.floor(diff / 1e3) % 60;
}
setInterval(tickCounter, 1000); tickCounter();
startInput.addEventListener('change', () => { store.set('startDate', startInput.value); tickCounter(); });

// الأيام + الملاحظات
$$('[data-key]').forEach(el => {
  el.value = store.get(el.dataset.key, '');
  el.addEventListener('input', () => store.set(el.dataset.key, el.value));
});

// القفل
let locked = true;
function applyLock() {
  $$('[data-lock]').forEach(el => { el.disabled = locked; });
  $('#lockBtn').textContent = locked ? '🔒' : '🔓';
  $('#lockBtn').classList.toggle('open', !locked);
  $('#lockText').textContent = locked ? 'التعديل مقفول' : 'التعديل مفتوح (اضغط القفل لتقفله)';
}
$('#lockBtn').onclick = () => {
  if (locked) {
    const p = prompt('اكتب الباسورد عشان تفتح التعديل');
    if (p === null) return;
    if (p !== pw()) return alert('الباسورد غلط');
    locked = false;
  } else locked = true;
  applyLock();
};
applyLock();

// الصور: عايمة ومايلة وحوافها دايرية وحواليها ورد وقلوب
let svgId = 0;
function roseSVG() {
  const id = 'r' + (svgId++);
  const P = [['#F0709A', '#8E1B4E', '#FFD1DC'], ['#F6C45B', '#B86F0B', '#FFF1B8'], ['#B97BC0', '#4A1550', '#EBD8F2'], ['#FFFFFF', '#AEB6C2', '#F4F7FA']];
  const p = P[Math.floor(Math.random() * P.length)];
  let s = '';
  [-50, 70, 190].forEach(a => s += `<ellipse cx="50" cy="12" rx="6" ry="13" transform="rotate(${a} 50 50)" fill="#4F6A45" stroke="#2B3D27" stroke-opacity=".4" stroke-width=".6"/>`);
  [[7, 30, 20, 0], [5, 18, 15, 20], [4, 9, 10, 45]].forEach(([n, d, r, off]) => {
    for (let i = 0; i < n; i++) {
      const an = (i * 360 / n + off) * Math.PI / 180;
      s += `<circle cx="${50 + Math.cos(an) * d}" cy="${50 + Math.sin(an) * d}" r="${r}" fill="url(#${id})" stroke="${p[1]}" stroke-opacity=".45" stroke-width=".9"/>`;
    }
  });
  s += `<path d="M50 50 m-3 0 a3 3 0 1 1 3 3 a6 6 0 1 1 -6 -8" fill="none" stroke="${p[1]}" stroke-opacity=".7" stroke-width="1.2" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${id}" cx="50%" cy="50%" r="70%"><stop offset="0" stop-color="${p[1]}"/><stop offset=".6" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[2]}"/></radialGradient></defs>${s}</svg>`;
}
function miniHeartSVG() {
  const id = 'mh' + (svgId++), C = [['#FF9DBB', '#B8265F'], ['#F7D98E', '#B86F0B'], ['#D9B3E0', '#6B2A6F']];
  const c = C[Math.floor(Math.random() * C.length)];
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${id}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient></defs>
    <path d="M50 90 C8 60 0 30 22 15 C36 7 48 15 50 26 C52 15 64 7 78 15 C100 30 92 60 50 90Z" fill="url(#${id})"/><ellipse cx="30" cy="27" rx="9" ry="5" transform="rotate(-35 30 27)" fill="#fff" opacity=".45"/></svg>`;
}
const SPOTS = [[0, 0, 1], [25, -1, 0], [50, -2, 1], [75, -1, 0], [100, 0, 1],
  [100, 33, 0], [100, 66, 1], [100, 100, 1], [75, 101, 0], [50, 102, 1], [25, 101, 0], [0, 100, 1], [0, 66, 0], [0, 33, 1]];
const g = $('#gallery');
for (let i = 1; i <= CONFIG.images; i++) {
  const fig = document.createElement('figure');
  fig.className = 'polaroid p' + i;
  fig.style.animationDelay = (-i * 1.3) + 's';
  const ph = document.createElement('div');
  ph.className = 'ph';
  const img = new Image();
  img.src = `assets/images/image${i}.jpg`;
  img.alt = `صورة ${i}`;
  img.onerror = () => { if (!img.dataset.png) { img.dataset.png = 1; img.src = `assets/images/image${i}.png`; } };
  ph.appendChild(img);
  SPOTS.forEach(([x, y, big], k) => {
    const d = document.createElement('span');
    d.className = 'deco';
    const isRose = (k + i) % 2 === 0;
    const size = (big ? 54 : 38) + Math.random() * 12;
    d.style.cssText = `left:${x + rnd(-1.5, 1.5)}%;top:${y + rnd(-1.5, 1.5)}%;width:${size}px;height:${size}px;--rot:${rnd(-35, 35)}deg;animation-delay:${rnd(-4, 0)}s`;
    d.innerHTML = isRose ? roseSVG() : miniHeartSVG();
    ph.appendChild(d);
  });
  fig.appendChild(ph);
  g.appendChild(fig);
}

/* ====== رسالة الخربشة ====== */
$('#msgBtn').onclick = () => {
  const box = $('#scratchBox');
  if (!box.hidden) return;
  box.hidden = false;
  $('#scratchMsg').textContent = CONFIG.loveMessage;
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  initScratch();
};
function initScratch() {
  const c = $('#scratch'), box = $('#scratchBox');
  const r = box.getBoundingClientRect();
  c.width = r.width; c.height = r.height;
  const x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, c.width, c.height);
  gr.addColorStop(0, '#C9D0D9'); gr.addColorStop(.5, '#F4F7FA'); gr.addColorStop(1, '#AEB6C2');
  x.fillStyle = gr; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = 'rgba(45,10,49,.12)';
  for (let i = 0; i < 250; i++) x.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  x.globalCompositeOperation = 'destination-out';
  let down = false, moves = 0;
  const pos = e => { const b = c.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return [p.clientX - b.left, p.clientY - b.top]; };
  const scratch = e => {
    if (!down) return; e.preventDefault();
    const [px, py] = pos(e);
    x.beginPath(); x.arc(px, py, 22, 0, Math.PI * 2); x.fill();
    if (++moves === 8) $('#hint').style.opacity = 0;
  };
  ['mousedown', 'touchstart'].forEach(ev => c.addEventListener(ev, e => { down = true; scratch(e); }, { passive: false }));
  ['mousemove', 'touchmove'].forEach(ev => c.addEventListener(ev, scratch, { passive: false }));
  ['mouseup', 'mouseleave', 'touchend'].forEach(ev => c.addEventListener(ev, () => down = false));
}

/* ====== عداد القلب ====== */
(function () {
  const btn = $('#heartBtn'), msg = $('#heartMsg'), left = $('#heartLeft');
  const total = CONFIG.heartMessages.length + 1;
  let clicks = 0, dead = false;
  btn.onclick = () => {
    if (dead) return;
    clicks++;
    btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
    msg.classList.remove('show'); void msg.offsetWidth;
    if (clicks < total) {
      left.textContent = total - clicks;
      msg.textContent = CONFIG.heartMessages[clicks - 1];
    } else {
      dead = true;
      btn.classList.add('dead');
      $('#heartCount').textContent = 'العداد: 0';
      msg.textContent = CONFIG.heartFinal;
      msg.classList.add('final');
      for (let i = 0; i < 16; i++) {
        const d = document.createElement('i');
        d.className = 'dust';
        d.style.cssText = `left:${rnd(30, 70)}%;animation-delay:${rnd(.2, 1.6)}s;width:${rnd(3, 7)}px;height:${rnd(3, 7)}px`;
        btn.appendChild(d);
      }
    }
    msg.classList.add('show');
  };
})();
