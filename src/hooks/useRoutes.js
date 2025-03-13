import { useState, useEffect } from 'react';
import { routesService } from '../services/routesService';

export const useRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await routesService.getRoutes();
      setRoutes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching routes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single route
  const fetchRouteById = async (id) => {
    try {
      setLoading(true);
      const data = await routesService.getRouteById(id);
      setSelectedRoute(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching route:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new route
  const createRoute = async (routeData) => {
    try {
      setLoading(true);
      const newRoute = await routesService.createRoute(routeData);
      setRoutes(prev => [...prev, newRoute]);
      setError(null);
      return newRoute;
    } catch (err) {
      setError(err.message);
      console.error('Error creating route:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update route
  const updateRoute = async (id, routeData) => {
    try {
      setLoading(true);
      const updatedRoute = await routesService.updateRoute(id, routeData);
      setRoutes(prev => prev.map(route => 
        route.id === id ? updatedRoute : route
      ));
      if (selectedRoute?.id === id) {
        setSelectedRoute(updatedRoute);
      }
      setError(null);
      return updatedRoute;
    } catch (err) {
      setError(err.message);
      console.error('Error updating route:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete route
  const deleteRoute = async (id) => {
    try {
      setLoading(true);
      await routesService.deleteRoute(id);
      setRoutes(prev => prev.filter(route => route.id !== id));
      if (selectedRoute?.id === id) {
        setSelectedRoute(null);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting route:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Optimize routes
  const optimizeRoutes = async (optimizationParams) => {
    try {
      setLoading(true);
      const result = await routesService.optimizeRoutes(optimizationParams);
      setRoutes(result.optimizedRoutes);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error optimizing routes:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRoutes();
  }, []);

  return {
    routes,
    selectedRoute,
    loading,
    error,
    setSelectedRoute,
    fetchRoutes,
    fetchRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    optimizeRoutes,
  };
}; 