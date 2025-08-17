import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Bay Leaf EU | Authentic South Indian Restaurant in Singen",
  description = "Experience authentic South Indian flavors at Bay Leaf EU, Singen's first Tamil restaurant. Traditional dosas, aromatic biryanis, spicy curries. Book your table today!",
  keywords = "South Indian Restaurant Singen, Tamil Restaurant Germany, Dosa Singen, Biryani Singen, Indian Restaurant Germany",
  image = "/faviconv2.png",
  url = "https://www.bay-leaf.eu/",
  type = "website"
}) => {
  const { language } = useLanguage();

  // Adjust content based on language
  const localizedTitle = language === 'de' 
    ? "Bay Leaf EU | Authentisches Südindisches Restaurant in Singen"
    : title;

  const localizedDescription = language === 'de'
    ? "Erleben Sie authentische südindische Aromen im Bay Leaf EU, Singens erstem Tamil-Restaurant. Traditionelle Dosas, aromatische Biryanis, würzige Currys. Reservieren Sie jetzt!"
    : description;

  React.useEffect(() => {
    // Update document title
    document.title = localizedTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', localizedDescription);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', localizedTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', localizedDescription);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', localizedTitle);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', localizedDescription);
    }

    // Update canonical URL based on language
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const canonicalUrl = language === 'de' ? 'https://www.bay-leaf.eu/de/' : 'https://www.bay-leaf.eu/';
      canonical.setAttribute('href', canonicalUrl);
    }

  }, [localizedTitle, localizedDescription, language]);

  return null; // This component doesn't render anything
};

export default SEOHead;