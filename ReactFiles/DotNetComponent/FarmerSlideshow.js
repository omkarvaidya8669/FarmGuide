import React, { useState, useEffect } from 'react';
import '../css/Slideshow.css';
import image1 from '../photos/Farmer_home1.jpg'
import image2 from '../photos/Farmer_home2.jpg'
import image3 from '../photos/Farmer_home3.jpg'
import image4 from '../photos/Farmer_home4.jpg'

const FarmerSlideshow = () => {
  const images = [
    image1, image2, image3, image4
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow ${index + 1}`}
          className={`slideshow-image ${
            index === currentIndex ? 'slideshow-image-active' : ''
          }`}
        />
      ))}
       <div>
  </div>
    </div>
  );
};

export default FarmerSlideshow;
