# About Section Navigation Update Plan

## Current Issues
1. News/Blog and Careers pages are not accessible from the main navigation
2. About dropdown links to pages that don't exist (/about/company, /about/team, /about/partners)
3. No main About page exists

## Proposed Solution

### 1. Update Navigation Structure
Update the About dropdown in Header.tsx to include:
- Our Company (existing link)
- Our Team (existing link) 
- Industry Partners (existing link)
- News & Updates (new)
- Careers (new)

### 2. Create Missing Pages

#### A. Main About Page (/about/page.tsx)
- Overview of company history and values
- Links to sub-pages
- Key statistics and achievements
- Company mission and vision

#### B. Company Page (/about/company/page.tsx)
- Detailed company history
- Core values and mission
- Service area information
- Certifications and affiliations

#### C. Team Page (/about/team/page.tsx)
- Leadership team profiles
- Department overviews
- Team photos and bios
- Company culture highlights

#### D. Partners Page (/about/partners/page.tsx)
- EcoLog partnership details
- Industry affiliations
- Supplier relationships
- Community partnerships

### 3. Mobile Navigation Updates
- Add News and Careers to mobile menu
- Ensure all About sub-pages are accessible

### 4. Implementation Steps
1. Create the about directory structure
2. Implement all missing About pages
3. Update Header.tsx to add News and Careers to About dropdown
4. Update mobile navigation
5. Update sitemap.ts with new routes
6. Test navigation on desktop and mobile