# Munden Truck & Equipment Ltd. Website

A modern, SEO-optimized website for Munden Truck & Equipment Ltd., featuring truck repair services, CVIP inspections, log hauling, and EcoLog forestry equipment sales in the BC Interior.

## 🚀 Features

- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap generation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui
- **Performance Focused**: Optimized images, lazy loading, and efficient code splitting
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **SEO**: [next-seo](https://github.com/garmeeh/next-seo)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jonahduckworth/munden-trucking-website.git
cd munden-trucking-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🚀 Deployment

This site is optimized for deployment on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jonahduckworth/munden-trucking-website)

## 📁 Project Structure

```
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout with header/footer
│   ├── page.tsx       # Homepage
│   └── sitemap.ts     # Dynamic sitemap generation
├── components/        # React components
│   ├── layout/        # Header, Footer, Navigation
│   ├── sections/      # Page sections (Hero, Services, etc.)
│   ├── seo/          # SEO components
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions
├── public/           # Static assets
└── specs/            # Project specifications
```

## 🔑 Key Features

### Services
- Truck & Equipment Repair
- CVIP Inspections
- Emergency Repairs (24/7)
- Preventive Maintenance
- Log Hauling Services
- Equipment Sales (EcoLog Dealer)

### SEO Features
- Dynamic meta tags
- Structured data (LocalBusiness, Service, Product schemas)
- XML sitemap
- Robots.txt
- Open Graph & Twitter Cards

## 🎨 Customization

### Colors
Edit the CSS variables in `app/globals.css` to match your brand colors.

### Content
- Company information is stored in `components/seo/StructuredData.tsx`
- Service details can be modified in `components/sections/ServicesGrid.tsx`
- Equipment data is in `components/sections/EquipmentShowcase.tsx`

## 📝 Environment Variables

Create a `.env.local` file for any API keys or environment-specific variables:

```env
# Example (not currently required)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Munden Truck & Equipment Ltd.

## 📞 Contact

For questions about this website, please contact the development team.

---

Built with ❤️ for Munden Truck & Equipment Ltd.