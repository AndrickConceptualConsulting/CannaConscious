import { createContext, useContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  // State for alerts
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Show global alert
  const showAlert = (type, message) => {
    setGlobalAlert({ show: true, type, message });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setGlobalAlert({ ...globalAlert, show: false });
    }, 5000);
  };

  // Hide global alert
  const hideAlert = () => {
    setGlobalAlert({ ...globalAlert, show: false });
  };

  // Values to share across the app
  const values = {
    globalAlert,
    showAlert,
    hideAlert
  };
  
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
};