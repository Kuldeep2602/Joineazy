// Mock data for users, assignments, and submissions

export const mockUsers = [
  {
    id: 1,
    name: 'Rahul',
    email: 'rahul@student.com',
    role: 'student',
    password: 'student123'
  },
  {
    id: 2,
    name: 'Samay',
    email: 'samay@student.com',
    role: 'student',
    password: 'student123'
  },
  {
    id: 3,
    name: 'Akansha',
    email: 'akansha@student.com',
    role: 'student',
    password: 'student123'
  },
  {
    id: 4,
    name: 'Anshika',
    email: 'anshika@student.com',
    role: 'student',
    password: 'student123'
  },
  {
    id: 5,
    name: 'Dhruv',
    email: 'dhruv@student.com',
    role: 'student',
    password: 'student123'
  },
  {
    id: 101,
    name: 'Miss Rashmika',
    email: 'rashmika@teacher.com',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: 102,
    name: 'Mr Anurag',
    email: 'anurag@teacher.com',
    role: 'admin',
    password: 'admin123'
  }
];

export const mockAssignments = [
  {
    id: 1,
    title: 'React Component Design',
    description: 'Create a reusable component library with proper TypeScript types and documentation.',
    driveLink: 'https://drive.google.com/drive/folders/1tViB3ufkP-3kjfz5YxCh4jLCcE6Aor32?usp=sharing',
    dueDate: '2025-11-15',
    createdBy: 101,
    createdAt: '2025-10-20',
    maxScore: 100
  },
  {
    id: 2,
    title: 'Database Schema Design',
    description: 'Design and implement a normalized database schema for the student management system.',
    driveLink: 'https://drive.google.com/drive/folders/1tViB3ufkP-3kjfz5YxCh4jLCcE6Aor32?usp=sharing',
    dueDate: '2025-11-20',
    createdBy: 101,
    createdAt: '2025-10-22',
    maxScore: 100
  }
];

export const mockSubmissions = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    submittedAt: '2025-11-10',
    status: 'submitted'
  },
  {
    id: 2,
    assignmentId: 1,
    studentId: 3,
    submittedAt: '2025-11-12',
    status: 'submitted'
  }
];
