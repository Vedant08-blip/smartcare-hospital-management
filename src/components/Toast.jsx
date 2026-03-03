import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast Context for global access
const ToastContext = createContext(null);

// Toast types
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast configuration
const toastConfig = {
  [TOAST_TYPES.SUCCESS]: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
  },
  [TOAST_TYPES.ERROR]: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600',
  },
  [TOAST_TYPES.WARNING]: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600',
  },
  [TOAST_TYPES.INFO]: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
  },
};

// Individual Toast Component
const Toast = ({ id, message, type, onClose, duration = 5000 }) => {
  const config = toastConfig[type] || toastConfig[TOAST_TYPES.INFO];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${config.bgColor} ${config.borderColor} ${config.textColor} animate-slideIn`}
      role="alert"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const toast = {
    success: (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration),
    error: (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration),
    warning: (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration),
    info: (message, duration) => addToast(message, TOAST_TYPES.INFO, duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

// Custom hook to use Toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return a no-op function if used outside provider
    return {
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
    };
  }
  return context;
};

export { TOAST_TYPES };
export default ToastProvider;

