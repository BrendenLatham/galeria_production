// src/App.js
import React from "react";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
//import "font-awesome/css/font-awesome.css";
import "bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import AdminPanel from "../panel";
import Content6 from "./home/content6";
import SearchResult from "./search-result/SearchResult";
import ProductPage from "./product-page/ProductPage";
import ShoppingCartPopup from "./cart/ShoppingCart";
import Layout from "./Layout";
import NavBar1 from "../component/navbar/NavBar1";
import Footer from "../component/footer/Footer";
import AccountPage from "./login/AccountPage";
import { CartItem } from "./cart/cart-test";
import Info from "../Info";
function App() {
  return (
    <div>
      <Layout>
        <Router>
          <NavBar1 />
          <br />
          <br />
          <br />
          <Routes>
            <Route path="/" element={<Content6 />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/panel" element={<AdminPanel />} />
            <Route path="/search-result" element={<SearchResult />} />
            <Route path="/product/:objectId" element={<ProductPage />} />
            <Route path="/AccountPage/:username" element={<AccountPage />} />
            <Route path="/ShoppingCartPopup" element={<ShoppingCartPopup />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/Info" element={<Info />} />

          </Routes>
        </Router>
      </Layout>
      <Footer></Footer>
    </div>
  );
}

export default App;
