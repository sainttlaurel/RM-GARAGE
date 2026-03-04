// =========================
// LOADING SCREEN
// =========================
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingProgress = document.querySelector('.loading-progress');
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Hide loading screen after completion
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 500);
    }
    loadingProgress.style.width = progress + '%';
  }, 200);
});

// Prevent scrolling during loading
document.body.style.overflow = 'hidden';

// =========================
// SPEED INDICATOR (Scroll Speed)
// =========================
let lastScrollTop = 0;
let scrollSpeed = 0;
const speedValue = document.getElementById('speedValue');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollSpeed = Math.abs(scrollTop - lastScrollTop);
  lastScrollTop = scrollTop;
  
  if (speedValue) {
    speedValue.textContent = Math.min(Math.round(scrollSpeed * 2), 999);
  }
});

// =========================
// DARK/LIGHT MODE
// =========================
const toggleTheme = document.querySelector('.toggle-theme');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleTheme.classList.remove('fa-moon');
  toggleTheme.classList.add('fa-sun');
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  if (isDark) {
    toggleTheme.classList.remove('fa-moon');
    toggleTheme.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    toggleTheme.classList.remove('fa-sun');
    toggleTheme.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

  // =========================
  // FILTERS
  // =========================
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const carList = document.getElementById('carList');
  const cars = carList.getElementsByClassName('car-card');

  function filterCars() {
    const searchValue = searchInput.value.toLowerCase();
    const priceValue = priceFilter.value;

    Array.from(cars).forEach(car => {
      const name = car.getAttribute('data-name').toLowerCase();
      const price = parseInt(car.getAttribute('data-price'));

      let priceMatch =
        priceValue === "all" ||
        (priceValue === "low" && price < 250000) ||
        (priceValue === "mid" && price >= 250000 && price <= 400000) ||
        (priceValue === "high" && price > 400000);

      let searchMatch = name.includes(searchValue);

      car.style.display = (priceMatch && searchMatch) ? "block" : "none";
    });
  }
  searchInput.addEventListener('input', filterCars);
  priceFilter.addEventListener('change', filterCars);

  // Hide For Sale section on page load
  const forSaleSection = document.querySelector('.for-sale');
  if (forSaleSection) {
    forSaleSection.style.display = 'none';
  }

  // Show For Sale when "Explore Now" is clicked
  const exploreBtn = document.querySelector('.btn[href="#for-sale"]');
  if (exploreBtn && forSaleSection) {
    exploreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      forSaleSection.style.display = 'block';
      forSaleSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================
  // HERO SLIDESHOW
  // =========================
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  const prevBtn = document.querySelector('.hero-slideshow .slide-btn.prev');
  const nextBtn = document.querySelector('.hero-slideshow .slide-btn.next');
  const indicatorsContainer = document.querySelector('.slide-indicators');
  let current = 0;
  let slideInterval;

  // Create indicators
  if (slides.length && indicatorsContainer) {
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        width: ${index === 0 ? '30px' : '10px'};
        height: 3px;
        background: ${index === 0 ? 'var(--racing-red)' : 'rgba(255,255,255,0.3)'};
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.3s;
      `;
      indicator.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateIndicators(idx) {
    const indicators = indicatorsContainer.querySelectorAll('div');
    indicators.forEach((indicator, i) => {
      if (i === idx) {
        indicator.style.width = '30px';
        indicator.style.background = 'var(--racing-red)';
      } else {
        indicator.style.width = '10px';
        indicator.style.background = 'rgba(255,255,255,0.3)';
      }
    });
  }

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    updateIndicators(idx);
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  }

  if (slides.length) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 4000);

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  // =========================
  // SMOOTH SCROLL FOR NAVIGATION
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        // Show For Sale section if hidden
        const forSaleSection = document.querySelector('.for-sale');
        if (forSaleSection && forSaleSection.style.display === 'none') {
          forSaleSection.style.display = 'block';
        }
        
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =========================
  // CONTACT FORM
  // =========================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();

      const subject = encodeURIComponent("New message from " + name);
      const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
      const mailtoLink = `mailto:miguelpilapil30@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
    });
  }

  // =========================
  // SCROLL ANIMATIONS
  // =========================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0s';
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.car-card, .review-card').forEach(el => {
    observer.observe(el);
  });



