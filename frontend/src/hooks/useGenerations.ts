import { useQuery } from "@tanstack/react-query";

import { getGenerations } from "@/services/ai.service";

export function useGenerations(
  projectId: string,
) {
  return useQuery({
    queryKey: ["generations", projectId],

    queryFn: () => getGenerations(projectId),

    enabled: !!projectId,
  });
}