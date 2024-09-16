import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WrapperNavbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import ProductList from "./Components/Product/ProductList";
import Contact from "./Components/Contact/Contact";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer/Footer";
import ProductDetails from "./Components/Product/ProductDetails";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./Components/Cart/CheckOut";
import ProfilePage from "./Components/Navbar/ProfilePage";
import WishlistPage from "./Components/Cart/WishlistPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <WrapperNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Product" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
