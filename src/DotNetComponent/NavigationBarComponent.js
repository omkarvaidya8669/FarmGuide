// import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
// import FarmGuideHomePage from './FarmGuideHome';
// import LoginComponent from './LoginPage';
// import WholesalerRegistration from './WholesalerRegistration';
// import FarmerRegistration from './FarmerRegistration';
// import "./NavigationBar.css"
// import FarmerHome from './FarmerHome';
// import WholesalerHome from './WholesalerHome';
// import AdminHome from './AdminHome';

// export default function NavigationBar1(){

//     const navigate = useNavigate();

//     const handleSelectChange = (event) => {
   
//         const value = event.target.value;
//         if(value === "Farmer"){
//           navigate('/farmer/registration');
//         }
//         else if(value === "Wholesaler"){
//           navigate('/wholesaler/registration');
//         }
//       };

//     return (
//         <div>
//   <Navbar bg="dark" variant="light" expand="lg">
    
//   {/* <Container> */}
//   <ul className='nav navbar'>
//   <Navbar.Brand href="/" style={{color:'white'}}>FarmGuide</Navbar.Brand>
//     <li className='nav-item'>
//         <Link className='nav-link px-4' to="/">Home</Link>
//     </li>
//     <li className='nav-item'>
//         <Link className='nav-link px-4' to="/login">Login</Link>
//     </li>
//     <li className='nav-item'>
//      <select className="custom-select-no-arrow" id="dropdown" style={{color:'#0d6efd', background: '#2a2a2a'}} onChange={handleSelectChange}>
//         <option value="">Register</option>
//         <option value="Farmer">Farmer</option>
//         <option value="Wholesaler">Wholesaler</option>
//      </select>
//     </li>
//     <li className='nav-item'>
//       <Link className='nav-link px-4' to="/learn">Learn</Link>
//     </li>
//     <li className='nav-item'>
//       <Link className='nav-link px-4' to="/contact">Contact</Link>
//     </li>
//     </ul>
//   {/* </Container> */}
// </Navbar>
// <Routes>
//   <Route path="/" element ={<FarmGuideHomePage />}></Route>
//   <Route path="/login" element ={<LoginComponent />}></Route>
//   <Route path="/farmer/registration" element ={<FarmerRegistration />}></Route>
//   <Route path="/wholesaler/registration" element ={<WholesalerRegistration />}></Route>
//   <Route path="/farmer/home" element ={<FarmerHome />}></Route>
//   <Route path="/wholesaler/home" element ={<WholesalerHome />}></Route>
//   <Route path="/admin/home" element ={<AdminHome />}></Route>
// </Routes>
// </div>
// )}