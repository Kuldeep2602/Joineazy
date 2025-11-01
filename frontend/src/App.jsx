import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AssignmentProvider } from './contexts/AssignmentContext';
import Login from './components/shared/Login';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { isAuthenticated, isStudent, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (isStudent) {
    return <StudentDashboard />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return null;
}

function App() {
  return (
    <AuthProvider>
      <AssignmentProvider>
        <AppContent />
      </AssignmentProvider>
    </AuthProvider>
  );
}

export default App;
