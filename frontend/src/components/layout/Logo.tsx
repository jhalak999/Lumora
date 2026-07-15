export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-lg font-bold text-white shadow-sm">
        L
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          Lumora
        </h1>

        <p className="text-xs text-slate-400">
          AI Video Studio
        </p>
      </div>
    </div>
  );
}