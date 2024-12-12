import type { Json } from './common';

export interface ProfilesTable {
  Row: {
    avatar_url: string | null
    bio: string | null
    created_at: string
    creator_platforms: Json | null
    display_name: string | null
    endowment: string | null
    eye_color: string | null
    gender: string | null
    hair_color: string | null
    height: string | null
    id: string
    location: string | null
    preferred_role: string | null
    roles: string[] | null
    sexual_orientation: string | null
    updated_at: string
    username: string | null
    website: string | null
    weight: string | null
  }
  Insert: {
    avatar_url?: string | null
    bio?: string | null
    created_at?: string
    creator_platforms?: Json | null
    display_name?: string | null
    endowment?: string | null
    eye_color?: string | null
    gender?: string | null
    hair_color?: string | null
    height?: string | null
    id: string
    location?: string | null
    preferred_role?: string | null
    roles?: string[] | null
    sexual_orientation?: string | null
    updated_at?: string
    username?: string | null
    website?: string | null
    weight?: string | null
  }
  Update: {
    avatar_url?: string | null
    bio?: string | null
    created_at?: string
    creator_platforms?: Json | null
    display_name?: string | null
    endowment?: string | null
    eye_color?: string | null
    gender?: string | null
    hair_color?: string | null
    height?: string | null
    id?: string
    location?: string | null
    preferred_role?: string | null
    roles?: string[] | null
    sexual_orientation?: string | null
    updated_at?: string
    username?: string | null
    website?: string | null
    weight?: string | null
  }
  Relationships: []
}