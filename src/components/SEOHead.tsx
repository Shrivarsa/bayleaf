import React from 'react';
import { Helmet } from 'react-helmet-async'; 
import { useLanguage } from '../context/LanguageContext';

// Define the required structure for localized SEO content
interface SEOContent {
  title: string;
  metaDescription: string;
}

// Props for the SEOHead component
interface SEOHeadProps {
  en: SEOContent; 
  de: SEOContent;
  canonicalUrl: string; // Absolute URL for the current section (e.g., https://www.bay-leaf.eu/#menu)
}

const SEOHead: React.FC<SEOHeadProps> = ({ en, de, canonicalUrl }) => {
  const { language } = useLanguage();
  
  // Select the content based on the current language context
  const content = language === 'de' ? de : en; 
  
  // The base URL without a hash for hreflang links
  const baseUrl = 'https://www.bay-leaf.eu';
  
  // Get the hash part for the hreflang links (e.g., #menu)
  const canonicalHash = new URL(canonicalUrl).hash;

  return (
    // Helmet manages the injection of tags into the document <head>
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{content.title}</title>
      <meta name="description" content={content.metaDescription} />
      {/* NOTE: If you need keywords, uncomment this and add them to the SEO data in App.tsx */}
      {/* <meta name="keywords" content={content.keywords} /> */}

      {/* Canonical Tag - Crucial for preventing duplicate content issues on SPAs */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags - Essential for multilingual SEO */}
      {/* English/Default URL */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${canonicalHash || '/'}`} />
      {/* German URL - Assumes German version uses /de/ in the path for language routing */}
      <link rel="alternate" hrefLang="de" href={`${baseUrl}/de${canonicalHash || '/'}`} />
      {/* Default/Fallback URL for all other languages */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${canonicalHash || '/'}`} />

      {/* Open Graph / Social Media Tags */}
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEOHead;
