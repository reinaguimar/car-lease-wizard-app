
export const getYoouPDFStyles = (): string => {
  return `
    /* Yoou Theme Styles */
    .yoou-theme .contract-container {
      font-family: 'Poppins', 'Helvetica Neue', sans-serif;
      color: #333;
      border-top: 4px solid #EF65CF;
    }
    
    .yoou-theme .contract-header {
      background-color: #EF65CF;
      color: white;
      border-radius: 4px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 5px rgba(239, 101, 207, 0.2);
    }
    
    .yoou-theme .header-content {
      display: flex;
      align-items: center;
    }
    
    .yoou-theme .company-logo {
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
    }
    
    .yoou-theme .company-logo img {
      height: 30px;
      max-width: 120px;
    }
    
    .yoou-theme .header-text {
      padding: 0 1rem;
    }
    
    .yoou-theme .contract-section {
      border-left: 3px solid #EF65CF;
      padding: 0.5rem 0.75rem;
      margin-bottom: 0.75rem;
      background-color: #fef6fc;
    }
    
    .yoou-theme .contract-clause {
      color: #333333;
    }
    
    .yoou-theme .translation {
      color: #A8499E;
    }
    
    .yoou-theme .font-semibold {
      color: #D33AAF;
    }
    
    .yoou-theme .contract-signature-line {
      border-top: 1px solid #EF65CF;
    }
  `;
};
