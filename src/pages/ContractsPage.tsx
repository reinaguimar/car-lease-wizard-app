
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContracts, updateContractStatus } from "@/services/supabaseService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "@/components/ui/navigation-menu";
import { Archive, File } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ContractsPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Fetch active contracts
  const { data: activeContracts, isLoading, error, refetch } = useQuery({
    queryKey: ['activeContracts'],
    queryFn: async () => {
      const contracts = await getContracts({ status: "active" });
      return contracts;
    },
  });

  // Handle contract archiving (marking as completed)
  const handleArchiveContract = async (contractId: string) => {
    try {
      await updateContractStatus(contractId, "completed");
      toast({
        title: "Contrato Arquivado",
        description: "O contrato foi marcado como completado com sucesso.",
      });
      // Refetch data after status update
      refetch();
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível arquivar o contrato.",
        variant: "destructive",
      });
    }
  };

  // Handle pagination
  const totalPages = activeContracts ? Math.ceil(activeContracts.length / itemsPerPage) : 0;
  const paginatedContracts = activeContracts ? 
    activeContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) 
    : [];

  // Error handling
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar contratos ativos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos Ativos</h1>
          <p className="text-muted-foreground">
            Gerencie os contratos ativos de locação
          </p>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/archived">
                <Button variant="outline" className="gap-2">
                  <Archive className="h-4 w-4" />
                  Ver Contratos Arquivados
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contratos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-6">
              <p>Carregando contratos...</p>
            </div>
          ) : paginatedContracts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº do Contrato</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.contract_number}</TableCell>
                      <TableCell>
                        {contract.clients?.first_name} {contract.clients?.surname}
                      </TableCell>
                      <TableCell>
                        {contract.vehicles?.make} {contract.vehicles?.model}
                      </TableCell>
                      <TableCell>
                        {format(new Date(contract.start_date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(contract.end_date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {contract.pdf_url ? (
                          <a href={contract.pdf_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <File className="h-4 w-4" />
                            </Button>
                          </a>
                        ) : (
                          <span className="text-gray-400">Não disponível</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleArchiveContract(contract.id)}
                        >
                          Arquivar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      // Show pages around current page
                      const pageToShow = currentPage <= 3 
                        ? i + 1 
                        : currentPage >= totalPages - 2 
                          ? totalPages - 4 + i 
                          : currentPage - 2 + i;
                          
                      if (pageToShow <= totalPages) {
                        return (
                          <PaginationItem key={pageToShow}>
                            <PaginationLink 
                              isActive={pageToShow === currentPage}
                              onClick={() => setCurrentPage(pageToShow)}
                            >
                              {pageToShow}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="flex justify-center p-6">
              <p>Nenhum contrato ativo encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractsPage;
