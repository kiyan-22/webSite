# Prince Kian Dumlao - Personal Portfolio Website

A modern, responsive personal portfolio website for Prince Kian Dumlao, a 4th-year IT student at PSU Asingan Campus.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Multiple sections: Home, About, Skills, Experience, Projects, and Contact
- Interactive project filtering
- Contact form with validation
- Detailed CV page
- Mobile-friendly navigation

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS, no frameworks)
- Font Awesome for icons
- Google Fonts

## Pages

1. **index.html** - Main portfolio page with all sections
2. **cv.html** - Detailed curriculum vitae page

## How to Run

### Using XAMPP

1. Make sure XAMPP is installed and running
2. The website files should be in the `htdocs/myWebsite` directory
3. Open a web browser and navigate to `http://localhost/myWebsite`

### Using Any Web Server

1. Copy all files to your web server's public directory
2. Access the website through your domain or IP address

### Running Locally Without a Server

1. Simply open the `index.html` file in any modern web browser

## File Structure

```
myWebsite/
├── index.html          # Main portfolio page
├── cv.html             # Curriculum vitae page
├── css/
│   ├── style.css       # Main stylesheet
│   └── cv.css          # CV page specific styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # All website images
│   ├── profile.svg     # Profile picture
│   ├── hero-bg.svg     # Hero section background
│   ├── project1.svg    # E-commerce project image
│   ├── project2.svg    # Task management app image
│   ├── project3.svg    # UI/UX design portfolio image
│   └── project4.svg    # Student information system image
└── README.md           # This file
```

## Customization

### Personal Information

To update personal information, edit the following files:

- `index.html` - For main portfolio information
- `cv.html` - For detailed CV information

### Styling

To change the color scheme or styling:

1. Open `css/style.css`
2. Modify the CSS variables in the `:root` selector at the top of the file

```css
:root {
    --primary-color: #4a6cf7;  /* Change this for the main color */
    --secondary-color: #6c757d;
    --dark-color: #1e293b;
    --light-color: #f8f9fa;
    /* Other variables */
}
```

## Browser Compatibility

This website is compatible with all modern browsers including:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## License

This project is available for personal use.

## Author

Prince Kian Dumlao