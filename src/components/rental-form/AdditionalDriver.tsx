import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../RentalForm";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AdditionalDriverProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

export function AdditionalDriver({ form, handleFormChange }: AdditionalDriverProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Condutor Adicional</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Informações do condutor adicional autorizado (opcional)
        </p>
      </div>

      <FormField
        control={form.control}
        name="additionalDriverName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl>
              <Input
                placeholder="Nome completo do condutor adicional"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFormChange("additionalDriverName", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalDriverIdNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número do Documento</FormLabel>
            <FormControl>
              <Input
                placeholder="CPF ou documento de identificação"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFormChange("additionalDriverIdNumber", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additionalDriverLicense"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número da CNH</FormLabel>
            <FormControl>
              <Input
                placeholder="Número da Carteira Nacional de Habilitação"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFormChange("additionalDriverLicense", e.target.value);
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
