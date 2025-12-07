import client from './client';

export const getCombos = async () => {
  try {
    const response = await client.get('/combos');
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data || [];
  } catch (error) {
    console.error('Error in getCombos:', error);
    throw error;
  }
};

export const getComboBySlug = async (slug) => {
  try {
    const response = await client.get(`/combos/${slug}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in getComboBySlug:', error);
    throw error;
  }
};

