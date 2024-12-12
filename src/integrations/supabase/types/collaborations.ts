export interface CollabProposalsTable {
  Row: {
    id: string
    sender_id: string
    receiver_id: string
    status: string
    message: string | null
    created_at: string
    updated_at: string
    location: string
  }
  Insert: {
    id?: string
    sender_id: string
    receiver_id: string
    status?: string
    message?: string | null
    created_at?: string
    updated_at?: string
    location: string
  }
  Update: {
    id?: string
    sender_id?: string
    receiver_id?: string
    status?: string
    message?: string | null
    created_at?: string
    updated_at?: string
    location?: string
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
    }
  ]
}