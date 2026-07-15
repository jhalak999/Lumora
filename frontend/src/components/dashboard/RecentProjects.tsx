import { useProjects } from "@/hooks/useProjects";

import ProjectCard from "./ProjectCard";

export default function RecentProjects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section>
        <h2 className="text-3xl font-bold text-white">
          Recent Projects
        </h2>

        <p className="mt-2 text-slate-400">
          Loading...
        </p>
      </section>
    );
  }

  if (!projects?.length) {
    return (
      <section>
        <h2 className="text-3xl font-bold text-white">
          Recent Projects
        </h2>

        <p className="mt-2 text-slate-400">
          Continue where you left off.
        </p>

        <div className="mt-8 rounded-[28px] border border-dashed border-slate-700 p-12 text-center">
          <h3 className="text-xl font-semibold text-white">
            No projects yet
          </h3>

          <p className="mt-3 text-slate-400">
            Create your first AI project to get started.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Recent Projects
          </h2>

          <p className="mt-2 text-slate-400">
            Continue where you left off.
          </p>
        </div>

        <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-500 hover:text-white">
          View all
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
    <ProjectCard
      id={project.id}
      title={project.title}
      status={project.status}
      updated={new Date(project.updated_at).toLocaleDateString()}
    />
        ))}
      </div>
    </section>
  );
}