import client from './client';

export const adminGetPosts = async (params = {}) => {
  const res = await client.get('/admin/blog', { params });
  return res.data;
};

export const adminGetPost = async (id) => {
  const res = await client.get(`/admin/blog/${id}`);
  return res.data;
};

export const adminCreatePost = async (payload) => {
  const res = await client.post('/admin/blog', payload);
  return res.data;
};

export const adminUpdatePost = async (id, payload) => {
  const res = await client.put(`/admin/blog/${id}`, payload);
  return res.data;
};

export const adminDeletePost = async (id) => {
  const res = await client.delete(`/admin/blog/${id}`);
  return res.data;
};
