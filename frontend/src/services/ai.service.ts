import { api }  from "@/lib/api";
import type { Generation } from "@/types/generation";
import type {
  GenerateScriptRequest,
  GenerateScriptResponse,
} from "@/types/ai";

export async function generateScript(
  data: GenerateScriptRequest,
): Promise<GenerateScriptResponse> {
  const response = await api.post(
    "/ai/generate-script",
    data,
  );

  return response.data;
}

export interface EditScriptRequest {
  project_id: string;
  script: string;
  instruction: string;
}

export interface EditScriptResponse {
  id: string;
  script: string;
}

export async function editScript(
  data: EditScriptRequest,
): Promise<EditScriptResponse> {
  const response = await api.post(
    "/ai/edit-script",
    data,
  );
  return response.data;
}

export async function getGenerations(
  projectId: string,
): Promise<Generation[]> {
  const response = await api.get(
    `/projects/${projectId}/generations`,
  );
  return response.data;
}

export async function restoreGeneration(
  generationId: string,
) {
  const response = await api.post(
    `/projects/generations/${generationId}/restore`,
  );
  return response.data;
}