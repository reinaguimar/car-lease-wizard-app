import { type Company } from "@/components/CompanySelector";

export const optimizePDFContent = (contractContainer: HTMLElement): void => {
  // Apply compact layout optimizations
  const contractSections = contractContainer.querySelectorAll('.contract-section');
  
  // Create two-column layout for specific shorter sections
  if (contractSections.length >= 6) {
    // Only group sections that are NOT vehicle info or condition sections
    // Look for shorter sections that can be grouped together
    const qualificationsSection = contractContainer.querySelector('.contract-section:nth-of-type(5)'); // Changed from 4 to 5
    const obligationsSection = contractContainer.querySelector('.contract-section:nth-of-type(7)'); // Using obligations instead of condition
    
    if (qualificationsSection && obligationsSection) {
      const twoColumnWrapper = document.createElement('div');
      twoColumnWrapper.className = 'two-columns contract-section';
      
      const column1 = document.createElement('div');
      column1.className = 'column';
      column1.appendChild(qualificationsSection.cloneNode(true));
      
      const column2 = document.createElement('div');
      column2.className = 'column';
      column2.appendChild(obligationsSection.cloneNode(true));
      
      twoColumnWrapper.appendChild(column1);
      twoColumnWrapper.appendChild(column2);
      
      qualificationsSection.parentNode?.replaceChild(twoColumnWrapper, qualificationsSection);
      obligationsSection.parentNode?.removeChild(obligationsSection);
    }
  }
};

// Fix absolute URLs for images
export const fixImageUrls = (container: HTMLElement): void => {
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    if (img.src && img.src.startsWith('/')) {
      img.src = window.location.origin + img.src;
    }
  });
};

// Add header to all pages in the PDF
export const addHeaderToAllPages = (contractContainer: HTMLElement, company: Company): void => {
  // Clone the header from the document
  const originalHeader = contractContainer.querySelector('.contract-header');
  if (!originalHeader) return;
  
  const header = originalHeader.cloneNode(true) as HTMLElement;
  
  // Adjust the header style for PDF pages
  header.style.marginBottom = '0.5rem';
  header.style.width = '100%';
  header.style.pageBreakAfter = 'avoid';
  
  // Get company logo and header text for repeated headers
  const headerContent = header.querySelector('.header-content') as HTMLElement;
  if (headerContent) {
    headerContent.style.padding = '0.3rem';
    
    const logoElement = headerContent.querySelector('.company-logo') as HTMLElement;
    if (logoElement) {
      logoElement.style.height = '30px';
      
      const logoImg = logoElement.querySelector('img') as HTMLImageElement;
      if (logoImg) {
        logoImg.style.height = '25px';
      }
    }
    
    const headerText = headerContent.querySelector('.header-text') as HTMLElement;
    if (headerText) {
      headerText.style.fontSize = '10pt';
    }
  }
  
  // Add header to all contract sections that should start on a new page
  const sections = contractContainer.querySelectorAll('.contract-section') as NodeListOf<HTMLElement>;
  
  // Add after section 3 and 5 as they have page breaks
  if (sections.length >= 9) {
    const section4 = sections[3] as HTMLElement; // 4th section
    const section6 = sections[5] as HTMLElement; // 6th section
    
    if (section4 && section4.parentNode) {
      const header4 = header.cloneNode(true) as HTMLElement;
      section4.parentNode.insertBefore(header4, section4);
    }
    
    if (section6 && section6.parentNode) {
      const header6 = header.cloneNode(true) as HTMLElement;
      section6.parentNode.insertBefore(header6, section6);
    }
  }
  
  // Add class to enable @page header styles
  contractContainer.classList.add('with-headers');
};
