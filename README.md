# AI Job Portal

A modern, full-stack job portal application that connects job seekers with employers through an intelligent matching system. Built with React, Node.js, and powered by Clerk authentication.

## 🚀 Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Clerk React for authentication
- React Router DOM for navigation
- React Toastify for notifications

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Clerk Express for authentication
- Cloudinary for file uploads
- JWT for company authentication

**Additional Tools:**
- Sentry for error monitoring
- Multer for file handling
- bcrypt for password hashing

## 📋 Features

- **User Authentication**: Secure sign-up/sign-in with Clerk
- **Job Listings**: Browse and search available positions
- **Job Applications**: Apply to jobs with resume upload
- **Company Dashboard**: Post jobs and manage applications
- **Application Tracking**: Track application status
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live application status updates

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Clerk account for authentication
- Cloudinary account for file uploads

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENTRY_DSN=your_sentry_dsn
PORT=5000
```

4. Start the development server:
```bash
npm start
```

## 🔐 Authentication Flow

The application uses Clerk for user authentication:

1. **User Registration/Login**: Handled by Clerk's secure authentication system
2. **Session Management**: Automatic session handling with JWT tokens
3. **Protected Routes**: Routes are protected based on authentication status
4. **Company Authentication**: Separate JWT-based authentication for company accounts

## 🗺️ Key Routes

**Frontend Routes:**
- `/` - Home page with job listings
- `/apply-job/:id` - Job application page
- `/applications` - User's applied jobs
- `/dashboard` - Company dashboard (protected)

**Backend API Routes:**
- `/api/users/*` - User-related operations
- `/api/jobs/*` - Job listings and details
- `/api/company/*` - Company operations
- `/webhooks` - Clerk webhook handling

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Code Standards
- Use ESLint configuration provided
- Follow React best practices
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly

## 📸 Screenshots

*Screenshots and demo links will be added here*

## 📄 License

All rights reserved to Mohammad Kazim.

## 📧 Contact

**Developer:** Mohammad Kazim  
**Email:** mohammadkazim71@gmail.com  
**GitHub:** [Kazim71](https://github.com/Kazim71)  
**Repository:** [ai-job-portal](https://github.com/Kazim71/ai-job-portal)

---

⭐ If you find this project helpful, please give it a star!