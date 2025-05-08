
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
    
    // Get the current theme class
    const themeClass = company === "yoou" ? "yoou-theme" : "moove-theme";
    
    // Create inline styles to ensure proper formatting
    const inlineStyles = `
      <style>
        body {
          margin: 0;
          padding: 20px;
          background-color: white;
          font-family: 'Arial', sans-serif;
        }
        .print-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* Base contract styles */
        .contract-container {
          font-family: 'Arial', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 2rem;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }
        
        .contract-header {
          font-weight: bold;
          margin-bottom: 2rem;
          border-radius: 8px;
          width: 100%;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          padding: 1rem;
        }
        
        .company-logo {
          margin-right: 1.5rem;
        }
        
        .company-logo img {
          height: 60px;
          max-width: 200px;
          object-fit: contain;
        }
        
        .header-text {
          font-size: 1.25rem;
          font-weight: bold;
          flex: 1;
          text-align: center;
        }
        
        .contract-section {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 6px;
        }
        
        .contract-clause {
          margin-bottom: 0.8rem;
          padding: 0.5rem 0;
        }
        
        .contract-signature {
          margin-top: 3rem;
          display: flex;
          justify-content: space-between;
        }
        
        .contract-signature-line {
          width: 220px;
          margin-top: 3rem;
          text-align: center;
          padding-top: 0.5rem;
        }
        
        .translation {
          font-style: italic;
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        /* Moove Theme Styles */
        .moove-theme .contract-container {
          font-family: 'Montserrat', 'Arial', sans-serif;
          color: #222222;
          border-top: 6px solid #4B80C3;
        }
        
        .moove-theme .contract-header {
          background-color: #4B80C3;
          color: white;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 10px rgba(75, 128, 195, 0.2);
        }
        
        .moove-theme .header-content {
          display: flex;
          align-items: center;
        }
        
        .moove-theme .company-logo {
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
        }
        
        .moove-theme .company-logo img {
          height: 60px;
        }
        
        .moove-theme .header-text {
          padding: 0 1.5rem;
        }
        
        .moove-theme .contract-section {
          border-left: 4px solid #4B80C3;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          background-color: #f9fdff;
        }
        
        .moove-theme .contract-clause {
          color: #333333;
        }
        
        .moove-theme .translation {
          color: #555555;
        }
        
        .moove-theme .font-semibold {
          color: #4B80C3;
        }
        
        .moove-theme .contract-signature-line {
          border-top: 2px solid #4B80C3;
        }
        
        .moove-theme .contract-section:hover {
          box-shadow: 0 2px 10px rgba(75, 128, 195, 0.1);
          transition: all 0.3s ease;
        }
        
        /* Yoou Theme Styles */
        .yoou-theme .contract-container {
          font-family: 'Poppins', 'Helvetica Neue', sans-serif;
          color: #333;
          border-top: 6px solid #EF65CF;
        }
        
        .yoou-theme .contract-header {
          background-color: #EF65CF;
          color: white;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 10px rgba(239, 101, 207, 0.2);
        }
        
        .yoou-theme .header-content {
          display: flex;
          align-items: center;
        }
        
        .yoou-theme .company-logo {
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
        }
        
        .yoou-theme .company-logo img {
          height: 60px;
          max-width: 200px;
        }
        
        .yoou-theme .header-text {
          padding: 0 1.5rem;
        }
        
        .yoou-theme .contract-section {
          border-left: 4px solid #EF65CF;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          background-color: #fef6fc;
          transition: all 0.3s ease;
        }
        
        .yoou-theme .contract-clause {
          color: #333333;
        }
        
        .yoou-theme .translation {
          color: #A8499E;
        }
        
        .yoou-theme .font-semibold {
          color: #D33AAF;
        }
        
        .yoou-theme .contract-signature-line {
          border-top: 2px solid #EF65CF;
        }
        
        .yoou-theme .contract-section:hover {
          box-shadow: 0 2px 10px rgba(239, 101, 207, 0.1);
          transition: all 0.3s ease;
        }
        
        /* Print styles */
        @media print {
          body {
            font-size: 12pt;
            line-height: 1.3;
            background: #fff;
            color: #000;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          
          .contract-container {
            width: 100%;
            max-width: 100%;
            padding: 10px 20px;
            margin: 0;
            box-shadow: none;
            border-radius: 0;
          }
          
          .contract-section {
            page-break-inside: avoid;
            width: 100%;
          }
          
          .contract-header {
            width: 100%;
          }
        }
        
        /* Standalone print styles */
        .standalone-print {
          background-color: white;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
      </style>
    `;
    
    // Write the HTML for the contract preview with all styles inlined
    pdfWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Contrato de Locação</title>
          ${inlineStyles}
        </head>
        <body>
          <div class="print-container ${themeClass}">
            <div id="contract-container"></div>
          </div>
          <script>
            // Auto print when content is loaded
            window.onload = function() {
              setTimeout(() => {
                window.print();
                // Don't close the window after printing so user can save as PDF
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    
    // Close the document for writing to execute scripts
    pdfWindow.document.close();
    
    // Mount the contract content in the new window
    const contractContainer = pdfWindow.document.getElementById('contract-container');
    if (contractContainer && document.querySelector('.contract-container')) {
      // Clone the contract element from the main window
      const contractElement = document.querySelector('.contract-container');
      contractContainer.innerHTML = contractElement.outerHTML;
      
      // Fix absolute URLs for images
      const images = contractContainer.querySelectorAll('img');
      images.forEach(img => {
        if (img.src && img.src.startsWith('/')) {
          img.src = window.location.origin + img.src;
        }
      });
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
