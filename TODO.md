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
- [ ] Add WebSocket for real-time order status updates
- [ ] Add push notifications
- [ ] Add bulk menu item import
- [ ] Add user role management (super admin, manager, staff)

---

## Pending - Frontend

### Low Priority
- [ ] Add PWA support (installable app)
- [ ] Add offline mode with cached menu
- [ ] Add multi-language support
- [ ] Add accessibility (ARIA labels, keyboard navigation)
- [ ] Add Google Analytics integration
- [ ] Add quantity limits (max per item)

---

## Pending - Admin Panel

### Low Priority
- [ ] Add printable order receipts
- [ ] Add email/SMS notification settings
- [ ] Add multi-branch support
- [ ] Add staff role management
- [ ] Add sales analytics dashboard
- [ ] Add inventory alerts (low stock)

---

## Pending - Testing

- [ ] Write unit tests for controllers
- [ ] Write API integration tests
- [ ] Write component tests (React)
- [ ] Test responsive design on all breakpoints
- [ ] Test cross-browser compatibility
- [ ] Load testing for API endpoints
- [ ] Security audit (XSS, CSRF, injection)

---

## Pending - DevOps

- [ ] Set up CI/CD pipeline
- [ ] Configure production environment variables
- [ ] Set up MongoDB Atlas production cluster
- [ ] Deploy backend (Railway/Render/Heroku)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Set up domain and SSL
- [ ] Configure CDN for images
- [ ] Set up monitoring and logging
- [ ] Database backup strategy
