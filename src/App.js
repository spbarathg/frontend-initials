import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OnboardingPage from './pages/OnboardingPage';
import RoutesPage from './pages/dashboard/routes/Routes';
import Analytics from './pages/dashboard/analytics/Analytics';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardWithDarkMode from './components/dashboardwithdarkmode';
import Dashboard from './pages/Dashboard';
import ImportData from './pages/dashboard/import/ImportData';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardWithDarkMode />
                </Layout>
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="import" element={<ImportData />} /> {/* Move this inside the dashboard routes */}
            </Route>

            {/* Admin routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute requireAdmin>
                <Layout>
                  <div>Admin Dashboard (Coming Soon)</div>
                </Layout>
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;