import {
  History,
  Sparkles,
  Pencil,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGenerations } from "@/hooks/useGenerations";
import { useRestoreGeneration } from "@/hooks/useRestoreGeneration";
import { ScrollArea } from "@/components/ui/scroll-area";
interface VersionHistoryProps {
  projectId: string;
  onSelect: (content: string) => void;
}

export default function VersionHistory({
  projectId,
  onSelect,
}: VersionHistoryProps) {
  const queryClient = useQueryClient();
  const restoreMutation =
    useRestoreGeneration();
  const {
    data: generations,
    isLoading,
  } = useGenerations(projectId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400">
        Loading versions...
      </div>
    );
  }

  if (!generations?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
        <History className="h-8 w-8" />
        <p>No versions yet.</p>
      </div>
    );
  }

  return (
  <ScrollArea className="h-[85vh] pr-2">
    <div className="space-y-3">

      {generations.map((generation, index) => {

        const isInitial =
          generation.instruction ===
          "Initial Generation";

        return (
          <div
            key={generation.id}
            className="rounded-2xl border border-slate-700 bg-[#111827] p-4"
          >

            <button
              onClick={() =>
                onSelect(generation.content)
              }
              className="w-full text-left"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  {isInitial ? (
                    <Sparkles
                      size={16}
                      className="text-indigo-400"
                    />
                  ) : (
                    <Pencil
                      size={16}
                      className="text-amber-400"
                    />
                  )}

                  <span className="font-medium text-white">
                    {generation.instruction ??
                      "Legacy Version"}
                  </span>

                </div>

                {index === 0 && (
                  <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300">
                    Latest
                  </span>
                )}

              </div>

              <p className="mt-2 text-xs text-slate-400">
                {new Date(
                  generation.created_at,
                ).toLocaleString()}
              </p>

            </button>

            <Button
              className="mt-4 w-full"
              variant="secondary"
              disabled={
                restoreMutation.isPending
              }
              onClick={async () => {
                try {
                  const restored =
                    await restoreMutation.mutateAsync(
                      generation.id,
                    );

                  onSelect(restored.content);

                  await queryClient.invalidateQueries({
                    queryKey: [
                      "latest-generation",
                      projectId,
                    ],
                  });

                  await queryClient.invalidateQueries({
                    queryKey: [
                      "generations",
                      projectId,
                    ],
                  });

                  toast.success(
                    "Version restored.",
                  );
                } catch {
                  toast.error(
                    "Restore failed.",
                  );
                }
              }}
            >
              <RotateCcw
                size={16}
                className="mr-2"
              />

              Restore
            </Button>

          </div>
        );
      })}

        </div>
    </ScrollArea>
    );
}