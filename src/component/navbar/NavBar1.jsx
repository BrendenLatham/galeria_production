// NavBar.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShopContext } from "../../app/cart/context/shop-context";
import { CartItem } from "../../app/cart/cart-test";

const NavBar1 = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchBox, setSearchBox] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const { cartItems } = useContext(ShopContext);

  const toggleCart = () => setShowCart(!showCart);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchBox.trim()) {
      navigate("/search-result", { state: { query: searchBox } });
    }
  };

  const handleNavigate = (path, event) => {
    event?.preventDefault();
    navigate(path);
  };

  // Refs for the dropdowns
  const pagesDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pagesDropdownRef.current && !pagesDropdownRef.current.contains(event.target)) {
        setShowPagesDropdown(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on navigation
  useEffect(() => {
    setShowPagesDropdown(false);
    setShowMoreDropdown(false);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-style p-0"
      data-bs-theme="dark"
      style={{ position: 'fixed', width: '100%', zIndex: '1' }}>
        <div className="container-fluid" style={{ height: "80px" }}>
        <a className="navbar-brand" href="/" onClick={() => navigate("/")}>
            <h1>Galeria</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown" ref={pagesDropdownRef}>
                <button
                  className="btn btn-secondary dropdown-toggle pages-dropdown"
                  type="button"
                  onClick={() => setShowPagesDropdown(!showPagesDropdown)}
                >
                  <i className="fa fa-home" aria-hidden="true"></i>
                  &nbsp;Pages
                </button>
                <ul className={`dropdown-menu ${showPagesDropdown ? "show" : ""}`}>
                  <li><button className="dropdown-item" onClick={() => handleNavigate('/')}>Home</button></li>
                  <li><button className="dropdown-item" onClick={() => handleNavigate('/artist')}>Artist</button></li>
                  <li><button className="dropdown-item" onClick={() => handleNavigate('/art')}>Art</button></li>
                </ul>
              </li>
            </ul>
            <div className="mx-auto search-box">
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                />
                <button className="btn btn-outline-light searchshowmore" type="submit">Search</button>
              </form>
            </div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown" ref={moreDropdownRef}>
                <button
                  className="btn btn-secondary dropdown-toggle btn-account"
                  type="button"
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                >
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </button>
                <ul className={`dropdown-menu dropdown-style ${showMoreDropdown ? "show" : ""}`} aria-labelledby="navbarDropdownMoreLink">
                  <li><button className="dropdown-item" onClick={() => user ? handleNavigate(`/AccountPage/${user.username}`) : handleNavigate('/LoginPage')}>{user ? "Account" : "Log In"}</button></li>
                  <li><button className="dropdown-item" onClick={() => handleNavigate('/saved')}>Saved for later</button></li>
                  <li><button className="dropdown-item" onClick={() => handleNavigate('/Info')}>Info</button></li>
                </ul>
              </li>
              <li className="nav-item">
                <button className="btn btn-light btn-cart" onClick={toggleCart}>
                  <i className="fas fa-shopping-cart">&nbsp;</i>({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showCart && <CartItem />}
    </React.Fragment>
  );
};

export default NavBar1;


