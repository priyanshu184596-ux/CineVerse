/* ===========================
   SEARCH FUNCTIONALITY
   =========================== */

/**
 * Search module for live search
 */

const Search = {
  /**
   * Elements
   */
  searchInput: null,
  searchBtn: null,
  navSearchInput: null,
  navSearchBtn: null,
  debounceTimer: null,
  DEBOUNCE_DELAY: 500,

  /**
   * Initialize search
   */
  init() {
    // Main search (if exists)
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");

    // Navbar search
    this.navSearchInput = document.getElementById("navSearchInput");
    this.navSearchBtn = document.getElementById("navSearchBtn");

    // Navbar search listeners
    if (this.navSearchInput) {
      this.navSearchInput.addEventListener("input", (e) => this.handleInput(e));
      this.navSearchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch(e.target.value);
        }
      });
    }

    if (this.navSearchBtn) {
      this.navSearchBtn.addEventListener("click", () => {
        const query = this.navSearchInput?.value;
        if (query) this.performSearch(query);
      });
    }

    console.log("Search initialized");
  },

  /**
   * Handle search input
   * @param {Event} e - Input event
   */
  handleInput(e) {
    const query = e.target.value.trim();

    // Clear previous timer
    clearTimeout(this.debounceTimer);

    if (query.length < 2) {
      // Clear results if less than 2 characters
      return;
    }

    // Debounce search
    this.debounceTimer = setTimeout(() => {
      this.liveSearch(query);
    }, this.DEBOUNCE_DELAY);
  },

  /**
   * Live search
   * @param {string} query - Search query
   */
  async liveSearch(query) {
    try {
      console.log("Searching for:", query);
      const results = await API.search(query, 1);

      if (!results.results) {
        console.error("No results in response");
        return;
      }

      // Show dropdown or sidebar with results (implementation depends on layout)
      this.displayLiveResults(results.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  },

  /**
   * Display live search results
   * @param {array} movies - Search results
   */
  displayLiveResults(movies) {
    // This would show dropdown/sidebar with results
    // For now, just log
    console.log("Found", movies.length, "results");
  },

  /**
   * Perform full search
   * @param {string} query - Search query
   */
  async performSearch(query) {
    try {
      if (!query || query.trim().length < 2) {
        console.warn("Search query too short");
        return;
      }

      console.log("Performing full search:", query);

      // Show loading
      const loading = document.getElementById("loadingSpinner");
      if (loading) loading.classList.add("active");

      // Fetch results
      const results = await API.search(query.trim(), 1);

      if (loading) loading.classList.remove("active");

      if (!results.results || results.results.length === 0) {
        console.log("No results found");
        return;
      }

      // Navigate to search results page or display results
      this.displaySearchResults(results.results, query);
    } catch (error) {
      console.error("Search error:", error);
      const loading = document.getElementById("loadingSpinner");
      if (loading) loading.classList.remove("active");
    }
  },

  /**
   * Display search results
   * @param {array} movies - Search results
   * @param {string} query - Search query
   */
  displaySearchResults(movies, query) {
    // In production, this would render results in a dedicated search page
    // or display them in a modal/sidebar

    // For demo purposes, create a simple display
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results-modal glass";
    resultsContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 1500;
            padding: 2rem;
            border-radius: 1rem;
            background: rgba(26, 26, 26, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

    let html = `<h2 style="margin-bottom: 1.5rem;">Search Results for "${query}" (${movies.length} results)</h2>`;

    movies.slice(0, 12).forEach((movie) => {
      const title = movie.title || movie.name;
      const poster = API.getImageUrl(movie.poster_path, "w185");
      const rating = movie.vote_average?.toFixed(1) || "N/A";

      html += `
                <div class="search-result-item" style="
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255, 255, 255, 0.05)'" onmouseout="this.style.background='transparent'">
                    <img 
                        src="${poster}" 
                        alt="${title}" 
                        style="width: 60px; height: 90px; border-radius: 0.5rem; object-fit: cover;"
                    >
                    <div style="flex: 1;">
                        <h3 style="margin-bottom: 0.5rem; font-weight: 600;">${title}</h3>
                        <p style="color: #b0b0b0; font-size: 0.9rem; margin-bottom: 0.5rem;">
                            ${movie.overview?.substring(0, 100) || "No description"}...
                        </p>
                        <div style="display: flex; gap: 1rem; font-size: 0.85rem;">
                            <span>⭐ ${rating}</span>
                            <span>${movie.release_date?.split("-")[0] || "N/A"}</span>
                        </div>
                    </div>
                </div>
            `;
    });

    resultsContainer.innerHTML = html;

    // Close on outside click
    const overlay = document.createElement("div");
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1400;
        `;

    overlay.addEventListener("click", () => {
      resultsContainer.remove();
      overlay.remove();
    });

    document.body.appendChild(overlay);
    document.body.appendChild(resultsContainer);

    // Add click handlers to results
    resultsContainer
      .querySelectorAll(".search-result-item")
      .forEach((item, index) => {
        item.addEventListener("click", () => {
          Modal.open(movies[index]);
          resultsContainer.remove();
          overlay.remove();
        });
      });

    console.log("Displaying", movies.length, "search results");
  },

  /**
   * Clear search
   */
  clear() {
    if (this.navSearchInput) {
      this.navSearchInput.value = "";
    }
    if (this.searchInput) {
      this.searchInput.value = "";
    }
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => Search.init());
