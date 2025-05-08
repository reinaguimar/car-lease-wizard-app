
import React from "react";
import { FormData } from "../RentalForm";
import { type Company } from "../CompanySelector";
import { getPDFStyles } from "@/utils/pdfStyles";
import { optimizePDFContent, fixImageUrls, addHeaderToAllPages } from "@/utils/pdfContentOptimizer";
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
          <div id="contract-container" class="compact-layout extra-compact"></div>
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

export const populatePDFContent = (pdfWindow: Window, company: Company): void => {
  // Mount the contract content in the new window
  const contractContainer = pdfWindow.document.getElementById('contract-container');
  if (contractContainer && document.querySelector('.contract-container')) {
    // Clone the contract element from the main window
    const contractElement = document.querySelector('.contract-container');
    if (contractElement) {
      contractContainer.innerHTML = contractElement.outerHTML;
      
      // Fix absolute URLs for images
      fixImageUrls(contractContainer);
      
      // Make all sections more compact
      const sections = contractContainer.querySelectorAll('.contract-section') as NodeListOf<HTMLElement>;
      
      sections.forEach((section) => {
        section.style.marginBottom = '0.3rem';
        section.style.padding = '0.3rem 0.4rem';
        
        // Make all clauses more compact
        const clauses = section.querySelectorAll('.contract-clause');
        clauses.forEach(clause => {
          (clause as HTMLElement).style.marginBottom = '0.1rem';
          (clause as HTMLElement).style.padding = '0.1rem 0';
        });
      });
      
      // Compact signature section
      const signatureSection = contractContainer.querySelector('.contract-signature') as HTMLElement;
      if (signatureSection) {
        signatureSection.style.marginTop = '0.5rem';
      }
      
      // DO NOT add any manual page breaks - let the content flow naturally
      // NO PAGE BREAKS to fit into 2 pages maximum
      
      // Add single header at the top only
      addHeaderToAllPages(contractContainer, company);
      
      // Apply layout optimizations to get two columns for short sections
      optimizePDFContent(contractContainer);
    }
  }
};
