/* ===========================
   SLIDER MODULE
   =========================== */

/**
 * Slider module for horizontal movie carousels
 */

const Slider = {
  /**
   * Sliders map
   */
  sliders: new Map(),

  /**
   * Initialize all sliders
   */
  init() {
    // Find all slider elements
    const sliderElements = document.querySelectorAll(".slider");

    sliderElements.forEach((slider) => {
      const track = slider.querySelector(".slider-track");
      const container = slider.closest(".section-container");

      if (track && container) {
        const trackId = track.id;
        const sectionId = container.id;

        // Store slider reference
        this.sliders.set(trackId, {
          track,
          container,
          sectionId,
          scrollPosition: 0,
        });

        // Attach scroll listener for smooth scrolling
        this.attachTrackListeners(track);
      }
    });

    // Attach navigation button listeners
    this.attachNavButtons();
    console.log("Sliders initialized");
  },

  /**
   * Attach listeners to track
   * @param {Element} track - Slider track element
   */
  attachTrackListeners(track) {
    // Smooth scroll behavior
    track.addEventListener("scroll", () => {
      this.updateNavButtons(track);
    });

    // Mouse wheel
    track.addEventListener(
      "wheel",
      (e) => {
        // Allow horizontal scrolling with wheel
        if (e.deltaY !== 0) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      },
      { passive: false },
    );

    // Touch drag
    this.attachTouchDrag(track);
  },

  /**
   * Attach touch drag functionality
   * @param {Element} track - Slider track element
   */
  attachTouchDrag(track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    });

    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.style.cursor = "grab";
    });

    track.addEventListener("mouseup", () => {
      isDown = false;
      track.style.cursor = "grab";
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const scroll = x - startX;
      track.scrollLeft = scrollLeft - scroll;
    });
  },

  /**
   * Attach navigation button listeners
   */
  attachNavButtons() {
    const prevButtons = document.querySelectorAll(".slider-btn.prev");
    const nextButtons = document.querySelectorAll(".slider-btn.next");

    prevButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const track = this.getTrackFromButton(e.target);
        if (track) this.scroll(track, "left");
      });
    });

    nextButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const track = this.getTrackFromButton(e.target);
        if (track) this.scroll(track, "right");
      });
    });
  },

  /**
   * Get track element from button
   * @param {Element} button - Navigation button
   * @returns {Element|null} - Track element
   */
  getTrackFromButton(button) {
    const nav = button.closest(".slider-nav");
    if (!nav) return null;

    const slider = nav.previousElementSibling;
    return slider?.querySelector(".slider-track") || null;
  },

  /**
   * Scroll slider
   * @param {Element} track - Slider track
   * @param {string} direction - 'left' or 'right'
   */
  scroll(track, direction) {
    const scrollAmount = 400; // Scroll by 400px
    const currentScroll = track.scrollLeft;

    const targetScroll =
      direction === "right"
        ? currentScroll + scrollAmount
        : currentScroll - scrollAmount;

    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    // Update nav buttons after scroll
    setTimeout(() => this.updateNavButtons(track), 300);
  },

  /**
   * Update navigation button states
   * @param {Element} track - Slider track
   */
  updateNavButtons(track) {
    // Find the closest slider nav
    const slider = track.closest(".slider");
    const nav = slider?.querySelector(".slider-nav");

    if (!nav) return;

    const prevBtn = nav.querySelector(".slider-btn.prev");
    const nextBtn = nav.querySelector(".slider-btn.next");

    if (!prevBtn || !nextBtn) return;

    // Check if at start
    const atStart = track.scrollLeft <= 0;
    prevBtn.disabled = atStart;
    prevBtn.style.opacity = atStart ? "0.3" : "1";

    // Check if at end
    const atEnd =
      track.scrollLeft >= track.scrollWidth - track.clientWidth - 10;
    nextBtn.disabled = atEnd;
    nextBtn.style.opacity = atEnd ? "0.3" : "1";
  },

  /**
   * Render movie cards in slider
   * @param {string} trackId - Track element ID
   * @param {array} movies - Array of movie objects
   * @param {function} onCardClick - Click handler
   */
  renderCards(trackId, movies, onCardClick) {
    const sliderData = this.sliders.get(trackId);
    if (!sliderData) return;

    const track = sliderData.track;
    track.innerHTML = "";

    if (!movies || movies.length === 0) {
      track.innerHTML =
        '<div class="text-center" style="width: 100%; padding: 2rem;">No movies found</div>';
      return;
    }

    movies.forEach((movie) => {
      const card = this.createCard(movie, onCardClick);
      track.appendChild(card);
    });

    // Update nav buttons
    setTimeout(() => this.updateNavButtons(track), 100);

    console.log(`Rendered ${movies.length} cards in ${trackId}`);
  },

  /**
   * Create movie card element
   * @param {object} movie - Movie data
   * @param {function} onCardClick - Click handler
   * @returns {Element} - Card element
   */
  createCard(movie, onCardClick) {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.style.animation = "slideUp 0.6s ease-out forwards";

    const posterUrl = movie.poster_path
      ? API.getImageUrl(movie.poster_path, "w342")
      : "assets/images/no-image.jpg";

    const title = movie.title || movie.name || "Unknown";
    const rating = movie.vote_average?.toFixed(1) || "N/A";
    const releaseYear =
      (movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A";

    let genresList = "";
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      genresList = movie.genre_ids
        .slice(0, 2)
        .map(
          (id) => `<span class="card-genre">${GENRES[id] || "Unknown"}</span>`,
        )
        .join("");
    }

    card.innerHTML = `
            <div class="card-poster">
                <img 
                    src="${posterUrl}" 
                    alt="${title}" 
                    loading="lazy"
                    onload="this.style.opacity='1'"
                    style="opacity: 0; transition: opacity 0.3s ease;"
                >
                <div class="card-overlay">
                    <div class="card-info">
                        <h3 class="card-title">${title}</h3>
                        <div class="card-meta">
                            <div class="card-rating">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 15.54 19.85 23.95 12 18.77 4.15 23.95 6.84 15.54 0.23 10.35 8.91 10.26"/>
                                </svg>
                                <span>${rating}</span>
                            </div>
                            <span class="card-year">${releaseYear}</span>
                        </div>
                        ${genresList ? `<div class="card-genres">${genresList}</div>` : ""}
                        <div class="card-actions">
                            <button class="card-add-btn" aria-label="Add to favorites">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 15.54 19.85 23.95 12 18.77 4.15 23.95 6.84 15.54 0.23 10.35 8.91 10.26"/>
                                </svg>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                </div>
                <button class="card-play-btn" aria-label="Play movie">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21"></polygon>
                    </svg>
                </button>
                <div class="card-badge">New</div>
            </div>
        `;

    // Event listeners
    card.addEventListener("click", () => {
      if (onCardClick) {
        onCardClick(movie);
      }
    });

    const addBtn = card.querySelector(".card-add-btn");
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleAddToFavorites(movie, addBtn);
    });

    const playBtn = card.querySelector(".card-play-btn");
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (onCardClick) {
        onCardClick(movie);
      }
    });

    return card;
  },

  /**
   * Handle add to favorites
   * @param {object} movie - Movie data
   * @param {Element} button - Button element
   */
  handleAddToFavorites(movie, button) {
    const isFavorited = Storage.isFavorited(movie.id);

    if (isFavorited) {
      Storage.removeFavorite(movie.id);
      button.classList.remove("active");
    } else {
      Storage.addFavorite(movie);
      button.classList.add("active");
    }

    // Animate
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);

    console.log(`Favorite toggled for: ${movie.title || movie.name}`);
  },

  /**
   * Clear slider content
   * @param {string} trackId - Track element ID
   */
  clear(trackId) {
    const sliderData = this.sliders.get(trackId);
    if (sliderData) {
      sliderData.track.innerHTML = "";
    }
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => Slider.init());
