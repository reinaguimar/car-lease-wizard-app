
import React from "react";

interface ContractClauseProps {
  title?: string;
  children: React.ReactNode;
  isBold?: boolean;
  isSmallText?: boolean;
}

export function ContractClause({ 
  title, 
  children, 
  isBold = false,
  isSmallText = false
}: ContractClauseProps) {
  return (
    <div className={`contract-clause ${isBold ? 'font-semibold' : ''} ${isSmallText ? 'text-xs' : ''}`}>
      {title && <>{title}</>}
      {children}
    </div>
  );
}
