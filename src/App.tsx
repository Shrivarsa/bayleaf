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


function App() {
  
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
      </LanguageProvider>
    </LoadingProvider>
  );
}

export default App;
