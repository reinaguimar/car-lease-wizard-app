
import React from "react";
import { FormData } from "../RentalForm";
import { type Company } from "../CompanySelector";
import { getPDFStyles } from "@/utils/pdfStyles";
import { optimizePDFContent, fixImageUrls } from "@/utils/pdfContentOptimizer";
import { toast } from "sonner";

interface PDFWindowCreatorProps {
  data: Partial<FormData>;
  company: Company;
}

export const createPDFWindow = ({ company }: PDFWindowCreatorProps): Window | null => {
  // Create a new window
  const pdfWindow = window.open('', '_blank');
  
  if (!pdfWindow) {
    toast.error("Não foi possível abrir a janela para salvar em PDF. Verifique se os pop-ups estão bloqueados.");
    return null;
  }
  
  // Get the current theme class
  const themeClass = company === "yoou" ? "yoou-theme" : "moove-theme";
  
  // Get optimized inline styles for PDF output
  const inlineStyles = getPDFStyles(company);
  
  // Write the HTML for the contract preview with all styles inlined
  pdfWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Contrato de Locação</title>
        <style>
          ${inlineStyles}
        </style>
      </head>
      <body>
        <div class="print-container ${themeClass}">
          <div id="contract-container" class="compact-layout"></div>
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
  
  return pdfWindow;
};

export const populatePDFContent = (pdfWindow: Window): void => {
  // Mount the contract content in the new window
  const contractContainer = pdfWindow.document.getElementById('contract-container');
  if (contractContainer && document.querySelector('.contract-container')) {
    // Clone the contract element from the main window
    const contractElement = document.querySelector('.contract-container');
    if (contractElement) {
      contractContainer.innerHTML = contractElement.outerHTML;
      
      // Fix absolute URLs for images
      fixImageUrls(contractContainer);
      
      // Apply layout optimizations for PDF
      optimizePDFContent(contractContainer);
    }
  }
};

