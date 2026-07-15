import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import WorkspaceCard from "@/components/projects/WorkspaceCard";
import StatusBadge from "@/components/projects/StatusBadge";
import VersionHistory from "@/components/projects/VersionHistory";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProject";
import { useGenerateScript } from "@/hooks/useGenerateScript";
import { useLatestGeneration } from "@/hooks/useLatestGeneration";
import { useEditScript } from "@/hooks/useEditScript";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id ?? "");
  const generateMutation = useGenerateScript();
  const editMutation = useEditScript();
  const { data: latestGeneration } =
    useLatestGeneration(id ?? "");
  const queryClient = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");
  const [instruction, setInstruction] = useState("");
  useEffect(() => {
    if (latestGeneration) {
      setScript(latestGeneration.content);
    }
  }, [latestGeneration]);
  if (isLoading) {
    return (
      <AppLayout>
        <p className="text-slate-400">
          Loading project...
        </p>
      </AppLayout>
    );
  }
  if (!project) {
    return (
      <AppLayout>
        <p className="text-red-400">
          Project not found.
        </p>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="space-y-10">
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-slate-400">
              {project.niche} • {project.language} • {project.platform}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-700 bg-transparent px-5 text-sm font-medium transition hover:bg-slate-800"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[420px] border-slate-800 bg-[#0B1120]"
            >
              <SheetHeader>
                <SheetTitle className="text-white">
                  Version History
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <VersionHistory
                  projectId={id ?? ""}
                  onSelect={(content) =>
                    setScript(content)
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
          <Button
            size="lg"
            className="rounded-2xl"
            disabled={generateMutation.isPending}
            onClick={async () => {
              try {
                await generateMutation.mutateAsync({
                  project_id: project.id,
                  prompt,
                });
                await queryClient.invalidateQueries({
                  queryKey: ["latest-generation", id],
                });
                await queryClient.invalidateQueries({
                  queryKey: ["generations", id],
                });
                toast.success("Script generated.");
              } catch {
                toast.error("Generation failed.");
              }
            }}
          >
            {generateMutation.isPending
              ? "Generating..."
              : "Generate Script"}
          </Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Prompt */}
          <div className="lg:col-span-2">
          <WorkspaceCard title="Prompt">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-96 w-full resize-none rounded-2xl border border-slate-700 bg-[#111827] p-5 text-white outline-none"
              placeholder="Describe the content you want AI to generate..."
            />
          </WorkspaceCard>
          </div>
          {/* AI Output */}
          <div className="lg:col-span-3">
          <WorkspaceCard title="AI Output">
            <div className="space-y-4">
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="h-72 w-full resize-none rounded-2xl border border-slate-700 bg-[#111827] p-5 text-white outline-none"
                placeholder="Generated script..."
              />
              <textarea
                value={instruction}
                onChange={(e) =>
                  setInstruction(e.target.value)
                }
                rows={3}
                placeholder="e.g. Make it more emotional, shorter, funnier..."
                className="w-full resize-none rounded-2xl border border-slate-700 bg-[#111827] p-4 text-white outline-none"
              />
              <Button
                className="w-full rounded-2xl"
                disabled={editMutation.isPending}
                onClick={async () => {
                  try {
                    await editMutation.mutateAsync({
                      project_id: project.id,
                      script,
                      instruction,
                    });
                    await queryClient.invalidateQueries({
                      queryKey: ["latest-generation", id],
                    });
                    await queryClient.invalidateQueries({
                      queryKey: ["generations", id],
                    });
                    setInstruction("");
                    toast.success("Script updated.");
                  } catch {
                    toast.error("Editing failed.");
                  }
                }}
              >
                {editMutation.isPending
                  ? "Editing..."
                  : "✨ Edit with AI"}
                    </Button>
                    </div>
                  </WorkspaceCard>
                  </div>
        </div>
      </div>
    </AppLayout>
  );
}