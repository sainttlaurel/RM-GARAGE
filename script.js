document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // CAR FILTER
  // =========================
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const cars = [...document.querySelectorAll('#carList .car-card')];

  const filterCars = () => {
    const search = searchInput?.value.toLowerCase() || '';
    const price = priceFilter?.value || 'all';

    cars.forEach(car => {
      const name = car.dataset.name.toLowerCase();
      const priceValue = parseInt(car.dataset.price);

      const priceMatch = price === 'all' ||
        (price === 'low' && priceValue < 250000) ||
        (price === 'mid' && priceValue >= 250000 && priceValue <= 400000) ||
        (price === 'high' && priceValue > 400000);

      car.style.display = (priceMatch && name.includes(search)) ? 'block' : 'none';
    });
  };

  searchInput?.addEventListener('input', filterCars);
  priceFilter?.addEventListener('change', filterCars);

  // =========================
  // FOR SALE SECTION
  // =========================
  const forSaleSection = document.querySelector('.for-sale');
  const exploreBtn = document.querySelector('.btn[href="#for-sale"]');

  const showForSale = () => {
    if (forSaleSection && forSaleSection.style.display === 'none') {
      forSaleSection.style.display = 'block';
      setTimeout(() => forSaleSection.style.opacity = '1', 50);
    }
  };

  if (forSaleSection) {
    forSaleSection.style.display = 'none';
    forSaleSection.style.opacity = '0';
    forSaleSection.style.transition = 'opacity 0.8s ease';
  }

  exploreBtn?.addEventListener('click', e => {
    e.preventDefault();
    showForSale();
    forSaleSection?.scrollIntoView({ behavior: 'smooth' });
  });

  // =========================
  // HERO SLIDESHOW + HERO TEXT SYNC
  // =========================
  const slides = [...document.querySelectorAll('.hero-slideshow .slide')];
  const heroTexts = [
    "DRIVE MO, KWENTO MO! 🚗💨",
    "BILI NA, PARA SA SAYA AT LAKAS NG RIDE MO! 🎉",
    "Huwag palampasin! ⏰ Limited units lang!"
  ];
  const heroElement = document.getElementById('hero-text');
  const prevBtn = document.querySelector('.hero-slideshow .slide-btn.prev');
  const nextBtn = document.querySelector('.hero-slideshow .slide-btn.next');

  let currentSlide = 0;
  let slideInterval;

  const showSlide = idx => {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    if (heroElement) {
      heroElement.style.opacity = 0;
      setTimeout(() => {
        heroElement.textContent = heroTexts[idx];
        heroElement.style.opacity = 1;
      }, 400);
    }
    currentSlide = idx;
  };

  const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);

  if (slides.length) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 3500);

    const resetSlideInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3500);
    };

    nextBtn?.addEventListener('click', () => { nextSlide(); resetSlideInterval(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); resetSlideInterval(); });
  }

  // =========================
  // SCROLL LINKS
  // =========================
  document.querySelectorAll('.slide-link').forEach(btn => {
    btn.addEventListener('click', e => {
      const targetId = btn.getAttribute('href')?.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        showForSale();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================
  // CONTACT FORM
  // =========================
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    const subject = encodeURIComponent(`New message from ${name.value.trim()}`);
    const body = encodeURIComponent(`From: ${name.value.trim()} (${email.value.trim()})\n\n${message.value.trim()}`);
    window.location.href = `mailto:miguelpilapil30@gmail.com?subject=${subject}&body=${body}`;
  });

  // =========================
  // REVEAL REVIEWS ON SCROLL
  // =========================
  const reviewCards = [...document.querySelectorAll('.review-card')];
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    reviewCards.forEach(card => {
      if (card.getBoundingClientRect().top < triggerBottom) card.classList.add('show');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // =========================
  // MARK SOLD CARS
  // =========================
  const soldCars = ["Toyota LC200", "Honda Civic, 1998" ];
  document.querySelectorAll('.car-card').forEach(card => {
    const title = card.querySelector('.car-title')?.textContent.trim();
    if (title && soldCars.includes(title)) card.classList.add('sold');
  });

});

// =========================
// REVIEWS SLIDER 
// =========================
const track = document.querySelector('.review-track');
const cards = document.querySelectorAll('.review-card');
const dotsContainer = document.querySelector('.review-dots');
const prevBtn = document.querySelector('.review-prev');
const nextBtn = document.querySelector('.review-next');
const slider = document.querySelector('.review-slider');

let index = 0;
let autoSlideInterval;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.review-dots span');

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  cards.forEach((card, i) => card.classList.toggle('show', i === index));
}

function nextSlide() {
  index = (index + 1) % cards.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + cards.length) % cards.length;
  updateSlider();
}

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Pause on hover
slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseleave', startAutoSlide);

// Arrow controls
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});
prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Swipe support (mobile)
let startX = 0;
let isDragging = false;

slider.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
  clearInterval(autoSlideInterval);
});

slider.addEventListener('touchmove', e => {
  if (!isDragging) return;
  let moveX = e.touches[0].clientX;
  let diff = startX - moveX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlide(); // swipe left → next
    else prevSlide();          // swipe right → prev
    isDragging = false;
    resetAutoSlide();
  }
});

slider.addEventListener('touchend', () => {
  isDragging = false;
});

// Init
updateSlider();
startAutoSlide();




