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

  var cards = Array.from(section.querySelectorAll('.stack-card'));
  var dots  = Array.from(section.querySelectorAll('.stack-dot'));
  var N = cards.length;
  if (!N) return;

  var ticking = false;
  var activeIdx = 0;

  function update() {
    var rect       = section.getBoundingClientRect();
    var sectionH   = section.offsetHeight;
    var winH       = window.innerHeight;
    var totalScroll = sectionH - winH;
    var scrolled   = -rect.top;
    var progress   = Math.max(0, Math.min(1, scrolled / totalScroll));

    cards.forEach(function (card, i) {
      var ty, op, zi;

      if (i === 0) {
        // 첫 카드는 항상 바닥에 깔려 있음
        ty = 0; op = 1; zi = 1;
      } else {
        // 카드 i는 progress = i/(N-1) 에서 완전히 나타남
        var fullAt  = i / (N - 1);
        var startAt = fullAt - 0.5 / (N - 1);

        if (progress < startAt) {
          ty = 100; op = 0; zi = i + 1;
        } else if (progress < fullAt) {
          var t = (progress - startAt) / (fullAt - startAt);
          // 이징: ease-out cubic
          var ease = 1 - Math.pow(1 - t, 3);
          ty = (1 - ease) * 100;
          op = Math.min(1, t * 2);
          zi = i + 10;
        } else {
          ty = 0; op = 1; zi = i + 10;
        }
      }

      card.style.zIndex   = zi;
      card.style.transform = 'translateY(' + ty.toFixed(2) + '%)';
      card.style.opacity   = op.toFixed(3);
    });

    // 현재 최상위 카드 계산 (도트 업데이트)
    var current = 0;
    if (progress >= 1) {
      current = N - 1;
    } else {
      current = Math.round(progress * (N - 1));
    }
    if (current !== activeIdx) {
      activeIdx = current;
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === activeIdx);
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
