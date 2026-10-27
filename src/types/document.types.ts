export type DocumentProcessingStatus='PENDING_INGESTION'|'PROCESSING'|'READY'|'FAILED';
export interface ExecutiveSummary { summaryText:string; contractType:string; governingLaw:string; effectiveDate:string|null; parties:string[]; generatedAt:string }
export interface DocumentMetadata { id:string; workspaceId:string; uploadedBy:{id:string;name:string;email:string};title:string;originalFilename:string;fileSizeBytes:number;pageCount:number;totalChunks:number;storageUrl:string;status:DocumentProcessingStatus;executiveSummary?:ExecutiveSummary;createdAt:string;updatedAt:string }
