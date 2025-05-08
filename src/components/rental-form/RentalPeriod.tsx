
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

interface RentalPeriodProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

export function RentalPeriod({ form, handleFormChange }: RentalPeriodProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <PopoverContent className={cn("w-auto p-0", isMobile ? "w-[280px]" : "")} align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    if (date) handleFormChange("startDate", date);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  // Removing any date restrictions to allow past dates
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
              <PopoverContent className={cn("w-auto p-0", isMobile ? "w-[280px]" : "")} align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    if (date) handleFormChange("endDate", date);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  // Removing any date restrictions to allow past dates
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
  );
}
