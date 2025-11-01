// localStorage utility functions for data persistence

const STORAGE_KEYS = {
  USERS: 'joineazy_users',
  ASSIGNMENTS: 'joineazy_assignments',
  SUBMISSIONS: 'joineazy_submissions',
  CURRENT_USER: 'joineazy_current_user'
};

// Initialize localStorage with mock data if empty
export const initializeStorage = (mockUsers, mockAssignments, mockSubmissions) => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(mockAssignments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(mockSubmissions));
  }
};

// User operations
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Assignment operations
export const getAssignments = () => {
  const assignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  return assignments ? JSON.parse(assignments) : [];
};

export const getAssignmentById = (id) => {
  const assignments = getAssignments();
  return assignments.find(assignment => assignment.id === id);
};

export const addAssignment = (assignment) => {
  const assignments = getAssignments();
  const newAssignment = {
    ...assignment,
    id: Date.now(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  assignments.push(newAssignment);
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  return newAssignment;
};

export const updateAssignment = (id, updatedData) => {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.id === id);
  if (index !== -1) {
    assignments[index] = { ...assignments[index], ...updatedData };
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    return assignments[index];
  }
  return null;
};

export const deleteAssignment = (id) => {
  const assignments = getAssignments();
  const filtered = assignments.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(filtered));
  
  // Also delete related submissions
  const submissions = getSubmissions();
  const filteredSubmissions = submissions.filter(s => s.assignmentId !== id);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(filteredSubmissions));
};

// Submission operations
export const getSubmissions = () => {
  const submissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  return submissions ? JSON.parse(submissions) : [];
};

export const getSubmissionsByStudent = (studentId) => {
  const submissions = getSubmissions();
  return submissions.filter(sub => sub.studentId === studentId);
};

export const getSubmissionsByAssignment = (assignmentId) => {
  const submissions = getSubmissions();
  return submissions.filter(sub => sub.assignmentId === assignmentId);
};

export const getSubmission = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  return submissions.find(
    sub => sub.assignmentId === assignmentId && sub.studentId === studentId
  );
};

export const addSubmission = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now(),
    assignmentId,
    studentId,
    submittedAt: new Date().toISOString().split('T')[0],
    status: 'submitted'
  };
  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  return newSubmission;
};

export const deleteSubmission = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  const filtered = submissions.filter(
    s => !(s.assignmentId === assignmentId && s.studentId === studentId)
  );
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(filtered));
};
