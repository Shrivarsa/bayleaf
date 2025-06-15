import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Utensils } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
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
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
        height: '100vh',
        backgroundImage: 'url(this3.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fed647'
      }}
    >
      {/* Yellow Tint Overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(254, 214, 71, 0.6)' }} />

      {/* Rotating Plate - Moved to center right for desktop */}
      <div ref={bgRef} className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="
              absolute 
              top-[20%] right-[-50%]
              xs:top-[20%] xs:right-[-50%]
              sm:top-[60%] sm:right-0 sm:translate-x-1/4 sm:-translate-y-1/2
              md:top-[25%] md:right-0 md:-translate-y-1/2 md:translate-x-1/4
              lg:top-[20%] lg:right-4 lg:-translate-y-1/2
              xl:top-[10%] xl:right-[-20%] xl:-translate-y-1/2
              w-[120vw] h-[120vw] 
              xs:w-[110vw] xs:h-[110vw]
              sm:w-[80vw] sm:h-[80vw]
              md:w-[70vw] md:h-[70vw]
              lg:w-[60vw] lg:h-[60vw]
              xl:w-[50vw] xl:h-[50vw]
              flex justify-center items-center hero-rotate-fixed
            "
          >
            <img
              src="/this4.png"
              alt="Rotating plate decoration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Thiruvalluvar Image - Enhanced mobile positioning */}
      <div className="absolute bottom-0 left-0 w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[28rem] lg:h-[28rem] z-[100] -ml-12 xs:-ml-16 sm:-ml-24 md:-ml-32 lg:-ml-40 -mb-8 xs:-mb-12 sm:-mb-20 md:-mb-24 lg:-mb-28">
        <img
          src="/thiruvalluvar wo bg final.png"
          alt="Thiruvalluvar"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      <style>{`
        .hero-rotate-fixed {
          animation: heroRotateFixed 20s linear infinite;
          transform-origin: center;
        }
        @keyframes heroRotateFixed {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Ensure body and html don't show horizontal scroll */
        body, html {
          overflow-x: hidden;
        }

        /* Enhanced mobile support */
        @media (max-width: 479px) and (max-height: 667px) {
          .hero-mobile-adjust {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 374px) {
          .hero-ultra-small {
            font-size: 0.7rem;
          }
        }
      `}</style>

      {/* Invisible Clickable Button - Enhanced mobile touch target */}
      <button
        onClick={() => window.open('https://en.wikipedia.org/wiki/Thiruvalluvar', '_blank')}
        className="absolute bottom-0 left-0 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80 z-[200] bg-transparent hover:bg-white/10 active:bg-white/20 -ml-8 xs:-ml-12 sm:-ml-20 md:-ml-28 lg:-ml-36 -mb-4 xs:-mb-8 sm:-mb-16 md:-mb-20 lg:-mb-24 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Learn about Thiruvalluvar"
      >
        {showInvisibleTooltip && (
          <span className="absolute left-1/2 -translate-x-1/2 -top-6 xs:-top-8 sm:-top-12 bg-black/90 text-yellow-300 text-xs px-2 py-1 xs:px-3 xs:py-2 rounded-lg pointer-events-none z-[201] whitespace-nowrap">
            Learn about Thiruvalluvar!
          </span>
        )}
      </button>

      {/* Scroll Down Button - Enhanced mobile positioning */}
      <Link
        to="menu"
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
        className="absolute bottom-1 xs:bottom-2 sm:bottom-8 lg:bottom-2 right-2 xs:right-4 sm:right-12 md:right-16 lg:right-20 z-[200] group cursor-pointer"
      >
        <div className="flex flex-col items-center gap-1 xs:gap-2 p-1.5 xs:p-2 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/30 hover:border-white/50 active:bg-white/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg">
          <ArrowDown size={16} className="xs:w-5 xs:h-5 sm:w-8 sm:h-8 text-brown-700 animate-bounce group-hover:text-brown-800" />
          <span className="text-brown-700 font-medium text-xs group-hover:text-brown-800 whitespace-nowrap hidden xs:block sm:text-sm">
            Scroll Down
          </span>
        </div>
      </Link>

      {/* Foreground Content - Enhanced mobile layout */}
      <div className="absolute inset-0 z-20">
        <div className="
          text-gray-900 max-w-[calc(100vw-1rem)]
          absolute top-[15%] left-2 text-left
          xs:top-[25%] xs:left-3
          sm:top-[30%] sm:left-24 sm:-translate-y-0 sm:text-left
        ">
          <div className="text-gray-900 flex items-center mb-2 xs:mb-3 sm:mb-6">
            <Utensils className="mr-1.5 xs:mr-2" size={14} />
            <span className="uppercase tracking-wide text-xs hero-mobile-adjust truncate">
              {translations.hero.tagline[language]}
            </span>
          </div>

          <h1 className="font-display text-xl xs:text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 xs:mb-4 sm:mb-8 leading-tight hero-ultra-small">
            {translations.hero.title[language]}
          </h1>

          <p className="text-xs xs:text-sm sm:text-lg md:text-xl mb-4 xs:mb-6 sm:mb-10 leading-snug max-w-xs xs:max-w-sm sm:max-w-lg hero-mobile-adjust">
            {translations.hero.description[language]}
          </p>

          <div className="flex flex-row gap-2 xs:gap-3">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-spice-500 text-white rounded-md font-medium hover:bg-spice-600 active:bg-spice-700 transition-all text-xs py-1.5 px-2 xs:py-2 xs:px-3 sm:text-sm w-[7rem] xs:w-[8rem] text-center"
            >
              {translations.hero.exploreMenu[language]}
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={0}
              className="bg-white text-spice-500 py-1.5 px-2 xs:py-2 xs:px-3 rounded-md font-medium hover:bg-opacity-90 active:bg-opacity-80 transition-all text-xs sm:text-sm w-[7rem] xs:w-[8rem] text-center"
            >
              {translations.hero.bookTable[language]}
            </Link>
          </div>
        </div>

        {/* Quote Section - Enhanced mobile responsiveness */}
        <div className="absolute bottom-1 xs:bottom-2 sm:bottom-8 lg:bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[calc(100vw-0.5rem)] z-30 px-1 xs:px-2 sm:px-4 text-center">
          <a
            href="https://en.wikipedia.org/wiki/Kural"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block"
            title="Learn more about this quote"
          >
            <p className="text-brown-700 font-bold italic text-xs sm:text-base md:text-xl mb-0.5 xs:mb-1 group-hover:text-brown-800 group-hover:scale-105 active:scale-95 transition-transform duration-200 leading-tight hero-mobile-adjust">
              {
                (() => {
                  const words = translations.hero.quote[language].split(' ');
                  const breakPoint = typeof window !== 'undefined' && window.innerWidth < 375 ? 2 : 
                                   typeof window !== 'undefined' && window.innerWidth < 400 ? 3 : 4;
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
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0.5 xs:mb-1 bg-black/90 text-yellow-300 text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded z-30 whitespace-nowrap">
                Want to learn about this quote? Click here!
              </span>
            )}
          </a>
          <p className="text-black/100 text-xs hero-mobile-adjust">- Thiruvalluvar</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;