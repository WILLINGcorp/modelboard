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
      collab_approvals: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          profile_id: string
          status: string
          step_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          profile_id: string
          status?: string
          step_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          status?: string
          step_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collab_approvals_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collab_approvals_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "collab_workflow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      collab_assets: {
        Row: {
          asset_type: string
          asset_url: string
          created_at: string
          id: string
          step_id: string
          updated_at: string
        }
        Insert: {
          asset_type: string
          asset_url: string
          created_at?: string
          id?: string
          step_id: string
          updated_at?: string
        }
        Update: {
          asset_type?: string
          asset_url?: string
          created_at?: string
          id?: string
          step_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collab_assets_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "collab_workflow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      collab_proposals: {
        Row: {
          created_at: string
          id: string
          location: string
          message: string | null
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          message?: string | null
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          message?: string | null
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collab_proposals_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collab_proposals_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collab_workflow_steps: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          proposal_id: string
          status: string
          step_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          proposal_id: string
          status?: string
          step_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          proposal_id?: string
          status?: string
          step_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collab_workflow_steps_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "collab_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      moderators: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      paid_ads: {
        Row: {
          created_at: string
          end_time: string
          id: string
          profile_id: string
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          profile_id: string
          start_time?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          profile_id?: string
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paid_ads_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          media_type: string
          media_url: string
          moderation_comment: string | null
          moderation_status: string
          profile_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          media_type: string
          media_url: string
          moderation_comment?: string | null
          moderation_status?: string
          profile_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          media_type?: string
          media_url?: string
          moderation_comment?: string | null
          moderation_status?: string
          profile_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_likes: {
        Row: {
          created_at: string
          id: string
          portfolio_item_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          portfolio_item_id: string
          profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          portfolio_item_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_likes_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      private_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "private_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_visits: {
        Row: {
          id: string
          visited_at: string
          visited_profile_id: string
          visitor_id: string
        }
        Insert: {
          id?: string
          visited_at?: string
          visited_profile_id: string
          visitor_id: string
        }
        Update: {
          id?: string
          visited_at?: string
          visited_profile_id?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_visits_visited_profile_id_fkey"
            columns: ["visited_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_visits_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_moderation_comment: string | null
          avatar_moderation_status: string
          avatar_url: string | null
          bio: string | null
          brands_worked_with: Json | null
          business_model: Json | null
          created_at: string
          creator_platforms: Json | null
          current_mood: string | null
          current_mood_updated_at: string | null
          display_name: string | null
          endowment: string | null
          eye_color: string | null
          gender: string | null
          hair_color: string | null
          height: string | null
          id: string
          location: string | null
          other_skill: string | null
          preferred_role: string | null
          profile_type: string | null
          roles: Json | null
          sexual_orientation: string | null
          skills: Json | null
          social_media: Json | null
          subscription_end_date: string | null
          subscription_status: string | null
          updated_at: string
          username: string | null
          website: string | null
          weight: string | null
        }
        Insert: {
          avatar_moderation_comment?: string | null
          avatar_moderation_status?: string
          avatar_url?: string | null
          bio?: string | null
          brands_worked_with?: Json | null
          business_model?: Json | null
          created_at?: string
          creator_platforms?: Json | null
          current_mood?: string | null
          current_mood_updated_at?: string | null
          display_name?: string | null
          endowment?: string | null
          eye_color?: string | null
          gender?: string | null
          hair_color?: string | null
          height?: string | null
          id: string
          location?: string | null
          other_skill?: string | null
          preferred_role?: string | null
          profile_type?: string | null
          roles?: Json | null
          sexual_orientation?: string | null
          skills?: Json | null
          social_media?: Json | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
          weight?: string | null
        }
        Update: {
          avatar_moderation_comment?: string | null
          avatar_moderation_status?: string
          avatar_url?: string | null
          bio?: string | null
          brands_worked_with?: Json | null
          business_model?: Json | null
          created_at?: string
          creator_platforms?: Json | null
          current_mood?: string | null
          current_mood_updated_at?: string | null
          display_name?: string | null
          endowment?: string | null
          eye_color?: string | null
          gender?: string | null
          hair_color?: string | null
          height?: string | null
          id?: string
          location?: string | null
          other_skill?: string | null
          preferred_role?: string | null
          profile_type?: string | null
          roles?: Json | null
          sexual_orientation?: string | null
          skills?: Json | null
          social_media?: Json | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      project_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          proposal_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          proposal_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          proposal_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_messages_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "collab_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_features: {
        Row: {
          created_at: string
          feature_type: string
          id: string
          last_used: string | null
          profile_id: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          feature_type: string
          id?: string
          last_used?: string | null
          profile_id: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          feature_type?: string
          id?: string
          last_used?: string | null
          profile_id?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_features_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_plans: {
        Row: {
          created_at: string
          description: string | null
          destination: string
          end_date: string
          id: string
          profile_id: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination: string
          end_date: string
          id?: string
          profile_id: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination?: string
          end_date?: string
          id?: string
          profile_id?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_plans_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
