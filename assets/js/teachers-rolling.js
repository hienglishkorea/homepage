// ===== 강사 추천 관리 이미지 롤러 (무한 연속 루프, 가운데 확대) =====
(function () {
  function initImageRoller() {
    var roller = document.querySelector('#강사 .teacher-image-roller');
    if (!roller) return;

    var track = roller.querySelector('.tir-track');
    var originals = Array.from(track.querySelectorAll('.tir-item'));
    var count = originals.length; // 5
    if (!count) return;

    originals.forEach(function (item) {
      track.insertBefore(item.cloneNode(true), originals[0]);
    });
    originals.forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });

    var all = Array.from(track.querySelectorAll('.tir-item')); // 15장
    var active = count + Math.floor(count / 2);

    function itemW() {
      return roller.clientWidth / count;
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
        markActive();
        reposition(true);
        setTimeout(function () {
          active -= count;
          markActive();
          reposition(false);
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

  // ===== 동영상이력서 소리 버튼 =====
  function initVideoSoundBtns() {
    document.querySelectorAll('.teacher-video-sound-btn').forEach(function (btn) {
      var targetId = btn.getAttribute('data-target');
      var video = targetId ? document.getElementById(targetId) : null;
      if (!video) return;
      var labels = { 'video-en': ['영어소리켜기', '영어소리끄기'], 'video-ja': ['일본어소리켜기', '일본어소리끄기'], 'video-zh': ['중국어소리켜기', '중국어소리끄기'] };
      btn.addEventListener('click', function () {
        video.muted = !video.muted;
        var pair = labels[targetId] || ['소리켜기', '소리끄기'];
        btn.textContent = video.muted ? pair[0] : pair[1];
        btn.setAttribute('aria-pressed', String(!video.muted));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initImageRoller();
      initVideoSoundBtns();
    });
  } else {
    initImageRoller();
    initVideoSoundBtns();
  }
})();

// ===== Teachers 우측 카드 세로 휠 롤링 =====
(function () {
  const section = document.getElementById('강사');
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

  // 외부에서 특정 카드로 이동 가능하도록 전역 노출
  window.showTeacherCard = function(index) { moveTo(index); };

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
