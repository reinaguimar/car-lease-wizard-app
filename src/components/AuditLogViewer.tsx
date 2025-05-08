
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuditLogs, AuditLog, AuditAction, AuditResource } from "@/services/supabase/auditService";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuditLogViewerProps {
  resourceType?: AuditResource;
  resourceId?: string;
  maxItems?: number;
  showTitle?: boolean;
  height?: string;
  className?: string;
}

export function AuditLogViewer({
  resourceType,
  resourceId,
  maxItems = 10,
  showTitle = true,
  height = "300px",
  className = "",
}: AuditLogViewerProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const options: {
          resource?: AuditResource;
          resourceId?: string;
          action?: AuditAction;
          limit: number;
        } = {
          limit: maxItems,
        };

        if (resourceType) {
          options.resource = resourceType;
        }

        if (resourceId) {
          options.resourceId = resourceId;
        }

        if (filter !== "all") {
          options.action = filter as AuditAction;
        }

        const auditLogs = await getAuditLogs(options);
        setLogs(auditLogs);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [resourceType, resourceId, maxItems, filter]);

  const getBadgeColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-500";
      case "update":
        return "bg-blue-500";
      case "delete":
        return "bg-red-500";
      case "view":
        return "bg-slate-500";
      case "search":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "create":
        return "Criação";
      case "update":
        return "Atualização";
      case "delete":
        return "Exclusão";
      case "view":
        return "Visualização";
      case "search":
        return "Busca";
      default:
        return action;
    }
  };

  const getResourceText = (resource: string) => {
    switch (resource) {
      case "contract":
        return "Contrato";
      case "client":
        return "Cliente";
      case "vehicle":
        return "Veículo";
      case "company":
        return "Empresa";
      default:
        return resource;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className={className}>
      {showTitle && (
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Logs de Auditoria</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="create">Criação</SelectItem>
                <SelectItem value="update">Atualização</SelectItem>
                <SelectItem value="delete">Exclusão</SelectItem>
                <SelectItem value="view">Visualização</SelectItem>
                <SelectItem value="search">Busca</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      )}
      <CardContent>
        <ScrollArea className={`rounded-md border p-4`} style={{ height }}>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <Badge className={getBadgeColor(log.action)}>
                      {getActionText(log.action)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(log.created_at)}
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {getResourceText(log.resource)}
                  </p>
                  {log.details && (
                    <p className="text-sm text-muted-foreground">
                      {log.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhum log de auditoria encontrado
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
