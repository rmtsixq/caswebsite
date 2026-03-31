# Private Ruzgar Anatolian Lisesi - CAS Website 🌟

## Overview

A modern, beautiful website showcasing the CAS (Creativity, Activity, Service) program of Private Ruzgar Anatolian Lisesi in Diyarbakır, Turkey. This website features student profiles, project galleries, and comprehensive information about the IB Diploma Programme's CAS component.

## Features

### 🌍 Beautiful 3D Globe
- **Preserved Original Design**: The stunning Three.js globe highlighting the school's location in Diyarbakır
- **Interactive**: Users can rotate and explore the globe
- **Responsive**: Adapts beautifully to all screen sizes

### 🎨 Modern Design
- **Glassmorphism Effects**: Subtle blur effects and transparent elements
- **Dark Theme**: Elegant dark color palette with red accents
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Mobile Responsive**: Optimized for all devices

### 🌐 Bilingual Support
- **Turkish/English**: Full language toggle functionality
- **Persistent**: Language preference saved in browser storage
- **Dynamic**: Real-time text updates without page reload

### 📱 Pages Structure

#### 🏠 Ana Sayfa (Home Page)
- School logo and introduction
- CAS program overview
- Three pillars of CAS
- Call-to-action buttons
- The beautiful preserved globe section

#### 👥 Öğrenciler (Students)
- Grid layout of student cards
- Search functionality
- Student photos, names, classes, and quotes
- Links to individual profiles

#### 👤 Öğrenci Profili (Student Profile)
- Individual student pages
- Biography section
- Personal CAS approach
- Tabbed project sections (Creativity, Activity, Service)
- IB-compliant project format (Amaç-Süreç-Sonuç-Yansıma)
- Personal reflections/blog posts

#### 📊 Projeler (Projects)
- Timeline view of all projects
- Filter by CAS category
- Project cards with participants and dates
- Beautiful visual timeline design

#### ℹ️ CAS Hakkında (About CAS)
- What is CAS explanation
- 7 Learning Outcomes with infographic design
- Coordinator message and photo
- School's CAS approach

## Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: ES6+ with modular structure
- **Three.js**: 3D globe visualization
- **Firebase**: Authentication system (preserved from original)
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## File Structure

```
/workspace/
├── index.html              # Main home page with globe
├── students.html           # Students catalog
├── student-profile.html    # Individual student profile template
├── projects.html           # Projects timeline and filtering
├── about-cas.html         # About CAS information
├── styles.css             # Main stylesheet
├── globe.js              # Beautiful 3D globe (preserved)
├── mühür.png             # School logo (replaced with Instagram profile image)
└── js/
    ├── language.js        # Bilingual functionality
    ├── main.js           # Main website interactions
    ├── auth.js           # Firebase authentication
    ├── auth-ui.js        # Auth UI components
    └── firebase-config.js # Firebase configuration
```

## Color Palette

- **Primary**: #1a1a1a (Dark Black)
- **Secondary**: #e63946 (Red)
- **Accent**: #ff4d4d (Bright Red)
- **Text**: #ffffff (White)
- **Text Light**: #cccccc (Light Gray)
- **Background**: #121212 (Dark Gray)

## Key Features Implemented

### ✨ Enhanced Glassmorphism
- Subtle `backdrop-filter: blur()` effects
- Transparent backgrounds with rgba values
- Beautiful border highlights on hover
- Professional glass-like appearance

### 🎯 IB-Compliant Structure
- Proper CAS project format
- 7 Learning Outcomes display
- Student reflection system
- Professional presentation

### 📱 Mobile Optimization
- Responsive grid layouts
- Touch-friendly navigation
- Optimized globe display on mobile
- Collapsible menus and cards

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through the different sections
3. Use the language toggle (EN/TR) in the top navigation
4. Explore student profiles and projects
5. Interact with the beautiful 3D globe!

## Customization

### Adding New Students
1. Add student data to `js/main.js` studentsData array
2. Create corresponding profile pages
3. Add student photos to the project

### Adding New Projects
1. Update `projects.html` with new project items
2. Ensure proper data-category attributes for filtering
3. Follow the timeline structure

### Language Support
- Update `js/language.js` translations object
- Add `data-translate` attributes to HTML elements
- Translations automatically apply on toggle

## Notes

- **Globe Preserved**: The original beautiful globe implementation is completely preserved
- **Color Scheme Maintained**: Original dark theme with red accents kept intact
- **Modern UX**: Enhanced with subtle glassmorphism and smooth animations
- **Professional Quality**: Ready for production use

---

*Built with ❤️ for Private Ruzgar Anatolian Lisesi IB Diploma Programme*