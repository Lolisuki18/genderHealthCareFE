/**
 * routes.js - Cấu hình định tuyến của ứng dụng
 *
 * File này đảm nhiệm việc thiết lập và quản lý các đường dẫn URL trong ứng dụng.
 * Sử dụng React Router DOM để tạo hệ thống điều hướng đa trang mà không cần tải lại trang.
 *
 * Lý do tạo file:
 * - Tách biệt logic điều hướng khỏi các component khác, giúp dễ quản lý và mở rộng
 * - Cung cấp cấu trúc tập trung cho việc thêm trang mới và quản lý layout
 * - Áp dụng mô hình layout lồng nhau với Outlet từ React Router
 *
 * Cấu trúc route hiện tại:
 * - Layout chính bọc tất cả các trang con
 * - Trang chủ (HomePage) là trang mặc định
 * - NotFoundPage xử lý các URL không hợp lệ
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { NotFoundPage } from "@pages/NotFoundPage";
import MainLayout from "@layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* Add more routes here as your app grows */}
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
