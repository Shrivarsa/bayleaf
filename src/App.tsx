import React, { useEffect, useState, useRef, RefObject } from 'react';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import MenuSection from './components/sections/MenuSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ScrollHideContactHeader from './components/sections/ScrollHideContactHeader';
// Import the updated SEO Head Component
import SEOHead from './components/SEOHead'; 
// NOTE: You must also wrap your application in <HelmetProvider> in main.tsx or index.jsx

// --- SECTION DATA AND SEO MAPPING (from SEO Work of Bay leaf restaurant.txt) ---
const sectionSEOData = {
    'home': { 
        en: {
            title: 'Bay Leaf | Best South Indian Restaurant in Singen',
            metaDescription: 'Enjoy authentic South Indian food in Singen. Bay Leaf offers dosa, biryani, buffet & more. The best Indian restaurant near me'
        },
        de: {
            title: 'Bay Leaf | Bestes südindisches Restaurant in Singen',
            metaDescription: 'Genießen Sie authentisches südindisches Essen in Singen. Bay Leaf bietet Dosa, Biryani, Buffet & mehr. Das beste indische Restaurant in meiner Nähe'
        }
    },
    'about-us': {
        en: {
            title: 'About Us | South Indian Restaurant Open in Singen',
            metaDescription: 'Craving Indian food near you. Bay Leaf in Singen offers lunch, dinner & buffet. Authentic South Indian dishes, open daily!'
        },
        de: {
            title: 'Essen in meiner Nähe | Südindisches Restaurant geöffnet in Singen',
            metaDescription: 'Lust auf indisches Essen in Ihrer Nähe? Bay Leaf in Singen bietet Mittagessen, Abendessen & Buffet. Authentische südindische Gerichte, täglich geöffnet!'
        }
    },
    'menu': {
        en: {
            title: 'Menu – Takeout, Lunch & Dinner | Bay Leaf Singen',
            metaDescription: 'Explore our South Indian menu at Bay Leaf Singen. Dine in, lunch, dinner, or takeaway, the best in Singen, Germany'
        },
        de: {
            title: 'Speisekarte – Takeaway, Mittag- & Abendessen | Bay Leaf Singen',
            metaDescription: 'Entdecken Sie unsere südindische Speisekarte bei Bay Leaf Singen. Zum Essen vor Ort, Mittagessen, Abendessen oder zum Mitnehmen, das Beste in Singen, Deutschland'
        }
    },
    'gallery': {
        en: {
            title: 'Gallery | Bay Leaf Singen',
            metaDescription: 'Enjoy authentic South Indian food at Bay Leaf in Singen. Best food, bar, and restaurant experience in Germany. Dine-in and takeaway available daily.'
        },
        de: {
            title: 'Bestes südindisches Restaurant & Bar in Deutschland | Singen',
            metaDescription: 'Genießen Sie authentisches südindisches Essen bei Bay Leaf in Singen. Bestes Essen, Bar und Restaurant-Erlebnis in Deutschland. Täglich vor Ort oder zum Mitnehmen verfügbar.'
        }
    },
    'contact-us': {
        en: {
            title: 'Contact Us | Bay Leaf Singen',
            metaDescription: 'Bay Leaf is a South Indian restaurant in Singen open now for dine-in and takeaway. Visit us for lunch or dinner. It is near you '
        },
        de: {
            title: 'Offenes Restaurant & Takeaway in meiner Nähe | Bay Leaf Singen',
            metaDescription: 'Bay Leaf ist ein südindisches Restaurant in Singen, jetzt geöffnet für Essen vor Ort und zum Mitnehmen. Besuchen Sie uns zum Mittag- oder Abendessen. Es ist in Ihrer Nähe.'
        }
    }
};

// Custom Hook to manage section refs
const useSectionRefs = () => {
    // We use RefObject<HTMLElement> because we pass the ref to an HTMLElement (the section)
    return {
        home: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        menu: useRef<HTMLElement>(null),
        gallery: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };
};

// Component to hold the main application logic and scroll tracking
const MainAppContent: React.FC = () => {
    const { language } = useLanguage();
    const sectionRefs = useSectionRefs();
    const [currentSectionId, setCurrentSectionId] = useState('home');
    
    // Modified path change listener with delayed scroll
    useEffect(() => {
        const handlePathChange = () => {
            const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
            
            const validSections: { [key: string]: keyof typeof sectionRefs } = {
                '': 'home',
                'home': 'home',
                'about-us': 'about',
                'menu': 'menu',
                'gallery': 'gallery',
                'contact-us': 'contact'
            };

            const sectionKey = validSections[path] || 'home';
            
            // Set current section ID immediately
            setCurrentSectionId(path || 'home');
            
            // Delay the scroll to ensure the section is mounted
            setTimeout(() => {
                const targetSection = sectionRefs[sectionKey]?.current;
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100); // Small delay to ensure DOM is ready
        };

        // Handle initial path immediately after mount
        handlePathChange();

        // Add event listeners
        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, [sectionRefs]);

    // 2. Modified scroll handler
    useEffect(() => {
        const handleScroll = () => {
            let activeSectionId = 'home';
            const offset = 150;

            try {
                const sectionElements = [
                    { id: 'home', ref: sectionRefs.home },
                    { id: 'about-us', ref: sectionRefs.about },
                    { id: 'menu', ref: sectionRefs.menu },
                    { id: 'gallery', ref: sectionRefs.gallery },
                    { id: 'contact-us', ref: sectionRefs.contact },
                ];

                for (const section of sectionElements) {
                    const element = section.ref.current;
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= offset && rect.bottom > offset) {
                            activeSectionId = section.id;
                            break;
                        }
                    }
                }

                // Handle last section
                const lastSection = sectionElements[sectionElements.length - 1];
                if (lastSection.ref.current && 
                    window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                    activeSectionId = lastSection.id;
                }

                // Update URL and state only if section changed
                if (activeSectionId !== currentSectionId) {
                    setCurrentSectionId(activeSectionId);
                    const newPath = activeSectionId === 'home' ? '/' : `/${activeSectionId}`;
                    
                    // Use pushState with the new path
                    history.pushState(null, '', newPath);
                }
            } catch (error) {
                console.error("Scroll handling error:", error);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentSectionId, sectionRefs]);

    // Modify canonicalUrl construction
    const canonicalPath = currentSectionId === 'home' ? '' : `/${currentSectionId}`;
    const canonicalUrl = `https://www.bay-leaf.eu${canonicalPath}`;

    // Add this before the return statement in MainAppContent
    const seoContent = sectionSEOData[currentSectionId as keyof typeof sectionSEOData];


    return (
        <>
            {/* Update SEOHead component with correct content */}
            <SEOHead
                en={seoContent.en}
                de={seoContent.de}
                canonicalUrl={canonicalUrl}
            />

            <ScrollHideContactHeader />
            <Navbar currentActiveSection={currentSectionId} />

            <main>
                {/* Pass ref and id to all section components */}
                <HeroSection ref={sectionRefs.home} id="home" />
                <AboutSection ref={sectionRefs.about} id="about-us" />
                <MenuSection ref={sectionRefs.menu} id="menu" />
                <GallerySection ref={sectionRefs.gallery} id="gallery" />
                <ContactSection ref={sectionRefs.contact} id="contact-us" />
            </main>

            <Footer />
        </>
    );
};


function App() {
    return (
        <LoadingProvider>
            <LanguageProvider>
                {/* Render the main content which contains the context consumers and scroll logic */}
                <MainAppContent />
            </LanguageProvider>
        </LoadingProvider>
    );
}

export default App;
