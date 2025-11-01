import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAssignments } from '../../contexts/AssignmentContext';

const CreateAssignmentForm = ({ onClose, assignment = null }) => {
  const { currentUser } = useAuth();
  const { createAssignment, editAssignment } = useAssignments();
  
  const [formData, setFormData] = useState({
    title: assignment?.title || '',
    description: assignment?.description || '',
    driveLink: assignment?.driveLink || 'https://drive.google.com/drive/folders/1tViB3ufkP-3kjfz5YxCh4jLCcE6Aor32?usp=sharing',
    dueDate: assignment?.dueDate || '',
    maxScore: assignment?.maxScore || 100
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.driveLink.trim()) {
      newErrors.driveLink = 'Drive link is required';
    } else if (!formData.driveLink.includes('drive.google.com')) {
      newErrors.driveLink = 'Please enter a valid Google Drive link';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (assignment) {
      editAssignment(assignment.id, formData);
    } else {
      createAssignment({
        ...formData,
        createdBy: currentUser?.id
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">
              {assignment ? 'Edit Assignment' : 'Create New Assignment'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                Assignment Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm`}
                placeholder="e.g., React Fundamentals Project"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm`}
                placeholder="Provide a detailed description..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Drive Link */}
            <div>
              <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 mb-1.5">
                Google Drive Link *
              </label>
              <input
                type="url"
                id="driveLink"
                name="driveLink"
                value={formData.driveLink}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.driveLink ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm`}
                placeholder="https://drive.google.com/..."
              />
              {errors.driveLink && (
                <p className="mt-1 text-xs text-red-600">{errors.driveLink}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Students will submit their work to this Drive link
              </p>
            </div>

            {/* Due Date & Max Score - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.dueDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="maxScore" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Score
                </label>
                <input
                  type="number"
                  id="maxScore"
                  name="maxScore"
                  value={formData.maxScore}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                {assignment ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentForm;
