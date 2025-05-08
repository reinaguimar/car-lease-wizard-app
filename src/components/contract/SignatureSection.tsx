
import React from "react";
import { format } from "date-fns";
import { FormData } from "../RentalForm";
import { ContractSignature } from "./ContractSignature";

interface SignatureSectionProps {
  data: Partial<FormData>;
}

export function SignatureSection({ data }: SignatureSectionProps) {
  const formatDate = (date?: Date) => {
    return date ? format(date, "dd/MM/yyyy") : "";
  };
  
  return (
    <>
      <div className="mb-6">
        Signed at Orlando, Florida, USA on this {formatDate(data.signDate)} day of {data.signDate ? format(data.signDate, "MMMM yyyy") : "__________ ____"}<br />
        <span className="translation">Assinado em Orlando, Flórida, EUA, no dia {formatDate(data.signDate)}</span>
      </div>
      <ContractSignature />
    </>
  );
}
