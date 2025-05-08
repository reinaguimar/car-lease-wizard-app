import { type Company } from "@/components/CompanySelector";

export const getPDFStyles = (company: Company): string => {
  return `
    @page {
      size: A4;
      margin: 0.3cm;
    }
    
    body {
      margin: 0;
      padding: 5px;
      background-color: white;
      font-family: 'Arial', sans-serif;
      font-size: 8pt;
      line-height: 1.1;
    }
    
    .print-container {
      width: 100%;
      margin: 0 auto;
    }
    
    /* Base contract styles */
    .contract-container {
      width: 100%;
      margin: 0;
      padding: 0.5rem;
      background-color: white;
      box-sizing: border-box;
    }
    
    .contract-header {
      font-weight: bold;
      margin-bottom: 0.5rem;
      border-radius: 2px;
      width: 100%;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      padding: 0.2rem;
    }
    
    .company-logo {
      margin-right: 0.5rem;
    }
    
    .company-logo img {
      height: 25px;
      max-width: 90px;
      object-fit: contain;
    }
    
    .header-text {
      font-size: 9pt;
      font-weight: bold;
      flex: 1;
      text-align: center;
    }
    
    .contract-section {
      margin-bottom: 0.4rem;
      padding: 0.3rem;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
    }
    
    .contract-clause {
      margin-bottom: 0.2rem;
      padding: 0.1rem 0;
    }
    
    .contract-signature {
      margin-top: 0.7rem;
      display: flex;
      justify-content: space-between;
    }
    
    .contract-signature-line {
      width: 130px;
      margin-top: 0.5rem;
      text-align: center;
      padding-top: 0.1rem;
    }
    
    .translation {
      font-style: italic;
      font-size: 7pt;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .text-sm {
      font-size: 7pt;
    }
    
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
      height: 50px;
    }
    
    .moove-theme .company-logo img {
      height: 40px;
    }
    
    .moove-theme .header-text {
      padding: 0 1rem;
    }
    
    .moove-theme .contract-section {
      border-left: 3px solid #4B80C3;
      padding: 0.5rem 0.8rem;
      margin-bottom: 0.8rem;
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
      height: 50px;
    }
    
    .yoou-theme .company-logo img {
      height: 40px;
      max-width: 120px;
    }
    
    .yoou-theme .header-text {
      padding: 0 1rem;
    }
    
    .yoou-theme .contract-section {
      border-left: 3px solid #EF65CF;
      padding: 0.5rem 0.8rem;
      margin-bottom: 0.8rem;
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
    
    /* Two-column layout for smaller sections */
    .two-columns {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }
    
    .column {
      flex: 1;
      min-width: 45%;
    }
    
    /* Extra compact layout */
    .extra-compact .contract-section {
      margin-bottom: 0.25rem;
      padding: 0.25rem;
    }
    
    .extra-compact .contract-clause {
      margin-bottom: 0.1rem;
      padding: 0.1rem 0;
    }
    
    .extra-compact .contract-signature {
      margin-top: 0.4rem;
    }
    
    .extra-compact .contract-signature-line {
      margin-top: 0.3rem;
    }
    
    /* Print styles */
    @media print {
      body {
        font-size: 8pt;
        line-height: 1.1;
        background: #fff;
        color: #000;
        margin: 0;
        padding: 0;
        width: 100%;
      }
      
      .contract-container {
        width: 100%;
        max-width: 100%;
        padding: 3px 5px;
        margin: 0;
        box-shadow: none;
        border-radius: 0;
      }
      
      .contract-section {
        page-break-inside: auto; /* Allow breaking inside sections if needed to save space */
        width: 100%;
      }
      
      .contract-header {
        width: 100%;
      }

      .contract-clause {
        margin-bottom: 0.1rem;
        padding: 0.05rem 0;
      }
      
      /* Force two pages maximum */
      .print-container {
        max-height: 277mm; /* Slightly more than 2 A4 pages */
      }
    }
    
    /* Compact layout for PDF */
    .compact-layout .contract-section {
      margin-bottom: 0.25rem;
      padding: 0.25rem;
    }
    
    .compact-layout .contract-clause {
      margin-bottom: 0.1rem;
    }
    
    .compact-layout .contract-signature {
      margin-top: 0.5rem;
    }
  `;
};
