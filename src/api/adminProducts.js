import client from './client';

export const adminGetProducts = async (params = {}) => {
  try {
    const response = await client.get('/products', {
      params: { limit: 200, ...params },
    });
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    // ensure consistent array return
    return response.data.data || response.data.items || [];
  } catch (error) {
    console.error('Error in adminGetProducts:', error);
    throw error;
  }
};

export const adminGetProductById = async (id) => {
  try {
    const response = await client.get(`/products/id/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in adminGetProductById:', error);
    throw error;
  }
};

export const adminCreateProduct = async (payload) => {
  try {
    const response = await client.post('/products', payload);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminCreateProduct:', error);
    throw error;
  }
};

export const adminUpdateProduct = async (id, payload) => {
  try {
    const response = await client.put(`/products/${id}`, payload);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminUpdateProduct:', error);
    throw error;
  }
};

export const adminDeleteProduct = async (id) => {
  try {
    const response = await client.delete(`/products/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminDeleteProduct:', error);
    throw error;
  }
};
