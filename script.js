import LiquidBackground from
'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js';

/* ===== DOM ===== */
const canvas = document.getElementById('canvas');
const staticImg = document.getElementById('staticImg');

const nav = document.getElementById('nav');
const toggle = document.getElementById('toggle');
const toggleImg = document.getElementById('toggleImg');

const aboutCarousel = document.getElementById('aboutCarousel');
const portfolioCarousel = document.getElementById('portfolioCarousel');

/* popup 먼저 선언 (에러 원인 제거) */
const popup = document.getElementById('popup');
const popupDim = document.getElementById('popupDim');
const popupImg = document.getElementById('popupImg');
const popupClose = document.getElementById('popupClose');

let app;

/* ===== liquid init ===== */
async function init() {
  app = LiquidBackground(canvas);
  await app.loadImage('image/mainpage.jpg');
}
init();

/* ===== carousel ===== */
function initCarousel(el) {
  const viewport = el.querySelector('.carousel__viewport');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  let idx = 0;

  function move() {
    viewport.scrollTo({
      left: viewport.offsetWidth * idx,
      behavior: 'smooth'
    });
  }

  prev.onclick = () => { if (idx > 0) idx--, move(); };
  next.onclick = () => { if (idx < viewport.children.length - 1) idx++, move(); };

  return { reset(){ idx=0; move(); } };
}

const about = initCarousel(aboutCarousel);
const portfolio = initCarousel(portfolioCarousel);

/* ===== nav ===== */
toggle.onclick = () => {
  nav.classList.toggle('active');
  toggleImg.src = nav.classList.contains('active')
    ? 'image/hamburgerout.png'
    : 'image/hamburgerin.png';
};

document.getElementById('goAbout').onclick = e => {
  e.preventDefault();
  portfolioCarousel.style.display = 'none';
  aboutCarousel.style.display = 'block';
  about.reset();
};

document.getElementById('goPortfolio').onclick = e => {
  e.preventDefault();
  aboutCarousel.style.display = 'none';
  portfolioCarousel.style.display = 'block';
  portfolio.reset();
};

/* ===== popup ===== */
document.querySelectorAll('.detail-button').forEach(btn=>{
  btn.onclick = e=>{
    e.preventDefault();
    popupImg.src = btn.dataset.popup;
    popup.classList.add('show');
    popupDim.classList.add('show');
  };
});

popupClose.onclick = close;
popupDim.onclick = close;

function close(){
  popup.classList.remove('show');
  popupDim.classList.remove('show');
}
