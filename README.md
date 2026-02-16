cat << 'EOF' > README.md
# 🥦 Subjiwala — Online Vegetable Ordering Platform

**Subjiwala** is a full-stack MERN application that digitizes a traditional vegetable (sabji) business.  
The platform allows customers to order fresh vegetables online while vendors/admins manage daily inventory and orders efficiently.

This project is inspired by my real offline wholesale vegetable business and converts manual sabji mandi operations into a structured online system.

---

## 🚀 Objective
Local vegetable markets still depend on:
- Paper-based stock tracking
- Phone/WhatsApp orders
- No inventory control
- No daily price transparency

**Subjiwala solves this by providing a daily dynamic inventory-based ordering system.**

---

## ✨ Features

### 👤 Customer Features
- User Registration & Login
- Secure JWT Authentication
- Browse today's available vegetables
- Add to cart
- Select quantity
- Place order
- View previous orders

### 🧑‍🌾 Admin/Vendor Features
- Add daily vegetables
- Update prices daily
- Manage stock
- Mark vegetables unavailable
- View all customer orders
- Update order status

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Context API (Auth + Cart)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

### Tools
- Postman (API testing)
- Git & GitHub
- Vercel (Frontend Deployment)
- Render/Railway (Backend Deployment)

---

## 📂 Project Structure

\`\`\`
subjiwala/
│
├── client/                # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   └── api/
│
├── server/                # Node Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
\`\`\`

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/subjiwala.git
cd subjiwala
\`\`\`

---

## 🔧 Backend Setup

\`\`\`bash
cd server
npm install
\`\`\`

Create a \`.env\` file inside **server folder**:

\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME = 	
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET =


ADMIN_NAME=................
ADMIN_EMAIL=................
ADMIN_PHONE=................
ADMIN_PASSWORD=.............

\`\`\`

Run the backend:

\`\`\`bash
npm run dev
\`\`\`

Backend will run on:
\`\`\`
http://localhost:5000
\`\`\`

---

## 🎨 Frontend Setup

\`\`\`bash
cd client
npm install
npm start
\`\`\`

Frontend will run on:
\`\`\`
http://localhost:3000
\`\`\`

---

## 🔐 Authentication Flow
1. User registers
2. Password hashed using bcrypt
3. User logs in
4. Server returns JWT token
5. Token stored in localStorage
6. Protected routes accessed using middleware

---

# 📡 API Documentation

### Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

---

## 👤 Auth APIs

### Register User
**POST** \`/auth/register\`

\`\`\`json
{
  "name": "Baiju",
  "email": "baiju@gmail.com",
  "password": "123456"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "User registered successfully"
}
\`\`\`

---

### Login User
**POST** \`/auth/login\`

\`\`\`json
{
  "email": "baiju@gmail.com",
  "password": "123456"
}
\`\`\`

\`\`\`json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "123",
    "name": "Baiju"
  }
}
\`\`\`

---

## 🥬 Inventory APIs

### Get Today's Vegetables
**GET** \`/inventory/today\`

\`\`\`json
[
  {
    "_id": "1",
    "name": "Tomato",
    "price": 30,
    "stock": 50,
    "unit": "kg"
  }
]
\`\`\`

---

### Add Vegetable (Admin Only)
**POST** \`/inventory/add\`

Header:
\`\`\`
Authorization: Bearer JWT_TOKEN
\`\`\`

\`\`\`json
{
  "name": "Potato",
  "price": 20,
  "stock": 100,
  "unit": "kg"
}
\`\`\`

---

### Update Vegetable
**PUT** \`/inventory/:id\`

### Delete Vegetable
**DELETE** \`/inventory/:id\`

---

## 🛒 Cart APIs

### Add to Cart
**POST** \`/cart/add\`

\`\`\`json
{
  "productId": "veg_id",
  "quantity": 2
}
\`\`\`

### Get Cart Items
**GET** \`/cart\`

### Remove Item
**DELETE** \`/cart/:id\`

---

## 📦 Order APIs

### Place Order
**POST** \`/orders/place\`

\`\`\`json
{
  "message": "Order placed successfully"
}
\`\`\`

### Get My Orders
**GET** \`/orders/my\`

### Get All Orders (Admin)
**GET** \`/orders/all\`

### Update Order Status
**PUT** \`/orders/status/:id\`

Status values:
- Pending
- Packed
- Out for Delivery
- Delivered

---

## 🧠 Concepts Implemented
- RESTful API design
- JWT Authentication & Authorization
- Role-based access control
- Protected routes
- Dynamic daily inventory
- Cart management system
- Order lifecycle management

---

## 🔮 Future Improvements
- Online Payments (Razorpay / Stripe)
- Delivery Tracking
- Notifications (SMS/Email)
- Vendor mobile application
- AI-based demand prediction

---

## 👨‍💻 Author

**Baiju Kumar Yadav**  
B.Tech Computer Science Engineering — Full Stack Developer

GitHub: https://github.com/Baiju2005  
LinkedIn: https://linkedin.com/in/baiju-yadav-4882b81aa/

---

## ⭐ Support
If you like this project, consider giving it a ⭐ on GitHub!
EOF
