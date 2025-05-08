
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { createPDFWindow, populatePDFContent } from "./pdf/PDFWindowCreator";
import { useState } from "react";
import { generateContractNumber } from "@/utils/contractUtils";

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
      
      toast.info("Preparando PDF...");
      
      // Gerar número de contrato para exibição
      const contractNumber = generateContractNumber();
      
      // Criar a janela do PDF
      const pdfWindow = createPDFWindow({ data, company });
      
      if (pdfWindow) {
        populatePDFContent(pdfWindow, company);
        
        // Informação ao usuário
        toast.success("Contrato gerado com sucesso!", {
          description: `Nº ${contractNumber}`,
          duration: 5000
        });
        
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
