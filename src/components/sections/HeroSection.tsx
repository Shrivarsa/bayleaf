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
    // Eagerly preload the plate image before React renders
    const img = new Image();
    img.src = '/this4.webp';
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


      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width: 'clamp(240px, 58vw, 820px)',
          height: 'clamp(240px, 58vw, 820px)',
          /* Right offset: negative so ~50% of the plate is off-screen right */
          right: 'clamp(-250px, -26vw, -290px)',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {/* Spinner wrapper — isolated transform so nothing competes */}
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

      {/* ─── THIRUVALLUVAR ───────────────────────────────────────────────────────
          Matches screenshot:
          - Bottom-left corner, base of statue slightly below viewport
          - Left edge slightly clipped (~10%)
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute z-50 pointer-events-none"
        style={{
          width: 'clamp(90px, 15vw, 240px)',
          height: 'clamp(-200px, 30vw, 180px)',
          bottom: 'clamp(-200px, 1vw, 30px)',
          left: 'clamp(-38px, -4vw, -56px)',
        }}
      >
        <img
          src="/thiruvalluvar wo bg final.png"
          alt="Thiruvalluvar"
          className="w-full h-full object-contain object-bottom"
          draggable={false}
        />
      </div>

      {/* Invisible click target covering the statue */}
      <button
        onClick={() => window.open('https://en.wikipedia.org/wiki/Thiruvalluvar', '_blank')}
        className="absolute z-[200] bg-transparent hover:bg-white/10 active:bg-white/20 cursor-pointer transition-all duration-200"
        style={{
          width: 'clamp(70px, 12vw, 190px)',
          height: 'clamp(140px, 24vw, 380px)',
          bottom: 'clamp(-40px, -5vw, -70px)',
          left: 'clamp(-10px, -1vw, -20px)',
        }}
        aria-label="Learn about Thiruvalluvar"
      >
        {showInvisibleTooltip && (
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/90 text-yellow-300 text-xs px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap">
            Learn about Thiruvalluvar!
          </span>
        )}
      </button>

      {/* ─── SCROLL DOWN ─────────────────────────────────────────────────────── */}
      <Link
        to="menu"
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        className="absolute z-[200] group cursor-pointer"
        style={{
          bottom: 'clamp(8px, 2vh, 36px)',
          right: 'clamp(16px, 5vw, 80px)',
        }}
      >
        <div className="flex flex-col items-center gap-1 p-2 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 hover:border-white/50 active:bg-white/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg">
          <ArrowDown
            className="text-brown-700 animate-bounce group-hover:text-brown-800"
            style={{ width: 'clamp(12px, 1.8vw, 32px)', height: 'clamp(12px, 1.8vw, 32px)' }}
          />
          <span className="hidden sm:block text-brown-700 font-medium text-xs group-hover:text-brown-800 whitespace-nowrap">
            Scroll Down
          </span>
        </div>
      </Link>

      {/* ─── FOREGROUND TEXT ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[100]">

        {/* Main text block — left side, ~30% from top */}
        <div
          className="absolute text-gray-900"
          style={{
            left: 'clamp(12px, 6vw, 96px)',
            top: '30%',
            transform: 'translateY(-10%)',
            maxWidth: 'clamp(220px, 48vw, 580px)',
          }}
        >
          {/* Tagline row */}
          <div className="flex items-center mb-2 sm:mb-4">
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

          {/* Restaurant name */}
          <h1
            className="font-display font-bold leading-tight mb-3 sm:mb-5 break-words"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)' }}
          >
            Bay Leaf Restaurant
          </h1>

          {/* Subtitle */}
          <p
            className="font-medium mb-4 sm:mb-8 leading-snug"
            style={{ fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)' }}
          >
            {translations.hero.tagline[language]}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-3 pointer-events-auto">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-spice-500 text-white rounded-md font-medium hover:bg-spice-600 active:bg-spice-700 transition-all text-center cursor-pointer select-none"
              style={{
                pointerEvents: 'auto',
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
              duration={0}
              className="bg-white text-spice-500 rounded-md font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all text-center cursor-pointer select-none"
              style={{
                pointerEvents: 'auto',
                fontSize: 'clamp(0.6rem, 1vw, 0.875rem)',
                padding: 'clamp(6px, 0.9vw, 12px) clamp(10px, 1.4vw, 20px)',
              }}
            >
              {translations.hero.bookTable[language]}
            </Link>
          </div>
        </div>

        {/* Quote — bottom center */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center z-[150]"
          style={{
            bottom: 'clamp(8px, 2vh, 36px)',
            width: '100%',
            paddingInline: 'clamp(8px, 3vw, 32px)',
          }}
        >
          <a
            href="https://en.wikipedia.org/wiki/Kural"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block"
            title="Learn more about this quote"
          >
            <p
              className="text-brown-700 font-bold italic group-hover:text-brown-800 group-hover:scale-105 active:scale-95 transition-transform duration-200 leading-snug mb-0.5"
              style={{ fontSize: 'clamp(0.6rem, 1.3vw, 1.05rem)' }}
            >
              {translations.hero.quote[language]}
            </p>
            {showQuoteTooltip && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-yellow-300 text-xs px-2 py-1 rounded z-30 whitespace-nowrap">
                Want to learn about this quote? Click here!
              </span>
            )}
          </a>
          <p
            className="text-black font-medium"
            style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.8rem)' }}
          >
            - Thiruvalluvar
          </p>
        </div>

      </div>

      <style>{`
        @keyframes plateSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        html, body { overflow-x: hidden; }
      `}</style>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;