import { useMutation } from "@tanstack/react-query";

import { generateScript } from "@/services/ai.service";

export function useGenerateScript() {
  return useMutation({
    mutationFn: generateScript,
  });
}