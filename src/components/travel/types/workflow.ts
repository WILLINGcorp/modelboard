export interface WorkflowStep {
  id: string;
  step_type: string;
  status: string;
  data: any;
  created_at: string;
}

export interface Proposal {
  id: string;
  status: string;
  message: string | null;
  location: string;
  created_at: string;
  sender: {
    id: string;
    display_name: string | null;
    username: string | null;
  } | null;
  receiver: {
    id: string;
    display_name: string | null;
    username: string | null;
  } | null;
}