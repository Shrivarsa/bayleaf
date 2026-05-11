import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { ArrowDown, Utensils, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../context/translations';

// Props include the required ref and id for App.tsx scroll logic
interface HeroSectionProps {
  id: string;
}

// Use React.forwardRef to allow the parent component (App.tsx) to pass a ref
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>((props, ref) => {
    const { id } = props;
    
    const bgRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const { language } = useLanguage();

    useEffect(() => {
        if (quoteRef.current) {
            gsap.from(quoteRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 1.2,
                ease: 'power3.out',
            });
        }
    }, []);

    // Get the H1 text from the SEO data (using translations for localization)
    const h1Text = language === 'de' ? 'Authentisches indisches Essen in Singen' : 'Authentic Indian Food Singen';

    // The H2 text (using translations for localization)
    const h2Text = language === 'de' ? 'Leckeres indisches Restaurant' : 'Tasty Indian food restaurant';


    return (
        // Pass the forwarded 'ref' and the 'id' to the root section element
        <section id={id} ref={ref} className="relative min-h-screen w-full">
            <div ref={bgRef} className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute w-full h-full object-cover object-[100%] md:object-center min-h-screen min-w-full"
                >
                    <source src="https://ik.imagekit.io/jacw2jgvs/_ffdb4f.mp4?updatedAt=1748153796061" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/10 z-0"></div>
            </div>

            <div className="absolute inset-0 z-10">
                <div className="absolute top-1/4 left-16 md:left-24 lg:left-32 text-white z-50 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="white flex items-center mb-6"
                    >
                        <Utensils className="mr-2" size={20} />
                        <span className="uppercase tracking-widest text-sm">
                            {translations.hero.tagline[language]}
                        </span>
                    </motion.div>

                    {/* H1 Tag for SEO */}
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                        {h1Text}
                    </h1>
                    
                    {/* H2 Tag for SEO - Used as a subheading/tagline */}
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8">
                        {h2Text}
                    </h2>

                    <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                        {translations.hero.description[language]} 
                        {/* Note: If you want the H3 text ('First South Indian Restaurant in Singen, Germany') visible, you can add it here as a <p> or <h3> */}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-16 translate-x-8 md:translate-x-12 relative z-50 pointer-events-auto">
                        <Link
                            to="menu"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={0}
                            className="btn-primary"
                        >
                            {translations.hero.exploreMenu[language]}
                        </Link>

                        <Link
                            to="contact-us"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={0}
                            className="bg-white/20 text-white py-2 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all"
                        >
                            {translations.hero.bookTable[language]}
                        </Link>
                    </div>

                    <div
                        ref={quoteRef}
                        className="bg-white/20 p-6 rounded-lg border border-white/30 shadow-lg max-w-md"
                    >
                        <div className="flex items-start">
                            <Quote className="text-white mr-3 flex-shrink-0 mt-1" size={28} />
                            <div>
                                <p className="text-white font-medium italic text-lg md:text-xl mb-3">
                                    {translations.hero.quote[language]}
                                </p>
                                <p className="text-white/100 text-sm text-right">- Chef Ranveer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-16 md:left-24 lg:left-32 z-10">
                <Link
                    to="about-us"
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={0}
                    className="flex flex-col items-center cursor-pointer hover:text-white transition-colors text-white"
                >
                    <span className="text-sm uppercase tracking-wider mb-2">
                        {translations.hero.scrollDown[language]}
                    </span>
                    <ArrowDown size={20} className="animate-bounce" />
                </Link>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;