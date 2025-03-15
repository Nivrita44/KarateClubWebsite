import React from "react";

const Gallery = () => {
  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Achievements Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Gallery Images */}
          {[
            "https://clubs.daffodilvarsity.edu.bd/gallery/photos/289ea30aa7d95902406cfe1ee5d46dcb.png",
            "https://clubs.daffodilvarsity.edu.bd/gallery/photos/cd29db27eb8732a356d23b14e5c8ddce.png",
            "https://clubs.daffodilvarsity.edu.bd/gallery/photos/0b03e2490d45f23274ecaaf08a1476b9.png",
            "https://clubs.daffodilvarsity.edu.bd/gallery/photos/ea8495cd5f240303e8c9fe7c1384c160.png",
          ].map((image, index) => (
            <div key={index} className="relative group">
              <a href={image} target="_blank" rel="noopener noreferrer">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-56 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
