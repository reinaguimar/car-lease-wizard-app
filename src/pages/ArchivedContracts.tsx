
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRentals, searchRentals, Rental } from "@/services/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArchiveRestore, Loader, AlertCircle } from "lucide-react";
import { ContractSearch } from "@/components/ContractSearch";
import { ContractsPagination } from "@/components/ContractsPagination";
import { LoadingState } from "@/components/LoadingState";
import { useLoading } from "@/hooks/useLoading";

const ArchivedContracts = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredContracts, setFilteredContracts] = useState<Rental[]>([]);
  const itemsPerPage = 10;
  
  // Fetch archived contracts (completed or canceled)
  const { data: archivedContracts, isLoading, error, refetch } = useQuery({
    queryKey: ['archivedContracts'],
    queryFn: async () => {
      const completedContracts = await getRentals({ status: "completed" });
      const canceledContracts = await getRentals({ status: "canceled" });
      return [...completedContracts, ...canceledContracts];
    },
  });

  // Set filtered contracts initially when data loads
  useEffect(() => {
    if (archivedContracts) {
      setFilteredContracts(archivedContracts);
    }
  }, [archivedContracts]);

  const [isSearching, _, executeSearch] = useLoading(async (term: string) => {
    if (!term.trim()) {
      setFilteredContracts(archivedContracts || []);
      return archivedContracts || [];
    }
    
    const results = await searchRentals(term);
    // Filter to only show archived contracts (completed or canceled)
    const archivedResults = results.filter(contract => 
      contract.status === "completed" || contract.status === "canceled"
    );
    setFilteredContracts(archivedResults);
    return archivedResults;
  });
  
  // Handle search
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
  const totalPages = filteredContracts ? Math.ceil(filteredContracts.length / itemsPerPage) : 0;
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Error handling
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load archived contracts. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return <LoadingState message="Carregando contratos arquivados..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Erro ao carregar contratos</h2>
        <p className="text-muted-foreground mb-6">{error instanceof Error ? error.message : "Erro desconhecido"}</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos Arquivados</h1>
          <p className="text-muted-foreground">
            Visualize os contratos completados ou cancelados
          </p>
        </div>
        <Link to="/contracts">
          <Button variant="outline" className="gap-2">
            <ArchiveRestore className="h-4 w-4" />
            Voltar para Contratos Ativos
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <ContractSearch onSearch={handleSearch} />
        
        {isSearching && (
          <div className="flex items-center gap-2">
            <Loader className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Buscando...</span>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contratos Arquivados</CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedContracts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº do Contrato</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContracts.map((contract: Rental) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.contract_number}</TableCell>
                      <TableCell>
                        {`${contract.client_name} ${contract.client_surname}`}
                      </TableCell>
                      <TableCell>
                        {`${contract.vehicle_make} ${contract.vehicle_model}`}
                      </TableCell>
                      <TableCell>
                        {format(new Date(contract.start_date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(contract.end_date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          contract.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {contract.status === "completed" ? "Completado" : "Cancelado"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <ContractsPagination
                totalItems={filteredContracts.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="font-medium text-lg">Nenhum contrato encontrado</h3>
              <p className="text-muted-foreground">
                Não há contratos arquivados no momento ou sua busca não encontrou resultados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchivedContracts;
