import React from 'react';
import { useAssignments } from '../../contexts/AssignmentContext';

const StudentProgressView = ({ assignmentId }) => {
  const { students, submissions } = useAssignments();

  const studentsWithStatus = students.map(student => {
    const submission = submissions.find(
      s => s.assignmentId === assignmentId && s.studentId === student.id
    );
    return {
      ...student,
      hasSubmitted: !!submission,
      submittedAt: submission?.submittedAt
    };
  });

  // Sort: not submitted first
  const sortedStudents = [...studentsWithStatus].sort((a, b) => {
    if (a.hasSubmitted !== b.hasSubmitted) {
      return a.hasSubmitted ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="border-t border-gray-200 p-6 bg-gray-50">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">Student Progress</h4>
      
      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No students enrolled yet
        </div>
      ) : (
        <div className="space-y-2">
          {sortedStudents.map(student => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                  student.hasSubmitted ? 'bg-green-600' : 'bg-gray-400'
                }`}>
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  {student.hasSubmitted && student.submittedAt && (
                    <p className="text-xs text-gray-500">
                      {new Date(student.submittedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </div>

              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                student.hasSubmitted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {student.hasSubmitted ? (
                  <>
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Submitted
                  </>
                ) : (
                  'Not Submitted'
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentProgressView;
