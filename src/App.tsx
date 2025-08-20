import React, { useEffect, useState } from 'react';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import MenuSection from './components/sections/MenuSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import ScrollHideContactHeader from './components/sections/ScrollHideContactHeader';
import ImagePopup from './components/ImagePopup'; // Changed from VideoPopup to ImagePopup

function App() {
  // State for the image popup
  const [showImagePopup, setShowImagePopup] = useState(false);

  useEffect(() => {
    // Show popup every time user visits
    setShowImagePopup(true);

    // Optionally, use localStorage or delay as in your original code
  }, []);

  // Handler to close the popup
  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
  };

  return (
    <LoadingProvider>
      <LanguageProvider>
        <ScrollHideContactHeader />
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <MenuSection />
          <GallerySection />
          <ContactSection />
        </main>

        <Footer />

        {/* Use the ImagePopup component */}
        <ImagePopup
          imageUrl="/onam_final.jpeg" // Replace with your actual image path
          isOpen={showImagePopup}
          onClose={handleCloseImagePopup}
          alt="Onam Festival"
        />
      </LanguageProvider>
    </LoadingProvider>
  );
}

export default App;
