export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          resource: string
          resource_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          resource: string
          resource_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          resource?: string
          resource_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string
          created_at: string
          email: string | null
          first_name: string
          id: string
          id_number: string
          phone: string | null
          surname: string
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          id_number: string
          phone?: string | null
          surname: string
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          id_number?: string
          phone?: string | null
          surname?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          cnpj: string | null
          code: string
          country: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          state: string | null
          theme_color: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          code: string
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          state?: string | null
          theme_color?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          cnpj?: string | null
          code?: string
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          state?: string | null
          theme_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          client_id: string
          company_id: string
          contract_number: string
          created_at: string
          created_by: string | null
          delivery_location: string
          deposit: number
          end_date: string
          end_time: string
          id: string
          pdf_url: string | null
          rental_rate: number
          return_location: string
          sign_date: string
          start_date: string
          start_time: string
          status: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          client_id: string
          company_id: string
          contract_number: string
          created_at?: string
          created_by?: string | null
          delivery_location: string
          deposit: number
          end_date: string
          end_time: string
          id?: string
          pdf_url?: string | null
          rental_rate: number
          return_location: string
          sign_date: string
          start_date: string
          start_time: string
          status?: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          client_id?: string
          company_id?: string
          contract_number?: string
          created_at?: string
          created_by?: string | null
          delivery_location?: string
          deposit?: number
          end_date?: string
          end_time?: string
          id?: string
          pdf_url?: string | null
          rental_rate?: number
          return_location?: string
          sign_date?: string
          start_date?: string
          start_time?: string
          status?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          color: string | null
          company_id: string
          created_at: string
          fuel: string
          id: string
          license_plate: string | null
          make: string
          model: string
          updated_at: string
          vehicle_type: string
          year: string | null
        }
        Insert: {
          color?: string | null
          company_id: string
          created_at?: string
          fuel: string
          id?: string
          license_plate?: string | null
          make: string
          model: string
          updated_at?: string
          vehicle_type: string
          year?: string | null
        }
        Update: {
          color?: string | null
          company_id?: string
          created_at?: string
          fuel?: string
          id?: string
          license_plate?: string | null
          make?: string
          model?: string
          updated_at?: string
          vehicle_type?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
