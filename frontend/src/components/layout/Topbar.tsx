import {
  Bell,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between rounded-[32px] bg-[#12192B] px-8 shadow-xl">

      <div className="flex items-center gap-3 rounded-3xl bg-[#18233D] px-4 py-3">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          placeholder="Search projects..."
          className="bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />

      </div>

      <div className="flex items-center gap-5">

        <button className="rounded-2xl bg-[#1A233A] p-3 text-slate-300 transition hover:bg-[#232D47]">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
            J
          </div>

          <div>

            <p className="text-sm font-semibold text-white">
              Jhalak
            </p>

            <p className="text-xs text-slate-400">
              AI Engineer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}