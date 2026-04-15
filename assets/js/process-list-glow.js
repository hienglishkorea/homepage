// process-list-glow.js: 교육 운영 1~6단계 순차적으로 glow & 확대 효과

document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.process-list li');
  let idx = 0;
  function clearAll() {
    steps.forEach(el => {
      el.classList.remove('active-glow');
    });
  }
  function activateStep(i) {
    clearAll();
    if (steps[i]) steps[i].classList.add('active-glow');
  }
  function loopGlow() {
    activateStep(idx);
    idx = (idx + 1) % steps.length;
    setTimeout(loopGlow, 1200);
  }
  if (steps.length > 0) loopGlow();
});
