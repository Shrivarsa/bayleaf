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

  {
    id: "img-1",
    title: "Affordable Indian foods in Singen",
    imageUrl: "/BAyLeafGallerypics1/Affordable%20Indian%20foods%20in%20Singen.webp",
    category: "food",
    description: "Image titled 'Affordable Indian foods in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-2",
    title: "AffordableIndianmealsinSingen",
    imageUrl: "/BAyLeafGallerypics1/AffordableIndianmealsinSingen.jpg",
    category: "food",
    description: "Image titled 'AffordableIndianmealsinSingen' showcasing our authentic offerings in food."
  },
  {
    id: "img-3",
    title: "Aloo palak ,Bestes Restaurant in Singen",
    imageUrl: "/BAyLeafGallerypics1/AloopalakBestesRestaurantinSingrn.jpg",
    category: "restaurant",
    description: "Image titled 'Aloo palak ,Bestes Restaurant in Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-4",
    title: "Authentisches traditionelles Restaurant in Singen",
    imageUrl: "/BAyLeafGallerypics1/Authentisches%20traditionelles%20Restaurant%20in%20Singen.jpg",
    category: "restaurant",
    description: "Image titled 'Authentisches traditionelles Restaurant in Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-5",
    title: "Beautiful Dining Restaurant in Deutschland",
    imageUrl: "/BAyLeafGallerypics1/BeautifulDiningRestaurantinDeutschland.jpg",
    category: "restaurant",
    description: "Image titled 'Beautiful Dining Restaurant in Deutschland' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-6",
    title: "Beautiful dining restaurant in singen, Deutschland",
    imageUrl: "/BAyLeafGallerypics1/BeautifuldiningrestaurantinsingenDeutschland.jpg",
    category: "restaurant",
    description: "Image titled 'Beautiful dining restaurant in singen, Deutschland' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-7",
    title: "Best aloo paratha, singen, Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/Best%20aloo%20paratha%2Csingen%2CHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Best aloo paratha, singen, Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-8",
    title: "Best nicht vegetarisch foods, Singen",
    imageUrl: "/BAyLeafGallerypics1/Best%20nicht%20vegetarisch%20foods%2CSingen.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/chettinad%20chicken%20Traditional%20food%2CSingen.jpeg",
    category: "food",
    description: "Image titled 'chettinad chicken Traditional food, Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-11",
    title: "Chettinad Mutton Kuzhambu, Traditionliches singen",
    imageUrl: "/BAyLeafGallerypics1/Chettinad-Mutton-Kuzhambu%2CTraditionliches-singen.jpg",
    category: "food",
    description: "Image titled 'Chettinad Mutton Kuzhambu, Traditionliches singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-12",
    title: "chicken briyani Traditional food in Singen",
    imageUrl: "/BAyLeafGallerypics1/chicken%20briyani%20Traditional%20food%20in%20Singen.webp",
    category: "food",
    description: "Image titled 'chicken briyani Traditional food in Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-13",
    title: "chicken gongura In Singen, Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/chicken%20gongura%20In%20Singen%2CHohentwiel.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/Chicken-malai-kebab-chicken-reshmi-kebab-murg-malai.jpg",
    category: "food",
    description: "Image titled 'Chicken malai kebab chicken reshmi kebab murg malai' showcasing our authentic offerings in food."
  },
  {
    id: "img-17",
    title: "Das schöne Ambiente beim Essen, Singen",
    imageUrl: "/BAyLeafGallerypics1/Das%20sch%C3%B6ne%20Ambiente%20beim%20Essen%2CSingen.webp",
    category: "restaurant",
    description: "Image titled 'Das schöne Ambiente beim Essen, Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-18",
    title: "Ein traditionelles Restaurant in Singen",
    imageUrl: "/BAyLeafGallerypics1/Ein%20traditionelles%20Restaurant%20in%20Singen.jpg",
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
    id: "img-20",
    title: "eral fry in Singen, Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/eral%20fry%20in%20Singen%2CHohentwiel.jpg",
    category: "food",
    description: "Image titled 'eral fry in Singen, Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-21",
    title: "eral milagu, Traditinil foods, Singen pic",
    imageUrl: "/BAyLeafGallerypics1/eral%20milagu%2CTraditinil%20foods%2CSingen%20pic.jpg",
    category: "food",
    description: "Image titled 'eral milagu, Traditinil foods, Singen pic' showcasing our authentic offerings in food."
  },
  {
    id: "img-22",
    title: "eral thoku must try, Singen",
    imageUrl: "/BAyLeafGallerypics1/eral%20thoku%20must%20try%2CSingen.jpg",
    category: "food",
    description: "Image titled 'eral thoku must try, Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-23",
    title: "eral prawn pepper fry in Singen",
    imageUrl: "/BAyLeafGallerypics1/eral-prawn-pepper-fry%20in%20Singen.jpg",
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
    id: "img-25",
    title: "Gongura mutton Singen, August Ruf Straße",
    imageUrl: "/BAyLeafGallerypics1/Gongura%20mutton%20Singen%2CAugust-Ruf-Stra%C3%9Fe.webp",
    category: "food",
    description: "Image titled 'Gongura mutton Singen, August Ruf Straße' showcasing our authentic offerings in food."
  },

  {
    id: "img-26",
    title: "Murg-Malai-Kabab,Singen,August-Ruf-Straße",
    imageUrl: "/BAyLeafGallerypics1/Murg-Malai-Kabab%2CSingen%2CAugust-Ruf-Stra%C3%9Fe.jpg",
    category: "food",
    description: "Image titled 'Murg-Malai-Kabab,Singen,August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    id: "img-27",
    title: "mutton briyani Würzige Biryani,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton%20briyani%20W%C3%BCrzige%20Biryani%2CSingen.jpg",
    category: "food",
    description: "Image titled 'mutton briyani Würzige Biryani,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-28",
    title: "mutton kurma First of its kind foods,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton%20kurma%20First%20of%20its%20kind%20foods%2CSingen.jpg",
    category: "food",
    description: "Image titled 'mutton kurma First of its kind foods,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-29",
    title: "mutton vindaloo Nicht-vegetarische Gerichte,Singen",
    imageUrl: "/BAyLeafGallerypics1/mutton%20vindaloo%20Nicht-vegetarische%20Gerichte%2CSingen.webp",
    category: "food",
    description: "Image titled 'mutton vindaloo Nicht-vegetarische Gerichte,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-30",
    title: "panner pakoda Singen,August-Ruf-Straße",
    imageUrl: "/BAyLeafGallerypics1/panner%20pakoda%20Singen%2CAugust-Ruf-Stra%C3%9Fe.jpg",
    category: "food",
    description: "Image titled 'panner pakoda Singen,August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    id: "img-31",
    title: "paruppu keerai vegetarisches Gericht,Singen",
    imageUrl: "/BAyLeafGallerypics1/paruppu%20keerai%20vegetarisches%20Gericht%2CSingen.jpg",
    category: "food",
    description: "Image titled 'paruppu keerai vegetarisches Gericht,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-32",
    title: "paruppu rasam vegetarisches Gericht,Singen",
    imageUrl: "/BAyLeafGallerypics1/paruppu%20rasam%20vegetarisches%20Gericht%2CSingen.webp",
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
    imageUrl: "/BAyLeafGallerypics1/prawn%20curry%20best%20best%20sea%20foods%2CSingen.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/Sch%C3%B6nes%20Speisen%2CSingen%2CGermany.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/sea%20foods%2CSingen%2CGermany.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/South%20Indian%20Foods%2CSingen%2CAugust-Ruf-Stra%C3%9Fe.jpg",
    category: "food",
    description: "Image titled 'South Indian Foods,Singen,August-Ruf-Straße' showcasing our authentic offerings in food."
  },
  {
    id: "img-42",
    title: "Spicy south Indian foods in Singen",
    imageUrl: "/BAyLeafGallerypics1/Spicy%20south%20Indian%20foods%20in%20Singen.jpg",
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
    imageUrl: "/BAyLeafGallerypics1/Taste%20Aloo-Chana%2CSingen%2CHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Taste Aloo-Chana,Singen,Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-45",
    title: "Taste beef milagu,Singen Restaurant",
    imageUrl: "/BAyLeafGallerypics1/Taste%20beef%20milagu%2CSingen%20Restaurant.jpg",
    category: "restaurant",
    description: "Image titled 'Taste beef milagu,Singen Restaurant' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-46",
    title: "The best veg foods in singen,hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/The%20best%20veg%20foods%20in%20singen%2Chohentwiel.jpg",
    category: "food",
    description: "Image titled 'The best veg foods in singen,hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-47",
    title: "The best veg foods,Singen",
    imageUrl: "/BAyLeafGallerypics1/The%20best%20veg%20foods%2CSingen.jpg",
    category: "food",
    description: "Image titled 'The best veg foods,Singen' showcasing our authentic offerings in food."
  },
  {
    id: "img-48",
    title: "Traditionelle Küche Restaurant,Singen",
    imageUrl: "/BAyLeafGallerypics1/Traditionelle%20K%C3%BCche%20Restaurant%2CSingen.jpg",
    category: "restaurant",
    description: "Image titled 'Traditionelle Küche Restaurant,Singen' showcasing our authentic offerings in restaurant."
  },
  {
    id: "img-49",
    title: "Vegetable-Biryani,Singen,Hohentwiel",
    imageUrl: "/BAyLeafGallerypics1/Vegetable-Biryani%2CSingen%2CHohentwiel.jpg",
    category: "food",
    description: "Image titled 'Vegetable-Biryani,Singen,Hohentwiel' showcasing our authentic offerings in food."
  },
  {
    id: "img-50",
    title: "vendakiai kulambu like homemade,Singen",
    imageUrl: "/BAyLeafGallerypics1/vendakiai%20kulambu%20like%20homemade%2CSingen.jpg",
    category: "food",
    description: "Image titled 'vendakiai kulambu like homemade,Singen' showcasing our authentic offerings in food."
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

  const categories = ['all', 'food', 'restaurant', 'events'];

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set([...prev, imageId]));
  };

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