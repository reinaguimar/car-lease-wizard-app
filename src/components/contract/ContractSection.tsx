
import React from "react";

interface ContractSectionProps {
  children: React.ReactNode;
}

export function ContractSection({ children }: ContractSectionProps) {
  return (
    <div className="contract-section mb-4 border-b border-gray-200 pb-4">
      {children}
    </div>
  );
}
