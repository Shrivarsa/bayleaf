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
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(true);
  const [showStatueTooltip, setShowStatueTooltip] = useState(true);

  useEffect(() => {
    const plateImg = new Image();
    plateImg.src = '/this4.webp';
    const heroStatueImg = new Image();
    heroStatueImg.src = '/thiruvalluvar12.png';
  }, []);

  useEffect(() => {
    if (showQuoteTooltip) {
      const timer = setTimeout(() => setShowQuoteTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showQuoteTooltip]);

  useEffect(() => {
    if (showStatueTooltip) {
      const timer = setTimeout(() => setShowStatueTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showStatueTooltip]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative w-full"
      style={{
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(this3.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fed647',
        isolation: 'isolate',
        userSelect: 'none',
        WebkitUserSelect: 'none',
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

      {/* ─── MAIN CONTENT BLOCK ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div
          className="pointer-events-auto hero-content"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            paddingLeft: 'clamp(16px, 3vw, 40px)',
            maxWidth: 'clamp(300px, 55vw, 680px)',
            textAlign: 'left',
          }}
        >
          {/* Tagline row */}
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
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 4.5rem)',
              textAlign: 'left',
            }}
          >
            Bay Leaf Restaurant
          </h1>

          <p
            className="font-medium mb-4 sm:mb-8 leading-snug text-gray-800"
            style={{
              fontSize: 'clamp(0.65rem, 1.4vw, 1.2rem)',
              textAlign: 'left',
            }}
          >
            {translations.hero.tagline[language]}
          </p>

          <div
            className="flex flex-row gap-2 sm:gap-3 hero-buttons"
            style={{ justifyContent: 'flex-start' }}
          >
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

      {/* ─── THIRUVALLUVAR — bottom-left ───────────────────────────────── */}
      <div
        className="absolute z-30"
        style={{
          bottom: 0,
          left: 0,
          transform: 'translateX(clamp(-12px, -1.5vw, -4px))',
        }}
      >
        <a
          href="https://en.wikipedia.org/wiki/Thiruvalluvar"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{ cursor: 'pointer' }}
        >
          {showStatueTooltip && (
            <span
              className="absolute bg-black/90 text-yellow-300 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl border border-yellow-300/20 pointer-events-none"
              style={{
                left: '100%',
                bottom: '55%',
                marginLeft: 'clamp(6px, 1vw, 10px)',
                transform: 'translateY(50%)',
              }}
            >
              Click to know more
            </span>
          )}
          <img
            src="/thiruvalluvar12.png"
            alt="Thiruvalluvar"
            style={{
              width: 'clamp(48px, 7vw, 88px)',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
            draggable={false}
          />
        </a>
      </div>

      {/* ─── QUOTE & AUTHOR ────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none pb-[clamp(8px,2vh,36px)]">
        <div className="text-center px-[clamp(8px,3vw,32px)]">
          <a
            href="https://en.wikipedia.org/wiki/Kural"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block pointer-events-auto"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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
          <p
            className="text-black font-medium"
            style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.8rem)', userSelect: 'none' }}
          >
            - Thiruvalluvar
          </p>
        </div>
      </div>

      {/* ─── SCROLL DOWN INDICATOR ─────────────────────────────────────── */}
      <Link
        to="menu"
        smooth={true}
        offset={-80}
        duration={500}
        className="absolute z-20 group cursor-pointer"
        style={{
          bottom: 'clamp(8px, 2vh, 36px)',
          right: 'clamp(16px, 2.5vw, 48px)',
          pointerEvents: 'auto',
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

        .hero-content,
        .hero-content h1,
        .hero-content p,
        .hero-content span,
        .hero-content div {
          text-align: left !important;
        }

        @media (max-width: 640px) {
          .hero-content {
            padding-left: 16px !important;
            max-width: 80vw !important;
          }
          .hero-content h1,
          .hero-content p,
          .hero-content span,
          .hero-content div {
            text-align: left !important;
            margin-left: 0 !important;
          }
          .hero-buttons {
            margin-left: 0 !important;
          }
        }

        #${id}, #${id} * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
      `}</style>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;