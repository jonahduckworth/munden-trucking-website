"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Wrench, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export type HeaderNavigationGroup = {
  name: string;
  pages: Array<{
    title: string;
    href: string;
  }>;
};

type HeaderProps = {
  serviceGroups: HeaderNavigationGroup[];
  partsGroups: HeaderNavigationGroup[];
};

const equipmentLinks = [
  { title: "EcoLog Forestry", href: "/equipment/ecolog" },
  { title: "Harvesters", href: "/equipment/harvesters" },
  { title: "Forwarders", href: "/equipment/forwarders" },
];

const aboutLinks = [
  { title: "Contact", href: "/about/contact" },
  { title: "Careers", href: "/about/careers" },
  { title: "Resources", href: "/about/resources" },
];

export default function Header({ serviceGroups, partsGroups }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    "service",
  );
  const partsLinks = partsGroups.flatMap((group) => group.pages);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((current) => (current === section ? null : section));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-munden-burgundy backdrop-blur supports-[backdrop-filter]:bg-munden-burgundy/95 dark:bg-background/95 dark:supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Image
            src="/images/logo.png"
            alt="Munden Truck & Equipment"
            width={50}
            height={50}
            className="h-11 w-11"
          />
          <span className="hidden text-lg font-bold text-white 2xl:inline dark:text-foreground">
            Munden Truck & Equipment
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-3 xl:flex" aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white dark:text-foreground dark:hover:bg-accent dark:data-[state=open]:bg-accent">
                  Shop Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="max-h-[calc(100vh-5rem)] w-[calc(100vw-2rem)] max-w-[940px] overflow-y-auto overscroll-contain p-5 lg:w-[920px]">
                    <div className="mb-5 flex items-start justify-between gap-6 border-b pb-5">
                      <div>
                        <p className="text-lg font-semibold">Shop services and parts</p>
                        <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                          Find the right repair, inspection, specialty service, or parts category for your truck, trailer, or equipment.
                        </p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href="tel:+12508282268">
                          <Phone className="mr-2 h-4 w-4" />
                          250-828-2268
                        </a>
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {serviceGroups.map((group) => (
                        <div key={group.name}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                            {group.name}
                          </p>
                          <ul className="space-y-1">
                            {group.pages.map((page) => (
                              <CompactMenuItem key={page.href} {...page} />
                            ))}
                          </ul>
                          {group.name === "Inspections & Maintenance" && (
                            <NavigationMenuLink
                              asChild
                              className="mt-3 flex min-h-10 w-full flex-row items-center justify-start rounded-md px-2 text-left text-sm font-semibold text-primary outline-none hover:bg-transparent hover:text-primary hover:underline focus:bg-transparent focus:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <Link href="/services/service-department">
                                View all services
                              </Link>
                            </NavigationMenuLink>
                          )}
                        </div>
                      ))}

                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          Parts Department
                        </p>
                        <ul className="space-y-1">
                          {partsLinks.map((page) => (
                            <CompactMenuItem key={page.href} {...page} />
                          ))}
                        </ul>
                        <NavigationMenuLink
                          asChild
                          className="mt-3 flex min-h-10 w-full flex-row items-center justify-start rounded-md px-2 text-left text-sm font-semibold text-primary outline-none hover:bg-transparent hover:text-primary hover:underline focus:bg-transparent focus:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Link href="/services/parts-department">
                            View all parts
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-5 rounded-lg bg-secondary p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                          <Wrench className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-semibold">Need roadside help?</p>
                          <p className="text-sm text-muted-foreground">
                            Mobile Service remains available as a separate service.
                          </p>
                        </div>
                      </div>
                      <NavigationMenuLink
                        asChild
                        className="flex h-11 shrink-0 flex-row items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-center text-sm font-semibold leading-none text-foreground outline-none hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Link href="/services/mobile-service">
                          Mobile Service
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white dark:text-foreground dark:hover:bg-accent dark:data-[state=open]:bg-accent">
                  Equipment Sales
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-[.8fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          href="/equipment/ecolog"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            EcoLog Forestry
                          </div>
                          <p className="text-sm leading-6 text-muted-foreground">
                            Explore harvesters and forwarders with parts and service support.
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

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white dark:text-foreground dark:hover:bg-accent dark:data-[state=open]:bg-accent">
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    {aboutLinks.map((link) => (
                      <ListItem key={link.href} href={link.href} title={link.title}>
                        {link.title === "Contact"
                          ? "Get in touch with our team"
                          : link.title === "Careers"
                            ? "Join the Munden team"
                            : "Practical articles and maintenance guidance"}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a
            href="tel:+12508282268"
            className="hidden min-h-11 items-center gap-2 rounded-md px-2 text-sm text-white outline-none hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white 2xl:flex dark:text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span>250-828-2268</span>
          </a>
          <div className="hidden xl:block">
            <SocialLinks size={20} />
          </div>
          <div className="hidden xl:block">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white dark:text-foreground"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/20 bg-munden-burgundy xl:hidden dark:bg-background"
        >
          <nav className="container space-y-2 py-4" aria-label="Mobile navigation">
            <MobileDisclosure
              id="service"
              title="Service Department"
              isOpen={openMobileSection === "service"}
              onToggle={() => toggleMobileSection("service")}
            >
              <MobileHubLink
                href="/services/service-department"
                onNavigate={closeMobileMenu}
              >
                View all shop services
              </MobileHubLink>
              {serviceGroups.map((group) => (
                <div key={group.name} className="mt-4">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                    {group.name}
                  </p>
                  <div className="mt-1 space-y-1">
                    {group.pages.map((page) => (
                      <MobileLink
                        key={page.href}
                        href={page.href}
                        onNavigate={closeMobileMenu}
                      >
                        {page.title}
                      </MobileLink>
                    ))}
                  </div>
                </div>
              ))}
            </MobileDisclosure>

            <MobileDisclosure
              id="parts"
              title="Parts Department"
              isOpen={openMobileSection === "parts"}
              onToggle={() => toggleMobileSection("parts")}
            >
              <MobileHubLink
                href="/services/parts-department"
                onNavigate={closeMobileMenu}
              >
                View all parts categories
              </MobileHubLink>
              <div className="mt-2 space-y-1">
                {partsLinks.map((page) => (
                  <MobileLink
                    key={page.href}
                    href={page.href}
                    onNavigate={closeMobileMenu}
                  >
                    {page.title}
                  </MobileLink>
                ))}
              </div>
            </MobileDisclosure>

            <Link
              href="/services/mobile-service"
              className="flex min-h-12 items-center justify-between rounded-md px-3 font-semibold text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white dark:text-foreground"
              onClick={closeMobileMenu}
            >
              Mobile Service
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs">24/7</span>
            </Link>

            <MobileDisclosure
              id="equipment"
              title="Equipment Sales"
              isOpen={openMobileSection === "equipment"}
              onToggle={() => toggleMobileSection("equipment")}
            >
              <div className="space-y-1">
                {equipmentLinks.map((link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    onNavigate={closeMobileMenu}
                  >
                    {link.title}
                  </MobileLink>
                ))}
              </div>
            </MobileDisclosure>

            <MobileDisclosure
              id="about"
              title="About Us"
              isOpen={openMobileSection === "about"}
              onToggle={() => toggleMobileSection("about")}
            >
              <div className="space-y-1">
                {aboutLinks.map((link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    onNavigate={closeMobileMenu}
                  >
                    {link.title}
                  </MobileLink>
                ))}
              </div>
            </MobileDisclosure>

            <div className="pt-3">
              <Button asChild variant="secondary" className="min-h-12 w-full">
                <a href="tel:+12508282268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 250-828-2268
                </a>
              </Button>
              <div className="mt-3">
                <SocialLinks size={24} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/MundenGroup/",
    image: "/images/social/fb.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/p/CiSq0mELIXD/",
    image: "/images/social/ig.svg",
  },
  {
    label: "LinkedIn",
    href: "https://ca.linkedin.com/company/mundengroup",
    image: "/images/social/linked.png",
  },
  {
    label: "Google Reviews",
    href: "https://www.google.com/search?q=Munden+Truck+%26+Equipment+Ltd.+Reviews",
    image: "/images/social/google.png",
  },
];

function SocialLinks({ size }: { size: number }) {
  return (
    <div className="flex items-center justify-center gap-1" aria-label="Social and review links">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md outline-none transition-opacity hover:bg-white/10 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white"
          aria-label={link.label}
        >
          <Image
            src={link.image}
            alt=""
            width={size}
            height={size}
            className={size === 24 ? "h-6 w-6" : "h-5 w-5"}
          />
        </a>
      ))}
    </div>
  );
}

function CompactMenuItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink
        asChild
        className="flex min-h-10 w-full flex-row items-center justify-start rounded-md px-2 py-1.5 text-left text-sm font-medium leading-5 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Link href={href}>
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MobileDisclosure({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/15 pb-2">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between rounded-md px-3 text-left font-semibold text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white dark:text-foreground"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`mobile-${id}-links`}
      >
        {title}
        <ChevronDown
          className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div id={`mobile-${id}-links`} className="pb-2 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm text-white/90 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white dark:text-foreground"
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

function MobileHubLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mx-3 flex min-h-11 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-munden-burgundy outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white dark:bg-secondary dark:text-foreground"
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
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
