import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Image, X, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  // Food Category
  {
    id: 'affordable-indian-foods',
    title: 'Affordable Indian Foods',
    imageUrl: '/BAyLeafGallerypics1/Affordable Indian foods in Singen.webp',
    category: 'food',
    description: 'Delicious and affordable authentic Indian cuisine'
  },
  {
    id: 'authentic-indian-restaurant',
    title: 'Authentic Indian Restaurant',
    imageUrl: '/BAyLeafGallerypics1/Authentic Indian Restaurant in Singen.jpg',
    category: 'food',
    description: 'Traditional Indian flavors prepared with authentic spices'
  },
  {
    id: 'auto-palao-indian-restaurant',
    title: 'Auto Palao',
    imageUrl: '/BAyLeafGallerypics1/Auto palao Indian Restaurant in Singen.jpg',
    category: 'food',
    description: 'Fragrant basmati rice dish with aromatic spices'
  },
  {
    id: 'best-biryani-singen',
    title: 'Best Biryani in Singen',
    imageUrl: '/BAyLeafGallerypics1/Best Biryani Indian Restaurant in Singen.jpg',
    category: 'food',
    description: 'Premium biryani with tender meat and aromatic rice'
  },
  {
    id: 'best-dining-restaurant',
    title: 'Fine Dining Experience',
    imageUrl: '/BAyLeafGallerypics1/Best dining restaurant in singen Deutschland.jpg',
    category: 'restaurant',
    description: 'Elegant dining atmosphere with exceptional service'
  },
  {
    id: 'best-non-vegetarian-foods',
    title: 'Best Non-Vegetarian Foods',
    imageUrl: '/BAyLeafGallerypics1/Best non vegetarian foods,Singen.jpg',
    category: 'food',
    description: 'Premium non-vegetarian dishes with rich flavors'
  },
  {
    id: 'best-restaurant-singen',
    title: 'Best Restaurant in Singen',
    imageUrl: '/BAyLeafGallerypics1/Best Restaurant in Singen.jpg',
    category: 'restaurant',
    description: 'Top-rated dining destination in Singen'
  },
  {
    id: 'butter-chicken',
    title: 'Butter Chicken',
    imageUrl: '/BAyLeafGallerypics1/Butter chicken,Singen.jpg',
    category: 'food',
    description: 'Creamy and rich butter chicken in tomato-based sauce'
  },
  {
    id: 'chattinad-chicken',
    title: 'Chettinad Chicken',
    imageUrl: '/BAyLeafGallerypics1/Chattinad chicken Traditional food,Singen .jpeg',
    category: 'food',
    description: 'Spicy South Indian chicken curry with traditional spices'
  },
  {
    id: 'chettinad-mutton',
    title: 'Chettinad Mutton',
    imageUrl: '/BAyLeafGallerypics1/Chettinad Mutton Traditionalfood Singen.jpg',
    category: 'food',
    description: 'Traditional South Indian mutton curry with aromatic spices'
  },
  {
    id: 'chicken-biryani',
    title: 'Chicken Biryani',
    imageUrl: '/BAyLeafGallerypics1/Chicken biryani Traditional food in singen.webp',
    category: 'food',
    description: 'Classic chicken biryani with fragrant basmati rice'
  },
  {
    id: 'chicken-gravy',
    title: 'Chicken Gravy',
    imageUrl: '/BAyLeafGallerypics1/Chicken gravy indian food singen.webp',
    category: 'food',
    description: 'Rich and flavorful chicken curry gravy'
  },
  {
    id: 'chicken-gravy-best',
    title: 'Premium Chicken Gravy',
    imageUrl: '/BAyLeafGallerypics1/Chicken gravy best non veg restaurant.webp',
    category: 'food',
    description: 'Our signature chicken gravy from the best non-veg restaurant'
  },
  {
    id: 'chicken-gravy-restaurant',
    title: 'Restaurant Style Chicken Gravy',
    imageUrl: '/BAyLeafGallerypics1/Chicken gravy non veg restaurant singen.webp',
    category: 'food',
    description: 'Restaurant-style chicken gravy with authentic flavors'
  },
  {
    id: 'chicken-kabab',
    title: 'Chicken Kabab',
    imageUrl: '/BAyLeafGallerypics1/Chickens kabab chicken restaurant kabab mutton kabab,Singen.webp',
    category: 'food',
    description: 'Perfectly grilled chicken kababs with traditional marinades'
  },
  {
    id: 'eat-traditionelles',
    title: 'Traditional Dining',
    imageUrl: '/BAyLeafGallerypics1/Eat traditionelles Restaurant in Singen.webp',
    category: 'restaurant',
    description: 'Traditional restaurant experience in Singen'
  },
  {
    id: 'eral-fry',
    title: 'Eral Fry',
    imageUrl: '/BAyLeafGallerypics1/eral fry in Singen,Deutschland.jpg',
    category: 'food',
    description: 'Crispy and spicy South Indian prawn fry'
  },
  {
    id: 'eral-roast',
    title: 'Eral Roast',
    imageUrl: '/BAyLeafGallerypics1/eral roast Traditional food,Singen pic.jpg',
    category: 'food',
    description: 'Traditional South Indian prawn roast with aromatic spices'
  },
  {
    id: 'fish-fry',
    title: 'Fish Fry',
    imageUrl: '/BAyLeafGallerypics1/fish fry in Singen,Deutschland.jpg',
    category: 'food',
    description: 'Crispy and golden fish fry with South Indian spices'
  },
  {
    id: 'fish-roast',
    title: 'Fish Roast',
    imageUrl: '/BAyLeafGallerypics1/fish roast traditional food in singen pic.jpg',
    category: 'food',
    description: 'Traditional fish roast with authentic coastal flavors'
  },
  {
    id: 'gobi-manchurian',
    title: 'Gobi Manchurian',
    imageUrl: '/BAyLeafGallerypics1/Gobi manchurian,Singen.jpg',
    category: 'food',
    description: 'Indo-Chinese cauliflower dish with tangy sauce'
  },
  {
    id: 'gongura-mutton',
    title: 'Gongura Mutton',
    imageUrl: '/BAyLeafGallerypics1/Gongura mutton SingenAndagut-Sind-Greens.webp',
    category: 'food',
    description: 'Traditional Andhra mutton curry with gongura leaves'
  },
  {
    id: 'indian-palao',
    title: 'Indian Palao',
    imageUrl: '/BAyLeafGallerypics1/Indian palao Authantisch schomti sudendasche Kuchi.webp',
    category: 'food',
    description: 'Authentic Indian palao with aromatic basmati rice'
  },
  {
    id: 'kalkandu-biriyani',
    title: 'Kalkandu Biryani',
    imageUrl: '/BAyLeafGallerypics1/kalkandu biriyani indianisch essen in singen.webp',
    category: 'food',
    description: 'Sweet and savory biryani with rock sugar'
  },
  {
    id: 'karuvandu-kozhi',
    title: 'Karuvandu Kozhi',
    imageUrl: '/BAyLeafGallerypics1/karuvandu kozhi kulambu chicken curry gravy indian food,Singen.webp',
    category: 'food',
    description: 'Traditional Tamil chicken curry with dried fish flavor'
  },
  {
    id: 'kottai-roast',
    title: 'Kottai Roast',
    imageUrl: '/BAyLeafGallerypics1/kottai roast non veg indian restaurant in singen.webp',
    category: 'food',
    description: 'Spicy and flavorful meat roast from South India'
  },
  {
    id: 'kuruma-tamil-nadu',
    title: 'Tamil Nadu Kuruma',
    imageUrl: '/BAyLeafGallerypics1/kuruma Tamil Nadu style food in Germany.webp',
    category: 'food',
    description: 'Authentic Tamil Nadu style kuruma curry'
  },
  {
    id: 'mutton-chops',
    title: 'Mutton Chops',
    imageUrl: '/BAyLeafGallerypics1/Mutton Chops Indian food,Singen.webp',
    category: 'food',
    description: 'Tender mutton chops with traditional Indian spices'
  },
  {
    id: 'masala-dosa',
    title: 'Masala Dosa',
    imageUrl: '/BAyLeafGallerypics1/masala dosa Sudasiasche Fruhstuck singen.webp',
    category: 'food',
    description: 'Crispy South Indian crepe with spiced potato filling'
  },
  {
    id: 'pepper-mutton-spicy',
    title: 'Pepper Mutton',
    imageUrl: '/BAyLeafGallerypics1/Pepper Mutton Spicy south Indian foods in singen.webp',
    category: 'food',
    description: 'Spicy South Indian pepper mutton with bold flavors'
  },
  {
    id: 'schezwan-andaische',
    title: 'Schezwan Andhra Style',
    imageUrl: '/BAyLeafGallerypics1/Schezwas Andaische in Singen.jpg',
    category: 'food',
    description: 'Spicy Schezwan dish with Andhra influences'
  },
  {
    id: 'schezwan-restaurant',
    title: 'Schezwan Specialties',
    imageUrl: '/BAyLeafGallerypics1/Schezwas sudasiasche Restaurant in Singen.jpg',
    category: 'food',
    description: 'South Asian restaurant specializing in Schezwan cuisine'
  },
  {
    id: 'sri-lanka-foods',
    title: 'Sri Lankan Foods',
    imageUrl: '/BAyLeafGallerypics1/sri la Rock-chicken singen.webp',
    category: 'food',
    description: 'Authentic Sri Lankan chicken dishes'
  },
  {
    id: 'south-indian-breakfast',
    title: 'South Indian Breakfast',
    imageUrl: '/BAyLeafGallerypics1/South Indian breakfast in Singen.jpg',
    category: 'food',
    description: 'Traditional South Indian breakfast items'
  },
  {
    id: 'south-indian-foods',
    title: 'South Indian Foods',
    imageUrl: '/BAyLeafGallerypics1/South Indian foods Bay-Leaf Singen.jpg',
    category: 'food',
    description: 'Authentic South Indian cuisine at Bay Leaf'
  },
  {
    id: 'spicy-south-indian',
    title: 'Spicy South Indian',
    imageUrl: '/BAyLeafGallerypics1/Spicy south Indian foods in Singen.jpg',
    category: 'food',
    description: 'Bold and spicy South Indian dishes'
  },
  {
    id: 'taste-also-chaps',
    title: 'Specialty Chops',
    imageUrl: '/BAyLeafGallerypics1/Taste Also Chaps,Singen,Deutschland.jpg',
    category: 'food',
    description: 'Specialty meat chops with unique flavors'
  },
  {
    id: 'traditionelles-palakkad',
    title: 'Traditional Palakkad Style',
    imageUrl: '/BAyLeafGallerypics1/Traditionelles palakkad style foods,Singen.jpg',
    category: 'food',
    description: 'Traditional Palakkad style Kerala cuisine'
  },
  {
    id: 'best-veg-foods',
    title: 'Best Vegetarian Foods',
    imageUrl: '/BAyLeafGallerypics1/The best veg foods in singen,Deutschland.jpg',
    category: 'food',
    description: 'Premium vegetarian dishes with fresh ingredients'
  },
  {
    id: 'traditionale-kuche',
    title: 'Traditional Kitchen',
    imageUrl: '/BAyLeafGallerypics1/Traditionale Kuche Restaurant,Singen.jpg',
    category: 'restaurant',
    description: 'Traditional kitchen specializing in authentic cuisine'
  },
  {
    id: 'veg-meal',
    title: 'Traditional Veg Meal',
    imageUrl: '/BAyLeafGallerypics1/Veg Meal non veg meals in singen,Deutschland.jpg',
    category: 'food',
    description: 'Complete traditional vegetarian meal'
  },
  {
    id: 'veg-biriyani',
    title: 'Vegetarian Biryani',
    imageUrl: '/BAyLeafGallerypics1/Veg biriyani & sumudu like homemade,Singen.jpg',
    category: 'food',
    description: 'Homemade style vegetarian biryani with aromatic spices'
  },
  // BAyLeafGallerypics2 Collection
  {
    id: 'authentische-biryani',
    title: 'Authentische Biryani',
    imageUrl: '/BAyLeafGallerypics2/Authentische Biryani in Singen, Hohentwiel.jpeg',
    category: 'food',
    description: 'Authentic biryani prepared with traditional methods'
  },
  {
    id: 'authentische-indische-sudasian',
    title: 'Authentische Indische Cuisine',
    imageUrl: '/BAyLeafGallerypics2/Authentische indische sudasian.jpeg',
    category: 'food',
    description: 'Authentic South Asian Indian cuisine'
  },
  {
    id: 'beautiful-restaurant',
    title: 'Beautiful Restaurant',
    imageUrl: '/BAyLeafGallerypics2/Beautiful restaurant in singen,August-Ruf-Straße.jpeg',
    category: 'restaurant',
    description: 'Beautiful restaurant ambiance on August-Ruf-Straße'
  },
  {
    id: 'best-biryani-hohentwiel',
    title: 'Best Biryani Hohentwiel',
    imageUrl: '/BAyLeafGallerypics2/Best Biryani in Singen,Hohentwiel.jpeg',
    category: 'food',
    description: 'The finest biryani in Singen, Hohentwiel area'
  },
  {
    id: 'best-chicken-hohentwiel',
    title: 'Best Chicken Hohentwiel',
    imageUrl: '/BAyLeafGallerypics2/Best chicken in Singen,Hohentwiel.jpeg',
    category: 'food',
    description: 'Premium chicken preparations in Hohentwiel'
  },
  {
    id: 'best-family-dining',
    title: 'Best Family Dining',
    imageUrl: '/BAyLeafGallerypics2/Best family dining in Singen .jpeg',
    category: 'restaurant',
    description: 'Perfect family dining experience in Singen'
  },
  {
    id: 'best-onion-pakoda',
    title: 'Best Onion Pakoda',
    imageUrl: '/BAyLeafGallerypics2/Best onion pakoda near Germany.jpeg',
    category: 'food',
    description: 'Crispy and delicious onion pakodas'
  },
  {
    id: 'best-thai-restaurant',
    title: 'Best Thai Restaurant',
    imageUrl: '/BAyLeafGallerypics2/Best thai Restaurant in Singen,Hohentwiel.jpeg',
    category: 'restaurant',
    description: 'Authentic Thai cuisine in Singen'
  },
  {
    id: 'best-thai-essen',
    title: 'Best Thai Essen',
    imageUrl: '/BAyLeafGallerypics2/Best Thai-Essen in Singen, germany.jpeg',
    category: 'food',
    description: 'Finest Thai food in Singen, Germany'
  },
  {
    id: 'beste-dosa',
    title: 'Beste Dosa',
    imageUrl: '/BAyLeafGallerypics2/Beste Dosa in Singen ,August-Ruf-Straße.jpeg',
    category: 'food',
    description: 'Best dosa in Singen on August-Ruf-Straße'
  },
  {
    id: 'das-beste-sudindisches',
    title: 'Das Beste Südindisches',
    imageUrl: '/BAyLeafGallerypics2/Das beste sudindisches Restaurant in Singen.jpeg',
    category: 'restaurant',
    description: 'The best South Indian restaurant in Singen'
  },
  {
    id: 'enjoy-taste-singen',
    title: 'Enjoy the Taste',
    imageUrl: '/BAyLeafGallerypics2/Enjoy the taste in Singen.jpeg',
    category: 'food',
    description: 'Enjoy authentic flavors in Singen'
  },
  {
    id: 'erlebe-traditionellen',
    title: 'Erlebe Traditionellen Geschmack',
    imageUrl: '/BAyLeafGallerypics2/Erlebe den traditionellen Geschmack in Singen.jpeg',
    category: 'food',
    description: 'Experience traditional flavors in Singen'
  },
  {
    id: 'experience-traditional',
    title: 'Experience Traditional',
    imageUrl: '/BAyLeafGallerypics2/Experience the traditional taste in Singen.jpeg',
    category: 'food',
    description: 'Experience authentic traditional cuisine'
  },
  {
    id: 'good-foods-singen',
    title: 'Good Foods Singen',
    imageUrl: '/BAyLeafGallerypics2/Good foods in Singen,Germany.jpeg',
    category: 'food',
    description: 'Quality foods in Singen, Germany'
  },
  {
    id: 'good-poori',
    title: 'Good Poori',
    imageUrl: '/BAyLeafGallerypics2/Good poori in  Singen, Deutschland.jpeg',
    category: 'food',
    description: 'Perfectly made poori in Deutschland'
  },
  {
    id: 'good-thai-food',
    title: 'Good Thai Food',
    imageUrl: '/BAyLeafGallerypics2/Good thai food in Singen.jpeg',
    category: 'food',
    description: 'Quality Thai cuisine in Singen'
  },
  {
    id: 'gutes-essen-singen',
    title: 'Gutes Essen Singen',
    imageUrl: '/BAyLeafGallerypics2/Gutes Essen in Singen, Deutschland.jpeg',
    category: 'food',
    description: 'Good food in Singen, Deutschland'
  },
  {
    id: 'indian-restaurant-hohentwiel',
    title: 'Indian Restaurant Hohentwiel',
    imageUrl: '/BAyLeafGallerypics2/Indian restaurant Singen Hohentwiel.jpeg',
    category: 'restaurant',
    description: 'Authentic Indian restaurant in Hohentwiel'
  },
  {
    id: 'indische-kuche',
    title: 'Indische Küche',
    imageUrl: '/BAyLeafGallerypics2/indische Küche August-Ruf-Straße.jpeg',
    category: 'restaurant',
    description: 'Indian kitchen on August-Ruf-Straße'
  },
  {
    id: 'kerala-indian-restaurant',
    title: 'Kerala Indian Restaurant',
    imageUrl: '/BAyLeafGallerypics2/Kerala Indian restaurant in singen.jpeg',
    category: 'restaurant',
    description: 'Authentic Kerala cuisine restaurant'
  },
  {
    id: 'schones-restaurant',
    title: 'Schönes Restaurant',
    imageUrl: '/BAyLeafGallerypics2/Schönes Restaurant in Singen, August-Ruf-Straße.jpeg',
    category: 'restaurant',
    description: 'Beautiful restaurant on August-Ruf-Straße'
  },
  {
    id: 'singens-best-restaurant',
    title: 'Singen\'s Best Restaurant',
    imageUrl: '/BAyLeafGallerypics2/Singen\'s Best Restaurant.jpeg',
    category: 'restaurant',
    description: 'The finest restaurant in Singen'
  },
  {
    id: 'spitzenmassige-chicken',
    title: 'Spitzenmäßige Chicken',
    imageUrl: '/BAyLeafGallerypics2/spitzenmassige Chicken in Singen-Deutschland.jpeg',
    category: 'food',
    description: 'Top-quality chicken dishes in Deutschland'
  },
  {
    id: 'spitzenmassige-dosa',
    title: 'Spitzenmäßige Dosa',
    imageUrl: '/BAyLeafGallerypics2/Spitzenmäßige Dosa in Singen,Hohentwiel.jpeg',
    category: 'food',
    description: 'Excellent dosa in Singen, Hohentwiel'
  },
  {
    id: 'sudindisches-essen',
    title: 'Südindisches Essen',
    imageUrl: '/BAyLeafGallerypics2/Südindisches Essen Singen,Germany.jpeg',
    category: 'food',
    description: 'South Indian cuisine in Singen, Germany'
  },
  {
    id: 'taste-kera',
    title: 'Taste Kera',
    imageUrl: '/BAyLeafGallerypics2/Taste Kera in singen August-Ruf-Straße.jpeg',
    category: 'food',
    description: 'Taste of Kerala on August-Ruf-Straße'
  },
  {
    id: 'taste-the-banner',
    title: 'Taste the Banner',
    imageUrl: '/BAyLeafGallerypics2/Taste the banner in August-Ruf-Straße.jpeg',
    category: 'restaurant',
    description: 'Experience our signature dishes'
  },
  {
    id: 'taste-traditional-hohentwiel',
    title: 'Taste Traditional Hohentwiel',
    imageUrl: '/BAyLeafGallerypics2/Taste the traditional in Singen,Hohentwiel.jpeg',
    category: 'food',
    description: 'Traditional flavors in Hohentwiel'
  },
  {
    id: 'the-best-taste',
    title: 'The Best Taste',
    imageUrl: '/BAyLeafGallerypics2/The best taste in Singen, Germany.jpeg',
    category: 'food',
    description: 'The finest taste experience in Germany'
  },
  {
    id: 'the-singens-first',
    title: 'The Singen\'s First',
    imageUrl: '/BAyLeafGallerypics2/The singen\'s First south indian restaurant.jpeg',
    category: 'restaurant',
    description: 'Singen\'s first South Indian restaurant'
  },
  {
    id: 'topnotch-dosa',
    title: 'Topnotch Dosa',
    imageUrl: '/BAyLeafGallerypics2/Topnotch Dosa in singen,Germany.jpeg',
    category: 'food',
    description: 'Top-quality dosa in Singen, Germany'
  }
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 9);

  const categories = ['all', 'food', 'restaurant'];

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
    // Log which images are failing to load for debugging
    console.log(`Failed to load image: ${imageId}`, galleryData.find(item => item.id === imageId)?.imageUrl);
  };

  const ImageComponent = ({ item, className, ...props }: { item: GalleryItem; className?: string; [key: string]: any }) => {
    const hasError = imageErrors.has(item.id);
    
    if (hasError) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <div className="text-center p-4">
            <Image className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-500 text-xs">{item.title}</p>
            <p className="text-red-500 text-xs mt-1">Image failed to load</p>
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
        onLoad={() => console.log(`Successfully loaded: ${item.title}`)}
        loading="lazy"
        {...props}
      />
    );
  };

  return (
    <section id="gallery" className="relative py-24" style={{ backgroundColor: '#ffd647' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center mb-4"
          >
            <Image className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">Our Visual Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Take a visual journey through our restaurant, cuisine, and cultural events
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center flex-wrap gap-4 my-12"
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
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
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
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          ref={galleryRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6"
          layout
        >
          <AnimatePresence>
            {displayedImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => setSelectedImage(item)}
                className="cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                  <ImageComponent
                    item={item}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-center p-2">
                      <h3 className="text-white font-display text-xs sm:text-sm md:text-base mb-1">{item.title}</h3>
                      <p className="text-white/80 text-xs hidden sm:block">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More/Less Button */}
        {filteredImages.length > 9 && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-spice-600 text-white rounded-full font-medium hover:bg-spice-700 transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <>
                  <EyeOff size={18} />
                  View Less
                </>
              ) : (
                <>
                  <Eye size={18} />
                  View More ({filteredImages.length - 9} more items)
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Scroll Down Indicator - positioned after gallery */}
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
            <span className="text-sm uppercase tracking-wider mb-2">Book Your Experience</span>
            <ChevronDown size={20} />
          </Link>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
                <ImageComponent
                  item={selectedImage}
                  className="w-full max-h-[70vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-display mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                  <span className="text-sm text-gray-500 mt-2 block capitalize">
                    Category: {selectedImage.category}
                  </span>
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