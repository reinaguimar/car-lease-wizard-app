
import React from "react";
import { FormData } from "../RentalForm";

interface VehicleInfoSectionProps {
  data: Partial<FormData>;
}

export function VehicleInfoSection({ data }: VehicleInfoSectionProps) {
  return (
    <>
      <div className="contract-clause font-semibold">
        2. THE OBJECT OF THE RENTAL IS / <span className="translation">O OBJETO DO ALUGUEL É:</span>
      </div>
      <div className="contract-clause">
        2.1 Type of Vehicle / <span className="translation">Tipo do Veículo:</span> {data.vehicleType || "_________________"}<br />
        2.2 Make / <span className="translation">Marca:</span> {data.make || "_________________"}<br />
        2.3 Model / <span className="translation">Modelo:</span> {data.model || "_________________"}<br />
        2.4 Fuel / <span className="translation">Combustível:</span> {data.fuel || "_________________"}
      </div>
    </>
  );
}
