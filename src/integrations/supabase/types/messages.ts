export interface PrivateMessagesTable {
  Row: {
    id: string
    sender_id: string
    receiver_id: string
    content: string
    read: boolean
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    sender_id: string
    receiver_id: string
    content: string
    read?: boolean
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    sender_id?: string
    receiver_id?: string
    content?: string
    read?: boolean
    created_at?: string
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