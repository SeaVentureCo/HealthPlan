export type Database = {
  public: {
    Tables: {
      sessions: {
        Row: {
          id: string;
          week_number: number;
          day_index: number;
          completed: boolean;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          week_number: number;
          day_index: number;
          completed?: boolean;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sessions"]["Insert"]>;
      };
      weight_log: {
        Row: {
          id: string;
          week_number: number;
          weight_kg: number | null;
          logged_at: string;
        };
        Insert: {
          id?: string;
          week_number: number;
          weight_kg: number | null;
          logged_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["weight_log"]["Insert"]>;
      };
      daily_checklist: {
        Row: {
          id: string;
          item_index: number;
          date: string;
          completed: boolean;
        };
        Insert: {
          id?: string;
          item_index: number;
          date?: string;
          completed?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["daily_checklist"]["Insert"]>;
      };
      setup_checklist: {
        Row: {
          id: string;
          item_index: number;
          completed: boolean;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          item_index: number;
          completed?: boolean;
          completed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["setup_checklist"]["Insert"]>;
      };
    };
  };
};
