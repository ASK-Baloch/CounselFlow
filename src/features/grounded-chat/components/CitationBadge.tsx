'use client';
import { FileSearch2 } from 'lucide-react';
import type { Citation } from '@/types/chat.types';
import { useDocumentViewerStore } from '@/features/document-viewer/stores/useDocumentViewerStore';
export function CitationBadge({citation}:{citation:Citation}){const jump=useDocumentViewerStore(s=>s.jumpToCitation);return <button onClick={()=>jump(citation)} title={citation.rawSnippet} className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-[11px] font-semibold text-teal-800 transition hover:bg-teal-100"><FileSearch2 size={12}/>Page {citation.pageNumber}{citation.paragraphNumber?`, ¶${citation.paragraphNumber}`:''}</button>}
