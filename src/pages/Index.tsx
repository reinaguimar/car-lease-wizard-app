
import { useState } from "react";
import { RentalForm, FormData } from "@/components/RentalForm";
import { ContractPreview } from "@/components/ContractPreview";
import { PrintButton } from "@/components/PrintButton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { CompanySelector, type Company } from "@/components/CompanySelector";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Archive, File } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [selectedCompany, setSelectedCompany] = useState<Company>("moove");
  const isMobile = useIsMobile();

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Sistema de Locação de Veículos</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Preencha os dados do contrato e visualize em tempo real
        </p>
      </div>

      <div className={`mb-4 ${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-center'}`}>
        <CompanySelector 
          selectedCompany={selectedCompany}
          onCompanyChange={handleCompanyChange}
          className="no-print w-full sm:w-auto"
        />
        
        <div className="no-print flex flex-wrap gap-2">
          <Link to="/contracts" className="w-full sm:w-auto">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <File className="h-4 w-4" />
              Ver Contratos
            </Button>
          </Link>
          <Link to="/archived" className="w-full sm:w-auto">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Archive className="h-4 w-4" />
              Ver Arquivados
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="form" className="w-full no-print">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="preview">Visualizar Contrato</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <RentalForm onFormChange={handleFormChange} />
        </TabsContent>
        <TabsContent value="preview">
          <div className="flex justify-end mb-4">
            <PrintButton data={formData} company={selectedCompany} />
          </div>
          <ContractPreview data={formData} company={selectedCompany} />
        </TabsContent>
      </Tabs>

      <div className="print-only">
        <ContractPreview data={formData} company={selectedCompany} />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
