// ===== 성과 스크롤 스택 =====
(function () {
  var section = document.getElementById('성과');
  if (!section) return;

  // 모바일: 탭으로 한 장씩 아래서 위로 전환
  if (window.innerWidth <= 768) {
    var mCards = Array.from(section.querySelectorAll('.stack-card'));
    var mDots  = Array.from(section.querySelectorAll('.stack-dot'));
    var mN = mCards.length;
    if (!mN) return;
    var mCurrent = 0;
    var mBusy = false;

    mCards.forEach(function(card, i) {
      card.style.display   = i === 0 ? 'block' : 'none';
      card.style.opacity   = i === 0 ? '1' : '0';
      card.style.transform = 'translateY(0)';
    });
    mDots.forEach(function(d, i) { d.classList.toggle('active', i === 0); });

    section.addEventListener('click', function() {
      if (mBusy) return;
      mBusy = true;
      mCards[mCurrent].style.display = 'none';
      var next = (mCurrent + 1) % mN;
      var nc = mCards[next];
      nc.style.transition = 'none';
      nc.style.transform  = 'translateY(60px)';
      nc.style.opacity    = '0';
      nc.style.display    = 'block';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          nc.style.transition = 'transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.35s ease';
          nc.style.transform  = 'translateY(0)';
          nc.style.opacity    = '1';
          setTimeout(function() { mBusy = false; }, 420);
        });
      });
      mCurrent = next;
      mDots.forEach(function(d, i) { d.classList.toggle('active', i === mCurrent); });
    });
    return;
  }

  // PC: 스크롤 애니메이션 제거 — 카드 전체를 페이지 스크롤로 표시
  var cards = Array.from(section.querySelectorAll('.stack-card'));
  cards.forEach(function(card) {
    card.style.transform = 'none';
    card.style.opacity   = '1';
    card.style.position  = 'relative';
  });
})();
