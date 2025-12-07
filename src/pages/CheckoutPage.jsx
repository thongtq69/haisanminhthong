import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../api/products';
import { createGuestOrder } from '../api/orders';

const formatVND = (value = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const CheckoutPage = () => {
  const { items, mode, setBuyNow, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    detail: '',
    note: '',
  });

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const modeParam = searchParams.get('mode');
  const productSlug = searchParams.get('productId');
  const qtyParam = parseInt(searchParams.get('quantity') || '1', 10);

  // Build buy-now cart if needed
  useEffect(() => {
    const bootstrapBuyNow = async () => {
      if (modeParam === 'buy_now' && productSlug && items.length === 0) {
        try {
          const p = await getProductBySlug(productSlug);
          setBuyNow({
            product: p._id,
            name: p.name,
            thumbnail: p.images?.[0],
            quantity: qtyParam || 1,
            unitPrice: p.price,
            subtotal: p.price * (qtyParam || 1),
            sizeLabel: p.sizeOptions?.[0]?.label,
            weightLabel: p.weightOptions?.[0]?.label,
            variantKey: `${p._id}-buy-now`,
          });
        } catch (err) {
          console.error('buy now bootstrap error', err);
        }
      }
    };
    bootstrapBuyNow();
  }, [modeParam, productSlug, qtyParam, items.length, setBuyNow]);

  const subtotal = items.reduce((sum, it) => sum + (it.unitPrice || 0) * (it.quantity || 1), 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Vui lòng nhập họ tên';
    if (!form.phone || !/^(0|\+84)\d{9,10}$/.test(form.phone))
      newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!form.province) newErrors.province = 'Nhập tỉnh / thành';
    if (!form.district) newErrors.district = 'Nhập quận / huyện';
    if (!form.ward) newErrors.ward = 'Nhập phường / xã';
    if (!form.detail) newErrors.detail = 'Nhập địa chỉ chi tiết';
    if (!items.length) newErrors.items = 'Giỏ hàng trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: {
            province: form.province,
            district: form.district,
            ward: form.ward,
            detail: form.detail,
          },
          note: form.note,
        },
        items: items.map((it) => ({
          product: it.product,
          quantity: it.quantity,
          price: it.unitPrice,
          name: it.name,
          thumbnail: it.thumbnail,
        })),
        paymentMethod,
        source: modeParam === 'buy_now' || mode === 'buy_now' ? 'buy_now' : 'cart',
      };
      const res = await createGuestOrder(payload);
      const orderId = res.order?._id || res.order?.id;
      if (!orderId) throw new Error('Không lấy được mã đơn');
      if (mode !== 'buy_now') clearCart();
      navigate(`/order-success/${orderId}`, { replace: true, state: { order: res.order } });
    } catch (err) {
      console.error(err);
      alert(err.message || 'Không thể tạo đơn hàng');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <main className="bg-snow-bg min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Thông tin giao hàng</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={handleChange('name')}
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="09xx xxx xxx"
                    value={form.phone}
                    onChange={handleChange('phone')}
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ chi tiết *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="Số nhà, tên đường"
                    value={form.detail}
                    onChange={handleChange('detail')}
                  />
                  {errors.detail && <p className="text-red-600 text-xs mt-1">{errors.detail}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tỉnh / thành *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="TP. HCM"
                    value={form.province}
                    onChange={handleChange('province')}
                  />
                  {errors.province && <p className="text-red-600 text-xs mt-1">{errors.province}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Quận / huyện *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="Quận 1"
                    value={form.district}
                    onChange={handleChange('district')}
                  />
                  {errors.district && <p className="text-red-600 text-xs mt-1">{errors.district}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phường / xã *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    placeholder="Phường Bến Nghé"
                    value={form.ward}
                    onChange={handleChange('ward')}
                  />
                  {errors.ward && <p className="text-red-600 text-xs mt-1">{errors.ward}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                  rows={3}
                  placeholder="Yêu cầu giao hàng, giờ nhận..."
                  value={form.note}
                  onChange={handleChange('note')}
                />
              </div>
            </section>

            <section className="bg-white shadow-lg rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Phương thức vận chuyển</h3>
              <div className="border rounded-lg p-4 text-gray-700">
                <p className="font-semibold mb-1">Giao hàng tiêu chuẩn</p>
                <p className="text-sm">Phí ship sẽ được xác nhận qua điện thoại</p>
              </div>
            </section>

            <section className="bg-white shadow-lg rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Thanh toán khi giao hàng (COD)</div>
                    <p className="text-sm text-gray-600">Kiểm tra hàng trước khi thanh toán.</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="BANK_TRANSFER"
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="mt-1"
                  />
                  <div className="w-full">
                    <div className="font-semibold text-gray-900">Chuyển khoản qua ngân hàng</div>
                    <p className="text-sm text-gray-600">
                      Vui lòng chuyển khoản trước, nội dung: SĐT + Tên + Mã đơn (sẽ gửi sau khi đặt).
                    </p>
                    <div className="mt-2 text-sm text-gray-700 space-y-1 bg-gray-50 p-3 rounded-lg">
                      <div>Ngân hàng: ABC Bank</div>
                      <div>Số TK: 123456789</div>
                      <div>Chủ TK: Cong ty Hai San Noel</div>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            <div className="flex justify-between items-center">
              <button
                className="text-ocean-blue hover:underline"
                onClick={() => navigate('/cart')}
              >
                Giỏ hàng
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-christmas-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-red transition disabled:opacity-60"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đơn hàng'}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Tóm tắt đơn hàng</h3>
            {errors.items && <p className="text-red-600 text-sm">{errors.items}</p>}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.variantKey} className="flex gap-3 border-b pb-3">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.weightLabel || item.sizeLabel || 'ĐVT'} · SL: {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {formatVND(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí ship</span>
                <span>Liên hệ xác nhận</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Tổng cộng</span>
                <span>{formatVND(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
