import apiClient from "@services/api";

// Service cho các API liên quan đến người dùng
export const userService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/users/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng ký
  register: async (userData) => {
    try {
      const response = await apiClient.post("/users/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/profile");
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
  sendCode: async (email) => {
    try {
      const response = await apiClient.post("/users/send-verification", {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
