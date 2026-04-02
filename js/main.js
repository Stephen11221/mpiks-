const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const liveClock = document.getElementById("liveClock");
const mobileLiveClock = document.getElementById("mobileLiveClock");
const pageLoader = document.getElementById("pageLoader");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const heroVisual = document.getElementById("heroVisual");
const parallaxImage = document.querySelector("[data-parallax-image]");
const counters = document.querySelectorAll("[data-counter]");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu?.classList.add("hidden");
  });
});

const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1400;
  const startTime = performance.now();

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * eased;
    const formatted = decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue).toString();

    element.textContent = `${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      const finalValue = decimals > 0 ? target.toFixed(decimals) : target.toString();
      element.textContent = `${finalValue}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

if (heroVisual && parallaxImage && window.matchMedia("(min-width: 1024px)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const rotateY = ((offsetX / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (offsetY / rect.height)) * 8;

    heroVisual.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    parallaxImage.style.transform = `scale(1.06) translate(${rotateY * 1.5}px, ${-rotateX * 1.5}px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    parallaxImage.style.transform = "scale(1)";
  });
}

function updateClock() {
  const now = new Date();
  const timeText = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (liveClock) {
    liveClock.textContent = timeText;
  }

  if (mobileLiveClock) {
    mobileLiveClock.textContent = `Time ${timeText}`;
  }
}

updateClock();
setInterval(updateClock, 1000);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const session = document.getElementById("contactSession")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !email || !session || !message) {
      if (formStatus) {
        formStatus.textContent = "Please fill in all fields before sending your inquiry.";
        formStatus.className = "text-sm leading-7 text-red-400 sm:col-span-2";
      }
      return;
    }

    const subject = encodeURIComponent(`MPIKS Inquiry: ${session}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSession Type: ${session}\n\nProject Details:\n${message}`
    );

    window.location.href = `mailto:muema1476@gmail.com?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.textContent = "Your email app should open now with your inquiry ready to send.";
      formStatus.className = "text-sm leading-7 text-gold sm:col-span-2";
    }
  });
}

function hideLoader() {
  if (!pageLoader || pageLoader.classList.contains("is-hidden")) {
    return;
  }

  pageLoader.classList.add("is-hidden");
}

window.addEventListener("load", () => {
  setTimeout(hideLoader, 650);
});

setTimeout(hideLoader, 2200);
