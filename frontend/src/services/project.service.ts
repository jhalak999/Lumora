import { api } from "@/lib/api";
import type {
  CreateProjectRequest,
  Project,
} from "@/types/project";

export async function createProject(
  data: CreateProjectRequest,
): Promise<Project> {
  const response = await api.post(
    "/projects",
    data,
  );

  return response.data;
}

export async function getProjects(): Promise<Project[]> {
  const response = await api.get("/projects");

  return response.data;
}
export async function getProject(
  id: string,
): Promise<Project> {
  const response = await api.get(`/projects/${id}`);

  return response.data;
}