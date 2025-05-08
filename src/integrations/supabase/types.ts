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
      rentals: {
        Row: {
          client_address: string
          client_email: string | null
          client_id_number: string
          client_name: string
          client_phone: string | null
          client_surname: string
          company_code: string
          company_logo_url: string | null
          company_name: string
          company_theme_color: string | null
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
          total_amount: number
          total_days: number
          updated_at: string
          vehicle_color: string | null
          vehicle_fuel: string
          vehicle_license_plate: string | null
          vehicle_make: string
          vehicle_model: string
          vehicle_type: string
          vehicle_year: string | null
        }
        Insert: {
          client_address: string
          client_email?: string | null
          client_id_number: string
          client_name: string
          client_phone?: string | null
          client_surname: string
          company_code: string
          company_logo_url?: string | null
          company_name: string
          company_theme_color?: string | null
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
          total_amount: number
          total_days: number
          updated_at?: string
          vehicle_color?: string | null
          vehicle_fuel: string
          vehicle_license_plate?: string | null
          vehicle_make: string
          vehicle_model: string
          vehicle_type: string
          vehicle_year?: string | null
        }
        Update: {
          client_address?: string
          client_email?: string | null
          client_id_number?: string
          client_name?: string
          client_phone?: string | null
          client_surname?: string
          company_code?: string
          company_logo_url?: string | null
          company_name?: string
          company_theme_color?: string | null
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
          total_amount?: number
          total_days?: number
          updated_at?: string
          vehicle_color?: string | null
          vehicle_fuel?: string
          vehicle_license_plate?: string | null
          vehicle_make?: string
          vehicle_model?: string
          vehicle_type?: string
          vehicle_year?: string | null
        }
        Relationships: []
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
