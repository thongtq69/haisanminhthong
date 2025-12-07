import { useEffect, useState } from 'react';
import { getOrders } from '../../../api/orders';

const formatVND = (value = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data || res.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Mã đơn</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Khách</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">SĐT</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Thanh toán</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 text-sm text-gray-900">{order.code || order._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.customer?.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{order.customer?.phone}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 font-semibold">{formatVND(order.total)}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'COD'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 capitalize">{order.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
