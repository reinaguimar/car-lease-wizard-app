
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { createPDFWindow, populatePDFContent } from "./pdf/PDFWindowCreator";
import { useState } from "react";
import { 
  createClientHelper as createClient, 
  createVehicleHelper as createVehicle, 
  createContractHelper as createContract 
} from "@/services/supabase";
import { generateContractNumber } from "@/utils/contractUtils";
import { useLoading } from "@/hooks/useLoading";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  
  // Função para verificar se todos os dados estão preenchidos
  const isFormDataComplete = (data: Partial<FormData>): boolean => {
    const requiredFields = [
      'firstName', 'surname', 'idNumber', 'address',
      'vehicleType', 'make', 'model', 'fuel',
      'startDate', 'startTime', 'endDate', 'endTime',
      'deliveryLocation', 'returnLocation',
      'rentalRate', 'deposit', 'signDate'
    ];
    
    return requiredFields.every(field => Boolean(data[field as keyof FormData]));
  };
  
  // Verifica se o formulário está completo
  const isComplete = isFormDataComplete(data);
  
  const handleSaveAsPDF = async () => {
    try {
      setIsSaving(true);
      
      // Verificar se todos os dados necessários estão presentes
      if (!isComplete) {
        toast.error("Por favor, complete todos os campos do formulário antes de salvar");
        return;
      }
      
      toast.info("Salvando contrato e preparando PDF...");
      
      // 1. Criar ou buscar cliente no banco de dados
      const clientData = {
        first_name: data.firstName!,
        surname: data.surname!,
        id_number: data.idNumber!,
        address: data.address!
      };
      
      const client = await createClient(clientData);
      
      if (!client) {
        throw new Error("Erro ao criar/buscar cliente");
      }
      
      // 2. Criar ou buscar veículo no banco de dados
      const vehicleData = {
        vehicle_type: data.vehicleType!,
        make: data.make!,
        model: data.model!,
        fuel: data.fuel!,
        company_id: company === 'moove' 
          ? '79c81b51-8a37-46f0-9b67-d38e3ab6d159' // ID fixo da Moove
          : '23a81c52-8b38-47f1-9c67-e37e4ab6d160'  // ID fixo da Yoou
      };
      
      const vehicle = await createVehicle(vehicleData);
      
      if (!vehicle) {
        throw new Error("Erro ao criar/buscar veículo");
      }
      
      // 3. Criar contrato no banco de dados
      const contractData = {
        contract_number: generateContractNumber(),
        client_id: client.id,
        vehicle_id: vehicle.id,
        company_id: vehicleData.company_id,
        start_date: formatDateToISO(data.startDate!),
        start_time: data.startTime!,
        end_date: formatDateToISO(data.endDate!),
        end_time: data.endTime!,
        delivery_location: data.deliveryLocation!,
        return_location: data.returnLocation!,
        rental_rate: parseFloat(data.rentalRate!),
        deposit: parseFloat(data.deposit!),
        sign_date: formatDateToISO(data.signDate!)
      };
      
      const contract = await createContract(contractData);
      
      if (!contract) {
        throw new Error("Erro ao criar contrato");
      }
      
      // 4. Gerar o PDF
      const pdfWindow = createPDFWindow({ data, company });
      
      if (pdfWindow) {
        populatePDFContent(pdfWindow, company);
        
        // Informação ao usuário
        toast.success("Contrato salvo com sucesso!", {
          description: `Nº ${contractData.contract_number}`,
          duration: 5000
        });
        
        // Instruções para salvar o PDF
        setTimeout(() => {
          toast.info("Utilize a opção 'Salvar como PDF' na janela de impressão para gerar o documento PDF");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao salvar contrato", {
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Função para formatar data para ISO string (YYYY-MM-DD)
  const formatDateToISO = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <Button 
      onClick={handleSaveAsPDF}
      className="no-print mb-6 w-full sm:w-auto text-xs sm:text-sm"
      variant="default"
      disabled={isSaving || !isComplete}
    >
      <Save className="mr-2 h-4 w-4" />
      {isSaving ? "Salvando..." : isComplete ? "Salvar em PDF" : "Preencha todos os campos"}
    </Button>
  );
}
