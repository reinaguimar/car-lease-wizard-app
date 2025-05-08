
import React from "react";
import { FormData } from "../RentalForm";

interface ReturnSectionProps {
  data: Partial<FormData>;
}

export function ReturnSection({ data }: ReturnSectionProps) {
  return (
    <>
      <div className="contract-clause font-semibold">
        11. RETURN OF VEHICLE / <span className="translation">DEVOLUÇÃO DO VEÍCULO:</span>
      </div>
      <div className="contract-clause">
        <span className="text-sm">11.1 The Renter hereby agrees to return the above-described vehicle to the pick up location later than 01PM.</span> <span className="translation text-sm">O Locatário concorda em devolver o veículo descrito acima ao local de retirada até no máximo 13h.</span><br />
        <span className="text-sm">11.2. The Renter must return the vehicles to the OWNER on the lease end date of the airport at {data.returnLocation ? data.returnLocation.toUpperCase() : "ORLANDO AIRPORT"}, Florida, USA, as agreed, in the same condition as received, except for normal wear and tear. The vehicle must be returned with a full tank; otherwise, a fee of $60.00 (sixty dollars) per vehicle will be charged. In case of excessive dirt, a fee of $100.00 per car will be applied.</span> <span className="translation text-sm">O Locatário deve devolver os veículos ao PROPRIETÁRIO na data de término da locação, no aeroporto de {data.returnLocation ? data.returnLocation.toUpperCase() : "ORLANDO"}, Flórida, EUA, conforme acordado, nas mesmas condições em que foram recebidos, exceto pelo desgaste natural. O veículo deve ser devolvido com o tanque cheio; caso contrário, será cobrada uma taxa de $60,00 (sessenta dólares). Em caso de sujeira excessiva, será aplicada uma taxa de $100,00 por carro.</span>
      </div>
    </>
  );
}
