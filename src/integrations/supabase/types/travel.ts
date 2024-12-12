export interface TravelPlansTable {
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
    }
  ]
}