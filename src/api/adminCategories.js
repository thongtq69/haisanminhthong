import client from './client';

export const adminGetCategories = async () => {
  try {
    const response = await client.get('/categories');
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data || [];
  } catch (error) {
    console.error('Error in adminGetCategories:', error);
    throw error;
  }
};

export const adminGetCategoryById = async (id) => {
  try {
    const response = await client.get(`/categories/id/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in adminGetCategoryById:', error);
    throw error;
  }
};

export const adminCreateCategory = async (payload) => {
  try {
    const response = await client.post('/categories', payload);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminCreateCategory:', error);
    throw error;
  }
};

export const adminUpdateCategory = async (id, payload) => {
  try {
    const response = await client.put(`/categories/${id}`, payload);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminUpdateCategory:', error);
    throw error;
  }
};

export const adminDeleteCategory = async (id) => {
  try {
    const response = await client.delete(`/categories/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error in adminDeleteCategory:', error);
    throw error;
  }
};

