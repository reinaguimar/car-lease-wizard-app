
import { type Company } from "@/components/CompanySelector";
import { ContractHeader } from "@/components/contract/ContractHeader";
import React from "react";
import ReactDOM from "react-dom";

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
  // Apply CSS class for PDF-specific styling
  container.classList.add('pdf-optimized');
  
  // Add page break rules to ensure proper flow
  addPageBreakRules(container);
  
  // Add headers to all pages
  addHeadersToPages(container, company);
  
  // Ensure proper spacing for page layout
  adjustSpacingForPDF(container);
};

// Add page break rules to prevent awkward breaks
const addPageBreakRules = (container: HTMLElement): void => {
  // Apply page-break-inside: avoid to sections
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

// Add header to each page using CSS
const addHeadersToPages = (container: HTMLElement, company: Company): void => {
  // Create a header template
  const headerTemplate = document.createElement('template');
  
  // Create a container for the React component
  const headerRoot = document.createElement('div');
  
  // Render the ContractHeader component to the container
  ReactDOM.render(
    React.createElement(ContractHeader, { company }),
    headerRoot
  );
  
  // Set the header content
  headerTemplate.innerHTML = headerRoot.innerHTML;
  
  // Add to the container as a header template
  const headerContent = headerTemplate.content.firstChild;
  
  if (headerContent) {
    // Modify the header for PDF display
    const headerElement = headerContent as HTMLElement;
    headerElement.classList.add('pdf-header');
    
    // Add the header to the container
    container.insertBefore(headerElement, container.firstChild);
    
    // Add CSS to repeat the header on each page
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .pdf-header {
          position: running(header);
          display: block !important;
        }
        
        @page {
          @top-center {
            content: element(header);
          }
        }
      }
    `;
    
    // Add the style to the container
    container.insertBefore(style, container.firstChild);
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
