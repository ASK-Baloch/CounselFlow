'use client';

import Link from 'next/link';
import { Bell, ChevronDown, Search, ShieldCheck } from 'lucide-react';

export function DashboardNavbar() {
  return (
    <header className="z-30 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <Link href="/dashboard" className="flex min-w-[220px] items-center gap-2.5 font-semibold tracking-tight text-[#0b1f33]">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1f33] text-white"><span className="text-sm font-bold">CF</span></div>
        <div><div className="text-lg leading-5">CounselFlow</div><div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">Legal Intelligence</div></div>
      </Link>
      <div className="mx-auto hidden w-full max-w-xl lg:block">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
          <Search size={16} /><input className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search documents, matters, clients or clauses…" /><span className="rounded-md border bg-white px-1.5 py-0.5 text-[10px]">⌘K</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 xl:flex"><ShieldCheck size={14} />Workspace secure</div>
        <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"><Bell size={17} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" /></button>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#123a5a] text-xs font-semibold text-white">A</div>
          <div className="hidden text-left sm:block"><div className="text-xs font-semibold text-slate-800">Ahmed</div><div className="text-[10px] text-slate-400">Legal Analyst</div></div><ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
