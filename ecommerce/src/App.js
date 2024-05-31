import './App.css';
import Header from './components/Header';
import Home from './components/Home'
import About from './components/About'
import { useEffect } from 'react';
import Contact from './components/Contact'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout'
import Categories from './components/Categories';
import CategoryProducts from "./components/CategoryProducts";
import Product from './components/Product';
import Footer from './components/Footer';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
import { useDispatch, } from 'react-redux';
import { addItemsToWishlist } from './reduxtoolkit/WishlistSlice';
import { addToCart } from './reduxtoolkit/CartSlice';
import OrderDetails from './components/OrderDetails';
import Confirmation from './components/Confirmation';
import ProductItem from './components/ProductItem';
function App() {
  const apiUrl = "http://localhost:5000/products"; 
  const dispatch = useDispatch();

    useEffect(() => {
        console.log("sending");
        dispatch(addToCart(JSON.parse(localStorage.getItem("guestCartItems")) || {}));
        console.log(JSON.parse(localStorage.getItem("GuestWishListItems")));
        dispatch(addItemsToWishlist(JSON.parse(localStorage.getItem("GuestWishListItems")) || {})); 

    }, [dispatch]);
  return (
    <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product apiUrl={apiUrl} />} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderDetails/>} />
      <Route path="/confirmation" element={<Confirmation/>} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/products/category/:category" element={<CategoryProducts  />} />
      <Route path="/x" element={<ProductItem />} />
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
