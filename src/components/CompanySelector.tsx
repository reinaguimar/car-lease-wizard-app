
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type Company = "moove" | "yoou";

interface CompanySelectorProps {
  selectedCompany: Company;
  onCompanyChange: (company: Company) => void;
}

export function CompanySelector({ selectedCompany, onCompanyChange }: CompanySelectorProps) {
  return (
    <Card className="w-full p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Selecione a Empresa Locadora</h2>
      <RadioGroup
        value={selectedCompany}
        onValueChange={(value) => onCompanyChange(value as Company)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className={`border rounded-md p-4 ${selectedCompany === "moove" ? "border-[#33C3F0] bg-blue-50" : "border-gray-200"}`}>
          <RadioGroupItem value="moove" id="moove" className="sr-only" />
          <Label htmlFor="moove" className="flex items-center justify-center gap-2 cursor-pointer">
            <div className="bg-[#33C3F0] text-white p-1 rounded-full">
              <Car className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className={`font-bold text-lg ${selectedCompany === "moove" ? "text-[#33C3F0]" : ""}`}>Moove Locadora</h3>
              <p className="text-muted-foreground text-sm">Contrato padrão</p>
            </div>
          </Label>
        </div>
        
        <div className={`border rounded-md p-4 ${selectedCompany === "yoou" ? "border-[#EF65CF] bg-pink-50" : "border-gray-200"}`}>
          <RadioGroupItem value="yoou" id="yoou" className="sr-only" />
          <Label htmlFor="yoou" className="flex items-center justify-center gap-2 cursor-pointer">
            <div className="bg-[#EF65CF] text-white p-1 rounded-full">
              <Car className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-[#EF65CF]">Yoou Rent a Car</h3>
              <p className="text-muted-foreground text-sm">Novo contrato</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
}
