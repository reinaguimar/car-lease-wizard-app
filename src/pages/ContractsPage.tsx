
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRentals, searchRentals, updateRentalStatus, Rental } from "@/services/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, FileText, ArrowLeft, AlertCircle, Loader } from "lucide-react";
import { ContractSearch } from "@/components/ContractSearch";
import { ContractsPagination } from "@/components/ContractsPagination";
import { LoadingState } from "@/components/LoadingState";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/hooks/use-toast";

export default function ContractsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();
  
  const [isLoading, _, fetchRentals, error] = useLoading(async () => {
    const data = await getRentals({ status: "active" });
    setRentals(data);
    setFilteredRentals(data);
    return data;
  });

  const [isSearching, __, executeSearch] = useLoading(async (term: string) => {
    if (!term.trim()) {
      setFilteredRentals(rentals);
      return rentals;
    }
    
    const results = await searchRentals(term);
    setFilteredRentals(results);
    return results;
  });

  const [isUpdating, ___, executeUpdate] = useLoading(async (id: string, status: string) => {
    return await updateRentalStatus(id, status);
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await executeUpdate(id, newStatus);
      
      toast({
        title: "Status atualizado",
        description: `Contrato foi marcado como ${
          newStatus === "completed" ? "concluído" : "cancelado"
        }`,
      });
      
      // Refresh the rentals list after status change
      fetchRentals();
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do contrato",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (term: string) => {
    try {
      await executeSearch(term);
      setCurrentPage(1);
    } catch (error) {
      toast({
        title: "Erro na busca",
        description: "Não foi possível completar a busca",
        variant: "destructive",
      });
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRentals.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderContractStatus = (status?: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Concluído</Badge>;
      case "canceled":
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pendente</Badge>;
    }
  };

  if (isLoading) {
    return <LoadingState message="Carregando contratos..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar contratos</h2>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Button onClick={() => fetchRentals()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contratos Ativos</h1>
          <p className="text-muted-foreground">
            Gerenciamento de contratos ativos de locação
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <ContractSearch onSearch={handleSearch} />
        
        {isSearching && (
          <div className="flex items-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Buscando...</span>
          </div>
        )}
      </div>

      {filteredRentals.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="font-medium text-lg">Nenhum contrato encontrado</h3>
          <p className="text-muted-foreground">
            Não há contratos ativos no momento ou sua busca não encontrou resultados.
          </p>
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>Lista de contratos ativos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Contrato</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell className="font-medium">{rental.contract_number}</TableCell>
                  <TableCell>
                    {`${rental.client_name} ${rental.client_surname}`}
                  </TableCell>
                  <TableCell>
                    {`${rental.vehicle_make} ${rental.vehicle_model}`}
                  </TableCell>
                  <TableCell>
                    {format(new Date(rental.start_date), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}{" "}
                    a{" "}
                    {format(new Date(rental.end_date), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(rental.total_amount)}
                  </TableCell>
                  <TableCell>{renderContractStatus(rental.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(rental.id, "completed")}
                        disabled={isUpdating}
                      >
                        Concluir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleStatusChange(rental.id, "canceled")}
                        disabled={isUpdating}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ContractsPagination
            totalItems={filteredRentals.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
