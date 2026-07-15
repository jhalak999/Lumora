import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-[32px] border border-slate-800 bg-[#171F34] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          {title}
        </p>
        

        <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
          <Icon size={20} />
        </div>

      </div>

      <h2 className="mt-8 text-5xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}