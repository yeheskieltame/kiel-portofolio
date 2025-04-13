
import { Database as SupabaseGeneratedDb } from "@/integrations/supabase/types";

// Extend the default Supabase generated database type with our tables
export interface Database extends SupabaseGeneratedDb {
  public: {
    Tables: {
      kiel_portfolio_services: {
        Row: {
          id: number;
          title: string;
          description: string;
          icon: string;
          features: string[];
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          icon: string;
          features: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          icon?: string;
          features?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      kiel_portfolio_projects: {
        Row: {
          id: number;
          title: string;
          description: string;
          image: string;
          demo_link: string;
          github_link: string;
          tech: string[];
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          image: string;
          demo_link: string;
          github_link: string;
          tech: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          image?: string;
          demo_link?: string;
          github_link?: string;
          tech?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      kiel_portfolio_skills: {
        Row: {
          id: number;
          name: string;
          icon: string;
          level: number;
          category: 'programming' | 'ml' | 'webdev';
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          name: string;
          icon: string;
          level: number;
          category: 'programming' | 'ml' | 'webdev';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          icon?: string;
          level?: number;
          category?: 'programming' | 'ml' | 'webdev';
          created_at?: string;
          updated_at?: string;
        };
      };
      kiel_portfolio_education: {
        Row: {
          id: number;
          provider: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          provider: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          provider?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      kiel_portfolio_education_courses: {
        Row: {
          id: number;
          education_id: number;
          name: string;
          link: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          education_id: number;
          name: string;
          link: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          education_id?: number;
          name?: string;
          link?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      kiel_portfolio_admins: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: Record<string, unknown>;
    };
    CompositeTypes: {
      [key: string]: Record<string, unknown>;
    };
  };
}
