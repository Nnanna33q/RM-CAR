import SideBarDashboard from "@/components/ui/side-dashboard";
import NavDashboard from "@/components/ui/nav-dashboard";
import TabList from "@/components/ui/tablist-dashboard";
import AdminMain from "@/components/ui/admin-main";

export default function Inventory() {
    return (
        <div className="flex relative">
            <SideBarDashboard currentPage={'Inventory'} />
            <div className="w-full py-4 px-6" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                <NavDashboard pageName={'Inventory'} />
                <TabList />
                <AdminMain />
            </div>
        </div>
    )
}