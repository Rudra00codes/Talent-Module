import React, { ReactNode } from 'react';

interface PatternProps {
  children: ReactNode;
}

const Pattern: React.FC<PatternProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Pattern; 