# CineVerse - Developer Quick Reference

## Module APIs

### Storage Module

```javascript
// Get/Set items
Storage.getItem(key, defaultValue);
Storage.setItem(key, value);
Storage.removeItem(key);
Storage.clear();

// Favorites
Storage.addFavorite(movie);
Storage.removeFavorite(movieId);
Storage.getFavorites();
Storage.isFavorited(movieId);

// Watch History
Storage.addToHistory(movie);
Storage.getWatchHistory();

// Continue Watching
Storage.addContinueWatching(movie, progress);
Storage.getContinueWatching();
Storage.updateProgress(movieId, progress);

// Import/Export
Storage.exportData();
Storage.importData(data);
```

### API Module

```javascript
// Fetch Methods
API.getTrending(timeWindow); // 'day' or 'week'
API.getPopular(page);
API.getTopRated(page);
API.getUpcoming(page);
API.getByGenre(genreId, page);
API.search(query, page);
API.getMovieDetails(movieId);
API.getVideos(movieId);
API.getCredits(movieId);
API.getRecommendations(movieId);
API.getGenres();

// Utilities
API.getImageUrl(path, size); // 'w342', 'w500', 'w780', 'original'
API.formatMovie(movie);
API.clearCache();
API.clearOldCache();

// Constants
GENRES; // Genre ID mapping
```

### Modal Module

```javascript
// Modal Control
Modal.init();
Modal.open(movie);
Modal.close();
Modal.isOpen();

// Handlers (internal)
Modal.buildModalContent(movie);
Modal.attachEventListeners();
Modal.handlePlay();
Modal.handleTrailer(event);
Modal.handleFavorite();
```

### Slider Module

```javascript
// Initialization
Slider.init();

// Rendering
Slider.renderCards(trackId, movies, onCardClick);
Slider.createCard(movie, onCardClick);

// Navigation
Slider.scroll(track, direction); // 'left' or 'right'
Slider.updateNavButtons(track);

// Utilities
Slider.clear(trackId);
```

### Search Module

```javascript
// Search
Search.init();
Search.handleInput(event);
Search.liveSearch(query);
Search.performSearch(query);
Search.displaySearchResults(movies, query);
Search.clear();
```

### Favorites Module

```javascript
// Favorites
Favorites.init();
Favorites.getAll();
Favorites.add(movie);
Favorites.remove(movieId);
Favorites.toggle(movie);
Favorites.isFavorited(movieId);
Favorites.getCount();
Favorites.clearAll();
```

### Auth Module

```javascript
// User Management
Auth.isLoggedIn();
Auth.getCurrentUser();
Auth.login(credentials);
Auth.logout();
Auth.register(userData);
Auth.updateProfile(updates);

// Security
Auth.changePassword(currentPassword, newPassword);
Auth.verifyToken(token);
Auth.refreshToken();
```

### App Module

```javascript
// Initialization
App.init();
App.loadHero();
App.loadSections();
App.loadSection(section);
App.playTrailer(movie);
App.getContinueWatching();
```

## Event System

### Custom Events

```javascript
// Listen for favorites update
window.addEventListener("favoritesUpdated", (e) => {
  const { movieId, isFavorited } = e.detail;
});

// Dispatch custom event
window.dispatchEvent(
  new CustomEvent("favoritesUpdated", {
    detail: { movieId: 123, isFavorited: true },
  }),
);
```

## CSS Classes

### Layout

- `.container` - Max width container
- `.section-container` - Section with padding
- `.flex` - Flex display
- `.flex-center` - Flex centered

### Text

- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-gradient` - Gradient text
- `.text-center` - Centered text

### Animations

- `.animate-fadeIn` - Fade in
- `.animate-slideUp` - Slide up
- `.animate-slideDown` - Slide down
- `.animate-pulse` - Pulsing animation
- `.animate-spin` - Spinning animation

### Visibility

- `.hidden` - Hide element
- `.opacity-50` - 50% opacity
- `.opacity-75` - 75% opacity

## Common Patterns

### Loading Data

```javascript
// Show spinner
const loading = document.getElementById("loadingSpinner");
loading.classList.add("active");

// Fetch and process
const data = await API.getTrending("week");

// Hide spinner
loading.classList.remove("active");
```

### Opening Movie Details

```javascript
// From anywhere in the code
const movie = { id: 123, title: "Movie" };
Modal.open(movie);

// Modal will fetch full details automatically
```

### Adding to Favorites

```javascript
// Toggle favorite
Favorites.toggle(movie);

// Or explicitly
Favorites.add(movie);
Favorites.remove(movieId);

// Check status
const isFavorited = Favorites.isFavorited(movieId);
```

### Rendering Slider Cards

```javascript
// Get data
const movies = await API.getTrending("week");

// Render in slider
Slider.renderCards("trendingTrack", movies.results, (movie) => {
  Modal.open(movie);
});
```

## Debugging

### Enable Debug Logs

Add to URL: `?debug=true`

### Browser Console

```javascript
// Check current state
console.log(Storage.getFavorites());
console.log(Storage.getWatchHistory());
console.log(Auth.getCurrentUser());

// Test API
await API.getTrending("week");
await API.search("Inception");

// Clear cache
API.clearCache();

// Export all data
const backup = Storage.exportData();
console.log(backup);
```

### Common Issues

| Issue                | Solution                      |
| -------------------- | ----------------------------- |
| No movies loading    | Check API key in api.js       |
| CORS error           | TMDB should handle CORS       |
| Images not showing   | Check image URLs in console   |
| Favorites not saving | Check localStorage is enabled |
| Animations janky     | Reduce animation complexity   |

## Performance Tips

1. **Cache API Responses** - Already enabled by default
2. **Lazy Load Images** - Automatically with `loading="lazy"`
3. **Debounce Search** - 500ms debounce already applied
4. **Minimize Reflows** - CSS animations use transforms
5. **Use localStorage** - For persistent data storage

## Browser DevTools

### Performance

- Lighthouse audit (Chrome DevTools)
- Network tab for API monitoring
- Performance tab for animations

### Accessibility

- Axe DevTools extension
- WAVE browser extension
- Manual keyboard navigation test

### Responsive Design

- Device emulation (F12)
- Toggle device toolbar
- Test on actual devices

## CSS Custom Properties

```css
/* Colors */
--bg-primary
--bg-secondary
--text-primary
--text-secondary
--purple, --pink, --red, --gold

/* Effects */
--shadow-sm, --shadow-md, --shadow-lg
--gradient-primary, --gradient-secondary

/* Layout */
--spacing-xs through --spacing-2xl
--radius-sm through --radius-xl

/* Transitions */
--transition-fast: 150ms
--transition-base: 250ms
--transition-slow: 400ms
```

## File Size Optimization

### Current Sizes (Unminified)

- style.css: ~15KB
- navbar.css: ~3KB
- hero.css: ~4KB
- cards.css: ~8KB
- modal.css: ~9KB
- animations.css: ~12KB
- responsive.css: ~8KB
- API calls: ~8KB

**Total: ~67KB (Gzip: ~15KB)**

### Production Optimization

- Minify CSS/JS: -60% size
- Gzip compression: -75% size
- Image optimization: -50-80% size
- Tree shaking: Remove unused code

## Deployment Checklist

- [ ] API key configured
- [ ] Images optimized
- [ ] Console errors checked
- [ ] Mobile tested
- [ ] Performance audited
- [ ] SEO meta tags added
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] HTTPS enabled
- [ ] Cache headers configured

---

For more details, see README.md and SETUP.md
