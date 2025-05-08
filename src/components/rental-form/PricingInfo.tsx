
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../RentalForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface PricingInfoProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

export function PricingInfo({ form, handleFormChange }: PricingInfoProps) {
  const isMobile = useIsMobile();
  
  return (
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
                className="w-full"
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
                className="w-full"
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
              <PopoverContent className={cn("w-auto p-0", isMobile ? "w-[280px]" : "")} align="start">
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
  );
}
