import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChefHat,
  Package,
  Bike,
  CheckCircle2,
  PhoneCall,
  ReceiptText,
  ShoppingBag,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../api';
import LoadingSpinner from './LoadingSpinner';
import trackBg from './Images/background3.jpg';

const SOCKET_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5001';

const STATUS_STEPS = [
  { key: 'pending', title: 'Order Placed', description: 'Your order has been received', icon: <Check size={14} strokeWidth={3} /> },
  { key: 'confirmed', title: 'Confirmed', description: 'Kitchen has accepted your order', icon: <Check size={14} strokeWidth={3} /> },
  { key: 'preparing', title: 'Cooking', description: 'Your biryani is being prepared with love', icon: <ChefHat size={14} /> },
  { key: 'ready', title: 'Packed', description: 'Your order is packed and ready', icon: <Package size={14} /> },
  { key: 'out-for-delivery', title: 'Out for Delivery', description: 'On the way to you', icon: <Bike size={14} /> },
  { key: 'delivered', title: 'Delivered', description: 'Enjoy your meal!', icon: <CheckCircle2 size={14} /> },
];

const CANCELLED_STEP = { key: 'cancelled', title: 'Cancelled', description: 'Order has been cancelled', icon: <Package size={14} /> };

const trackStyles = `
.trackPage { position: relative; }
.trackPage::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("${trackBg}") center/cover fixed no-repeat;
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
}
.trackPage > * { position: relative; z-index: 1; }

@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(107,15,15,0.4); }
  50% { box-shadow: 0 0 0 10px rgba(107,15,15,0); }
}
@keyframes liveDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes statusPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.trackLiveBadge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.trackLiveDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: liveDot 1.5s ease-in-out infinite;
}

@media (max-width: 1024px) {
  .trackBody { grid-template-columns: 1fr !important; }
  .trackHeader { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
  .trackHeaderRight { width: auto !important; text-align: center !important; }
}
@media (max-width: 768px) {
  .trackPage { padding: 20px 12px !important; }
  .trackContainer { border-radius: 16px !important; }
  .trackContent { padding: 20px 16px !important; }
  .trackStepRow { gap: 12px !important; }
  .trackDeliveryPartner { flex-direction: column !important; gap: 12px !important; }
  .trackBody { gap: 24px !important; }
  .trackSelectCard { padding: 20px 16px !important; }
}
@media (max-width: 480px) {
  .trackPageTitle { font-size: 16px !important; }
  .trackContainer { border-radius: 12px !important; }
  .trackContent { padding: 16px 10px !important; }
  .trackStepRow { gap: 10px !important; margin-bottom: 20px !important; }
  .trackOrderItems { padding: 16px !important; }
}
`;

export default function TrackOrder() {
  const navigate = useNavigate();
  const { orderId: urlOrderId } = useParams();
  const { token } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefreshing, setAutoRefreshing] = useState(false);
  const socketRef = useRef(null);
  const pollingRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await orderAPI.getAll();
      const allOrders = res.data.orders || res.data || [];
      const activeOrders = allOrders.filter(
        (o) => !['delivered', 'cancelled'].includes(o.status)
      );
      const recentOrders = allOrders.slice(0, 20);
      setOrders(activeOrders.length > 0 ? activeOrders : recentOrders);

      if (urlOrderId) {
        const found = allOrders.find((o) => o._id === urlOrderId);
        if (found) setSelectedOrder(found);
      } else if (activeOrders.length > 0 && !selectedOrder) {
        setSelectedOrder(activeOrders[0]);
      } else if (!selectedOrder && recentOrders.length > 0) {
        setSelectedOrder(recentOrders[0]);
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (id) => {
    try {
      const res = await orderAPI.getById(id);
      if (res.data) setSelectedOrder(res.data);
    } catch (e) {
      console.error('Failed to fetch order:', e);
    }
  };

  useEffect(() => {
    if (urlOrderId) {
      fetchOrderById(urlOrderId);
    }
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token, urlOrderId]);

  useEffect(() => {
    if (!token || !selectedOrder?._id) return;

    let socket;
    import('socket.io-client').then(({ io }) => {
      socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
      });

      socket.on('connect', () => {
        setWsConnected(true);
        socket.emit('join-order', selectedOrder._id);
      });

      socket.on('disconnect', () => setWsConnected(false));

      socket.on('order-status-update', (data) => {
        if (data.orderId === selectedOrder._id) {
          setLastUpdate(new Date());
          setSelectedOrder((prev) =>
            prev?._id === data.orderId
              ? { ...prev, status: data.status, updatedAt: data.updatedAt }
              : prev
          );
          setOrders((prev) =>
            prev.map((o) =>
              o._id === data.orderId
                ? { ...o, status: data.status, updatedAt: data.updatedAt }
                : o
            )
          );
        }
      });

      socketRef.current = socket;
    }).catch(() => {});

    return () => {
      if (socket) socket.disconnect();
    };
  }, [token, selectedOrder?._id]);

  useEffect(() => {
    if (!selectedOrder?._id) return;
    setAutoRefreshing(true);
    pollingRef.current = setInterval(() => {
      fetchOrderById(selectedOrder._id);
    }, 15000);
    return () => {
      clearInterval(pollingRef.current);
      setAutoRefreshing(false);
    };
  }, [selectedOrder?._id]);

  const getStepStatus = (stepIndex) => {
    if (!selectedOrder) return 'pending';
    if (selectedOrder.status === 'cancelled') return 'cancelled';

    const statusOrder = STATUS_STEPS.map((s) => s.key);
    const currentIndex = statusOrder.indexOf(selectedOrder.status);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getEstimatedTime = () => {
    if (!selectedOrder) return '';
    if (selectedOrder.status === 'delivered') return 'Delivered';
    if (selectedOrder.status === 'cancelled') return 'Cancelled';
    if (selectedOrder.status === 'out-for-delivery') return '10-15 min';
    if (selectedOrder.status === 'ready') return '15-25 min';
    if (selectedOrder.status === 'preparing') return '25-40 min';
    if (selectedOrder.status === 'confirmed') return '30-45 min';
    return '35-50 min';
  };

  const subtotal = selectedOrder?.items?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0) || 0;
  const deliveryCharge = selectedOrder?.orderType === 'delivery' ? 40 : 0;
  const packagingCharge = 20;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="trackPage" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)', padding: '40px 20px' }}>
      <style>{trackStyles}</style>

      {!selectedOrder ? (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(107,15,15,0.08)', color: '#6b0f0f', border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <ArrowLeft size={20} /> Back
          </button>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#6b0f0f', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Track Order</h1>
            <p style={{ fontSize: 13, color: '#c89a2b', fontWeight: 700 }}>SELECT AN ORDER TO TRACK</p>
          </div>

          {orders.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
              <ShoppingBag size={48} color="#ddd" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#6b0f0f', margin: '0 0 8px' }}>Track by Order ID</h3>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Enter your Order ID to track it as a guest</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Order ID" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid #ddd', outline: 'none', width: '100%', maxWidth: 250 }}
                />
                <button 
                  onClick={() => {
                    if (searchInput.trim()) {
                      navigate(`/track-order/${searchInput.trim()}`);
                    }
                  }} 
                  style={{ background: 'linear-gradient(135deg, #6b0f0f, #8b1a1a)', color: '#f7c66b', border: 'none', padding: '12px 28px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  Track
                </button>
              </div>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>Or place a new order</p>
              <button onClick={() => navigate('/menu')} style={{ background: '#f3ede4', color: '#6b0f0f', border: 'none', padding: '10px 24px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orders.map((order) => {
                const statusColors = {
                  pending: '#d97706', confirmed: '#2563eb', preparing: '#4f46e5',
                  ready: '#059669', 'out-for-delivery': '#9333ea', delivered: '#16a34a', cancelled: '#dc2626',
                };
                const color = statusColors[order.status] || '#999';
                return (
                  <div key={order._id} className="trackSelectCard" onClick={() => setSelectedOrder(order)} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', cursor: 'pointer', border: '1px solid rgba(107,15,15,0.05)', transition: 'all 0.2s', animation: 'slideUp 0.3s ease forwards', opacity: 0, animationDelay: `${0.1 * orders.indexOf(order)}s` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#6b0f0f', fontFamily: 'monospace' }}>#{order._id?.slice(-6).toUpperCase()}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: `${color}15`, color, textTransform: 'uppercase' }}>
                          {order.status}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: '#999' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', fontSize: 13, color: '#555' }}>
                      {order.items?.slice(0, 3).map((item, i) => (
                        <span key={i}>{item.menuItem?.name || 'Item'} x{item.quantity}{i < Math.min(order.items.length, 3) - 1 ? ',' : ''}</span>
                      ))}
                      {order.items?.length > 3 && <span style={{ color: '#999' }}>+{order.items.length - 3} more</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: '#c89a2b', fontFamily: 'Georgia, serif' }}>₹{order.totalAmount}</span>
                      <span style={{ fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {getEstimatedTime()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="trackContainer" style={{ maxWidth: 1000, margin: '0 auto', background: '#fff', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid rgba(107,15,15,0.05)' }}>

          <div className="trackHeader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #f0f0f0', flexWrap: 'wrap', gap: 12 }}>
            <button onClick={() => { setSelectedOrder(null); if (urlOrderId) navigate('/track-order'); }}
              style={{ background: 'rgba(107,15,15,0.05)', border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 12, color: '#6b0f0f', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, transition: 'all 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(107,15,15,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(107,15,15,0.05)'}
            >
              <ArrowLeft size={20} /> {orders.length > 1 ? 'All Orders' : ''}
            </button>

            <div style={{ textAlign: 'center' }}>
              <h1 className="trackPageTitle" style={{ fontSize: 20, fontWeight: 900, color: '#6b0f0f', margin: 0, letterSpacing: 1, textTransform: 'uppercase' }}>Track Order</h1>
              <p style={{ fontSize: 12, color: '#c89a2b', margin: '2px 0 0', fontWeight: 700 }}>Live Status Updates</p>
            </div>

            <div className="trackHeaderRight" style={{ width: 120, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>
                ID: <span style={{ color: '#6b0f0f' }}>#{selectedOrder._id?.slice(-6).toUpperCase()}</span>
              </span>
              <div className="trackLiveBadge" style={{ background: wsConnected ? '#dcfce7' : '#fef3c7', color: wsConnected ? '#16a34a' : '#d97706' }}>
                <span className="trackLiveDot" style={{ background: wsConnected ? '#22c55e' : '#d97706' }} />
                {wsConnected ? 'Live' : 'Connecting...'}
              </div>
              <button onClick={() => { setAutoRefreshing((p) => !p); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#999', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                <RefreshCw size={10} style={{ animation: autoRefreshing ? 'spin 2s linear infinite' : 'none' }} />
                {autoRefreshing ? 'Auto-refresh: ON' : 'Auto-refresh: OFF'}
              </button>
            </div>
          </div>

          <div className="trackBody trackContent" style={{ padding: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, color: '#333', margin: 0 }}>Delivery Status</h2>
                  <p style={{ fontSize: 12, color: '#999', margin: '4px 0 0' }}>Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(selectedOrder.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: selectedOrder.status === 'cancelled' ? '#fee2e2' : '#d1fae5', border: selectedOrder.status === 'cancelled' ? '1px solid #fecaca' : '1px solid #a7f3d0', color: selectedOrder.status === 'cancelled' ? '#dc2626' : '#059669', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', textTransform: 'uppercase', animation: selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' ? 'statusPop 0.5s ease' : 'none' }}>
                  {selectedOrder.status?.replace(/-/g, ' ')}
                </span>
              </div>

              <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {selectedOrder.status === 'cancelled' ? (
                  <div className="trackStepRow" style={{ display: 'flex', gap: 20, alignItems: 'start', animation: 'slideUp 0.4s ease' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: '#dc2626', color: '#fff' }}>
                      <Package size={14} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#dc2626' }}>Cancelled</h4>
                      <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>This order has been cancelled</p>
                    </div>
                  </div>
                ) : (
                  STATUS_STEPS.map((step, index) => {
                    const stepStatus = getStepStatus(index);
                    return (
                      <div key={index} className="trackStepRow" style={{ display: 'flex', gap: 20, alignItems: 'start', position: 'relative', marginBottom: 28, animation: stepStatus === 'current' ? 'slideUp 0.4s ease' : 'none' }}>
                        {index !== STATUS_STEPS.length - 1 && (
                          <div style={{ position: 'absolute', left: 14, top: 28, bottom: -24, width: 2, background: stepStatus === 'completed' ? '#059669' : '#e7e5e4' }} />
                        )}

                        <div style={{
                          width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
                          background: stepStatus === 'completed' ? '#059669' : stepStatus === 'current' ? '#6b0f0f' : '#f0f0f0',
                          color: stepStatus === 'pending' ? '#999' : '#fff',
                          boxShadow: stepStatus === 'current' ? '0 0 15px rgba(107,15,15,0.3)' : 'none',
                          animation: stepStatus === 'current' ? 'livePulse 2s ease-in-out infinite' : 'none',
                          transition: 'all 0.3s ease',
                        }}>
                          {step.icon}
                        </div>

                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: stepStatus === 'pending' ? '#999' : '#333', transition: 'color 0.3s' }}>
                              {step.title}
                              {stepStatus === 'current' && (
                                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e', marginLeft: 8, animation: 'liveDot 1.5s ease-in-out infinite', verticalAlign: 'middle' }} />
                              )}
                            </h4>
                            <p style={{ fontSize: 12, color: '#666', margin: '2px 0 0' }}>{step.description}</p>
                          </div>
                          {stepStatus === 'completed' && (
                            <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>Done</span>
                          )}
                          {stepStatus === 'current' && (
                            <span style={{ fontSize: 11, color: '#6b0f0f', fontWeight: 700 }}>Now</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div style={{ background: 'linear-gradient(135deg, rgba(107,15,15,0.06), rgba(247,198,107,0.1))', borderRadius: 16, padding: 20, border: '1px solid rgba(200,154,43,0.2)', animation: 'slideUp 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Clock size={18} color="#6b0f0f" />
                    <div>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#6b0f0f', textTransform: 'uppercase', letterSpacing: 0.5 }}>Estimated Time</p>
                      <p style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 900, color: '#c89a2b', fontFamily: 'Georgia, serif' }}>{getEstimatedTime()}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder.deliveryAddress && (
                <div style={{ background: '#fdfaf5', borderRadius: 16, padding: 16, border: '1px solid #f3ede4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
                    <MapPin size={14} color="#6b0f0f" />
                    <span>{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="trackOrderItems" style={{ background: '#fdfaf5', padding: 24, borderRadius: 20, border: '1px solid #f3ede4' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#6b0f0f', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ShoppingBag size={18} /> Order Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: '#333', fontWeight: 600 }}>{item.quantity}x {item.menuItem?.name || 'Item'}</span>
                      <span style={{ color: '#666' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', padding: 24, borderRadius: 20, border: '1px solid #f0f0f0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#6b0f0f', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ReceiptText size={18} /> Bill Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px dashed #ddd', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: '#666' }}>Item Total</span>
                    <span style={{ color: '#333', fontWeight: 700 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {deliveryCharge > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: '#666' }}>Delivery Fee</span>
                      <span style={{ color: '#333', fontWeight: 700 }}>₹{deliveryCharge}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: '#666' }}>Packaging Charges</span>
                    <span style={{ color: '#333', fontWeight: 700 }}>₹{packagingCharge}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#333' }}>Paid Total</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#c89a2b' }}>₹{(selectedOrder.totalAmount || subtotal + deliveryCharge + packagingCharge).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div style={{ background: '#fdfaf5', padding: 16, borderRadius: 16, border: '1px solid #f3ede4' }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#6b0f0f', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Special Instructions</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#555' }}>{selectedOrder.specialInstructions}</p>
                </div>
              )}

              <div style={{ background: '#fff', padding: 16, borderRadius: 20, border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Order Type</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#333', textTransform: 'capitalize' }}>{selectedOrder.orderType || 'Dine-in'}</span>
                </div>
                {lastUpdate && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Last Updated</span>
                    <span style={{ fontSize: 11, color: '#999' }}>{lastUpdate.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>

              <div className="trackDeliveryPartner" style={{ background: '#fff', padding: 16, borderRadius: 20, border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
                    alt="Delivery Partner"
                    style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover' }}
                  />
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 800, color: '#999', margin: 0, textTransform: 'uppercase' }}>Delivery Hero</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#333', margin: '2px 0 0' }}>Assigned Partner</p>
                  </div>
                </div>
                <button style={{ width: 40, height: 40, borderRadius: 12, background: '#6b0f0f', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <PhoneCall size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
