/* ===========================
   LOCAL STORAGE UTILITIES
   =========================== */

/**
 * Storage module for managing local storage operations
 * Handles favorites, user preferences, and other data
 */

const Storage = {
  /**
   * Keys for local storage
   */
  KEYS: {
    FAVORITES: "cineverse_favorites",
    USER: "cineverse_user",
    WATCH_HISTORY: "cineverse_watch_history",
    PREFERENCES: "cineverse_preferences",
    CONTINUE_WATCHING: "cineverse_continue_watching",
  },

  /**
   * Get item from local storage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key not found
   * @returns {any} - Parsed value or defaultValue
   */
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving item from storage: ${key}`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in local storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} - Success status
   */
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving item to storage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove item from local storage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
      return false;
    }
  },

  /**
   * Clear all storage
   * @returns {boolean} - Success status
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing storage", error);
      return false;
    }
  },

  /**
   * Add movie to favorites
   * @param {object} movie - Movie object
   * @returns {boolean} - Success status
   */
  addFavorite(movie) {
    try {
      const favorites = this.getFavorites();
      if (!favorites.some((fav) => fav.id === movie.id)) {
        favorites.push(movie);
        this.setItem(this.KEYS.FAVORITES, favorites);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding favorite", error);
      return false;
    }
  },

  /**
   * Remove movie from favorites
   * @param {number} movieId - Movie ID
   * @returns {boolean} - Success status
   */
  removeFavorite(movieId) {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter((fav) => fav.id !== movieId);
      this.setItem(this.KEYS.FAVORITES, filtered);
      return true;
    } catch (error) {
      console.error("Error removing favorite", error);
      return false;
    }
  },

  /**
   * Get all favorite movies
   * @returns {array} - Array of favorite movies
   */
  getFavorites() {
    return this.getItem(this.KEYS.FAVORITES, []);
  },

  /**
   * Check if movie is favorited
   * @param {number} movieId - Movie ID
   * @returns {boolean} - Is favorited
   */
  isFavorited(movieId) {
    const favorites = this.getFavorites();
    return favorites.some((fav) => fav.id === movieId);
  },

  /**
   * Add movie to watch history
   * @param {object} movie - Movie object
   * @returns {boolean} - Success status
   */
  addToHistory(movie) {
    try {
      const history = this.getWatchHistory();
      // Remove if already exists
      const filtered = history.filter((m) => m.id !== movie.id);
      // Add to beginning
      filtered.unshift({
        ...movie,
        watchedAt: new Date().toISOString(),
      });
      // Keep only last 50 items
      this.setItem(this.KEYS.WATCH_HISTORY, filtered.slice(0, 50));
      return true;
    } catch (error) {
      console.error("Error adding to watch history", error);
      return false;
    }
  },

  /**
   * Get watch history
   * @returns {array} - Array of watched movies
   */
  getWatchHistory() {
    return this.getItem(this.KEYS.WATCH_HISTORY, []);
  },

  /**
   * Add movie to continue watching
   * @param {object} movie - Movie object
   * @param {number} progress - Watch progress in seconds
   * @returns {boolean} - Success status
   */
  addContinueWatching(movie, progress = 0) {
    try {
      const continueWatching = this.getContinueWatching();
      // Remove if already exists
      const filtered = continueWatching.filter((m) => m.id !== movie.id);
      // Add to beginning
      filtered.unshift({
        ...movie,
        progress,
        addedAt: new Date().toISOString(),
      });
      // Keep only last 20 items
      this.setItem(this.KEYS.CONTINUE_WATCHING, filtered.slice(0, 20));
      return true;
    } catch (error) {
      console.error("Error adding to continue watching", error);
      return false;
    }
  },

  /**
   * Get continue watching list
   * @returns {array} - Array of movies to continue watching
   */
  getContinueWatching() {
    return this.getItem(this.KEYS.CONTINUE_WATCHING, []);
  },

  /**
   * Update continue watching progress
   * @param {number} movieId - Movie ID
   * @param {number} progress - Watch progress in seconds
   * @returns {boolean} - Success status
   */
  updateProgress(movieId, progress) {
    try {
      const continueWatching = this.getContinueWatching();
      const movie = continueWatching.find((m) => m.id === movieId);
      if (movie) {
        movie.progress = progress;
        this.setItem(this.KEYS.CONTINUE_WATCHING, continueWatching);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating progress", error);
      return false;
    }
  },

  /**
   * Save user data
   * @param {object} userData - User data
   * @returns {boolean} - Success status
   */
  saveUser(userData) {
    return this.setItem(this.KEYS.USER, userData);
  },

  /**
   * Get user data
   * @returns {object|null} - User data or null
   */
  getUser() {
    return this.getItem(this.KEYS.USER, null);
  },

  /**
   * Save user preferences
   * @param {object} preferences - User preferences
   * @returns {boolean} - Success status
   */
  savePreferences(preferences) {
    const current = this.getPreferences();
    return this.setItem(this.KEYS.PREFERENCES, { ...current, ...preferences });
  },

  /**
   * Get user preferences
   * @returns {object} - User preferences
   */
  getPreferences() {
    return this.getItem(this.KEYS.PREFERENCES, {
      theme: "dark",
      quality: "1080p",
      language: "en",
      subtitles: true,
    });
  },

  /**
   * Export all data as JSON
   * @returns {object} - All storage data
   */
  exportData() {
    return {
      favorites: this.getFavorites(),
      watchHistory: this.getWatchHistory(),
      continueWatching: this.getContinueWatching(),
      preferences: this.getPreferences(),
      user: this.getUser(),
    };
  },

  /**
   * Import data from JSON
   * @param {object} data - Data to import
   * @returns {boolean} - Success status
   */
  importData(data) {
    try {
      if (data.favorites) this.setItem(this.KEYS.FAVORITES, data.favorites);
      if (data.watchHistory)
        this.setItem(this.KEYS.WATCH_HISTORY, data.watchHistory);
      if (data.continueWatching)
        this.setItem(this.KEYS.CONTINUE_WATCHING, data.continueWatching);
      if (data.preferences)
        this.setItem(this.KEYS.PREFERENCES, data.preferences);
      if (data.user) this.setItem(this.KEYS.USER, data.user);
      return true;
    } catch (error) {
      console.error("Error importing data", error);
      return false;
    }
  },
};

// Make Storage globally available
window.Storage = Storage;
