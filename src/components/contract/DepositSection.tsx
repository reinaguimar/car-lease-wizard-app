
import React from "react";
import { FormData } from "../RentalForm";

interface DepositSectionProps {
  data: Partial<FormData>;
}

export function DepositSection({ data }: DepositSectionProps) {
  return (
    <>
      <div className="contract-clause font-semibold">
        9. DEPOSIT / <span className="translation">DEPÓSITO:</span>
      </div>
      <div className="contract-clause">
        9.1 The Renter further agrees to make a payment of US${data.deposit || "_______"} with the Owner, this deposit being used in case of reserve. The balance must be paid off before the vehicle is delivered. <span className="translation">O Locatário concorda em fazer um depósito de US${data.deposit || "_______"} com o Proprietário, sendo esse depósito usado em caso em caráter de reserva. O saldo deverá ser quitado até a data da entrega do veículo.</span>
      </div>
    </>
  );
}
