import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Transparent Navbar */}
      <nav className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-sm px-6 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <img src="/image.png" alt="JoinEazy Logo" className="w-10 h-10 object-contain" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">JoinEazy</h1>
                  <p className="text-xs text-gray-500 capitalize">{currentUser?.role} Portal</p>
                </div>
              </div>
              
              {/* User Section */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
