console.log("ref-logo-scroll loaded");
// ===== References 로고 스크롤 =====
(function(){
  const logoSection = document.getElementById('refLogoSection');
  const thumb = document.getElementById('refThumb');
  const upBtn = document.querySelector('.ref-btn.up');
  const downBtn = document.querySelector('.ref-btn.down');
  if(!logoSection || !thumb || !upBtn || !downBtn) return;

  function updateRefThumb(){
    const maxScroll = logoSection.scrollHeight - logoSection.clientHeight;
    const track = thumb.parentElement;
    const maxTop = track.clientHeight - thumb.clientHeight;
    const progress = maxScroll > 0 ? logoSection.scrollTop / maxScroll : 0;
    thumb.style.top = `${maxTop * progress}px`;
  }

  // 썸(파란 바) 드래그로 로고 스크롤 연동
  let isDragging = false;
  let dragStartY = 0;
  let dragStartScroll = 0;
  thumb.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartY = e.clientY;
    dragStartScroll = logoSection.scrollTop;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const track = thumb.parentElement;
    const maxTop = track.clientHeight - thumb.clientHeight;
    const maxScroll = logoSection.scrollHeight - logoSection.clientHeight;
    const deltaY = e.clientY - dragStartY;
    let newTop = thumb.offsetTop + deltaY;
    newTop = Math.max(0, Math.min(maxTop, newTop));
    const progress = newTop / maxTop;
    logoSection.scrollTop = maxScroll * progress;
    dragStartY = e.clientY;
  });
  document.addEventListener('mouseup', function() {
    isDragging = false;
    document.body.style.userSelect = '';
  });

  function scrollUp(){
    console.log('[실적스크롤] ▲ 클릭, scrollTop(before):', logoSection.scrollTop);
    logoSection.scrollBy({ top: -150, behavior: 'smooth' });
    updateRefThumb();
    console.log('[실적스크롤] ▲ 클릭 후 scrollTop(after):', logoSection.scrollTop);
  }

  function scrollDown(){
    console.log('[실적스크롤] ▼ 클릭, scrollTop(before):', logoSection.scrollTop);
    logoSection.scrollBy({ top: 150, behavior: 'smooth' });
    updateRefThumb();
    console.log('[실적스크롤] ▼ 클릭 후 scrollTop(after):', logoSection.scrollTop);
  }

  upBtn.addEventListener('click', scrollUp);
  downBtn.addEventListener('click', scrollDown);

  logoSection.addEventListener('scroll', updateRefThumb);
  updateRefThumb();

  // 아래에서 위로 자동 롤링 (로고가 적어도 무조건 실행)
  let rollingInterval = setInterval(() => {
    if (logoSection.scrollTop <= 0) {
      logoSection.scrollTop = logoSection.scrollHeight - logoSection.clientHeight - 1;
    } else {
      logoSection.scrollTop = logoSection.scrollTop - 1;
    }
    updateRefThumb();
  }, 30); // 속도 조절(30ms마다 1px)
})();
