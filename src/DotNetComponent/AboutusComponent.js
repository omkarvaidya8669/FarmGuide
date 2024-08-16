import React from 'react';
import '../css/Aboutus.css';

export default function AboutUs() {
  return (
    <div className="about-us-container"style={{top:30}}>
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          Welcome to FarmGuide, your trusted online marketplace connecting farmers directly with consumers. 
          Our mission is to empower farmers by providing them with a platform to sell their produce directly 
          to customers, ensuring fair prices and fresh, high-quality crops.
        </p>
        <p>
          At FarmGuide, we believe in sustainable agriculture and supporting local farmers. We are committed 
          to bringing you fresh, locally-sourced produce while ensuring farmers get the best value for their 
          hard work. Whether you're looking for seasonal fruits, vegetables, grains, or organic options, 
          FarmGuide has you covered.
        </p>
        <p>
          Our platform is easy to use and secure, offering seamless transactions and reliable delivery 
          services. Join us in promoting a healthier, more sustainable future by supporting your local 
          farmers through FarmGuide.
        </p>
        <h3>Our Vision</h3>
        <p>
          To create a sustainable and transparent food system where farmers thrive, and wholesalers benefit with 
          fresh, quality produce at reasonable rates directly from farmers.
        </p>
        <h3>Our Mission</h3>
        <p>
          To bridge the gap between farmers and consumers by providing a reliable platform that ensures 
          fair trade and supports local agriculture.
        </p>
      </div>
    </div>
  );
}
