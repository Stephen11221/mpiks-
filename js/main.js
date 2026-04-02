const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const liveClock = document.getElementById("liveClock");
const mobileLiveClock = document.getElementById("mobileLiveClock");
const pageLoader = document.getElementById("pageLoader");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

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

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

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
