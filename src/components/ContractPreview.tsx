
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from "./RentalForm";

interface ContractPreviewProps {
  data: Partial<FormData>;
}

export function ContractPreview({ data }: ContractPreviewProps) {
  const formatDate = (date?: Date) => {
    return date ? format(date, "dd/MM/yyyy") : "";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="contract-container">
          <div className="contract-header text-xl font-bold mb-6">
            CAR RENTAL AGREEMENT / CONTRATO DE ALUGUEL DE VEÍCULOS
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              1. THE PARTS TO THIS AGREEMENT ARE / AS PARTES DESTE CONTRATO SÃO:
            </div>
            <div className="contract-clause">
              1.1 THE OWNER / O PROPRIETÁRIO:<br />
              Moove Locadora de Veículos S/A,<br />
              CNPJ 26.875.530/0001-77<br />
              Av. Barão Homem de Melo, 3150 – Estoril<br />
              Belo Horizonte – MG – CEP:30.494-080<br />
              Brasil
            </div>
            <div className="contract-clause">
              1.2 THE RENTER:<br />
              First Name(s) / Nome: {data.firstName || "_________________"}<br />
              Surname / Sobrenome: {data.surname || "_________________"}<br />
              Identity / Social Security or Other (Specify) number / Identidade / CPF ou outro: {data.idNumber || "_________________"}<br />
              Physical Address / Endereço Residencial: {data.address || "_________________"}<br />
            </div>
            <div className="contract-clause italic text-sm">
              The parts choose the above stated addresses as their physical addresses at which legal proceedings may be instituted. / As partes escolhem os endereços acima indicados como seus endereços físicos nos quais procedimentos legais podem ser instituídos.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              2. THE OBJECT OF THE RENTAL IS / O OBJETO DO ALUGUEL É:
            </div>
            <div className="contract-clause">
              2.1 Type of Vehicle / Tipo do Veículo: {data.vehicleType || "_________________"}<br />
              2.2 Make / Marca: {data.make || "_________________"}<br />
              2.3 Model / Modelo: {data.model || "_________________"}<br />
              2.4 Combustível / Fuel: {data.fuel || "_________________"}
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              3. CONDITION OF VEHICLE / CONDIÇÃO DO VEÍCULO:
            </div>
            <div className="contract-clause italic text-sm">
              3.1 The Owner states that to the best of his knowledge and belief that above-described vehicle is in sound and safe condition and free of any known defects or faults which would affect its safe operation under normal use. O Proprietário declara que, ao seu melhor conhecimento e crença, o veículo descrito acima está em condições seguras e livres de quaisquer defeitos ou falhas conhecidas que possam afetar sua operação segura sob uso normal.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              4. QUALIFICATIONS / QUALIFICAÇÕES:
            </div>
            <div className="contract-clause italic text-sm">
              4.1 The Renter states that he / she is physically and legally qualified to operate the above-described vehicle. O Locatário declara que ele/ela está fisicamente e legalmente qualificado(a) para operar o veículo descrito acima.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              5. RENTAL PERIOD / PERÍODO DE ALUGUEL:
            </div>
            <div className="contract-clause italic text-sm">
              The Owner agrees to rent the above-described vehicle to the Renter for the following period: / O Proprietário concorda em alugar o veículo descrito acima ao Locatário pelo seguinte período:
            </div>
            <div className="contract-clause">
              5.1 Starting Date / Data de Início: {formatDate(data.startDate)}<br />
              Time / Hora: {data.startTime || "_________________"}<br />
              5.1.1 Delivery location: {data.deliveryLocation || "_________________"} / Local de entrega: {data.deliveryLocation || "_________________"}
            </div>
            <div className="contract-clause">
              5.2 Ending Date / Data de Término: {formatDate(data.endDate)}<br />
              Time / Hora: {data.endTime || "_________________"}<br />
              5.2.1 Return location: {data.returnLocation || "_________________"} / Local de retorno: {data.returnLocation || "_________________"}
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              6. RENTAL RATE / TAXA DE ALUGUEL:
            </div>
            <div className="contract-clause">
              6.1 The Renter hereby agrees to pay the owner at the rate of US${data.rentalRate || "_______"}. O Locatário concorda em pagar ao proprietário à taxa de US${data.rentalRate || "_______"}.
            </div>
            <div className="contract-clause italic text-sm">
              6.2 All fuel used shall be paid for by the Renter. Todo o combustível utilizado será pago pelo Locatário.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              7. EXCLUSIONS AND OBLIGATIONS/ EXCLUSÕES E OBRIGAÇÕES:
            </div>
            <div className="contract-clause italic text-xs">
              7.1 The rented vehicle shall not be used to carry passengers or property for hire.<br />
              7.2 The rented vehicle shall not be used to carry passengers other than in the interior or cab of the vehicle.<br />
              7.3 The rented vehicle shall not be used to push, propel or tow another vehicle, trailer or any other thing without the written permission of the Owner.<br />
              7.4 The rented vehicle shall not be used for any race or in any competition.<br />
              7.5 The rented vehicle shall not be used for any illegal purpose.<br />
              7.6 The Renter shall not operate the vehicle in a negligent manner.<br />
              7.7 The rented vehicle shall not be operated by any other person other than the Renter stipulated in 1.2 above without the written permission of the Owner.<br />
              7.8 The Renter agrees to use the vehicle exclusively for legal purposes and in compliance with all applicable traffic laws in the state of Florida.<br />
              7.9 In the state of Florida, only a physical driver's license is accepted.<br />
              7.10 The Owner shall provide the Renter with the vehicle documents and proof of insurance at the time of vehicle delivery.<br />
              7.11 The Owner shall be responsible for all maintenance and repairs required to ensure the vehicle remains in safe and proper working condition during the rental period.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              8. INSURANCE / SEGURO:
            </div>
            <div className="contract-clause italic text-sm">
              8.1 The Renter hereby agrees that he / she shall be held fully responsible for the first $750.00 deductable in case of accident. The Renter also agrees that only the vehicle is covered under insurance and the driver or passengers are not covered. The Renter also agrees that personal belongings and other items left in the vehicle at any time are not covered. O Locatário concorda que será totalmente responsável pelos primeiros $750,00 de franquia em caso de acidente. O Locatário também concorda que apenas o veículo está coberto pelo seguro e que o motorista ou passageiros não estão cobertos. O Locatário também concorda que pertences pessoais e outros itens deixados no veículo a qualquer momento não estão cobertos.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              9. DEPOSIT / DEPÓSITO:
            </div>
            <div className="contract-clause">
              9.1 The Renter further agrees to make a payment of US${data.deposit || "_______"} with the Owner, this deposit being used in case of reserve. The balance must be paid off before the vehicle is delivered. O Locatário concorda em fazer um depósito de US${data.deposit || "_______"} com o Proprietário, sendo esse depósito usado em caso em caráter de reserva. O saldo deverá ser quitado até a data da entrega do veículo.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              10. EARLY TERMINATION
            </div>
            <div className="contract-clause italic text-sm">
              10.1 This contract may be terminated by either party with a minimum of 30 days' written notice. In the event of early termination by the Renter, the reservation deposit will be refunded only if the termination occurs more than 30 days before the scheduled vehicle delivery date. If termination occurs within 30 days of the delivery date, the reservation deposit will not be refunded.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              11. RETURN OF VEHICLE / DEVOLUÇÃO DO VEÍCULO:
            </div>
            <div className="contract-clause italic text-sm">
              11.1 The Renter hereby agrees to return the above-described vehicle to the pick up location later than 01PM. O Locatário concorda em devolver o veículo descrito acima ao local de retirada até no máximo 10h.<br />
              11.2. The Renter must return the vehicles to the OWNER on the lease end date of the airport at {data.returnLocation || "_________________"}, as agreed, in the same condition as received, except for normal wear and tear. The vehicle must be returned with a full tank; otherwise, a fee of $60.00 (sixty dollars) per vehicle will be charged. In case of excessive dirt, a fee of $100.00 per car will be applied.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              12. JURISDICTION:
            </div>
            <div className="contract-clause italic text-sm">
              12.1 The parts consent that this is a legal binding document in the U.S.A. As partes concordam que este é um documento legalmente vinculativo nos Estados Unidos da América.
            </div>
          </div>

          <div className="mb-6">
            Signed at Orlando on this {formatDate(data.signDate)} day of {data.signDate ? format(data.signDate, "MMMM yyyy") : "__________ ____"}<br />
            Assinado em Orlando, no dia {formatDate(data.signDate)}
          </div>

          <div className="contract-signature">
            <div>
              <div className="contract-signature-line">OWNER / PROPRIETÁRIO</div>
            </div>
            <div>
              <div className="contract-signature-line">RENTER / LOCATÁRIO</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
