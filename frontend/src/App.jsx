import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import { useSessionManager } from './hooks/useSessionManager';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignedIn, SignedOut, SignIn, useAuth } from "@clerk/clerk-react";

// Optional: Simple NotFound page
const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { isSessionValid } = useSessionManager();

  // Debug auth state in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Auth State:', { isSignedIn, isLoaded, userId, isSessionValid });
    }
  }, [isSignedIn, isLoaded, userId, isSessionValid]);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200'>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      {/* Routes for Authenticated Users */}
      <SignedIn>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/apply-job/:id' element={<ApplyJob />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/dashboard' element={<Dashboard />}>
            {companyToken && (
              <>
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<ViewApplications />} />
              </>
            )}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignedIn>

      {/* Centered SignIn for Unauthenticated Users */}
      <SignedOut>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff"
        }}>
          <SignIn />
        </div>
      </SignedOut>
    </div>
  );
};

export default App;
