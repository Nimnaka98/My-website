(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// Footer Year Change Mode
document.addEventListener("DOMContentLoaded", function () {
  // Get the current year
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;

  // Calculate the date 2 days ago
  const today = new Date();
  const lastUpdatedDate = new Date(today.setDate(today.getDate() - 2));

  // Format the date (e.g., "5th September 2024")
  const day = lastUpdatedDate.getDate();
  const month = lastUpdatedDate.toLocaleString("default", { month: "long" });
  const year = lastUpdatedDate.getFullYear();

  // Add ordinal suffix to the day (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // General rule
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = `${day}<sup>${getOrdinalSuffix(
    day
  )}</sup> ${month} ${year}`;

  // Set the last updated date
  document.getElementById("last-updated").innerHTML = formattedDate;
});

// Birthday Adjustment
document.addEventListener("DOMContentLoaded", function () {
  const birthDate = new Date("1998-04-15"); // My birthdate
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const birthMonthDay = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // If today's date is before the birthday this year, subtract one year from the age
  if (today < birthMonthDay) {
    age--;
  }

  // Set the age in the HTML
  document.getElementById("age").textContent = age;
});

// Music section in the front page
document.addEventListener("DOMContentLoaded", function () {
  // Show the container with a delay of 7 seconds
  setTimeout(() => {
    const musicPlayerContainer = document.getElementById(
      "music-player-container"
    );
    musicPlayerContainer.classList.remove("hidden");
    musicPlayerContainer.classList.add("show");
    generateBubbles(); // Start the bubbles effect
    console.log("Music player container shown."); // Debug log
  }, 7000);

  const playMusicBtn = document.getElementById("play-music-btn");
  const musicList = document.getElementById("music-list");
  const musicPlayerContainer = document.getElementById(
    "music-player-container"
  );
  const closeBtn = document.getElementById("close-music-player");
  const musicElements = document.querySelectorAll(".music");

  // Play button event listener
  playMusicBtn.addEventListener("click", function () {
    console.log("Play button clicked."); // Debug log

    // Expand the container and show the music list
    musicPlayerContainer.classList.add("expanded");
    musicList.classList.remove("hidden");
    document.getElementById("initial-text").style.display = "none"; // Hide the initial text
  });

  // Close button event listener
  closeBtn.addEventListener("click", function () {
    console.log("Close button clicked."); // Debug log

    // Check if any music is playing
    let anyMusicPlaying = false;
    musicElements.forEach((music) => {
      if (!music.paused) {
        anyMusicPlaying = true;
        music.pause(); // Pause the music
        console.log("Paused music."); // Debug log
      }
    });

    // If music is playing, stop all tracks
    if (anyMusicPlaying) {
      musicElements.forEach((music) => {
        music.pause();
        music.currentTime = 0;
        console.log("Stopped and reset music."); // Debug log
      });
    }

    // Hide the container and reset its state
    musicPlayerContainer.classList.remove("show", "expanded");
    musicPlayerContainer.classList.add("hidden");
    document.getElementById("initial-text").style.display = "block"; // Show the initial text again
    musicList.classList.add("hidden"); // Hide the music list

    console.log("Music player container closed."); // Debug log
  });

  // Add event listeners for each music track
  musicElements.forEach((music, index) => {
    music.addEventListener("play", function () {
      console.log(`Track ${index + 1} playing`);

      // Pause all other music tracks before playing the new one
      musicElements.forEach((otherMusic) => {
        if (otherMusic !== music) {
          otherMusic.pause(); // Stop the other tracks
          otherMusic.currentTime = 0; // Reset other tracks to the beginning
        }
      });
    });
  });

  // Meditation tips
  const tips = [
    "Take deep breaths and let go of stress.",
    "Focus on the present moment.",
    "Let your thoughts flow without judgment.",
    "Create a peaceful environment around you.",
    "Stay consistent with your practice.",
  ];

  const tipsList = document.getElementById("tips");
  tips.forEach((tip) => {
    let li = document.createElement("li");
    li.textContent = tip;
    li.style.fontFamily = "'Crimson Pro', serif"; // Apply the font
    tipsList.appendChild(li);
  });

  // Generate bubbles
  function generateBubbles() {
    const container = document.getElementById("music-player-container");
    for (let i = 0; i < 20; i++) {
      let bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 4}s`;
      bubble.style.animationDuration = `${2 + Math.random() * 2}s`;
      container.appendChild(bubble);
    }
  }
});

// Time/Date Section
document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("current-date");
  const timeElement = document.getElementById("current-time");

  function updateDateTime() {
    const now = new Date();

    // Format date and time
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = now.toLocaleDateString("en-US", optionsDate);
    const formattedTime = now.toLocaleTimeString("en-US", optionsTime);

    // Update the HTML elements
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
  }

  // Update date and time every second
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

// New celebration day section above the banner

// Celebration Days Data
const celebrationDays = [
  { date: "2024-09-17", title: "Binara Full Moon Poya Day!" },
  { date: "2024-09-21", title: "International Day of Peace!" },
  { date: "2024-09-22", title: "World Rhino Day! 🦏" },
  { date: "2024-09-23", title: "International Day of Sign Languages!" },
  { date: "2024-09-24", title: "Bluebird of Happiness Day!" },
  { date: "2024-09-25", title: "Better Breakfast Day!" },
  { date: "2024-09-26", title: "World Environmental Health Day!" },
  { date: "2024-09-27", title: "World Tourism Day!" },
  { date: "2024-09-28", title: "World Rabies Day!" },
  { date: "2024-09-29", title: "World Heart Day!" },
  { date: "2024-09-30", title: "International Translation Day!" },
  { date: "2024-10-01", title: "International Day of Older Persons! 👴🏻👵🏻" },
  { date: "2024-10-02", title: "International Day of Non-Violence!" },
  { date: "2024-10-04", title: "World Animal Welfare Day!" },
  { date: "2024-10-05", title: "World Teachers' Day!" },
  { date: "2024-10-06", title: "World Smile Day!" },
  { date: "2024-10-07", title: "World Habitat Day!" },
  { date: "2024-10-08", title: "World Sight Day!" },
  { date: "2024-10-09", title: "World Post Day!" },
  { date: "2024-10-10", title: "World Mental Health Day!" },
  { date: "2024-10-11", title: "International Day of the Girl!" },
  { date: "2024-10-12", title: "World Arthritis Day!" },
  { date: "2024-10-13", title: "International Day for Disaster Reduction!" },
  { date: "2024-10-14", title: "World Standards Day!" },
  { date: "2024-10-15", title: "World White Cane Safety!" },
  { date: "2024-10-16", title: "World Food Day!" },
  { date: "2024-10-17", title: "Vap Full Moon Poya Day! ☸️🪷🪬" },
  { date: "2024-10-18", title: "International Day for Overcoming!" },
  { date: "2024-10-19", title: "World Osteoporosis!" },
  { date: "2024-10-20", title: "World Statistics Day!" },
  { date: "2024-10-21", title: "International Red Panda Day! 🐼🔴" },
  { date: "2024-10-22", title: "World Statistics Day! 📊" },
  { date: "2024-10-23", title: "World Polio Day!" },
  { date: "2024-10-24", title: "United Nations Day!" },
  { date: "2024-10-25", title: "World Pasta Day!" },
  { date: "2024-10-26", title: "World Day for Audiovisual!" },
  { date: "2024-10-30", title: "National Treat Your Pet Day!" },
  { date: "2024-10-31", title: "🎇🪔 Happy Diwali! 🏵️🧨" },
  // ... Add more celebrations as needed
];

// Function to update the celebration text
function updateCelebrationDay() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const celebration = celebrationDays.find(
    (celebration) => celebration.date === today
  );

  if (celebration) {
    document.getElementById(
      "celebration-day"
    ).textContent = `Today's Celebration: ${celebration.title}`;
    createConfetti(); // Trigger confetti animation when there's a celebration
  } else {
    document.getElementById("celebration-day").textContent =
      "Every Day is a Celebration Day! 😊";
  }
}

// Function to create confetti
function createConfetti() {
  const confettiCount = 100; // Number of confetti pieces
  const banner = document.getElementById("celebration-banner");

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Randomize the confetti position and color
    confetti.style.setProperty("--color", getRandomColor());
    confetti.style.setProperty("--position", Math.random() * 100);
    confetti.style.setProperty("--delay", Math.random() * 2);

    banner.appendChild(confetti);
  }
}

// Function to get random confetti colors
function getRandomColor() {
  const colors = [
    "#ff6b6b",
    "#fca311",
    "#6a994e",
    "#3a86ff",
    "#e63946",
    "#a8dadc",
    "#457b9d",
    "#f4a261",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Run the update function when the page loads
window.onload = updateCelebrationDay;

// Script for Resume Section - Start
