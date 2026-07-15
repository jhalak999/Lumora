import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Project title must be at least 3 characters."),

  niche: z
    .string()
    .min(2, "Please enter a niche."),

  language: z.string(),

  platform: z.string(),
});

export type CreateProjectValues =
  z.infer<typeof createProjectSchema>;