
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
  
  // Handle the header for repeating on each page
  configurePdfHeader(container);
  
  // Add page break rules to ensure proper flow
  addPageBreakRules(container);
  
  // Ensure proper spacing for page layout
  adjustSpacingForPDF(container);
};

// Configure the header to repeat on each page
const configurePdfHeader = (container: HTMLElement): void => {
  // Find the existing contract header
  const existingHeader = container.querySelector('.contract-header');
  
  if (existingHeader) {
    // Create a copy of the header for use as the running header
    const headerCopy = existingHeader.cloneNode(true) as HTMLElement;
    headerCopy.classList.add('pdf-header');
    
    // Add the copied header to the container
    container.insertBefore(headerCopy, container.firstChild);
    
    // Add custom style for the header to be positioned properly on each page
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @media print {
        .pdf-header {
          position: running(header);
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        @page {
          @top-center {
            content: element(header);
            margin-bottom: 20px;
          }
        }
      }
    `;
    
    container.insertBefore(styleElement, container.firstChild);
  }
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

// Adjust spacing for better PDF layout
const adjustSpacingForPDF = (container: HTMLElement): void => {
  // Adjust section spacing
  const sections = container.querySelectorAll('.contract-section') as NodeListOf<HTMLElement>;
  sections.forEach((section) => {
    section.style.marginBottom = '12px';
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
    signatureSection.style.marginTop = '25px';
    signatureSection.style.pageBreakInside = 'avoid';
    signatureSection.style.breakInside = 'avoid';
  }
};
