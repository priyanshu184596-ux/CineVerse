# CineVerse - Assets Guide

## Assets Folder Structure

```
assets/
├── images/
│   ├── hero-bg.jpg           # Hero banner background (1920x1080+)
│   ├── no-image.jpg          # Fallback image for missing posters
│   ├── placeholder-sm.jpg    # Small placeholder (342x513)
│   ├── placeholder-md.jpg    # Medium placeholder (500x750)
│   └── placeholder-lg.jpg    # Large placeholder (780x1170)
│
├── icons/
│   ├── play.svg              # Play icon
│   ├── pause.svg             # Pause icon
│   ├── star.svg              # Star icon
│   ├── heart.svg             # Heart icon
│   ├── search.svg            # Search icon
│   └── menu.svg              # Menu icon
│
└── videos/
    └── trailer.mp4           # Sample trailer (optional)
```

## Recommended Images

### Hero Background

- **Dimensions**: 1920x1080 or larger
- **Format**: JPG or WebP
- **Size**: 200-400KB (compressed)
- **Content**: Movie backdrop image
- **Note**: Can be any cinematic image

### Fallback Images

- **Dimensions**: 342x513 for posters, 1280x720 for backdrops
- **Format**: JPG or PNG
- **Purpose**: Used when TMDB doesn't have images
- **Size**: 30-50KB each

## Using External Images

### TMDB Poster Images

```javascript
// Automatically provided by API
const posterUrl = API.getImageUrl(movie.poster_path, "w342");
// Result: https://image.tmdb.org/t/p/w342/path...
```

### Available Sizes

- `w92` - 92px wide
- `w154` - 154px wide
- `w185` - 185px wide
- `w342` - 342px wide
- `w500` - 500px wide (recommended)
- `w780` - 780px wide
- `original` - Original size

## Image Optimization Tips

### For Web

```bash
# Using ImageOptim (macOS)
open -a ImageOptim image.jpg

# Using ImageMagick
convert image.jpg -resize 1920x1080 -quality 80 optimized.jpg

# Using ffmpeg
ffmpeg -i image.jpg -vf scale=1920:1080 optimized.jpg
```

### Online Tools

- TinyPNG - https://tinypng.com/
- ImageOptim - https://imageoptim.com/
- Squoosh - https://squoosh.app/

### Performance

- JPG for photos (80-90% quality)
- PNG for graphics (transparent)
- WebP for modern browsers
- Lazy loading with `loading="lazy"`
- Responsive images with `srcset`

## Using Placeholder Images

### Without Images

```html
<!-- Local placeholder -->
<img src="assets/images/placeholder-md.jpg" alt="Movie poster" />

<!-- External placeholder services -->
<img src="https://via.placeholder.com/342x513?text=No+Image" alt="Movie" />

<!-- UI Avatars for user profiles -->
<img src="https://ui-avatars.com/api/?name=User+Name" alt="Avatar" />
```

### While Loading

```html
<!-- Show placeholder while loading -->
<img
  src="assets/images/placeholder-md.jpg"
  data-src="https://image.tmdb.org/t/p/w342/path.jpg"
  class="lazy-load"
  alt="Movie poster"
/>
```

## Free Resources

### Stock Images

- **Unsplash** - https://unsplash.com/
- **Pexels** - https://www.pexels.com/
- **Pixabay** - https://pixabay.com/
- **Freepik** - https://www.freepik.com/

### Movie Backdrops

- **TMDB** - https://www.themoviedb.org/ (with API)
- **IMDb** - https://www.imdb.com/ (with scraping)
- **Rotten Tomatoes** - https://www.rottentomatoes.com/

### Icons

- **Heroicons** - https://heroicons.com/
- **Feather Icons** - https://feathericons.com/
- **Font Awesome** - https://fontawesome.com/
- **Material Icons** - https://material.io/icons/

## Asset Management

### Naming Convention

```
images/
├── hero-bg.jpg              # Purpose-specific names
├── no-image.jpg
├── movie-poster-001.jpg
└── actor-avatar-001.jpg
```

### Compression Levels

```
High Quality:   100% - Use for hero images
Good Quality:   80-90% - Use for cards and modals
Compressed:     60-70% - Use for thumbnails
```

### File Sizes

- Hero image: 200-400KB
- Poster image: 30-60KB
- Thumbnail: 10-20KB
- Avatar: 5-10KB

## Hosting Images

### CDN Options

1. **Cloudinary** - Free tier includes transformations
2. **Imgix** - Image optimization and delivery
3. **Bunny CDN** - Low cost, fast global delivery
4. **AWS CloudFront** - Enterprise solution

### Self-Hosting

1. Traditional web host - Simple FTP upload
2. AWS S3 - Scalable cloud storage
3. GitHub Pages - Static hosting with git
4. Netlify - Deploy from git with CDN

## Integration Guide

### Step 1: Add Hero Image

1. Find a cinematic background image (1920x1080+)
2. Place in `assets/images/hero-bg.jpg`
3. HTML already references it:
   ```html
   <img src="assets/images/hero-bg.jpg" alt="Featured movie backdrop" />
   ```

### Step 2: Add Fallback Images

1. Download placeholder images (342x513 for posters)
2. Place in `assets/images/`
3. Reference in code:
   ```javascript
   const fallback = "assets/images/no-image.jpg";
   ```

### Step 3: Use External Images

- TMDB images are automatically used via API
- No local files needed for movie posters
- Fallbacks only used if TMDB images unavailable

## Troubleshooting

### Images Not Showing

1. Check file paths are correct
2. Verify CORS headers if external
3. Check file permissions (644 for images)
4. Validate image format is supported
5. Check browser console for errors

### Slow Loading

1. Compress images further
2. Use CDN for faster delivery
3. Implement lazy loading
4. Consider WebP format
5. Add loading placeholders

### CORS Issues

1. Use HTTPS for external images
2. Check CORS headers on server
3. Use CDN with CORS support
4. Proxy through backend if needed

## Image Dimensions Reference

### Movie Posters

- Small: 185x278 (w185)
- Medium: 342x513 (w342)
- Large: 500x750 (w500)
- Aspect Ratio: 2:3

### Movie Backdrops

- Small: 300x169
- Medium: 780x439 (w780)
- Large: 1280x720 (original)
- Aspect Ratio: 16:9

### User Avatars

- Thumbnail: 50x50
- Profile: 200x200
- Large: 400x400
- Aspect Ratio: 1:1

## Best Practices

✅ **DO:**

- Compress all images
- Use appropriate formats (JPG for photos, PNG for graphics)
- Provide alt text for accessibility
- Use responsive images
- Implement lazy loading
- Use CDN for external images

❌ **DON'T:**

- Use oversized images (>1MB)
- Mix formats inconsistently
- Forget alt attributes
- Auto-play videos without controls
- Host large files on git
- Use copyright material without permission

## Additional Resources

- **TMDB API Docs**: https://developers.themoviedb.org/
- **Image Optimization**: https://web.dev/optimize-images/
- **Responsive Images**: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **WebP Format**: https://developers.google.com/speed/webp

---

For more information, see README.md or DEVELOPER.md
