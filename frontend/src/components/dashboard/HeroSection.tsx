import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
export default function HeroSection() {
  return (
    <section className="flex items-center justify-between">

      <div>

        <p className="text-sm uppercase tracking-[0.25em] text-indigo-400">
          Dashboard
        </p>

        <h1 className="mt-3 text-6xl font-bold text-white">
          Welcome back, Jhalak
        </h1>

        <p className="mt-6 max-w-2xl text-slate-400 leading-7">
          Build AI-powered video content, manage your projects,
          and generate scripts, storyboards and assets from one
          workspace.
        </p>

      </div>

<CreateProjectDialog />

    </section>
  );
}