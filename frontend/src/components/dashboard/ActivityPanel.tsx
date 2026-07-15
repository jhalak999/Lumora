import { Sparkles } from "lucide-react";

const activities = [
  "Generated script for Nike campaign",
  "Storyboard completed",
  "Voice-over processing finished",
  "Instagram Reel exported",
  "Thumbnail created",
];

export default function ActivityPanel() {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-[#171F34] p-6">

      <h2 className="text-2xl font-bold text-white">
        AI Activity
      </h2>

      <p className="mt-2 text-slate-400">
        Latest AI actions
      </p>

      <div className="mt-8 space-y-5">

        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-start gap-4"
          >
            <div className="rounded-xl bg-slate-800 p-2 text-slate-300">
              <Sparkles size={16} />
            </div>

            <div>
              <p className="text-sm text-white">
                {activity}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Just now
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}