'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpenText, BriefcaseBusiness, Building2, CheckSquare2, FileBarChart,
  Files, GitCompareArrows, LayoutDashboard, Scale, Settings, Sparkles
} from 'lucide-react';

const groups = [
  { label: 'Workspace', items: [
    ['Dashboard', '/dashboard', LayoutDashboard],
    ['Documents', '/documents', Files],
    ['Matters', '/matters', BriefcaseBusiness],
    ['Clients', '/clients', Building2],
  ]},
  { label: 'Intelligence', items: [
    ['Review Studio', '/documents/demo-contract', Scale],
    ['Compare', '/comparison', GitCompareArrows],
    ['Clause Library', '/clauses', BookOpenText],
    ['Tasks & Approvals', '/tasks', CheckSquare2],
    ['Reports', '/reports', FileBarChart],
  ]},
  { label: 'Admin', items: [['Settings', '/settings', Settings]] },
] as const;

export function SidebarNavigation() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-[#0b1f33] text-slate-200 md:flex md:flex-col">
      <div className="px-4 py-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-400/15 text-teal-300"><Sparkles size={18} /></div>
            <div className="min-w-0"><div className="truncate text-sm font-semibold text-white">Acme Legal</div><div className="text-[11px] text-slate-400">Enterprise workspace</div></div>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{group.label}</div>
            <div className="space-y-1">
              {group.items.map(([label, href, Icon]) => {
                const active = href === '/dashboard' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
                return <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-300 hover:bg-white/8 hover:text-white'}`}><Icon size={17} />{label}</Link>;
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-slate-500">CounselFlow Studio • v1.2</div>
    </aside>
  );
}
