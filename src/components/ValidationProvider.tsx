import React, { createContext, FC, useReducer } from 'react';

export interface Problem {
  id: string
  boundaryId?: string
  description: string
  highlight: () => void;
  fix?: () => void;
}

export const ValidationContext = createContext<([Problem[], React.Dispatch<any>])>([[], () => {}]);

interface ValidationProviderProps {}

export const ValidationProvider: FC<ValidationProviderProps> = ({ children }) => {

  const reducer = (problems: Problem[], action: {[key: string]: any}) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...problems,
          {
            id: action.id,
            description: action.description,
            fix: action.fix,
            highlight: action.highlight,
            boundaryId: action.boundaryId
          }
        ]
      case 'REMOVE':
        return [
          ...problems.filter(problem => problem.id !== action.id),
        ]
      default:
        return problems;
    }
  }


  return <ValidationContext.Provider value={useReducer(reducer, [])}>
    { children }
  </ValidationContext.Provider>
}
