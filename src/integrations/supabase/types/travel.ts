export interface TravelPlansTable {
  Row: {
    id: string
    profile_id: string
    destination: string
    start_date: string
    end_date: string
    description: string | null
    status: string
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    profile_id: string
    destination: string
    start_date: string
    end_date: string
    description?: string | null
    status?: string
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    profile_id?: string
    destination?: string
    start_date?: string
    end_date?: string
    description?: string | null
    status?: string
    created_at?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "travel_plans_profile_id_fkey"
      columns: ["profile_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
  ]
}