export interface Citation { pageNumber:number; paragraphNumber?:number; rawSnippet:string; similarityScore:number; boundingBox?:{x1:number;y1:number;x2:number;y2:number} }
export interface ChatMessage { id:string; sessionId:string; workspaceId:string; documentId:string; role:'user'|'assistant'|'system'; content:string; citations?:Citation[]; createdAt:string }
export interface StreamTokenPayload { type:'token'; content:string }
export interface StreamCitationsPayload { type:'citations'; citations:Citation[] }
export type SSEStreamEvent = StreamTokenPayload | StreamCitationsPayload;
