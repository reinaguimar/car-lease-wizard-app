
import React from "react";
import { format } from "date-fns";
import { FormData } from "../RentalForm";

interface RentalPeriodSectionProps {
  data: Partial<FormData>;
}

export function RentalPeriodSection({ data }: RentalPeriodSectionProps) {
  const formatDate = (date?: Date) => {
    return date ? format(date, "dd/MM/yyyy") : "";
  };

  return (
    <>
      <div className="contract-clause font-semibold">
        5. RENTAL PERIOD / <span className="translation">PERÍODO DE ALUGUEL:</span>
      </div>
      <div className="contract-clause">
        <span className="text-sm">The Owner agrees to rent the above-described vehicle to the Renter for the following period:</span> / <span className="translation text-sm">O Proprietário concorda em alugar o veículo descrito acima ao Locatário pelo seguinte período:</span>
      </div>
      <div className="contract-clause">
        5.1 Starting Date / <span className="translation">Data de Início:</span> {formatDate(data.startDate)}<br />
        Time (US) / <span className="translation">Hora (BR):</span> {data.startTime || "_______"} / {data.startTime ? data.startTime.replace("AM", "h").replace("PM", "h") : "_______"}h<br />
        5.1.1 Delivery location / <span className="translation">Local de entrega:</span> {data.deliveryLocation || "_________________"}, Florida, USA
      </div>
      <div className="contract-clause">
        5.2 Ending Date / <span className="translation">Data de Término:</span> {formatDate(data.endDate)}<br />
        Time (US) / <span className="translation">Hora (BR):</span> {data.endTime || "_______"} / {data.endTime ? data.endTime.replace("AM", "h").replace("PM", "h") : "_______"}h<br />
        5.2.1 Return location / <span className="translation">Local de retorno:</span> {data.returnLocation || "_________________"}, Florida, USA
      </div>
    </>
  );
}
