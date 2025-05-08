
import { type Company } from "@/components/CompanySelector";

// Fix absolute URLs for images
export const fixImageUrls = (container: HTMLElement): void => {
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    if (img.src && img.src.startsWith('/')) {
      img.src = window.location.origin + img.src;
    }
  });
};

// Prepare the content specifically for PDF output
export const prepareContentForPDF = (container: HTMLElement, company: Company): void => {
  // Apply CSS class for PDF-optimized styling
  container.classList.add('pdf-optimized');
  
  // Add page break rules to ensure proper flow
  addPageBreakRules(container);
  
  // Add header for repeating on each page using CSS @page rules
  addHeaderForPages(container, company);
  
  // Ensure proper spacing for page layout
  adjustSpacingForPDF(container);
};

// Add page break rules to prevent awkward breaks
const addPageBreakRules = (container: HTMLElement): void => {
  // Apply page-break-inside: auto to sections
  const sections = container.querySelectorAll('.contract-section');
  sections.forEach((section) => {
    (section as HTMLElement).style.pageBreakInside = 'auto';
    (section as HTMLElement).style.breakInside = 'auto';
  });
  
  // Make sure signatures are not split between pages
  const signatureSection = container.querySelector('.contract-signature');
  if (signatureSection) {
    (signatureSection as HTMLElement).style.pageBreakInside = 'avoid';
    (signatureSection as HTMLElement).style.breakInside = 'avoid';
    (signatureSection as HTMLElement).style.pageBreakBefore = 'auto';
    (signatureSection as HTMLElement).style.breakBefore = 'auto';
  }
};

// Add header to be shown on each page using CSS @page
const addHeaderForPages = (container: HTMLElement, company: Company): void => {
  // Find any existing contract header in the content
  const existingHeader = container.querySelector('.contract-header');
  
  // If there's an existing header in the content, modify it to be used as the repeated header
  if (existingHeader) {
    // We don't want to display the header twice on the first page, so hide the one in the content
    // But preserve it to be used as the running header for pages
    existingHeader.classList.add('pdf-header');
    
    // Add the CSS to make this header appear at the top of each page
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @media print {
        /* Hide the original header in the content flow to avoid duplication */
        .pdf-header {
          display: none !important;
        }
        
        /* But use it as the repeated header on each page */
        @page {
          @top-center {
            content: element(header);
            margin-bottom: 20px;
          }
          margin: 2cm 1.5cm;
        }
        
        /* Create a running element for the header */
        .pdf-header {
          position: running(header);
        }
      }
    `;
    
    container.insertBefore(styleElement, container.firstChild);
  }
};

// Adjust spacing for better PDF layout
const adjustSpacingForPDF = (container: HTMLElement): void => {
  // Adjust section spacing
  const sections = container.querySelectorAll('.contract-section') as NodeListOf<HTMLElement>;
  sections.forEach((section) => {
    section.style.marginBottom = '10px';
    section.style.padding = '8px 12px';
  });
  
  // Adjust clause spacing
  const clauses = container.querySelectorAll('.contract-clause') as NodeListOf<HTMLElement>;
  clauses.forEach((clause) => {
    clause.style.marginBottom = '6px';
    clause.style.padding = '2px 0';
  });
  
  // Adjust signature spacing
  const signatureSection = container.querySelector('.contract-signature') as HTMLElement;
  if (signatureSection) {
    signatureSection.style.marginTop = '20px';
    signatureSection.style.pageBreakInside = 'avoid';
    signatureSection.style.breakInside = 'avoid';
  }
};
