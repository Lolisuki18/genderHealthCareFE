/**
 * Header.js - Component thanh điều hướng phía trên của ứng dụng
 *
 * Component này tạo một thanh điều hướng (navigation bar) cố định ở trên cùng của ứng dụng,
 * chứa logo và các liên kết đến các trang chính.
 *
 * Lý do tạo file:
 * - Cung cấp điểm truy cập nhất quán đến các phần chính của ứng dụng
 * - Tăng UX bằng cách hiển thị rõ vị trí hiện tại của người dùng trong ứng dụng
 * - Áp dụng thiết kế responsive với Material UI để tự động điều chỉnh trên các thiết bị
 *
 * Các tính năng chính:
 * - Logo của ứng dụng với liên kết đến trang chủ
 * - Các nút điều hướng đến các trang chính
 * - Sử dụng Material UI để tạo giao diện hiện đại và responsive
 */

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Gender Health Care
          </Typography>

          <div style={{ flexGrow: 1 }} />

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/services">
            Services
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
