import type { ReactNode } from "react";

interface WorkspaceCardProps {
  title: string;
  children: ReactNode;
}

export default function WorkspaceCard({
  title,
  children,
}: WorkspaceCardProps) {
  return (
    <section className="rounded-[28px] border border-slate-800 bg-[#171F34] p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}