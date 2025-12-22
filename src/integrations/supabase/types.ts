export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      commission_records: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          partner_id: string
          payment_amount: number
          payment_id: string | null
          payment_type: string
          referral_id: string
          status: string | null
        }
        Insert: {
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          partner_id: string
          payment_amount: number
          payment_id?: string | null
          payment_type: string
          referral_id: string
          status?: string | null
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          partner_id?: string
          payment_amount?: number
          payment_id?: string | null
          payment_type?: string
          referral_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_records_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_records_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          active_referrals: number | null
          conversion_rate: number | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_login_at: string | null
          last_name: string
          notifications: Json | null
          paid_out: number | null
          payment_details: Json | null
          payment_method: string | null
          pending_balance: number | null
          phone: string | null
          referral_code: string
          referred_by: string | null
          registered_at: string | null
          status: string | null
          telegram: string | null
          tier: string | null
          total_earnings: number | null
          total_referrals: number | null
          updated_at: string | null
        }
        Insert: {
          active_referrals?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_login_at?: string | null
          last_name: string
          notifications?: Json | null
          paid_out?: number | null
          payment_details?: Json | null
          payment_method?: string | null
          pending_balance?: number | null
          phone?: string | null
          referral_code: string
          referred_by?: string | null
          registered_at?: string | null
          status?: string | null
          telegram?: string | null
          tier?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string | null
        }
        Update: {
          active_referrals?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_login_at?: string | null
          last_name?: string
          notifications?: Json | null
          paid_out?: number | null
          payment_details?: Json | null
          payment_method?: string | null
          pending_balance?: number | null
          phone?: string | null
          referral_code?: string
          referred_by?: string | null
          registered_at?: string | null
          status?: string | null
          telegram?: string | null
          tier?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          admin_note: string | null
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          partner_id: string
          partner_note: string | null
          payment_details: string
          payment_method: string
          processed_at: string | null
          requested_at: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          admin_note?: string | null
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          partner_id: string
          partner_note?: string | null
          payment_details: string
          payment_method: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_note?: string | null
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          partner_id?: string
          partner_note?: string | null
          payment_details?: string
          payment_method?: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_clicks: {
        Row: {
          clicked_at: string | null
          id: string
          ip_address: unknown
          partner_id: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown
          partner_id: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown
          partner_id?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          clicked_at: string | null
          commission_earned: number | null
          contacted_at: string | null
          created_at: string | null
          email: string | null
          id: string
          last_payment_at: string | null
          lifetime_binding: boolean | null
          lifetime_value: number | null
          messenger: string | null
          name: string | null
          notes: string | null
          order_value: number | null
          paid_at: string | null
          partner_id: string
          phone: string | null
          plan_selected: string | null
          product: string | null
          referral_code_used: string | null
          registered_at: string | null
          source: string | null
          status: string | null
          total_payments: number | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          volume: string | null
        }
        Insert: {
          clicked_at?: string | null
          commission_earned?: number | null
          contacted_at?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_payment_at?: string | null
          lifetime_binding?: boolean | null
          lifetime_value?: number | null
          messenger?: string | null
          name?: string | null
          notes?: string | null
          order_value?: number | null
          paid_at?: string | null
          partner_id: string
          phone?: string | null
          plan_selected?: string | null
          product?: string | null
          referral_code_used?: string | null
          registered_at?: string | null
          source?: string | null
          status?: string | null
          total_payments?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          volume?: string | null
        }
        Update: {
          clicked_at?: string | null
          commission_earned?: number | null
          contacted_at?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_payment_at?: string | null
          lifetime_binding?: boolean | null
          lifetime_value?: number | null
          messenger?: string | null
          name?: string | null
          notes?: string | null
          order_value?: number | null
          paid_at?: string | null
          partner_id?: string
          phone?: string | null
          plan_selected?: string | null
          product?: string | null
          referral_code_used?: string | null
          registered_at?: string | null
          source?: string | null
          status?: string | null
          total_payments?: number | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: { first_name: string; last_name: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "partner"],
    },
  },
} as const

