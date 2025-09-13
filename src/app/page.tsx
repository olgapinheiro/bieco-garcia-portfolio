"use client";

import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);

    // Scroll to hide navbar during hero load
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Listen for scroll events with snap behavior
    const handleScroll = () => {
      // Don't interfere if we're currently performing a smooth scroll
      if (isScrolling) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
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
        scrollToPortfolio();
      } else if (inPortfolioSection && !isScrollingDown && currentScrollY < portfolioTop + 100) {
        // User is in portfolio section and scrolling up -> snap to hero
        scrollToHero();
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll listener after initial animation completes
    const scrollTimer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 1200);

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, lastScrollY]);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      setIsScrolling(true);
      portfolioSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      setIsScrolling(true);
      heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  return (
    <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative h-screen overflow-hidden bg-black cursor-pointer"
        onClick={scrollToPortfolio}
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
          {/* Photographer name and tagline - appears first */}
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
            onClick={scrollToPortfolio}
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
