
# 🛍️ **Zippy – Full-Stack eCommerce Platform**

Zippy is a sleek, high-performance, and scalable eCommerce platform built with **React.js** on the frontend and **Node.js/Express** on the backend. It features a modern user-facing storefront, a powerful admin dashboard, and integrates with **Cloudinary** for efficient media handling.

---
https://github.com/user-attachments/assets/0c3a23a0-6700-4103-bd96-75f72f44cd59


🎬 Admin Portal Demo Preview above
🚀 Prototype in Action

This is your first look at the tools powering Zippy behind the scenes.

📺 Watch the demo above:
<div align="center"> Demo video will be uploaded soon along with admin portal working full fledged working will be shown </a> </div>
🧑‍💻 The whole has been developed and deployed if problems faced in deployed link. Plz mail me on shreeshsanyal@gmail.com


## 🚀 Features

### 👨‍💻 Customer-Facing

* 🛒 Clean & responsive product catalog with filtering and sorting
* 📸 Product detail pages with dynamic image gallery
* 🧾 Shopping cart & checkout functionality
* 🔐 User registration, login & order history

### 🛠️ Admin Dashboard

* 📦 Full product CRUD management
* 👥 Manage users and orders
* 📊 Analytics dashboard *(optional / in-progress)*
* 🛡️ Role-based access control

### ⚙️ Backend

* 🔗 RESTful API built with **Node.js + Express**
* 🔐 Secure JWT-based authentication
* 🗃️ MongoDB for data persistence
* ☁️ Cloudinary integration for media storage

---

## 🧰 Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| **Frontend** | React.js, Redux (optional), TailwindCSS / Bootstrap |
| **Backend**  | Node.js, Express.js                                 |
| **Database** | MongoDB                                             |
| **Cloud**    | Cloudinary                                          |
| **Auth**     | JWT                                                 |
| **Deploy**   | *TBD* (e.g. Vercel / Render / Heroku / AWS)         |

---


## 📁 Project Structure

```bash
ecommerces/
├── backend/               # Node.js backend with Express
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
├── frontend/              # React frontend
│   ├── components/
│   ├── pages/
│   ├── admin/             # Admin dashboard views
│   └── utils/
└── README.md
```

---

## 🛠️ Getting Started

### ✅ Prerequisites

* Node.js ≥ v16
* MongoDB (local or cloud instance)
* Cloudinary account

### 🔧 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/SHREESH2004/ecommerces.git
cd ecommerces
```

2. **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the server:

```bash
npm run dev
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm start
```

---

## 📍 Roadmap

* ✅ Core eCommerce functionality
* ✅ Admin product & user management
* 🔜 Payment gateway integration (e.g., Stripe)
* 🔜 Product reviews and ratings
* 🔜 Autocomplete search
* 🔜 Responsive design improvements

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue to discuss your ideas before submitting.

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 📫 Contact

* **GitHub:** [@SHREESH2004](https://github.com/SHREESH2004)
* **Email:** [shreeshsanyal@gmail.com](mailto:shreeshsanyal@gmail.com)

