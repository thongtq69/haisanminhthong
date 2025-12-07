import client from './client';

export const getCategories = async () => {
  try {
    const response = await client.get('/categories');
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const response = await client.get(`/categories/${slug}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error in getCategoryBySlug:', error);
    throw error;
  }
};

// Get categories related to Crab & Seafood
export const getCrabSeafoodCategories = async () => {
  try {
    const allCategories = await getCategories();
    
    // Filter categories related to crab/seafood
    // Check name, slug, or tags for keywords
    const keywords = ['ghe', 'ghẹ', 'hai-san', 'hải sản', 'seafood', 'crab'];
    
    const filtered = allCategories.filter((cat) => {
      const nameLower = (cat.name || '').toLowerCase();
      const slugLower = (cat.slug || '').toLowerCase();
      const descriptionLower = (cat.description || '').toLowerCase();
      
      return keywords.some(
        (keyword) =>
          nameLower.includes(keyword) ||
          slugLower.includes(keyword) ||
          descriptionLower.includes(keyword)
      );
    });
    
    return filtered;
  } catch (error) {
    console.error('Error in getCrabSeafoodCategories:', error);
    throw error;
  }
};

