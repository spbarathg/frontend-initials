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
import Dashboard from './pages/Dashboard';
import ImportData from './pages/dashboard/import/ImportData';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Inventory from './pages/dashboard/inventory/Inventory';
import Settings from './pages/dashboard/settings/Settings';
import Team from './pages/dashboard/team/Team';

// Import new components
import SustainabilityHub from './components/dashboard/SustainabilityHub';
import AIAutopilotSettings from './components/dashboard/AIAutopilotSettings';
import RiskRadar from './components/dashboard/RiskRadar';
import AIDecisionAnalysis from './components/dashboard/AIDecisionAnalysis';
import AIInventoryTransfers from './components/dashboard/AIInventoryTransfers';
import AIDataCleaning from './components/dashboard/AIDataCleaning';
import TeamPerformance from './components/dashboard/TeamPerformance';

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
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="import" element={<ImportData />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="team" element={<Team />} />
              <Route path="settings" element={<Settings />} />
              
              {/* New AI and Sustainability routes */}
              <Route path="sustainability" element={<SustainabilityHub />} />
              <Route path="ai-autopilot" element={<AIAutopilotSettings />} />
              <Route path="risk-radar" element={<RiskRadar />} />
              <Route path="ai-decisions" element={<AIDecisionAnalysis />} />
              <Route path="ai-inventory" element={<AIInventoryTransfers />} />
              <Route path="ai-data" element={<AIDataCleaning />} />
              <Route path="team-performance" element={<TeamPerformance />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;