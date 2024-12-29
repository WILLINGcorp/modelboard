export interface TravelPlan {
  id: string;
  profile_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}