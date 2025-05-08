
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
      populatePDFContent(pdfWindow);
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
