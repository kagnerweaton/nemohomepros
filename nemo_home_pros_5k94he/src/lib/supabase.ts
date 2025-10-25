import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      contractor_applications: {
        Row: {
          id: string;
          name: string;
          contact_name: string;
          services: string[];
          phone: string;
          email: string;
          website: string | null;
          service_areas: string[];
          description: string;
          specialties: string[];
          years_experience: number;
          completed_projects: number;
          licensed: boolean;
          insured: boolean;
          specialized_training: string[];
          image_urls: string[] | null;
          status: 'pending' | 'approved' | 'rejected';
          nemo_certified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          contact_name: string;
          services: string[];
          phone: string;
          email: string;
          website?: string | null;
          service_areas: string[];
          description: string;
          specialties: string[];
          years_experience: number;
          completed_projects: number;
          licensed?: boolean;
          insured?: boolean;
          specialized_training?: string[];
          image_urls?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected';
          nemo_certified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          contact_name?: string;
          services?: string[];
          phone?: string;
          email?: string;
          website?: string | null;
          service_areas?: string[];
          description?: string;
          specialties?: string[];
          years_experience?: number;
          completed_projects?: number;
          licensed?: boolean;
          insured?: boolean;
          specialized_training?: string[];
          image_urls?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected';
          nemo_certified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
