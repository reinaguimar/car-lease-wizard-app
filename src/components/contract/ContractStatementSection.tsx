import { FormData } from "@/components/RentalForm";
import { format, differenceInDays } from "date-fns";

interface ContractStatementSectionProps {
  data: Partial<FormData>;
}

export function ContractStatementSection({ data }: ContractStatementSectionProps) {
  const additionalProducts = data.additionalProducts || [];
  
  // Calculate total days
  const totalDays = data.startDate && data.endDate 
    ? differenceInDays(data.endDate, data.startDate) || 1
    : 1;

  return (
    <div className="contract-statement-page" style={{ pageBreakAfter: 'always' }}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          DEMONSTRATIVO DE CONTRATO / <span className="translation">CONTRACT STATEMENT</span>
        </h2>
      </div>

      {/* Dados do Locatário */}
      <div className="contract-section mb-4">
        <h3 className="section-title text-lg font-bold mb-3">
          DADOS DO LOCATÁRIO / <span className="translation">RENTER INFORMATION</span>
        </h3>
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">Nome Completo / Full Name:</p>
              <p>{data.firstName} {data.surname}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Documento / ID Number:</p>
              <p>{data.idNumber}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Endereço / Address:</p>
            <p>{data.address}</p>
          </div>
          {data.email && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">E-mail:</p>
                <p>{data.email}</p>
              </div>
              {data.phone && (
                <div>
                  <p className="text-sm font-semibold">Telefone / Phone:</p>
                  <p>{data.phone}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dados do Veículo */}
      <div className="contract-section mb-4">
        <h3 className="section-title text-lg font-bold mb-3">
          DADOS DO VEÍCULO / <span className="translation">VEHICLE INFORMATION</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold">Tipo / Type:</p>
            <p>{data.vehicleType}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Marca / Make:</p>
            <p>{data.make}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Modelo / Model:</p>
            <p>{data.model}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Combustível / Fuel:</p>
            <p>{data.fuel}</p>
          </div>
          {data.licensePlate && (
            <div>
              <p className="text-sm font-semibold">Placa / License Plate:</p>
              <p>{data.licensePlate}</p>
            </div>
          )}
          {data.year && (
            <div>
              <p className="text-sm font-semibold">Ano / Year:</p>
              <p>{data.year}</p>
            </div>
          )}
          {data.color && (
            <div>
              <p className="text-sm font-semibold">Cor / Color:</p>
              <p>{data.color}</p>
            </div>
          )}
        </div>
      </div>

      {/* Período de Locação */}
      <div className="contract-section mb-4">
        <h3 className="section-title text-lg font-bold mb-3">
          PERÍODO DE LOCAÇÃO / <span className="translation">RENTAL PERIOD</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold">Retirada / Pick-up:</p>
            <p>
              {data.startDate && format(new Date(data.startDate), "dd/MM/yyyy")} às {data.startTime}
            </p>
            <p className="text-sm mt-1">Local: {data.deliveryLocation}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Devolução / Return:</p>
            <p>
              {data.endDate && format(new Date(data.endDate), "dd/MM/yyyy")} às {data.endTime}
            </p>
            <p className="text-sm mt-1">Local: {data.returnLocation}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold">Total de Dias / Total Days:</p>
          <p>{totalDays} dia(s) / day(s)</p>
        </div>
      </div>

      {/* Produtos e Serviços Contratados */}
      {additionalProducts.length > 0 && (
        <div className="contract-section mb-4">
          <h3 className="section-title text-lg font-bold mb-3">
            PRODUTOS E SERVIÇOS CONTRATADOS / <span className="translation">CONTRACTED PRODUCTS AND SERVICES</span>
          </h3>
          <div className="space-y-3">
            {additionalProducts.map((product, index) => (
              <div key={index} className="border-b pb-2 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    {product.description && (
                      <p className="text-sm translation mt-1">{product.description}</p>
                    )}
                  </div>
                  {product.quantity && product.quantity > 1 && (
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold">Qtd / Qty:</p>
                      <p>{product.quantity}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Condutor Adicional */}
      {data.additionalDriverName && (
        <div className="contract-section mb-4">
          <h3 className="section-title text-lg font-bold mb-3">
            CONDUTOR ADICIONAL AUTORIZADO / <span className="translation">AUTHORIZED ADDITIONAL DRIVER</span>
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold">Nome Completo / Full Name:</p>
              <p>{data.additionalDriverName}</p>
            </div>
            {data.additionalDriverIdNumber && (
              <div>
                <p className="text-sm font-semibold">Documento / ID Number:</p>
                <p>{data.additionalDriverIdNumber}</p>
              </div>
            )}
            {data.additionalDriverLicense && (
              <div>
                <p className="text-sm font-semibold">CNH / Driver's License:</p>
                <p>{data.additionalDriverLicense}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Observação */}
      <div className="contract-section border-2 border-primary/50 p-4 mt-6">
        <p className="text-sm translation text-center italic">
          Este demonstrativo apresenta os itens e serviços contratados. 
          Para informações sobre valores e condições financeiras, consulte o contrato completo.
        </p>
        <p className="text-sm text-center italic mt-2">
          This statement presents the contracted items and services. 
          For information about values and financial conditions, please refer to the complete contract.
        </p>
      </div>
    </div>
  );
}
