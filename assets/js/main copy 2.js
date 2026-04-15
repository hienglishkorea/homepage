// 나중에 인터랙션 추가
console.log("HiEducation loaded");
// carousel
// headline switching
(function(){
  const section = document.getElementById('teachers');
  const wrap = document.querySelector('.teacher-track');
  if(!section || !wrap) return;

  const blocks = wrap.children;
  const total = blocks.length;
  let current = 0;
  let isLocked = false;

  function moveTo(index){
    current = Math.max(0, Math.min(index, total - 1));
    const targetOffset = blocks[current].offsetTop;
    wrap.style.transform = `translateY(-${targetOffset}px)`;
  }

  window.showTeacherTrackCard = function(index){
    moveTo(index);
  };

  window.addEventListener('wheel', (e)=>{
    const rect = section.getBoundingClientRect();

    if(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5){

      const atFirst = current === 0;
      const atLast = current === total - 1;

      if(e.deltaY > 0 && !atLast){
        e.preventDefault();
        if(!isLocked){
          isLocked = true;
          moveTo(current + 1);
          setTimeout(()=>{ isLocked = false; }, 500);
        }
      }

      if(e.deltaY < 0 && !atFirst){
        e.preventDefault();
        if(!isLocked){
          isLocked = true;
          moveTo(current - 1);
          setTimeout(()=>{ isLocked = false; }, 500);
        }
      }
    }
  }, { passive:false });
})();

// Teachers 헤드라인 스크롤 애니메이션
(function(){
  const section = document.getElementById('teachers');
  if(!section) return;
  const h1 = section.querySelector('.headline-1');
  const h2 = section.querySelector('.headline-2');
  if(!h1 || !h2) return;

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        h1.classList.add('active');
        setTimeout(function(){ h2.classList.add('active'); }, 1000);
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(section);
})();

(function(){
  const cards = document.querySelectorAll('#teachers .tm-flip-card');
  if(!cards.length) return;

  cards.forEach(function(card){
    card.addEventListener('click', function(){
      if(window.innerWidth <= 1024){
        card.classList.toggle('is-flipped');
      }
    });
  });
})();

function matchTeacher() {
  const langEl = document.getElementById('teacherLang');
  const regionEl = document.getElementById('teacherRegion');
  const typeEl = document.getElementById('teacherType');
  const resultEl = document.getElementById('teacherMatchResult');

  if (!langEl || !regionEl || !typeEl || !resultEl) return;

  const lang = langEl.value;
  const region = regionEl.value;
  const type = typeEl.value;

  if (lang === '언어 선택' || region === '지역 선택' || type === '강사 유형') {
    resultEl.innerText = '모든 조건을 선택해주세요.';
    return;
  }

  resultEl.innerText = `${region} 지역에서 ${type} ${lang} 강사를 추천합니다`;

  if (typeof window.showTeacherTrackCard === 'function') {
    window.showTeacherTrackCard(2);
  }

  setTimeout(function () {
    const showcase = document.querySelector('#teachers .profile-showcase');
    if (!showcase) return;

    const profileCards = showcase.querySelectorAll('.tm-flip-card');
    if (!profileCards.length) return;

    profileCards.forEach(function(card){ card.classList.remove('recommended'); });

    const randomIndex = Math.floor(Math.random() * profileCards.length);
    const picked = profileCards[randomIndex];
    picked.classList.add('recommended');

    const targetTop = Math.max(0, picked.offsetTop - 14);
    showcase.scrollTo({ top: targetTop, behavior: 'smooth' });
  }, 520);
}

// 카드 데이터
const cardsData=[
{t:'문제',s:'실력이 늘지 않습니다.',d:'큰 예산을 투자해도, 직원들이 외국어를 활용못합니다.'},
{t:'해결',s:'대화 대신 수업을 합니다.',d:'준비없이 이야기만 하지 않고, 커리큘럼에 맞춰 교육합니다.'},
{t:'문제',s:'참여도가 저조합니다.',d:'초기에만 반짝하고 점점 줄어들다가 결국 중단됩니다.'},
{t:'해결',s:'방치 대신 케어합니다.',d:'출결과 만족도를 촘촘히 관리하여 늘 동기부여를 합니다.'},
{t:'문제',s:'강사가 불만입니다.',d:'강사가 수업을 자주 취소하고 수업 준비를 안해옵니다.'},
{t:'해결',s:'검증된 강사를 추천합니다.',d:'근태와 만족도를 철저하게 확인합니다.'}
];

let cIndex=0;
const cWrap=document.getElementById('carousel3');

let els={left:null,center:null,right:null};

function createCard(){
  const el=document.createElement('div');
  el.className='c-card';
  el.innerHTML=`<div class="c-inner"><div class="c-title"></div><div class="c-sub"></div><div class="c-desc"><div class="c-desc-box"></div></div></div>`;
  return el;
}

function setContent(el,idx){
  const d=cardsData[(idx+cardsData.length)%cardsData.length];
  el.querySelector('.c-title').textContent=d.t;
  el.querySelector('.c-sub').textContent=d.s;
  el.querySelector('.c-desc-box').textContent=d.d;
}

function initCarousel(){
  els.left=createCard();
  els.center=createCard();
  els.right=createCard();
  cWrap.appendChild(els.left);
  cWrap.appendChild(els.center);
  cWrap.appendChild(els.right);
  setContent(els.left,cIndex-1);
  setContent(els.center,cIndex);
  setContent(els.right,cIndex+1);
  els.left.classList.add('c-left');
  els.center.classList.add('c-center');
  els.right.classList.add('c-right');
}

function nextCard(){
  cIndex=(cIndex+1)%cardsData.length;
  const oldLeft=els.left;
  const oldCenter=els.center;
  const oldRight=els.right;

  els.left=oldCenter;
  els.center=oldRight;
  els.right=oldLeft;

  oldCenter.className='c-card c-left';
  oldRight.className='c-card c-center';
  oldLeft.className='c-card c-right';

  setContent(els.right,cIndex+1);
}

if(cWrap){
  initCarousel();
  cWrap.addEventListener('click',nextCard);
  setInterval(nextCard,5000);
}

// 헤드라인 전환
(function(){
  const h1_1 = document.querySelector('.headline-1');
  const h1_2 = document.querySelector('.headline-2');
  const hero = document.querySelector('.hero');

  const bgImages = [
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80'
  ];

  let toggle = false;

  setInterval(()=>{
    if(!h1_1 || !h1_2 || !hero) return;

    if(toggle){
      h1_1.classList.add('active');
      h1_2.classList.remove('active');
      hero.style.background = `linear-gradient(115deg, rgba(5,10,25,0.55), rgba(13,27,63,0.45)), url('${bgImages[0]}') center/cover no-repeat`;
    } else {
      h1_1.classList.remove('active');
      h1_2.classList.add('active');
      hero.style.background = `linear-gradient(115deg, rgba(5,10,25,0.55), rgba(13,27,63,0.45)), url('${bgImages[1]}') center/cover no-repeat`;
    }

    toggle = !toggle;
  }, 4000);
})();
// ===== History 롤링 =====
(function(){
  const view = document.getElementById('historyView');
  const thumb = document.getElementById('historyThumb');
  const upBtn = document.querySelector('.history-btn.up');
  const downBtn = document.querySelector('.history-btn.down');
  if(!view || !thumb || !upBtn || !downBtn) return;

  const items = Array.from(view.children);
  let idx = 0;
  let rollingTimer = null;

  function mod(n, m){ return ((n % m) + m) % m; }

  function renderHistory(){
    items.forEach((item, i) => {
      item.classList.remove('pos-top','pos-center','pos-bottom','pos-hidden');
      const topIdx = mod(idx - 1, items.length);
      const centerIdx = idx;
      const bottomIdx = mod(idx + 1, items.length);
      if(i === topIdx) item.classList.add('pos-top');
      else if(i === centerIdx) item.classList.add('pos-center');
      else if(i === bottomIdx) item.classList.add('pos-bottom');
      else item.classList.add('pos-hidden');
    });

    const track = thumb.parentElement;
    const maxTop = track.clientHeight - thumb.clientHeight;
    const progress = items.length > 1 ? idx / (items.length - 1) : 0;
    thumb.style.top = `${maxTop * progress}px`;
  }

  function nextHistory(){
    idx = mod(idx + 1, items.length);
    renderHistory();
  }

  function prevHistory(){
    idx = mod(idx - 1, items.length);
    renderHistory();
  }

  function startHistoryAuto(){
    clearInterval(rollingTimer);
    rollingTimer = setInterval(nextHistory, 4000);
  }

  upBtn.addEventListener('click', () => { prevHistory(); startHistoryAuto(); });
  downBtn.addEventListener('click', () => { nextHistory(); startHistoryAuto(); });

  renderHistory();
  startHistoryAuto();
})();

// ===== References 로고 스크롤 =====
(function(){
  const logoSection = document.getElementById('refLogoSection');
  const thumb = document.getElementById('refThumb');
  const upBtn = document.querySelector('.ref-btn.up');
  const downBtn = document.querySelector('.ref-btn.down');
  if(!logoSection || !thumb || !upBtn || !downBtn) return;

  const industryOrder = ['대기업', '제조', '제약', 'IT', '금융', '공공기관'];
  const logosByIndustry = {
    '대기업': [
      'lotte-department.png',
      'lotte.png',
      'shinsegae.png',
      'e-mart.png',
      'hyundai.png',
      'sk.jpeg',
      'lg.jpeg',
      'lgdisplay.jpeg',
      '711.jpeg'
    ],
    '제조': [
      'posco.png',
      'oci.png',
      'hyundai-steel.png',
      'dongkuk-steel.png',
      'mobis.jpeg',
      'samsungsdi.jpeg',
      'hdheavy.jpeg',
      'kai.jpeg',
      'nexflex.png'
    ],
    '제약': [
      'yuhan.png',
      'yuhwa.png',
      'yuyoung.png',
      'gc-biopharma.png',
      'greecross.jpeg',
      'dong-a.png'
    ],
    'IT': [
      'kakao.png',
      'daum.png',
      'fadu.png',
      'sonatus.png'
    ],
    '금융': [
      'bankofkorea.jpeg',
      'bc-card.png',
      'bccard.jpeg',
      'kdb.png',
      'woori.png',
      'samil.png',
      'samil-pwc.png'
    ],
    '공공기관': [
      'ministry-of-culture-sports-tourism.png',
      'ministry-of-smes-and-startups.png',
      'national-research-council.png',
      'korea-institute-of-engineering-and-building-technology.png',
      'korea-transportation-safety-authority.png',
      'jejuair.jpeg'
    ]
  };

  // Build the references logo list from the requested industry order.
  logoSection.innerHTML = '';
  industryOrder.forEach((industry) => {
    const group = document.createElement('div');
    group.className = 'ref-group';

    const title = document.createElement('h4');
    title.textContent = industry;
    group.appendChild(title);

    const logosGrid = document.createElement('div');
    logosGrid.className = 'ref-logos';

    (logosByIndustry[industry] || []).forEach((fileName) => {
      const box = document.createElement('div');
      box.className = 'logo-box';

      const img = document.createElement('img');
      img.src = `assets/images/${encodeURIComponent(fileName)}`;
      img.alt = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      img.loading = 'lazy';

      box.appendChild(img);
      logosGrid.appendChild(box);
    });

    group.appendChild(logosGrid);
    logoSection.appendChild(group);
  });

  logoSection.scrollTop = 0;

  function updateRefThumb(){
    const maxScroll = logoSection.scrollHeight - logoSection.clientHeight;
    const track = thumb.parentElement;
    const maxTop = track.clientHeight - thumb.clientHeight;
    const progress = maxScroll > 0 ? logoSection.scrollTop / maxScroll : 0;
    thumb.style.top = `${maxTop * progress}px`;
  }

  function scrollUp(){
    logoSection.scrollBy({ top: -150, behavior: 'smooth' });
    setTimeout(updateRefThumb, 100);
  }

  function scrollDown(){
    logoSection.scrollBy({ top: 150, behavior: 'smooth' });
    setTimeout(updateRefThumb, 100);
  }

  upBtn.addEventListener('click', scrollUp);
  downBtn.addEventListener('click', scrollDown);

  logoSection.addEventListener('scroll', updateRefThumb);
  updateRefThumb();
})();
