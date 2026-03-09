import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  
  const success = useCallback((message) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message) => addToast(message, 'error'), [addToast]);
  const info = useCallback((message) => addToast(message, 'info'), [addToast]);
  const warning = useCallback((message) => addToast(message, 'warning'), [addToast]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <div className="fixed top-20 right-4 z-[100] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-slideIn backdrop-blur-md bg-white/90 border border-white/20 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-gray-900 min-w-[280px] max-w-md ${
              toast.type === 'success' ? 'border-l-4 border-l-green-500' :
              toast.type === 'error' ? 'border-l-4 border-l-red-500' :
              toast.type === 'warning' ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-blue-500'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
            {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
            <p className="flex-1 text-sm font-medium text-gray-700">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="hover:bg-gray-100 p-1 rounded-lg transition-colors">
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      success: (msg) => console.log(msg),
      error: (msg) => console.error(msg),
      info: (msg) => console.info(msg),
      warning: (msg) => console.warn(msg),
    };
  }
  return context;
};

