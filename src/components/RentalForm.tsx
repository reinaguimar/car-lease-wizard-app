
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, RefreshCw } from "lucide-react";

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
  email: z.string().email("Email inválido").optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  
  // Vehicle Information
  vehicleType: z.string().min(1, "Tipo de veículo é obrigatório"),
  make: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  fuel: z.string().min(1, "Combustível é obrigatório"),
  licensePlate: z.string().optional().or(z.literal('')),
  year: z.string().optional().or(z.literal('')),
  color: z.string().optional().or(z.literal('')),
  
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
  onViewContract?: () => void;
  initialData?: Partial<FormData>;
}

export function RentalForm({ onFormChange, onViewContract, initialData }: RentalFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      idNumber: "",
      address: "",
      email: "",
      phone: "",
      vehicleType: "",
      make: "",
      model: "",
      fuel: "",
      licensePlate: "",
      year: "",
      color: "",
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
  const [activeTab, setActiveTab] = useState("renter");

  // Effect to populate form with initial data when editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof FormData, value);
        }
      });
      // Trigger form change with initial data
      onFormChange(initialData as FormData);
    }
  }, [initialData, form, onFormChange]);

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
      
      // Navigate to preview tab if provided
      if (onViewContract) {
        onViewContract();
      }
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
  
  // Define tab order for navigation
  const tabOrder = ["renter", "vehicle", "period", "pricing"];
  
  const goToNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };
  
  const isCurrentTabValid = () => {
    const fieldsPerTab = {
      renter: ["firstName", "surname", "idNumber", "address"],
      vehicle: ["vehicleType", "make", "model", "fuel"],
      period: ["startDate", "startTime", "deliveryLocation", "endDate", "endTime", "returnLocation"],
      pricing: ["rentalRate", "deposit", "signDate"]
    };
    
    const currentTabFields = fieldsPerTab[activeTab as keyof typeof fieldsPerTab];
    return currentTabFields.every(field => !form.formState.errors[field as keyof FormData]);
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4 sm:p-6">
        <Tabs value={activeTab} defaultValue="renter" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 w-full overflow-x-auto">
            <TabsTrigger value="renter" className="text-xs sm:text-sm">Dados do Locatário</TabsTrigger>
            <TabsTrigger value="vehicle" className="text-xs sm:text-sm">Dados do Veículo</TabsTrigger>
            <TabsTrigger value="period" className="text-xs sm:text-sm">Período de Locação</TabsTrigger>
            <TabsTrigger value="pricing" className="text-xs sm:text-sm">Valores e Termos</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <TabsContent value="renter" className="mt-0">
              <RenterInfo form={form} handleFormChange={handleFormChange} />
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => {
                    form.trigger(["firstName", "surname", "idNumber", "address"]);
                    if (isCurrentTabValid()) {
                      goToNextTab();
                    }
                  }} 
                  type="button"
                  className="gap-2"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="mt-0">
              <VehicleInfo form={form} handleFormChange={handleFormChange} />
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => {
                    form.trigger(["vehicleType", "make", "model", "fuel"]);
                    if (isCurrentTabValid()) {
                      goToNextTab();
                    }
                  }} 
                  type="button"
                  className="gap-2"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="period" className="mt-0">
              <RentalPeriod form={form} handleFormChange={handleFormChange} />
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => {
                    form.trigger(["startDate", "startTime", "deliveryLocation", "endDate", "endTime", "returnLocation"]);
                    if (isCurrentTabValid()) {
                      goToNextTab();
                    }
                  }} 
                  type="button"
                  className="gap-2"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-0">
              <PricingInfo form={form} handleFormChange={handleFormChange} />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleUpdateContract} 
                  type="button"
                  className="gap-2 w-full sm:w-auto"
                  disabled={!form.formState.isValid}
                >
                  <RefreshCw className="h-4 w-4" />
                  Atualizar Contrato
                </Button>
              </div>
            </TabsContent>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
