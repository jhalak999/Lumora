export interface GenerateScriptRequest {
  project_id: string;
  prompt: string;
}
export interface GenerateScriptResponse {
  id: string;
  script: string;
}