import React from 'react';

const ProgressBar = ({ 
  percentage, 
  showLabel = true, 
  label = '', 
  height = 'h-4',
  colorClass = 'bg-blue-600'
}) => {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="text-gray-700 dark:text-gray-300">{label}</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.round(safePercentage)}%
          </span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${colorClass} rounded-full transition-all duration-500 ease-out flex items-center justify-center`}
          style={{ width: `${safePercentage}%` }}
        >
          {!showLabel && safePercentage > 10 && (
            <span className="text-xs text-white font-semibold">
              {Math.round(safePercentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
