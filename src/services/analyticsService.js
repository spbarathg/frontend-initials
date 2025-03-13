import api from './api';

// Mock data for development
const mockMetrics = {
  carbonReduction: {
    value: '2,450 kg',
    change: '+12%',
    changeType: 'increase',
    description: 'Total CO2 emissions reduced through optimized routes',
  },
  fuelSavings: {
    value: '1,850 L',
    change: '+8%',
    changeType: 'increase',
    description: 'Fuel saved through route optimization',
  },
  timeEfficiency: {
    value: '92%',
    change: '+5%',
    changeType: 'increase',
    description: 'Average delivery time efficiency',
  },
  costSavings: {
    value: '$4,250',
    change: '+15%',
    changeType: 'increase',
    description: 'Total operational cost savings',
  },
};

const mockCarbonCredits = {
  available: 245,
  used: 82,
};

const mockEnvironmentalImpact = {
  treesEquivalent: 245,
  waterSaved: 1850,
};

// Service functions
export const analyticsService = {
  // Get all metrics
  getMetrics: async () => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get('/analytics/metrics');
      // return response.data;
      
      // For now, return mock data
      return mockMetrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  // Get carbon credits data
  getCarbonCredits: async () => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get('/analytics/carbon-credits');
      // return response.data;
      
      // For now, return mock data
      return mockCarbonCredits;
    } catch (error) {
      console.error('Error fetching carbon credits:', error);
      throw error;
    }
  },

  // Get environmental impact data
  getEnvironmentalImpact: async () => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get('/analytics/environmental-impact');
      // return response.data;
      
      // For now, return mock data
      return mockEnvironmentalImpact;
    } catch (error) {
      console.error('Error fetching environmental impact:', error);
      throw error;
    }
  },

  // Get historical data for charts
  getHistoricalData: async (timeframe) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get(`/analytics/historical?timeframe=${timeframe}`);
      // return response.data;
      
      // For now, return mock data
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        carbonReduction: [1500, 1800, 2000, 2200, 2300, 2450],
        fuelSavings: [1200, 1400, 1600, 1700, 1800, 1850],
        timeEfficiency: [85, 87, 89, 90, 91, 92],
        costSavings: [2500, 3000, 3500, 3800, 4000, 4250],
      };
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },

  // Generate sustainability report
  generateReport: async (params) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.post('/analytics/report', params);
      // return response.data;
      
      // For now, return mock data
      return {
        success: true,
        reportUrl: 'https://example.com/report.pdf',
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  },
}; 