// ===== 강사 추천 관리 이미지 롤러 (무한 연속 루프, 가운데 확대) =====
(function () {
  function initImageRoller() {
    var roller = document.querySelector('#teachers .teacher-image-roller');
    if (!roller) return;

    var track = roller.querySelector('.tir-track');
    var originals = Array.from(track.querySelectorAll('.tir-item'));
    var count = originals.length; // 5
    if (!count) return;

    // ── 앞·뒤 각 count장 클론 삽입 ──────────────────────────────────────
    // 최종 배열: [앞클론0~4] [원본0~4] [뒤클론0~4]  (총 15개)
    // 인덱스:         0~4       5~9       10~14
    originals.forEach(function (item) {
      track.insertBefore(item.cloneNode(true), originals[0]);
    });
    originals.forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });

    var all = Array.from(track.querySelectorAll('.tir-item')); // 15장

    // 원본 가운데(원본 index 2 → 전체 index 5+2=7)에서 시작
    var active = count + Math.floor(count / 2);

    function itemW() {
      return roller.clientWidth / count; // 각 아이템 = 컨테이너 폭의 1/5
    }

    function reposition(animated) {
      track.style.transition = animated ? 'transform 0.5s ease' : 'none';
      var w = itemW();
      var offset = roller.clientWidth / 2 - active * w - w / 2;
      track.style.transform = 'translateX(' + offset + 'px)';
    }

    function markActive() {
      all.forEach(function (item, i) {
        item.classList.toggle('tir-active', i === active);
      });
    }

    function next() {
      active++;

      if (active >= count * 2) {
        // 뒤클론 영역 진입 → 애니메이션 재생 후 조용히 원본 위치로 스냅
        markActive();
        reposition(true);
        setTimeout(function () {
          active -= count;   // 예: 10 → 5  (원본 index 0)
          markActive();
          reposition(false); // 전환 없이 즉시 이동 (시각적으로 동일한 위치)
        }, 520);
      } else {
        markActive();
        reposition(true);
      }
    }

    markActive();
    reposition(false);
    setInterval(next, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageRoller);
  } else {
    initImageRoller();
  }
})();

// ===== Teachers 우측 카드 세로 휠 롤링 =====
(function () {
  const section = document.getElementById('teachers');
  const track = document.querySelector('.teacher-track');
  if (!section || !track) return;

  const cards = track.children;
  const total = cards.length;
  if (total === 0) return;

  // 카드 1장당 이동 거리 = 카드 높이 + margin-bottom
  // teachers.css: height 440 + margin-bottom 20 = 460
  const STEP = 460;
  const LOCK_MS = 500;

  let current = 0;
  let isLocked = false;

  function moveTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateY(-${current * STEP}px)`;
  }

  window.addEventListener('wheel', function (e) {
    const rect = section.getBoundingClientRect();
    const midpoint = window.innerHeight * 0.5;

    if (rect.top < midpoint && rect.bottom > midpoint) {
      const atFirst = current === 0;
      const atLast = current === total - 1;

      if (e.deltaY > 0 && !atLast) {
        e.preventDefault();
        if (!isLocked) {
          isLocked = true;
          moveTo(current + 1);
          setTimeout(function () { isLocked = false; }, LOCK_MS);
        }
      }

      if (e.deltaY < 0 && !atFirst) {
        e.preventDefault();
        if (!isLocked) {
          isLocked = true;
          moveTo(current - 1);
          setTimeout(function () { isLocked = false; }, LOCK_MS);
        }
      }
    }
  }, { passive: false });
})();
