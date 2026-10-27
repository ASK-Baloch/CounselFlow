import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: { default: 'CounselFlow', template: '%s | CounselFlow' },
  description: 'Legal AI contract review, risk analysis and document intelligence workspace',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><Providers>{children}</Providers></body></html>;
}
