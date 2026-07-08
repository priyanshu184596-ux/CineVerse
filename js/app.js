/* ===========================
   MAIN APPLICATION
   =========================== */

/**
 * Main app controller
 */

const App = {
  /**
   * Configuration
   */
  config: {
    cardsPerLoad: 10,
  },

  /**
   * State
   */
  state: {
    isLoading: false,
    currentPage: "home",
  },

  /**
   * Initialize app
   */
  async init() {
    console.log("🎬 CineVerse Initializing...");

    try {
      // Initialize modules
      this.initializeModules();

      // Setup event listeners
      this.setupEventListeners();

      // Load hero data
      await this.loadHero();

      // Load initial sections
      await this.loadSections();

      // Setup scroll effects
      this.setupScrollEffects();

      console.log("✨ CineVerse Ready!");
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  },

  /**
   * Initialize all modules
   */
  initializeModules() {
    // Already initialized via DOMContentLoaded in each module
    console.log("Modules initialized");
  },

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener("scroll", () => this.handleScroll());

    // Back to top button
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });

      // Close menu on link click
      navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("active");
        });
      });
    }

    console.log("Event listeners setup");
  },

  /**
   * Handle window scroll
   */
  handleScroll() {
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    // Navbar effect
    if (window.scrollY > 100) {
      navbar?.classList.add("scrolled");
      backToTop?.classList.add("active");
    } else {
      navbar?.classList.remove("scrolled");
      backToTop?.classList.remove("active");
    }
  },

  /**
   * Load hero section
   */
  async loadHero() {
    try {
      console.log("Loading hero...");
      const loading = document.getElementById("loadingSpinner");
      if (loading) loading.classList.add("active");

      // Get trending movie for hero
      const response = await API.getTrending("day");

      if (loading) loading.classList.remove("active");

      if (!response.results || response.results.length === 0) {
        console.error("No trending movies");
        return;
      }

      const featured = response.results[0];
      this.updateHero(featured);
    } catch (error) {
      console.error("Error loading hero:", error);
    }
  },

  /**
   * Update hero section with movie data
   * @param {object} movie - Movie data
   */
  updateHero(movie) {
    const backdropUrl = API.getImageUrl(movie.backdrop_path, "w1280");
    const title = movie.title || movie.name;
    const rating = movie.vote_average?.toFixed(1) || "8.0";
    const description = movie.overview;
    const releaseYear =
      (movie.release_date || movie.first_air_date)?.split("-")[0] || "2024";

    // Update hero background
    const heroBg = document.getElementById("heroBg");
    if (heroBg) {
      const img = heroBg.querySelector("img");
      if (img) img.src = backdropUrl;
    }

    // Update hero info
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.textContent = title;

    const heroRating = document.getElementById("heroRating");
    if (heroRating) {
      heroRating.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                    <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 15.54 19.85 23.95 12 18.77 4.15 23.95 6.84 15.54 0.23 10.35 8.91 10.26"/>
                </svg>
                <span>${rating}/10</span>
            `;
    }

    const heroYear = document.getElementById("heroYear");
    if (heroYear) heroYear.textContent = releaseYear;

    const heroDescription = document.getElementById("heroDescription");
    if (heroDescription) heroDescription.textContent = description;

    // Setup hero buttons
    const playBtn = document.getElementById("playBtn");
    if (playBtn) {
      playBtn.addEventListener("click", () => Modal.open(movie), {
        once: true,
      });
    }

    const trailerBtn = document.getElementById("trailerBtn");
    if (trailerBtn) {
      trailerBtn.addEventListener("click", () => this.playTrailer(movie), {
        once: true,
      });
    }

    const favoriteBtn = document.getElementById("favoriteBtn");
    if (favoriteBtn) {
      const isFavorited = Storage.isFavorited(movie.id);
      if (isFavorited) favoriteBtn.classList.add("active");

      favoriteBtn.addEventListener(
        "click",
        () => {
          Favorites.toggle(movie);
        },
        { once: true },
      );
    }

    console.log("Hero updated:", title);
  },

  /**
   * Play trailer
   * @param {object} movie - Movie data
   */
  async playTrailer(movie) {
    try {
      console.log("Fetching trailer for:", movie.title);
      const details = await API.getMovieDetails(movie.id);

      if (!details.videos || details.videos.results.length === 0) {
        alert("No trailer available");
        return;
      }

      const trailer = details.videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("No YouTube trailer found");
      }
    } catch (error) {
      console.error("Error playing trailer:", error);
    }
  },

  /**
   * Load all movie sections
   */
  async loadSections() {
    try {
      console.log("Loading sections...");

      // Define sections to load
      const sections = [
        {
          id: "continueWatchingTrack",
          fetch: () => this.getContinueWatching(),
          label: "Continue Watching",
        },
        {
          id: "trendingTrack",
          fetch: () => API.getTrending("week"),
          label: "Trending",
        },
        {
          id: "topRatedTrack",
          fetch: () => API.getTopRated(),
          label: "Top Rated",
        },
        { id: "popularTrack", fetch: () => API.getPopular(), label: "Popular" },
        { id: "actionTrack", fetch: () => API.getByGenre(28), label: "Action" },
        { id: "comedyTrack", fetch: () => API.getByGenre(35), label: "Comedy" },
        { id: "scifiTrack", fetch: () => API.getByGenre(878), label: "Sci-Fi" },
        { id: "horrorTrack", fetch: () => API.getByGenre(27), label: "Horror" },
      ];

      // Load sections
      for (const section of sections) {
        this.loadSection(section);
      }
    } catch (error) {
      console.error("Error loading sections:", error);
    }
  },

  /**
   * Load individual section
   * @param {object} section - Section config
   */
  async loadSection(section) {
    try {
      const track = document.getElementById(section.id);
      if (!track) return;

      console.log(`Loading ${section.label}...`);

      // Get data
      const data = await section.fetch();

      if (!data.results) {
        console.warn(`No results for ${section.label}`);
        return;
      }

      // Render cards
      Slider.renderCards(section.id, data.results, (movie) => {
        Modal.open(movie);
      });

      console.log(`✓ ${section.label} loaded`);
    } catch (error) {
      console.error(`Error loading ${section.label}:`, error);
    }
  },

  /**
   * Get continue watching movies
   * @returns {Promise<object>} - Movies to continue watching
   */
  getContinueWatching() {
    return new Promise((resolve) => {
      const movies = Storage.getContinueWatching();
      resolve({
        results: movies,
      });
    });
  },

  /**
   * Setup scroll animations
   */
  setupScrollEffects() {
    // Observe elements for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    document.querySelectorAll(".section-container").forEach((el) => {
      observer.observe(el);
    });

    console.log("Scroll effects setup");
  },
};

/**
 * Initialize app when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

/**
 * Handle app errors
 */
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
