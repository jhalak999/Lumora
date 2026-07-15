import {
  FolderOpen,
  Image,
  LayoutDashboard,
  Settings,
  Sparkles,
  FileText,
} from "lucide-react";

import Logo from "./Logo";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Projects",
    icon: FolderOpen,
  },
  {
    title: "AI Studio",
    icon: Sparkles,
  },
  {
    title: "Templates",
    icon: FileText,
  },
  {
    title: "Assets",
    icon: Image,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col rounded-[32px] bg-[#12192B] p-6 shadow-2xl">

      <Logo />

      <nav className="mt-10 space-y-2">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                item.active
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}

      </nav>

      <div className="mt-auto rounded-2xl bg-[#1A233A] p-5">

        <p className="text-sm text-slate-400">
          Current plan
        </p>

        <h3 className="mt-1 text-lg font-semibold text-white">
          Pro
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Unlimited AI generations and project storage.
        </p>

      </div>

    </aside>
  );
}