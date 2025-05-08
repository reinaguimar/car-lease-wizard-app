
import React from "react";
import { type Company } from "@/components/CompanySelector";

interface ContractHeaderProps {
  company: Company;
}

export function ContractHeader({ company }: ContractHeaderProps) {
  if (company === "yoou") {
    return (
      <div className="contract-header">
        <div className="yoou-logo">
          <img src="/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png" alt="Yoou Logo" className="h-12 mb-2" />
        </div>
        <div className="text-xl">
          CAR RENTAL AGREEMENT / <span className="translation">CONTRATO DE ALUGUEL DE VEÍCULOS</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="contract-header text-xl font-bold mb-6">
      CAR RENTAL AGREEMENT / <span className="translation">CONTRATO DE ALUGUEL DE VEÍCULOS</span>
    </div>
  );
}
