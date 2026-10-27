export function StatusPill({ value }: { value: string }) {
  const v = value.toLowerCase();
  const cls = v.includes('high') || v.includes('overdue') ? 'bg-rose-50 text-rose-700 ring-rose-100' :
    v.includes('medium') || v.includes('review') || v.includes('negotiation') ? 'bg-amber-50 text-amber-700 ring-amber-100' :
    v.includes('approved') || v.includes('ready') || v.includes('low') || v.includes('preferred') ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' :
    'bg-slate-100 text-slate-600 ring-slate-200';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${cls}`}>{value}</span>;
}
