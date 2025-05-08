
import { supabase, handleSupabaseError } from './supabaseClient';

export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'search';
export type AuditResource = 'contract' | 'client' | 'vehicle' | 'company';

export interface AuditLog {
  id: string;  // Make this required to match the database schema
  action: AuditAction;
  resource: AuditResource;
  resource_id: string;
  details?: string;
  user_id?: string;
  created_at: string;
}

export const logAuditEvent = async (
  action: AuditAction,
  resource: AuditResource,
  resourceId: string,
  details?: string,
  userId?: string
): Promise<void> => {
  try {
    const auditLog = {
      action,
      resource,
      resource_id: resourceId,
      details,
      user_id: userId
    };
    
    // Tentativa de registro de auditoria (não crítica, pode falhar silenciosamente)
    const { error } = await supabase.from('audit_logs').insert([auditLog]);
    
    if (error) {
      console.warn("Falha no registro de auditoria, mas continuando operação:", error.message);
      // Não lançamos o erro aqui para não interromper o fluxo principal
    }
  } catch (error) {
    // Apenas registramos o erro sem interromper o fluxo principal
    console.warn("Erro ao registrar auditoria, continuando operação:", error);
  }
};

export const getAuditLogs = async (
  options?: {
    resource?: AuditResource;
    resourceId?: string;
    action?: AuditAction;
    userId?: string;
    fromDate?: Date;
    toDate?: Date;
    limit?: number;
    offset?: number;
  }
): Promise<AuditLog[]> => {
  try {
    let query = supabase.from('audit_logs').select('*');
    
    if (options?.resource) {
      query = query.eq('resource', options.resource);
    }
    
    if (options?.resourceId) {
      query = query.eq('resource_id', options.resourceId);
    }
    
    if (options?.action) {
      query = query.eq('action', options.action);
    }
    
    if (options?.userId) {
      query = query.eq('user_id', options.userId);
    }
    
    if (options?.fromDate) {
      query = query.gte('created_at', options.fromDate.toISOString());
    }
    
    if (options?.toDate) {
      query = query.lte('created_at', options.toDate.toISOString());
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    // Always order by most recent first
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as AuditLog[];
  } catch (error) {
    handleSupabaseError(error, 'consulta de logs de auditoria');
    return [];
  }
};
