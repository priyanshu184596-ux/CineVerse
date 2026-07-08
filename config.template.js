/* ===========================
   CONFIGURATION TEMPLATE
   Copy this to config.js and fill in your values
   =========================== */

// Note: In production, use environment variables or a secure backend
// NEVER expose API keys in frontend code

const CONFIG = {
  // TMDB API Configuration
  TMDB: {
    API_KEY: "YOUR_TMDB_API_KEY_HERE", // Get from https://www.themoviedb.org/settings/api
    API_URL: "https://api.themoviedb.org/3",
    IMAGE_URL: "https://image.tmdb.org/t/p",
    TIMEOUT: 5000,
  },

  // Application Settings
  APP: {
    NAME: "CineVerse",
    VERSION: "1.0.0",
    DEBUG: false,
    ENVIRONMENT: "development", // 'development' or 'production'
  },

  // Cache Configuration
  CACHE: {
    ENABLED: true,
    DURATION: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 100, // Maximum cache entries
  },

  // UI Configuration
  UI: {
    ITEMS_PER_PAGE: 10,
    ANIMATION_DURATION: 250, // ms
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
  },

  // Feature Flags
  FEATURES: {
    SEARCH_ENABLED: true,
    FAVORITES_ENABLED: true,
    WATCH_HISTORY_ENABLED: true,
    RECOMMENDATIONS_ENABLED: true,
    SOCIAL_SHARE_ENABLED: false,
    DARK_MODE_TOGGLE_ENABLED: false,
  },

  // Local Storage Keys
  STORAGE: {
    PREFIX: "cineverse_",
    FAVORITES: "cineverse_favorites",
    WATCH_HISTORY: "cineverse_watch_history",
    USER: "cineverse_user",
    PREFERENCES: "cineverse_preferences",
  },
};

// Usage in your code:
// const apiKey = CONFIG.TMDB.API_KEY;
// const debug = CONFIG.APP.DEBUG;
