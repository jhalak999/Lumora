import { useQuery } from "@tanstack/react-query";

import { getLatestGeneration } from "@/services/generation.service";

export function useLatestGeneration(
  projectId: string,
) {
  return useQuery({
    queryKey: ["latest-generation", projectId],
    queryFn: () => getLatestGeneration(projectId),
    enabled: !!projectId,
  });
}