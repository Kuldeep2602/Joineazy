import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAssignments } from '../../contexts/AssignmentContext';
import Layout from '../shared/Layout';
import ProgressBar from '../shared/ProgressBar';
import AssignmentCard from './AssignmentCard';
import SubmissionModal from './SubmissionModal';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { assignments, getStudentProgress, getStudentSubmissions } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const progress = getStudentProgress(currentUser?.id);
  const studentSubmissions = getStudentSubmissions(currentUser?.id);

  const handleSubmitClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAssignment(null);
  };

  // Sort assignments: upcoming first, then by due date
  const sortedAssignments = [...assignments].sort((a, b) => {
    const isASubmitted = studentSubmissions.some(s => s.assignmentId === a.id);
    const isBSubmitted = studentSubmissions.some(s => s.assignmentId === b.id);
    
    if (isASubmitted !== isBSubmitted) {
      return isASubmitted ? 1 : -1;
    }
    
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">My Assignments</h2>
          <p className="text-gray-500 text-sm">View and manage your course assignments</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <ProgressBar 
            percentage={progress.percentage} 
            showLabel={false}
            height="h-2"
            colorClass="bg-blue-600"
          />
          <p className="text-sm text-gray-600 mt-2">
            {progress.submitted} of {progress.total} submitted ({Math.round(progress.percentage)}%)
          </p>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {sortedAssignments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No assignments yet. Check back soon!</p>
            </div>
          ) : (
            sortedAssignments.map(assignment => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onSubmitClick={handleSubmitClick}
              />
            ))
          )}
        </div>
      </div>

      {/* Submission Modal */}
      {showModal && selectedAssignment && (
        <SubmissionModal
          assignment={selectedAssignment}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
};

export default StudentDashboard;
