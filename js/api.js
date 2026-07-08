/* ===========================
   TMDB API MODULE
   =========================== */

/**
 * API module for fetching data from TMDB
 * Handles all API calls and caching
 */

const API = {
  // TMDB API Configuration
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_URL: "https://image.tmdb.org/t/p",
  // Note: In production, use environment variables
  API_KEY: "YOUR_TMDB_API_KEY_HERE",

  /**
   * Cache for API responses
   */
  cache: new Map(),
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @returns {object} - Error response
   */
  handleError(error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  },

  /**
   * Make API request with caching
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @returns {Promise<object>} - API response
   */
  async request(endpoint, params = {}) {
    try {
      // Generate cache key
      const cacheKey = `${endpoint}:${JSON.stringify(params)}`;

      // Check cache
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        console.log("Returning cached response:", endpoint);
        return cached.data;
      }

      // Build URL with parameters
      const url = new URL(`${this.BASE_URL}${endpoint}`);
      url.searchParams.append("api_key", this.API_KEY);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      // Make request
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  },

  /**
   * Get trending movies
   * @param {string} timeWindow - 'day' or 'week'
   * @returns {Promise<object>} - Trending movies
   */
  async getTrending(timeWindow = "week") {
    return this.request("/trending/movie/" + timeWindow, {
      language: "en-US",
    });
  },

  /**
   * Get popular movies
   * @param {number} page - Page number
   * @returns {Promise<object>} - Popular movies
   */
  async getPopular(page = 1) {
    return this.request("/movie/popular", {
      language: "en-US",
      page: page.toString(),
    });
  },

  /**
   * Get top rated movies
   * @param {number} page - Page number
   * @returns {Promise<object>} - Top rated movies
   */
  async getTopRated(page = 1) {
    return this.request("/movie/top_rated", {
      language: "en-US",
      page: page.toString(),
    });
  },

  /**
   * Get upcoming movies
   * @param {number} page - Page number
   * @returns {Promise<object>} - Upcoming movies
   */
  async getUpcoming(page = 1) {
    return this.request("/movie/upcoming", {
      language: "en-US",
      page: page.toString(),
    });
  },

  /**
   * Get movies by genre
   * @param {number} genreId - Genre ID
   * @param {number} page - Page number
   * @returns {Promise<object>} - Movies in genre
   */
  async getByGenre(genreId, page = 1) {
    return this.request("/discover/movie", {
      with_genres: genreId.toString(),
      language: "en-US",
      page: page.toString(),
      sort_by: "popularity.desc",
    });
  },

  /**
   * Search movies
   * @param {string} query - Search query
   * @param {number} page - Page number
   * @returns {Promise<object>} - Search results
   */
  async search(query, page = 1) {
    return this.request("/search/movie", {
      query: query,
      language: "en-US",
      page: page.toString(),
      include_adult: "false",
    });
  },

  /**
   * Get movie details
   * @param {number} movieId - Movie ID
   * @returns {Promise<object>} - Movie details
   */
  async getMovieDetails(movieId) {
    return this.request(`/movie/${movieId}`, {
      language: "en-US",
      append_to_response: "videos,credits,recommendations",
    });
  },

  /**
   * Get movie videos (trailers)
   * @param {number} movieId - Movie ID
   * @returns {Promise<object>} - Videos
   */
  async getVideos(movieId) {
    return this.request(`/movie/${movieId}/videos`, {
      language: "en-US",
    });
  },

  /**
   * Get movie credits
   * @param {number} movieId - Movie ID
   * @returns {Promise<object>} - Credits
   */
  async getCredits(movieId) {
    return this.request(`/movie/${movieId}/credits`);
  },

  /**
   * Get movie recommendations
   * @param {number} movieId - Movie ID
   * @returns {Promise<object>} - Recommendations
   */
  async getRecommendations(movieId) {
    return this.request(`/movie/${movieId}/recommendations`, {
      language: "en-US",
    });
  },

  /**
   * Get genres
   * @returns {Promise<object>} - Genres list
   */
  async getGenres() {
    return this.request("/genre/movie/list", {
      language: "en-US",
    });
  },

  /**
   * Get image URL
   * @param {string} path - Image path from API
   * @param {string} size - Image size (w92, w154, w185, w342, w500, w780, original)
   * @returns {string} - Full image URL
   */
  getImageUrl(path, size = "w500") {
    if (!path) return "assets/images/no-image.jpg";
    return `${this.IMAGE_URL}/${size}${path}`;
  },

  /**
   * Format movie data for display
   * @param {object} movie - Raw movie data from API
   * @returns {object} - Formatted movie data
   */
  formatMovie(movie) {
    return {
      id: movie.id,
      title: movie.title || movie.name,
      description: movie.overview,
      poster: this.getImageUrl(movie.poster_path, "w500"),
      backdrop: this.getImageUrl(movie.backdrop_path, "w780"),
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
      releaseDate: movie.release_date || movie.first_air_date,
      genres: movie.genres || [],
      runtime: movie.runtime || null,
      cast: movie.credits ? movie.credits.cast.slice(0, 10) : [],
      videos: movie.videos ? movie.videos.results : [],
      recommendations: movie.recommendations
        ? movie.recommendations.results
        : [],
      voteCount: movie.vote_count,
      popularity: movie.popularity,
    };
  },

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log("API cache cleared");
  },

  /**
   * Clear old cache entries
   */
  clearOldCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  },
};

// Genre mapping (common genres)
const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Make API globally available
window.API = API;
window.GENRES = GENRES;
