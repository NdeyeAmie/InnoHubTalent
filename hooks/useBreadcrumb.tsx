'use client';

import { createContext, useContext, useState } from 'react';

type BreadcrumbContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('APPLICATION');

  return (
    <BreadcrumbContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error(
      "useBreadcrumb doit être utilisé à l'intérieur d'un BreadcrumbProvider and define in tabsBread"
    );
  }
  return context;
}
