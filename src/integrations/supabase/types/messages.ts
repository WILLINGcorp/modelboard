export interface PrivateMessagesTable {
  Row: {
    content: string
    created_at: string
    id: string
    read: boolean
    receiver_id: string
    sender_id: string
    updated_at: string
  }
  Insert: {
    content: string
    created_at?: string
    id?: string
    read?: boolean
    receiver_id: string
    sender_id: string
    updated_at?: string
  }
  Update: {
    content?: string
    created_at?: string
    id?: string
    read?: boolean
    receiver_id?: string
    sender_id?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "private_messages_receiver_id_fkey"
      columns: ["receiver_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "private_messages_sender_id_fkey"
      columns: ["sender_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
  ]
}