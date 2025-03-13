import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// TODO: Remove mock data when integrating with real backend
// This is temporary mock data for development and testing purposes
const MOCK_USERS = [
  { id: '1', email: 'test@example.com', password: 'password123', isAdmin: false },
  { id: '2', email: 'user@example.com', password: 'password123', isAdmin: false }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
  // Check for saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      console.log('Login attempt with:', credentials.email);
      
      // Mock authentication logic
      const mockUser = MOCK_USERS.find(u => u.email === credentials.email);
      console.log('Found user:', mockUser ? 'Yes' : 'No');
      
      if (!mockUser) {
        throw new Error('User not found');
      }
      
      // Compare passwords exactly
      const passwordMatches = credentials.password === mockUser.password;
      console.log('Password match:', passwordMatches ? 'Yes' : 'No');
      
      if (!passwordMatches) {
        throw new Error('Invalid password');
      }
      
      const { password, ...userWithoutPassword } = mockUser;
      
      // Save user to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Existing user, so set isNewUser to false
      setIsNewUser(false);
      console.log('Login successful for:', userWithoutPassword.email);
      return { success: true, user: userWithoutPassword };
      
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === credentials.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email: credentials.email,
        password: credentials.password,
        isAdmin: false
      };

      // In a real app, you would make an API call here
      MOCK_USERS.push(newUser);

      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsNewUser(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // In a real app, you would integrate with Google OAuth here
      // For now, we'll create a mock Google user
      const googleUser = {
        id: 'google-123',
        email: 'google-user@example.com',
        isAdmin: false
      };

      // Check if this Google user already exists in our mock database
      const existingUser = MOCK_USERS.find(u => u.id === googleUser.id);
      
      setUser(googleUser);
      // Set isNewUser based on whether the user already exists
      setIsNewUser(!existingUser);
      localStorage.setItem('user', JSON.stringify(googleUser));

      // Add the Google user to MOCK_USERS if they don't exist
      if (!existingUser) {
        MOCK_USERS.push(googleUser);
      }

      return { success: true, user: googleUser };
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      // Check if user exists
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('No account found with this email');
      }

      // In a real app, you would:
      // 1. Generate a password reset token
      // 2. Send an email with reset instructions
      // 3. Create an API endpoint to handle the reset

      // For now, we'll just simulate a successful request
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isNewUser,
    setIsNewUser,
    login,
    logout,
    signup,
    signInWithGoogle,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 