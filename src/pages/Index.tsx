
import { useState } from "react";
import { RentalForm, FormData } from "@/components/RentalForm";
import { ContractPreview } from "@/components/ContractPreview";
import { PrintButton } from "@/components/PrintButton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { CompanySelector, type Company } from "@/components/CompanySelector";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Archive, File, BarChart2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
    <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-6 flex flex-col min-h-screen">
      <div className="mb-4 sm:mb-6 text-center">
        <h1 className="text-xl sm:text-3xl font-bold">Sistema de Locação de Veículos</h1>
        <p className="text-muted-foreground text-xs sm:text-base">
          Preencha os dados do contrato e visualize em tempo real
        </p>
      </div>

      <Alert className="mb-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Como usar</AlertTitle>
        <AlertDescription>
          Preencha todos os campos do formulário, visualize o contrato e depois clique em "Salvar Contrato" para gerar o PDF e salvar os dados.
          Os contratos salvos estarão disponíveis na página "Ver Contratos".
        </AlertDescription>
      </Alert>

      <div className="mb-4">
        <CompanySelector 
          selectedCompany={selectedCompany}
          onCompanyChange={handleCompanyChange}
          className="no-print w-full sm:w-auto"
        />
      </div>

      <Tabs defaultValue="form" className="w-full no-print flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="form" className="text-xs sm:text-sm">Formulário</TabsTrigger>
          <TabsTrigger value="preview" className="text-xs sm:text-sm">Visualizar Contrato</TabsTrigger>
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
      
      <div className="mt-6 sm:mt-8 pt-4 border-t no-print flex flex-wrap gap-2 justify-center">
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2 text-sm">
            <BarChart2 className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link to="/contracts" className="w-full sm:w-auto">
          <Button variant="default" className="w-full sm:w-auto gap-2 text-sm">
            <File className="h-4 w-4" />
            Ver Contratos
          </Button>
        </Link>
        <Link to="/archived" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2 text-sm">
            <Archive className="h-4 w-4" />
            Ver Arquivados
          </Button>
        </Link>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
