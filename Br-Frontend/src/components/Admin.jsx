import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  RefreshCw,
  X,
  Download,
  Search,
  BarChart3,
  Settings,
  Eye,
  Printer,
  Bell,
  Building2,
  Shield,
  AlertTriangle,
  Package,
} from "lucide-react";
import tajLogo from "./Images/taj_logo.png";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

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

.chartContainer {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 160px;
  padding: 16px 0;
}

.chartBar {
  flex: 1;
  min-width: 24px;
  border-radius: 6px 6px 0 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chartBar:hover {
  opacity: 0.85;
  transform: scaleY(1.02);
  transform-origin: bottom;
}

.chartBarLabel {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  color: #999;
  white-space: nowrap;
  font-weight: 600;
}

.chartBarValue {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  color: #1a0404;
  white-space: nowrap;
}

.chartLegend {
  display: flex;
  gap: 20px;
  margin-top: 32px;
  justify-content: center;
}

.chartLegendItem {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
  font-weight: 600;
}

.chartLegendDot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.periodTabs {
  display: flex;
  gap: 4px;
  background: #f0f0f0;
  padding: 4px;
  border-radius: 10px;
}

.periodTab {
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: #666;
  font-family: 'Poppins', sans-serif;
}

.periodTabActive {
  background: #fff;
  color: #1a0404;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.customerDetailCard {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  margin-bottom: 24px;
}

.customerDetailHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.customerAvatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7c66b, #d99523);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #5a0c0c;
}

.menuDetailCard {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  overflow: hidden;
  margin-bottom: 24px;
}

.menuDetailImage {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.menuDetailBody {
  padding: 24px;
}

.adminSettingsForm {
  max-width: 500px;
}

.adminSettingsForm .adminFormGroup {
  margin-bottom: 20px;
}

.menuItemRow {
  cursor: pointer;
}

.menuItemRow:hover td {
  background: #faf8f5;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fadeIn {
  animation: fadeIn 0.3s ease forwards;
}

@media (max-width: 1024px) {
  .statGrid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .adminSidebar {
    display: none;
  }

  .adminSidebar.open {
    display: flex;
    width: 260px;
    z-index: 200;
  }

  .adminOverlay {
    display: block;
  }

  .adminMain { margin-left: 0; padding: 14px; }
  .statGrid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .statCard { padding: 16px; }
  .statValue { font-size: 24px; }
  .statLabel { font-size: 11px; }
  .adminTable { font-size: 12px; }
  .adminTable th, .adminTable td { padding: 10px 10px; }
  .adminTableCard { overflow-x: auto; border-radius: 12px; }
  .adminHeader { flex-wrap: wrap; gap: 12px; }
  .adminTableHeader { flex-wrap: wrap; gap: 10px; padding: 14px 16px; }
  .adminTableTitle { font-size: 15px; }
  .mobile-menu-btn { display: block !important; }
  .adminModalCard { padding: 24px; margin: 10px; border-radius: 16px; }
  .adminTitle { font-size: 22px; }
  .adminSettingsForm { max-width: 100%; }
}

@media (max-width: 480px) {
  .adminMain { padding: 10px; }
  .statGrid { grid-template-columns: 1fr; gap: 10px; }
  .statCard { padding: 14px; }
  .statValue { font-size: 22px; }
  .adminTable th, .adminTable td { padding: 8px 8px; font-size: 11px; }
  .adminModalCard { padding: 18px; border-radius: 14px; max-height: 95vh; }
  .adminTitle { font-size: 18px; }
  .adminFormActions { flex-direction: column; }
  .adminFormActions button { width: 100%; justify-content: center; }
  .periodTabs { flex-wrap: wrap; }
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
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [token] = useState(() => localStorage.getItem("adminToken") || localStorage.getItem("taj_token") || "");
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [revenueData, setRevenueData] = useState([]);
  const [revenuePeriod, setRevenuePeriod] = useState("daily");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [adminPassword, setAdminPassword] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [settingsMsg, setSettingsMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventoryAlerts, setInventoryAlerts] = useState(null);
  const [branches, setBranches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [staffRoles, setStaffRoles] = useState([]);
  const [branchForm, setBranchForm] = useState({});
  const [notifSettings, setNotifSettings] = useState({ email: true, sms: false, push: true });
  const [receiptOrder, setReceiptOrder] = useState(null);

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

  const fetchRevenue = async (period) => {
    try {
      const res = await fetch(`${API}/admin/reports/revenue?period=${period}`, { headers });
      const data = await res.json();
      if (data.success) setRevenueData(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchCustomerOrders = async (userId) => {
    try {
      const res = await fetch(`${API}/admin/orders?search=${userId}`, { headers });
      const data = await res.json();
      if (data.success) setCustomerOrders(data.data.orders || data.data);
    } catch (e) { console.error(e); }
  };

  const handleViewCustomer = (user) => {
    setSelectedCustomer(user);
    fetchCustomerOrders(user._id);
    setTab("customers");
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
      if (data.success) setOrders(data.data.orders || data.data);
    } catch (e) { console.error(e); }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API}/menu`);
      const data = await res.json();
      if (data.success) setMenuItems(data.data.items || data.data);
    } catch (e) { console.error(e); }
  };

  const fetchInventoryAlerts = async () => {
    try {
      const res = await fetch(`${API}/admin/inventory/alerts`, { headers });
      const data = await res.json();
      if (data.success) setInventoryAlerts(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchBranches = async () => {
    try {
      const res = await fetch(`${API}/branches/all`, { headers });
      const data = await res.json();
      if (data.success) setBranches(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API}/notifications?limit=50`, { headers });
      const data = await res.json();
      if (data.success) setNotifications(data.data.notifications || []);
    } catch (e) { console.error(e); }
  };

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/branches`, {
        method: "POST",
        headers,
        body: JSON.stringify(branchForm),
      });
      setBranchForm({});
      setModal(null);
      fetchBranches();
    } catch (e) { console.error(e); }
  };

  const handleDeleteBranch = async (id) => {
    if (!confirm("Delete this branch?")) return;
    try {
      await fetch(`${API}/branches/${id}`, { method: "DELETE", headers });
      fetchBranches();
    } catch (e) { console.error(e); }
  };

  const handleUpdateStock = async (itemId, qty) => {
    try {
      await fetch(`${API}/admin/menu/${itemId}/stock`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ stockQuantity: qty }),
      });
      fetchMenu();
      fetchInventoryAlerts();
    } catch (e) { console.error(e); }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await fetch(`${API}/admin/users/${userId}/role`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ role }),
      });
      fetchUsers();
    } catch (e) { console.error(e); }
  };

  const handlePrintReceipt = (order) => {
    setReceiptOrder(order);
    setTimeout(() => {
      const printWindow = window.open("", "_blank", "width=400,height=600");
      printWindow.document.write(`
        <html><head><title>Order Receipt - #${order._id.slice(-6).toUpperCase()}</title>
        <style>
          body { font-family: monospace; padding: 20px; max-width: 350px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 10px; margin-bottom: 10px; }
          .header h2 { margin: 0; font-size: 18px; }
          .header p { margin: 2px 0; font-size: 11px; color: #666; }
          .item { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; border-bottom: 1px dotted #ddd; }
          .total { font-weight: bold; font-size: 16px; border-top: 2px solid #333; padding-top: 8px; margin-top: 8px; }
          .footer { text-align: center; margin-top: 16px; font-size: 10px; color: #999; border-top: 2px dashed #333; padding-top: 10px; }
        </style></head><body>
        <div class="header">
          <h2>TAJ BIRYANI</h2>
          <p>Order #${order._id.slice(-6).toUpperCase()}</p>
          <p>${new Date(order.createdAt).toLocaleString()}</p>
          <p>${order.orderType?.toUpperCase() || "DINE-IN"}</p>
        </div>
        ${order.items.map((i) => `<div class="item"><span>${i.menuItem?.name || "Item"} x${i.quantity}</span><span>₹${(i.price * i.quantity).toFixed(2)}</span></div>`).join("")}
        <div class="total">TOTAL: ₹${order.totalAmount.toFixed(2)}</div>
        <p style="font-size: 12px; margin: 8px 0;">Status: ${order.status}</p>
        ${order.deliveryAddress ? `<p style="font-size: 11px;">Delivery: ${order.deliveryAddress}</p>` : ""}
        <div class="footer">Thank you for ordering!<br/>Taj Biryani - Royal Taste</div>
        </body></html>
      `);
      printWindow.document.close();
      printWindow.print();
    }, 100);
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchDashboard(), fetchUsers(), fetchOrders(), fetchMenu(), fetchRevenue(revenuePeriod), fetchInventoryAlerts(), fetchBranches(), fetchNotifications()]);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, []);

  useEffect(() => { fetchRevenue(revenuePeriod); }, [revenuePeriod]);

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

  const handleToggleAvailability = async (id) => {
    try {
      await fetch(`${API}/admin/menu/${id}/toggle`, { method: "PUT", headers });
      fetchMenu();
    } catch (e) { console.error(e); }
  };

  const handleAdminPasswordChange = async (e) => {
    e.preventDefault();
    setSettingsMsg("");
    if (adminPassword.newPassword !== adminPassword.confirmPassword) {
      setSettingsMsg("New passwords do not match");
      return;
    }
    if (adminPassword.newPassword.length < 6) {
      setSettingsMsg("Password must be at least 6 characters");
      return;
    }
    try {
      const res = await fetch(`${API}/auth/change-password`, {
        method: "PUT",
        headers: { ...headers, Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: adminPassword.currentPassword, newPassword: adminPassword.newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMsg("Password changed successfully!");
        setAdminPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setSettingsMsg(data.message || "Failed to change password");
      }
    } catch { setSettingsMsg("Failed to change password"); }
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
        localStorage.setItem("taj_token", data.data.token);
        localStorage.setItem("taj_user", JSON.stringify(data.data));
        window.location.reload();
      } else {
        alert(data.message || "Not an admin account");
      }
    } catch { alert("Login failed"); }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch(`${API}/admin/export/orders`, { headers });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "taj-biryani-orders.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch { alert("Export failed"); }
  };

  const filteredOrders = orders.filter((order) => {
    if (orderFilter !== "all" && order.status !== orderFilter) return false;
    if (orderSearch) {
      const q = orderSearch.toLowerCase();
      const name = order.user?.name?.toLowerCase() || "";
      const email = order.user?.email?.toLowerCase() || "";
      const id = order._id.toLowerCase();
      if (!name.includes(q) && !email.includes(q) && !id.includes(q)) return false;
    }
    return true;
  });

  if (!token) {
    return (
      <div className="adminPage">
        <style>{adminStyles}</style>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div className="adminModalCard" style={{ maxWidth: 400 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div className="adminLogoCircle" style={{ width: 60, height: 60, margin: "0 auto 16px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={tajLogo} alt="Taj Biryani Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

      {sidebarOpen && <div className="adminOverlay" onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }} />}

      <aside className={`adminSidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="adminSidebarLogo">
          <div className="adminLogoCircle" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={tajLogo} alt="Taj Biryani Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
          { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
          { id: "inventory", label: "Inventory", icon: <Package size={18} /> },
          { id: "branches", label: "Branches", icon: <Building2 size={18} /> },
          { id: "staff", label: "Staff Roles", icon: <Shield size={18} /> },
          { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
          { id: "settings", label: "Settings", icon: <Settings size={18} /> },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'none', background: 'linear-gradient(135deg, #6b0f0f, #8b1a1a)', color: '#f7c66b', border: 'none', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }} className="mobile-menu-btn">
              ☰
            </button>
            <div>
              <h1 className="adminTitle">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
              <p className="adminSubtitle">Manage your restaurant</p>
            </div>
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

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                  <div className="adminTableCard" style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <h3 className="adminTableTitle">Revenue Overview</h3>
                      <div className="periodTabs">
                        {["daily", "weekly", "monthly"].map((p) => (
                          <button key={p} className={`periodTab ${revenuePeriod === p ? "periodTabActive" : ""}`} onClick={() => setRevenuePeriod(p)}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    {revenueData.length > 0 ? (
                      <div>
                        <div className="chartContainer" style={{ marginLeft: 40, marginRight: 40 }}>
                          {revenueData.slice(0, 12).reverse().map((item, i) => {
                            const maxRev = Math.max(...revenueData.map((d) => d.revenue));
                            const height = maxRev > 0 ? (item.revenue / maxRev) * 140 : 0;
                            const label = revenuePeriod === "daily"
                              ? `${item._id.day}/${item._id.month}`
                              : revenuePeriod === "weekly"
                              ? `W${item._id.week}`
                              : `${item._id.month}/${item._id.year}`;
                            return (
                              <div key={i} className="chartBar" style={{ height: Math.max(height, 4), background: `linear-gradient(180deg, #f7c66b, #6b0f0f)` }}>
                                <span className="chartBarLabel">{label}</span>
                                <span className="chartBarValue">₹{item.revenue}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="chartLegend">
                          <div className="chartLegendItem">
                            <div className="chartLegendDot" style={{ background: "linear-gradient(135deg, #f7c66b, #6b0f0f)" }} />
                            Revenue
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="adminEmpty" style={{ padding: 40 }}>
                        <div className="adminEmptyIcon">📊</div>
                        <p>No revenue data yet</p>
                      </div>
                    )}
                  </div>

                  <div className="adminTableCard" style={{ padding: 24 }}>
                    <h3 className="adminTableTitle" style={{ marginBottom: 16 }}>Order Status</h3>
                    {[
                      { label: "Pending", count: stats.pendingOrders, color: "#d97706" },
                      { label: "Delivered", count: orders.filter((o) => o.status === "delivered").length, color: "#16a34a" },
                      { label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length, color: "#dc2626" },
                      { label: "Preparation", count: orders.filter((o) => ["confirmed", "preparing", "ready"].includes(o.status)).length, color: "#4f46e5" },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{s.label}</span>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#1a0404" }}>{s.count}</span>
                      </div>
                    ))}
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
                      <tr key={item._id} className="menuItemRow" onClick={() => setSelectedMenuItem(item)}>
                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                        <td>{item.category}</td>
                        <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{item.price}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleToggleAvailability(item._id)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 20,
                              border: "none",
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: "pointer",
                              background: item.isAvailable ? "#dcfce7" : "#fee2e2",
                              color: item.isAvailable ? "#16a34a" : "#dc2626",
                            }}
                          >
                            {item.isAvailable ? "Active" : "Disabled"}
                          </button>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
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
                  <h3 className="adminTableTitle">All Orders ({filteredOrders.length})</h3>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div style={{ position: "relative" }}>
                      <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
                      <input
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search orders..."
                        style={{ padding: "8px 12px 8px 32px", borderRadius: 8, border: "1px solid #ddd", fontSize: 12, width: 180 }}
                      />
                    </div>
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", fontSize: 12, cursor: "pointer" }}
                    >
                      <option value="all">All Status</option>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="adminBtnSecondary" onClick={handleExportCSV} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Download size={12} /> Export CSV
                    </button>
                  </div>
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
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td style={{ fontSize: 12, fontFamily: "monospace" }}>{order._id.slice(-6).toUpperCase()}</td>
                        <td style={{ fontWeight: 600 }}>{order.user?.name || "N/A"}</td>
                        <td>{order.items.map((i) => `${i.menuItem?.name || "Item"} x${i.quantity}`).join(", ")}</td>
                        <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{order.totalAmount}</td>
                        <td><span style={{ fontSize: 11, textTransform: "capitalize" }}>{order.orderType}</span></td>
                        <td><span className={`statusBadge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", fontSize: 12, cursor: "pointer" }}
                            >
                              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button className="adminActionBtn adminBtnEdit" onClick={() => handlePrintReceipt(order)} title="Print Receipt">
                              <Printer size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="adminEmpty">
                    <div className="adminEmptyIcon">📋</div>
                    <p>No orders match your filters</p>
                  </div>
                )}
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
                            <>
                              <button className="adminActionBtn adminBtnEdit" onClick={() => handleViewCustomer(user)} style={{ marginRight: 6 }}>
                                <Eye size={12} /> View
                              </button>
                              <button className="adminActionBtn adminBtnDelete" onClick={() => handleDeleteUser(user._id)}>
                                <Trash2 size={12} /> Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "reports" && (
              <div className="adminTableCard fadeIn" style={{ padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h3 className="adminTableTitle" style={{ margin: 0 }}>Revenue Reports</h3>
                  <div className="periodTabs">
                    {["daily", "weekly", "monthly"].map((p) => (
                      <button key={p} className={`periodTab ${revenuePeriod === p ? "periodTabActive" : ""}`} onClick={() => setRevenuePeriod(p)}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {revenueData.length > 0 ? (
                  <div>
                    <div className="chartContainer" style={{ marginLeft: 40, marginRight: 40, height: 220 }}>
                      {revenueData.slice(0, 15).reverse().map((item, i) => {
                        const maxRev = Math.max(...revenueData.map((d) => d.revenue));
                        const height = maxRev > 0 ? (item.revenue / maxRev) * 200 : 0;
                        const label = revenuePeriod === "daily"
                          ? `${item._id.day}/${item._id.month}`
                          : revenuePeriod === "weekly"
                          ? `W${item._id.week}`
                          : `${item._id.month}/${item._id.year}`;
                        return (
                          <div key={i} className="chartBar" style={{ height: Math.max(height, 4), background: `linear-gradient(180deg, #22c55e, #16a34a)` }}>
                            <span className="chartBarLabel">{label}</span>
                            <span className="chartBarValue">₹{item.revenue}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 36, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1a0404", margin: "0 0 12px" }}>Breakdown</h4>
                      <table className="adminTable" style={{ maxWidth: 500 }}>
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>Orders</th>
                            <th style={{ textAlign: "right" }}>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {revenueData.map((item, i) => {
                            const label = revenuePeriod === "daily"
                              ? `${item._id.day}/${item._id.month}/${item._id.year}`
                              : revenuePeriod === "weekly"
                              ? `Week ${item._id.week}, ${item._id.year}`
                              : `${item._id.month}/${item._id.year}`;
                            return (
                              <tr key={i}>
                                <td style={{ fontWeight: 600 }}>{label}</td>
                                <td>{item.count} orders</td>
                                <td style={{ textAlign: "right", fontWeight: 700, color: "#16a34a" }}>₹{item.revenue.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="adminEmpty" style={{ padding: 60 }}>
                    <div className="adminEmptyIcon">📊</div>
                    <p>No revenue data available yet. Reports will appear once orders are placed.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "inventory" && (
              <div className="adminTableCard fadeIn">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">
                    <AlertTriangle size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: "#d97706" }} />
                    Inventory Alerts
                    {inventoryAlerts && inventoryAlerts.totalLowStock > 0 && (
                      <span className="statusBadge statusPending" style={{ marginLeft: 8 }}>{inventoryAlerts.totalLowStock} low stock</span>
                    )}
                  </h3>
                </div>
                {inventoryAlerts && inventoryAlerts.lowStockItems.length > 0 ? (
                  <table className="adminTable">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Threshold</th>
                        <th>Status</th>
                        <th>Update Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryAlerts.lowStockItems.map((item) => (
                        <tr key={item._id}>
                          <td style={{ fontWeight: 600 }}>{item.name}</td>
                          <td>{item.category}</td>
                          <td style={{ fontWeight: 700, color: item.stockQuantity === 0 ? "#dc2626" : "#d97706" }}>{item.stockQuantity}</td>
                          <td>{item.lowStockThreshold}</td>
                          <td>
                            <span className={`statusBadge ${item.stockQuantity === 0 ? "statusCancelled" : "statusPending"}`}>
                              {item.stockQuantity === 0 ? "Out of Stock" : "Low Stock"}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 4 }}>
                              <input
                                type="number"
                                min="0"
                                defaultValue={item.stockQuantity}
                                style={{ width: 70, padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontSize: 12 }}
                                onBlur={(e) => handleUpdateStock(item._id, Number(e.target.value))}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="adminEmpty" style={{ padding: 60 }}>
                    <div className="adminEmptyIcon">📦</div>
                    <p>No inventory alerts. All items are well stocked.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "branches" && (
              <div className="adminTableCard fadeIn">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">Branches ({branches.length})</h3>
                  <button className="adminBtnPrimary" onClick={() => { setBranchForm({}); setModal("branch"); }}>
                    <Plus size={16} /> Add Branch
                  </button>
                </div>
                {branches.length > 0 ? (
                  <table className="adminTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Hours</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((b) => (
                        <tr key={b._id}>
                          <td style={{ fontWeight: 600 }}>{b.name}</td>
                          <td>{b.address}</td>
                          <td>{b.city}</td>
                          <td>{b.phone || "-"}</td>
                          <td style={{ fontSize: 12 }}>{b.openingHours?.open || "11:00"} - {b.openingHours?.close || "23:00"}</td>
                          <td><span className={`statusBadge ${b.isActive ? "statusDelivered" : "statusCancelled"}`}>{b.isActive ? "Active" : "Inactive"}</span></td>
                          <td>
                            <button className="adminActionBtn adminBtnDelete" onClick={() => handleDeleteBranch(b._id)}>
                              <Trash2 size={12} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="adminEmpty" style={{ padding: 60 }}>
                    <div className="adminEmptyIcon">🏢</div>
                    <p>No branches configured yet.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "staff" && (
              <div className="adminTableCard fadeIn">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">Staff Role Management</h3>
                </div>
                <table className="adminTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Current Role</th>
                      <th>Change Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td style={{ fontWeight: 600 }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`statusBadge ${u.role === "super-admin" ? "statusOut" : u.role === "admin" ? "statusConfirmed" : u.role === "manager" ? "statusPreparing" : u.role === "staff" ? "statusReady" : "statusPending"}`}>
                            {u.role || "customer"}
                          </span>
                        </td>
                        <td>
                          <select
                            value={u.role || "customer"}
                            onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", fontSize: 12, cursor: "pointer" }}
                          >
                            <option value="customer">Customer</option>
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                            <option value="super-admin">Super Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "notifications" && (
              <div className="adminTableCard fadeIn">
                <div className="adminTableHeader">
                  <h3 className="adminTableTitle">Notification Settings</h3>
                </div>
                <div style={{ padding: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1a0404", margin: "0 0 16px" }}>Email / SMS / Push Notifications</h4>
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive order updates via email" },
                    { key: "sms", label: "SMS Notifications", desc: "Receive order updates via SMS" },
                    { key: "push", label: "Push Notifications", desc: "Receive browser push notifications" },
                  ].map((s) => (
                    <div key={s.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1a0404" }}>{s.label}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#999" }}>{s.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifSettings({ ...notifSettings, [s.key]: !notifSettings[s.key] })}
                        style={{
                          width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
                          background: notifSettings[s.key] ? "#16a34a" : "#ddd",
                          position: "relative", transition: "all 0.3s",
                        }}
                        role="switch"
                        aria-checked={notifSettings[s.key]}
                        aria-label={`Toggle ${s.label}`}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", background: "#fff",
                          position: "absolute", top: 3, left: notifSettings[s.key] ? 25 : 3,
                          transition: "left 0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }} />
                      </button>
                    </div>
                  ))}
                  <div style={{ marginTop: 24 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1a0404", margin: "0 0 16px" }}>Recent Notifications ({notifications.length})</h4>
                    {notifications.length > 0 ? (
                      notifications.slice(0, 10).map((n) => (
                        <div key={n._id} style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0", opacity: n.read ? 0.6 : 1 }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1a0404" }}>{n.title}</p>
                          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#666" }}>{n.message}</p>
                          <p style={{ margin: "2px 0 0", fontSize: 10, color: "#999" }}>{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: 13, color: "#999" }}>No notifications yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tab === "settings" && (
              <div className="adminTableCard fadeIn" style={{ padding: 32 }}>
                <h3 className="adminTableTitle" style={{ margin: "0 0 24px" }}>Admin Settings</h3>
                <div className="adminSettingsForm">
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1a0404", margin: "0 0 16px" }}>Change Password</h4>
                  <form onSubmit={handleAdminPasswordChange}>
                    <div className="adminFormGroup">
                      <label className="adminFormLabel">Current Password</label>
                      <input className="adminFormInput" type="password" value={adminPassword.currentPassword} onChange={(e) => setAdminPassword({ ...adminPassword, currentPassword: e.target.value })} required />
                    </div>
                    <div className="adminFormGroup">
                      <label className="adminFormLabel">New Password</label>
                      <input className="adminFormInput" type="password" value={adminPassword.newPassword} onChange={(e) => setAdminPassword({ ...adminPassword, newPassword: e.target.value })} required />
                    </div>
                    <div className="adminFormGroup">
                      <label className="adminFormLabel">Confirm New Password</label>
                      <input className="adminFormInput" type="password" value={adminPassword.confirmPassword} onChange={(e) => setAdminPassword({ ...adminPassword, confirmPassword: e.target.value })} required />
                    </div>
                    {settingsMsg && (
                      <p style={{ fontSize: 13, fontWeight: 600, color: settingsMsg.includes("success") ? "#16a34a" : "#dc2626", margin: "0 0 16px" }}>
                        {settingsMsg}
                      </p>
                    )}
                    <button className="adminBtnPrimary" type="submit">Update Password</button>
                  </form>
                </div>
              </div>
            )}

            {tab === "customers" && selectedCustomer && (
              <div className="fadeIn">
                <button className="adminBtnSecondary" onClick={() => { setSelectedCustomer(null); setTab("users"); }} style={{ marginBottom: 16 }}>
                  ← Back to Users
                </button>
                <div className="customerDetailCard">
                  <div className="customerDetailHeader">
                    <div className="customerAvatar">{selectedCustomer.name?.charAt(0)?.toUpperCase() || "U"}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1a0404" }}>{selectedCustomer.name}</h3>
                      <p style={{ margin: "2px 0 0", fontSize: 13, color: "#999" }}>{selectedCustomer.email}</p>
                      {selectedCustomer.phone && <p style={{ margin: "2px 0 0", fontSize: 13, color: "#999" }}>{selectedCustomer.phone}</p>}
                    </div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <p style={{ margin: 0, fontSize: 12, color: "#999" }}>Member since</p>
                      <p style={{ margin: "2px 0 0", fontSize: 13, fontWeight: 600 }}>{new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1a0404", margin: "0 0 12px" }}>Order History ({customerOrders.length} orders)</h4>
                  {customerOrders.length > 0 ? (
                    <table className="adminTable">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerOrders.map((order) => (
                          <tr key={order._id}>
                            <td style={{ fontSize: 12, fontFamily: "monospace" }}>{order._id.slice(-6).toUpperCase()}</td>
                            <td>{order.items.map((i) => `${i.menuItem?.name || "Item"} x${i.quantity}`).join(", ")}</td>
                            <td style={{ fontWeight: 700, color: "#6b0f0f" }}>₹{order.totalAmount}</td>
                            <td><span className={`statusBadge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                            <td style={{ fontSize: 12, color: "#999" }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="adminEmpty" style={{ padding: 40 }}>
                      <p>No orders found for this customer</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {modal === "branch" && (
        <div className="adminModal" onClick={() => setModal(null)}>
          <div className="adminModalCard" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 className="adminModalTitle" style={{ margin: 0 }}>Add New Branch</h3>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateBranch}>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Branch Name</label>
                <input className="adminFormInput" value={branchForm.name || ""} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="e.g. Taj Biryani - Andheri" required />
              </div>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Address</label>
                <textarea className="adminFormTextarea" value={branchForm.address || ""} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} placeholder="Full address" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">City</label>
                  <input className="adminFormInput" value={branchForm.city || ""} onChange={(e) => setBranchForm({ ...branchForm, city: e.target.value })} required />
                </div>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Phone</label>
                  <input className="adminFormInput" value={branchForm.phone || ""} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} />
                </div>
              </div>
              <div className="adminFormGroup">
                <label className="adminFormLabel">Email</label>
                <input className="adminFormInput" type="email" value={branchForm.email || ""} onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Opening Time</label>
                  <input className="adminFormInput" type="time" value={branchForm.openingHours?.open || "11:00"} onChange={(e) => setBranchForm({ ...branchForm, openingHours: { ...branchForm.openingHours, open: e.target.value } })} />
                </div>
                <div className="adminFormGroup">
                  <label className="adminFormLabel">Closing Time</label>
                  <input className="adminFormInput" type="time" value={branchForm.openingHours?.close || "23:00"} onChange={(e) => setBranchForm({ ...branchForm, openingHours: { ...branchForm.openingHours, close: e.target.value } })} />
                </div>
              </div>
              <div className="adminFormActions">
                <button type="button" className="adminBtnSecondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="adminBtnPrimary">Create Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {selectedMenuItem && (
        <div className="adminModal" onClick={() => setSelectedMenuItem(null)}>
          <div className="adminModalCard" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 className="adminModalTitle" style={{ margin: 0 }}>Menu Item Details</h3>
              <button onClick={() => setSelectedMenuItem(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}><X size={20} /></button>
            </div>
            {selectedMenuItem.image && (
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                <img src={selectedMenuItem.image} alt={selectedMenuItem.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1a0404", fontFamily: "Georgia, serif" }}>{selectedMenuItem.name}</h4>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#999" }}>{selectedMenuItem.category}</p>
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#6b0f0f" }}>₹{selectedMenuItem.price}</span>
            </div>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, margin: "12px 0" }}>{selectedMenuItem.description || "No description available."}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              <div style={{ background: "#f9f6f1", borderRadius: 10, padding: 12, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#999", fontWeight: 700 }}>Status</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 700, color: selectedMenuItem.isAvailable ? "#16a34a" : "#dc2626" }}>{selectedMenuItem.isAvailable ? "Active" : "Disabled"}</p>
              </div>
              <div style={{ background: "#f9f6f1", borderRadius: 10, padding: 12, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#999", fontWeight: 700 }}>Spice Level</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 700, color: "#1a0404" }}>{selectedMenuItem.spiceLevel || "Medium"}</p>
              </div>
              <div style={{ background: "#f9f6f1", borderRadius: 10, padding: 12, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#999", fontWeight: 700 }}>ID</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, fontWeight: 600, color: "#1a0404", fontFamily: "monospace" }}>{selectedMenuItem._id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="adminBtnSecondary" onClick={() => { setSelectedMenuItem(null); setForm(selectedMenuItem); setModal("menu"); }}>
                <Pencil size={14} /> Edit
              </button>
              <button className="adminBtnPrimary" onClick={() => setSelectedMenuItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
