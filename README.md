# CounselFlow — Legal Intelligence Frontend

A polished frontend-only legal operations and AI contract review workspace built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Zustand**, **TanStack Query**, and **PDF.js**.

## Included modules

- Professional login / registration experience
- Executive dashboard with review analytics and risk posture
- Document library with PDF upload + IndexedDB persistence
- Split-screen PDF Review Studio
- Grounded AI chat demo with clickable citations
- Risk audit scorecard and mitigation suggestions
- Extracted key terms panel
- Executive memo + local export
- Semantic contract comparison
- Matter management
- Client portfolio management
- Clause library with search and copy actions
- Tasks & approvals workflow
- Reports and downloadable demo exports
- Workspace settings

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

`npm install` automatically copies the matching PDF.js worker into `public/pdf-worker`, so the PDF viewer does not rely on an external CDN.

## PDF uploads

Go to **Documents** and click **Add document**, or drag-and-drop a PDF. PDFs are stored locally in browser IndexedDB in this frontend-only version and are not uploaded to a server.

The built-in demo contract includes simulated AI answers, citations, risk findings, key terms and memo content. User-uploaded PDFs can be viewed and navigated; real AI/RAG analysis requires the backend SSE endpoint.

## Backend integration

Copy `.env.example` to `.env.local` when connecting services:

```env
NEXT_PUBLIC_GATEWAY_URL=http://localhost:5000
NEXT_PUBLIC_USE_MOCK_AI=true
```

Set `NEXT_PUBLIC_USE_MOCK_AI=false` after the streaming backend is available.

## Main architecture

- `src/app` — App Router pages and layouts
- `src/components/navigation` — application shell
- `src/features/document-viewer` — PDF.js viewer, zoom and citation jump
- `src/features/grounded-chat` — streaming chat UI and SSE integration
- `src/features/risk-audit` — risk review UI
- `src/features/executive-summary` — memo and key-term modules
- `src/lib/localDocuments.ts` — browser-only PDF persistence
- `src/lib/mockData.ts` — frontend demo workspace data
- `scripts/setup-pdf-worker.mjs` — cross-platform PDF.js worker setup

## Important

This package is intentionally frontend-only. Legal analysis shown for the built-in demo document is illustrative and should not be treated as legal advice.
