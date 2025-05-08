
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

// Import the form section components
import { RenterInfo } from "./rental-form/RenterInfo";
import { VehicleInfo } from "./rental-form/VehicleInfo";
import { RentalPeriod } from "./rental-form/RentalPeriod";
import { PricingInfo } from "./rental-form/PricingInfo";

const formSchema = z.object({
  // Renter Information
  firstName: z.string().min(1, "Nome é obrigatório"),
  surname: z.string().min(1, "Sobrenome é obrigatório"),
  idNumber: z.string().min(1, "Documento é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  
  // Vehicle Information
  vehicleType: z.string().min(1, "Tipo de veículo é obrigatório"),
  make: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  fuel: z.string().min(1, "Combustível é obrigatório"),
  
  // Rental Period
  startDate: z.date({
    required_error: "Data de início é obrigatória",
  }),
  startTime: z.string().min(1, "Hora de início é obrigatória"),
  deliveryLocation: z.string().min(1, "Local de entrega é obrigatório"),
  endDate: z.date({
    required_error: "Data de término é obrigatória",
  }),
  endTime: z.string().min(1, "Hora de término é obrigatória"),
  returnLocation: z.string().min(1, "Local de retorno é obrigatório"),
  
  // Pricing and Terms
  rentalRate: z.string().min(1, "Valor do aluguel é obrigatório"),
  deposit: z.string().min(1, "Valor do depósito é obrigatório"),
  signDate: z.date({
    required_error: "Data de assinatura é obrigatória",
  }),
});

export type FormData = z.infer<typeof formSchema>;

interface RentalFormProps {
  onFormChange: (data: FormData) => void;
}

export function RentalForm({ onFormChange }: RentalFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      idNumber: "",
      address: "",
      vehicleType: "",
      make: "",
      model: "",
      fuel: "",
      startTime: "",
      deliveryLocation: "",
      endTime: "",
      returnLocation: "",
      rentalRate: "",
      deposit: "",
      startDate: new Date(),
      endDate: new Date(),
      signDate: new Date(),
    },
  });
  
  const { toast } = useToast();

  const handleFormChange = (field: keyof FormData, value: any) => {
    form.setValue(field, value);
    if (form.formState.isValid) {
      onFormChange(form.getValues());
    }
  };
  
  const handleUpdateContract = () => {
    if (form.formState.isValid) {
      onFormChange(form.getValues());
      toast({
        title: "Contrato atualizado",
        description: "Os dados foram aplicados ao contrato com sucesso",
      });
    } else {
      // Trigger validation on all fields
      form.trigger();
      toast({
        title: "Erro ao atualizar contrato",
        description: "Por favor, verifique os campos obrigatórios",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6">
        <Tabs defaultValue="renter">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="renter">Dados do Locatário</TabsTrigger>
            <TabsTrigger value="vehicle">Dados do Veículo</TabsTrigger>
            <TabsTrigger value="period">Período de Locação</TabsTrigger>
            <TabsTrigger value="pricing">Valores e Termos</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <TabsContent value="renter" className="mt-0">
              <RenterInfo form={form} handleFormChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="vehicle" className="mt-0">
              <VehicleInfo form={form} handleFormChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="period" className="mt-0">
              <RentalPeriod form={form} handleFormChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="pricing" className="mt-0">
              <PricingInfo form={form} handleFormChange={handleFormChange} />
            </TabsContent>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleUpdateContract} 
                type="button"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar Contrato
              </Button>
            </div>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
