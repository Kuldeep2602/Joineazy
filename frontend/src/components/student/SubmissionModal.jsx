import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAssignments } from '../../contexts/AssignmentContext';

const SubmissionModal = ({ assignment, onClose }) => {
  const { currentUser } = useAuth();
  const { submitAssignment } = useAssignments();
  const [step, setStep] = useState(1); // 1: Initial confirmation, 2: Final confirmation, 3: Success

  const handleFirstConfirmation = () => {
    setStep(2);
  };

  const handleFinalConfirmation = () => {
    submitAssignment(assignment.id, currentUser?.id);
    setStep(3);
  };

  const handleClose = () => {
    onClose();
  };

  const handleCancel = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
        {/* Step 1: Initial Confirmation */}
        {step === 1 && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mark as Submitted?
              </h3>
              <p className="text-sm text-gray-600">
                {assignment.title}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Make sure you have uploaded your assignment to the Google Drive link before marking it as submitted.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFirstConfirmation}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Yes, I have submitted
              </button>
              <button
                onClick={handleClose}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Final Confirmation */}
        {step === 2 && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Final Confirmation
              </h3>
              <p className="text-sm text-gray-600">
                Are you absolutely sure?
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 mb-2">
                <strong>Double-check before confirming:</strong>
              </p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>✓ Your assignment is uploaded to the Drive link</li>
                <li>✓ All required files are included</li>
                <li>✓ The submission meets the requirements</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFinalConfirmation}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Confirm Submission
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Submission Confirmed!
              </h3>
              <p className="text-sm text-gray-600">
                Your assignment has been marked as submitted.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>{assignment.title}</strong> has been successfully recorded. Your teacher will be able to see your submission status.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionModal;
