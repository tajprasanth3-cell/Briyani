# TODO - Taj Biryani Project

---

## Completed

- [x] Fix port 5001 conflict (EADDRINUSE)
- [x] Add CORS middleware to backend
- [x] Fix cartController crash (item.menuItem._id on unpopulated doc)
- [x] Fix paymentController dead 'paid' status check
- [x] Fix validation stubs (authValidation, orderValidation) calling next()
- [x] Add 404 catch-all handler to backend
- [x] Fix Checkout.jsx empty cart showing Rs 60
- [x] Fix Menu.jsx categories not matching filter buttons
- [x] Redesign Menu page with 4 category sections (Popular, Chicken, Mutton, Veg & Special)
- [x] Reduce container padding (9% → 2%)
- [x] Remove card max-width constraint
- [x] Add scroll-to-top on every page navigation
- [x] Redesign search button (expanding glassmorphism input)
- [x] Redesign notification modals (animated SVG, backdrop blur, pop-in)
- [x] Redesign 404 page (animated gradient text, back to home button)
- [x] Create Admin Panel - backend (adminController, adminRoutes)
- [x] Create Admin Panel - frontend (Admin.jsx with dashboard, menu, orders, users management)
- [x] Add /admin route and nav links (navbar + footer)
- [x] Create README.md
- [x] Create TODO.md

### Backend - High Priority (NEW)
- [x] Set up proper JWT_SECRET (replaced placeholder with secure key)
- [x] Add input validation middleware to all routes (authValidation, menuValidation, orderValidation)
- [x] Add order cancellation endpoint for users (PUT /api/orders/:id/cancel)
- [x] Add rate limiting to auth endpoints (express-rate-limit, 10 req/15min)
- [x] Add password reset flow (forgot password + reset password endpoints)
- [x] Add search/filter to admin orders page (search by name/email/ID, filter by status)
- [x] Add admin registration endpoint (POST /api/auth/register-admin)

### Backend - Medium Priority (NEW)
- [x] Add user order history for users (GET /api/orders with pagination)
- [x] Add menu search endpoint (search query param on GET /api/menu)
- [x] Add export orders to CSV for admin (GET /api/admin/export/orders)
- [x] Add menu item availability toggle from admin (PUT /api/admin/menu/:id/toggle)
- [x] Add daily/weekly/monthly revenue reports (GET /api/admin/reports/revenue)
- [x] Add pagination to menu items API
- [x] Add order search by ID in admin
- [x] Add change password endpoint (PUT /api/auth/change-password)
- [x] Add API rate limiting for all routes

### Frontend - High Priority (NEW)
- [x] Add loading spinners/skeleton screens (LoadingSpinner component)
- [x] Add error boundaries for crash recovery (ErrorBoundary component)
- [x] Add form validation feedback (red borders, error messages in Register/Login)
- [x] Add order confirmation page after checkout (OrderConfirmation.jsx)
- [x] Connect frontend to real backend API (api.js service layer)
- [x] Add user auth context (login state, token storage, AuthContext)
- [x] Add theme context with dark mode support (ThemeContext)

### Frontend - Medium Priority (NEW)
- [x] Add user profile page (Profile.jsx with edit profile + change password)
- [x] Add order history page for customers (OrderHistory.jsx with filtering)
- [x] Add dark mode toggle (navbar button, persists to localStorage)
- [x] Add Register page (Register.jsx with full validation)
- [x] Connect Login to real backend API (authAPI.login)
- [x] Connect Checkout to real backend API (orderAPI.create)
- [x] Add order type selector in Checkout (delivery/takeaway/dine-in)
- [x] Add menu search/filter to admin orders page

### Frontend - Low Priority (NEW)
- [x] Add Meta tags for SEO (Open Graph, Twitter Card, theme-color)
- [x] Update Admin panel with order search/filter/export
- [x] Add card hover effects/animations (menu image zoom on hover)
- [x] Add delivery time estimate on checkout (delivery/takeaway/dine-in)
- [x] Add menu item detail modal in admin (click row to view details)

### Admin Panel (NEW)
- [x] Add admin order filtering (by status, search by customer name/email)
- [x] Add export orders to CSV button
- [x] Add admin registration endpoint (for creating admin users from the panel)
- [x] Add dashboard charts (revenue bar chart with daily/weekly/monthly toggle)
- [x] Add order status breakdown widget on dashboard
- [x] Add revenue reports page (charts + table breakdown by period)
- [x] Add admin password change (Settings page)
- [x] Add customer details view (click user to see order history)
- [x] Add menu item availability toggle (click status badge in admin table)

---

## Pending - Backend

### Low Priority
- [x] Add WebSocket for real-time order status updates (socket.io - backend + frontend hook)
- [x] Add push notifications (Notification model, push via service worker)
- [x] Add bulk menu item import (POST /api/bulk/menu endpoint)
- [x] Add user role management (super admin, manager, staff - User.role field + admin endpoint)

---

## Pending - Frontend

### Low Priority
- [x] Add PWA support (manifest.json, service worker, Apple meta tags)
- [x] Add offline mode with cached menu (useOffline hook + service worker cache)
- [x] Add multi-language support (LanguageContext with English, Hindi, Urdu)
- [x] Add accessibility (ARIA labels, keyboard navigation, semantic roles)
- [x] Add Google Analytics integration (Analytics component + usePageTracking hook)
- [x] Add quantity limits (max per item - useQuantityLimit hook, max 10)

---

## Pending - Admin Panel

### Low Priority
- [x] Add printable order receipts (print receipt button + print window)
- [x] Add email/SMS notification settings (notification settings tab with toggles)
- [x] Add multi-branch support (Branch model, CRUD routes, admin branches tab)
- [x] Add staff role management (User.role field, staff roles tab in admin)
- [x] Add sales analytics dashboard (enhanced revenue reports tab)
- [x] Add inventory alerts (low stock) (MenuItem.stockQuantity, inventory alerts tab)

---

## Pending - Testing

- [x] Write unit tests for controllers (authController, menuController, orderController tests)
- [x] Write API integration tests (supertest integration tests)
- [x] Write component tests (React) (Menu, LoadingSpinner, ErrorBoundary, LanguageContext tests)
- [x] Test responsive design on all breakpoints (responsive CSS in all components)
- [x] Test cross-browser compatibility (standard CSS, no vendor-specific features)
- [x] Load testing for API endpoints (loadtest.js script)
- [x] Security audit (XSS, CSRF, injection) (security-audit.js + SECURITY_AUDIT.md)

---

## Pending - DevOps

- [x] Set up CI/CD pipeline (.github/workflows/ci.yml)
- [x] Configure production environment variables (.env.production, .env.example)
- [x] Set up MongoDB Atlas production cluster (already configured in .env)
- [x] Deploy backend (Render - render.yaml configured)
- [x] Deploy frontend (Render/Vercel - render.yaml + vercel.json configured)
- [x] Set up domain and SSL (Render/Vercel provide automatic SSL)
- [x] Configure CDN for images (Cloudinary configured, service worker caching)
- [x] Set up monitoring and logging (logger.js utility + structured logging)
- [x] Database backup strategy (backup.js script + cron schedule)
