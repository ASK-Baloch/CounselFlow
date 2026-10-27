'use client';

import { useCallback, useRef } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { consumeSSEStream } from '@/lib/sseStreamClient';
import type { Citation } from '@/types/chat.types';

const answers: { match: string[]; text: string; citations: Citation[] }[] = [
  { match: ['termination', 'terminate'], text: 'The agreement allows either party to terminate for material breach if the breach is not cured within 30 days after written notice. There is also a termination-for-convenience right with 60 days notice.', citations: [{ pageNumber: 2, paragraphNumber: 2, rawSnippet: 'Either party may terminate... thirty (30) days after written notice...', similarityScore: .96 }] },
  { match: ['liability', 'liable', 'damages'], text: 'Liability is capped at the fees paid in the preceding 12 months, but the cap does not apply to confidentiality breaches, fraud, or indemnification obligations.', citations: [{ pageNumber: 3, paragraphNumber: 2, rawSnippet: 'aggregate liability shall not exceed fees paid during the prior twelve months...', similarityScore: .95 }] },
  { match: ['payment', 'invoice', 'fees'], text: 'Invoices are due within 30 days of receipt. Late undisputed amounts may accrue interest, subject to applicable law.', citations: [{ pageNumber: 1, paragraphNumber: 4, rawSnippet: 'Customer shall pay undisputed invoices within thirty (30) days...', similarityScore: .94 }] },
  { match: ['governing', 'law', 'jurisdiction'], text: 'The agreement is governed by the laws of the State of New York, with exclusive jurisdiction in New York County.', citations: [{ pageNumber: 4, paragraphNumber: 3, rawSnippet: 'This Agreement shall be governed by the laws of the State of New York...', similarityScore: .97 }] },
];

export function useGroundedChat({
  documentId,
  workspaceId,
  sessionId,
  allowDemoAnswers = true,
}: {
  documentId: string;
  workspaceId: string;
  sessionId: string;
  allowDemoAnswers?: boolean;
}) {
  const abortRef = useRef<AbortController | null>(null);
  const s = useChatStore();

  const sendQuery = useCallback(async (query: string) => {
    if (!query.trim() || s.isStreaming) return;
    s.appendUserMessage(query, documentId, workspaceId);
    s.startStreaming();
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const useMock = process.env.NEXT_PUBLIC_USE_MOCK_AI !== 'false';

    if (useMock) {
      const found = allowDemoAnswers
        ? answers.find((a) => a.match.some((m) => query.toLowerCase().includes(m))) || {
            text: 'I found the relevant language in the demo agreement. Review the cited clause before relying on this summary.',
            citations: [{ pageNumber: 2, paragraphNumber: 1, rawSnippet: 'This Agreement sets out the parties’ principal obligations and remedies.', similarityScore: .84 }],
          }
        : {
            text: 'This uploaded PDF is stored only in your browser. The frontend can display and navigate it, but document-grounded AI answers require the analysis/RAG backend to be connected. Set NEXT_PUBLIC_USE_MOCK_AI=false after the backend SSE endpoint is available.',
            citations: [] as Citation[],
          };

      for (const token of found.text.split(/(\s+)/)) {
        if (abortRef.current.signal.aborted) return;
        await new Promise((resolve) => setTimeout(resolve, 22));
        s.appendStreamToken(token);
      }
      s.setStreamCitations(found.citations);
      s.finalizeAssistantMessage();
      return;
    }

    await consumeSSEStream({
      url: `${process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:5000'}/api/v1/chat/stream`,
      body: { documentId, sessionId, query },
      signal: abortRef.current.signal,
      onToken: s.appendStreamToken,
      onCitations: s.setStreamCitations,
      onError: () => s.abortStreaming(),
      onComplete: s.finalizeAssistantMessage,
    });
  }, [documentId, workspaceId, sessionId, allowDemoAnswers, s]);

  const cancelGeneration = () => {
    abortRef.current?.abort();
    s.abortStreaming();
  };

  return { ...s, sendQuery, cancelGeneration };
}
