export interface Project {
  id: string;
  title: string;
  niche: string;
  language: string;
  platform: string;
  status: "draft" | "generating" | "completed" | "failed";
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  title: string;
  niche: string;
  language: string;
  platform: string;
}