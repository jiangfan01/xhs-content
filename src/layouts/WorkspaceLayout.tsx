import { Outlet } from "react-router-dom";
import Topbar from "~/components/Topbar";
import Sidebar from "~/components/Sidebar";

export default function WorkspaceLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg-default)]">
      <Topbar />
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen px-4 pb-6 pt-[84px] md:px-6 md:pb-8 md:pt-[88px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
