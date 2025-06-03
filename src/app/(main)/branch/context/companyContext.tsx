// /context/CompanyContext.tsx
'use client';

import { createContext, useContext } from 'react';

type Review = {
  id: number
  username: string
  content: string
  rating: number  // Assuming rating is on a scale (e.g., 1-10)
  date?: string   // Optional date when review was posted
}

type Company = {
  id: string
  name: string
  logo: string
  description: string
  address: string
  phone: string
  whatsapp: string
  instagram?: string
  reviews?: Review[]
}

const CompanyContext = createContext<Company | null>(null);

export function CompanyProvider({ 
  children, 
  company 
}: { 
  children: React.ReactNode, 
  company: Company 
}) {
  return (
    <CompanyContext.Provider value={company}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}