import type { LucideIcon } from 'lucide-react';

export function MetricCard({ label, value, detail, icon: Icon, tone = 'navy' }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: 'navy' | 'teal' | 'amber' | 'rose' }) {
  const tones = {
    navy: 'bg-slate-950 text-white',
    teal: 'bg-teal-50 text-teal-800',
    amber: 'bg-amber-50 text-amber-800',
    rose: 'bg-rose-50 text-rose-800',
  };
  return (
    <div className="cf-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={18} /></div>
        <span className="text-[11px] font-medium text-slate-400">LIVE</span>
      </div>
      <div className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{label}</div>
      <div className="mt-2 text-xs text-slate-500">{detail}</div>
    </div>
  );
}
