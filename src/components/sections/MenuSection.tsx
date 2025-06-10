import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, ChevronDown, Eye, EyeOff, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

// Menu images data
const menuImages = [
  {
    id: 1,
    src: '/Menu/1 Final menu A4 -1.jpg',
    alt: 'Menu Page 1'
  },
  {
    id: 2,
    src: '/Menu/2 Final menu A4 -2.jpg', 
    alt: 'Menu Page 2'
  },
  {
    id: 3,
    src: '/Menu/3 Final menu A4 -3.jpg',
    alt: 'Menu Page 3'
  },
  {
    id: 4,
    src: '/Menu/4 Final menu A4 -4.jpg',
    alt: 'Menu Page 4'
  },
  {
    id: 5,
    src: '/Menu/5 Drinks.jpg',
    alt: 'Drinks Menu'
  }
];

const MenuSection: React.FC = () => {
  const { language } = useLanguage();
  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAllMenus, setShowAllMenus] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof menuImages[0] | null>(null);

  // On mobile, show only first image initially
  const displayedMenus = showAllMenus ? menuImages : [menuImages[0]];

  const toggleMenuView = () => {
    setShowAllMenus(!showAllMenus);
    // Smooth scroll to show new content
    if (!showAllMenus) {
      setTimeout(() => {
        menuRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  const openImageModal = (image: typeof menuImages[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Scroll-based rotation
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.1; // Adjust multiplier for rotation speed
      setScrollRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="menu" className="relative py-24 overflow-hidden" style={{ backgroundColor: '#ffd647' }}>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Menu className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">
              {translations.menu.subtitle[language]}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {translations.menu.title[language]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {translations.menu.description[language]}
          </motion.p>

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
              style={{ 
                transform: `rotate(${scrollRotation}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <img 
                src="/Menutable1.png" 
                alt="Traditional South Indian table setting"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          ref={menuRef}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid gap-8">
            {displayedMenus.map((menuImage, index) => (
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
                    style={{ maxHeight: '800px' }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" 
                      size={48} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More/Less Button - Only show on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 lg:hidden"
          >
            <button
              onClick={toggleMenuView}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-spice-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-spice-600 hover:bg-spice-50"
            >
              {showAllMenus ? (
                <>
                  <EyeOff className="mr-2" size={18} />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="mr-2" size={18} />
                  View More ({menuImages.length - 1} more pages)
                </>
              )}
            </button>
          </motion.div>

          {/* Desktop version - show all menus */}
          <div className="hidden lg:block">
            <div className="grid gap-8">
              {menuImages.slice(1).map((menuImage, index) => (
                <motion.div
                  key={menuImage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 relative"
                  onClick={() => openImageModal(menuImage)}
                >
                  <div className="relative">
                    <img
                      src={menuImage.src}
                      alt={menuImage.alt}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ maxHeight: '800px' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn 
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" 
                        size={48} 
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="btn-primary"
          >
            {translations.hero.bookTable[language]}
          </Link>
        </motion.div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeImageModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImageModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <X size={24} />
                </button>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto object-contain max-h-[85vh]"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;