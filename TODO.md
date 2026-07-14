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

---

## In Progress

- [ ] Test admin panel with real MongoDB data
- [ ] Create first admin user in database
- [ ] Test all API endpoints with frontend

---

## Pending - Backend

### High Priority
- [ ] Set up proper JWT_SECRET (replace placeholder)
- [ ] Add input validation middleware to all routes
- [ ] Add image upload to Cloudinary (menu items)
- [ ] Add email notifications (order confirmation, password reset)
- [ ] Add order cancellation endpoint for users
- [ ] Add pagination to menu items API
- [ ] Add search/filter to admin orders page

### Medium Priority
- [ ] Add rate limiting to auth endpoints
- [ ] Add password reset flow (forgot password)
- [ ] Add order history for users
- [ ] Add menu item ratings/reviews
- [ ] Add inventory tracking for menu items
- [ ] Add daily/weekly/monthly revenue reports
- [ ] Add export orders to CSV for admin

### Low Priority
- [ ] Add WebSocket for real-time order status updates
- [ ] Add push notifications
- [ ] Add menu item availability toggle from admin
- [ ] Add bulk menu item import
- [ ] Add order search by ID in admin
- [ ] Add user role management (super admin, manager, staff)

---

## Pending - Frontend

### High Priority
- [ ] Add loading spinners/skeleton screens
- [ ] Add error boundaries for crash recovery
- [ ] Add form validation feedback (red borders, error messages)
- [ ] Add "Remove from cart" confirmation dialog
- [ ] Add order confirmation page after checkout
- [ ] Connect frontend to real backend API (currently uses local state)

### Medium Priority
- [ ] Add image upload preview in admin panel
- [ ] Add dark mode toggle
- [ ] Add user profile page
- [ ] Add order history page for customers
- [ ] Add menu item detail modal/page
- [ ] Add quantity limits (max per item)
- [ ] Add delivery time estimate on checkout

### Low Priority
- [ ] Add animations (page transitions, card hover effects)
- [ ] Add PWA support (installable app)
- [ ] Add offline mode with cached menu
- [ ] Add multi-language support
- [ ] Add accessibility (ARIA labels, keyboard navigation)
- [ ] Add Meta tags for SEO
- [ ] Add Google Analytics integration

---

## Pending - Admin Panel

### High Priority
- [ ] Add admin registration (currently manual DB insert)
- [ ] Add dashboard charts (revenue over time, orders per day)
- [ ] Add menu item image upload in admin form
- [ ] Add order filtering (by date, status, customer)
- [ ] Add bulk order status update

### Medium Priority
- [ ] Add admin activity log
- [ ] Add customer details view (order history)
- [ ] Add revenue reports (daily, weekly, monthly)
- [ ] Add menu item availability quick toggle
- [ ] Add admin password change
- [ ] Add admin session timeout

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
