"use client";

import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);

    // Scroll to hide navbar during hero load
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      scrollToSection('hero-section')
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Listen for scroll events with snap behavior
    const handleScroll = () => {
      // Don't interfere if we're currently performing a smooth scroll
      if (isScrolling.current) return;

      // Cancel previous RAF if it exists
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Use requestAnimationFrame for optimal performance
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const heroHeight = window.innerHeight;
        const portfolioSection = document.getElementById('portfolio-section');

        if (!portfolioSection) return;

        const portfolioTop = portfolioSection.offsetTop;

        // Determine current section based on scroll position
        const inHeroSection = currentScrollY < heroHeight / 2;
        const inPortfolioSection = currentScrollY >= heroHeight / 2;

        // Apply snap scrolling logic
        if (inHeroSection && isScrollingDown && currentScrollY > 50) {
          // User is in hero section and scrolling down -> snap to portfolio
          scrollToSection('portfolio-section');
        } else if (inPortfolioSection && !isScrollingDown && currentScrollY < portfolioTop + 100) {
          // User is in portfolio section and scrolling up -> snap to hero
          scrollToSection('hero-section');
        }

        lastScrollY.current = currentScrollY;
        rafId.current = null;
      });
    };

    // Add scroll listener after initial animation completes
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up any pending RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionToScroll = document.getElementById(sectionId);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reducedMotion ? 'instant' : 'smooth';
    if (sectionToScroll) {
      isScrolling.current = true
      sectionToScroll.scrollIntoView({
        behavior,
        block: 'start'
      });

      // Listen for scroll end event
      const handleScrollEnd = () => {
        isScrolling.current = false;
        window.removeEventListener('scrollend', handleScrollEnd);
      };
      window.addEventListener('scrollend', handleScrollEnd);

      // Fallback: Timeout in case scrollend isn't supported
      setTimeout(() => {
        isScrolling.current = false;
        window.removeEventListener('scrollend', handleScrollEnd);
      }, 1000);

    }
  };

  return (
    <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative h-screen overflow-hidden bg-black cursor-pointer"
        onClick={() => scrollToSection('portfolio-section')}
      >
        {/* Background Image with Fade-in Effect */}
        <div
          className={`
            absolute inset-0 h-full w-full
            bg-center bg-cover bg-no-repeat
            bg-[url(/outsides/2-thewestinportodegalinhas.webp)]
            transition-all duration-1500 delay-200 ease-out
            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
          `}
        />

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
          <div className={`
            text-center transition-all duration-1000 delay-75 ease-out
            ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
              BIECO GARCIA
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wider mb-8">
              PHOTOGRAPHY
            </p>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => scrollToSection('portfolio-section')}
            className={`
              absolute bottom-8 left-1/2 transform -translate-x-1/2
              flex flex-col items-center text-white/80 hover:text-white
              transition-all duration-1000 delay-700 ease-out cursor-pointer
              ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              hover:scale-110 group
            `}
            aria-label="Scroll to portfolio"
          >
            <span className="text-sm font-light tracking-widest mb-2 group-hover:text-white transition-colors">
              EXPLORE
            </span>

            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio-section" className="scroll-mt-0">
        <Portfolio />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
