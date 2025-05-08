
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { createPDFWindow, populatePDFContent } from "./pdf/PDFWindowCreator";
import { useState } from "react";
import { generateContractNumber } from "@/utils/contractUtils";
import { createContract } from "@/services/supabase";

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
      
      toast.info("Preparando contrato...");
      
      // Gerar número de contrato
      const contractNumber = generateContractNumber();
      
      // Salvar contrato no banco de dados
      try {
        // Criando objetos temporários para o cliente e veículo
        const tempClientId = `temp-client-${Date.now()}`;
        const tempVehicleId = `temp-vehicle-${Date.now()}`;
        const companyId = `company-${company}`;
        
        // Preparar dados do contrato para salvar
        await createContract({
          contract_number: contractNumber,
          client_id: tempClientId,
          vehicle_id: tempVehicleId, 
          company_id: companyId,
          start_date: data.startDate ? data.startDate.toISOString().split('T')[0] : '',
          start_time: data.startTime || '',
          end_date: data.endDate ? data.endDate.toISOString().split('T')[0] : '',
          end_time: data.endTime || '',
          delivery_location: data.deliveryLocation || '',
          return_location: data.returnLocation || '',
          rental_rate: parseFloat(data.rentalRate || '0'),
          deposit: parseFloat(data.deposit || '0'),
          sign_date: data.signDate ? data.signDate.toISOString().split('T')[0] : '',
          pdf_url: '' // Será atualizado depois que o PDF for gerado
        });
        
        toast.success("Contrato salvo com sucesso!", {
          description: `Nº ${contractNumber}`,
          duration: 5000
        });
      } catch (error) {
        console.error("Erro ao salvar contrato:", error);
        toast.error("Erro ao salvar contrato no banco de dados");
        // Continue mesmo se o salvamento falhar, para permitir que o PDF seja gerado
      }
      
      // Criar a janela do PDF
      const pdfWindow = createPDFWindow({ data, company });
      
      if (pdfWindow) {
        populatePDFContent(pdfWindow, company);
        
        // Instruções para salvar o PDF
        setTimeout(() => {
          toast.info("Utilize a opção 'Salvar como PDF' na janela de impressão para gerar o documento PDF");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF", {
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button 
      onClick={handleSaveAsPDF}
      className="no-print mb-6 w-full sm:w-auto text-xs sm:text-sm"
      variant="default"
      disabled={isSaving || !isComplete}
    >
      <Save className="mr-2 h-4 w-4" />
      {isSaving ? "Processando..." : isComplete ? "Salvar em PDF" : "Preencha todos os campos"}
    </Button>
  );
}
