import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getOrderById } from '../api/orders';

const formatVND = (value = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || order) return;
      try {
        const res = await getOrderById(id);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id, order]);

  if (!order) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-snow-bg pt-20">
        <p className="text-gray-700">Đang tải thông tin đơn hàng...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-snow-bg pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cảm ơn bạn đã đặt hàng!</h1>
        <p className="text-gray-700 mb-4">
          Đơn hàng của {order.customer?.name} đã được tiếp nhận. Nhân viên sẽ liên hệ xác nhận trong thời gian sớm nhất.
        </p>
        <div className="bg-gray-50 border rounded-lg p-4 space-y-2 mb-6">
          <div className="flex justify-between text-gray-800">
            <span>Mã đơn</span>
            <span className="font-semibold">{order.code || order._id}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Tổng tiền</span>
            <span className="font-semibold">{formatVND(order.total)}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Phương thức thanh toán</span>
            <span className="font-semibold">
              {order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'Thanh toán khi nhận hàng'}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Sản phẩm</h3>
        <div className="space-y-3 mb-6">
          {order.items?.map((item) => (
            <div key={`${order._id}-${item.product}`} className="flex justify-between border-b pb-2">
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">SL: {item.quantity}</div>
              </div>
              <div className="text-gray-900 font-semibold">{formatVND(item.subtotal)}</div>
            </div>
          ))}
        </div>

        <button
          className="bg-ocean-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-blue transition"
          onClick={() => navigate('/')}
        >
          Tiếp tục mua hàng
        </button>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
