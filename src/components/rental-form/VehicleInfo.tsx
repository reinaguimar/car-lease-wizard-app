
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../RentalForm";

const vehicleTypes = ["SUV", "Sedan", "Hatchback", "Convertible", "Minivan", "Pickup", "Sports Car"];
const fuelTypes = ["Gasolina", "Diesel", "Elétrico", "Híbrido", "Flex"];

interface VehicleInfoProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

export function VehicleInfo({ form, handleFormChange }: VehicleInfoProps) {
  return (
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
  );
}
