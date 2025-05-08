
import { useState } from "react";
import { RentalForm, FormData } from "@/components/RentalForm";
import { ContractPreview } from "@/components/ContractPreview";
import { PrintButton } from "@/components/PrintButton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Sistema de Locação de Veículos</h1>
        <p className="text-muted-foreground">
          Preencha os dados do contrato e visualize em tempo real
        </p>
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
            <PrintButton />
          </div>
          <ContractPreview data={formData} />
        </TabsContent>
      </Tabs>

      <div className="print-only">
        <ContractPreview data={formData} />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;
