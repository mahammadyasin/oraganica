import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import * as Scroll from "react-scroll";

// Or Access Link,Element,etc as follows
let ScrollLink = Scroll.Link;

export const Header = () => {
  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  const [showSearch, setShowSearch] = useState(false);
  const role = sessionStorage.getItem("role");
  // console.log("role", role);
  const navigate = useNavigate();
  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const handalLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setislogin(false);
    navigate(`/`);
  };
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <header className="header" data-header="">
      <div className="nav-wrapper">
        <div className="container">
          <h1 className="h1">
            <a href="/" className="logo">
              Organ<span className="span">ica</span>
            </a>
          </h1>

          <nav className="navbar" data-navbar="">
            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              data-nav-close-btn="close-outline"
            >
              <ion-icon name="close-outline" />
            </button>
            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="navbar-link">
                  About
                </a>
              </li>
              <li>
                {/* <Link to="/shop" activeClass="active" className="navbar-link"  >
            Shop
              </Link> */}
                <a href="/shop" className="navbar-link">
                  Shop
                </a>
              </li>
              <li>
                <a href="/blog" className="navbar-link">
                  Blog
                </a>
              </li>
              {role === "ADMIN" ? (
                <li>
                  <Link
                    activeClass="active"
                    className="navbar-link"
                    smooth="linear"
                    spy
                    to="add-product"
                    offset={-30}
                  >
                    Product
                  </Link>
                </li>
              ) : null}
              <li>
                <a href="/contact" className="navbar-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-action">
            <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Toggle search"
                data-search-btn=""
                onClick={toggleSearch}
              >
                <ion-icon name="search-outline" className="search-icon" />
                {/* <ion-icon name="close-outline" className="close-icon" /> */}
              </button>
              {/* <div className="input-wrapper">
                <input
                  type="search"
                  name="search"
                  placeholder="Search here"
                  className="search-input"
                />
                <button className="search-submit" aria-label="Submit search">
                  <ion-icon name="search-outline" />
                </button>
              </div> */}
              {showSearch && (
                <div className="input-wrapper">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search here"
                    className="search-input"
                  />
                  <button className="search-submit" aria-label="Submit search">
                    <ion-icon name="search-outline" />
                  </button>
                </div>
              )}
            </div>
            {/* //whishlist */}
            {/* {islogin ? (
              <button
                className="header-action-btn"
                aria-label="Open whishlist"
                data-panel-btn="whishlist"
              >
                <ion-icon name="heart-outline" />
                <data className="btn-badge" value={3}>
                  03
                </data>
              </button>
            ) : (
              <></>
            )} */}
            {!islogin ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>
            ) : (
              <>
                <button
                  className="header-action-btn"
                  aria-label="Open shopping cart"
                  data-panel-btn="cart"
                  onClick={handalRedirect}
                >
                  <ion-icon name="basket-outline" />
                  <data className="btn-badge" value={2}>
                    02
                  </data>
                </button>
              </>
            )}
            {islogin ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={() => handalLogout()}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
