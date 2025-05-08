
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../RentalForm";

interface RenterInfoProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

export function RenterInfo({ form, handleFormChange }: RenterInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
  );
}
