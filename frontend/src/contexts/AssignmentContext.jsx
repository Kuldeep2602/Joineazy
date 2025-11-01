import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAssignments,
  getSubmissions,
  getUsers,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  addSubmission,
  deleteSubmission,
  getSubmission
} from '../utils/localStorage';

const AssignmentContext = createContext();

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);

  const loadData = () => {
    setAssignments(getAssignments());
    setSubmissions(getSubmissions());
    const allUsers = getUsers();
    setStudents(allUsers.filter(u => u.role === 'student'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const createAssignment = (assignmentData) => {
    const newAssignment = addAssignment(assignmentData);
    loadData();
    return newAssignment;
  };

  const editAssignment = (id, updatedData) => {
    const updated = updateAssignment(id, updatedData);
    loadData();
    return updated;
  };

  const removeAssignment = (id) => {
    deleteAssignment(id);
    loadData();
  };

  const submitAssignment = (assignmentId, studentId) => {
    const submission = addSubmission(assignmentId, studentId);
    loadData();
    return submission;
  };

  const unsubmitAssignment = (assignmentId, studentId) => {
    deleteSubmission(assignmentId, studentId);
    loadData();
  };

  const getAssignmentsByCreator = (creatorId) => {
    return assignments.filter(a => a.createdBy === creatorId);
  };

  const getStudentSubmissions = (studentId) => {
    return submissions.filter(s => s.studentId === studentId);
  };

  const isSubmitted = (assignmentId, studentId) => {
    return submissions.some(
      s => s.assignmentId === assignmentId && s.studentId === studentId
    );
  };

  const getSubmissionStats = (assignmentId) => {
    const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignmentId);
    const totalStudents = students.length;
    const submittedCount = assignmentSubmissions.length;
    
    return {
      submitted: submittedCount,
      total: totalStudents,
      percentage: totalStudents > 0 ? (submittedCount / totalStudents) * 100 : 0
    };
  };

  const getStudentProgress = (studentId) => {
    const studentSubmissions = getStudentSubmissions(studentId);
    const totalAssignments = assignments.length;
    
    return {
      submitted: studentSubmissions.length,
      total: totalAssignments,
      percentage: totalAssignments > 0 ? (studentSubmissions.length / totalAssignments) * 100 : 0
    };
  };

  const value = {
    assignments,
    submissions,
    students,
    createAssignment,
    editAssignment,
    removeAssignment,
    submitAssignment,
    unsubmitAssignment,
    getAssignmentsByCreator,
    getStudentSubmissions,
    isSubmitted,
    getSubmissionStats,
    getStudentProgress,
    loadData
  };

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
};
