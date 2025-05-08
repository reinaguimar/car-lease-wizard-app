
import React from "react";

interface ContractSectionProps {
  children: React.ReactNode;
}

export function ContractSection({ children }: ContractSectionProps) {
  return (
    <div className="contract-section">
      {children}
    </div>
  );
}
