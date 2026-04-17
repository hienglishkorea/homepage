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

  const cards = Array.from(track.children);
  const total = cards.length;
  if (total === 0) return;

  let current = 0;

  // 모바일: 탭으로 한 장씩 전환
  if (window.innerWidth <= 768) {
    const container = document.querySelector('.teacher-right');

    function mStep() {
      return container ? container.clientHeight : 320;
    }

    function moveTo(index) {
      current = ((index % total) + total) % total;
      track.style.transition = 'transform 0.4s cubic-bezier(.22,1,.36,1)';
      track.style.transform = 'translateY(-' + (current * mStep()) + 'px)';
      // 도트 업데이트
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    // 도트 생성
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'teacher-dots-mobile';
    dotsWrap.style.cssText = 'display:flex;justify-content:center;gap:6px;padding:10px 0 4px;';
    var dots = cards.map(function(_, i) {
      var d = document.createElement('div');
      d.style.cssText = 'width:7px;height:7px;border-radius:50%;background:' + (i===0?'#7c3aed':'#d1c4e9') + ';transition:background 0.2s;';
      dotsWrap.appendChild(d);
      return d;
    });
    if (container && container.parentNode) {
      container.parentNode.insertBefore(dotsWrap, container.nextSibling);
    }

    // 카드 높이를 컨테이너에 맞춤
    cards.forEach(function(card) {
      card.style.height = mStep() + 'px';
      card.style.marginBottom = '0';
    });

    moveTo(0);

    // 탭으로 다음 카드
    section.addEventListener('click', function() {
      moveTo(current + 1);
    });
    return;
  }

  // PC: 휠 롤링
  const STEP = 460;
  const LOCK_MS = 500;
  let isLocked = false;

  function moveTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateY(-${current * STEP}px)`;
  }

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
