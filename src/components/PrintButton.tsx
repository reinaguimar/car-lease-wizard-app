
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { useState } from "react";
import { generateContractNumber } from "@/utils/contractUtils";
import { createContract } from "@/services/supabase/contractService";
import html2pdf from 'html2pdf.js';

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
      
      // Preparar dados do contrato para salvar
      const tempClientId = `temp-client-${Date.now()}`;
      const tempVehicleId = `temp-vehicle-${Date.now()}`;
      const companyId = `company-${company}`;
      
      try {
        // Salvar contrato no banco de dados
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
          pdf_url: '', // Será atualizada depois que o PDF for gerado
          status: 'active'
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
      
      // Gerar PDF usando html2pdf.js
      const contractElement = document.querySelector('.contract-container');
      
      if (!contractElement) {
        toast.error("Elemento de contrato não encontrado");
        return;
      }
      
      // Clone o elemento para não afetar o contrato original na tela
      const clonedContract = contractElement.cloneNode(true) as HTMLElement;
      
      // Aplicar classe de tema conforme a empresa selecionada
      const themeClass = company === "yoou" ? "yoou-theme" : "moove-theme";
      clonedContract.classList.add(themeClass);
      
      // Configurações do PDF
      const pdfOptions = {
        margin: [10, 10, 20, 10], // topo, direita, inferior, esquerda em mm
        filename: `Contrato-${contractNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Criar um container temporário para o PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.appendChild(clonedContract);
      document.body.appendChild(tempContainer);
      
      // Gerar o PDF
      html2pdf()
        .from(clonedContract)
        .set(pdfOptions)
        .save()
        .then(() => {
          // Remover o container temporário
          document.body.removeChild(tempContainer);
          toast.success("PDF gerado com sucesso!", {
            description: "O download do arquivo começará automaticamente",
            duration: 3000
          });
        })
        .catch((error) => {
          console.error("Erro ao gerar PDF:", error);
          document.body.removeChild(tempContainer);
          toast.error("Erro ao gerar o PDF", {
            description: "Tente novamente ou use a função de impressão do navegador"
          });
        });
        
    } catch (error) {
      console.error("Erro ao processar contrato:", error);
      toast.error("Erro ao processar contrato", {
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
      {isSaving ? "Processando..." : isComplete ? "Salvar Contrato" : "Preencha todos os campos"}
    </Button>
  );
}
