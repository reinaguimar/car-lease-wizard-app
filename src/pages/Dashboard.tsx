
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { getContracts, Contract } from "@/services/supabase";
import { isSupabaseConfigured } from "@/services/supabase/supabaseClient";
import { 
  ArrowRight, 
  Car, 
  Users, 
  FileCheck, 
  FileX, 
  BarChart2, 
  PieChart as PieChartIcon,
  Filter,
  Calendar
} from "lucide-react";
import { LoadingState } from "@/components/LoadingState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Dashboard filter types
type DateRange = "all" | "thisMonth" | "lastMonth" | "last3Months" | "last6Months" | "custom";
type StatusFilter = "all" | "active" | "completed" | "canceled";

export default function Dashboard() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter states
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        // Check if Supabase is configured before fetching
        if (!isSupabaseConfigured()) {
          toast.error("Configuração do Supabase necessária", {
            description: "Configure as variáveis de ambiente do Supabase para carregar os dados.",
            duration: 5000
          });
          setLoading(false);
          return;
        }

        const contractsData = await getContracts();
        setContracts(contractsData);
        setFilteredContracts(contractsData);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        toast.error("Erro ao carregar contratos", {
          description: "Verifique a conexão com o Supabase.",
          duration: 5000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    if (!contracts.length) return;
    
    let result = [...contracts];
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(contract => contract.status === statusFilter);
    }
    
    // Apply date range filter
    const currentDate = new Date();
    let fromDate: Date | undefined;
    let toDate: Date | undefined = currentDate;
    
    switch (dateRange) {
      case "thisMonth":
        fromDate = startOfMonth(currentDate);
        break;
      case "lastMonth":
        fromDate = startOfMonth(subMonths(currentDate, 1));
        toDate = endOfMonth(subMonths(currentDate, 1));
        break;
      case "last3Months":
        fromDate = startOfMonth(subMonths(currentDate, 3));
        break;
      case "last6Months":
        fromDate = startOfMonth(subMonths(currentDate, 6));
        break;
      case "custom":
        fromDate = customDateRange.from;
        toDate = customDateRange.to;
        break;
      default:
        // "all" - no date filtering
        break;
    }
    
    if (fromDate && toDate) {
      result = result.filter(contract => {
        const contractDate = parseISO(contract.sign_date);
        return isWithinInterval(contractDate, { start: fromDate as Date, end: toDate as Date });
      });
    }
    
    setFilteredContracts(result);
  }, [contracts, statusFilter, dateRange, customDateRange]);

  // Calculate statistics based on filtered contracts
  const totalContracts = filteredContracts.length;
  const activeContracts = filteredContracts.filter(c => c.status === 'active').length;
  const completedContracts = filteredContracts.filter(c => c.status === 'completed').length;
  const canceledContracts = filteredContracts.filter(c => c.status === 'canceled').length;
  
  // Calculate unique clients and vehicles
  const uniqueClients = new Set(filteredContracts.map(c => c.client_id)).size;
  const uniqueVehicles = new Set(filteredContracts.map(c => c.vehicle_id)).size;

  // Prepare chart data
  const statusData = [
    { name: 'Ativos', value: activeContracts },
    { name: 'Concluídos', value: completedContracts },
    { name: 'Cancelados', value: canceledContracts },
  ];

  // Monthly contracts data (simplified example)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Group contracts by month
  const monthlyData = Array(12).fill(0).map((_, i) => ({
    name: new Date(currentYear, i).toLocaleString('pt-BR', { month: 'short' }),
    contratos: 0
  }));

  filteredContracts.forEach(contract => {
    const contractDate = new Date(contract.sign_date);
    if (contractDate.getFullYear() === currentYear) {
      const month = contractDate.getMonth();
      monthlyData[month].contratos += 1;
    }
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral dos contratos de locação</p>
        </div>
        <Link to="/">
          <Button>Novo Contrato</Button>
        </Link>
      </div>

      {/* Filters Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status do Contrato</label>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="completed">Concluídos</SelectItem>
                  <SelectItem value="canceled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <div className="flex gap-2">
                <Select
                  value={dateRange}
                  onValueChange={(value) => setDateRange(value as DateRange)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Todos os períodos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todo o período</SelectItem>
                    <SelectItem value="thisMonth">Este mês</SelectItem>
                    <SelectItem value="lastMonth">Mês passado</SelectItem>
                    <SelectItem value="last3Months">Últimos 3 meses</SelectItem>
                    <SelectItem value="last6Months">Últimos 6 meses</SelectItem>
                    <SelectItem value="custom">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
                
                {dateRange === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        <Calendar className="h-4 w-4" />
                        {customDateRange.from && customDateRange.to ? (
                          <span>
                            {format(customDateRange.from, "dd/MM/yy")} - {format(customDateRange.to, "dd/MM/yy")}
                          </span>
                        ) : (
                          "Selecionar datas"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={customDateRange.from}
                        selected={{
                          from: customDateRange.from,
                          to: customDateRange.to
                        }}
                        onSelect={(range) => {
                          if (range) {
                            setCustomDateRange({
                              from: range.from,
                              to: range.to || range.from
                            });
                          }
                        }}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingState message="Carregando dados..." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalContracts}</div>
                <p className="text-xs text-muted-foreground">
                  {activeContracts} ativos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueClients}</div>
                <p className="text-xs text-muted-foreground">
                  clientes únicos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veículos</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueVehicles}</div>
                <p className="text-xs text-muted-foreground">
                  veículos alugados
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelamentos</CardTitle>
                <FileX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{canceledContracts}</div>
                <p className="text-xs text-muted-foreground">
                  {totalContracts > 0 ? ((canceledContracts / totalContracts) * 100).toFixed(1) : "0"}% do total
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="status" className="gap-2">
                <PieChartIcon className="h-4 w-4" />
                Status dos Contratos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contratos por Mês ({currentYear})</CardTitle>
                  <CardDescription>
                    Distribuição de contratos ao longo do ano
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="contratos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="status" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Contratos</CardTitle>
                  <CardDescription>
                    Distribuição de contratos por status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/contracts">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <FileCheck className="h-10 w-10 mb-2" />
                    <h3 className="font-medium mb-1">Ver Contratos Ativos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Acesse todos os contratos ativos
                    </p>
                    <ArrowRight className="h-4 w-4" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/archived">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <FileX className="h-10 w-10 mb-2" />
                    <h3 className="font-medium mb-1">Ver Contratos Arquivados</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Acesse contratos concluídos e cancelados
                    </p>
                    <ArrowRight className="h-4 w-4" />
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Car className="h-10 w-10 mb-2" />
                    <h3 className="font-medium mb-1">Novo Contrato</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Crie um novo contrato de locação
                    </p>
                    <ArrowRight className="h-4 w-4" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
