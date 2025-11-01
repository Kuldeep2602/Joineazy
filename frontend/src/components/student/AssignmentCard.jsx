import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAssignments } from '../../contexts/AssignmentContext';

const AssignmentCard = ({ assignment, onSubmitClick }) => {
  const { currentUser } = useAuth();
  const { isSubmitted } = useAssignments();
  
  const submitted = isSubmitted(assignment.id, currentUser?.id);
  const dueDate = new Date(assignment.dueDate);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
      {/* Header with Status Badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {assignment.title}
        </h3>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ml-3 ${
          submitted 
            ? 'bg-green-100 text-green-700' 
            : 'bg-orange-100 text-orange-700'
        }`}>
          {submitted ? (
            <>
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Submitted
            </>
          ) : (
            <>
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Pending
            </>
          )}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {assignment.description}
      </p>

      {/* Due Date */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Due: {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Drive Link
        </a>
        
        {!submitted && (
          <button
            onClick={() => onSubmitClick(assignment)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Mark as Submitted
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
