import { Loader2, FileQuestion, AlertCircle } from 'lucide-react';

export const LoadingSpinner = ({ size = 24, className = "" }) => (
  <Loader2 className={`animate-spin ${className}`} size={size} />
);

export const LoadingOverlay = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <LoadingSpinner size={40} className="text-primary-600 mb-4" />
    <p className="text-gray-600">{message}</p>
  </div>
);

export const EmptyState = ({ 
  title = "No data found", 
  message = "There are no items to display.",
  icon: Icon 
}) => (
  <div className="flex flex-col items-center justify-center py-12">
    {Icon ? (
      <Icon className="h-12 w-12 text-gray-400 mb-4" />
    ) : (
      <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
    )}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center max-w-md">{message}</p>
  </div>
);

export const ErrorState = ({ 
  title = "Something went wrong", 
  message = "An error occurred while loading the data.",
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center py-12">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center max-w-md mb-4">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="btn-primary"
      >
        Try Again
      </button>
    )}
  </div>
);

export default {
  LoadingSpinner,
  LoadingOverlay,
  EmptyState,
  ErrorState
};
