import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ClerkProvider } from "@clerk/clerk-react";

// Get Clerk publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl="/"
    afterSignInUrl="/"
    afterSignUpUrl="/"
    appearance={{
      baseTheme: undefined,
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorInputBackground: '#f9fafb',
        colorInputText: '#111827'
      }
    }}
    localization={{
      signIn: {
        start: {
          title: 'Welcome to AI Job Portal',
          subtitle: 'Sign in to access thousands of job opportunities'
        }
      }
    }}
  >
    <BrowserRouter>
      <ThemeProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ClerkProvider>
);
