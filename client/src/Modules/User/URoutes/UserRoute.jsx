import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UHome from "../UComponents/UHome";
import Topbar from "../UComponents/Topbar";
import AboutPage from "../UComponents/AboutPage";
import HomePage from "../UComponents/HomePage";
import Register from "../UComponents/Register";
import Products from "../UComponents/Products";
import Login from "../UComponents/Login";
import ProductDetails from "../UComponents/ProductDetails";
import MyProfile from "../UComponents/MyProfile";
import Bookingform from "../UComponents/Bookingform";
import UserProtectedRoute from "../UComponents/UserProtectedRoute";

function AppContent() {
  const location = useLocation();
  const hidetopbar = ["/login", "/register"];
  return (
    <div>
      {!hidetopbar.includes(location.pathname) && <Topbar />}
      <Routes>
        {/* <Route index element={<HomePage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/uhome" element={<UHome />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/getprofile"
          element={
            <UserProtectedRoute>
              <MyProfile />
            </UserProtectedRoute>
          }
        />
        <Route path="/bookingform/:productId" element={<Bookingform />} />
      </Routes>
    </div>
  );
}

export default function UserRoute() {
  return (
    <div>
      <AppContent />
    </div>
  );
}
