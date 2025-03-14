import api from './api';

// Inventory Optimization (Demand Forecasting, Dynamic Docking, Monitoring)
export const optimizeInventory = async (params) => {
  try {
    const response = await api.post('/api/inventory/optimize/', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Dynamic Rerouting with Gemini API
export const generateReroutingPlan = async (params) => {
  try {
    const response = await api.post('/api/rerouting/dynamic/', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Data Source Integration
export const connectDataSource = async (params) => {
  try {
    const response = await api.post('/api/datasource/connect/', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supply Chain Unit Selection
export const updateSupplyChainUnits = async (params) => {
  try {
    const response = await api.post('/api/onboarding/', params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Current Inventory
export const getCurrentInventory = async (params) => {
  try {
    const response = await api.get('/api/inventory/current/', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Last Mile Delivery Optimization (Placeholder)
export const optimizeLastMileDelivery = async () => {
  try {
    const response = await api.get('/api/lastmile/optimize/');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 