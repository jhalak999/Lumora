import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0b1020] p-8">

      <Sidebar />

      <div className="ml-6 flex flex-1 flex-col">

        <Topbar />

        <main className="mt-6 flex-1 overflow-auto rounded-[32px] bg-[#0F172A] p-10 shadow-2xl">
          {children}
        </main>

      </div>

    </div>
  );
}