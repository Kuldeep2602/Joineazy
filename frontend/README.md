# JoinEazy - Student Assignment Management System

A clean, responsive dashboard for managing student assignments with role-based functionality built with React.js and Tailwind CSS.


### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)


frontend/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateAssignmentForm.jsx
│   │   │   ├── AssignmentManagementCard.jsx
│   │   │   └── StudentProgressView.jsx
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── AssignmentCard.jsx
│   │   │   └── SubmissionModal.jsx
│   │   └── shared/
│   │       ├── Login.jsx
│   │       ├── Layout.jsx
│   │       └── ProgressBar.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── AssignmentContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── utils/
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

##  Technology Stack

- **React.js 19**: Component-based UI framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **LocalStorage API**: Client-side data persistence
- **Context API**: Global state management

## Key Features Implementation

# Double-Verification Flow (Student)
# Role-Based Dashboards
# Progress Indicators
