
// Since we removed the audit_logs table, this service is now a stub
// that doesn't actually store audit logs but doesn't break the existing code

export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'search';
export type AuditResource = 'contract' | 'client' | 'vehicle' | 'company';

export interface AuditLog {
  id: string;
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
    // Just log to console instead of storing in database
    console.log('Audit log (not stored):', {
      action,
      resource,
      resource_id: resourceId,
      details,
      user_id: userId,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Error logging audit event:", error);
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
  // Return empty array since we're not storing audit logs anymore
  console.log('Audit logs requested (not available):', options);
  return [];
};
