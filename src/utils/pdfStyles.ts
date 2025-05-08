
import { type Company } from "@/components/CompanySelector";

export const getPDFStyles = (company: Company): string => {
  return `
    @page {
      size: A4;
      margin: 0.5cm;
    }
    
    body {
      margin: 0;
      padding: 10px;
      background-color: white;
      font-family: 'Arial', sans-serif;
      font-size: 9pt;
      line-height: 1.2;
    }
    
    .print-container {
      width: 100%;
      margin: 0 auto;
    }
    
    /* Base contract styles */
    .contract-container {
      width: 100%;
      margin: 0;
      padding: 1rem;
      background-color: white;
      box-sizing: border-box;
    }
    
    .contract-header {
      font-weight: bold;
      margin-bottom: 1rem;
      border-radius: 4px;
      width: 100%;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      padding: 0.5rem;
    }
    
    .company-logo {
      margin-right: 1rem;
    }
    
    .company-logo img {
      height: 40px;
      max-width: 120px;
      object-fit: contain;
    }
    
    .header-text {
      font-size: 12pt;
      font-weight: bold;
      flex: 1;
      text-align: center;
    }
    
    .contract-section {
      margin-bottom: 0.8rem;
      padding: 0.5rem;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    .contract-clause {
      margin-bottom: 0.4rem;
      padding: 0.2rem 0;
    }
    
    .contract-signature {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
    }
    
    .contract-signature-line {
      width: 160px;
      margin-top: 1rem;
      text-align: center;
      padding-top: 0.2rem;
    }
    
    .translation {
      font-style: italic;
      font-size: 8pt;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .text-sm {
      font-size: 8pt;
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
      gap: 0.5rem;
    }
    
    .column {
      flex: 1;
      min-width: 45%;
    }
    
    /* Print styles */
    @media print {
      body {
        font-size: 9pt;
        line-height: 1.2;
        background: #fff;
        color: #000;
        margin: 0;
        padding: 0;
        width: 100%;
      }
      
      .contract-container {
        width: 100%;
        max-width: 100%;
        padding: 5px 10px;
        margin: 0;
        box-shadow: none;
        border-radius: 0;
      }
      
      .contract-section {
        page-break-inside: avoid;
        width: 100%;
      }
      
      .contract-header {
        width: 100%;
      }

      .contract-clause {
        margin-bottom: 0.3rem;
        padding: 0.15rem 0;
      }
    }
    
    /* Compact layout for PDF */
    .compact-layout .contract-section {
      margin-bottom: 0.5rem;
      padding: 0.4rem;
    }
    
    .compact-layout .contract-clause {
      margin-bottom: 0.3rem;
    }
    
    .compact-layout .contract-signature {
      margin-top: 1rem;
    }
  `;
};

