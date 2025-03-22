
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Alert type definition
export interface Alert {
  id: string;
  type: 'stock' | 'debt';
  message: string;
  date: string;
}

// Context type definition
interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (alert: Alert) => void;
  deleteAlert: (id: string) => void;
}

// Create the context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider component
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) => {
    setAlerts([...alerts, alert]);
  };

  const updateAlert = (alert: Alert) => {
    setAlerts(alerts.map(a => a.id === alert.id ? alert : a));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{
      alerts,
      addAlert,
      updateAlert,
      deleteAlert,
    }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the context
export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
