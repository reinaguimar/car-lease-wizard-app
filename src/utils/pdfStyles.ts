
import { type Company } from "@/components/CompanySelector";

export const getPDFStyles = (company: Company): string => {
  return `
    @page {
      size: A4;
      margin: 2cm 1.5cm;
    }
    
    body {
      margin: 0;
      padding: 0;
      background-color: white;
      font-family: 'Arial', sans-serif;
      font-size: 9pt;
      line-height: 1.3;
    }
    
    .print-container {
      width: 100%;
      margin: 0 auto;
      background-color: white;
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
      margin-bottom: 0.75rem;
      border-radius: 4px;
      width: 100%;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      padding: 0.4rem;
    }
    
    .company-logo {
      margin-right: 0.5rem;
    }
    
    .company-logo img {
      height: 30px;
      max-width: 120px;
      object-fit: contain;
    }
    
    .header-text {
      font-size: 10pt;
      font-weight: bold;
      flex: 1;
      text-align: center;
    }
    
    .contract-section {
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.75rem;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 4px;
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
      margin-top: 0.75rem;
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
    
    .text-xs {
      font-size: 7.5pt;
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
    
    /* Print styles */
    @media print {
      body {
        font-size: 9pt;
        line-height: 1.3;
        background: #fff;
        color: #000;
        margin: 0;
        padding: 0;
        width: 100%;
      }
      
      /* Specific handling for headers on each page */
      .pdf-header {
        position: running(header);
      }
      
      @page {
        @top-center {
          content: element(header);
          margin-bottom: 15px;
        }
      }
      
      .contract-container {
        width: 100%;
        max-width: 100%;
        padding: 0.5rem;
        margin: 0;
        box-shadow: none;
        border-radius: 0;
      }
      
      .contract-section {
        page-break-inside: auto;
        break-inside: auto;
        width: 100%;
      }
      
      /* The header is repeated by the @page rule, so hide the first one */
      .contract-container > .contract-header:first-child {
        display: none;
      }
      
      .contract-clause {
        margin-bottom: 0.3rem;
        padding: 0.15rem 0;
      }
      
      /* Signature section should not be split */
      .contract-signature {
        page-break-inside: avoid;
        break-inside: avoid;
        page-break-before: auto;
        break-before: auto;
        margin-top: 1rem;
      }
      
      /* Hide elements with no-print class */
      .no-print {
        display: none !important;
      }
    }
    
    /* PDF-specific optimizations */
    .pdf-optimized {
      font-size: 9pt;
      line-height: 1.3;
    }
    
    .pdf-optimized .contract-section {
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.75rem;
    }
    
    .pdf-optimized .contract-clause {
      margin-bottom: 0.3rem;
      padding: 0.15rem 0;
    }
    
    .pdf-optimized .text-sm {
      font-size: 8pt;
    }
    
    .pdf-optimized .text-xs {
      font-size: 7.5pt;
    }
    
    /* Preserve layout class - keeps original formatting */
    .preserve-layout .contract-section {
      page-break-inside: auto;
      break-inside: auto;
    }
    
    .preserve-layout .contract-signature {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  `;
};
