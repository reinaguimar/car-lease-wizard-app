
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
      
      // Ensure proper page breaks between important sections
      const sections = contractContainer.querySelectorAll('.contract-section') as NodeListOf<HTMLElement>;
      
      // Apply page breaks after specific sections
      if (sections.length >= 9) {
        // Force page break after vehicle condition (section 3)
        const vehicleConditionSection = sections[2] as HTMLElement;
        if (vehicleConditionSection) {
          vehicleConditionSection.style.pageBreakAfter = 'always';
        }
        
        // Force page break after rental period (section 5)
        const rentalPeriodSection = sections[4] as HTMLElement;
        if (rentalPeriodSection) {
          rentalPeriodSection.style.pageBreakAfter = 'always';
        }
        
        // Make sure sections don't split across pages (except for longer ones)
        sections.forEach((section, index) => {
          // Don't apply page-break-inside: avoid to longer sections that may need to span pages
          if (index !== 2 && index !== 6 && index !== 7) { // Skip vehicle info, obligations and insurance
            section.style.pageBreakInside = 'avoid';
          }
        });
      }
      
      // Add headers to all pages
      addHeaderToAllPages(contractContainer, company);
      
      // Apply layout optimizations for PDF
      optimizePDFContent(contractContainer);
    }
  }
};
