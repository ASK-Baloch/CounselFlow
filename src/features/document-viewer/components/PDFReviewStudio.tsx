'use client';

import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFToolbar } from './PDFToolbar';
import { PDFCanvasPage } from './PDFCanvasPage';
import { useDocumentViewerStore } from '../stores/useDocumentViewerStore';

// The worker version must match the installed pdfjs-dist version.
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs';

export function PDFReviewStudio({
  documentUrl,
  documentTitle,
  onPageCountChange,
}: {
  documentUrl: string;
  documentTitle: string;
  onPageCountChange?: (count: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [error, setError] = useState('');
  const s = useDocumentViewerStore();

  useEffect(() => {
    let active = true;
    setPdf(null);
    setError('');

    const loading = pdfjsLib.getDocument({ url: documentUrl });
    loading.promise
      .then((document) => {
        if (!active) return;
        setPdf(document);
        s.setTotalPages(document.numPages);
        onPageCountChange?.(document.numPages);
      })
      .catch((reason) => {
        console.error('[PDF Engine Error]', reason);
        if (active) setError('Failed to load this PDF. Make sure it is a valid, non-password-protected PDF.');
      });

    return () => {
      active = false;
      void loading.destroy();
    };
  }, [documentUrl]);

  useEffect(() => {
    if (s.currentPage && container.current && !s.targetPageRequest) {
      const el = container.current.querySelector(`[data-page-number="${s.currentPage}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [s.currentPage]);

  useEffect(() => {
    if (s.targetPageRequest && container.current) {
      const el = container.current.querySelector(`[data-page-number="${s.targetPageRequest}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      s.clearTargetPageRequest();
    }
  }, [s.targetPageRequest]);

  return (
    <div className="h-full min-h-0 flex flex-col bg-[#e9eef4]">
      <div className="px-4 py-3 bg-white border-b flex items-center justify-between">
        <div><div className="font-semibold text-sm truncate">{documentTitle}</div><div className="text-[11px] text-slate-500">Secure PDF Workbench</div></div><span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">LOCAL RENDER</span>
      </div>
      <PDFToolbar />
      <div ref={container} className="flex-1 overflow-auto p-5">
        {error ? (
          <div className="p-6 bg-white border rounded-xl text-red-600 text-sm leading-6">{error}</div>
        ) : !pdf ? (
          <div className="text-center text-slate-500 mt-20">Loading contract…</div>
        ) : (
          Array.from({ length: pdf.numPages }, (_, i) => (
            <PDFCanvasPage key={i + 1} pdf={pdf} pageNumber={i + 1} scale={s.scale} highlight={s.activeCitation?.pageNumber === i + 1} />
          ))
        )}
      </div>
    </div>
  );
}
