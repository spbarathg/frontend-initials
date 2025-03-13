import api from './api';

// Mock data for development
const mockRoutes = [
  {
    id: 1,
    name: 'Route A-123',
    stops: 5,
    distance: '120 km',
    duration: '2.5 hours',
    efficiency: 92,
    carbonImpact: 85,
    status: 'active',
  },
  {
    id: 2,
    name: 'Route B-456',
    stops: 3,
    distance: '85 km',
    duration: '1.8 hours',
    efficiency: 88,
    carbonImpact: 90,
    status: 'optimizing',
  },
  {
    id: 3,
    name: 'Route C-789',
    stops: 7,
    distance: '150 km',
    duration: '3.2 hours',
    efficiency: 85,
    carbonImpact: 82,
    status: 'completed',
  },
];

// Service functions
export const routesService = {
  // Get all routes
  getRoutes: async () => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get('/routes');
      // return response.data;
      
      // For now, return mock data
      return mockRoutes;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  // Get single route by ID
  getRouteById: async (id) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.get(`/routes/${id}`);
      // return response.data;
      
      // For now, return mock data
      return mockRoutes.find(route => route.id === id);
    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  },

  // Create new route
  createRoute: async (routeData) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.post('/routes', routeData);
      // return response.data;
      
      // For now, return mock data
      const newRoute = {
        id: mockRoutes.length + 1,
        ...routeData,
        status: 'active',
      };
      mockRoutes.push(newRoute);
      return newRoute;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  },

  // Update route
  updateRoute: async (id, routeData) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.put(`/routes/${id}`, routeData);
      // return response.data;
      
      // For now, return mock data
      const index = mockRoutes.findIndex(route => route.id === id);
      if (index !== -1) {
        mockRoutes[index] = { ...mockRoutes[index], ...routeData };
        return mockRoutes[index];
      }
      throw new Error('Route not found');
    } catch (error) {
      console.error('Error updating route:', error);
      throw error;
    }
  },

  // Delete route
  deleteRoute: async (id) => {
    try {
      // When backend is ready, replace with actual API call
      // await api.delete(`/routes/${id}`);
      
      // For now, handle mock data
      const index = mockRoutes.findIndex(route => route.id === id);
      if (index !== -1) {
        mockRoutes.splice(index, 1);
        return true;
      }
      throw new Error('Route not found');
    } catch (error) {
      console.error('Error deleting route:', error);
      throw error;
    }
  },

  // Optimize routes
  optimizeRoutes: async (optimizationParams) => {
    try {
      // When backend is ready, replace with actual API call
      // const response = await api.post('/routes/optimize', optimizationParams);
      // return response.data;
      
      // For now, return mock data
      return {
        success: true,
        message: 'Routes optimized successfully',
        optimizedRoutes: mockRoutes.map(route => ({
          ...route,
          efficiency: Math.min(route.efficiency + 5, 100),
        })),
      };
    } catch (error) {
      console.error('Error optimizing routes:', error);
      throw error;
    }
  },
}; 