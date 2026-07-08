# 🎬 CineVerse - Premium Streaming Platform

A modern, responsive streaming platform website built with **vanilla HTML5, CSS3, and JavaScript (ES6)**. Inspired by the best streaming services, CineVerse features a premium dark cinematic theme with glassmorphism design patterns.

## ✨ Features

### Design & UI/UX

- ✅ **Dark Cinematic Theme** - Premium black background with purple, pink, and red gradient accents
- ✅ **Glassmorphism** - Modern frosted glass effect on cards and modals
- ✅ **Smooth Animations** - Delightful entrance, hover, and scroll animations
- ✅ **Premium Typography** - Inter & Poppins fonts for modern aesthetic
- ✅ **Soft Shadows** - Elegant depth with carefully crafted shadows
- ✅ **Rounded Corners** - Modern border radius throughout
- ✅ **Mobile-First Responsive** - Perfect on all devices (mobile, tablet, desktop)
- ✅ **Accessibility** - ARIA labels, keyboard navigation, focus states

### Functionality

- ✅ **Sticky Navbar** - Transforms on scroll with search functionality
- ✅ **Hero Section** - Featured movie with large backdrop image
- ✅ **Movie Cards** - Beautiful cards with hover animations
- ✅ **Horizontal Sliders** - Touch-friendly movie carousels
- ✅ **Movie Modal** - Detailed view with cast, rating, and trailer button
- ✅ **Live Search** - Debounced search with TMDB integration
- ✅ **Favorites System** - Add/remove movies to favorites using localStorage
- ✅ **Continue Watching** - Track watched movies and progress
- ✅ **Back to Top** - Smooth scroll to top button
- ✅ **Loading States** - Spinner during API calls
- ✅ **Error Handling** - Graceful error messages

### Content Sections

- ✅ Continue Watching
- ✅ Trending Movies
- ✅ Top Rated
- ✅ Popular
- ✅ Action & Adventure
- ✅ Comedy
- ✅ Science Fiction
- ✅ Horror & Thriller

## 🛠️ Tech Stack

**Frontend Only - No Build Tools Required**

- HTML5 (Semantic markup)
- CSS3 (Custom properties, Flexbox, Grid, Animations)
- JavaScript ES6+ (No frameworks, no jQuery)
- localStorage API (Data persistence)
- Fetch API (TMDB integration)

**External**

- TMDB API (Movie data)
- Google Fonts (Typography)
- Inline SVG (Icons)

## 📁 Folder Structure

```
CineVerse/
├── index.html                 # Home page
├── movie.html                 # Movie details page (template)
├── search.html                # Search results page (template)
├── login.html                 # Login page (template)
├── profile.html               # User profile page (template)
│
├── css/
│   ├── style.css              # Main styles & variables
│   ├── navbar.css             # Navigation bar styles
│   ├── hero.css               # Hero section styles
│   ├── cards.css              # Movie card styles
│   ├── modal.css              # Modal styles
│   ├── animations.css         # Animation keyframes
│   └── responsive.css         # Responsive design breakpoints
│
├── js/
│   ├── app.js                 # Main application controller
│   ├── api.js                 # TMDB API integration
│   ├── storage.js             # localStorage utilities
│   ├── modal.js               # Modal management
│   ├── slider.js              # Horizontal slider functionality
│   ├── search.js              # Search functionality
│   ├── favorites.js           # Favorites management
│   └── auth.js                # Authentication (basic)
│
├── assets/
│   ├── images/                # Image assets
│   ├── icons/                 # Icon assets
│   └── videos/                # Video assets (if needed)
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A TMDB API key (free at https://www.themoviedb.org/settings/api)

### Installation

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd cineverse
   ```

2. **Get TMDB API Key**
   - Visit https://www.themoviedb.org/settings/api
   - Sign up and create an API key
   - Copy your API key

3. **Add API Key**
   - Open `js/api.js`
   - Replace `'YOUR_TMDB_API_KEY_HERE'` with your actual API key:

   ```javascript
   API_KEY: "your_actual_api_key_here";
   ```

4. **Open in Browser**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended):

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (with http-server)
   npx http-server
   ```

   - Then visit `http://localhost:8000`

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large**: 1025px - 1440px
- **XL**: 1441px+

## 🎨 CSS Architecture

### CSS Variables

All colors, spacing, and transitions are defined as CSS variables in `style.css`:

```css
--bg-primary: #0f0f0f;
--gradient-primary: linear-gradient(
  135deg,
  #667eea 0%,
  #764ba2 50%,
  #f093fb 100%
);
--shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
```

### Color Palette

- **Primary Background**: `#0f0f0f` (Deep Black)
- **Secondary Background**: `#1a1a1a` (Dark Gray)
- **Primary Gradient**: Purple → Pink
- **Accent Gradient**: Pink → Red
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#b0b0b0` (Light Gray)

### Animations

- Entrance animations (fadeIn, slideUp, etc.)
- Hover effects (scale, glow, etc.)
- Scroll animations (fade on scroll)
- Loading animations (spin, shimmer)
- Interactive animations (ripple, bounce)

## 🔌 API Integration

### TMDB API Usage

```javascript
// Get trending movies
const trendingMovies = await API.getTrending("week");

// Get popular movies
const popularMovies = await API.getPopular();

// Search movies
const searchResults = await API.search("query");

// Get movie details
const details = await API.getMovieDetails(movieId);
```

### Cached Responses

API responses are cached for 5 minutes to reduce API calls:

```javascript
const cached = this.cache.get(cacheKey);
if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
  return cached.data;
}
```

## 💾 Local Storage

### Stored Data

- **Favorites**: `cineverse_favorites` - Array of favorited movies
- **Watch History**: `cineverse_watch_history` - Array of watched movies
- **Continue Watching**: `cineverse_continue_watching` - Movies to resume
- **User**: `cineverse_user` - Current user data
- **Preferences**: `cineverse_preferences` - User preferences

### Usage

```javascript
// Add to favorites
Storage.addFavorite(movie);

// Get favorites
const favorites = Storage.getFavorites();

// Add to watch history
Storage.addToHistory(movie);

// Add to continue watching
Storage.addContinueWatching(movie, progressSeconds);
```

## ♿ Accessibility Features

- **ARIA Labels**: All buttons and interactive elements have aria-labels
- **Semantic HTML**: Proper heading hierarchy, form elements, landmarks
- **Keyboard Navigation**: All features accessible via keyboard
- **Focus States**: Visible focus outlines on interactive elements
- **Color Contrast**: WCAG AA compliant text contrast
- **Alt Text**: All images have descriptive alt attributes

## 📊 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **CSS Animations**: GPU-accelerated transforms and opacity
- **Debouncing**: Search queries debounced by 500ms
- **Caching**: API responses cached for 5 minutes
- **Semantic HTML**: Proper heading hierarchy for SEO
- **Minifiable Code**: Clean, organized structure

## 🎯 JavaScript Architecture

### Modular Design

Each JavaScript file is a self-contained module:

- **storage.js**: localStorage operations
- **api.js**: TMDB API calls
- **modal.js**: Movie details modal
- **slider.js**: Horizontal carousels
- **search.js**: Search functionality
- **favorites.js**: Favorites management
- **app.js**: Main controller

### Event System

Custom events for module communication:

```javascript
// Dispatch event
window.dispatchEvent(
  new CustomEvent("favoritesUpdated", {
    detail: { movieId: 123, isFavorited: true },
  }),
);

// Listen for event
window.addEventListener("favoritesUpdated", (e) => {
  console.log(e.detail);
});
```

## 📝 Code Examples

### Adding to Favorites

```javascript
// In slider.js or modal.js
const movie = { id: 123, title: "Movie Title" };
Favorites.add(movie);

// Or toggle
Favorites.toggle(movie);

// Check if favorited
const isFavorited = Favorites.isFavorited(123);
```

### Searching Movies

```javascript
// Live search
const results = await API.search("query");

// Format results
const formatted = results.map((m) => API.formatMovie(m));
```

### Opening Movie Modal

```javascript
// From card click
const movie = { id: 123, title: "Movie" };
Modal.open(movie);

// Modal fetches full details automatically
```

## 🔒 Security Notes

- **API Key**: In production, move API key to backend
- **CORS**: TMDB API handles CORS properly
- **XSS Protection**: All user input sanitized
- **localStorage**: Only stores non-sensitive data

## 🚧 Future Enhancements

- [ ] Backend authentication
- [ ] User ratings and reviews
- [ ] Social sharing features
- [ ] Watchlist management
- [ ] Genre filtering
- [ ] Advanced search filters
- [ ] Video player integration
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

### Development Guidelines

- Keep code modular and well-commented
- Follow CSS custom properties for colors
- Use semantic HTML
- Test on multiple devices
- Maintain accessibility standards

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

- **TMDB API**: Movie data provided by The Movie Database
- **Fonts**: Google Fonts (Inter & Poppins)
- **Icons**: Inline SVG icons
- **Inspiration**: Modern streaming platforms (Netflix, Disney+, etc.)

## 📞 Support

For issues, questions, or suggestions, please open an issue or contact the developer.

---

**Made with ❤️ by a Senior Frontend Engineer**

**Last Updated**: 2026

**Status**: Production Ready ✅
