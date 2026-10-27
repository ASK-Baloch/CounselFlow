import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Frontend demo only. Replace with real session and workspace validation when auth APIs are connected.
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*','/documents/:path*','/matters/:path*','/clients/:path*','/comparison/:path*','/clauses/:path*','/tasks/:path*','/reports/:path*','/settings/:path*'] };
