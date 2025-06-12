import React, { useState, useEffect } from 'react';
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

  const navItems = [
    { id: 'home', label: translations.navbar.home[language] },
    { id: 'about', label: translations.navbar.about[language] },
    { id: 'menu', label: translations.navbar.menu[language] },
    { id: 'gallery', label: translations.navbar.gallery[language] },
    { id: 'contact', label: translations.navbar.contact[language] },
  ];

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
          >
            <img
              src="/logo.png"
              alt="Singen Restaurant Logo"
              className="h-20 w-32 md:h-24 md:w-40 object-contain"
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
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Buttons */}
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

            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={contactHeaderVisible ? -120 : -80}
              duration={100}
              className="btn-primary text-sm cursor-pointer"
            >
              {translations.navbar.bookTable[language]}
            </Link>
          </div>

          {/* Mobile Menu Icon + Language Toggle */}
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

            {/* Language Toggle (Below Hamburger in Mobile) */}
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

        {/* Mobile Dropdown Navigation */}
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

              <Link
                to="contact"
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
  );
};

export default Navbar;
