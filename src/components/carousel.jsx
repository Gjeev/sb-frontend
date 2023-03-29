import React, { useState } from "react";
import "../css/carousel.css";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageHeight, setMainImageHeight] = useState(400);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setMainImageHeight(400);
  };

  const handleMainImageClick = () => {
    setMainImageHeight(600);
  };

  return (
    <div className="carousel-container">
      <img
        className="main-image"
        src={images[currentImageIndex]}
        alt="Main display"
        style={{ height: mainImageHeight }}
        onClick={handleMainImageClick}
      />
      <div className="thumbnails-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`thumbnail ${index === currentImageIndex && "active"}`}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
