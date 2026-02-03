"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-munden-burgundy dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-munden-burgundy/95 dark:supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-8">
          <Image
            src="/images/logo.png"
            alt="Munden Truck & Equipment"
            width={50}
            height={50}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="hidden sm:inline text-xl font-bold text-white dark:text-foreground">
            Munden Truck & Equipment
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Shop Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">
                  Shop Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/services/service-department"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Service Department
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Full-service repairs, CVIP inspections, and
                            preventive maintenance
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/services/parts-department"
                      title="Parts Department"
                    >
                      OEM and aftermarket parts with expert lookup service
                    </ListItem>
                    <ListItem
                      href="/services/mobile-service"
                      title="Mobile Service"
                    >
                      24/7 emergency roadside repairs and on-site service
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Equipment Sales */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">
                  Equipment Sales
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/equipment/ecolog"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            EcoLog Forestry
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Authorized EcoLog dealer for Western Canada -
                            premium forestry equipment
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/equipment/harvesters" title="Harvesters">
                      EcoLog 500 Series harvesters
                    </ListItem>
                    <ListItem href="/equipment/forwarders" title="Forwarders">
                      EcoLog 500F Series forwarders
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white dark:text-foreground data-[state=open]:bg-white/10 dark:data-[state=open]:bg-accent hover:bg-white/10 dark:hover:bg-accent">
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/about/contact" title="Contact">
                      Get in touch with our team
                    </ListItem>
                    <ListItem href="/about/resources" title="Resources">
                      Industry news and helpful articles
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-8">
            <a
              href="tel:250-828-2268"
              className="flex items-center space-x-2 text-sm text-white dark:text-foreground hover:text-white/80"
            >
              <Phone className="h-4 w-4" />
              <span>250-828-2268</span>
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/MundenGroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Image
                  src="/images/social/fb.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.instagram.com/p/CiSq0mELIXD/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Image
                  src="/images/social/ig.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://ca.linkedin.com/company/mundengroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Image
                  src="/images/social/linked.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.google.com/search?q=Munden+Truck+%26+Equipment+Ltd."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Google Reviews"
              >
                <Image
                  src="/images/social/google.png"
                  alt="Google Reviews"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-white dark:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 border-t bg-munden-burgundy dark:bg-background">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Shop Services
              </p>
              <Link
                href="/services/service-department"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Service Department
              </Link>
              <Link
                href="/services/parts-department"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Parts Department
              </Link>
              <Link
                href="/services/mobile-service"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Mobile Service
              </Link>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/20">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Equipment Sales
              </p>
              <Link
                href="/equipment/ecolog"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                EcoLog Forestry
              </Link>
              <Link
                href="/equipment/harvesters"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Harvesters
              </Link>
              <Link
                href="/equipment/forwarders"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Forwarders
              </Link>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/20">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                About Us
              </p>
              <Link
                href="/about/contact"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about/resources"
                className="block text-sm font-medium text-white dark:text-foreground py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
            </div>

            <div className="pt-4 border-t border-white/20">
              <Button asChild variant="secondary" className="w-full">
                <a href="tel:250-828-2268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call: 250-828-2268
                </a>
              </Button>
              <div className="flex items-center justify-center space-x-8 mt-4">
                <a
                  href="https://www.facebook.com/MundenGroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <Image
                    src="/images/social/fb.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://www.instagram.com/p/CiSq0mELIXD/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/social/ig.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://ca.linkedin.com/company/mundengroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/images/social/linked.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://www.google.com/search?q=Munden+Truck+%26+Equipment+Ltd.+Reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Google Reviews"
                >
                  <Image
                    src="/images/social/google.png"
                    alt="Google Reviews"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
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
  );
};

export default Header;
