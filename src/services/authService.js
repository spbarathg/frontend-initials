// Mock data for development
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
];

// Service functions
export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      // const { user, token } = response.data;
      
      // For now, use mock data
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const token = 'mock-jwt-token';
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

  // Register new user (admin only)
  registerUser: async (userData) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.post('/auth/register', userData);
      // return response.data;
      
      // For now, handle mock data
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'user'
      };
      mockUsers.push(newUser);
      return newUser;
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