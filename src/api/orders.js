import client from './client';

export const createGuestOrder = async (payload) => {
  const res = await client.post('/orders/guest', payload);
  return res.data;
};

export const getOrders = async (params = {}) => {
  const res = await client.get('/orders', { params });
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await client.get(`/orders/${id}`);
  return res.data;
};
