/**
 * Trang Đăng Nhập
 * 
 * Component này xử lý quá trình đăng nhập người dùng, bao gồm:
 * - Đăng nhập bằng username hoặe email
 * - Xác thực thông tin người dùng
 * - Lưu trữ thông tin phiên đăng nhập
 */

// --- IMPORTS ---
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  Divider,
  useTheme,
  alpha,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { userService } from "@/services/userService";
import localStorageUtil from "@/utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import notification from "@/utils/notification";

// --- ICONS ---
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";

/**
 * Component chính Trang Đăng Nhập
 */
const LoginPage = () => {
  // --- THEME & STYLES ---
  const theme = useTheme();

  // --- STATE MANAGEMENT ---
  // Form data state
  const [formData, setFormData] = useState({
    usernameOrEmail: "", // Hỗ trợ cả username và email
    password: "",
  });

  // UI states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- LIFECYCLE HOOKS ---
  /**
   * Kiểm tra trạng thái đăng nhập khi component được tải
   */
  useEffect(() => {
    // Kiểm tra xem có dữ liệu người dùng trong localStorage không
    const userData = localStorageUtil.get("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  // --- EVENT HANDLERS ---
  /**
   * Xử lý đăng nhập
   */
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.usernameOrEmail) {
      notification.error("Lỗi đăng nhập", "Vui lòng nhập username hoặc email");
      return;
    }
    
    if (!formData.password) {
      notification.error("Lỗi đăng nhập", "Vui lòng nhập mật khẩu");
      return;
    }

    setLoading(true);

    // Chuẩn bị dữ liệu để gửi đến server
    const loginData = {
      // Server sẽ tự động phát hiện đây là username hay email
      username: formData.usernameOrEmail,
      email: formData.usernameOrEmail,
      password: formData.password,
    };

    userService
      .login(loginData)
      .then((response) => {
        if (response.success) {
          // Lưu thông tin người dùng vào localStorage
          localStorageUtil.set("user", response.data);

          // Lưu thông báo đăng nhập thành công vào localStorage để hiển thị ở homepage
          localStorageUtil.set("loginSuccessMessage", {
            title: "Đăng nhập thành công",
            message: `Chào mừng ${response.data.username} trở lại!`,
            timestamp: Date.now()
          });

          // Chuyển hướng về trang chủ ngay lập tức
          window.location.href = "/";
        } else {
          notification.error("Đăng nhập thất bại", response.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        notification.error(
          "Đăng nhập thất bại", 
          error.message || "Có lỗi xảy ra khi đăng nhập"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Xử lý thay đổi giá trị form
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Xử lý toggle hiển thị/ẩn mật khẩu
   */
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // --- RENDER METHODS ---
  /**
   * Hiển thị giao diện khi người dùng đã đăng nhập
   */
  if (isLoggedIn && user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            background: `linear-gradient(145deg, ${alpha(
              theme.palette.success.light,
              0.1
            )}, ${alpha(theme.palette.background.paper, 1)})`,
            boxShadow: `0 8px 24px ${alpha(theme.palette.success.dark, 0.15)}`,
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: theme.palette.success.main,
              width: 90,
              height: 90,
              boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.4)}`,
            }}
            src={user.avatarUrl || undefined}
          >
            {!user.avatarUrl && user.username?.charAt(0).toUpperCase()}
          </Avatar>
          
          <Typography
            variant="h4"
            sx={{
              mt: 3,
              fontWeight: "bold",
              color: theme.palette.success.main,
            }}
          >
            Xin chào, {user.username}!
          </Typography>
          
          <Typography
            variant="body1"
            sx={{ mt: 2, mb: 4, textAlign: "center", fontSize: "1.1rem" }}
          >
            Bạn đã đăng nhập thành công
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/";
            }}
            startIcon={<HomeIcon />}
            sx={{
              mb: 2,
              py: 1.5,
              px: 4,
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            Đi đến trang chủ
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorageUtil.remove("user");
              setIsLoggedIn(false);
              setUser(null);
              notification.info("Đăng xuất", "Bạn đã đăng xuất khỏi hệ thống");
            }}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontWeight: "medium",
              textTransform: "none",
              fontSize: "0.95rem",
            }}
          >
            Đăng xuất
          </Button>
        </Paper>
      </Container>
    );
  }

  /**
   * Hiển thị form đăng nhập
   */
  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      {/* Card chính */}
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 4,
          background: `linear-gradient(145deg, ${alpha(
            theme.palette.primary.light,
            0.08
          )}, ${alpha(theme.palette.background.paper, 1)})`,
          boxShadow: `0 10px 40px ${alpha(theme.palette.primary.dark, 0.15)}`,
          overflow: 'hidden',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
          }
        }}
      >
        {/* Header */}
        <Avatar
          sx={{
            m: 1,
            bgcolor: theme.palette.primary.main,
            width: 70,
            height: 70,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          color="primary.main"
          sx={{ mt: 1.5, mb: 0.5 }}
        >
          Đăng nhập
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          mb={3}
          textAlign="center"
        >
          Nhập thông tin của bạn để truy cập hệ thống
        </Typography>

        {/* Form đăng nhập */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: "100%" }}
        >
          {/* Card chứa form */}
          <Card 
            variant="outlined" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              p: 1,
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              background: alpha(theme.palette.primary.light, 0.02)
            }}
          >
            <CardContent>
              {/* Username hoặc Email */}
              <TextField
                label="Username hoặc Email"
                name="usernameOrEmail"
                fullWidth
                margin="normal"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                variant="outlined"
                required
                autoFocus
                placeholder="Nhập username hoặc email của bạn"
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
              />

              {/* Mật khẩu */}
              <TextField
                label="Mật khẩu"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
              />

              {/* Link quên mật khẩu */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ 
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                        color: theme.palette.primary.dark,
                      }
                    }}
                  >
                    Quên mật khẩu?
                  </Typography>
                </Link>
              </Box>
            </CardContent>
          </Card>

          {/* Nút đăng nhập */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            startIcon={<LoginIcon />}
            sx={{
              py: 2,
              mt: 2,
              fontWeight: "bold",
              borderRadius: 3,
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
              fontSize: "1.1rem",
              textTransform: "none",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              "&:hover": {
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.dark, 0.35)}`,
                transform: "translateY(-2px)",
                transition: "all 0.3s",
              },
              "&:disabled": {
                background: theme.palette.action.disabled,
                transform: "none",
              }
            }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Link đăng ký */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link
              to="/register"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{
                  fontWeight: 500,
                  textAlign: "center",
                  "&:hover": {
                    textDecoration: "underline",
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                Bạn chưa có tài khoản? Đăng ký
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
