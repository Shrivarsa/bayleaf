import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Utensils } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [showInvisibleTooltip, setShowInvisibleTooltip] = useState(true);
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(true);

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
      id="home"
      className="relative w-full"
      style={{
        minHeight: '100vh',
        height: '100vh',
        backgroundImage: 'url(FinalKolam-Photoroom.png)',
        backgroundSize: 'contain', // Changed from 'cover' to 'contain' to fit entire image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fed647' // Changed to your specified color
      }}
    >
      {/* Yellow Tint Overlay */}
<div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(254, 214, 71, 0.6)' }} />

      {/* Rotating Plate Image */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-10"
        style={{ minHeight: '100vh' }}
      >
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[100vw] h-screen overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-1/2 w-[120vw] h-[120vw] flex justify-center items-center hero-rotate">
            <img
              src="/IMG_3555-Photoroom.png"
              alt="Rotating plate decoration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Thiruvalluvar Image */}
        <div className="absolute bottom-0 left-0 w-48 h-48 xs:w-52 xs:h-52 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[28rem] lg:h-[28rem] z-[100] -ml-16 xs:-ml-20 sm:-ml-24 md:-ml-32 lg:-ml-40 -mb-12 xs:-mb-16 sm:-mb-20 md:-mb-24 lg:-mb-28">
          <img
            src="/thiruvalluvar wo bg final.png"
            alt="Thiruvalluvar"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        <style>{`
          .hero-rotate {
            animation: heroRotate 20s linear infinite;
            transform-origin: center;
          }
          @keyframes heroRotate {
            from {
              transform: translateY(-50%) rotate(0deg);
            }
            to {
              transform: translateY(-50%) rotate(360deg);
            }
          }
        `}</style>
      </div>

      {/* Invisible Clickable Button for Statue */}
      <button
        onClick={() => {
          window.open('https://en.wikipedia.org/wiki/Thiruvalluvar', '_blank');
        }}
        className="absolute bottom-0 left-0 w-40 h-40 xs:w-44 xs:h-44 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80 z-[200] bg-transparent hover:bg-white/10 -ml-12 xs:-ml-16 sm:-ml-20 md:-ml-28 lg:-ml-36 -mb-8 xs:-mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 cursor-pointer transition-all duration-200 hover:scale-105"
        aria-label="Learn about Thiruvalluvar"
      >
        {showInvisibleTooltip && (
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 xs:-top-10 sm:-top-12 bg-black/90 text-yellow-300 text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-2 rounded-lg pointer-events-none z-[201]">
            Learn about Thiruvalluvar!
          </span>
        )}
      </button>

      {/* Prominent Scroll Down Button - Positioned to the right of Thiruvalluvar statue */}
      <Link
        to="menu"
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        className="absolute bottom-16 xs:bottom-20 sm:bottom-24 md:bottom-32 lg:bottom-40 left-48 xs:left-52 sm:left-56 md:left-72 lg:left-96 z-[200] group cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2 p-4 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg">
          <ArrowDown size={32} className="text-brown-700 animate-bounce group-hover:text-brown-800" />
          <span className="text-brown-700 font-medium text-sm group-hover:text-brown-800 whitespace-nowrap">
            Scroll Down for More
          </span>
        </div>
      </Link>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-1/2 -translate-y-1/2 sm:top-1/4 sm:translate-y-0 left-4 xs:left-6 sm:left-16 md:left-24 lg:left-32 text-gray-900 max-w-[calc(100vw-2rem)]">
          {/* Tagline */}
          <div className="text-gray-900 flex items-center mb-3 xs:mb-4 sm:mb-6">
            <Utensils className="mr-2" size={16} />
            <span className="uppercase tracking-wide text-xs xs:text-sm truncate">
              {translations.hero.tagline[language]}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight xs:leading-normal">
            {translations.hero.title[language]}
          </h1>

          {/* Description */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 xs:mb-8 sm:mb-10 leading-snug xs:leading-relaxed max-w-sm sm:max-w-lg">
            {translations.hero.description[language]}
          </p>

          {/* Side-by-Side Buttons (Responsive) */}
          <div className="flex flex-row gap-3">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-spice-500 text-white rounded-md font-medium hover:bg-spice-600 transition-all text-xs xs:text-sm py-2 px-3 w-[8rem] text-center"
            >
              {translations.hero.exploreMenu[language]}
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-white text-spice-500 py-2 px-3 rounded-md font-medium hover:bg-opacity-90 transition-all text-xs xs:text-sm w-[8rem] text-center"
            >
              {translations.hero.bookTable[language]}
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="absolute bottom-2 xs:bottom-4 sm:bottom-8 lg:bottom-2 left-1/2 -translate-x-1/2 w-full z-30 px-2 xs:px-4 text-center">
          <a
            href="https://en.wikipedia.org/wiki/Kural"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block"
            title="Learn more about this quote"
          >
            <p className="text-brown-700 font-bold italic text-xs xs:text-sm sm:text-base md:text-xl mb-1 group-hover:text-brown-800 group-hover:scale-105 transition-transform duration-200 leading-tight xs:leading-snug">
              {
                (() => {
                  const words = translations.hero.quote[language].split(' ');
                  const breakPoint = typeof window !== 'undefined' && window.innerWidth < 400 ? 3 : 4;
                  if (words.length <= breakPoint) return translations.hero.quote[language];
                  return (
                    <>
                      {words.slice(0, breakPoint).join(' ')}<br />
                      {words.slice(breakPoint).join(' ')}
                    </>
                  );
                })()
              }
            </p>
            {showQuoteTooltip && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-yellow-300 text-xs px-2 py-1 rounded z-30">
                Want to learn about this quote? Click here!
              </span>
            )}
          </a>
          <p className="text-black/100 text-xs xs:text-sm">- Thiruvalluvar</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;