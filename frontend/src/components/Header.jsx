import { motion } from "framer-motion";
import React, { useState } from "react";
import { assets } from "../assets/assets";

const Header = () => {
  const [index, setIndex] = useState(0);
  const images = [assets.karate1, assets.karate2, assets.karate3];

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      {/* Photo Slider Section */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
        <motion.img
          key={index}
          src={images[index]}
          alt="Karate Club"
          className="w-full h-full object-cover transition-all duration-500"
        />
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                index === i ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
