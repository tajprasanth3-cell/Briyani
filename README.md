# Taj Biryani - Full Stack Restaurant Web App

A complete restaurant management system with customer-facing frontend and admin panel, built with React + Node.js + MongoDB.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Styling | Inline CSS (Royal gold & maroon theme) |

---

## Project Structure

```
br/
├── br-backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── cloudinary.js      # Cloudinary config (not active)
│   │   ├── controllers/
│   │   │   ├── authController.js   # Register, Login, Logout
│   │   │   ├── menuController.js   # Menu CRUD
│   │   │   ├── cartController.js   # Cart operations
│   │   │   ├── orderController.js  # Order creation & tracking
│   │   │   ├── paymentController.js# Payment processing
│   │   │   ├── userController.js   # User profile
│   │   │   └── adminController.js  # Admin dashboard & management
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT protection
│   │   │   ├── adminMiddleware.js  # Admin role check
│   │   │   ├── errorMiddleware.js  # Global error handler
│   │   │   └── uploadMiddleware.js # Multer upload (not active)
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── MenuItem.js
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   └── Payment.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── menuRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── validations/
│   │   │   ├── authValidation.js
│   │   │   ├── menuValidation.js
│   │   │   └── orderValidation.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   ├── responseHandler.js
│   │   │   └── sendEmail.js
│   │   ├── app.js                  # Express app setup
│   │   └── server.js               # Server entry point
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── Br-Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin.jsx           # Admin dashboard
│   │   │   ├── Briyani.jsx         # Home page
│   │   │   ├── Menu.jsx            # Menu page with sections
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   ├── Checkout.jsx        # Checkout form
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Ordertrack.jsx      # Order tracking
│   │   │   └── Images/             # All images
│   │   ├── App.jsx                 # Routes, navbar, footer
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── vite.config.js
│   └── package.json
│
└── Cdatadb/                        # Local DB data
```

---

## Features

### Customer Side
- **Home Page** - Hero section, Popular Biryanis, Catering services, Stats
- **Menu Page** - 4 category sections (Popular, Chicken, Mutton, Veg & Special), search, quantity controls
- **Cart** - Add/remove items, quantity update, coupon codes (ROYAL, 1750, 2500)
- **Checkout** - Delivery form, order summary, bill breakdown
- **Order Tracking** - Track order status
- **Login** - Email/password authentication

### Admin Panel (`/admin`)
- **Dashboard** - Revenue, orders, users, pending orders stats
- **Menu Management** - Add, edit, delete menu items
- **Order Management** - View all orders, update status (pending → confirmed → preparing → ready → delivered)
- **User Management** - View all users, delete non-admin users

### UI/UX
- Expanding search bar in navbar (click to expand)
- Animated notification modals (SVG checkmark, backdrop blur, pop-in animation)
- Scroll-to-top on every page navigation
- Responsive design (mobile, tablet, desktop)
- Royal gold & maroon theme throughout

---

## API Endpoints

### Auth
| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | `/api/auth/register` | name, email, password, phone, address | No |
| POST | `/api/auth/login` | email, password | No |

### Menu
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/menu` | No |
| GET | `/api/menu/:id` | No |
| POST | `/api/menu` | Admin |
| PUT | `/api/menu/:id` | Admin |
| DELETE | `/api/menu/:id` | Admin |

### Cart
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/cart` | User |
| POST | `/api/cart` | User |
| DELETE | `/api/cart/:id` | User |

### Orders
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/orders` | User |
| GET | `/api/orders` | User/Admin |
| GET | `/api/orders/:id` | User/Admin |
| PUT | `/api/orders/:id/status` | Admin |

### Admin
| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/admin/dashboard` | Admin |
| GET | `/api/admin/users` | Admin |
| GET | `/api/admin/orders` | Admin |
| PUT | `/api/admin/orders/:id/status` | Admin |
| DELETE | `/api/admin/users/:id` | Admin |

---

## Setup & Run

### Backend
```bash
cd br-backend
npm install
# Configure .env with MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### Frontend
```bash
cd Br-Frontend
npm install
npm run dev
```

Backend runs on `http://localhost:5001`
Frontend runs on `http://localhost:5173`

---

## Environment Variables (br-backend/.env)

```
PORT=5001
MONGO_URI=mongodb://...
JWT_SECRET=your_secret_here
```

---

## Coupon Codes

| Code | Discount | Details |
|------|----------|---------|
| ROYAL | 50% off | On all orders |
| 1750 | ₹175 off | First order, min ₹699 |
| 2500 | 25% off | Takeaway orders |

---

## Known Limitations

- Image uploads to Cloudinary not implemented
- Email notifications not implemented
- Payment gateway not integrated (mock only)
- No real-time order tracking (WebSocket)
- Admin login requires a pre-existing admin user in MongoDB
