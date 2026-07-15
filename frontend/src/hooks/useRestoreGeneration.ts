import { useMutation } from "@tanstack/react-query";

import { restoreGeneration } from "@/services/ai.service";

export function useRestoreGeneration() {
  return useMutation({
    mutationFn: (generationId: string) =>
      restoreGeneration(generationId),
  });
}