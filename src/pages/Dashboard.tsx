
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { getRentals, Rental } from "@/services/supabase";
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
  Calendar,
  FilePlus
} from "lucide-react";
import { LoadingState } from "@/components/LoadingState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const COLORS = ['#EF65CF', '#F391DC', '#F7B4E5', '#FBDBF0', '#FEF6FC'];

// Dashboard filter types
type DateRange = "all" | "thisMonth" | "lastMonth" | "last3Months" | "last6Months" | "custom";
type StatusFilter = "all" | "active" | "completed" | "canceled";

export default function Dashboard() {
  const [contracts, setContracts] = useState<Rental[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  
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

        const contractsData = await getRentals();
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
  const uniqueClients = new Set(filteredContracts.map(c => c.client_id_number)).size;
  const uniqueVehicles = new Set(filteredContracts.map(c => c.vehicle_license_plate)).size;

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
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/adfeb8cd-d721-4411-819d-eabc5f4ad102.png" 
            alt="Yoou Rent a Car" 
            className="h-12 sm:h-16"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/archived" className="w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto border-[#EF65CF] text-[#EF65CF] hover:bg-[#fef6fc] hover:text-[#D33AAF]">
              <FileX className="h-4 w-4" />
              Contratos Arquivados
            </Button>
          </Link>
          <Link to="/contracts/new" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 w-full sm:w-auto bg-[#EF65CF] hover:bg-[#D33AAF]">
              <FilePlus className="h-4 w-4" />
              Novo Contrato
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="mb-6 border-[#EF65CF]/20 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-[#D33AAF]">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-[#A8499E]">Status do Contrato</label>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <SelectTrigger className="border-[#EF65CF]/30 focus:ring-[#EF65CF]/20">
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
              <label className="text-sm font-medium mb-2 block text-[#A8499E]">Período</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select
                  value={dateRange}
                  onValueChange={(value) => setDateRange(value as DateRange)}
                >
                  <SelectTrigger className="w-full border-[#EF65CF]/30 focus:ring-[#EF65CF]/20">
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
                      <Button variant="outline" className="flex gap-2 w-full sm:w-auto border-[#EF65CF]/30 text-[#A8499E]">
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
                    <PopoverContent className="w-auto p-0" align="start">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-[#EF65CF]/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A8499E]">Total de Contratos</CardTitle>
                <FileCheck className="h-4 w-4 text-[#EF65CF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#D33AAF]">{totalContracts}</div>
                <p className="text-xs text-muted-foreground">
                  {activeContracts} ativos
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#EF65CF]/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A8499E]">Clientes</CardTitle>
                <Users className="h-4 w-4 text-[#EF65CF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#D33AAF]">{uniqueClients}</div>
                <p className="text-xs text-muted-foreground">
                  clientes únicos
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#EF65CF]/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A8499E]">Veículos</CardTitle>
                <Car className="h-4 w-4 text-[#EF65CF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#D33AAF]">{uniqueVehicles}</div>
                <p className="text-xs text-muted-foreground">
                  veículos alugados
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-[#EF65CF]/20 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A8499E]">Cancelamentos</CardTitle>
                <FileX className="h-4 w-4 text-[#EF65CF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#D33AAF]">{canceledContracts}</div>
                <p className="text-xs text-muted-foreground">
                  {totalContracts > 0 ? ((canceledContracts / totalContracts) * 100).toFixed(1) : "0"}% do total
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card className="border-[#EF65CF]/20 shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <CardHeader className="pb-0">
                  <CardTitle className="text-[#D33AAF]">Análise de Contratos</CardTitle>
                  <CardDescription>
                    Visualização gráfica dos contratos de locação
                  </CardDescription>
                  <TabsList className="mt-4 bg-[#fef6fc]/50">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-[#EF65CF] data-[state=active]:text-white gap-2 w-full">
                      <BarChart2 className="h-4 w-4" />
                      <span className={isMobile ? "hidden" : ""}>Visão Geral</span>
                    </TabsTrigger>
                    <TabsTrigger value="status" className="data-[state=active]:bg-[#EF65CF] data-[state=active]:text-white gap-2 w-full">
                      <PieChartIcon className="h-4 w-4" />
                      <span className={isMobile ? "hidden" : ""}>Status dos Contratos</span>
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <TabsContent value="overview" className="mt-0">
                    <div className="px-0 sm:px-2 overflow-x-auto">
                      <div style={{ width: '100%', height: 350, minWidth: isMobile ? 500 : 'auto' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F7B4E5" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: '1px solid #EF65CF',
                                borderRadius: '8px' 
                              }} 
                            />
                            <Legend />
                            <Bar dataKey="contratos" fill="#EF65CF" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="status" className="mt-0">
                    <div className="flex items-center justify-center h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={isMobile ? 60 : 80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              isMobile ? 
                              `${name[0]}${name.length > 3 ? name[1] : ''}: ${(percent * 100).toFixed(0)}%` :
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #EF65CF',
                              borderRadius: '8px' 
                            }} 
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
