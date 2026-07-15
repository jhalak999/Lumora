export interface Generation {
  id: string;
  type: string;
  status: string;
  content: string;
  provider: string;
  instruction: string | null;
  project_id: string;
  created_at: string;
  updated_at: string;
}