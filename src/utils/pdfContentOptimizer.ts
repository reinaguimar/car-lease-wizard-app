
export const optimizePDFContent = (contractContainer: HTMLElement): void => {
  // Apply compact layout optimizations
  const contractSections = contractContainer.querySelectorAll('.contract-section');
  
  // Create two-column layout for specific shorter sections
  if (contractSections.length >= 6) {
    // Group some sections into two columns for space efficiency
    const qualificationsSection = contractContainer.querySelector('.contract-section:nth-of-type(4)');
    const conditionSection = contractContainer.querySelector('.contract-section:nth-of-type(3)');
    
    if (qualificationsSection && conditionSection) {
      const twoColumnWrapper = document.createElement('div');
      twoColumnWrapper.className = 'two-columns contract-section';
      
      const column1 = document.createElement('div');
      column1.className = 'column';
      column1.appendChild(conditionSection.cloneNode(true));
      
      const column2 = document.createElement('div');
      column2.className = 'column';
      column2.appendChild(qualificationsSection.cloneNode(true));
      
      twoColumnWrapper.appendChild(column1);
      twoColumnWrapper.appendChild(column2);
      
      conditionSection.parentNode?.replaceChild(twoColumnWrapper, conditionSection);
      qualificationsSection.parentNode?.removeChild(qualificationsSection);
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

