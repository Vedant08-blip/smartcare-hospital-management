import { Loader2 } from 'lucide-react';

// Full page loading overlay
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

// Inline loading spinner
export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2 className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
  );
};

// Skeleton loader for cards
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
};

// Skeleton loader for table rows
export const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
    </tr>
  );
};

// Empty state component
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && (
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <Icon className="h-10 w-10 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-center mb-4 max-w-md">{description}</p>
      )}
      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};

// Error state component
export const ErrorState = ({ 
  title = 'Something went wrong', 
  message, 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 bg-red-100 rounded-full mb-4">
        <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-gray-600 text-center mb-4 max-w-md">{message}</p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default LoadingOverlay;

