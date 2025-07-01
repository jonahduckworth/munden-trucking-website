"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-munden-burgundy dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-munden-burgundy/95 dark:supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white dark:text-foreground">Munden Truck & Equipment</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/services/repair-shop"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Repair Shop
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Professional truck and equipment repair services with certified technicians
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/services/repair-shop/commercial-vehicle-inspections" title="CVIP Inspections">
                      Commercial vehicle inspection program certified
                    </ListItem>
                    <ListItem href="/services/repair-shop/preventive-maintenance" title="Preventive Maintenance">
                      Keep your fleet running smoothly
                    </ListItem>
                    <ListItem href="/services/repair-shop/emergency-repairs" title="Emergency Repairs">
                      24/7 emergency breakdown service
                    </ListItem>
                    <ListItem href="/services/repair-shop/fleet-services" title="Fleet Services">
                      Comprehensive fleet management programs
                    </ListItem>
                    <ListItem href="/services/log-hauling" title="Log Hauling">
                      Professional log transportation services
                    </ListItem>
                    <ListItem href="/services/equipment-sales" title="Equipment Sales">
                      New and used forestry equipment
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">Equipment</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/equipment/new/harvesters" title="Harvesters">
                      EcoLog 500 Series harvesters
                    </ListItem>
                    <ListItem href="/equipment/new/forwarders" title="Forwarders">
                      EcoLog 500F Series forwarders
                    </ListItem>
                    <ListItem href="/equipment/used" title="Used Equipment">
                      Quality pre-owned equipment
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/about"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            About Munden
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Learn about our 30-year journey and commitment to excellence
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/about/company" title="Our Company">
                      Discover our history and values
                    </ListItem>
                    <ListItem href="/about/team" title="Our Team">
                      Meet our experienced professionals
                    </ListItem>
                    <ListItem href="/about/partners" title="Industry Partners">
                      Our trusted business partnerships
                    </ListItem>
                    <ListItem href="/news" title="News & Updates">
                      Latest news and industry insights
                    </ListItem>
                    <ListItem href="/careers" title="Careers">
                      Join our growing team
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>


              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent text-white dark:text-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 dark:hover:bg-accent dark:hover:text-accent-foreground focus:bg-white/10 dark:focus:bg-accent dark:focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/10 dark:data-[active]:bg-accent/50 data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent/50">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <a href="tel:1-800-XXX-XXXX" className="flex items-center space-x-2 text-sm text-white dark:text-foreground">
              <Phone className="h-4 w-4" />
              <span>1-800-XXX-XXXX</span>
            </a>
            <Button asChild variant="secondary">
              <Link href="/quote">Get Quote</Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white dark:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 border-t bg-munden-burgundy dark:bg-background">
            <Link href="/services" className="text-sm font-medium text-white dark:text-foreground">Services</Link>
            <Link href="/equipment" className="text-sm font-medium text-white dark:text-foreground">Equipment</Link>
            <Link href="/about" className="text-sm font-medium text-white dark:text-foreground">About</Link>
            <Link href="/news" className="text-sm font-medium text-white dark:text-foreground">News</Link>
            <Link href="/careers" className="text-sm font-medium text-white dark:text-foreground">Careers</Link>
            <Link href="/quote" className="text-sm font-medium text-white dark:text-foreground">Get Quote</Link>
            <Link href="/contact" className="text-sm font-medium text-white dark:text-foreground">Contact</Link>
            <a href="tel:1-800-XXX-XXXX" className="text-sm font-medium text-white dark:text-foreground">Call: 1-800-XXX-XXXX</a>
          </nav>
        </div>
      )}
    </header>
  )
}

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const ListItem = ({ className, title, children, href, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default Header