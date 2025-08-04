import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Singup } from "../Pages/Singup";
import { Protected } from "../Component/Protected";
import AddProductForm from "../Pages/AddProductForm";
import UpdateProductForm from "../Pages/UpdateProductForm";
import AddAddressForm from "../Pages/AddAddress";
import Blog from "../Component/HomeComponent/Blog";
import Contact from "../Component/HomeComponent/Contact";

export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    sessionStorage.getItem("token") || false
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/search" element={<Sear/ />} /> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/update-product/:id" element={<UpdateProductForm />} />
        <Route path="/add-address" element={<AddAddressForm />} />
        <Route
          path="/checkout"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CheckOut />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};
