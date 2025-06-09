import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactHeaderVisible, setContactHeaderVisible] = useState(true);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = useMemo(() => [
    { id: 'home', label: translations.navbar.home[language] },
    { id: 'about', label: translations.navbar.about[language] },
    { id: 'menu', label: translations.navbar.menu[language] },
    { id: 'gallery', label: translations.navbar.gallery[language] },
    { id: 'contact', label: translations.navbar.contact[language] },
  ], [language]);

  useEffect(() => {
    const updateHeaderState = () => {
      const offset = window.scrollY;
      const isLargeScreen = window.innerWidth >= 1024;
      setScrolled(offset > 80);
      setContactHeaderVisible(isLargeScreen && offset <= 100);
    };

    window.addEventListener('scroll', updateHeaderState);
    window.addEventListener('resize', updateHeaderState);
    updateHeaderState();

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'nav-scrolled py-2' : 'py-4 bg-transparent'
      } ${contactHeaderVisible ? 'lg:top-[40px]' : 'lg:top-0'} top-0`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={contactHeaderVisible ? -120 : -80}
            duration={100}
            className="flex items-center cursor-pointer"
            role="button"
            aria-label="Scroll to home"
          >
            <div className="mr-2">
              <img
                src="/logo.png"
                alt="Bayleaf Logo"
                className="w-32 h-20 md:w-40 md:h-24 object-contain rounded-xl"
              />
            </div>
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
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Desktop Language Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => toggleLanguage('en')}
                className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-spice-500 text-white'
                    : scrolled
                    ? 'text-gray-800'
                    : 'text-white'
                } hover:text-spice-500 ${language !== 'en' && 'hover:bg-gray-100'}`}
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
                    : 'text-white'
                } hover:text-spice-500 ${language !== 'de' && 'hover:bg-gray-100'}`}
              >
                <span className="font-medium">DE</span>
              </button>
            </div>

            <a href="#booking" className="btn-primary text-sm">
              {translations.navbar.bookTable[language]}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex flex-col items-end">
            <button
              className="focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
              ) : (
                <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
              )}
            </button>

            {/* Language Toggle Below Hamburger Icon */}
            {!isOpen && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-spice-500 text-white'
                      : scrolled
                      ? 'text-gray-800'
                      : 'text-white'
                  } hover:text-spice-500 ${language !== 'en' && 'hover:bg-gray-100'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => toggleLanguage('de')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'de'
                      ? 'bg-spice-500 text-white'
                      : scrolled
                      ? 'text-gray-800'
                      : 'text-white'
                  } hover:text-spice-500 ${language !== 'de' && 'hover:bg-gray-100'}`}
                >
                  DE
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
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
                  className="font-medium text-gray-800 hover:text-spice-500 transition-colors py-2"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="#booking"
                className="btn-primary text-center"
                onClick={closeMenu}
              >
                {translations.navbar.bookTable[language]}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
