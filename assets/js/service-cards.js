// service-cards.js
// 출강교육~면접평가 카드 인터랙션: 마우스 오버 시 해당 카드 확대, 나머지 축소

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.solution-item');
  if (!cards.length) return;

  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      cards.forEach((c, i) => {
        if (i === idx) {
          c.classList.add('active');
          c.classList.remove('inactive');
        } else {
          c.classList.remove('active');
          c.classList.add('inactive');
        }
      });
    });
    card.addEventListener('mouseleave', () => {
      cards.forEach((c) => {
        c.classList.remove('active', 'inactive');
      });
    });
  });
});
