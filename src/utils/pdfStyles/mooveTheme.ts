
export const getMoovePDFStyles = (): string => {
  return `
    /* Moove Theme Styles */
    .moove-theme .contract-container {
      font-family: 'Montserrat', 'Arial', sans-serif;
      color: #222222;
      border-top: 4px solid #4B80C3;
    }
    
    .moove-theme .contract-header {
      background-color: #4B80C3;
      color: white;
      border-radius: 4px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 5px rgba(75, 128, 195, 0.2);
    }
    
    .moove-theme .header-content {
      display: flex;
      align-items: center;
    }
    
    .moove-theme .company-logo {
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
    }
    
    .moove-theme .company-logo img {
      height: 30px;
    }
    
    .moove-theme .header-text {
      padding: 0 1rem;
    }
    
    .moove-theme .contract-section {
      border-left: 3px solid #4B80C3;
      padding: 0.5rem 0.75rem;
      margin-bottom: 0.75rem;
      background-color: #f9fdff;
    }
    
    .moove-theme .contract-clause {
      color: #333333;
    }
    
    .moove-theme .translation {
      color: #555555;
    }
    
    .moove-theme .font-semibold {
      color: #4B80C3;
    }
    
    .moove-theme .contract-signature-line {
      border-top: 1px solid #4B80C3;
    }
  `;
};
