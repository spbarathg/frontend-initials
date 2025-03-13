import api from './api';

const mockRoutes = [
  {
    id: 1,
    name: 'Route A-123',
    stops: 5,
    distance: '120 km',
    duration: '2.5 hours',
    efficiency: 92,
    status: 'active',
  }
  // Remove redundant mock data
];

const routeCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export const routesService = {
  async getRoutes() {
    try {
      return mockRoutes;
    } catch (error) {
      throw new Error(`Failed to fetch routes: ${error.message}`);
    }
  },

  async getRouteById(id) {
    return mockRoutes.find(route => route.id === id);
  },

  async optimizeRoutes(params) {
    const cacheKey = JSON.stringify(params);
    const cached = routeCache.get(cacheKey);
    
    if (cached?.timestamp > Date.now() - CACHE_DURATION) {
      return cached.data;
    }

    try {
      const optimizedRoutes = mockRoutes.map(route => ({
        ...route,
        ...optimizeRouteMetrics(route, params)
      }));

      const result = {
        success: true,
        optimizedRoutes,
        timestamp: Date.now()
      };

      routeCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      throw new Error(`Optimization failed: ${error.message}`);
    }
  }
};

// Single consolidated helper function
function optimizeRouteMetrics(route, params) {
  return {
    efficiency: Math.min((route.efficiency || 0) + 5, 100),
    fuelConsumption: calculateFuelMetric(route, params),
    estimatedTime: route.duration
  };
}

function calculateFuelMetric(route, params) {
  return (route.distance?.split(' ')[0] || 0) * 0.1;
}