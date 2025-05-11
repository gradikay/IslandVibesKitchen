# Island Vibes Kitchen - Website Customization Guide

## Quick Start 
1. Open the project files in your code editor
2. Start a local server: `python -m http.server 5000` 
3. Visit `http://0.0.0.0:5000` to view the site

## Customizing Content

### Text Modifications
Edit these files to change website content:
- `index.html` - Homepage content
- `about.html` - About page content and team information
- `menu.html` - Menu items and pricing
- `contact.html` - Contact information and hours
- `events.html` - Events and catering information
- `meal.html` - Customizable meal options

### Image Modifications
1. Add your images to the `assets/images/` directory
2. Replace existing images while keeping the same filenames, or
3. Update image paths in HTML files if using new filenames

Common image locations:
- Logo: `assets/images/logo.png`
- Hero images: `assets/images/hero.webp`, `assets/images/hero-bg2.png`
- Team photos: `assets/images/chef-*.png`
- Food photos: `assets/images/jerk-chicken.png`, etc.

### Styling Modifications
Edit these files to change the website's appearance:
- `css/style.css` - Main styling
- `css/responsive.css` - Mobile and responsive design

Key style variables (in `css/style.css`):
```css
:root {
  --jamaica-green: #009B3A;
  --jamaica-yellow: #FED100;
  --jamaica-black: #000000;
  /* Add/modify colors here */
}
```

## Deployment on Replit

1. Click the "Deploy" button in the top-right corner
2. Select "Static" deployment type
3. Configure deployment settings:
   - Build Command: Leave empty (already built)
   - Public Directory: `./` (root directory)
4. Click "Deploy"

Your site will be live at the provided Replit deployment URL.

## SEO & Meta Tags

Update meta tags in each HTML file's head section:
- Page titles
- Descriptions
- Open Graph tags
- Twitter card info

Example:
```html
<title>Your New Title | Island Vibes Kitchen</title>
<meta name="description" content="Your description here">
```

## Maintenance

- Keep image sizes optimized for web
- Regularly update content and prices
- Test responsiveness on different devices
- Check all links are working

## License
© Gradi Kayamba, 2025. All rights reserved.