import client from './client';

export const getFeaturedProducts = async () => {
  try {
    const response = await client.get('/products/featured');
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data || [];
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    throw error;
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await client.get('/products', { params });
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await client.get(`/products/${slug}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in getProductBySlug:', error);
    throw error;
  }
};

export const getProductReviews = async (productId, limit = 10) => {
  try {
    const response = await client.get(`/products/${productId}/reviews`, {
      params: { limit },
    });
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data || [];
  } catch (error) {
    console.error('Error in getProductReviews:', error);
    throw error;
  }
};

export const createReview = async (productId, payload) => {
  try {
    const response = await client.post(`/products/${productId}/reviews`, payload);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error;
  }
};

// Get products for Crab & Seafood category page
export const getCrabSeafoodProducts = async (params = {}) => {
  try {
    // Build query params
    const queryParams = {
      ...params,
    };

    // If category filter is provided, use it
    // Otherwise, we'll filter on frontend for categories related to crab/seafood
    const response = await client.get('/products', { params: queryParams });
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in getCrabSeafoodProducts:', error);
    throw error;
  }
};

