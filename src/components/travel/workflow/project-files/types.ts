export interface Asset {
  id: string;
  asset_type: string;
  asset_url: string;
  created_at: string;
}

export interface WorkflowStepWithAssets {
  id: string;
  step_type: string;
  assets?: Asset[];
}