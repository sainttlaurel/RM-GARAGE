// Dark/Light Mode
const toggleTheme = document.querySelector('.toggle-theme');

// Load saved theme
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

  // Filters
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

  // Hero Slideshow
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  const prevBtn = document.querySelector('.hero-slideshow .slide-btn.prev');
  const nextBtn = document.querySelector('.hero-slideshow .slide-btn.next');
  let current = 0;
  let slideInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  if (slides.length) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 3500);

    nextBtn.addEventListener('click', () => {
      nextSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3500);
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3500);
    });
  }

  document.querySelectorAll('.slide-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        // Show For Sale section if hidden
        const forSaleSection = document.querySelector('.for-sale');
        if (forSaleSection && forSaleSection.style.display === 'none') {
          forSaleSection.style.display = 'block';
        }
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();

      // Build mailto link
      const subject = encodeURIComponent("New message from " + name);
      const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
      const mailtoLink = `mailto:miguelpilapil30@gmail.com?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoLink;
    });
  }



