
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
            CAR RENTAL AGREEMENT / <span className="translation">CONTRATO DE ALUGUEL DE VEÍCULOS</span>
          </div>

          <div className="contract-section">
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
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              2. THE OBJECT OF THE RENTAL IS / <span className="translation">O OBJETO DO ALUGUEL É:</span>
            </div>
            <div className="contract-clause">
              2.1 Type of Vehicle / <span className="translation">Tipo do Veículo:</span> {data.vehicleType || "_________________"}<br />
              2.2 Make / <span className="translation">Marca:</span> {data.make || "_________________"}<br />
              2.3 Model / <span className="translation">Modelo:</span> {data.model || "_________________"}<br />
              2.4 Fuel / <span className="translation">Combustível:</span> {data.fuel || "_________________"}
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              3. CONDITION OF VEHICLE / <span className="translation">CONDIÇÃO DO VEÍCULO:</span>
            </div>
            <div className="contract-clause">
              <span className="text-sm">3.1 The Owner states that to the best of his knowledge and belief that above-described vehicle is in sound and safe condition and free of any known defects or faults which would affect its safe operation under normal use.</span> <span className="translation text-sm">O Proprietário declara que, ao seu melhor conhecimento e crença, o veículo descrito acima está em condições seguras e livres de quaisquer defeitos ou falhas conhecidas que possam afetar sua operação segura sob uso normal.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              4. QUALIFICATIONS / <span className="translation">QUALIFICAÇÕES:</span>
            </div>
            <div className="contract-clause">
              <span className="text-sm">4.1 The Renter states that he / she is physically and legally qualified to operate the above-described vehicle.</span> <span className="translation text-sm">O Locatário declara que ele/ela está fisicamente e legalmente qualificado(a) para operar o veículo descrito acima.</span>
            </div>
          </div>

          <div className="contract-section">
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
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              6. RENTAL RATE / <span className="translation">TAXA DE ALUGUEL:</span>
            </div>
            <div className="contract-clause">
              6.1 The Renter hereby agrees to pay the owner at the rate of US${data.rentalRate || "_______"}. <span className="translation">O Locatário concorda em pagar ao proprietário à taxa de US${data.rentalRate || "_______"}.</span>
            </div>
            <div className="contract-clause">
              <span className="text-sm">6.2 All fuel used shall be paid for by the Renter.</span> <span className="translation text-sm">Todo o combustível utilizado será pago pelo Locatário.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              7. EXCLUSIONS AND OBLIGATIONS/ <span className="translation">EXCLUSÕES E OBRIGAÇÕES:</span>
            </div>
            <div className="contract-clause text-xs">
              7.1 The rented vehicle shall not be used to carry passengers or property for hire.<br />
              7.2 The rented vehicle shall not be used to carry passengers other than in the interior or cab of the vehicle.<br />
              7.3 The rented vehicle shall not be used to push, propel or tow another vehicle, trailer or any other thing without the written permission of the Owner.<br />
              7.4 The rented vehicle shall not be used for any race or in any competition.<br />
              7.5 The rented vehicle shall not be used for any illegal purpose.<br />
              7.6 The Renter shall not operate the vehicle in a negligent manner.<br />
              7.7 The rented vehicle shall not be operated by any other person other than the Renter stipulated in 1.2 above without the written permission of the Owner. If Renter allows any other driver under the age of 25 years old to drive the rented vehicle, the Renter will be fully responsible for all expenses relating to the rental car and any other Vehicle involve in any type of accident.<br />
              7.8 The Renter agrees to use the vehicle exclusively for legal purposes and in compliance with all applicable traffic laws in the state of Florida. The Renter shall not permit unauthorized third parts to operate the vehicle. In the event of fines, a surcharge of 20% will be applied to the fine amount, which must be paid within 3 days of notification.<br />
              7.9 In the state of Florida, only a physical driver's license is accepted. The Renter is responsible for providing the Owner, at the time of signing this contract, with the documents of the individuals authorized to drive each vehicle, properly licensed, and provide a passport.<br />
              7.10 The Owner shall provide the Renter with the vehicle documents and proof of insurance at the time of vehicle delivery.<br />
              7.11 The Owner shall be responsible for all maintenance and repairs required to ensure the vehicle remains in safe and proper working condition during the rental period. However, any repairs necessitated by negligence or misuse by the Renter shall be the sole responsibility of the Renter.
            </div>
            <div className="contract-clause translation text-xs">
              7.1 O veículo alugado não deve ser usado para transportar passageiros ou mercadorias para fins comerciais.<br />
              7.2 O veículo alugado não deve ser usado para transportar passageiros fora do interior ou cabine do veículo.<br />
              7.3 O veículo alugado não deve ser usado para empurrar, impulsionar ou rebocar outro veículo, trailer ou qualquer outra coisa sem a permissão por escrito do Proprietário.<br />
              7.4 O veículo alugado não deve ser usado em corridas ou competições.<br />
              7.5 O veículo alugado não deve ser usado para qualquer propósito ilegal.<br />
              7.6 O Locatário não deve operar o veículo de maneira negligente.<br />
              7.7 O veículo alugado não deve ser operado por qualquer pessoa que não seja o Locatário estipulado na cláusula 1.2 acima sem a permissão por escrito do Proprietário. Se o Locatário permitir que qualquer outro motorista com menos de 25 anos de idade conduza o veículo alugado, o Locatário será totalmente responsável por todas as despesas relacionadas ao carro alugado e qualquer outro veículo envolvido em qualquer tipo de acidente.<br />
              7.8 O LOCATÁRIO compromete-se a utilizar o veículo exclusivamente para fins legais, em conformidade com todas as leis de trânsito aplicáveis no estado da Flórida. O LOCATÁRIO não permitirá que terceiros não autorizados conduzam o veículo. Em caso de multas, será aplicada uma taxa adicional de 20% sobre o valor da multa, a ser paga em até 3 dias após sua notificação.<br />
              7.9 No estado da Flórida, é aceita apenas a CNH física. O LOCATÁRIO é responsável por enviar ao PROPRIETÁRIO, no momento da assinatura deste contrato, os documentos das pessoas autorizadas a conduzir cada veículo, ser devidamente habilitadas, e apresentar o passaporte.<br />
              7.10 O PROPRIETÁRIO, por sua vez, deverá entregar ao LOCATÁRIO os documentos dos veículos e os comprovantes de seguro no momento da entrega dos veículos.<br />
              7.11 O PROPRIETÁRIO será responsável por todas as manutenções e reparos necessários para assegurar que o veículo permaneça em condições seguras e adequadas de uso durante o período de locação. Contudo, qualquer reparo necessário devido a negligência ou uso indevido por parte do LOCATÁRIO será de responsabilidade exclusiva deste.
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              8. INSURANCE / <span className="translation">SEGURO:</span>
            </div>
            <div className="contract-clause">
              <span className="text-sm">8.1 The Renter hereby agrees that he / she shall be held fully responsible for the first $750.00 deductable in case of accident. The Renter also agrees that only the vehicle is covered under insurance and the driver or passengers are not covered. The Renter also agrees that personal belongings and other items left in the vehicle at any time are not covered.</span> <span className="translation text-sm">O Locatário concorda que será totalmente responsável pelos primeiros $750,00 de franquia em caso de acidente. O Locatário também concorda que apenas o veículo está coberto pelo seguro e que o motorista ou passageiros não estão cobertos. O Locatário também concorda que pertences pessoais e outros itens deixados no veículo a qualquer momento não estão cobertos.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              9. DEPOSIT / <span className="translation">DEPÓSITO:</span>
            </div>
            <div className="contract-clause">
              9.1 The Renter further agrees to make a payment of US${data.deposit || "_______"} with the Owner, this deposit being used in case of reserve. The balance must be paid off before the vehicle is delivered. <span className="translation">O Locatário concorda em fazer um depósito de US${data.deposit || "_______"} com o Proprietário, sendo esse depósito usado em caso em caráter de reserva. O saldo deverá ser quitado até a data da entrega do veículo.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              10. EARLY TERMINATION
            </div>
            <div className="contract-clause">
              <span className="text-sm">10.1 This contract may be terminated by either party with a minimum of 30 days' written notice. In the event of early termination by the Renter, the reservation deposit will be refunded only if the termination occurs more than 30 days before the scheduled vehicle delivery date. If termination occurs within 30 days of the delivery date, the reservation deposit will not be refunded.</span> <span className="translation text-sm">Este contrato pode ser rescindido por qualquer das partes mediante notificação escrita com, no mínimo, 30 dias de antecedência. Em caso de rescisão antecipada pelo LOCATÁRIO, o depósito de reserva será reembolsado apenas se a rescisão ocorrer com mais de 30 dias antes da data prevista para a entrega do veículo. Caso a rescisão ocorra com menos de 30 dias de antecedência, o depósito de reserva não será reembolsado.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              11. RETURN OF VEHICLE / <span className="translation">DEVOLUÇÃO DO VEÍCULO:</span>
            </div>
            <div className="contract-clause">
              <span className="text-sm">11.1 The Renter hereby agrees to return the above-described vehicle to the pick up location later than 01PM.</span> <span className="translation text-sm">O Locatário concorda em devolver o veículo descrito acima ao local de retirada até no máximo 13h.</span><br />
              <span className="text-sm">11.2. The Renter must return the vehicles to the OWNER on the lease end date of the airport at {data.returnLocation ? data.returnLocation.toUpperCase() : "ORLANDO AIRPORT"}, Florida, USA, as agreed, in the same condition as received, except for normal wear and tear. The vehicle must be returned with a full tank; otherwise, a fee of $60.00 (sixty dollars) per vehicle will be charged. In case of excessive dirt, a fee of $100.00 per car will be applied.</span> <span className="translation text-sm">O Locatário deve devolver os veículos ao PROPRIETÁRIO na data de término da locação, no aeroporto de {data.returnLocation ? data.returnLocation.toUpperCase() : "ORLANDO"}, Flórida, EUA, conforme acordado, nas mesmas condições em que foram recebidos, exceto pelo desgaste natural. O veículo deve ser devolvido com o tanque cheio; caso contrário, será cobrada uma taxa de $60,00 (sessenta dólares). Em caso de sujeira excessiva, será aplicada uma taxa de $100,00 por carro.</span>
            </div>
          </div>

          <div className="contract-section">
            <div className="contract-clause font-semibold">
              12. JURISDICTION:
            </div>
            <div className="contract-clause">
              <span className="text-sm">12.1 The parts consent that this is a legal binding document in the U.S.A.</span> <span className="translation text-sm">As partes concordam que este é um documento legalmente vinculativo nos Estados Unidos da América.</span>
            </div>
          </div>

          <div className="mb-6">
            Signed at Orlando, Florida, USA on this {formatDate(data.signDate)} day of {data.signDate ? format(data.signDate, "MMMM yyyy") : "__________ ____"}<br />
            <span className="translation">Assinado em Orlando, Flórida, EUA, no dia {formatDate(data.signDate)}</span>
          </div>

          <div className="contract-signature">
            <div>
              <div className="contract-signature-line">OWNER / <span className="translation">PROPRIETÁRIO</span></div>
            </div>
            <div>
              <div className="contract-signature-line">RENTER / <span className="translation">LOCATÁRIO</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
