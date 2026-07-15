import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import ProjectForm from "./ProjectForm";

import { useCreateProject } from "@/hooks/useCreateProject";

export default function CreateProjectDialog() {
  const [open, setOpen] = useState(false);

  const mutation = useCreateProject();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
    <Button
      onClick={() => setOpen(true)}
      size="lg"
      className="rounded-2xl"
    >
      New Project
    </Button>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Project
          </DialogTitle>

        </DialogHeader>

        <ProjectForm
          isLoading={mutation.isPending}
          onSubmit={async (values) => {
            console.log("FORM SUBMITTED");
            console.log(values);

            try {
              await mutation.mutateAsync(values);

              toast.success("Project created.");

              setOpen(false);
            } catch {
              toast.error("Could not create project.");
            }
          }}
        />

      </DialogContent>

    </Dialog>
  );
}