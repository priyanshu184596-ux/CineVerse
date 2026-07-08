/* ===========================
   MODAL MANAGEMENT
   =========================== */

/**
 * Modal module for movie details modal
 */

const Modal = {
  /**
   * Elements
   */
  modal: null,
  overlay: null,
  closeBtn: null,
  currentMovie: null,

  /**
   * Initialize modal
   */
  init() {
    this.modal = document.getElementById("movieModal");
    this.overlay = document.getElementById("modalOverlay");
    this.closeBtn = document.getElementById("modalClose");

    if (!this.modal || !this.overlay || !this.closeBtn) {
      console.error("Modal elements not found");
      return;
    }

    // Event listeners
    this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", () => this.close());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close();
      }
    });

    console.log("Modal initialized");
  },

  /**
   * Open modal with movie details
   * @param {object} movie - Movie data
   */
  async open(movie) {
    try {
      // Show loading state
      this.modal.classList.add("active");
      const modalContent = this.modal.querySelector("#modalContent");
      modalContent.innerHTML =
        '<div class="flex-center" style="height: 400px;"><div class="spinner"></div></div>';

      // Fetch full movie details if needed
      let movieDetails = movie;
      if (!movie.credits) {
        const details = await API.getMovieDetails(movie.id);
        if (details && details.id) {
          movieDetails = API.formatMovie(details);
        }
      }

      // Store current movie
      this.currentMovie = movieDetails;

      // Build modal content
      const content = this.buildModalContent(movieDetails);
      modalContent.innerHTML = content;

      // Add event listeners
      this.attachEventListeners();

      // Scroll to top
      modalContent.scrollTop = 0;

      console.log("Modal opened for:", movieDetails.title);
    } catch (error) {
      console.error("Error opening modal:", error);
      this.close();
    }
  },

  /**
   * Build modal content HTML
   * @param {object} movie - Movie data
   * @returns {string} - HTML content
   */
  buildModalContent(movie) {
    const isFavorited = Storage.isFavorited(movie.id);
    const backdropUrl = movie.backdrop || "assets/images/no-image.jpg";
    const posterUrl = movie.poster || "assets/images/no-image.jpg";
    const trailer = movie.videos?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );
    const releaseYear = movie.releaseDate?.split("-")[0] || "N/A";

    let genresHTML = "";
    if (Array.isArray(movie.genres)) {
      genresHTML = movie.genres
        .map((g) => `<span class="modal-genre">${g.name || g}</span>`)
        .join("");
    }

    let castHTML = "";
    if (Array.isArray(movie.cast) && movie.cast.length > 0) {
      castHTML = movie.cast
        .map(
          (actor) => `
                    <div class="cast-item">
                        <img 
                            src="${actor.profile_path ? API.getImageUrl(actor.profile_path, "w185") : "assets/images/no-image.jpg"}" 
                            alt="${actor.name}" 
                            class="cast-avatar"
                        >
                        <div class="cast-name">${actor.name}</div>
                        <div class="cast-role">${actor.character || "Actor"}</div>
                    </div>
                `,
        )
        .join("");
    }

    const trailerBtn = trailer
      ? `<button class="modal-btn-trailer" data-trailer-id="${trailer.key}" aria-label="Watch trailer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"></polygon></svg>
                <span>Watch Trailer</span>
            </button>`
      : "";

    return `
            <button class="modal-close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="modal-backdrop">
                <img src="${backdropUrl}" alt="${movie.title}" loading="lazy">
                <div class="modal-backdrop-overlay"></div>
            </div>

            <div class="modal-body">
                <div class="modal-poster">
                    <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                </div>

                <div class="modal-info">
                    <h2 class="modal-title">${movie.title}</h2>

                    <div class="modal-meta">
                        <div class="modal-rating">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 15.54 19.85 23.95 12 18.77 4.15 23.95 6.84 15.54 0.23 10.35 8.91 10.26"/>
                            </svg>
                            <span>${movie.rating}/10</span>
                        </div>
                        ${movie.runtime ? `<div class="modal-runtime"><span>⏱</span> ${movie.runtime} min</div>` : ""}
                        <div class="modal-release"><span>📅</span> ${releaseYear}</div>
                    </div>

                    ${genresHTML ? `<div class="modal-genres">${genresHTML}</div>` : ""}

                    <p class="modal-description">${movie.description || "No description available."}</p>

                    ${
                      castHTML
                        ? `
                        <div class="modal-cast">
                            <h3 class="modal-cast-title">Cast</h3>
                            <div class="cast-list">
                                ${castHTML}
                            </div>
                        </div>
                    `
                        : ""
                    }

                    <div class="modal-buttons">
                        <button class="modal-btn-play" data-movie-id="${movie.id}" aria-label="Play movie">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21"></polygon>
                            </svg>
                            <span>Play</span>
                        </button>
                        ${trailerBtn}
                        <button class="modal-btn-favorite ${isFavorited ? "active" : ""}" data-movie-id="${movie.id}" aria-label="Add to favorites">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="${isFavorited ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 15.54 19.85 23.95 12 18.77 4.15 23.95 6.84 15.54 0.23 10.35 8.91 10.26"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
  },

  /**
   * Attach event listeners to modal buttons
   */
  attachEventListeners() {
    // Close button
    const closeBtn = this.modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Play button
    const playBtn = this.modal.querySelector(".modal-btn-play");
    if (playBtn) {
      playBtn.addEventListener("click", () => this.handlePlay());
    }

    // Trailer button
    const trailerBtn = this.modal.querySelector(".modal-btn-trailer");
    if (trailerBtn) {
      trailerBtn.addEventListener("click", (e) => this.handleTrailer(e));
    }

    // Favorite button
    const favoriteBtn = this.modal.querySelector(".modal-btn-favorite");
    if (favoriteBtn) {
      favoriteBtn.addEventListener("click", () => this.handleFavorite());
    }
  },

  /**
   * Handle play action
   */
  handlePlay() {
    console.log("Playing:", this.currentMovie.title);
    // In production, redirect to player
    alert(
      `Playing: ${this.currentMovie.title}\n\nPlayer would load here in production.`,
    );
    Storage.addContinueWatching(this.currentMovie, 0);
  },

  /**
   * Handle trailer action
   * @param {Event} e - Click event
   */
  handleTrailer(e) {
    const trailerId = e.currentTarget.dataset.trailerId;
    if (trailerId) {
      window.open(`https://www.youtube.com/watch?v=${trailerId}`, "_blank");
      console.log("Opening trailer:", trailerId);
    }
  },

  /**
   * Handle favorite action
   */
  handleFavorite() {
    if (!this.currentMovie) return;

    const favoriteBtn = this.modal.querySelector(".modal-btn-favorite");
    const isFavorited = Storage.isFavorited(this.currentMovie.id);

    if (isFavorited) {
      Storage.removeFavorite(this.currentMovie.id);
      favoriteBtn.classList.remove("active");
      console.log("Removed from favorites:", this.currentMovie.title);
    } else {
      Storage.addFavorite(this.currentMovie);
      favoriteBtn.classList.add("active");
      console.log("Added to favorites:", this.currentMovie.title);
    }

    // Dispatch custom event for updating UI
    window.dispatchEvent(
      new CustomEvent("favoritesUpdated", {
        detail: { movieId: this.currentMovie.id, isFavorited: !isFavorited },
      }),
    );
  },

  /**
   * Close modal
   */
  close() {
    this.modal.classList.remove("active");
    this.currentMovie = null;
    console.log("Modal closed");
  },

  /**
   * Check if modal is open
   * @returns {boolean} - Is open
   */
  isOpen() {
    return this.modal?.classList.contains("active") || false;
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => Modal.init());
