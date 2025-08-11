import React, { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

import * as Scroll from "react-scroll";
import { URL } from "../Constants/Constants";

// Or Access Link,Element,etc as follows
let ScrollLink = Scroll.Link;

export const Header = () => {
  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartrCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const role = sessionStorage.getItem("role");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  // console.log("role", role);
  const navigate = useNavigate();
  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };
  console.log("check cart count================", cartCount);

  const fatchCart = async () => {
    // get cart item
    console.log(token);
    const res = await fetch(`${URL}/cart/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    console.log("check cart data==========", data.length);
    // setCartrCount(data);
    setCartrCount(data?.cartDetalis?.length || 0);
  };

  useEffect(() => {
    fatchCart();
  }, []);

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
            <NavLink to="/" className="logo">
              Organ<span className="span">ica</span>
            </NavLink>
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
                <NavLink to="/" className="navbar-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="navbar-link">
                  About
                </NavLink>
              </li>
              <li>
                {/* <Link to="/shop" activeClass="active" className="navbar-link"  >
            Shop
              </Link> */}
                <NavLink to="/shop" className="navbar-link">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="navbar-link">
                  Blog
                </NavLink>
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
                <NavLink to="/contact" className="navbar-link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="header-action">
            {/* <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Toggle search"
                data-search-btn=""
                onClick={toggleSearch}
              >
                <ion-icon name="search-outline" className="search-icon" />
              </button>
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
            </div> */}
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
            ) : role === "USER" ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="basket-outline" />
                <data className="btn-badge" value={2}>
                  {cartCount}
                </data>
              </button>
            ) : null}

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
