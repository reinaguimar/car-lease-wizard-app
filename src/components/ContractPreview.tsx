
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from "./RentalForm";
import { ContractHeader } from "./contract/ContractHeader";
import { ContractSection } from "./contract/ContractSection";
import { RenterInfoSection } from "./contract/RenterInfoSection";
import { VehicleInfoSection } from "./contract/VehicleInfoSection";
import { VehicleConditionSection } from "./contract/VehicleConditionSection";
import { QualificationsSection } from "./contract/QualificationsSection";
import { RentalPeriodSection } from "./contract/RentalPeriodSection";
import { PaymentSection } from "./contract/PaymentSection";
import { ObligationsSection } from "./contract/ObligationsSection";
import { InsuranceSection } from "./contract/InsuranceSection";
import { DepositSection } from "./contract/DepositSection";
import { TerminationSection } from "./contract/TerminationSection";
import { ReturnSection } from "./contract/ReturnSection";
import { JurisdictionSection } from "./contract/JurisdictionSection";
import { SignatureSection } from "./contract/SignatureSection";
import { type Company } from "./CompanySelector";

interface ContractPreviewProps {
  data: Partial<FormData>;
  company: Company;
}

export function ContractPreview({ data, company }: ContractPreviewProps) {
  let themeClass = "";
  
  if (company === "yoou") {
    themeClass = "yoou-theme";
  } else if (company === "moove") {
    themeClass = "moove-theme";
  }
  
  return (
    <Card className={`w-full shadow-lg ${themeClass}`}>
      <CardContent className="p-0 overflow-hidden">
        <div className="contract-container">
          <ContractHeader company={company} />
          
          <ContractSection>
            <RenterInfoSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <VehicleInfoSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <VehicleConditionSection />
          </ContractSection>
          
          <ContractSection>
            <QualificationsSection />
          </ContractSection>
          
          <ContractSection>
            <RentalPeriodSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <PaymentSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <ObligationsSection />
          </ContractSection>
          
          <ContractSection>
            <InsuranceSection />
          </ContractSection>
          
          <ContractSection>
            <DepositSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <TerminationSection />
          </ContractSection>
          
          <ContractSection>
            <ReturnSection data={data} />
          </ContractSection>
          
          <ContractSection>
            <JurisdictionSection />
          </ContractSection>
          
          <SignatureSection data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
