export interface PortfolioItemsTable {
  Row: {
    created_at: string
    description: string | null
    id: string
    media_type: string
    media_url: string
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
    }
  ]
}