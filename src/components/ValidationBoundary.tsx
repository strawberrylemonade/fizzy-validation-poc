import React, { createContext, FC, useState } from 'react';
import { v4 } from 'uuid';

export const ValidationBoundaryContext = createContext<(string)>('');

interface ValidationBoundaryProps {
  name?: string
}

export const ValidationBoundary: FC<ValidationBoundaryProps> = ({ children, name }) => {

  const [id] = useState(v4());

  return <ValidationBoundaryContext.Provider value={id}>
    { children }
  </ValidationBoundaryContext.Provider>
}