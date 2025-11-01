import React, { useState } from 'react';
import { useAssignments } from '../../contexts/AssignmentContext';
import ProgressBar from '../shared/ProgressBar';
import StudentProgressView from './StudentProgressView';

const AssignmentManagementCard = ({ assignment }) => {
  const { getSubmissionStats, removeAssignment } = useAssignments();
  const [showStudents, setShowStudents] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const stats = getSubmissionStats(assignment.id);
  const dueDate = new Date(assignment.dueDate);

  const handleDelete = () => {
    removeAssignment(assignment.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{assignment.title}</h3>
            <p className="text-sm text-gray-600">{assignment.description}</p>
          </div>
          <span className="ml-4 text-xs text-gray-500 flex items-center whitespace-nowrap">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {stats.total} students
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due: {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Drive Link
          </a>
        </div>
      </div>

      {/* Submission Status */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-900">Submission Status</h4>
          <span className="text-sm text-gray-600">
            {stats.submitted} of {stats.total} submitted ({Math.round(stats.percentage)}%)
          </span>
        </div>
        <ProgressBar
          percentage={stats.percentage}
          showLabel={false}
          height="h-2"
          colorClass="bg-blue-600"
        />
      </div>

      {/* Student Progress Toggle */}
      {showStudents && (
        <StudentProgressView assignmentId={assignment.id} />
      )}

      {/* Footer Actions */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={() => setShowStudents(!showStudents)}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          {showStudents ? 'Hide' : 'View'} Student Progress
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Assignment?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete "{assignment.title}" and all related submissions.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagementCard;
