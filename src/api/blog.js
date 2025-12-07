import client from './client';

export const getPosts = async (params = {}) => {
  try {
    const response = await client.get('/blog', { params });
    return response.data;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const response = await client.get(`/blog/${slug}`);
    if (response.data.success === false && response.data.message) {
      throw new Error(response.data.message);
    }
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
};
