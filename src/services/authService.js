import api from './api';

// Service functions
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/api/login/', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/api/register/', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Update user (admin only)
  updateUser: async (id, userData) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.put(`/auth/users/${id}`, userData);
      // return response.data;
      
      // For now, handle mock data
      const index = mockUsers.findIndex(user => user.id === id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
        return mockUsers[index];
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    try {
      // When backend is ready, replace with actual API call
      // await api.delete(`/auth/users/${id}`);
      
      // For now, handle mock data
      const index = mockUsers.findIndex(user => user.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
        return true;
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
}; 