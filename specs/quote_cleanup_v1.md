# Quote Cleanup Specification v1

## Overview
Remove the /booking system entirely and consolidate all functionality into the /quote page. Update all references to booking throughout the codebase to redirect to quote instead.

## Current State Analysis

### Booking Infrastructure to Remove:
- `/app/booking/page.tsx` - Main booking page wrapper
- `/components/contact/ServiceBooking.tsx` - Appointment scheduling component  
- `/app/api/booking/route.ts` - Booking API endpoint
- Sitemap entry for /booking

### Current Quote Page Structure:
- Two-tab interface: "Instant Calculator" and "Custom Quote Request"
- QuoteCalculator component for pricing estimates
- Custom quote form for detailed service requests
- Submits to `/api/quote`

### Booking References to Update:
**Navigation:**
- `components/layout/Header.tsx` - "Book Service" nav links

**Service Pages:**
- `app/services/repair-shop/page.tsx` - "Book Service" buttons
- `app/services/repair-shop/preventive-maintenance/page.tsx` - Booking links
- `app/services/repair-shop/commercial-vehicle-inspections/page.tsx` - Booking references
- `app/equipment/new/forwarders/[model]/page.tsx` - Booking references

**Other Files:**
- `app/sitemap.ts` - Remove /booking entry
- `components/contact/QuoteCalculator.tsx` - "Book This Service" button
- Any other files with /booking links

## Implementation Plan

### Phase 1: Enhance Quote Page
1. **Add Emergency Call Card**: Add prominent emergency service card to quote page with call-to-action for immediate assistance
2. **Preserve Appointment Functionality**: Consider if appointment scheduling from ServiceBooking should be integrated into quote page as third tab

### Phase 2: Update All Booking References
1. **Navigation Links**: Update Header.tsx to change "Book Service" to "Get Quote" pointing to /quote
2. **Service Page Buttons**: Update all "Book Service", "Schedule Maintenance", "Book This Service" buttons to point to /quote
3. **Equipment Page Links**: Update equipment detail pages to use /quote for service requests
4. **Text Updates**: Change button text from "Book" to "Get Quote" or "Request Service" as appropriate

### Phase 3: Remove Booking Infrastructure  
1. **Delete Files**: Remove booking page, component, and API route
2. **Update Sitemap**: Remove /booking entry
3. **Add Redirect**: Add Next.js redirect from /booking to /quote for any bookmarked links

### Phase 4: API Consolidation
1. **Merge APIs**: Consider if booking API functionality should be merged into quote API
2. **Form Handling**: Ensure quote page can handle both quote requests and service appointment requests

## Emergency Call Card Design

Add to quote page (above the tabs):

```tsx
<Card className="mb-6 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
  <CardContent className="p-4">
    <div className="flex items-center gap-3">
      <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 dark:text-red-100">Emergency Service Needed?</h3>
        <p className="text-sm text-red-700 dark:text-red-200">
          For immediate roadside assistance or urgent repairs, call us now
        </p>
      </div>
      <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
        <a href="tel:1-800-XXX-XXXX">
          <Phone className="mr-2 h-4 w-4" />
          Call Now
        </a>
      </Button>
    </div>
  </CardContent>
</Card>
```

## Button Text Updates

**From → To:**
- "Book Service" → "Get Quote"
- "Book This Service" → "Request Service Quote" 
- "Schedule Maintenance" → "Get Maintenance Quote"
- "Book Appointment" → "Request Quote"
- "Book Now" → "Get Quote"

## Files to Modify

### High Priority (Core Navigation):
1. `components/layout/Header.tsx` - Navigation links
2. `app/quote/page.tsx` - Add emergency card
3. `app/sitemap.ts` - Remove booking entry

### Medium Priority (Service Pages):
4. `app/services/repair-shop/page.tsx`
5. `app/services/repair-shop/preventive-maintenance/page.tsx` 
6. `app/services/repair-shop/commercial-vehicle-inspections/page.tsx`
7. `components/contact/QuoteCalculator.tsx`

### Low Priority (Equipment Pages):
8. `app/equipment/new/forwarders/[model]/page.tsx`
9. Any other equipment pages with booking links

### Cleanup:
10. Delete `app/booking/page.tsx`
11. Delete `components/contact/ServiceBooking.tsx`
12. Delete `app/api/booking/route.ts`
13. Add redirect rule in `next.config.ts`

## Success Criteria

- ✅ No broken links to /booking
- ✅ All booking CTAs redirect to /quote  
- ✅ Emergency call card prominently displayed on quote page
- ✅ Quote page handles all service request types
- ✅ SEO: Quote page optimized for both quote and booking keywords
- ✅ User experience: Clear path from service pages to quote requests

## Notes

- Consider keeping appointment scheduling functionality if users need specific time slots
- Update meta descriptions and titles to reflect quote focus
- May need to update Google Analytics tracking if booking events were tracked
- Consider adding calendar/appointment booking as optional third tab on quote page for complex services