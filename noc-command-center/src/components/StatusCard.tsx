import type { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  variant: 'success' | 'warning' | 'danger';
}

export const StatusCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  variant,
}: StatusCardProps) => {
  const colors = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    danger: 'text-red-500',
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-noc-card p-6 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between">
        <Icon className={colors[variant]} size={24} />
      </div>

      <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-[10px] text-slate-500">{subtext}</p>
    </div>
  );
};
