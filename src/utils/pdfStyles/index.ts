
import { type Company } from "@/components/CompanySelector";
import { getBasePDFStyles, getPrintStyles } from "./baseStyles";
import { getMoovePDFStyles } from "./mooveTheme";
import { getYoouPDFStyles } from "./yoouTheme";

export const getPDFStyles = (company: Company): string => {
  // Get the base styles
  const baseStyles = getBasePDFStyles();
  
  // Get theme-specific styles
  const themeStyles = company === "yoou" 
    ? getYoouPDFStyles() 
    : getMoovePDFStyles();
  
  // Get print styles
  const printStyles = getPrintStyles();
  
  // Combine all styles
  return `
    ${baseStyles}
    ${themeStyles}
    ${printStyles}
  `;
};
