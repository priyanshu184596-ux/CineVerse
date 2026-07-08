/* ===========================
   FAVORITES MANAGEMENT
   =========================== */

/**
 * Favorites module for managing favorite movies
 */

const Favorites = {
  /**
   * Initialize favorites
   */
  init() {
    // Listen for favorites updates
    window.addEventListener("favoritesUpdated", (e) => {
      this.updateUI(e.detail);
    });

    // Update UI on page load
    this.updateAllFavoriteButtons();
    console.log("Favorites initialized");
  },

  /**
   * Update all favorite buttons in the UI
   */
  updateAllFavoriteButtons() {
    const favorites = Storage.getFavorites();
    const favoriteIds = new Set(favorites.map((f) => f.id));

    // Update all favorite buttons
    document.querySelectorAll("[data-movie-id]").forEach((element) => {
      const movieId = parseInt(element.dataset.movieId);
      const isFavorited = favoriteIds.has(movieId);

      if (
        element.classList.contains("card-add-btn") ||
        element.classList.contains("modal-btn-favorite")
      ) {
        element.classList.toggle("active", isFavorited);
      }
    });
  },

  /**
   * Update UI after favorites change
   * @param {object} detail - Update detail
   */
  updateUI(detail) {
    const { movieId, isFavorited } = detail;

    // Update all buttons for this movie
    document
      .querySelectorAll(`[data-movie-id="${movieId}"]`)
      .forEach((element) => {
        if (
          element.classList.contains("card-add-btn") ||
          element.classList.contains("modal-btn-favorite")
        ) {
          element.classList.toggle("active", isFavorited);
        }
      });

    console.log(`Favorite UI updated for movie ${movieId}`);
  },

  /**
   * Get all favorites
   * @returns {array} - Array of favorite movies
   */
  getAll() {
    return Storage.getFavorites();
  },

  /**
   * Add to favorites
   * @param {object} movie - Movie to add
   */
  add(movie) {
    if (Storage.addFavorite(movie)) {
      window.dispatchEvent(
        new CustomEvent("favoritesUpdated", {
          detail: { movieId: movie.id, isFavorited: true },
        }),
      );
      console.log("Added to favorites:", movie.title);
    }
  },

  /**
   * Remove from favorites
   * @param {number} movieId - Movie ID
   */
  remove(movieId) {
    if (Storage.removeFavorite(movieId)) {
      window.dispatchEvent(
        new CustomEvent("favoritesUpdated", {
          detail: { movieId, isFavorited: false },
        }),
      );
      console.log("Removed from favorites:", movieId);
    }
  },

  /**
   * Toggle favorite
   * @param {object} movie - Movie object
   */
  toggle(movie) {
    if (Storage.isFavorited(movie.id)) {
      this.remove(movie.id);
    } else {
      this.add(movie);
    }
  },

  /**
   * Check if movie is favorited
   * @param {number} movieId - Movie ID
   * @returns {boolean} - Is favorited
   */
  isFavorited(movieId) {
    return Storage.isFavorited(movieId);
  },

  /**
   * Get count of favorites
   * @returns {number} - Favorite count
   */
  getCount() {
    return Storage.getFavorites().length;
  },

  /**
   * Clear all favorites
   */
  clearAll() {
    if (confirm("Are you sure you want to clear all favorites?")) {
      Storage.setItem(Storage.KEYS.FAVORITES, []);
      this.updateAllFavoriteButtons();
      console.log("All favorites cleared");
    }
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => Favorites.init());
