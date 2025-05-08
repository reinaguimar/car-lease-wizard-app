
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";

export function PrintButton() {
  const handlePrint = () => {
    toast.success("Preparando o contrato para impressão");
    window.print();
  };

  return (
    <Button 
      onClick={handlePrint}
      className="no-print mb-6"
      variant="default"
    >
      <Printer className="mr-2 h-4 w-4" />
      Imprimir / Salvar em PDF
    </Button>
  );
}
