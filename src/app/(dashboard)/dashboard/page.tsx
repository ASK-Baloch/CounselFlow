import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, FileText, ShieldAlert, Sparkles, UploadCloud } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusPill } from '@/components/ui/StatusPill';
import { activity, matters, reviewActivity } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1500px] p-5 lg:p-8">
      <PageHeader eyebrow="Workspace overview" title="Good evening, Zainab" description="Your contract review pipeline, risk posture and approvals at a glance."
        actions={<><Link href="/documents" className="cf-btn-secondary"><UploadCloud size={16}/>Add document</Link><Link href="/documents/demo-contract" className="cf-btn-primary"><Sparkles size={16}/>Open AI Review</Link></>} />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active matters" value="12" detail="3 due this week" icon={BriefcaseBusiness} tone="navy" />
        <MetricCard label="Documents reviewed" value="86" detail="+18% from last month" icon={FileText} tone="teal" />
        <MetricCard label="High-risk findings" value="7" detail="2 need approval today" icon={ShieldAlert} tone="rose" />
        <MetricCard label="Average review time" value="8m 14s" detail="31% faster this quarter" icon={Clock3} tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
        <section className="cf-card overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4"><div><h2 className="font-semibold text-slate-950">Review activity</h2><p className="mt-0.5 text-xs text-slate-500">Documents analyzed in the last 7 days</p></div><span className="text-xs font-medium text-emerald-700">+12.4%</span></div>
          <div className="p-5">
            <div className="flex h-52 items-end gap-3 rounded-2xl bg-slate-50 p-5">
              {reviewActivity.map((value, i) => <div key={i} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="rounded-t-lg bg-gradient-to-t from-[#123a5a] to-teal-500 transition hover:opacity-80" style={{height:`${value}%`}}/><div className="text-center text-[10px] font-medium text-slate-400">{['M','T','W','T','F','S','S'][i]}</div></div>)}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border bg-white p-3"><div className="text-xs text-slate-500">AI reviews</div><div className="mt-1 text-lg font-semibold">43</div></div>
              <div className="rounded-xl border bg-white p-3"><div className="text-xs text-slate-500">Citations verified</div><div className="mt-1 text-lg font-semibold">218</div></div>
              <div className="rounded-xl border bg-white p-3"><div className="text-xs text-slate-500">Hours saved</div><div className="mt-1 text-lg font-semibold">36.5</div></div>
            </div>
          </div>
        </section>

        <section className="cf-card overflow-hidden">
          <div className="border-b px-5 py-4"><h2 className="font-semibold text-slate-950">Risk posture</h2><p className="mt-0.5 text-xs text-slate-500">Open findings across active matters</p></div>
          <div className="p-5">
            <div className="mx-auto grid h-44 w-44 place-items-center rounded-full" style={{background:'conic-gradient(#e11d48 0 18%,#d97706 18% 53%,#059669 53% 100%)'}}><div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center"><div><div className="text-3xl font-semibold">38</div><div className="text-[11px] text-slate-500">open findings</div></div></div></div>
            <div className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-500">High</span><span className="font-semibold">7</span></div><div className="flex justify-between"><span className="text-slate-500">Medium</span><span className="font-semibold">13</span></div><div className="flex justify-between"><span className="text-slate-500">Low</span><span className="font-semibold">18</span></div></div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="cf-card overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4"><div><h2 className="font-semibold">Priority matters</h2><p className="text-xs text-slate-500 mt-0.5">Work requiring attention</p></div><Link href="/matters" className="flex items-center gap-1 text-sm font-semibold text-[#123a5a]">All matters <ArrowRight size={14}/></Link></div>
          <div className="divide-y">
            {matters.slice(0,3).map((m)=><div key={m.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"><div><div className="font-medium text-slate-900">{m.name}</div><div className="mt-1 text-xs text-slate-500">{m.id} • {m.client} • {m.owner}</div></div><StatusPill value={m.risk}/><div className="text-xs text-slate-500">Due {m.deadline}</div></div>)}
          </div>
        </section>
        <section className="cf-card overflow-hidden">
          <div className="border-b px-5 py-4"><h2 className="font-semibold">Recent activity</h2><p className="mt-0.5 text-xs text-slate-500">Across your workspace</p></div>
          <div className="divide-y px-5">{activity.map((a,i)=><div key={i} className="flex gap-3 py-4"><div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-[#123a5a]"><CheckCircle2 size={15}/></div><div className="text-xs leading-5"><span className="font-semibold text-slate-800">{a.who}</span> <span className="text-slate-500">{a.action}</span><div className="font-medium text-slate-700">{a.item}</div><div className="text-slate-400">{a.time}</div></div></div>)}</div>
        </section>
      </div>
    </div>
  );
}
