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
      kiel_portfolio_activities: {
        Row: {
          activity_date: string
          category: string
          created_at: string | null
          description: string
          id: number
          image_url: string
          is_featured: boolean | null
          location: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          activity_date: string
          category?: string
          created_at?: string | null
          description: string
          id?: number
          image_url: string
          is_featured?: boolean | null
          location?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          activity_date?: string
          category?: string
          created_at?: string | null
          description?: string
          id?: number
          image_url?: string
          is_featured?: boolean | null
          location?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kiel_portfolio_education: {
        Row: {
          id: number
          image_url: string | null
          provider: string
        }
        Insert: {
          id?: number
          image_url?: string | null
          provider: string
        }
        Update: {
          id?: number
          image_url?: string | null
          provider?: string
        }
        Relationships: []
      }
      kiel_portfolio_education_courses: {
        Row: {
          education_id: number
          id: number
          link: string | null
          name: string
        }
        Insert: {
          education_id: number
          id?: number
          link?: string | null
          name: string
        }
        Update: {
          education_id?: number
          id?: number
          link?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "kiel_portfolio_education_courses_education_id_fkey"
            columns: ["education_id"]
            isOneToOne: false
            referencedRelation: "kiel_portfolio_education"
            referencedColumns: ["id"]
          },
        ]
      }
      kiel_portfolio_projects: {
        Row: {
          demo_link: string
          description: string
          github_link: string
          id: number
          image: string
          tech: string[]
          title: string
        }
        Insert: {
          demo_link: string
          description: string
          github_link: string
          id?: number
          image: string
          tech?: string[]
          title: string
        }
        Update: {
          demo_link?: string
          description?: string
          github_link?: string
          id?: number
          image?: string
          tech?: string[]
          title?: string
        }
        Relationships: []
      }
      kiel_portfolio_services: {
        Row: {
          description: string
          features: string[]
          icon: string
          id: number
          title: string
        }
        Insert: {
          description: string
          features?: string[]
          icon: string
          id?: number
          title: string
        }
        Update: {
          description?: string
          features?: string[]
          icon?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      kiel_portfolio_skills: {
        Row: {
          category: string
          icon: string
          id: number
          level: number
          name: string
        }
        Insert: {
          category: string
          icon: string
          id?: number
          level: number
          name: string
        }
        Update: {
          category?: string
          icon?: string
          id?: number
          level?: number
          name?: string
        }
        Relationships: []
      }
      tame_unbfnd_comments: {
        Row: {
          content: string
          created_at: string
          id: number
          post_id: number | null
          user_email: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_email: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          post_id?: number | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "tame_unbfnd_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "tame_unbfnd_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      tame_unbfnd_follows: {
        Row: {
          created_at: string
          follower_email: string
          following_email: string
          id: number
        }
        Insert: {
          created_at?: string
          follower_email: string
          following_email: string
          id?: number
        }
        Update: {
          created_at?: string
          follower_email?: string
          following_email?: string
          id?: number
        }
        Relationships: []
      }
      tame_unbfnd_likes: {
        Row: {
          created_at: string
          id: number
          post_id: number | null
          user_email: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_email: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "tame_unbfnd_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "tame_unbfnd_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      tame_unbfnd_posts: {
        Row: {
          caption: string | null
          created_at: string
          id: number
          image_url: string
          likes_count: number | null
          updated_at: string
          user_email: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: number
          image_url: string
          likes_count?: number | null
          updated_at?: string
          user_email: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: number
          image_url?: string
          likes_count?: number | null
          updated_at?: string
          user_email?: string
        }
        Relationships: []
      }
      tame_unbfnd_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: number
          updated_at: string
          user_email: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: number
          updated_at?: string
          user_email: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: number
          updated_at?: string
          user_email?: string
          username?: string
        }
        Relationships: []
      }
      tameverse_products: {
        Row: {
          color: string
          created_at: string | null
          description: string
          features: string[] | null
          hero_image: string | null
          icon_name: string
          id: string
          tagline: string | null
          title: string
          use_cases: string[] | null
        }
        Insert: {
          color: string
          created_at?: string | null
          description: string
          features?: string[] | null
          hero_image?: string | null
          icon_name: string
          id?: string
          tagline?: string | null
          title: string
          use_cases?: string[] | null
        }
        Update: {
          color?: string
          created_at?: string | null
          description?: string
          features?: string[] | null
          hero_image?: string | null
          icon_name?: string
          id?: string
          tagline?: string | null
          title?: string
          use_cases?: string[] | null
        }
        Relationships: []
      }
      tameverse_stats: {
        Row: {
          created_at: string | null
          icon_name: string
          id: string
          label: string
          value: string
        }
        Insert: {
          created_at?: string | null
          icon_name: string
          id?: string
          label: string
          value: string
        }
        Update: {
          created_at?: string | null
          icon_name?: string
          id?: string
          label?: string
          value?: string
        }
        Relationships: []
      }
      tameverse_team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          image: string | null
          name: string
          role: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
          role: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
          role?: string
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
