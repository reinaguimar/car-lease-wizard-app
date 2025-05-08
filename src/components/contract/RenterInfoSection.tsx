
import React from "react";
import { FormData } from "../RentalForm";

interface RenterInfoSectionProps {
  data: Partial<FormData>;
}

export function RenterInfoSection({ data }: RenterInfoSectionProps) {
  return (
    <>
      <div className="contract-clause font-semibold">
        1. THE PARTS TO THIS AGREEMENT ARE / <span className="translation">AS PARTES DESTE CONTRATO SÃO:</span>
      </div>
      <div className="contract-clause">
        1.1 THE OWNER / <span className="translation">O PROPRIETÁRIO:</span><br />
        Moove Locadora de Veículos S/A,<br />
        CNPJ 26.875.530/0001-77<br />
        Av. Barão Homem de Melo, 3150 – Estoril<br />
        Belo Horizonte – MG – CEP:30.494-080<br />
        Brasil
      </div>
      <div className="contract-clause">
        1.2 THE RENTER:<br />
        First Name(s) / <span className="translation">Nome:</span> {data.firstName || "_________________"}<br />
        Surname / <span className="translation">Sobrenome:</span> {data.surname || "_________________"}<br />
        ID/Passport (US) / CPF/RG (Brazil) / <span className="translation">Documento de Identidade:</span> {data.idNumber || "_________________"}<br />
        Physical Address / <span className="translation">Endereço Residencial:</span> {data.address || "_________________"}<br />
      </div>
      <div className="contract-clause">
        <span className="text-sm">The parts choose the above stated addresses as their physical addresses at which legal proceedings may be instituted.</span> / <span className="translation text-sm">As partes escolhem os endereços acima indicados como seus endereços físicos nos quais procedimentos legais podem ser instituídos.</span>
      </div>
    </>
  );
}
