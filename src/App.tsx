import React, { useEffect, useState, useRef } from 'react';
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

const MainAppContent: React.FC = () => {
    const { language } = useLanguage();
    const [currentSectionId, setCurrentSectionId] = useState('home');
    const isNavigatingRef = useRef(false);

    // Section Refs
    const sectionRefs = {
        home: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        menu: useRef<HTMLElement>(null),
        gallery: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };

    // Modified path change listener - Only runs on page load and Back/Forward buttons
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
                // Small timeout to ensure the scroll detector doesn't catch the "jump"
                setTimeout(() => {
                    isNavigatingRef.current = false;
                }, 150);
            });
        };

        handlePathChange();
        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []); // Empty array stops the infinite loop

    // Scroll handler - detects which section is in view and updates the URL
    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            if (isNavigatingRef.current) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                let activeSectionId = 'home';
                const offset = 150;

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

                if (activeSectionId !== currentSectionId) {
                    setCurrentSectionId(activeSectionId);
                    const newPath = activeSectionId === 'home' ? '/' : `/${activeSectionId}`;
                    
                    if (window.location.pathname !== newPath) {
                        window.history.replaceState(null, '', newPath);
                    }
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [currentSectionId]); // Only watches currentSectionId

    const canonicalPath = currentSectionId === 'home' ? '' : `/${currentSectionId}`;
    const canonicalUrl = `https://www.bay-leaf.eu${canonicalPath}`;
    const seoContent = sectionSEOData[currentSectionId as keyof typeof sectionSEOData] || sectionSEOData['home'];

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