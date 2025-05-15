# CannaConscious

A professional web application for cannabis business consulting services, designed to connect cannabis entrepreneurs with expert consultants. The platform features booking services, contact forms, and information about cannabis business development.

## Tech Stack

### Frontend
- React 19 with Vite
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation
- React Icons for UI elements

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication (admin features)
- Nodemailer for email notifications

## Features

- Responsive design for all devices
- Animated page transitions and UI elements
- Online appointment booking system
- Contact form with email notifications
- Service information and consulting details

## Project Structure

```
CannaConscious/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API connection services
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable UI components
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

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cannaconscious.git
cd cannaconscious
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
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

5. Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:5000/api
```

### Development

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd client
npm run dev
```

The frontend will be available at http://localhost:3000 and will proxy API requests to the backend at http://localhost:5000.

### Production Build

1. Build the frontend
```bash
cd client
npm run build
```

2. Configure the server for production
```
NODE_ENV=production
```

3. Start the server which will serve the static frontend build
```bash
cd server
npm start
```

## Deployment

The application can be deployed to platforms like:
- Heroku
- Vercel/Netlify for frontend + separate backend deployment
- AWS, Google Cloud, or Azure

## Future Enhancements

- Admin dashboard for managing appointments and inquiries
- Blog section for cannabis industry insights
- User accounts for clients to manage their appointments
- Online payment integration for services
- Integration with cannabis industry compliance APIs

## License

[MIT License](LICENSE)