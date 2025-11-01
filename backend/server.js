import 'dotenv/config'; // Load .env variables first!
import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { clerkMiddleware } from '@clerk/express'; // Named import!

// Initialize Express
const app = express();

// Connect to database and cloudinary
connectDB();
await connectCloudinary();

// Clerk middleware with session management
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    frontendApi: process.env.CLERK_FRONTEND_API,
    sessionTokenCookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 20 * 60 * 1000 // 20 minutes
    }
  })
);

// Other middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
