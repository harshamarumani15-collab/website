# Rapido Clone - Bike Taxi Service Website

A modern, responsive website clone inspired by Rapido, India's largest bike taxi service. Built with React.js and Vite.

## 🚀 Features

- **Modern UI/UX**: Clean and intuitive interface with Rapido's signature yellow and black theme
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multiple Pages**:
  - Home page with hero section and features
  - Services page showcasing all offerings
  - Booking form for ride reservations
  - About page with company information
  - Contact page with inquiry form
- **Interactive Components**: Navigation, forms, and smooth transitions
- **Icon Library**: Uses Lucide React for beautiful, consistent icons

## 🛠️ Tech Stack

- **React.js** - Frontend library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Custom styling with CSS variables

## 📦 Installation

1. Navigate to the project directory:
```bash
cd rapido-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
rapido-clone/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles and theme
│   ├── main.jsx         # Entry point
│   └── assets/          # Static assets
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Pages Overview

### Home Page
- Hero section with call-to-action buttons
- Services showcase (Bike Taxi, Auto Rickshaw, Parcel Delivery)
- Features highlighting why choose Rapido

### Services Page
- Detailed view of all services
- Pricing information
- Service descriptions

### Booking Page
- Interactive booking form
- Service type selection
- Pickup and drop location inputs
- Date and time picker
- Contact information

### About Page
- Company history and mission
- Key statistics
- Information about the service

### Contact Page
- Contact information
- Inquiry form
- Social media links

## 🚀 Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎯 Customization

You can easily customize the theme by modifying the CSS variables in `src/index.css`:

```css
:root {
  --primary-yellow: #ffc107;
  --primary-black: #1a1a1a;
  --secondary-gray: #6c757d;
  /* ... other variables */
}
```

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: < 768px
- Desktop: > 768px

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This is a learning project and is not affiliated with the actual Rapido company.

## 👨‍💻 Author

Created as a demonstration of React.js capabilities.

---

**Note**: This is a frontend demo project. In a real-world application, you would need to integrate with backend APIs for booking functionality, user authentication, payment processing, etc.
