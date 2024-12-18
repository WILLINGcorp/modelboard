import type { Database } from "./common";

export interface PrivateMessagesTable {
  Row: {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    read: boolean;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    read?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    sender_id?: string;
    receiver_id?: string;
    content?: string;
    read?: boolean;
    created_at?: string;
    updated_at?: string;
  };
}

export interface ProjectMessagesTable {
  Row: {
    id: string;
    proposal_id: string;
    sender_id: string;
    content: string;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    proposal_id: string;
    sender_id: string;
    content: string;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    proposal_id?: string;
    sender_id?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
  };
}

export type { Database };