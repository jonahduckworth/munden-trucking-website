# Munden Truck & Equipment - Color Scheme & Typography Implementation Plan

## Brand Colors (from brand guidelines)

### Primary Colors
- **Burgundy/Maroon**: #7D3038 (Primary brand color)
- **Silver/Gray**: #C3C7CC (Secondary brand color)
- **Black**: #020102 (Text and accents)

### Typography
- **Primary Font**: Adidas Half Block 2016 (for headings/display)
- **Secondary Font**: COCOGOOSE Regular (for body text)
- **Fallback**: System fonts (Inter, Arial, sans-serif)

## Color Scheme Implementation

### Light Mode
```css
:root {
  /* Brand Colors */
  --munden-burgundy: 354 42% 34%; /* #7D3038 */
  --munden-silver: 216 6% 78%; /* #C3C7CC */
  --munden-black: 300 33% 1%; /* #020102 */
  
  /* Backgrounds */
  --background: 0 0% 100%; /* White */
  --foreground: 300 33% 1%; /* Munden Black */
  
  /* Primary (Burgundy) */
  --primary: 354 42% 34%; /* Munden Burgundy */
  --primary-foreground: 0 0% 100%; /* White */
  
  /* Secondary (Silver) */
  --secondary: 216 6% 78%; /* Munden Silver */
  --secondary-foreground: 300 33% 1%; /* Munden Black */
  
  /* Muted/Gray tones */
  --muted: 216 6% 94%; /* Light silver */
  --muted-foreground: 216 6% 35%; /* Dark silver */
  
  /* Accent (Burgundy variations) */
  --accent: 354 42% 44%; /* Lighter burgundy */
  --accent-foreground: 0 0% 100%; /* White */
  
  /* Cards */
  --card: 0 0% 100%; /* White */
  --card-foreground: 300 33% 1%; /* Munden Black */
  
  /* Destructive/Error */
  --destructive: 0 84% 60%; /* Red */
  --destructive-foreground: 0 0% 100%; /* White */
  
  /* Borders and inputs */
  --border: 216 6% 88%; /* Light silver */
  --input: 216 6% 88%; /* Light silver */
  --ring: 354 42% 34%; /* Burgundy focus ring */
}
```

### Dark Mode
```css
.dark {
  /* Backgrounds */
  --background: 300 33% 8%; /* Near black */
  --foreground: 216 6% 95%; /* Light silver */
  
  /* Primary (Burgundy) */
  --primary: 354 42% 44%; /* Lighter burgundy for better contrast */
  --primary-foreground: 0 0% 100%; /* White */
  
  /* Secondary (Silver) */
  --secondary: 216 6% 25%; /* Dark silver */
  --secondary-foreground: 216 6% 90%; /* Light silver */
  
  /* Muted/Gray tones */
  --muted: 216 6% 18%; /* Dark muted */
  --muted-foreground: 216 6% 70%; /* Light muted text */
  
  /* Accent */
  --accent: 354 42% 54%; /* Brighter burgundy */
  --accent-foreground: 0 0% 100%; /* White */
  
  /* Cards */
  --card: 300 33% 12%; /* Slightly lighter than background */
  --card-foreground: 216 6% 95%; /* Light silver */
  
  /* Destructive/Error */
  --destructive: 0 62% 40%; /* Darker red */
  --destructive-foreground: 0 0% 100%; /* White */
  
  /* Borders and inputs */
  --border: 216 6% 20%; /* Dark border */
  --input: 216 6% 20%; /* Dark input */
  --ring: 354 42% 44%; /* Burgundy focus ring */
}
```

## Implementation Strategy

### 1. Font Integration
- Add Google Fonts or custom font files for fallbacks
- Configure font families in Tailwind config:
  ```js
  fontFamily: {
    'display': ['Adidas Half Block 2016', 'Arial Black', 'sans-serif'],
    'body': ['COCOGOOSE Regular', 'Inter', 'system-ui', 'sans-serif'],
  }
  ```

### 2. Component Updates

#### Headers and Navigation
- Use burgundy (#7D3038) as primary navigation background
- White text on burgundy backgrounds
- Silver accents for hover states

#### Buttons
- Primary buttons: Burgundy background, white text
- Secondary buttons: Silver background, black text
- Outline buttons: Transparent with burgundy/silver borders

#### Hero Sections
- Gradient overlays using burgundy and black
- Text contrast optimization for readability

#### Service Cards
- Remove rainbow gradients
- Use burgundy accents for icons
- Silver borders and hover effects

#### Footer
- Dark gray/black background in light mode
- Burgundy accents for links

### 3. Dark Mode Toggle
- Add theme toggle component in header
- Store preference in localStorage
- System preference detection

### 4. Specific Component Changes

#### Header
- Background: Burgundy (#7D3038)
- Text: White
- Mobile menu: Dark overlay with burgundy accents

#### Services Grid
- Icon backgrounds: Burgundy with opacity
- Hover effects: Silver highlights
- Remove multi-color gradients

#### Equipment Showcase
- Badge colors: Burgundy for "NEW", Silver for status
- Card borders: Silver

#### CTA Sections
- Background: Burgundy gradient
- Text: White with proper contrast

#### Forms
- Focus states: Burgundy ring
- Error states: Keep red but adjust for brand
- Success states: Use darker burgundy

### 5. Accessibility Considerations
- Ensure WCAG AA contrast ratios:
  - Burgundy on white: 7.5:1 ✓
  - White on burgundy: 7.5:1 ✓
  - Black on silver: 15:1 ✓
- Add high contrast mode support

### 6. Implementation Order
1. Update CSS variables in globals.css
2. Add custom font configurations
3. Create theme toggle component
4. Update all color-specific classes in components
5. Test both light and dark modes
6. Optimize for accessibility

### 7. Additional Enhancements
- Add subtle animations for theme transitions
- Create branded loading states
- Update favicon and meta theme colors
- Add print styles respecting brand colors

## Benefits
- Consistent brand identity across the site
- Professional appearance matching company materials
- Improved accessibility with proper contrast
- Modern dark mode for user preference
- Reduced visual noise from rainbow colors
- Enhanced trust through cohesive design