/**
 * Form Đăng Ký Người Dùng
 * 
 * Component này xử lý quá trình đăng ký người dùng mới, bao gồm:
 * - Nhập thông tin cá nhân và tài khoản
 * - Xác thực email bằng mã xác nhận
 * - Gửi dữ liệu đăng ký đến server
 */

// --- IMPORTS ---
import localStorageUtil from "@/utils/localStorage";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  useTheme,
  alpha,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import notify from "@/utils/notification";
import { Link } from "react-router-dom";

// --- ICONS ---
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// --- SERVICES & UTILS ---
import { styled } from "@mui/material/styles";
import { userService } from "@/services/userService";

/**
 * Component chính Form Đăng Ký
 */
const RegisterForm = () => {
  // --- THEME & STYLES ---
  const theme = useTheme();
  
  // --- STATE MANAGEMENT ---
  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    verificationCode: "",
  });
  
  // UI states
  const [isCodeButtonDisabled, setCodeButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    confirmPassword: "",
  });

  // --- LIFECYCLE HOOKS ---
  /**
   * Kiểm tra trạng thái đăng nhập khi component được render
   */
  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const userData = localStorageUtil.get("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
    
    // Cleanup function khi component unmount
    return () => {
      // Xóa tất cả các interval để tránh memory leak
      const intervalId = setInterval(() => {}, 100);
      for (let i = 1; i <= intervalId; i++) {
        clearInterval(i);
      }
    };
  }, []);

  // --- EVENT HANDLERS ---
  /**
   * Xử lý thay đổi giá trị của các trường input
   */
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật formData
    setFormData({ ...formData, [name]: value });

    // Reset lỗi khi người dùng thay đổi giá trị
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  
  /**
   * Xử lý toggle hiển thị/ẩn mật khẩu
   */
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  /**
   * Xử lý toggle hiển thị/ẩn xác nhận mật khẩu
   */
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  /**
   * Xử lý submit form đăng ký
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường và hiển thị thông báo lỗi
    if (!formData.username) {
      notify.error("Lỗi đăng ký", "Vui lòng nhập tên đăng nhập");
      return;
    }

    if (!formData.password) {
      notify.error("Lỗi đăng ký", "Vui lòng nhập mật khẩu");
      return;
    }

    if (!formData.fullName) {
      notify.error("Lỗi đăng ký", "Vui lòng nhập họ tên đầy đủ");
      return;
    }

    if (!formData.email) {
      notify.error("Lỗi đăng ký", "Vui lòng nhập email");
      return;
    }

    if (!formData.verificationCode) {
      notify.error("Lỗi đăng ký", "Vui lòng nhập mã xác nhận");
      return;
    }

    // Kiểm tra confirm password có trùng khớp không
    if (confirmPassword !== formData.password) {
      notify.error("Lỗi đăng ký", "Mật khẩu xác nhận không trùng khớp");
      return;
    }

    // Gửi form đăng ký đến server
    userService
      .register(formData)
      .then((response) => {
        if (response.success) {
          notify.success(
            "Đăng ký thành công",
            "Tài khoản của bạn đã được tạo thành công, sẽ chuyển đến trang đăng nhập trong giây lát"
          );
          // Chuyển hướng về trang đăng nhập sau một khoảng thời gian ngắn
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          // Nếu có lỗi từ server (không vào catch nhưng success = false)
          const errorMessage = response.message || "Có lỗi xảy ra khi đăng ký";
          notify.error("Đăng ký thất bại", errorMessage);
        }
      })
      .catch((error) => {
        // Response từ server là một object, message là một field trong object đó
        const errorMessage = error.message || "Có lỗi xảy ra khi đăng ký";

        // Phân tích message để xác định loại lỗi và hiển thị thông báo tương ứng
        if (errorMessage.includes("Username already exists")) {
          notify.error("Đăng ký thất bại", "Username đã tồn tại");
        } else if (errorMessage.includes("Email already exists")) {
          notify.error("Đăng ký thất bại", "Email đã được sử dụng");
        } else if (errorMessage.includes("verification code")) {
          notify.error(
            "Lỗi xác thực",
            "Mã xác nhận không đúng hoặc đã hết hạn. Vui lòng yêu cầu mã mới."
          );
        } else {
          notify.error("Đăng ký thất bại", errorMessage);
        }
        console.error("Register error:", error);
      });
  };
  
  /**
   * Xử lý thay đổi giá trị xác nhận mật khẩu
   */
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Kiểm tra xem mật khẩu xác nhận có khớp với mật khẩu không
    if (value && value !== formData.password) {
      // Chỉ lưu lỗi trong state nhưng không hiển thị dưới text field
      setErrors({
        ...errors,
        confirmPassword: "Mật khẩu xác nhận không trùng khớp",
      });
    } else {
      setErrors({
        ...errors,
        confirmPassword: "",
      });
    }
  };
  
  /**
   * Xử lý gửi mã xác nhận đến email
   */
  const sendVerificationCode = (e) => {
    // Kiểm tra email đã nhập chưa
    if (formData.email === "") {
      notify.error("Lỗi", "Vui lòng nhập email để gửi mã xác nhận");
      return;
    }
    
    // Disable nút và bắt đầu đếm ngược
    setCodeButtonDisabled(true);
    setCountdown(60);
    
    // Tạo interval để đếm ngược
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalId);
          setCodeButtonDisabled(false);
          return 60;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Kiểm tra các trường bắt buộc
    if (
      !formData.username ||
      !formData.password ||
      !formData.fullName ||
      !formData.email
    ) {
      notify.error("Lỗi", "Vui lòng điền đầy đủ thông tin");
      clearInterval(intervalId);
      setCodeButtonDisabled(false);
      return; // Dừng việc submit form nếu có trường nào đó trống
    }

    // Gọi API gửi mã xác nhận
    userService
      .sendCode(formData.email)
      .then((response) => {
        if (response.success) {
          notify.success(
            "Gửi mã thành công",
            "Mã xác nhận đã được gửi đến email của bạn"
          );
        } else {
          notify.error(
            "Gửi mã thất bại",
            response.message || "Có lỗi xảy ra"
          );
          clearInterval(intervalId);
          setCodeButtonDisabled(false);
        }
      })
      .catch((error) => {
        console.error("Send code error:", error);
        notify.error(
          "Lỗi kết nối",
          "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
        );
        clearInterval(intervalId);
        setCodeButtonDisabled(false);
      });
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
              theme.palette.primary.light,
              0.1
            )}, ${alpha(theme.palette.background.paper, 1)})`,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.dark, 0.15)}`,
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
              color: theme.palette.primary.main,
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
              notify.info("Đăng xuất", "Bạn đã đăng xuất khỏi hệ thống");
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
   * Hiển thị giao diện form đăng ký
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
          Đăng ký tài khoản
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          mb={3}
          textAlign="center"
        >
          Điền thông tin của bạn để trải nghiệm dịch vụ chăm sóc sức khỏe
        </Typography>

        {/* Form đăng ký */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          {/* Thông tin tài khoản */}
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
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ 
                  mb: 2, 
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <AccountCircleIcon fontSize="small" /> Thông tin tài khoản
              </Typography>

              {/* Username */}
              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleOnChange}
                variant="outlined"
                required
                autoFocus
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

              {/* Mật khẩu và xác nhận */}
              <Grid container spacing={2}>
                {/* Mật khẩu */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mật khẩu"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleOnChange}
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
                    sx={{ mb: 1 }}
                  />
                </Grid>
                
                {/* Xác nhận mật khẩu */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    variant="outlined"
                    required
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      sx: { borderRadius: 2 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon color="action" sx={{ opacity: 0.7 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggleConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 1 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Thông tin cá nhân */}
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
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ 
                  mb: 2, 
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <PersonIcon fontSize="small" /> Thông tin cá nhân
              </Typography>

              {/* Họ tên */}
              <TextField
                label="Họ và tên đầy đủ"
                name="fullName"
                fullWidth
                margin="normal"
                value={formData.fullName}
                onChange={handleOnChange}
                variant="outlined"
                required
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

              {/* Email */}
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleOnChange}
                variant="outlined"
                required
                InputProps={{
                  sx: { borderRadius: 2 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon color="action" sx={{ opacity: 0.7 }} />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 2 }}
              />

              {/* Mã xác nhận */}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      label="Mã xác nhận"
                      name="verificationCode"
                      fullWidth
                      margin="normal"
                      value={formData.verificationCode}
                      onChange={handleOnChange}
                      variant="outlined"
                      required
                      InputProps={{
                        sx: { borderRadius: 2 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <VerifiedUserIcon color="action" sx={{ opacity: 0.7 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      size="large"
                      onClick={sendVerificationCode}
                      disabled={isCodeButtonDisabled}
                      startIcon={<EmailIcon />}
                      sx={{
                        height: 56,
                        fontWeight: "bold",
                        borderRadius: 2,
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.success.main,
                          0.25
                        )}`,
                        textTransform: "none",
                      }}
                    >
                      {isCodeButtonDisabled ? `Đợi ${countdown}s` : "Gửi mã"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          {/* Nút đăng ký */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
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
            }}
          >
            Đăng Ký
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Link đăng nhập */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link
              to="/login"
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
                Bạn đã có tài khoản? Đăng nhập
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
