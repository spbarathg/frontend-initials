# 🚀 Logistics AI Optimization Platform

[![AI Powered](https://img.shields.io/badge/AI-Powered-blue.svg)](https://github.com/yourusername/logistics-optimizer)
[![Integration Ready](https://img.shields.io/badge/Integration-Ready-success.svg)](https://github.com/yourusername/logistics-optimizer)
[![Python](https://img.shields.io/badge/Backend-Python%20Flask-green.svg)](https://github.com/yourusername/logistics-optimizer)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://github.com/yourusername/logistics-optimizer)

<div align="center">
  <h3>Next-Generation Logistics Management Platform</h3>
  <p><em>Empowering logistics operations with AI-driven optimization and intelligent inventory management</em></p>
</div>

## 📚 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Pages & Components](#-pages--components)
- [Technical Stack](#-technical-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)

## 🌟 Overview

The Logistics AI Optimization Platform is a comprehensive solution that integrates artificial intelligence with modern logistics management. Our platform focuses on three core areas:
- Multi-platform data integration
- AI-powered inventory management
- Dynamic rerouting capabilities

## 🎯 Features

### 1. User Authentication & Onboarding
- Secure user registration and login
- Business profile setup
- Supply chain unit selection
- Data source integration setup

### 2. Data Source Integration
- One-click integration with:
  - Zoho Inventory
  - Odoo ERP
  - CSV file upload
- Automated data mapping
- Historical data processing
- Real-time synchronization

### 3. AI-Powered Inventory Management
- **Demand Forecasting**
  - Trend-based analysis
  - Seasonal pattern recognition
  - ML-powered predictions
  
- **Dynamic Docking**
  - Retailer-to-retailer transfer optimization
  - Automated stock balancing
  - Real-time transfer suggestions
  
- **Monitoring & Optimization**
  - Low stock alerts
  - Expiry date tracking
  - Restock recommendations
  - Performance analytics

### 4. Dynamic Rerouting
- AI-assisted plan generation using Gemini API
- Disruption handling for:
  - Natural disasters
  - Technical issues
  - Resource unavailability
- Location-based rerouting
- Real-time plan adjustments

### 5. Last Mile Delivery (Future Implementation)
- IAFSA-based optimization
- Route efficiency analysis
- Delivery time optimization

## 📱 Pages & Components

### Public Pages
1. **Landing Page** (`/`)
   - Platform introduction
   - Feature highlights
   - Call-to-action buttons

2. **Authentication**
   - Login Page (`/login`)
   - Sign Up Page (`/signup`)
   - Form validation
   - Secure token management

3. **Onboarding** (`/onboarding`)
   - Step-by-step setup wizard
   - Business profile configuration
   - Supply chain unit selection
   - Data source connection

### Dashboard Pages
1. **Main Dashboard** (`/dashboard`)
   - Overview metrics
   - Quick actions
   - Recent activities
   - Performance indicators

2. **Inventory Management** (`/dashboard/inventory`)
   - Current stock levels
   - Stock movement history
   - Location-wise inventory
   - Alert notifications

3. **Import Data** (`/dashboard/import`)
   - Data source selection
   - File upload interface
   - Mapping configuration
   - Import status tracking

4. **Settings** (`/dashboard/settings`)
   - User preferences
   - System configuration
   - Integration settings
   - Notification preferences

### AI Features
1. **Inventory Optimization** (`/dashboard/inventory-optimization`)
   - Demand Forecasting tab
   - Dynamic Docking tab
   - Monitoring & Alerts tab
   - Interactive optimization controls

2. **Dynamic Rerouting** (`/dashboard/dynamic-rerouting`)
   - Disruption type selection
   - Unit and location specification
   - AI-generated rerouting plans
   - Plan visualization

3. **Last Mile Delivery** (`/dashboard/last-mile-delivery`)
   - IAFSA optimization interface
   - Route planning tools
   - Delivery scheduling
   - Performance tracking

## 🛠 Technical Stack

### Frontend
- React.js
- TailwindCSS
- React Router
- Context API
- Axios

### Backend
- Python Flask
- Google Cloud Platform
  - Vertex AI
  - Cloud Functions/Cloud Run
  - Cloud Storage
- JWT Authentication

### AI/ML
- Google Gemini API
- Linear Regression (Forecasting)
- Rule-based Systems
- IAFSA Implementation (Future)

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 14.x
Python >= 3.8
```

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/logistics-optimizer.git

# Install frontend dependencies
cd logistics-optimizer
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Start development servers
# Frontend
npm run dev

# Backend
python app.py
```

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/register/
POST /api/login/
```

### Data Integration
```
POST /api/datasource/connect/
POST /api/datasource/validate/
POST /api/datasource/import/
```

### Inventory Management
```
GET  /api/inventory/current/
POST /api/inventory/optimize/
```

### AI Features
```
POST /api/rerouting/dynamic/
GET  /api/lastmile/optimize/
```

---

<div align="center">
  <p>Built for next-generation logistics optimization</p>
</div>