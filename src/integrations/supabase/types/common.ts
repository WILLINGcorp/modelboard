import type { CollabProposalsTable } from './collaborations';
import type { PortfolioItemsTable } from './portfolio';
import type { PrivateMessagesTable, ProjectMessagesTable } from './messages';
import type { ProfilesTable } from './profiles';
import type { TravelPlansTable } from './travel';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collab_proposals: CollabProposalsTable;
      portfolio_items: PortfolioItemsTable;
      private_messages: PrivateMessagesTable;
      project_messages: ProjectMessagesTable;
      profiles: ProfilesTable;
      travel_plans: TravelPlansTable;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}