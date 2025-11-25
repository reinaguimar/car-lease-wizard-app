import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { getRentalById } from "@/services/supabase/rentalService";
import { Rental } from "@/services/supabase/types";
import { LoadingState } from "@/components/LoadingState";
import { format } from "date-fns";

export default function ContractStatement() {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRental = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getRentalById(id);
        setRental(data);
      } catch (error) {
        console.error("Error loading rental:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRental();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (!rental) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Contrato não encontrado</p>
            <Link to="/contracts">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const additionalProducts = rental.additional_products as Array<{
    name: string;
    description?: string;
    quantity?: number;
  }> || [];

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/contracts">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Demonstrativo de Contrato
        </h1>
      </div>

      <div className="space-y-6">
        {/* Header com número do contrato */}
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-xl">
              Contrato Nº {rental.contract_number}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Contrato</p>
                <p className="font-medium">Aluguel de Veículo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{rental.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Locatário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nome Completo</p>
              <p className="font-medium">{rental.client_name} {rental.client_surname}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documento de Identidade</p>
              <p className="font-medium">{rental.client_id_number}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p className="font-medium">{rental.client_address}</p>
            </div>
            {rental.client_email && (
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">{rental.client_email}</p>
              </div>
            )}
            {rental.client_phone && (
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{rental.client_phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dados do Veículo */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Veículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Veículo</p>
                <p className="font-medium">{rental.vehicle_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Marca</p>
                <p className="font-medium">{rental.vehicle_make}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modelo</p>
                <p className="font-medium">{rental.vehicle_model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combustível</p>
                <p className="font-medium">{rental.vehicle_fuel}</p>
              </div>
              {rental.vehicle_license_plate && (
                <div>
                  <p className="text-sm text-muted-foreground">Placa</p>
                  <p className="font-medium">{rental.vehicle_license_plate}</p>
                </div>
              )}
              {rental.vehicle_year && (
                <div>
                  <p className="text-sm text-muted-foreground">Ano</p>
                  <p className="font-medium">{rental.vehicle_year}</p>
                </div>
              )}
              {rental.vehicle_color && (
                <div>
                  <p className="text-sm text-muted-foreground">Cor</p>
                  <p className="font-medium">{rental.vehicle_color}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Período de Locação */}
        <Card>
          <CardHeader>
            <CardTitle>Período de Locação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Data de Retirada</p>
                <p className="font-medium">{format(new Date(rental.start_date), "dd/MM/yyyy")} às {rental.start_time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Local de Retirada</p>
                <p className="font-medium">{rental.delivery_location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Devolução</p>
                <p className="font-medium">{format(new Date(rental.end_date), "dd/MM/yyyy")} às {rental.end_time}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Local de Devolução</p>
                <p className="font-medium">{rental.return_location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Dias</p>
              <p className="font-medium">{rental.total_days} dia(s)</p>
            </div>
          </CardContent>
        </Card>

        {/* Produtos/Serviços Contratados */}
        {additionalProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços Contratados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {additionalProducts.map((product, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        {product.description && (
                          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                        )}
                      </div>
                      {product.quantity && product.quantity > 1 && (
                        <div className="text-right ml-4">
                          <p className="text-sm text-muted-foreground">Quantidade</p>
                          <p className="font-medium">{product.quantity}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Condutor Adicional */}
        {rental.additional_driver_name && (
          <Card>
            <CardHeader>
              <CardTitle>Condutor Adicional Autorizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Nome Completo</p>
                <p className="font-medium">{rental.additional_driver_name}</p>
              </div>
              {rental.additional_driver_id_number && (
                <div>
                  <p className="text-sm text-muted-foreground">Documento de Identidade</p>
                  <p className="font-medium">{rental.additional_driver_id_number}</p>
                </div>
              )}
              {rental.additional_driver_license && (
                <div>
                  <p className="text-sm text-muted-foreground">Número da CNH</p>
                  <p className="font-medium">{rental.additional_driver_license}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Observações */}
        <Card className="border-primary">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground italic">
              Este demonstrativo apresenta os itens e serviços contratados. 
              Para informações sobre valores e condições financeiras, consulte o contrato completo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
