// ===== 특징 스크롤 강조형 카드 스택 =====
(function () {
  var section = document.getElementById('특징');
  if (!section) return;

  var cards = Array.from(section.querySelectorAll('.diff-card-stack'));
  var dots  = Array.from(section.querySelectorAll('.diff-dot'));
  var N = cards.length;
  if (!N) return;

  var ticking  = false;
  var activeIdx = 0;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update() {
    var rect        = section.getBoundingClientRect();
    var sectionH    = section.offsetHeight;
    var winH        = window.innerHeight;
    var totalScroll = sectionH - winH;
    var scrolled    = -rect.top;
    var progress    = Math.max(0, Math.min(1, scrolled / totalScroll));

    // 현재 활성 카드 인덱스
    var rawIdx  = progress * (N - 1);
    var current = Math.min(N - 1, Math.floor(rawIdx + 0.35));

    cards.forEach(function (card, i) {
      var ty, op, sc;

      if (i === current) {
        // ── 활성 카드: 아래에서 올라오며 등장 ──
        var fullAt    = N > 1 ? i / (N - 1) : 0;
        var enterStart = i > 0 ? (i - 0.5) / (N - 1) : 0;
        var t = (progress - enterStart) / Math.max(0.001, fullAt - enterStart);
        t = Math.max(0, Math.min(1, t));
        if (i === 0) t = 1; // 첫 카드는 즉시 완전 활성
        var ease = easeOutCubic(t);
        ty = (1 - ease) * 60;
        op = 0.4 + ease * 0.6;
        sc = 0.93 + ease * 0.07;

      } else if (i < current) {
        // ── 지나간 카드: 위로 올라가며 완전히 숨김 ──
        var fullAt2   = N > 1 ? i / (N - 1) : 0;
        var nextAt    = (i + 1) / (N - 1);
        var pastT     = (progress - fullAt2) / Math.max(0.001, nextAt - fullAt2);
        pastT         = Math.max(0, Math.min(1, pastT));
        var pastEase  = easeOutCubic(pastT);
        ty = -50 * pastEase;
        op = Math.max(0, 1 - pastEase * 1.2); // 완전히 0으로
        sc = 1 - pastEase * 0.06;

      } else {
        // ── 아직 안 온 카드: 완전히 숨김 ──
        ty = 70;
        op = 0;
        sc = 0.93;
      }

      card.style.transform = 'translateY(' + ty.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
      card.style.opacity   = Math.max(0, op).toFixed(3);
      card.classList.toggle('diff-active', i === current);
    });

    // 도트 업데이트
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
