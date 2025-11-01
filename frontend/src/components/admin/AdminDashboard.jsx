import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAssignments } from '../../contexts/AssignmentContext';
import Layout from '../shared/Layout';
import CreateAssignmentForm from './CreateAssignmentForm';
import AssignmentManagementCard from './AssignmentManagementCard';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { getAssignmentsByCreator, students, submissions } = useAssignments();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const myAssignments = getAssignmentsByCreator(currentUser?.id);
  
  // Calculate stats
  const totalSubmissions = submissions.length;
  const totalPossibleSubmissions = myAssignments.length * students.length;
  const completionRate = totalPossibleSubmissions > 0 
    ? Math.round((totalSubmissions / totalPossibleSubmissions) * 100)
    : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h2>
            <p className="text-gray-500 text-sm">Manage assignments and track student progress</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Assignment
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
            <p className="text-3xl font-bold text-gray-900">{myAssignments.length}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
          </div>
        </div>

        {/* Assignments Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>

          {myAssignments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 mb-4">No assignments created yet.</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Create Your First Assignment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myAssignments.map(assignment => (
                <AssignmentManagementCard 
                  key={assignment.id} 
                  assignment={assignment}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateForm && (
        <CreateAssignmentForm onClose={() => setShowCreateForm(false)} />
      )}
    </Layout>
  );
};

export default AdminDashboard;
