// ===== Problem-Solution 3D Rolling Carousel =====
document.addEventListener('DOMContentLoaded', function () {
  const cardsData = [
    { t: '문제1', s: '실력이 늘지 않습니다.', d: '큰 예산을 투자해도, 직원들이 외국어를 활용못합니다.' },
    { t: '해결1', s: '대화 대신 수업을 합니다.', d: '준비없이 이야기만 하지 않고, 커리큘럼에 맞춰 교육합니다.' },
    { t: '문제2', s: '참여도가 저조합니다.', d: '초기에만 반짝하고 점점 줄어들다가 결국 중단됩니다.' },
    { t: '해결2', s: '지속 관리 시스템', d: '출결·만족도·성적을 통합 관리하여 이탈을 줄이고 참여를 유지합니다.' }
  ];

  const cWrap = document.getElementById('carousel3');
  if (!cWrap) return;

  let cIndex = 0;
  let els = { left: null, center: null, right: null };

  function createCard() {
    const el = document.createElement('div');
    el.className = 'c-card';
    el.innerHTML = '<div class="c-inner"><div class="c-title"></div><div class="c-sub"></div><div class="c-desc"><div class="c-desc-box"></div></div></div>';
    return el;
  }

  function setContent(el, idx) {
    const d = cardsData[((idx % cardsData.length) + cardsData.length) % cardsData.length];
    el.querySelector('.c-title').textContent = d.t;
    el.querySelector('.c-sub').textContent = d.s;
    el.querySelector('.c-desc-box').textContent = d.d;
  }

  function initCarousel() {
    cWrap.innerHTML = '';
    els.left = createCard();
    els.center = createCard();
    els.right = createCard();
    cWrap.appendChild(els.left);
    cWrap.appendChild(els.center);
    cWrap.appendChild(els.right);
    setContent(els.left, cIndex - 1);
    setContent(els.center, cIndex);
    setContent(els.right, cIndex + 1);
    els.left.classList.add('c-left');
    els.center.classList.add('c-center');
    els.right.classList.add('c-right');
  }

  function nextCard() {
    cIndex = (cIndex + 1) % cardsData.length;
    const oldLeft = els.left;
    const oldCenter = els.center;
    const oldRight = els.right;

    els.left = oldCenter;
    els.center = oldRight;
    els.right = oldLeft;

    oldCenter.className = 'c-card c-left';
    oldRight.className = 'c-card c-center';
    oldLeft.className = 'c-card c-right';

    setContent(els.right, cIndex + 1);
  }

  initCarousel();
  cWrap.addEventListener('click', nextCard);
  setInterval(nextCard, 5000);
});
