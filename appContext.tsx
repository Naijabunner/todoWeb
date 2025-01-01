import React, { useContext, useState, ReactNode } from 'react';
import { createContext } from 'react';

interface AppContextProps {
  fetchDep: boolean;
  handleUpdate: ()=>void;
}

const DependencyContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fetchDep, setfetchDep] = useState(false);

  const handleUpdate=()=>{
    setfetchDep(!fetchDep)
  }
  return (
    <DependencyContext.Provider value={{ fetchDep, handleUpdate }}>
      {children}
    </DependencyContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(DependencyContext);
  return context;
};

export { AppProvider, useAppContext };