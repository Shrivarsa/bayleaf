import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, ChevronDown, Eye, EyeOff, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

// Default "view less" images — shown side by side
const defaultMenuImages = [
  { id: 'main', src: '/menu_ver1/main.jpg', alt: 'Main Menu' },
  { id: 'soup', src: '/menu_ver1/soup.jpg', alt: 'Soup Menu' },
];

// Extended menu pages — shown when "View More" is clicked (pages 0003–0026)
const extendedMenuImages = Array.from({ length: 24 }, (_, i) => {
  const pageNum = String(i + 3).padStart(4, '0');
  return {
    id: `page-${pageNum}`,
    src: `/menu_ver1/Blue Grey White Minimalist Modern Trendy Illustrative Cocktail Drink Menu_page-${pageNum}.jpg`,
    alt: `Menu Page ${i + 3}`,
  };
});

interface MenuSectionProps {
  id: string;
}

const MenuSection = React.forwardRef<HTMLElement, MenuSectionProps>((props, ref) => {
  const { id } = props;
  const { language } = useLanguage();
  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAllMenus, setShowAllMenus] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ id: string; src: string; alt: string } | null>(null);
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(true);

  const h1Text = language === 'de' ? 'Mittagessen, Abendessen, Buffet & Bar' : 'Lunch, Dinner, Buffet & Bar';
  const h2Text = language === 'de' ? 'Vegetarische & Nicht-vegetarische Speisen' : 'Vegetarian & Non-Vegetarian Foods';
  const h3Text = language === 'de' ? 'Frisch essen, traditionell genießen' : 'Eat Fresh, Eat Traditional & Enjoy';

  useEffect(() => {
    if (showQuoteTooltip) {
      const timer = setTimeout(() => setShowQuoteTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showQuoteTooltip]);

  const toggleMenuView = () => {
    setShowAllMenus(!showAllMenus);
    if (!showAllMenus) {
      setTimeout(() => {
        menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const openImageModal = (image: { id: string; src: string; alt: string }) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollRotation(window.scrollY * 0.1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quoteText = translations.menu.quote?.tamil?.[language] ?? '';

  return (
    <section id={id} ref={ref} className="relative py-24 overflow-hidden" style={{ backgroundColor: '#ffd647' }}>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="text-center mb-16">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
          >
            {h1Text}
          </motion.h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{h2Text}</h2>
          <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-8">{h3Text}</h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {translations.menu.description[language]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center mb-6"
          >
            <Menu className="mr-2 text-spice-600" size={16} />
            <span className="uppercase tracking-widest text-sm text-spice-600 font-medium">
              {translations.menu.subtitle[language]}
            </span>
          </motion.div>

          {/* Scroll-based Rotating Table Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <div
              className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]"
              style={{ transform: `rotate(${scrollRotation}deg)`, transition: 'transform 0.1s ease-out' }}
            >
              <img
                src="/Menutable1.png"
                alt="Traditional South Indian table setting"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Tamil Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-center"
          >
            <a
              href="https://www.thirukural.ai/kural/942"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
              title="Learn more about this quote"
            >
              <p className="text-brown-700 font-bold italic text-xs sm:text-base md:text-xl mb-2 group-hover:text-brown-800 group-hover:scale-105 active:scale-95 transition-transform duration-200 leading-tight max-w-xs sm:max-w-none mx-auto">
                {quoteText}
              </p>
              {showQuoteTooltip && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 text-yellow-300 text-xs px-2 py-1 rounded-lg z-30 whitespace-nowrap pointer-events-none">
                  Want to learn about this quote? Click here!
                </span>
              )}
            </a>
            <p className="text-black/80 text-xs">
              - {translations.menu.quote?.source?.[language] ?? 'Thiruvalluvar'}
            </p>
          </motion.div>
        </div>

        {/* ── Menu Images ── */}
        <motion.div
          ref={menuRef}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Default view: main.jpg + soup.jpg side by side */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {defaultMenuImages.map((menuImage, index) => (
              <motion.div
                key={menuImage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 relative"
                onClick={() => openImageModal(menuImage)}
              >
                <div className="relative">
                  <img
                    src={menuImage.src}
                    alt={menuImage.alt}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    style={{ maxHeight: '600px' }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" size={48} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More button */}
          {!showAllMenus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={toggleMenuView}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-spice-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-spice-600 hover:bg-spice-50"
              >
                <Eye className="mr-2" size={18} />
                View Full Menu ({extendedMenuImages.length} pages)
              </button>
            </motion.div>
          )}

          {/* Extended pages — FIXED: always grid-cols-2 to match default layout */}
          <AnimatePresence>
            {showAllMenus && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mt-8"
              >
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  {extendedMenuImages.map((menuImage, index) => (
                    <motion.div
                      key={menuImage.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 relative"
                      onClick={() => openImageModal(menuImage)}
                    >
                      <div className="relative">
                        <img
                          src={menuImage.src}
                          alt={menuImage.alt}
                          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          style={{ maxHeight: '700px' }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" size={48} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-8 mb-2">
                  <button
                    onClick={toggleMenuView}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-spice-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-spice-600 hover:bg-spice-50"
                  >
                    <EyeOff className="mr-2" size={18} />
                    Show Less
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="contact-us"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="btn-primary"
          >
            {translations.hero.bookTable[language]}
          </Link>
        </motion.div>
      </div>

      {/* Image Modal — FIXED: rendered outside section container, z-[9999] to sit above navbar */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button — FIXED: inside the card so it's never clipped by navbar */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">{selectedImage.alt}</span>
                  <button
                    onClick={closeImageModal}
                    className="text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-1.5"
                  >
                    <X size={20} />
                  </button>
                </div>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '75vh' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

MenuSection.displayName = 'MenuSection';
export default MenuSection;