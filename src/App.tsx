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
import SEOHead from './components/SEOHead';

const sectionSEOData = {
    'home': { 
        en: {
            title: 'Enjoy authentic South Indian food in Singen | Bay Leaf', // UPDATED TITLE
            metaDescription: 'Enjoy authentic South Indian food in Singen. Bay Leaf offers dosa, biryani, buffet & more. The best Indian restaurant near me' // UPDATED DESCRIPTION
        },
        de: {
            title: 'Authentisches südindisches Essen in Singen | Bay Leaf', // UPDATED TITLE ALIGNMENT
            metaDescription: 'Genießen Sie authentisches südindisches Essen in Singen. Bay Leaf bietet Dosa, Biryani, Buffet & mehr. Das beste indische Restaurant in meiner Nähe' // UPDATED DESCRIPTION ALIGNMENT
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
    const isNavigatingRef = useRef(false);

    // Modified path change listener - only for browser back/forward and initial load
    useEffect(() => {
        const handlePathChange = () => {
            const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
            
            const sectionMap: Record<string, { ref: keyof typeof sectionRefs; id: string }> = {
                '': { ref: 'home', id: 'home' },
                'home': { ref: 'home', id: 'home' },
                'about-us': { ref: 'about', id: 'about-us' },
                'menu': { ref: 'menu', id: 'menu' },
                'gallery': { ref: 'gallery', id: 'gallery' },
                'contact-us': { ref: 'contact', id: 'contact-us' }
            };

            const section = sectionMap[path] || sectionMap[''];
            
            // Set flag to prevent scroll handler interference
            isNavigatingRef.current = true;
            setCurrentSectionId(section.id);
            
            requestAnimationFrame(() => {
                const targetSection = sectionRefs[section.ref]?.current;
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'instant'
                    });
                }
                // Reset flag after scroll completes
                setTimeout(() => {
                    isNavigatingRef.current = false;
                }, 100);
            });
        };

        // Handle initial path
        handlePathChange();

        // Only listen to popstate (back/forward buttons)
        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, [sectionRefs]);

    // Scroll handler - detects which section is in view
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            // Don't interfere when navigating
            if (isNavigatingRef.current) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
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

                    // Only update URL if section actually changed
                    if (activeSectionId !== currentSectionId) {
                        setCurrentSectionId(activeSectionId);
                        const newPath = activeSectionId === 'home' ? '/' : `/${activeSectionId}`;
                        window.history.replaceState(null, '', newPath);
                    }
                } catch (error) {
                    console.error("Scroll handling error:", error);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [currentSectionId, sectionRefs]);

    // Modify canonicalUrl construction
    const canonicalPath = currentSectionId === 'home' ? '' : `/${currentSectionId}`;
    const canonicalUrl = `https://www.bay-leaf.eu${canonicalPath}`;

    // Get SEO content for current section
    const seoContent = sectionSEOData[currentSectionId as keyof typeof sectionSEOData];

    return (
        <>
            <SEOHead
                en={seoContent.en}
                de={seoContent.de}
                canonicalUrl={canonicalUrl}
            />

            <ScrollHideContactHeader />
            <Navbar currentActiveSection={currentSectionId} />

            <main>
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
                <MainAppContent />
            </LanguageProvider>
        </LoadingProvider>
    );
}

export default App;