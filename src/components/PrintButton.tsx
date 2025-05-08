
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { ContractPreview } from "./ContractPreview";
import { type Company } from "./CompanySelector";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const handlePrint = () => {
    toast.success("Preparando o contrato para impressão");
    
    // Create a new window
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast.error("Não foi possível abrir a janela de impressão. Verifique se os pop-ups estão bloqueados.");
      return;
    }
    
    // Write the HTML for the contract preview only
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Contrato de Locação</title>
          <link rel="stylesheet" href="${window.location.origin}/src/index.css">
          <style>
            body {
              padding: 20px;
              background-color: white;
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
          <div class="print-container" id="contract-container"></div>
          <script>
            // Auto print when content is loaded
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  window.close();
                }, 500);
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    
    // Close the document for writing to execute scripts
    printWindow.document.close();
    
    // Mount the React component in the new window
    const contractContainer = printWindow.document.getElementById('contract-container');
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
      onClick={handlePrint}
      className="no-print mb-6"
      variant="default"
    >
      <Printer className="mr-2 h-4 w-4" />
      Imprimir / Salvar em PDF
    </Button>
  );
}
