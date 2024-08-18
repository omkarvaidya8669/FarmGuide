import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>2024 ©FarmGuide. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  position: 'fixed',
  left: 0,
  bottom: -22,
  width: '100%',
  color: 'black',
  textAlign: 'left',
  padding: '10px',
};

export default Footer;
