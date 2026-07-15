import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createProjectSchema,
  type CreateProjectValues,
} from "@/lib/project-validator";

interface ProjectFormProps {
  onSubmit: (values: CreateProjectValues) => void;
  isLoading: boolean;
}

export default function ProjectForm({
  onSubmit,
  isLoading,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),

    defaultValues: {
      language: "English",
      platform: "YouTube",
    },
  });

  return (
      <form
        onSubmit={handleSubmit(
          onSubmit,
          (errors) => {
            console.log("VALIDATION FAILED");
            console.log(errors);
          }
        )}
        className="space-y-5"
      >
      <div className="space-y-2">
        <Label>Project Title</Label>

        <Input
          {...register("title")}
          placeholder="Nike Summer Campaign"
        />

        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Niche</Label>

        <Input
          {...register("niche")}
          placeholder="Technology"
        />

        {errors.niche && (
          <p className="text-sm text-destructive">
            {errors.niche.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Language</Label>

        <Input
          {...register("language")}
        />
      </div>

      <div className="space-y-2">
        <Label>Platform</Label>

        <Input
          {...register("platform")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}