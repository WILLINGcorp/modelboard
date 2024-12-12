export interface ProfilesTable {
  Row: {
    id: string
    username: string | null
    display_name: string | null
    bio: string | null
    location: string | null
    website: string | null
    created_at: string
    updated_at: string
    avatar_url: string | null
    creator_platforms: Json | null
    roles: string[] | null
    gender: string | null
    height: string | null
    weight: string | null
    eye_color: string | null
    hair_color: string | null
    endowment: string | null
    sexual_orientation: string | null
    preferred_role: string | null
  }
  Insert: {
    id: string
    username?: string | null
    display_name?: string | null
    bio?: string | null
    location?: string | null
    website?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
    creator_platforms?: Json | null
    roles?: string[] | null
    gender?: string | null
    height?: string | null
    weight?: string | null
    eye_color?: string | null
    hair_color?: string | null
    endowment?: string | null
    sexual_orientation?: string | null
    preferred_role?: string | null
  }
  Update: {
    id?: string
    username?: string | null
    display_name?: string | null
    bio?: string | null
    location?: string | null
    website?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
    creator_platforms?: Json | null
    roles?: string[] | null
    gender?: string | null
    height?: string | null
    weight?: string | null
    eye_color?: string | null
    hair_color?: string | null
    endowment?: string | null
    sexual_orientation?: string | null
    preferred_role?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "profiles_id_fkey"
      columns: ["id"]
      isOneToOne: true
      referencedRelation: "users"
      referencedColumns: ["id"]
    }
  ]
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]