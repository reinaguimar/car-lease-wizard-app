
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { useState } from "react";
import { generateContractNumber } from "@/utils/contractUtils";
import { createRental, formDataToRental } from "@/services/supabase";
import html2pdf from 'html2pdf.js';
import { useNavigate } from "react-router-dom";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  // Function to check if all required data is filled
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
  
  const isComplete = isFormDataComplete(data);

  const handleSaveAsPDF = async () => {
    try {
      setIsSaving(true);
      
      // Check if all required fields are filled
      if (!isComplete) {
        toast.error("Por favor, complete todos os campos do formulário antes de salvar");
        setIsSaving(false);
        return;
      }
      
      toast.info("Preparando contrato...");
      
      // Generate contract number
      const contractNumber = generateContractNumber();
      
      console.log("Generated contract number:", contractNumber);
      console.log("Form data:", data);
      console.log("Selected company:", company);
      
      try {
        // Prepare rental data from form data
        const rentalData = formDataToRental(data as FormData, company, contractNumber);
        console.log("Prepared rental data:", rentalData);
        
        // Save rental to database
        const newRental = await createRental(rentalData);
        
        if (!newRental) {
          throw new Error("Falha ao criar contrato");
        }
        
        console.log("Contrato criado:", newRental);
        
        toast.success("Contrato salvo com sucesso!", {
          description: `Nº ${contractNumber}`,
          duration: 5000
        });
        
        // Generate PDF
        await generatePDF(contractNumber);
        
      } catch (error) {
        console.error("Erro ao salvar contrato:", error);
        toast.error("Erro ao salvar contrato no banco de dados", {
          description: error instanceof Error ? error.message : "Verifique os logs para mais detalhes",
        });
        setIsSaving(false);
        return;
      }
    } catch (error) {
      console.error("Erro ao processar contrato:", error);
      toast.error("Erro ao processar contrato", {
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
      setIsSaving(false);
    }
  };
  
  // Separate function for generating PDF
  const generatePDF = async (contractNumber: string) => {
    try {
      const contractElement = document.querySelector('.contract-container');
      
      if (!contractElement) {
        toast.error("Elemento de contrato não encontrado");
        setIsSaving(false);
        return;
      }
      
      // Clone the element to avoid affecting the original contract in the UI
      const clonedContract = contractElement.cloneNode(true) as HTMLElement;
      
      // Apply theme class based on selected company
      const themeClass = company === "yoou" ? "yoou-theme" : "moove-theme";
      clonedContract.classList.add(themeClass);
      
      // PDF configuration
      const pdfOptions = {
        margin: [10, 10, 20, 10], // top, right, bottom, left in mm
        filename: `Contrato-${contractNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Create temporary container for PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.appendChild(clonedContract);
      document.body.appendChild(tempContainer);
      
      // Generate PDF
      html2pdf()
        .from(clonedContract)
        .set(pdfOptions)
        .save()
        .then(() => {
          // Remove temporary container
          document.body.removeChild(tempContainer);
          toast.success("PDF gerado com sucesso!", {
            description: "O download do arquivo começará automaticamente",
            duration: 3000
          });

          // Ask if user wants to go to the contracts page
          setTimeout(() => {
            setIsSaving(false);
            if (confirm("Deseja visualizar a lista de contratos?")) {
              navigate("/contracts");
            }
          }, 1500);
        })
        .catch((error) => {
          console.error("Erro ao gerar PDF:", error);
          document.body.removeChild(tempContainer);
          toast.error("Erro ao gerar o PDF", {
            description: "Tente novamente ou use a função de impressão do navegador"
          });
          setIsSaving(false);
        });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar o PDF");
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
