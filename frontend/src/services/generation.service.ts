import { api } from "@/lib/api";

export interface GenerationResponse {
  id: string;
  type: string;
  status: string;
  content: string;
  provider: string;
  project_id: string;
  created_at: string;
  updated_at: string;
}

export async function getLatestGeneration(
  projectId: string,
): Promise<GenerationResponse> {
  const response = await api.get(
    `/projects/${projectId}/generations/latest`,
  );

  return response.data;
}