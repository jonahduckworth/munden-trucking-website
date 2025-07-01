# Services and Equipment Pages Implementation Plan

## Overview
This plan outlines the implementation and standardization of all services and equipment pages referenced in the header navigation dropdowns. The goal is to ensure consistency, eliminate duplication, and create a logical information architecture.

## Current Navigation Structure

### Services Dropdown
1. **Repair Shop** (Featured) - `/services/repair-shop`
   - CVIP Inspections - `/services/repair-shop/commercial-vehicle-inspections`
   - Preventive Maintenance - `/services/repair-shop/preventive-maintenance`
   - Emergency Repairs - `/services/repair-shop/emergency-repairs`
   - Fleet Services - `/services/repair-shop/fleet-services` (missing)
2. **Log Hauling** - `/services/log-hauling`
3. **Equipment Sales** - `/services/equipment-sales`

### Equipment Dropdown
1. **Harvesters** - `/equipment/new/harvesters`
2. **Forwarders** - `/equipment/new/forwarders`
3. **Used Equipment** - `/equipment/used`

## Implementation Plan

### Phase 1: Services Pages Completion

#### 1.1 Main Services Overview Page
- **Status**: Exists at `/services/page.tsx`
- **Action**: Review and enhance with:
  - Clear service category cards linking to sub-pages
  - Quick contact CTAs for each service type
  - Featured testimonials for each service category

#### 1.2 Repair Shop Hub Page
- **Status**: Exists at `/services/repair-shop/page.tsx`
- **Action**: Enhance as the main hub for all repair services
- **Content Structure**:
  - Hero section highlighting 24/7 availability
  - Service grid with 4 sub-services
  - Certifications showcase
  - Quick booking widget

#### 1.3 CVIP Inspections Page
- **Status**: Exists at `/services/repair-shop/commercial-vehicle-inspections/page.tsx`
- **Action**: Standardize with service page template
- **Key Elements**:
  - Inspection process timeline
  - Required documents checklist
  - Pricing information
  - Online booking integration

#### 1.4 Preventive Maintenance Page
- **Status**: Exists at `/services/repair-shop/preventive-maintenance/page.tsx`
- **Action**: Standardize with service page template
- **Key Elements**:
  - Maintenance schedules by vehicle type
  - Service packages with pricing
  - Benefits of regular maintenance
  - Maintenance history tracking info

#### 1.5 Emergency Repairs Page
- **Status**: Exists at `/services/repair-shop/emergency-repairs/page.tsx`
- **Action**: Standardize with service page template
- **Key Elements**:
  - 24/7 emergency contact prominently displayed
  - Mobile repair unit information
  - Coverage area map
  - Response time guarantees

#### 1.6 Fleet Services Page (NEW)
- **Status**: Missing
- **Path**: `/services/repair-shop/fleet-services/page.tsx`
- **Action**: Create new page
- **Content**:
  - Fleet management programs
  - Volume discount information
  - Dedicated account management
  - Custom maintenance schedules
  - Fleet tracking and reporting
  - Priority service lanes

#### 1.7 Log Hauling Page
- **Status**: Exists at `/services/log-hauling/page.tsx`
- **Action**: Review and enhance
- **Key Elements**:
  - Fleet specifications
  - Service area coverage
  - Safety certifications
  - Quote request form specific to hauling

#### 1.8 Equipment Sales Page
- **Status**: Exists at `/services/equipment-sales/page.tsx`
- **Action**: Enhance as bridge to equipment section
- **Key Elements**:
  - Link to equipment showcase
  - Financing options overview
  - Trade-in program details
  - Current promotions

### Phase 2: Equipment Pages Enhancement

#### 2.1 Main Equipment Page
- **Status**: Exists at `/equipment/page.tsx`
- **Action**: Enhance as equipment hub
- **Structure**:
  - Category navigation (New/Used)
  - Featured equipment carousel
  - Quick filter options
  - Financing calculator link

#### 2.2 New Equipment Landing
- **Status**: Exists at `/equipment/new/page.tsx`
- **Action**: Enhance category page
- **Content**:
  - EcoLog brand showcase
  - Category cards (Harvesters/Forwarders)
  - Why buy new section
  - Warranty information

#### 2.3 Harvesters Category
- **Status**: Exists at `/equipment/new/harvesters/page.tsx`
- **Action**: Standardize product listing
- **Features**:
  - Model comparison table
  - Specifications filter
  - Individual product pages for each model
  - Request quote functionality

#### 2.4 Forwarders Category
- **Status**: Exists at `/equipment/new/forwarders/page.tsx`
- **Action**: Standardize product listing
- **Features**:
  - Model comparison table
  - Specifications filter
  - Individual product pages for each model
  - Request quote functionality

#### 2.5 Used Equipment
- **Status**: Exists at `/equipment/used/page.tsx`
- **Action**: Enhance with dynamic inventory
- **Features**:
  - Advanced filtering (type, year, price, hours)
  - Individual listing pages
  - Inspection report links
  - Trade-in value calculator

### Phase 3: Shared Components & Templates

#### 3.1 Service Page Template
Create reusable template with:
- Hero section with service name and description
- Key benefits grid (3-4 items)
- Process/How it works section
- Pricing information (if applicable)
- FAQ section specific to service
- CTA section with booking/quote options
- Related services navigation

#### 3.2 Equipment Listing Template
Create reusable template with:
- Equipment grid/list view toggle
- Specification quick view
- Comparison tool integration
- Finance calculator integration
- Contact dealer CTA
- Related equipment suggestions

#### 3.3 Shared Components
- **ServiceCard**: Consistent service preview cards
- **EquipmentCard**: Consistent equipment preview cards
- **PricingTable**: Reusable pricing display
- **ProcessTimeline**: Service process visualization
- **SpecificationTable**: Equipment specs display
- **CTASection**: Consistent call-to-action sections

### Phase 4: SEO and Performance

#### 4.1 Structured Data
- Service schema for all service pages
- Product schema for equipment pages
- BreadcrumbList schema for navigation
- LocalBusiness schema enhancement

#### 4.2 Meta Data Standardization
- Title format: `[Service/Product] | [Category] | Munden Truck & Equipment`
- Description format: Benefit-focused, include location, 155 chars
- Open Graph images for each category

#### 4.3 Internal Linking
- Related services links on each service page
- Equipment alternatives on product pages
- Cross-linking between services and relevant equipment

### Phase 5: User Experience Enhancements

#### 5.1 Navigation Improvements
- Breadcrumb navigation on all pages
- "Back to [Parent]" navigation buttons
- Sticky navigation for long pages
- Mobile-optimized navigation

#### 5.2 Interactive Elements
- Service booking integration on relevant pages
- Quote request forms with service/equipment pre-selection
- Live chat integration for immediate questions
- Interactive equipment 360° views (future enhancement)

#### 5.3 Content Consistency
- Standardized heading hierarchy
- Consistent CTA button text and styling
- Unified icon usage across services
- Consistent image sizing and quality

## Implementation Priority

1. **High Priority** (Week 1)
   - Create Fleet Services page
   - Standardize all service page layouts
   - Implement service page template

2. **Medium Priority** (Week 2)
   - Enhance equipment category pages
   - Create equipment listing template
   - Add comparison tools

3. **Low Priority** (Week 3)
   - SEO enhancements
   - Interactive features
   - Performance optimizations

## Success Metrics

- All navigation links functional
- Consistent page load times < 3s
- Mobile responsive on all devices
- SEO scores > 90 on all pages
- Clear conversion paths on each page
- No duplicate content issues

## Next Steps

1. Create the missing Fleet Services page
2. Implement standardized templates
3. Review and update existing pages to match templates
4. Add structured data to all pages
5. Implement internal linking strategy
6. Test all user journeys
7. Optimize for performance