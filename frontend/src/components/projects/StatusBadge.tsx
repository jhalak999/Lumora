interface StatusBadgeProps {
  status: string;
}

const styles = {
  draft: "bg-amber-500/15 text-amber-300",
  generating: "bg-blue-500/15 text-blue-300",
  completed: "bg-emerald-500/15 text-emerald-300",
  failed: "bg-red-500/15 text-red-300",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}