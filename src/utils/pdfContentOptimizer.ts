
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
