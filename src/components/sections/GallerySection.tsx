import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Image, X, ChevronDown, Eye, EyeOff, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../../context/translations'; // Adjust path as needed

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

interface GallerySectionProps {
  language?: 'en' | 'de';
}

const galleryData: GalleryItem[] = [

  {
    id: "img-7",
    title: "Best aloo paratha, singen, Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/BestalooparathasingenHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Best aloo paratha, singen, Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-8",
    title: "Best nicht vegetarisch foods, Singen",
    imageUrl: "/BAyLeafGallerypics1/BestnichtvegetarischfoodsSingen.jpg",
    category: "food",
    description: "Image titled 'Best nicht vegetarisch foods, Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-9",
    title: "Bestes Restaurant in der Nähe",
    imageUrl: "/BAyLeafGallerypics1/Bestes%20Restaurant%20in%20der%20N%C3%A4he.jpg",
    category: "restaurant",
    description: "Image titled 'Bestes Restaurant in der Nähe' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-10",
    title: "chettinad chicken Traditional food, Singen",
    imageUrl: "/BAyLeafGallerypics1/chettinadchickenTraditionalfoodSingen.jpeg",
    category: "food",
    description: "Image titled 'chettinad chicken Traditional food, Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-11",
    title: "Chettinad Mutton Kuzhambu, Traditionliches singen",
    imageUrl: "/BAyLeafGallerypics1/ChettinadMuttonKuzhambuTraditionellessingen.jpg",
    category: "food",
    description: "Image titled 'Chettinad Mutton Kuzhambu, Traditionliches singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-12",
    title: "chicken briyani Traditional food in Singen",
    imageUrl: "/BAyLeafGallerypics1/chickenbriyaniTraditionalfoodinsingen.webp",
    category: "food",
    description: "Image titled 'chicken briyani Traditional food in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-13",
    title: "chicken gongura In Singen, Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/chickengonguraInSingenHohentwiel.jpg",
    category: "food",
    description: "Image titled 'chicken gongura In Singen, Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-14",
    title: "chicken gravy best non veg restaurant",
    imageUrl: "/BAyLeafGallerypics1/chicken%20gravy%20best%20non%20veg%20restaurant.webp",
    category: "restaurant",
    description: "Image titled 'chicken gravy best non veg restaurant' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-15",
    title: "Chicken Chettinad Curry in Singenpic",
    imageUrl: "/BAyLeafGallerypics1/Chicken-Chettinad-Curry%20in%20Singenpic.jpg",
    category: "food",
    description: "Image titled 'Chicken Chettinad Curry in Singenpic' showcasing our authentic offerings in food."
  },
  {
    id: "img-16",
    title: "Chicken malai kebab chicken reshmi kebab murg malai",
    imageUrl: "/BAyLeafGallerypics1/Chickenmalaikebabchickenreshmikebabmurgmalaikebab.jpg",
    category: "food",
    description: "Image titled 'Chicken malai kebab chicken reshmi kebab murg malai' showcasing our authentic offerings in food."
  },
  {
    id: "img-17",
    title: "Das schöne Ambiente beim Essen, Singen",
    imageUrl: "/BAyLeafGallerypics1/DasschöneAmbientebeimEssenSingen.webp",
    category: "restaurant",
    description: "Image titled 'Das schöne Ambiente beim Essen, Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-18",
    title: "Ein traditionelles Restaurant in Singen",
    imageUrl: "/BAyLeafGallerypics1/Ein traditionelles Restaurant in Singen.webp",
    category: "restaurant",
    description: "Image titled 'Ein traditionelles Restaurant in Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-19",
    title: "Ein wunderschönes Restaurant in Deutschland",
    imageUrl: "/BAyLeafGallerypics1/Ein%20wundersch%C3%B6nes%20Restaurant%20in%20Deutschland.JPG",
    category: "restaurant",
    description: "Image titled 'Ein wunderschönes Restaurant in Deutschland' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-21",
    title: "eral milagu, Traditinil foods, Singen pic",
    imageUrl: "/BAyLeafGallerypics1/eral milaguTraditional foodsSingen pic.jpg",
    category: "food",
    description: "Image titled 'eral milagu, Traditinil foods, Singen pic' showcasing our authentic offerings in food."
  },
  {
    id: "img-22",
    title: "eral thoku must try, Singen",
    imageUrl: "/BAyLeafGallerypics1/eral thoku must trySingen.jpg",
    category: "food",
    description: "Image titled 'eral thoku must try, Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-23",
    title: "eral prawn pepper fry in Singen",
    imageUrl: "/BAyLeafGallerypics1/eral fry in SingenHohentwiel.jpg",
    category: "food",
    description: "Image titled 'eral prawn pepper fry in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-24",
    title: "First authentic Indian food in Singen",
    imageUrl: "/BAyLeafGallerypics1/First%20authentic%20Indian%20food%20in%20Singen.jpg",
    category: "food",
    description: "Image titled 'First authentic Indian food in Singen' showcasing our authentic offerings in food."
  },

  {
    id: "img-26",
    title: "Murg-Malai-Kabab,Singen,August-Ruf-Straße",
    imageUrl: "/BAyLeafGallerypics1/Murg-Malai-KababSingenAugust-Ruf-Straße.jpg",
    category: "food",
    description: "Image titled 'Murg-Malai-Kabab,Singen,August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    id: "img-27",
    title: "mutton briyani Würzige Biryani,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton briyani Würzige BiryaniSingen.jpg",
    category: "food",
    description: "Image titled 'mutton briyani Würzige Biryani,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-28",
    title: "mutton kurma First of its kind foods,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton kurma First of its kind foodsSingen .jpg",
    category: "food",
    description: "Image titled 'mutton kurma First of its kind foods,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-29",
    title: "mutton vindaloo Nicht-vegetarische Gerichte,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton vindaloo Nicht-vegetarische GerichteSingen.webp",
    category: "food",
    description: "Image titled 'mutton vindaloo Nicht-vegetarische Gerichte,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-31",
    title: "paruppu keerai vegetarisches Gericht,Singen",
    imageUrl: "/BAyLeafGallerypics1/paruppu keerai vegetarisches GerichtSingen.jpg",
    category: "food",
    description: "Image titled 'paruppu keerai vegetarisches Gericht,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-32",
    title: "paruppu rasam vegetarisches Gericht,Singen",
    imageUrl: "/BAyLeafGallerypics1/paruppu rasam vegetarisches GerichtSingen.webp",
    category: "food",
    description: "Image titled 'paruppu rasam vegetarisches Gericht,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-33",
    title: "pepper chicken Scharfe südindische Gerichte in Singen",
    imageUrl: "/BAyLeafGallerypics1/pepper%20chicken%20Scharfe%20s%C3%BCdindische%20Gerichte%20in%20Singen.jpg",
    category: "food",
    description: "Image titled 'pepper chicken Scharfe südindische Gerichte in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-34",
    title: "PepperMutton Spicy south Indian foods in Singen",
    imageUrl: "/BAyLeafGallerypics1/PepperMutton%20Spicy%20south%20Indian%20foods%20in%20Singen.jpg",
    category: "food",
    description: "Image titled 'PepperMutton Spicy south Indian foods in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-35",
    title: "prawn curry best best sea foods,Singen",
    imageUrl: "/BAyLeafGallerypics1/prawncurrybestseafoodsSingen.jpg",
    category: "food",
    description: "Image titled 'prawn curry best best sea foods,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-36",
    title: "Schönes Ambiente in Singen",
    imageUrl: "/BAyLeafGallerypics1/Sch%C3%B6nes%20Ambiente%20in%20Singen.jpg",
    category: "restaurant",
    description: "Image titled 'Schönes Ambiente in Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-37",
    title: "Schönes Speisen,Singen,Germany",
    imageUrl: "/BAyLeafGallerypics1/SchönesSpeisenSingenGermany.jpeg",
    category: "food",
    description: "Image titled 'Schönes Speisen,Singen,Germany' showcasing our authentic offerings in food."
  },
  {
    id: "img-38",
    title: "Schönes südindisches Restaurant in Singen",
    imageUrl: "/BAyLeafGallerypics1/Sch%C3%B6nes%20s%C3%BCdindisches%20Restaurant%20in%20Singen.png",
    category: "restaurant",
    description: "Image titled 'Schönes südindisches Restaurant in Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-39",
    title: "sea foods,Singen,Germany",
    imageUrl: "/BAyLeafGallerypics1/seafoodsSingenGermany.jpg",
    category: "food",
    description: "Image titled 'sea foods,Singen,Germany' showcasing our authentic offerings in food."
  },
  {
    id: "img-40",
    title: "South Indian breakfast in Singen",
    imageUrl: "/BAyLeafGallerypics1/South%20Indian%20breakfast%20in%20Singen.jpg",
    category: "food",
    description: "Image titled 'South Indian breakfast in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-41",
    title: "South Indian Foods,Singen,August-Ruf-Straße",
    imageUrl: "/BAyLeafGallerypics1/SouthIndianFoodsSingenAugustRufStraße.jpg",
    category: "food",
    description: "Image titled 'South Indian Foods,Singen,August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    id: "img-42",
    title: "Spicy south Indian foods in Singen",
    imageUrl: "/BAyLeafGallerypics1/SpicysouthIndianfoodsinSingen.jpg",
    category: "food",
    description: "Image titled 'Spicy south Indian foods in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-43",
    title: "Südindisches Frühstück Singen",
    imageUrl: "/BAyLeafGallerypics1/S%C3%BCdindisches%20Fr%C3%BChst%C3%BCck%20Singen.jpg",
    category: "food",
    description: "Image titled 'Südindisches Frühstück Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-44",
    title: "Taste Aloo-Chana,Singen,Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/TasteAlooChanaSingenHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Taste Aloo-Chana,Singen,Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-45",
    title: "Taste beef milagu,Singen Restaurant",
    imageUrl: "/BAyLeafGallerypics1/TastebeefmilaguSingenRestaurant.png",
    category: "restaurant",
    description: "Image titled 'Taste beef milagu,Singen Restaurant' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-46",
    title: "The best veg foods in singen,hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/Thebestvegfoodsinsingenhohentwiel.jpg",
    category: "food",
    description: "Image titled 'The best veg foods in singen,hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-47",
    title: "The best veg foods,Singen",
    imageUrl: "/BAyLeafGallerypics1/ThebestvegfoodsSingen.jpg",
    category: "food",
    description: "Image titled 'The best veg foods,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-48",
    title: "Traditionelle Küche Restaurant,Singen",
    imageUrl: "/BAyLeafGallerypics1/TraditionelleKücheRestaurantSingen.jpg",
    category: "restaurant",
    description: "Image titled 'Traditionelle Küche Restaurant,Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-49",
    title: "Vegetable-Biryani,Singen,Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/VegetableBiryaniSingenHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Vegetable-Biryani,Singen,Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-50",
    title: "vendakiai kulambu like homemade,Singen",
    imageUrl: "/BAyLeafGallerypics1/vendaikaikulammbulikehomemadeSingen.jpg",
    category: "food",
    description: "Image titled 'vendakiai kulambu like homemade,Singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-51",
    "title": "Authentische Biryani in SingenHohentwiel",
    "imageUrl": "/BAyLeafGallerypics2/Authentische%20Biryani%20in%20SingenHohentwiel.jpeg",
    "category": "food",
    "description": "Image titled 'Authentische Biryani in SingenHohentwiel' showcasing our authentic offerings in food."
  },
  {
    "id": "img-52",
    "title": "Authentische indische Süßigkeiten in Singen",
    "imageUrl": "/BAyLeafGallerypics2/Authentische%20indische%20S%C3%BC%C3%9Figkeiten%20in%20Singen.jpeg",
    "category": "food",
    "description": "Image titled 'Authentische indische Süßigkeiten in Singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-53",
    "title": "Beautiful restaurant in singenmAugust-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Beautiful%20restaurant%20in%20singenmAugust-Ruf-Stra%C3%9Fe.jpeg",
    "category": "interior",
    "description": "Image titled 'Beautiful restaurant in singenmAugust-Ruf-Straße' showcasing our authentic offerings in food."
  },

  {
    "id": "img-57",
    "title": "Best onion pakoda near Germany",
    "imageUrl": "/BAyLeafGallerypics2/Best%20onion%20pakoda%20near%20Germany.jpeg",
    "category": "food",
    "description": "Image titled 'Best onion pakoda near Germany' showcasing our authentic offerings in food."
  },
  {
    "id": "img-58",
    "title": "best thali in singenHohentwiel",
    "imageUrl": "/BAyLeafGallerypics2/best%20thali%20in%20singenHohentwiel.jpeg",
    "category": "food",
    "description": "Image titled 'best thali in singenHohentwiel' showcasing our authentic offerings in food."
  },
  {
    "id": "img-60",
    "title": "Beste Dosa in SingenAugust-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Beste%20Dosa%20in%20SingenAugust-Ruf-Stra%C3%9Fe.jpeg",
    "category": "food",
    "description": "Image titled 'Beste Dosa in SingenAugust-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    "id": "img-61",
    "title": "Das erste südindische Restaurant in Singen",
    "imageUrl": "/BAyLeafGallerypics2/Das%20erste%20s%C3%BCdindische%20Restaurant%20in%20Singen.jpeg",
    "category": "interior",
    "description": "Image titled 'Das erste südindische Restaurant in Singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-62",
    "title": "Enjoy the taste in Singen",
    "imageUrl": "/BAyLeafGallerypics2/Enjoy%20the%20taste%20in%20Singen.jpeg",
    "category": "food",
    "description": "Image titled 'Enjoy the taste in Singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-63",
    "title": "Erlebe den traditionellen Geschmack in Singen",
    "imageUrl": "/BAyLeafGallerypics2/Erlebe%20den%20traditionellen%20Geschmack%20in%20Singen.jpeg",
    "category": "food",
    "description": "Image titled 'Erlebe den traditionellen Geschmack in Singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-65",
    "title": "Good foods in SingenGermany",
    "imageUrl": "/BAyLeafGallerypics2/Good%20foods%20in%20SingenGermany.jpeg",
    "category": "food",
    "description": "Image titled 'Good foods in SingenGermany' showcasing our authentic offerings in food."
  },
  {
    "id": "img-67",
    "title": "Good thali in singenHohentwiel",
    "imageUrl": "/BAyLeafGallerypics2/Good%20thali%20in%20singenHohentwiel.jpeg",
    "category": "food",
    "description": "Image titled 'Good thali in singenHohentwiel' showcasing our authentic offerings in food."
  },
  {
    "id": "img-68",
    "title": "Gutes Essen in SingenDeutschland",
    "imageUrl": "/BAyLeafGallerypics2/Gutes%20Essen%20in%20SingenDeutschland.jpeg",
    "category": "food",
    "description": "Image titled 'Gutes Essen in SingenDeutschland' showcasing our authentic offerings in food."
  },
  {
    "id": "img-69",
    "title": "Indian restaurant Singen Hohentwiel",
    "imageUrl": "/BAyLeafGallerypics2/Indian%20restaurant%20Singen%20Hohentwiel.jpeg",
    "category": "interior",
    "description": "Image titled 'Indian restaurant Singen Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    "id": "img-70",
    "title": "Indische Küche August-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Indische%20K%C3%BCche%20August-Ruf-Stra%C3%9Fe.jpeg",
    "category": "interior",
    "description": "Image titled 'Indische Küche August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    "id": "img-71",
    "title": "Kesari Indian sweet now in singen",
    "imageUrl": "/BAyLeafGallerypics2/Kesari%20Indian%20sweet%20now%20in%20singen.jpeg",
    "category": "food",
    "description": "Image titled 'Kesari Indian sweet now in singen' showcasing our authentic offerings in food."
  },
  {
    "id": "img-72",
    "title": "Schönes Restaurant in Singen August-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Sch%C3%B6nes%20Restaurant%20in%20Singen%20August-Ruf-Stra%C3%9Fe.jpeg",
    "category": "interior",
    "description": "Image titled 'Schönes Restaurant in Singen August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    "id": "img-74",
    "title": "spitzenmäßig Chicken-65 SingenDeutschland",
    "imageUrl": "/BAyLeafGallerypics2/spitzenm%C3%A4%C3%9Fig%20Chicken-65%20SingenDeutschland.jpeg",
    "category": "food",
    "description": "Image titled 'spitzenmäßig Chicken-65 SingenDeutschland' showcasing our authentic offerings in food."
  },
  {
    "id": "img-77",
    "title": "Taste Kola in singen August-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Taste%20Kola%20in%20singen%20August-Ruf-Stra%C3%9Fe.jpeg",
    "category": "food",
    "description": "Image titled 'Taste Kola in singen August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    "id": "img-78",
    "title": "Taste the panner in August-Ruf-Straße",
    "imageUrl": "/BAyLeafGallerypics2/Taste%20the%20panner%20in%20August-Ruf-Stra%C3%9Fe.jpeg",
    "category": "food",
    "description": "Image titled 'Taste the panner in August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    "id": "img-79",
    "title": "Taste the Traditional In SingenHohentwiel",
    "imageUrl": "/BAyLeafGallerypics2/Taste%20the%20Traditional%20In%20SingenHohentwiel.jpeg",
    "category": "food",
    "description": "Image titled 'Taste the Traditional In SingenHohentwiel' showcasing our authentic offerings in food."
  },
  {
    "id": "img-82",
    "title": "Topnotch Dosa in singenGermany",
    "imageUrl": "/BAyLeafGallerypics2/Topnotch%20Dosa%20in%20singenGermany.jpeg",
    "category": "food",
    "description": "Image titled 'Topnotch Dosa in singenGermany' showcasing our authentic offerings in food."
  }
];

const GallerySection: React.FC<GallerySectionProps> = ({ language = 'en' }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [showQuoteTooltip, setShowQuoteTooltip] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const categories = ['all', 'food', 'restaurant', 'events'];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && filteredImages.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
      }, 2000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredImages.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying && filteredImages.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
      }, 2000);
    }
  };

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Reset current index when filter changes
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [filter]);

  // Tooltip effect
  React.useEffect(() => {
    const timer = setTimeout(() => setShowQuoteTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowQuoteTooltip(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const ImageComponent = ({ item, className, ...props }: { item: GalleryItem; className?: string; [key: string]: any }) => {
    const hasError = imageErrors.has(item.id);
    
    if (hasError) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <div className="text-center p-4">
            <Image className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-500 text-sm">{item.title}</p>
          </div>
        </div>
      );
    }

    return (
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className={className}
        onError={() => handleImageError(item.id)}
        loading="lazy"
        {...props}
      />
    );
  };

  // Get current images to display (4 for desktop, 1 for mobile)
  const getCurrentImages = () => {
    const startIndex = currentImageIndex;
    const images = [];
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % filteredImages.length;
      images.push(filteredImages[index]);
    }
    return images;
  };

  const currentImages = getCurrentImages();

  return (
    <section id="gallery" className="relative py-12" style={{ backgroundColor: '#ffd647' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* White Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
          {/* Section Header */}
          <div ref={textRef} className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center mb-3"
            >
              <Image className="mr-2 text-spice-600" size={18} />
              <span className="uppercase tracking-widest text-xs text-spice-600">
                {translations.gallery.subtitle[language]}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800"
            >
              {translations.gallery.title[language]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              {translations.gallery.description[language]}
            </motion.p>
          </div>

          {/* Filter Buttons */}
          <motion.div 
            className="flex justify-center flex-wrap gap-3 my-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => {
                  setFilter(category);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                  filter === category 
                    ? 'bg-spice-600 text-white shadow' 
                    : 'bg-cream-200 text-gray-700 hover:bg-spice-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {translations.gallery.categories[category as keyof typeof translations.gallery.categories][language]}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Slideshow */}
          {filteredImages.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Desktop View - 4 Images Grid */}
              <div className="hidden md:block relative bg-gray-100 rounded-xl overflow-hidden shadow-lg mb-4 max-w-4xl mx-auto">
                <div className="grid grid-cols-2 gap-1.5 p-1.5">
                  <AnimatePresence mode="wait">
                    {currentImages.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${currentImageIndex}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="aspect-[4/3] relative overflow-hidden rounded-md cursor-pointer group"
                        onClick={() => setSelectedImage(item)}
                      >
                        <ImageComponent
                          item={item}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h4 className="text-white font-semibold text-xs truncate">
                            {item.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Desktop Navigation Arrows */}
                {filteredImages.length > 4 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10 group"
                    >
                      <ChevronLeft size={20} className="text-gray-700 group-hover:text-spice-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-10 group"
                    >
                      <ChevronRight size={20} className="text-gray-700 group-hover:text-spice-600" />
                    </button>
                  </>
                )}

                {/* Auto-play indicator */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="hidden sm:inline">Auto-play {isAutoPlaying ? 'ON' : 'OFF'}</span>
                  <span className="sm:hidden">{isAutoPlaying ? 'ON' : 'OFF'}</span>
                </div>

                {/* Image counter */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  {Math.floor(currentImageIndex / 4) + 1} / {Math.ceil(filteredImages.length / 4)}
                </div>
              </div>

              {/* Mobile View - Single Vertical Image */}
              <div className="md:hidden relative bg-gray-100 rounded-xl overflow-hidden shadow-lg mb-4 max-w-sm mx-auto">
                <div className="aspect-[3/4] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <ImageComponent
                        item={filteredImages[currentImageIndex]}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(filteredImages[currentImageIndex])}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Mobile Navigation Arrows */}
                  {filteredImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all z-10 group"
                      >
                        <ChevronLeft size={20} className="text-gray-700 group-hover:text-spice-600" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all z-10 group"
                      >
                        <ChevronRight size={20} className="text-gray-700 group-hover:text-spice-600" />
                      </button>
                    </>
                  )}

                  {/* Mobile Image Counter */}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </div>

                  {/* Mobile Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-display text-lg">
                      {filteredImages[currentImageIndex]?.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation - Both Desktop and Mobile */}
              {filteredImages.length > 1 && (
                <div className="flex justify-center gap-1 overflow-x-auto pb-2">
                  {filteredImages.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-12 h-9 md:w-16 md:h-12 rounded-md overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-spice-600 shadow-lg' 
                          : 'border-gray-300 hover:border-spice-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ImageComponent
                        item={item}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Auto-play Control */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-all"
                >
                  {isAutoPlaying ? <Eye size={16} /> : <EyeOff size={16} />}
                  {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                </button>
              </div>

              {/* Click to Enlarge Hint */}
              <p className="text-center text-gray-500 text-xs mt-3">
                {language === 'de' ? 'Klicken Sie auf das Bild zum Vergrößern' : 'Click on image to enlarge'}
              </p>
            </motion.div>
          )}

          {/* Enhanced Quote Section - Styled like Hero */}
          <motion.div 
            className="mt-12 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                {/* Quote Link - Styled like Hero */}
                <a
                  href="https://en.wikipedia.org/wiki/Kural"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                  title="Learn more about this quote"
                >
                  {/* Tamil Quote - Using Hero styling */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-4"
                  >
                    <p 
  className="text-[0.65rem] sm:text-base md:text-lg lg:text-xl mb-2 group-hover:text-brown-800 group-hover:scale-105 active:scale-95 transition-all duration-200 leading-tight max-w-xs sm:max-w-none mx-auto"
  dangerouslySetInnerHTML={{ 
    __html: translations.gallery.quote.tamil[language] 
  }}
/>

                  </motion.div>

                  {/* Tooltip */}
                  {showQuoteTooltip && (
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-yellow-300 text-sm px-3 py-2 rounded-lg z-30 whitespace-nowrap">
                      Want to learn about this quote? Click here!
                    </span>
                  )}
                </a>

                {/* Source - Using Hero styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-black text-xs sm:text-sm md:text-base max-w-xs sm:max-w-none mx-auto">
                    {translations.gallery.quote.source[language]}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div 
            className="text-center mt-16 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            layout
          >
            <div className="scroll-indicator mx-auto mb-4">
              <div className="scroll-indicator-progress" />
            </div>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={800}
              className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors mx-auto w-fit"
            >
              <span className="text-sm uppercase tracking-wider mb-2">
                {translations.gallery.scrollDown[language]}
              </span>
              <ChevronDown size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-60 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-80 transition-all z-10 shadow-lg"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                <ImageComponent
                  item={selectedImage}
                  className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-6 bg-gradient-to-r from-white to-gray-50">
                  <h3 className="text-2xl font-display mb-2 text-gray-800">{selectedImage.title}</h3>
                  <p className="text-gray-600 mb-3">{selectedImage.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {language === 'de' ? 'Kategorie' : 'Category'}:
                    </span>
                    <span className="text-sm font-medium text-spice-600 capitalize bg-spice-100 px-2 py-1 rounded-full">
                      {selectedImage.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;