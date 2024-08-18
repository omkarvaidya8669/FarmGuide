import './App.css';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHome from './DotNetComponent/AdminHome';
import FarmGuideHomePage from './DotNetComponent/FarmGuideHome';
import FarmerHome from './DotNetComponent/FarmerHome';
import WholesalerHome from './DotNetComponent/WholesalerHome';
import NavigationBar from './DotNetComponent/NavigationBar';
import WholesalerRegistration from './DotNetComponent/WholesalerRegistration';
import FarmerRegistration from './DotNetComponent/FarmerRegistration';
import LoginComponent from './DotNetComponent/LoginPage';
import LogoutComponent from './DotNetComponent/LogoutPage';
import AboutUs from './DotNetComponent/AboutusComponent';
import ContactUs from './SpringBootComponent/ContactComponent';
import Footer from './DotNetComponent/FooterComponent';
import AddProductFarmer from './SpringBootComponent/AddProductFarmerComponent';
import ViewProductsFarmer from './SpringBootComponent/ViewProductFarmerComponent';
import DeleteProductsFarmer from './SpringBootComponent/DeleteProductFarmer';
import ViewFarmers from './DotNetComponent/ViewFarmersComponent';
import ViewWholesalers from './DotNetComponent/ViewWholesalersComponent';
import BuyProduct from './SpringBootComponent/BuyProductComponent';
import AddProduct from './SpringBootComponent/AddProductComponent';
import ViewOrders from './SpringBootComponent/OrderComponent';
import ViewCart from './SpringBootComponent/CartComponent';
import FarmerOrders from './SpringBootComponent/FarmerOrdersComponent';
import AdminViewOrders from './SpringBootComponent/AdminOrdersComponent';


function App() {

  return (
    <div className="App">
      <header>
        <NavigationBar />
        <Routes>
            <Route path="/" element ={<FarmGuideHomePage />}></Route>
            <Route path="/home" element ={<FarmGuideHomePage />}></Route>
            <Route path="/login" element ={<LoginComponent />}></Route>
            <Route path="/farmer/registration" element ={<FarmerRegistration />}></Route>
            <Route path="/wholesaler/registration" element ={<WholesalerRegistration />}></Route>
            <Route path="/farmer/home" element ={<FarmerHome />}></Route>
            <Route path="/wholesaler/home" element ={<WholesalerHome />}></Route>
            <Route path="/admin/home" element ={<AdminHome />}></Route>
            <Route path="/logout" element={<LogoutComponent />}></Route>
            <Route path="/aboutus" element ={<AboutUs />}></Route>
            <Route path="/contact" element={<ContactUs />}></Route>
            <Route path="/farmer/addproduct" element={<AddProductFarmer />}></Route>
            <Route path="/farmer/products" element={<ViewProductsFarmer />}></Route>
            <Route path="/farmer/deleteproduct" element={<DeleteProductsFarmer />}></Route>
            <Route path="/viewfarmers" element={<ViewFarmers />}></Route>
            <Route path="/viewwholesalers" element={<ViewWholesalers />}></Route>
            <Route path="/wholesaler/buy" element={<BuyProduct />}></Route>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route path="/wholesaler/cart" element={<ViewCart />}></Route>
            <Route path="/farmer/orders" element={<FarmerOrders />}></Route>
            <Route path="/wholesaler/orders" element={<ViewOrders />}></Route>
            <Route path="/vieworders" element={<AdminViewOrders />}></Route>
          </Routes>
        </header>
      {/* <footer className='footertag'>
      <p style={{color:'black'}}>Copyright ©FarmGuide</p>
    </footer> */}
    <Footer />
    </div>
  );
}

export default App;