
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { createPDFWindow, populatePDFContent } from "./pdf/PDFWindowCreator";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const handleSaveAsPDF = () => {
    toast.success("Preparando o documento para salvar em PDF");
    
    const pdfWindow = createPDFWindow({ data, company });
    
    if (pdfWindow) {
      populatePDFContent(pdfWindow, company);
      
      // This is important to remind the user
      setTimeout(() => {
        toast.info("Utilize a opção 'Salvar como PDF' na janela de impressão para gerar o documento PDF");
      }, 1500);
    }
  };

  return (
    <Button 
      onClick={handleSaveAsPDF}
      className="no-print mb-6"
      variant="default"
    >
      <Save className="mr-2 h-4 w-4" />
      Salvar em PDF
    </Button>
  );
}
