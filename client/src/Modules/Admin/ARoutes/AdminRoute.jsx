import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import AHome from "../AComponents/AHome";
import Sidebar from "../AComponents/Sidebar";
import AdminLogin from "../AComponents/AdminLogin";
import ViewUser from "../AComponents/ViewUser";
import ViewProduct from "../AComponents/ViewProduct";
import AddProduct from "../AComponents/AddProduct";
import AddCategory from "../AComponents/AddCategory";
import ViewCategory from "../AComponents/ViewCategory";
import UpdateCategory from "../AComponents/UpdateCategory";
import UpdateProduct from "../AComponents/UpdateProduct";
import ManageCategories from "../AComponents/ManageCategories";
import UpdateUser from "../AComponents/UpdateUser";

export default function AdminRoute() {
  const token = localStorage.getItem("AdminToken");

  // ❌ NOT LOGGED IN → show only login page
  if (!token) {
    return <Navigate to="/admin/login" />;

  }

  // ✅ LOGGED IN → show admin panel
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "260px" }}>
        <Routes>
          <Route index element={<AHome />} />
          <Route path="/dashboard" element={<AHome />} />
          <Route path="/users" element={<ViewUser />} />
          <Route path="/products" element={<ViewProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/view" element={<ViewCategory />} />
          <Route path="/category/update/:id" element={<UpdateCategory />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/ManageCategories" element={<ManageCategories />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
}