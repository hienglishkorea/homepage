// ===== History 롤링 =====
(function(){
  const view = document.getElementById('historyView');
  const thumb = document.getElementById('historyThumb');
  const upBtn = document.querySelector('.history-btn.up');
  const downBtn = document.querySelector('.history-btn.down');
  if(!view || !thumb || !upBtn || !downBtn) return;

  const items = Array.from(view.children);
  let idx = 0;
  let rollingTimer = null;

  function mod(n, m){ return ((n % m) + m) % m; }

  function renderHistory(){
    items.forEach((item, i) => {
      item.classList.remove('pos-top','pos-center','pos-bottom','pos-hidden');
      const topIdx = mod(idx - 1, items.length);
      const centerIdx = idx;
      const bottomIdx = mod(idx + 1, items.length);
      if(i === topIdx) item.classList.add('pos-top');
      else if(i === centerIdx) item.classList.add('pos-center');
      else if(i === bottomIdx) item.classList.add('pos-bottom');
      else item.classList.add('pos-hidden');
    });

    const track = thumb.parentElement;
    const maxTop = track.clientHeight - thumb.clientHeight;
    const progress = items.length > 1 ? idx / (items.length - 1) : 0;
    thumb.style.top = `${maxTop * progress}px`;
  }

  function nextHistory(){
    idx = mod(idx + 1, items.length);
    renderHistory();
  }

  function prevHistory(){
    idx = mod(idx - 1, items.length);
    renderHistory();
  }

  function startHistoryAuto(){
    clearInterval(rollingTimer);
    rollingTimer = setInterval(nextHistory, 4000);
  }

  upBtn.addEventListener('click', () => { prevHistory(); startHistoryAuto(); });
  downBtn.addEventListener('click', () => { nextHistory(); startHistoryAuto(); });

  renderHistory();
  startHistoryAuto();
})();
