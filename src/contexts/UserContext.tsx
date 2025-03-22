
import React, { createContext, useContext, useState, ReactNode } from 'react';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Context type definition
interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <UserContext.Provider value={{
      users,
      addUser,
      updateUser,
      deleteUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
