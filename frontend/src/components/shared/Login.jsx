import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('student');

  const handleRoleLogin = (userRole) => {
    let email, password;
    if (userRole === 'student') {
      email = 'rahul@student.com';
      password = 'student123';
    } else {
      email = 'rashmika@teacher.com';
      password = 'admin123';
    }
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <img src="/image.png" alt="JoinEazy Logo" className="w-32 h-32 object-contain" />
          </div>
          <p className="text-gray-500 text-sm">Select your role to continue</p>
        </div>

        {/* Role Toggle Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Toggle Switch */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              <button
                onClick={() => setRole('student')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  role === 'student'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  role === 'teacher'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          {/* Role Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            {role === 'student' ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Student Portal</h3>
                <p className="text-sm text-gray-500">View and manage your course assignments</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Teacher Portal</h3>
                <p className="text-sm text-gray-500">Manage assignments and track student progress</p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={() => handleRoleLogin(role)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Continue as {role === 'student' ? 'Student' : 'Teacher'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 JoinEazy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
