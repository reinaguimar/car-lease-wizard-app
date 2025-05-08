
export const getMoovePDFStyles = (): string => {
  return `
    /* Moove Theme Styles */
    .moove-theme .contract-container {
      font-family: 'Arial', sans-serif;
      color: #222222;
      border-top: 0;
      text-align: left;
    }
    
    .moove-theme .contract-header {
      background-color: #4B80C3;
      color: white;
      border-radius: 0;
      margin-bottom: 1.5rem;
      box-shadow: none;
      width: 100%;
      padding: 15px 0;
      text-align: center;
    }
    
    .moove-theme .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    
    .moove-theme .company-logo {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: auto;
      width: 100px;
      text-align: left;
    }
    
    .moove-theme .company-logo img {
      height: 24px;
      max-width: 100%;
    }
    
    .moove-theme .header-text {
      padding: 0;
      flex: 1;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .moove-theme .contract-section {
      border-left: 3px solid #4B80C3;
      padding: 0.5rem 0.75rem;
      margin-bottom: 1rem;
      background-color: #fff;
      text-align: left;
    }
    
    .moove-theme .contract-clause {
      color: #333333;
      margin-bottom: 0.5rem;
      text-align: left;
    }
    
    .moove-theme .translation {
      color: #8b8b8b;
      font-style: italic;
    }
    
    .moove-theme .font-semibold {
      color: #4B80C3;
      font-weight: bold;
    }
    
    .moove-theme .contract-signature-line {
      border-top: 1px solid #4B80C3;
    }

    .moove-theme .section-title {
      font-weight: bold;
      color: #4B80C3;
      margin-bottom: 0.5rem;
      text-align: left;
    }
  `;
};
