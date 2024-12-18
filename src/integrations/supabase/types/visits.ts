export interface ProfileVisitsTable {
  Row: {
    id: string;
    visitor_id: string;
    visited_profile_id: string;
    visited_at: string;
  };
  Insert: {
    id?: string;
    visitor_id: string;
    visited_profile_id: string;
    visited_at?: string;
  };
  Update: {
    id?: string;
    visitor_id?: string;
    visited_profile_id?: string;
    visited_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "profile_visits_visitor_id_fkey";
      columns: ["visitor_id"];
      isOneToOne: false;
      referencedRelation: "profiles";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "profile_visits_visited_profile_id_fkey";
      columns: ["visited_profile_id"];
      isOneToOne: false;
      referencedRelation: "profiles";
      referencedColumns: ["id"];
    }
  ];
}