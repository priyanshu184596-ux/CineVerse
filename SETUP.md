# CineVerse - Setup Guide

## Quick Start

### Step 1: Get TMDB API Key

1. Visit https://www.themoviedb.org/settings/api
2. Create an account or login
3. Request an API key (free)
4. Copy your API key

### Step 2: Configure API Key

**Option A: Direct Configuration (Easy)**

1. Open `js/api.js`
2. Find line with `API_KEY: 'YOUR_TMDB_API_KEY_HERE'`
3. Replace with your actual key:
   ```javascript
   API_KEY: "your_actual_key_here";
   ```

**Option B: Environment Configuration (Secure)**

1. Create a file `config.js` in the root directory
2. Add your configuration:
   ```javascript
   const CONFIG = {
     TMDB_API_KEY: "your_api_key_here",
     API_BASE_URL: "https://api.themoviedb.org/3",
     IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
   };
   ```
3. Update `api.js` to use CONFIG

### Step 3: Run Locally

**Using Python 3:**

```bash
python -m http.server 8000
```

**Using Python 2:**

```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js:**

```bash
npx http-server
```

**Using Ruby:**

```bash
ruby -run -ehttpd . -p 8000
```

Then visit: `http://localhost:8000`

### Step 4: Verify Installation

1. Open the website
2. Check browser console (F12 or Right-click → Inspect → Console)
3. You should see: "✨ CineVerse Ready!"
4. Movies should load from TMDB API

## Troubleshooting

### "API_KEY not configured" Error

- Check `js/api.js`
- Ensure you have a valid TMDB API key
- Verify key is inside quotes: `'YOUR_KEY'`

### No Movies Loading

- Check browser console for errors (F12)
- Verify internet connection
- Confirm API key is valid
- Check TMDB API status

### CORS Error

- TMDB should handle CORS properly
- If error persists, you may need a backend proxy

### Images Not Loading

- Check image URLs in browser console
- Verify poster paths are valid
- Some movies might not have images

## Development Tips

### Hot Reload

Use a live server extension in your editor:

- **VS Code**: Live Server extension
- **WebStorm**: Built-in development server
- **Sublime**: LiveReload plugin

### Debug Mode

Add `?debug=true` to URL to enable detailed logging:

```
http://localhost:8000?debug=true
```

### Testing API Calls

Open browser console and test directly:

```javascript
// Test API connection
await API.getTrending("week");

// Check favorites
console.log(Storage.getFavorites());

// Search
await API.search("Inception");
```

## Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Your TMDB key will be exposed (use backend proxy in production)

### Netlify

1. Connect GitHub repository
2. Set build command: (none needed)
3. Publish directory: `.`

### Vercel

1. Import project
2. No build configuration needed
3. Deploy

### Traditional Hosting

1. Upload all files to web server
2. Ensure API key is secure (use environment variables)
3. Test all functionality

## Production Checklist

- [ ] API key secured (use backend proxy)
- [ ] Images optimized
- [ ] Minified CSS and JS
- [ ] Tested on mobile devices
- [ ] Cross-browser tested
- [ ] Lighthouse performance checked
- [ ] SEO optimized
- [ ] Analytics configured
- [ ] Error tracking set up
- [ ] Backup configured

## File Structure Review

```
✅ index.html          - Main page
✅ css/style.css       - Main styles
✅ css/navbar.css      - Navbar styles
✅ css/hero.css        - Hero styles
✅ css/cards.css       - Card styles
✅ css/modal.css       - Modal styles
✅ css/animations.css  - Animations
✅ css/responsive.css  - Responsive design
✅ js/app.js           - Main app
✅ js/api.js           - TMDB API
✅ js/storage.js       - LocalStorage
✅ js/modal.js         - Modal logic
✅ js/slider.js        - Sliders
✅ js/search.js        - Search
✅ js/favorites.js     - Favorites
✅ js/auth.js          - Auth
✅ README.md           - Documentation
```

## Performance Optimization

### Image Optimization

```javascript
// Images are lazy loaded automatically
// Use smaller images for thumbnails
API.getImageUrl(path, "w342"); // 342px
API.getImageUrl(path, "w500"); // 500px
API.getImageUrl(path, "w780"); // 780px
```

### Caching

- API responses cached for 5 minutes
- Manual cache clear available
- localStorage used for favorites

### Minification

- Not minified for development (easier to debug)
- Can minify for production with tools like:
  - UglifyJS (JavaScript)
  - cssnano (CSS)
  - ImageOptim (Images)

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Questions?

Refer to:

- README.md - Full documentation
- Browser console (F12) - Error messages
- TMDB API docs - API details
- Code comments - Implementation details

## Next Steps

1. ✅ Get API key
2. ✅ Configure key
3. ✅ Run locally
4. ✅ Verify functionality
5. ⏭️ Deploy to hosting
6. ⏭️ Monitor performance
7. ⏭️ Gather feedback
8. ⏭️ Iterate and improve

Happy coding! 🎬✨
