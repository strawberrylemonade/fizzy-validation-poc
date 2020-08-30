import React, { useContext, FC, useRef, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { ValidationContext, Problem } from './ValidationProvider';
import { ValidationBoundaryContext } from './ValidationBoundary';
import { v4 } from 'uuid';

interface ValidationIndicatorProps {
  description: string
  fix?: () => void
}

export const ValidationIndicator: FC<ValidationIndicatorProps> = ({ description, fix }) => {

  const [, dispatch] = useContext(ValidationContext);
  const boundaryId = useContext(ValidationBoundaryContext);
  const ref = useRef<HTMLParagraphElement>(null);
  const [id] = useState(v4());
  const [isPinging, setPingState] = useState(false);
 
  useEffect(() => {
    const highlight = () => {
      ref.current?.scrollIntoView();
      setPingState(true);
      setTimeout(() => setPingState(false), 2000);
    }
  
    dispatch({ type: 'ADD', id, description, fix, highlight, boundaryId });

    return () => dispatch({type: 'REMOVE', id })
  }, [id, description, fix, boundaryId, dispatch]);

  return <div ref={ref} className="p-2 flex items-center justify-center" data-tip={description}>
    <svg className={isPinging ? 'animate-ping' : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#FFA000"/>
    </svg>
    <ReactTooltip />
  </div>
}

export const useProblems = (): Problem[] => {
  const boundaryId = useContext(ValidationBoundaryContext);
  const [ problems ] = useContext(ValidationContext);
  if (!boundaryId) return problems;
  return problems.filter(p => p.boundaryId === boundaryId);
}