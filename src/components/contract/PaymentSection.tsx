
import React from "react";
import { FormData } from "../RentalForm";

interface PaymentSectionProps {
  data: Partial<FormData>;
}

export function PaymentSection({ data }: PaymentSectionProps) {
  return (
    <>
      <div className="contract-clause font-semibold">
        6. RENTAL RATE / <span className="translation">TAXA DE ALUGUEL:</span>
      </div>
      <div className="contract-clause">
        6.1 The Renter hereby agrees to pay the owner at the rate of US${data.rentalRate || "_______"}. <span className="translation">O Locatário concorda em pagar ao proprietário à taxa de US${data.rentalRate || "_______"}.</span>
      </div>
      <div className="contract-clause">
        <span className="text-sm">6.2 All fuel used shall be paid for by the Renter.</span> <span className="translation text-sm">Todo o combustível utilizado será pago pelo Locatário.</span>
      </div>
    </>
  );
}
