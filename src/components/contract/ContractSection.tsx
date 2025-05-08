
import React from "react";

interface ContractSectionProps {
  children: React.ReactNode;
}

export function ContractSection({ children }: ContractSectionProps) {
  return (
    <div className="contract-section mb-5 border-b border-gray-100 pb-2">
      {children}
    </div>
  );
}
