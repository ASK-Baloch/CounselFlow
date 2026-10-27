'use client';
import { CalendarDays, CircleDollarSign, FileKey2, Gavel, Users } from 'lucide-react';
import { useDocumentViewerStore } from '@/features/document-viewer/stores/useDocumentViewerStore';
import type { Citation } from '@/types/chat.types';
const terms=[
  {label:'Effective date',value:'January 1, 2026',page:1,icon:CalendarDays},
  {label:'Payment terms',value:'Net 30 days',page:1,icon:CircleDollarSign},
  {label:'Termination',value:'30-day cure / 60-day convenience',page:2,icon:FileKey2},
  {label:'Liability cap',value:'Fees paid in prior 12 months',page:3,icon:Gavel},
  {label:'Governing law',value:'New York',page:4,icon:Users},
];
export function KeyTermsPanel(){const jump=useDocumentViewerStore(s=>s.jumpToCitation);return <div className="h-full overflow-auto bg-slate-50 p-4"><div className="mb-4"><h3 className="font-semibold">Extracted key terms</h3><p className="mt-1 text-xs text-slate-500">Click any term to jump to its source clause.</p></div><div className="space-y-3">{terms.map(t=><button key={t.label} onClick={()=>jump({pageNumber:t.page,rawSnippet:t.value,similarityScore:.94} as Citation)} className="w-full rounded-2xl border bg-white p-4 text-left transition hover:border-teal-300 hover:shadow-sm"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-[#123a5a]"><t.icon size={17}/></div><div className="flex-1"><div className="text-xs text-slate-400">{t.label}</div><div className="mt-0.5 text-sm font-semibold text-slate-800">{t.value}</div></div><span className="text-[11px] font-semibold text-teal-700">Page {t.page}</span></div></button>)}</div></div>}
