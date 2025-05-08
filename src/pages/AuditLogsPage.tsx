
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuditLogViewer } from "@/components/AuditLogViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Users, Car, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Logs de Auditoria</h1>
            <p className="text-muted-foreground">
              Visualize e analise todas as atividades do sistema
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dateRange.from && dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                  </>
                ) : (
                  "Selecionar período"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos os Logs</TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Contratos
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            Veículos
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            Empresas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Logs de Auditoria</CardTitle>
              <CardDescription>
                Visualize todas as atividades registradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogViewer 
                maxItems={50} 
                showTitle={false} 
                height="500px" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Contratos</CardTitle>
              <CardDescription>
                Visualize todas as atividades relacionadas aos contratos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogViewer 
                resourceType="contract" 
                maxItems={50} 
                showTitle={false} 
                height="500px" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Clientes</CardTitle>
              <CardDescription>
                Visualize todas as atividades relacionadas aos clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogViewer 
                resourceType="client" 
                maxItems={50} 
                showTitle={false} 
                height="500px" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Veículos</CardTitle>
              <CardDescription>
                Visualize todas as atividades relacionadas aos veículos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogViewer 
                resourceType="vehicle" 
                maxItems={50} 
                showTitle={false} 
                height="500px" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Empresas</CardTitle>
              <CardDescription>
                Visualize todas as atividades relacionadas às empresas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogViewer 
                resourceType="company" 
                maxItems={50} 
                showTitle={false} 
                height="500px" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
