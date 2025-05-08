
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContracts } from "@/services/supabaseService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { ArchiveRestore } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ArchivedContracts = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Fetch archived contracts (completed or canceled)
  const { data: archivedContracts, isLoading, error, refetch } = useQuery({
    queryKey: ['archivedContracts'],
    queryFn: async () => {
      const completedContracts = await getContracts({ status: "completed" });
      const canceledContracts = await getContracts({ status: "canceled" });
      return [...completedContracts, ...canceledContracts];
    },
  });

  // Handle pagination
  const totalPages = archivedContracts ? Math.ceil(archivedContracts.length / itemsPerPage) : 0;
  const paginatedContracts = archivedContracts ? 
    archivedContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) 
    : [];

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

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contratos Arquivados</h1>
          <p className="text-muted-foreground">
            Visualize os contratos completados ou cancelados
          </p>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <ArchiveRestore className="h-4 w-4" />
                  Voltar para Contratos Ativos
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contratos Arquivados</CardTitle>
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
                    <TableHead>Status</TableHead>
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
              <p>Nenhum contrato arquivado encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchivedContracts;
