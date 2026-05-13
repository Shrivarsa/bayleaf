import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';

interface NavbarProps {
  currentActiveSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactHeaderVisible, setContactHeaderVisible] = useState(true);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { id: 'home', label: translations.navbar.home[language] },
    { id: 'about-us', label: translations.navbar.about[language] },
    { id: 'menu', label: translations.navbar.menu[language] },
    { id: 'gallery', label: translations.navbar.gallery[language] },
    { id: 'contact-us', label: translations.navbar.contact[language] },
  ];

  // Closure dates
  const CLOSURE_START = new Date('2026-05-19');
  const CLOSURE_END = new Date('2026-06-22');
  const today = new Date();
  const showClosureBanner = today < CLOSURE_END;

  const closureMessage =
    language === 'de'
      ? '  Bitte beachten: Unser Restaurant ist vom 19. Mai bis 22. Juni 2026 geschlossen. Wir freuen uns, Sie danach wieder begrüßen zu dürfen!       Please note: Our restaurant will be closed from May 19 to June 22, 2026. We look forward to welcoming you back after that!'
      : '  Bitte beachten: Unser Restaurant ist vom 19. Mai bis 22. Juni 2026 geschlossen. Wir freuen uns, Sie danach wieder begrüßen zu dürfen!       Please note: Our restaurant will be closed from May 19 to June 22, 2026. We look forward to welcoming you back after that!';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 80);
      const isLargeScreen = window.innerWidth >= 1024;
      if (isLargeScreen) {
        setContactHeaderVisible(offset <= 100);
      } else {
        setContactHeaderVisible(false);
      }
    };

    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen) {
        setContactHeaderVisible(false);
      } else if (window.scrollY <= 100) {
        setContactHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Navbar height estimate (py-4 = 1rem top+bottom + logo ~96px ≈ 80px scrolled, 96px not scrolled)
  // We use a CSS custom property trick: banner sits at `top: var(--nav-height)`
  // For simplicity we use fixed pixel values matching the Tailwind classes used.
  const navHeight = scrolled ? 56 : 96;

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-2' : 'py-4 bg-transparent'
        } top-0`}
      >
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={contactHeaderVisible ? -120 : -80}
              duration={100}
              className="flex items-center cursor-pointer -ml-4 md:-ml-6"
            >
              <img
                src="/faviconv2.png"
                alt="Singen Restaurant Logo"
                className="h-20 w-48 md:h-24 md:w-56 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={contactHeaderVisible ? -120 : -80}
                  duration={100}
                  className={`font-medium cursor-pointer hover:text-spice-500 transition-colors ${
                    item.id === currentActiveSection
                      ? 'text-spice-500 font-semibold'
                      : scrolled
                      ? 'text-gray-800'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Language Buttons */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                      language === 'en'
                        ? 'bg-spice-500 text-white'
                        : scrolled
                        ? 'text-gray-800'
                        : 'text-white hover:bg-gray-100 hover:text-spice-500'
                    }`}
                  >
                    <span className="font-medium">EN</span>
                  </button>
                  <button
                    onClick={() => toggleLanguage('de')}
                    className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                      language === 'de'
                        ? 'bg-spice-500 text-white'
                        : scrolled
                        ? 'text-gray-800'
                        : 'text-white hover:bg-gray-100 hover:text-spice-500'
                    }`}
                  >
                    <span className="font-medium">DE</span>
                  </button>
                </div>
              </div>

              <Link
                to="contact-us"
                spy={true}
                smooth={true}
                offset={contactHeaderVisible ? -120 : -80}
                duration={100}
                className="btn-primary text-sm cursor-pointer"
              >
                {translations.navbar.bookTable[language]}
              </Link>
            </div>

            {/* Mobile: Hamburger + Language Toggle */}
            <div className="md:hidden flex flex-col items-end space-y-2">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
              >
                {isOpen ? (
                  <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
                ) : (
                  <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
                )}
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    language === 'en'
                      ? 'bg-spice-500 text-white'
                      : scrolled
                      ? 'text-gray-800'
                      : 'text-white hover:bg-gray-100 hover:text-spice-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => toggleLanguage('de')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    language === 'de'
                      ? 'bg-spice-500 text-white'
                      : scrolled
                      ? 'text-gray-800'
                      : 'text-white hover:bg-gray-100 hover:text-spice-500'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 transition-all duration-300 ease-in-out">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={0}
                    className={`font-medium cursor-pointer transition-colors py-2 ${
                      item.id === currentActiveSection
                        ? 'text-spice-500 font-semibold'
                        : 'text-gray-800 hover:text-spice-500'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="contact-us"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={100}
                  className="btn-primary text-center cursor-pointer"
                  onClick={closeMenu}
                >
                  {translations.navbar.bookTable[language]}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Scrolling closure banner — sits just below the navbar ── */}
      {showClosureBanner && (
        <div
          style={{
            position: 'fixed',
            top: navHeight,
            left: 0,
            width: '100%',
            height: '44px',
            backgroundColor: 'transparent',
            zIndex: 49,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <style>{`
            @keyframes ticker-scroll {
              0%   { transform: translateX(100vw); }
              100% { transform: translateX(-100%); }
            }
            .ticker-track {
  display: inline-block;
  white-space: nowrap;
  animation: ticker-scroll 36s linear infinite;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
            .ticker-track::after {
              content: attr(data-text);
              padding-left: 8rem;
            }
          `}</style>
          <span
            className="ticker-track"
            data-text={closureMessage}
            style={{ color: '#dc2626' }}
          >
            {closureMessage}
          </span>
        </div>
      )}
    </>
  );
};

export default Navbar;