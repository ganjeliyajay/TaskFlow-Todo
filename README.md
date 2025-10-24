# 🌟 TaskFlow-Todo

**TaskFlow-Todo** is a sleek and modern full-stack To-Do application built using the MERN stack (MongoDB, Express.js, React, Node.js). Manage your tasks efficiently with a beautiful interface, intuitive features, and secure user authentication.

---

## 🎯 Features

* **✨ User Authentication**: Secure login and registration powered by JWT (JSON Web Tokens).
* **📝 Task Management**: Create, update, delete, and categorize your tasks easily.
* **📱 Responsive Design**: Optimized for desktops, tablets, and mobile devices.
* **💾 Persistent Storage**: MongoDB ensures your tasks are safely stored.
* **🔒 Secure API Routes**: Protected endpoints for data integrity.
* **🎨 Modern UI**: Colorful, vibrant design with Tailwind CSS for an attractive experience.

---

## 🛠 Tech Stack

* **Frontend**:

  * React.js
  * Tailwind CSS (for beautiful, responsive design)
  * Axios (for API requests)
  * Vite (fast development and build)
* **Backend**:

  * Node.js
  * Express.js
  * MongoDB (with Mongoose)
  * JWT (authentication)
* **Development Tools**:

  * Vite
  * Nodemon

---

## 📁 Folder Structure

```
TaskFlow-Todo/
├── client/                # React frontend
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── components/    # Reusable UI components
│       ├── pages/         # React components for routes
│       ├── App.jsx        # Main application component
│       └── main.jsx       # Entry point for React
├── server/                # Node.js backend
│   ├── controllers/       # Request handling logic
│   ├── models/            # Mongoose models
│   ├── routes/            # API route definitions
│   └── server.js          # Backend entry point
└── .gitignore             # Ignored files
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ganjeliyajay/TaskFlow-Todo.git
cd TaskFlow-Todo
```

### 2. Setup Backend

```bash
cd server
npm install
npm start
```

Add a `.env` file in the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## 🚀 Deployment

* **Frontend**: Deploy `client` to Vercel, Netlify, or similar.
* **Backend**: Deploy `server` to Heroku, Render, or any Node hosting platform.

Ensure API endpoints in frontend point to your deployed backend.

---

## 🧪 Testing

Backend tests:

```bash
cd server
npm test
```

Frontend testing can use Jest and React Testing Library.

---

## 🎨 Design & Colors

* Tailwind CSS is used for modern, vibrant UI.
* Responsive layouts with pleasing color palette.
* Attractive hover effects and smooth transitions enhance UX.

---

## 📄 License

This project is licensed under the MIT License.
