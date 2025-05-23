
import { type Company } from "@/components/CompanySelector";

export const getBasePDFStyles = (): string => {
  return `
    @page {
      size: A4;
      margin: 1.5cm 1.5cm 2cm 1.5cm;
    }
    
    body {
      margin: 0;
      padding: 0;
      background-color: white;
      font-family: 'Arial', sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      text-align: justify;
    }
    
    .print-container {
      width: 100%;
      margin: 0 auto;
      background-color: white;
      text-align: justify;
    }
    
    /* Base contract styles */
    .contract-container {
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: white;
      box-sizing: border-box;
      text-align: justify;
    }
    
    .contract-header {
      font-weight: bold;
      margin-bottom: 0.75rem;
      width: 100%;
      text-align: center;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      padding: 0.8rem;
      width: 100%;
      box-sizing: border-box;
    }
    
    .company-logo {
      margin-right: 1rem;
    }
    
    .company-logo img {
      height: 24px;
      max-width: 100%;
      object-fit: contain;
    }
    
    .header-text {
      font-size: 14px;
      font-weight: bold;
      flex: 1;
      text-align: center;
    }
    
    .contract-section {
      margin-bottom: 1rem;
      padding: 0.5rem 0.75rem;
      background-color: rgba(255, 255, 255, 0.8);
      text-align: justify;
    }
    
    .contract-clause {
      margin-bottom: 0.5rem;
      padding: 0.1rem 0;
      text-align: justify;
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
      color: #888;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .text-sm {
      font-size: 9pt;
    }
    
    .text-xs {
      font-size: 8pt;
    }

    .section-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  `;
};

export const getPrintStyles = (): string => {
  return `
    /* Print styles */
    @media print {
      body {
        font-size: 10pt;
        line-height: 1.4;
        background: #fff;
        color: #000;
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: justify;
      }
      
      /* Specific handling for headers on each page */
      .pdf-header {
        position: running(header);
        width: 100%;
        display: block;
      }
      
      @page {
        @top-center {
          content: element(header);
          margin-bottom: 10px;
        }
      }
      
      .contract-container {
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin: 0;
        box-shadow: none;
        text-align: justify;
      }
      
      .contract-section {
        page-break-inside: auto;
        break-inside: auto;
        width: 100%;
        text-align: justify;
      }
      
      /* The header is repeated by the @page rule, so hide the first one */
      .contract-container .pdf-header {
        display: none !important;
      }
      
      .contract-clause {
        margin-bottom: 0.4rem;
        padding: 0.1rem 0;
        text-align: justify;
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
      font-size: 10pt;
      line-height: 1.4;
      text-align: justify;
    }
    
    .pdf-optimized .contract-section {
      margin-bottom: 1rem;
      padding: 0.5rem 0.75rem;
      text-align: justify;
    }
    
    .pdf-optimized .contract-clause {
      margin-bottom: 0.4rem;
      padding: 0.1rem 0;
      text-align: justify;
    }
    
    .pdf-optimized .text-sm {
      font-size: 9pt;
    }
    
    .pdf-optimized .text-xs {
      font-size: 8pt;
    }
    
    /* Preserve layout class - keeps original formatting */
    .preserve-layout .contract-section {
      page-break-inside: auto;
      break-inside: auto;
      text-align: justify;
    }
    
    .preserve-layout .contract-signature {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  `;
};
