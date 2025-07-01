# Equipment Page Standardization Specification v1

## Overview
Standardize the harvester and forwarder equipment detail pages to use the same superior layout and components, eliminating duplication and ensuring consistency across all equipment pages.

## Current State Analysis

### Forwarder Page Strengths (Better Implementation)
1. **Modern Layout**: Uses proper grid layout with image gallery placeholder
2. **Better Structure**: Clear separation of hero, specs, and related equipment sections
3. **Comprehensive Data Model**: Includes price, brochure links, and detailed specifications
4. **Professional Components**: Uses SpecificationTable component for clean presentation
5. **Better CTAs**: Multiple action buttons including "Request Demo Quote"
6. **Related Equipment Section**: Shows related products at bottom
7. **Consistent Styling**: Uses proper container classes and responsive design
8. **Feature Cards**: Additional cards for Fuel Efficiency, Safety First, Environmental Care

### Harvester Page Weaknesses
1. **Outdated Image Component**: Uses Next.js Image instead of standard img tag
2. **Less Structured Data**: Missing price field in data model
3. **Basic Specifications Display**: Uses simple Table instead of SpecificationTable
4. **Limited CTAs**: Missing demo quote button
5. **No Related Equipment**: No cross-selling section
6. **Inconsistent Container**: Uses "container" without proper responsive padding
7. **Different CTA Section**: Uses colored card instead of separate section

## Standardization Plan

### 1. Data Model Updates
Update harvester data structure to match forwarder:
```typescript
const harvesters = {
  '590g': {
    model: 'EcoLog 590G',          // NEW: Standardized naming
    type: '6-Wheel Harvester',      // NEW: Equipment type
    tagline: 'Ultimate productivity meets advanced technology',
    description: '...',
    price: 485000,                  // NEW: Add pricing
    image: '/images/equipment/590g-harvester.jpg',
    brochure: '/brochures/ecolog-590g.pdf',  // NEW: Add brochure
    features: [...],
    specifications: {
      // Reorganized to match forwarder structure
    }
  }
}
```

### 2. Component Structure Standardization

#### Hero Section
- Use forwarder's grid layout with image gallery
- Standardize button arrangement (Quote, Call Sales, Request Demo)
- Use consistent spacing and responsive classes
- Add thumbnail image placeholders

#### Specifications Display
- Replace basic Table with SpecificationTable component
- Use forwarder's data transformation approach
- Maintain consistent styling

#### Features Tab
- Add feature cards (Fuel Efficiency, Safety, Environmental)
- Use CheckCircle icons instead of dots
- Match forwarder's grid layout

#### Related Equipment Section
- Add related equipment links at bottom
- Use consistent button styling
- Include cross-sell opportunities

### 3. Remove Duplicated Components
- Remove custom table implementation in harvester
- Use shared SpecificationTable component
- Consolidate breadcrumb schema generation
- Standardize structured data format

### 4. Consistent Styling
- Container classes: `container mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-12`
- Background for tab section: `bg-muted/50`
- Consistent button sizes and variants

### 5. Import Updates
```typescript
// Standardized imports
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { SpecificationTable } from '@/components/equipment/SpecificationTable'
import FinanceCalculator from '@/components/equipment/FinanceCalculator'
import { StructuredData } from '@/components/seo/StructuredData'
// ... icons
```

### 6. SEO & Metadata
- Standardize metadata generation
- Use consistent structured data format
- Ensure proper breadcrumb implementation

## Implementation Checklist

### Phase 1: Data Structure
- [ ] Update harvester data model to match forwarder
- [ ] Add missing fields (price, brochure, type)
- [ ] Reorganize specifications for consistency

### Phase 2: Layout Updates
- [ ] Replace Image component with standard img
- [ ] Update hero section layout
- [ ] Add image gallery placeholder
- [ ] Standardize button arrangement

### Phase 3: Component Integration
- [ ] Import SpecificationTable component
- [ ] Replace custom table implementation
- [ ] Add feature cards in features tab
- [ ] Update data transformation logic

### Phase 4: New Sections
- [ ] Add related equipment section
- [ ] Add separator components
- [ ] Update CTA section styling

### Phase 5: Cleanup
- [ ] Remove unused imports
- [ ] Update container classes
- [ ] Ensure responsive design
- [ ] Test all interactive elements

## Expected Outcomes

1. **Consistent User Experience**: Both equipment types will have identical layouts and interactions
2. **Reduced Code Duplication**: Shared components and consistent data structures
3. **Improved Maintainability**: Single pattern to update for all equipment
4. **Better Cross-Selling**: Related equipment sections on all pages
5. **Professional Appearance**: Modern, clean design throughout

## Migration Notes

- Preserve all existing harvester data
- Ensure no broken links or missing content
- Test finance calculator with actual prices
- Verify all CTAs point to correct destinations
- Update any references in other pages

## Future Considerations

1. Create a shared equipment detail page component
2. Move equipment data to a database
3. Add real image galleries when photos available
4. Implement dynamic pricing updates
5. Add equipment comparison features