import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage, 
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const vehicleTypes = ["SUV", "Sedan", "Hatchback", "Convertible", "Minivan", "Pickup", "Sports Car"];
const fuelTypes = ["Gasolina", "Diesel", "Elétrico", "Híbrido", "Flex"];

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: João" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("firstName", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Silva" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("surname", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF / Documento</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 123.456.789-00" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("idNumber", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Rua, número, cidade, estado, CEP" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("address", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Veículo</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFormChange("vehicleType", value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de veículo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Toyota" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("make", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Corolla" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("model", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Combustível</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFormChange("fuel", value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o combustível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fuelTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="period" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Início</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              if (date) handleFormChange("startDate", date);
                            }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de Início</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 17:00h" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("startTime", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local de Entrega</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Aeroporto de Orlando" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("deliveryLocation", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Término</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              if (date) handleFormChange("endDate", date);
                            }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de Término</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 17:00h" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("endTime", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local de Retorno</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Aeroporto de Orlando" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("returnLocation", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="rentalRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Aluguel (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 195.00" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("rentalRate", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Depósito (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 58.00" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFormChange("deposit", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="signDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Assinatura</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              if (date) handleFormChange("signDate", date);
                            }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
