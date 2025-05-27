import apiClient from "./api";

// Service cho các API liên quan đến người dùng
export const userService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật thông tin người dùng
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put("/users/me", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
