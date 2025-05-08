
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const handleSaveAsPDF = () => {
    toast.success("Preparando o documento para salvar em PDF");
    
    // Create a new window
    const pdfWindow = window.open('', '_blank');
    
    if (!pdfWindow) {
      toast.error("Não foi possível abrir a janela para salvar em PDF. Verifique se os pop-ups estão bloqueados.");
      return;
    }
    
    // Get theme-specific CSS files
    const mooveThemeLink = `<link rel="stylesheet" href="${window.location.origin}/src/styles/moove-theme.css">`;
    const yoouThemeLink = `<link rel="stylesheet" href="${window.location.origin}/src/styles/yoou-theme.css">`;
    const contractCssLink = `<link rel="stylesheet" href="${window.location.origin}/src/styles/contract.css">`;
    
    // Write the HTML for the contract preview only
    pdfWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Contrato de Locação</title>
          <link rel="stylesheet" href="${window.location.origin}/src/index.css">
          ${contractCssLink}
          ${mooveThemeLink}
          ${yoouThemeLink}
          <style>
            body {
              padding: 20px;
              background-color: white;
              font-family: 'Arial', sans-serif;
            }
            .print-container {
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container standalone-print" id="contract-container"></div>
          <script>
            // Auto print when content is loaded
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  // Don't close the window after printing so user can save as PDF
                }, 500);
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    
    // Close the document for writing to execute scripts
    pdfWindow.document.close();
    
    // Mount the React component in the new window
    const contractContainer = pdfWindow.document.getElementById('contract-container');
    if (contractContainer) {
      // Clone the contract element from the main window
      const contractElement = document.querySelector('.contract-container');
      if (contractElement) {
        contractContainer.innerHTML = contractElement.outerHTML;
      }
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
