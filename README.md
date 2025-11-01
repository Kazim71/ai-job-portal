# AI Job Portal

A modern, full-stack job portal application that connects job seekers with employers through an intelligent matching system. Built with React, Node.js, and powered by Clerk authentication with integrated Perplexity AI for career assistance.

## 🚀 Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling with dark mode support
- Clerk React for authentication
- React Router DOM for navigation
- React Toastify for notifications
- React Icons for modern iconography

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Clerk Express for authentication
- Cloudinary for file uploads
- JWT for company authentication
- Perplexity AI API integration

**Additional Tools:**
- Sentry for error monitoring
- Multer for file handling
- bcrypt for password hashing
- HTTPS support for secure development

## 📋 Features

- **User Authentication**: Secure sign-up/sign-in with Clerk, session management, auto-logout
- **AI Career Assistant**: Powered by Perplexity AI for job search and career advice
- **Dark/Light Mode**: System-aware theme switching with persistence
- **Job Listings**: Browse and search available positions with advanced filtering
- **Job Applications**: Apply to jobs with resume upload
- **Company Dashboard**: Post jobs and manage applications
- **Application Tracking**: Track application status
- **Responsive Design**: Mobile-first approach with modern UI
- **Real-time Updates**: Live application status updates
- **HTTPS Security**: Secure development and production environment

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Clerk account for authentication
- Cloudinary account for file uploads
- Perplexity AI API key
- SSL certificates for HTTPS (development)

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
VITE_BACKEND_URL=https://localhost:5000
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
PERPLEXITY_API_KEY=your_perplexity_api_key
NODE_ENV=development
PORT=5000
```

4. Start the development server:
```bash
npm start
```

### HTTPS Setup (Development)

1. Generate SSL certificates for localhost:
```bash
# Install mkcert (if not already installed)
# macOS
brew install mkcert
# Windows (with Chocolatey)
choco install mkcert

# Create certificates directory
mkdir frontend/certs

# Generate certificates
mkcert -install
mkcert -key-file frontend/certs/localhost-key.pem -cert-file frontend/certs/localhost.pem localhost 127.0.0.1
```

2. The app will run on `https://localhost:5173` with valid SSL certificates.

## 🔐 Authentication & Session Management

The application uses Clerk for user authentication with enhanced session management:

1. **User Registration/Login**: Handled by Clerk's secure authentication system
2. **Session Management**: 20-minute session timeout with automatic renewal
3. **Auto-logout**: Sessions expire when backend server restarts
4. **Protected Routes**: Routes are protected based on authentication status
5. **Company Authentication**: Separate JWT-based authentication for company accounts
6. **Secure Cookies**: HTTPS-only cookies in production with proper SameSite settings

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
- `/api/ai/*` - AI-powered search and career assistance
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
- Ensure dark mode compatibility for all UI components
- Follow accessibility guidelines (ARIA labels, keyboard navigation)

## 🤖 AI Features

### Perplexity AI Integration
- **Career Assistant**: Ask questions about job markets, career advice, and industry insights
- **Suggested Prompts**: Pre-built prompts for common career questions
- **Secure API**: All AI requests are processed server-side to protect API keys

### Example AI Queries
```bash
# Test AI endpoint
curl -X POST https://localhost:5000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the most in-demand tech jobs in 2024?"}'

# Get suggested prompts
curl https://localhost:5000/api/ai/prompts
```

## 🌙 Theme System

- **System Preference Detection**: Automatically detects user's system theme preference
- **Manual Toggle**: Users can manually switch between light and dark modes
- **Persistence**: Theme preference is saved in localStorage
- **Smooth Transitions**: All theme changes include smooth CSS transitions
- **Universal Coverage**: All components support both light and dark modes

## 🔒 Security Features

- **HTTPS Enforcement**: All traffic encrypted in development and production
- **Secure Headers**: Proper CORS, CSP, and security headers
- **API Key Protection**: All sensitive keys stored server-side only
- **Session Security**: Secure cookie settings with proper expiration
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Cross-site request forgery prevention

## 📸 Screenshots

### Light Mode
- Landing page with job search and AI assistant
- Job listings with advanced filtering
- User dashboard and applications

### Dark Mode
- Consistent dark theme across all components
- Proper contrast ratios for accessibility
- Smooth theme transitions

## 🚨 Troubleshooting

### Common Issues

1. **HTTPS Certificate Issues**
   ```bash
   # Regenerate certificates
   mkcert -key-file frontend/certs/localhost-key.pem -cert-file frontend/certs/localhost.pem localhost
   ```

2. **Session Expiration**
   - Sessions automatically expire after 20 minutes of inactivity
   - Server restart will invalidate all sessions
   - Clear browser cache if experiencing auth issues

3. **AI Service Unavailable**
   - Check PERPLEXITY_API_KEY in backend .env
   - Verify API key has sufficient credits
   - Check network connectivity

4. **Dark Mode Issues**
   - Clear localStorage: `localStorage.removeItem('ai-job-portal-theme')`
   - Refresh page to reset theme state

### Environment Variables Checklist

**Frontend (.env)**
- ✅ VITE_CLERK_PUBLISHABLE_KEY
- ✅ VITE_BACKEND_URL (https://localhost:5000)

**Backend (.env)**
- ✅ CLERK_SECRET_KEY
- ✅ CLERK_PUBLISHABLE_KEY
- ✅ CLERK_WEBHOOK_SECRET
- ✅ MONGODB_URI
- ✅ JWT_SECRET
- ✅ CLOUDINARY_* (3 variables)
- ✅ PERPLEXITY_API_KEY
- ✅ SENTRY_DSN
- ✅ NODE_ENV=development
- ✅ PORT=5000

## 📄 License

All rights reserved to Mohammad Kazim.

## 📧 Contact

**Developer:** Mohammad Kazim  
**Email:** mohammadkazim71@gmail.com  
**GitHub:** [Kazim71](https://github.com/Kazim71)  
**Repository:** [ai-job-portal](https://github.com/Kazim71/ai-job-portal)

---

⭐ If you find this project helpful, please give it a star!