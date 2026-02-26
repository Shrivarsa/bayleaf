import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Utensils } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

interface HeroSectionProps {
  id: string;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ id }, ref) => {
  const { language } = useLanguage();
  const [showInvisibleTooltip, setShowInvisibleTooltip] = useState(true);
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(true);

  useEffect(() => {
    const plateImg = new Image();
    plateImg.src = '/this4.webp';
    const statueImg = new Image();
    statueImg.src = '/thiruvalluvar wo bg final.png';
  }, []);

  useEffect(() => {
    if (showInvisibleTooltip) {
      const timer = setTimeout(() => setShowInvisibleTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showInvisibleTooltip]);

  useEffect(() => {
    if (showQuoteTooltip) {
      const timer = setTimeout(() => setShowQuoteTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showQuoteTooltip]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        height: '100vh',
        backgroundImage: 'url(this3.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fed647',
      }}
    >
      {/* Yellow Tint Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'rgba(254, 214, 71, 0.6)' }}
      />

      {/* ─── PLATE (Decoration) ────────────────────────────────────────── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width: 'clamp(240px, 80vw, 820px)',
          height: 'clamp(240px, 80vw, 820px)',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%) translateX(50%)',
        }}
      >
        <div style={{ width: '100%', height: '100%', animation: 'plateSpin 20s linear infinite' }}>
          <img
            src="/this4.webp"
            alt="Rotating plate decoration"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* ─── THIRUVALLUVAR ───────────────────────────────────────────────
          On desktop: tall, pushed into the bottom-left corner.
          On mobile:  same bottom-left anchor, width scales with viewport
          so it occupies a similar proportional position as on desktop.
          The negative left offset is kept proportional via a negative
          margin-equivalent using a small clamp so the figure still bleeds
          slightly off the left edge just like desktop.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute z-40 transition-transform duration-300 hover:scale-[1.02] thiruvalluvar-pos"
        style={{
          width: 'clamp(200px, 38vw, 480px)',
          height: 'clamp(420px, 85vh, 900px)',
          bottom: '-20px',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
        onClick={() => window.open('https://en.wikipedia.org/wiki/Thiruvalluvar', '_blank')}
      >
        <img
          src="/thiruvalluvar wo bg final.png"
          alt="Thiruvalluvar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            display: 'block',
            /* Scale up slightly to remove internal whitespace padding in the image */
            transform: 'scale(1.25)',
            transformOrigin: 'bottom left',
          }}
          draggable={false}
        />
        {showInvisibleTooltip && (
          <span className="absolute left-1/2 -translate-x-1/2 top-1/4 bg-black/90 text-yellow-300 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl border border-yellow-300/20">
            Learn about Thiruvalluvar!
          </span>
        )}
      </div>

      {/* ─── MAIN CONTENT BLOCK ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-50 flex items-center pointer-events-none">
        <div
          className="pointer-events-auto"
          style={{
            marginLeft: 'clamp(12px, 6vw, 96px)',
            maxWidth: 'clamp(220px, 48vw, 580px)',
          }}
        >
          <div className="flex items-center mb-2 sm:mb-4 text-gray-900">
            <Utensils
              className="mr-1.5 sm:mr-2 flex-shrink-0"
              style={{ width: 'clamp(8px, 1vw, 14px)', height: 'clamp(8px, 1vw, 14px)' }}
            />
            <span
              className="uppercase tracking-widest font-medium"
              style={{ fontSize: 'clamp(0.45rem, 0.9vw, 0.75rem)' }}
            >
              {translations.hero.tagline[language]}
            </span>
          </div>

          <h1
            className="font-display font-bold leading-tight mb-3 sm:mb-5 text-gray-900 break-words"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)' }}
          >
            Bay Leaf Restaurant
          </h1>

          <p
            className="font-medium mb-4 sm:mb-8 leading-snug text-gray-800"
            style={{ fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)' }}
          >
            {translations.hero.tagline[language]}
          </p>

          <div className="flex flex-row gap-2 sm:gap-3">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="bg-spice-500 text-white rounded-md font-medium hover:bg-spice-600 active:bg-spice-700 transition-all text-center cursor-pointer select-none"
              style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.875rem)',
                padding: 'clamp(6px, 0.9vw, 12px) clamp(10px, 1.4vw, 20px)',
              }}
            >
              {translations.hero.exploreMenu[language]}
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="bg-white text-spice-500 rounded-md font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all text-center cursor-pointer select-none"
              style={{
                fontSize: 'clamp(0.6rem, 1vw, 0.875rem)',
                padding: 'clamp(6px, 0.9vw, 12px) clamp(10px, 1.4vw, 20px)',
              }}
            >
              {translations.hero.bookTable[language]}
            </Link>
          </div>
        </div>
      </div>

      {/* ─── QUOTE & SCROLL DOWN ────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full z-[60] pointer-events-none pb-[clamp(8px, 2vh, 36px)]">
        {/* Quote */}
        <div className="text-center px-[clamp(8px, 3vw, 32px)]">
          <a
            href="https://en.wikipedia.org/wiki/Kural"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block pointer-events-auto "
          >
            <p
              className="text-brown-700 font-bold italic group-hover:text-brown-800 group-hover:scale-105 active:scale-95 transition-transform duration-200 leading-snug mb-0.5"
              style={{ fontSize: 'clamp(0.6rem, 1.3vw, 1.05rem)' }}
            >
              {translations.hero.quote[language]}
            </p>
            {showQuoteTooltip && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-yellow-300 text-xs px-2 py-1 rounded whitespace-nowrap">
                Want to learn about this quote? Click here!
              </span>
            )}
          </a>
          <p className="text-black font-medium" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.8rem)' }}>
            - Thiruvalluvar
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <Link
        to="menu"
        smooth={true}
        offset={-80}
        duration={500}
        className="absolute z-[100] group cursor-pointer"
        style={{
          bottom: 'clamp(8px, 2vh, 36px)',
          right: 'clamp(16px, 5vw, 80px)',
          pointerEvents: 'auto'
        }}
      >
        <div className="flex flex-col items-center gap-1 p-2 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 transition-all shadow-lg">
          <ArrowDown
            className="text-brown-700 animate-bounce"
            style={{ width: 'clamp(12px, 1.8vw, 32px)', height: 'clamp(12px, 1.8vw, 32px)' }}
          />
        </div>
      </Link>

      <style>{`
        @keyframes plateSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        html, body { overflow-x: hidden; }
        /* Thiruvalluvar left offset: -100px on mobile, -220px on desktop */
        .thiruvalluvar-pos { left: -100px; }
        @media (min-width: 1024px) {
          .thiruvalluvar-pos { left: -220px; }
        }
      `}</style>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;