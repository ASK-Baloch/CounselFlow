export type RiskSeverity='HIGH'|'MEDIUM'|'LOW';
export type RiskCategory='UNLIMITED_LIABILITY'|'PREDATORY_INDEMNITY'|'ASYMMETRIC_TERMINATION'|'UNILATERAL_MODIFICATION'|'MISSING_PROTECTION'|'AMBIGUOUS_CURE_PERIOD';
export interface RiskFinding { category:RiskCategory; severity:RiskSeverity; title:string; description:string; clauseSnippet?:string; pageNumber?:number; recommendedMitigation:string }
export interface RiskAuditReport { id:string; documentId:string; workspaceId:string; overallRiskScore:number; findings:RiskFinding[]; status:'COMPLETED'|'FAILED'; createdAt:string }
