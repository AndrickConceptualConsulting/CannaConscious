# CannaConscious

![CannaConscious](https://img.shields.io/badge/CannaConscious-Cannabis%20Consulting-14ff9e)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

A professional full-stack web application for cannabis business consulting services. CannaConscious connects cannabis entrepreneurs with expert consultants through a modern, intuitive platform featuring appointment booking, contact forms, and comprehensive business resources.

## ✨ Features

- 🌐 Responsive design optimized for all devices
- 📅 Online appointment booking system with availability checking
- 📧 Contact form with email notifications
- 🚀 Animated page transitions and UI elements
- 🔒 MongoDB integration for secure data storage

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for fast development and optimized builds
- **TailwindCSS** for utility-first styling
- **Framer Motion** for smooth animations and transitions
- **React Router** for navigation and routing
- **React Icons** for consistent and beautiful iconography

### Backend
- **Node.js** with Express for a robust API
- **MongoDB** with Mongoose ODM for flexible data storage
- **JWT** for secure authentication (admin features)
- **Nodemailer** for automated email notifications

## 📋 Project Structure

```
CannaConscious/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API connection services
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Layout/    # Layout components (Navbar, Footer)
│   │   │   └── UI/        # UI components (Button, Card, Alert)
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── pages/         # Page components
│   ├── index.html         # HTML entry point
│   └── vite.config.js     # Vite configuration
│
└── server/                # Backend Express application
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── middleware/        # Express middleware
    ├── models/            # Mongoose models
    └── routes/            # API routes
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cannaconscious.git
   cd cannaconscious
   ```

2. **Install all dependencies at once**
   ```bash
   npm run install-all
   ```
   This command installs dependencies for the root project, server, and client.

3. **Set up environment variables**

   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cannaconscious
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development

   # Email configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_specific_password
   RECIPIENT_EMAIL=contact@cannaconscious.com
   ```

   Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Development

Start both the backend server and frontend development server with a single command:
```bash
npm run dev
```

- The frontend will be available at http://localhost:3000
- The backend API will be available at http://localhost:5000

### Individual Application Start

- **Frontend only**
  ```bash
  npm run client
  ```

- **Backend only**
  ```bash
  npm run server
  ```

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start in production mode**
   ```bash
   npm run prod
   ```

## 📚 Key Project Features

### 1. Client Appointment Booking
- Interactive calendar for date selection
- Real-time availability checking
- Automated email confirmations
- Service type selection with duration information

### 2. Responsive Design
- Optimized for all devices from mobile to desktop
- Consistent UI elements across all screen sizes
- Mobile-friendly navigation with animated menu
- Smooth transitions between pages

### 3. User-Friendly Contact System
- Form validation with real-time feedback
- Automated email notifications
- Thank-you page with confirmation details
- Easily accessible contact information

### 4. Modern UI/UX
- Animated components for enhanced user experience
- Consistent color scheme and typography
- Optimized images and assets for fast loading times
- Accessible design practices

## ✅ Future Enhancements

- [ ] Admin dashboard for managing appointments and inquiries
- [ ] Blog section for cannabis industry insights
- [ ] User accounts for clients to manage their appointments
- [ ] Online payment integration for services
- [ ] Integration with cannabis industry compliance APIs

## 📝 License

[MIT License](LICENSE)

## 🤝 Acknowledgements

- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Animation library by [Framer Motion](https://www.framer.com/motion/)
- UI component styling with [TailwindCSS](https://tailwindcss.com/)
