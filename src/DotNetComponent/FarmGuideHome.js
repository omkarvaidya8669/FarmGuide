import React from 'react';
// import { Row } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../photos/Welcome.jpg"

const FarmGuideHomePage = () => {
  const myStyle = {
    backgroundImage:`url(${background})`,
    height: "97.5vh",
    marginTop: "-7px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};
  return (
    <div style={myStyle}>
    </div>
  );
}

export default FarmGuideHomePage;