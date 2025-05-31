import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const [index, setIndex] = useState(0);
  const images = [assets.karate1, assets.karate2, assets.karate3];

  // Automatically switch image every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // 3500 milliseconds = 3.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="w-full flex flex-col items-center mt-4 px-4">
      {/* Photo Slider Section */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
        <motion.img
          key={index}
          src={images[index]}
          alt="Karate Club"
          className="w-full h-full object-cover transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                index === i ? "bg-white-600" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
