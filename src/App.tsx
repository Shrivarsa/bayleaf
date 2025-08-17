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
import VideoPopup from './components/VideoPopup'; // Add this import

function App() {
  // Add this state for the video popup
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  
  // Add this useEffect to show popup when user enters website
  useEffect(() => {
    // Option 1: Show popup every time user visits
    setShowVideoPopup(true);
    
    // Option 2: Show popup only for first-time visitors (uncomment below and comment above)
    // const hasVisited = localStorage.getItem('hasVisitedBefore');
    // if (!hasVisited) {
    //   setShowVideoPopup(true);
    //   localStorage.setItem('hasVisitedBefore', 'true');
    // }
    
    // Option 3: Show popup after a delay (uncomment below and comment above)
    // const timer = setTimeout(() => {
    //   setShowVideoPopup(true);
    // }, 2000); // 2 second delay
    // return () => clearTimeout(timer);
  }, []);

  // Add this handler to close the popup
  const handleCloseVideoPopup = () => {
    setShowVideoPopup(false);
  };
  
  return (
    <LoadingProvider>
      <LanguageProvider>
        {/* Main Content */}
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
        
        {/* Add the VideoPopup component */}
        <VideoPopup
          videoUrl="/onam_popup.mp4" // Replace with your actual video path
          isOpen={showVideoPopup}
          onClose={handleCloseVideoPopup}
          autoPlay={true}
        />
      </LanguageProvider>
    </LoadingProvider>
  );
}

export default App;
