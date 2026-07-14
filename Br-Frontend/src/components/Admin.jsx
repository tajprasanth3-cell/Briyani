import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  LogOut,
  RefreshCw,
  X,
} from "lucide-react";

const API = "http://localhost:5001/api";

const adminStyles = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

.adminPage {
  font-family: 'Poppins', sans-serif;
  display: flex;
  min-height: 100vh;
  background: #f4f1ec;
}

.adminSidebar {
  width: 260px;
  background: linear-gradient(180deg, #1a0404 0%, #0d0202 100%);
  color: #fff;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

.adminSidebarLogo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px 24px;
  border-bottom: 1px solid rgba(247,198,107,0.1);
  margin-bottom: 24px;
}

.adminLogoCircle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7c66b, #d99523);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.adminLogoText {
  font-size: 18px;
  font-weight: 900;
  color: #f7c66b;
  letter-spacing: 2px;
  font-family: Georgia, serif;
}

.adminLogoSub {
  font-size: 9px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 2px;
  font-weight: 600;
}

.adminNavItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  border-left: 3px solid transparent;
}

.adminNavItem:hover {
  color: #fff;
  background: rgba(255,255,255,0.05);
}

.adminNavItemActive {
  color: #f7c66b !important;
  background: rgba(247,198,107,0.08) !important;
  border-left-color: #f7c66b !important;
  font-weight: 700;
}

.adminSidebarFooter {
  margin-top: auto;
  padding: 16px 24px;
  border-top: 1px solid rgba(247,198,107,0.1);
}

.adminMain {
  flex: 1;
  margin-left: 260px;
  padding: 32px;
}

.adminHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.adminTitle {
  font-size: 28px;
  font-weight: 800;
  color: #1a0404;
  margin: 0;
  font-family: Georgia, serif;
}

.adminSubtitle {
  font-size: 13px;
  color: #999;
  margin: 4px 0 0;
}

.statGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.statCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
}

.statCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.statCard:nth-child(1)::before { background: linear-gradient(90deg, #f7c66b, #d99523); }
.statCard:nth-child(2)::before { background: linear-gradient(90deg, #22c55e, #16a34a); }
.statCard:nth-child(3)::before { background: linear-gradient(90deg, #3b82f6, #2563eb); }
.statCard:nth-child(4)::before { background: linear-gradient(90deg, #f97316, #ea580c); }

.statLabel {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  font-weight: 600;
  margin: 0 0 8px;
}

.statValue {
  font-size: 32px;
  font-weight: 900;
  color: #1a0404;
  margin: 0;
}

.adminTableCard {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  overflow: hidden;
  margin-bottom: 24px;
}

.adminTableHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.adminTableTitle {
  font-size: 18px;
  font-weight: 700;
  color: #1a0404;
  margin: 0;
}

.adminTable {
  width: 100%;
  border-collapse: collapse;
}

.adminTable th {
  text-align: left;
  padding: 14px 24px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  font-weight: 700;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.adminTable td {
  padding: 14px 24px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
}

.adminTable tr:hover td {
  background: #faf8f5;
}

.statusBadge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.statusPending { background: #fef3c7; color: #d97706; }
.statusConfirmed { background: #dbeafe; color: #2563eb; }
.statusPreparing { background: #e0e7ff; color: #4f46e5; }
.statusReady { background: #d1fae5; color: #059669; }
.statusDelivered { background: #dcfce7; color: #16a34a; }
.statusCancelled { background: #fee2e2; color: #dc2626; }
.statusOut { background: #f3e8ff; color: #9333ea; }

.adminActionBtn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.adminBtnEdit {
  background: #eff6ff;
  color: #2563eb;
}
.adminBtnEdit:hover { background: #dbeafe; }

.adminBtnDelete {
  background: #fef2f2;
  color: #dc2626;
}
.adminBtnDelete:hover { background: #fee2e2; }

.adminBtnPrimary {
  background: linear-gradient(135deg, #6b0f0f, #8b1a1a);
  color: #f7c66b;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107,15,15,0.3);
}

.adminBtnPrimary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(107,15,15,0.4);
}

.adminBtnSecondary {
  background: #f0f0f0;
  color: #333;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.adminModal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.adminModalCard {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,0.3);
}

.adminModalTitle {
  font-size: 20px;
  font-weight: 800;
  color: #1a0404;
  margin: 0 0 24px;
  font-family: Georgia, serif;
}

.adminFormGroup {
  margin-bottom: 18px;
}

.adminFormLabel {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666;
  margin-bottom: 6px;
}

.adminFormInput,
.adminFormSelect,
.adminFormTextarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.adminFormInput:focus,
.adminFormSelect:focus,
.adminFormTextarea:focus {
  border-color: #f7c66b;
}

.adminFormTextarea {
  min-height: 80px;
  resize: vertical;
}

.adminFormActions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.adminEmpty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.adminEmptyIcon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.3;
}

@media (max-width: 1024px) {
  .statGrid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .adminSidebar { display: none; }
  .adminMain { margin-left: 0; padding: 16px; }
  .statGrid { grid-template-columns: 1fr; }
  .adminTable { font-size: 12px; }
  .adminTable th, .adminTable td { padding: 10px 12px; }
}
`;

const STATUS_OPTIONS = ["pending", "confirmed", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"];
const MENU_CATEGORIES = ["Chicken Biryani", "Mutton Biryani", "Fish Biryani", "Prawn Biryani", "Egg Biryani", "Starters", "Beverages", "Desserts", "Roti & Breads"];

function getStatusClass(status) {
  const map = {
    pending: "statusPending",
    confirmed: "statusConfirmed",
    preparing: "statusPreparing",
    ready: "statusReady",
    delivered: "statusDelivered",
    cancelled: "statusCancelled",
    "out-for-delivery": "statusOut",
  };
  return map[status] || "statusPending";
}

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [token] = useState(() => localStorage.getItem("adminToken") || "");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/admin/dashboard`, { headers });
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/admin/users`, { headers });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/admin/orders`, { headers });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API}/menu`);
      const data = await res.json();
      if (data.success) setMenuItems(data.data.items);
    } catch (e) { console.error(e); }
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchDashboard(), fetchUsers(), fetchOrders(), fetchMenu()]);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, []);

  const handleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await fetch(`${API}/admin/users/${id}`, { method: "DELETE", headers });
      fetchUsers();
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const handleDeleteMenu = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    try {
      await fetch(`${API}/menu/${id}`, { method: "DELETE", headers });
      fetchMenu();
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await fetch(`${API}/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (e) { console.error(e); }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = form._id ? "PUT" : "POST";
      const url = form._id ? `${API}/menu/${form._id}` : `${API}/menu`;
      await fetch(url, {
        method,
        headers,
        body: JSON.stringify(form),
      });
      setModal(null);
      setForm({});
      fetchMenu();
      fetchDashboard();
    } catch (e) { console.error(e); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (data.success && data.data.isAdmin) {
        localStorage.setItem("adminToken", data.data.token);
        window.location.reload();
      } else {
        alert(data.message || "Not an admin account");
      }
    } catch (e) { alert("Login failed"); }
  };

  if (!token) {
    return (
      <div className="adminPage">
        <style>{adminStyles}</style>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div className="adminModalCard" style={{ maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div className="adminLogoCircle" style={{ width: 60, height: 60, margin: "0 auto 16px" }}>
                <UtensilsCrossed size={28} color="#5a0c0c" />
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1a0404", fontFamily: "Georgia, serif" }}>Admin Panel</h2>
              <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>Sign in with admin credentials</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Email</label>
                <input className="adminFormInput" type="email" placeholder="admin@tajbiryani.com" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Password</label>
                <input className="adminFormInput" type="password" placeholder="Enter password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <button className="adminBtnPrimary" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adminPage">
      <style>{adminStyles}</style>

      <aside className="adminSidebar">
        <div className="adminSidebarLogo">
          <div className="adminLogoCircle">
            <UtensilsCrossed size={20} color="#5a0c0c" />
          </div>
          <div>
            <div className="adminLogoText">TAJ</div>
            <div className="adminLogoSub">ADMIN PANEL</div>
          </div>
        </div>

        {[
          { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
          { id: "menu", label: "Menu Items", icon: <UtensilsCrossed size={18} /> },
          { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
          { id: "users", label: "Users", icon: <Users size={18} /> },
        ].map((item) => (
          <button
            key={item.id}
            className={`adminNavItem ${tab === item.id ? "adminNavItemActive" : ""}`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="adminSidebarFooter">
          <button className="adminNavItem" onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/"; }}>
            <LogOut size={18} />
            Back to Store
          </button>
        </div>
      </aside>

      <main className="adminMain">
        <div className="adminHeader">
          <div>
            <h1 className="adminTitle">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
            <p className="adminSubtitle">Manage your restaurant</p>
          </div>
          <button className="adminBtnSecondary" onClick={loadAll} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="adminEmpty">
            <div className="adminEmptyIcon">⏳</div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {tab === "dashboard" && stats && (
              <>
                <div className="statGrid">
                  <div className="statCard">
                    <p className="statLabel">Total Revenue</p>
                    <p className="statValue">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="statCard">
                    <p className="statLabel">Total Orders</p>
                    <p className="statValue">{stats.totalOrders}</p>
                  </div>
                  <div className="statCard">
                    <p className="statLabel">Total Users</p>
                    <p className="statValue">{stats.totalUsers}</p>
                  </div>
                  <div className="statCard">
                    <p className="statLabel">Pending Orders</p>
                    <p className="statValue">{stats.pendingOrders}</p>
                  </div>
                </div>

                <div className="adminTableCard">
                  <div className="adminTableHeader">
                    <h3 className="adminTableTitle">Recent Orders</h3>
                  </div>
                  <table className="adminTable">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td style={{ fontWeight: 600 }}>{order.user?.name || "N/A"}</td>
                          <td>{order.items.map((i) => i.menuItem?.name || "Item").join(", ")}</td>
                          <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{order.totalAmount}</td>
                          <td><span className={`statusBadge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                          <td style={{ fontSize: 12, color: "#999" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {tab === "menu" && (
              <div className="adminTableCard">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">Menu Items ({menuItems.length})</h3>
                  <button className="adminBtnPrimary" onClick={() => { setForm({}); setModal("menu"); }}>
                    <Plus size={16} /> Add Item
                  </button>
                </div>
                <table className="adminTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item._id}>
                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                        <td>{item.category}</td>
                        <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{item.price}</td>
                        <td>{item.isAvailable ? <span className="statusBadge statusDelivered">Yes</span> : <span className="statusBadge statusCancelled">No</span>}</td>
                        <td>
                          <button className="adminActionBtn adminBtnEdit" onClick={() => { setForm(item); setModal("menu"); }}>
                            <Pencil size={12} /> Edit
                          </button>
                          <button className="adminActionBtn adminBtnDelete" onClick={() => handleDeleteMenu(item._id)} style={{ marginLeft: 6 }}>
                            <Trash2 size={12} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "orders" && (
              <div className="adminTableCard">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">All Orders ({orders.length})</h3>
                </div>
                <table className="adminTable">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td style={{ fontSize: 12, fontFamily: "monospace" }}>{order._id.slice(-6).toUpperCase()}</td>
                        <td style={{ fontWeight: 600 }}>{order.user?.name || "N/A"}</td>
                        <td>{order.items.map((i) => `${i.menuItem?.name || "Item"} x${i.quantity}`).join(", ")}</td>
                        <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{order.totalAmount}</td>
                        <td><span style={{ fontSize: 11, textTransform: "capitalize" }}>{order.orderType}</span></td>
                        <td><span className={`statusBadge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", fontSize: 12, cursor: "pointer" }}
                          >
                            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "users" && (
              <div className="adminTableCard">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">All Users ({users.length})</h3>
                </div>
                <table className="adminTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td style={{ fontWeight: 600 }}>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "-"}</td>
                        <td>{user.isAdmin ? <span className="statusBadge statusConfirmed">Admin</span> : <span className="statusBadge statusPending">User</span>}</td>
                        <td style={{ fontSize: 12, color: "#999" }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          {!user.isAdmin && (
                            <button className="adminActionBtn adminBtnDelete" onClick={() => handleDeleteUser(user._id)}>
                              <Trash2 size={12} /> Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {modal === "menu" && (
        <div className="adminModal" onClick={() => setModal(null)}>
          <div className="adminModalCard" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 className="adminModalTitle" style={{ margin: 0 }}>{form._id ? "Edit Menu Item" : "Add Menu Item"}</h3>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleMenuSubmit}>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Name</label>
                <input className="adminFormInput" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chicken Dum Biryani" required />
              </div>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Description</label>
                <textarea className="adminFormTextarea" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the dish..." required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Price (₹)</label>
                  <input className="adminFormInput" type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
                </div>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Category</label>
                  <select className="adminFormSelect" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                    <option value="">Select...</option>
                    {MENU_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Spice Level</label>
                  <select className="adminFormSelect" value={form.spiceLevel || "Medium"} onChange={(e) => setForm({ ...form, spiceLevel: e.target.value })}>
                    <option>Mild</option>
                    <option>Medium</option>
                    <option>Spicy</option>
                  </select>
                </div>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Available</label>
                  <select className="adminFormSelect" value={form.isAvailable ? "true" : "false"} onChange={(e) => setForm({ ...form, isAvailable: e.target.value === "true" })}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Image URL</label>
                <input className="adminFormInput" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="adminFormActions">
                <button type="button" className="adminBtnSecondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="adminBtnPrimary">{form._id ? "Update Item" : "Create Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
