document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.reviews__slider');
  const slides = Array.from(document.querySelectorAll('.reviews__slide'));
  const prevBtn = document.querySelector('.reviews__arrow--prev');
  const nextBtn = document.querySelector('.reviews__arrow--next');
  const pagination = document.querySelector('.reviews__pagination');

  let currentIndex = 0;

  const slideWidth = slides[0].offsetWidth;
  const gap = parseInt(getComputedStyle(slider).gap) || 0;
  const step = slideWidth + gap;

  // --- Dots generate (overrides even if HTML is static)
  pagination.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('reviews__dot');
    if (index === 0) dot.classList.add('reviews__dot--active');

    dot.addEventListener('click', () => {
      goToSlide(index);
    });

    pagination.appendChild(dot);
  });

  const dots = Array.from(document.querySelectorAll('.reviews__dot'));

  function updateUI() {
    slider.style.transform = `translateX(-${currentIndex * step}px)`;

    slides.forEach(slide =>
      slide.classList.remove('reviews__slide--active')
    );
    slides[currentIndex].classList.add('reviews__slide--active');

    dots.forEach(dot =>
      dot.classList.remove('reviews__dot--active')
    );
    dots[currentIndex].classList.add('reviews__dot--active');
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    currentIndex = index;
    updateUI();
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateUI();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI();
    }
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Do active when slide clicked
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Resize fix 
  window.addEventListener('resize', () => {
    updateUI();
  });

  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  let moved = false;

  const threshold = 60;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentTranslate = -currentIndex * step;
    isDragging = true;
    moved = false;
    slider.style.transition = 'none';
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 5) moved = true;

    slider.style.transform = `translateX(${currentTranslate + diff}px)`;
  });

  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    slider.style.transition = 'transform 0.4s ease';

    if (Math.abs(diff) > threshold) {
      if (diff < 0 && currentIndex < slides.length - 1) {
        currentIndex++;
      } else if (diff > 0 && currentIndex > 0) {
        currentIndex--;
      }
    }

    updateUI();

    isDragging = false;
  });

});
