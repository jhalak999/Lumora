import { useMutation } from "@tanstack/react-query";

import {
  editScript,
  type EditScriptRequest,
} from "@/services/ai.service";

export function useEditScript() {
  return useMutation({
    mutationFn: (data: EditScriptRequest) =>
      editScript(data),
  });
}