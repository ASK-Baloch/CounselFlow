import { DashboardNavbar } from '@/components/navigation/DashboardNavbar';
import { SidebarNavigation } from '@/components/navigation/SidebarNavigation';
export default function Layout({children}:{children:React.ReactNode}){return <div className="min-h-screen flex flex-col"><DashboardNavbar/><div className="flex flex-1 min-h-0"><SidebarNavigation/><main className="flex-1 min-w-0 bg-transparent">{children}</main></div></div>}
