export interface CollabProposalsTable {
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
    }
  ]
}