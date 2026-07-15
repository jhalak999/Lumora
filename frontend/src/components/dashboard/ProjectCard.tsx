import { ArrowRight, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface ProjectCardProps {
  id: string;
  title: string;
  status: string;
  updated: string;
}

const statusColors = {
  draft:
    "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  generating:
    "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
  completed:
    "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  failed:
    "bg-red-500/10 text-red-300 border border-red-500/20",
};

export default function ProjectCard({
  id,
  title,
  status,
  updated,
}: ProjectCardProps) {
  const navigate = useNavigate();
  return (
    <div
  onClick={() => navigate(`/projects/${id}`)}
  className="group cursor-pointer flex items-center justify-between rounded-[28px] border border-slate-800 bg-[#171F34] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl"
>

      <div className="space-y-4">

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[status as keyof typeof statusColors]
          }`}
        >
          {status}
        </span>

        <h3 className="text-2xl font-semibold text-white">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock3 size={16} />
          {updated}
        </div>

      </div>

      <div className="rounded-2xl bg-slate-800 p-4 transition group-hover:bg-indigo-500">
        <ArrowRight
          className="text-slate-300 group-hover:text-white"
          size={20}
        />
      </div>

    </div>
  );
}