import { type Company } from "@/components/CompanySelector";

export const optimizePDFContent = (contractContainer: HTMLElement): void => {
  // Apply compact layout optimizations
  const contractSections = contractContainer.querySelectorAll('.contract-section');
  
  // Create multi-column layout for shorter sections
  if (contractSections.length >= 8) {
    // Create two sets of columns for better space usage
    
    // First set: Qualifications and Rental Period (sections 4 and 5)
    const qualificationsSection = contractContainer.querySelector('.contract-section:nth-of-type(4)');
    const rentalPeriodSection = contractContainer.querySelector('.contract-section:nth-of-type(5)');
    
    if (qualificationsSection && rentalPeriodSection) {
      const twoColumnWrapper = document.createElement('div');
      twoColumnWrapper.className = 'two-columns contract-section';
      
      const column1 = document.createElement('div');
      column1.className = 'column';
      column1.appendChild(qualificationsSection.cloneNode(true));
      
      const column2 = document.createElement('div');
      column2.className = 'column';
      column2.appendChild(rentalPeriodSection.cloneNode(true));
      
      twoColumnWrapper.appendChild(column1);
      twoColumnWrapper.appendChild(column2);
      
      qualificationsSection.parentNode?.replaceChild(twoColumnWrapper, qualificationsSection);
      rentalPeriodSection.parentNode?.removeChild(rentalPeriodSection);
    }
    
    // Second set: Payment and Obligations (sections 6 and 7)
    const paymentSection = contractContainer.querySelector('.contract-section:nth-of-type(6)');
    const obligationsSection = contractContainer.querySelector('.contract-section:nth-of-type(7)');
    
    if (paymentSection && obligationsSection) {
      const twoColumnWrapper2 = document.createElement('div');
      twoColumnWrapper2.className = 'two-columns contract-section';
      
      const column1 = document.createElement('div');
      column1.className = 'column';
      column1.appendChild(paymentSection.cloneNode(true));
      
      const column2 = document.createElement('div');
      column2.className = 'column';
      column2.appendChild(obligationsSection.cloneNode(true));
      
      twoColumnWrapper2.appendChild(column1);
      twoColumnWrapper2.appendChild(column2);
      
      paymentSection.parentNode?.replaceChild(twoColumnWrapper2, paymentSection);
      obligationsSection.parentNode?.removeChild(obligationsSection);
    }
    
    // Third set: Deposit and Termination (sections 8 and 9)
    const insuranceSection = contractContainer.querySelector('.contract-section:nth-of-type(8)');
    const depositSection = contractContainer.querySelector('.contract-section:nth-of-type(9)');
    
    if (insuranceSection && depositSection) {
      const twoColumnWrapper3 = document.createElement('div');
      twoColumnWrapper3.className = 'two-columns contract-section';
      
      const column1 = document.createElement('div');
      column1.className = 'column';
      column1.appendChild(insuranceSection.cloneNode(true));
      
      const column2 = document.createElement('div');
      column2.className = 'column';
      column2.appendChild(depositSection.cloneNode(true));
      
      twoColumnWrapper3.appendChild(column1);
      twoColumnWrapper3.appendChild(column2);
      
      insuranceSection.parentNode?.replaceChild(twoColumnWrapper3, insuranceSection);
      depositSection.parentNode?.removeChild(depositSection);
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

// Add single header to the first page only
export const addHeaderToAllPages = (contractContainer: HTMLElement, company: Company): void => {
  // Clone the header from the document
  const originalHeader = contractContainer.querySelector('.contract-header');
  if (!originalHeader) return;
  
  // We'll only keep the original header and not add any more headers
  // to prevent unnecessary page breaks and keep the document compact
  
  const header = originalHeader as HTMLElement;
  
  // Adjust the header style to be more compact
  header.style.marginBottom = '0.3rem';
  header.style.width = '100%';
  
  const headerContent = header.querySelector('.header-content') as HTMLElement;
  if (headerContent) {
    headerContent.style.padding = '0.2rem';
    
    const logoElement = headerContent.querySelector('.company-logo') as HTMLElement;
    if (logoElement) {
      logoElement.style.height = '25px';
      
      const logoImg = logoElement.querySelector('img') as HTMLImageElement;
      if (logoImg) {
        logoImg.style.height = '20px';
      }
    }
    
    const headerText = headerContent.querySelector('.header-text') as HTMLElement;
    if (headerText) {
      headerText.style.fontSize = '9pt';
    }
  }
  
  // Remove the 'with-headers' class to prevent page header styles
  contractContainer.classList.remove('with-headers');
};
