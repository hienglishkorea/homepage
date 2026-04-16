// ===== 성과 스크롤 스택 =====
(function () {
  var section = document.getElementById('성과');
  if (!section) return;

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
