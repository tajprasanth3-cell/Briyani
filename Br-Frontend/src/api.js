const API_BASE = "http://localhost:5001/api";

const getHeaders = () => {
  const token = localStorage.getItem("taj_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },
  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(res);
  },
  resetPassword: async (email, code, password) => {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, password }),
    });
    return handleResponse(res);
  },
};

export const userAPI = {
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/users/profile`, { headers: getHeaders() });
    return handleResponse(res);
  },
  updateProfile: async (data) => {
    const res = await fetch(`${API_BASE}/users/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
};

export const menuAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/menu?${query}`);
    return handleResponse(res);
  },
  getById: async (id) => {
    const res = await fetch(`${API_BASE}/menu/${id}`);
    return handleResponse(res);
  },
};

export const cartAPI = {
  get: async () => {
    const res = await fetch(`${API_BASE}/cart`, { headers: getHeaders() });
    return handleResponse(res);
  },
  add: async (menuItemId, quantity = 1) => {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ menuItemId, quantity }),
    });
    return handleResponse(res);
  },
  remove: async (itemId) => {
    const res = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

export const orderAPI = {
  create: async (orderData) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  },
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/orders?${query}`, { headers: getHeaders() });
    return handleResponse(res);
  },
  getById: async (id) => {
    const res = await fetch(`${API_BASE}/orders/${id}`, { headers: getHeaders() });
    return handleResponse(res);
  },
  cancel: async (id) => {
    const res = await fetch(`${API_BASE}/orders/${id}/cancel`, {
      method: "PUT",
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};
