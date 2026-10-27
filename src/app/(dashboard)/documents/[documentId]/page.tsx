'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Download, FileKey2, FileText, GitCompareArrows, Loader2, MessageSquareText, MoreHorizontal, ShieldAlert, UploadCloud } from 'lucide-react';
import { PDFReviewStudio } from '@/features/document-viewer/components/PDFReviewStudio';
import { ChatDrawer } from '@/features/grounded-chat/components/ChatDrawer';
import { RiskAuditDrawer } from '@/features/risk-audit/components/RiskAuditDrawer';
import { ExecutiveMemoView } from '@/features/executive-summary/components/ExecutiveMemoView';
import { KeyTermsPanel } from '@/features/executive-summary/components/KeyTermsPanel';
import { getLocalDocument } from '@/lib/localDocuments';
import { useDocumentViewerStore } from '@/features/document-viewer/stores/useDocumentViewerStore';

function LocalAnalysisNotice({type}:{type:'risk'|'memo'|'terms'}){return <div className="h-full bg-slate-50 p-6"><div className="mx-auto mt-12 max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm"><div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-[#123a5a]">{type==='risk'?<ShieldAlert size={21}/>:<FileText size={21}/>}</div><h3 className="mt-4 font-semibold">Connect analysis backend for {type==='risk'?'risk audit':type==='terms'?'key-term extraction':'executive memo'}</h3><p className="mt-2 text-sm leading-6 text-slate-500">Your uploaded PDF is loaded locally and never sent anywhere in this frontend build. The production RAG service can be connected through the existing streaming endpoint.</p></div></div>}

export default function ReviewPage(){
  const params=useParams<{documentId:string}>();const documentId=params.documentId;const [tab,setTab]=useState<'chat'|'risk'|'terms'|'summary'>('chat');const [documentUrl,setDocumentUrl]=useState('');const [documentTitle,setDocumentTitle]=useState('');const [pageCount,setPageCount]=useState<number|null>(null);const [loading,setLoading]=useState(true);const [notFound,setNotFound]=useState(false);const resetViewer=useDocumentViewerStore(s=>s.resetViewer);const isDemoDocument=documentId==='demo-contract';
  useEffect(()=>{let cancelled=false;let objectUrl='';resetViewer();setPageCount(isDemoDocument?4:null);setNotFound(false);setLoading(true);if(isDemoDocument){setDocumentTitle('Master Services Agreement.pdf');setDocumentUrl('/demo-contract.pdf');setLoading(false);return}void(async()=>{try{const document=await getLocalDocument(documentId);if(cancelled)return;if(!document){setNotFound(true);setLoading(false);return}objectUrl=URL.createObjectURL(document.blob);setDocumentTitle(document.name);setDocumentUrl(objectUrl);setLoading(false)}catch{if(!cancelled){setNotFound(true);setLoading(false)}}})();return()=>{cancelled=true;if(objectUrl)URL.revokeObjectURL(objectUrl)}},[documentId,isDemoDocument,resetViewer]);
  if(loading)return <div className="grid h-[calc(100vh-4rem)] place-items-center text-slate-500"><div className="flex items-center gap-2"><Loader2 className="animate-spin" size={18}/>Opening secure review workspace…</div></div>;
  if(notFound||!documentUrl)return <div className="grid h-[calc(100vh-4rem)] place-items-center p-6"><div className="max-w-md rounded-2xl border bg-white p-8 text-center"><UploadCloud className="mx-auto text-slate-400" size={30}/><h1 className="mt-4 text-xl font-semibold">Document is not available</h1><p className="mt-2 text-sm text-slate-500">It may have been deleted or stored in a different browser.</p><Link href="/documents" className="cf-btn-primary mt-5">Go to Documents</Link></div></div>;
  const tabs=[['chat','AI Review',MessageSquareText],['risk','Risk Audit',ShieldAlert],['terms','Key Terms',FileKey2],['summary','Memo',FileText]] as const;
  return <div className="flex h-[calc(100vh-4rem)] flex-col bg-white">
    <div className="flex min-h-16 items-center gap-3 border-b bg-white px-4">
      <Link href="/documents" className="rounded-lg p-2 hover:bg-slate-100"><ArrowLeft size={17}/></Link><div className="min-w-0"><div className="truncate text-sm font-semibold text-slate-900">{documentTitle}</div><div className="mt-0.5 flex items-center gap-2 text-[10px]"><span className="font-semibold text-emerald-600">READY</span><span className="text-slate-300">•</span><span className="text-slate-400">{pageCount?`${pageCount} pages`:'Local PDF'}</span>{!isDemoDocument&&<><span className="text-slate-300">•</span><span className="font-medium text-teal-700">LOCAL UPLOAD</span></>}</div></div>
      <div className="ml-auto hidden items-center gap-2 sm:flex"><Link href="/comparison" className="cf-btn-secondary !px-3 !py-2"><GitCompareArrows size={14}/>Compare</Link><button className="cf-btn-secondary !px-3 !py-2"><Download size={14}/>Export</button><button className="rounded-xl border p-2 text-slate-500"><MoreHorizontal size={16}/></button></div>
    </div>
    <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.52fr)_minmax(390px,.88fr)]">
      <div className="min-h-0 border-r"><PDFReviewStudio documentUrl={documentUrl} documentTitle={documentTitle} onPageCountChange={setPageCount}/></div>
      <div className="flex min-h-0 flex-col bg-white"><div className="flex h-13 border-b bg-slate-50/60">{tabs.map(([key,label,Icon])=><button key={key} onClick={()=>setTab(key)} className={`flex flex-1 items-center justify-center gap-1.5 px-2 py-3 text-[11px] font-semibold transition ${tab===key?'border-b-2 border-teal-700 bg-white text-teal-800':'text-slate-500 hover:text-slate-800'}`}><Icon size={14}/>{label}</button>)}</div><div className="min-h-0 flex-1">{tab==='chat'?<ChatDrawer documentId={documentId} allowDemoAnswers={isDemoDocument}/>:tab==='risk'?(isDemoDocument?<RiskAuditDrawer/>:<LocalAnalysisNotice type="risk"/>):tab==='terms'?(isDemoDocument?<KeyTermsPanel/>:<LocalAnalysisNotice type="terms"/>):(isDemoDocument?<ExecutiveMemoView/>:<LocalAnalysisNotice type="memo"/>)}</div></div>
    </div>
  </div>
}
