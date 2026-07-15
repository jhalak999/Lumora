import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/dashboard/HeroSection";
import {
  FolderOpen,
  Sparkles,
  Video,
  HardDrive,
} from "lucide-react";
import RecentProjects from "@/components/dashboard/RecentProjects";
import StatCard from "@/components/dashboard/StatCard";
import ActivityPanel from "@/components/dashboard/ActivityPanel";

export default function DashboardPage() {
  return (
<AppLayout>
    <div className="space-y-10">

      <HeroSection />

      <div className="grid grid-cols-12 gap-10">

        <section className="col-span-8">
          <RecentProjects />
        </section>

        <section className="col-span-4">
          <ActivityPanel />
        </section>

      </div>

      <div>
        <h2 className="text-3xl font-bold text-white">
          Workspace Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Your current AI productivity.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">

        <StatCard
          title="Projects"
          value="12"
          subtitle="3 updated today"
          icon={FolderOpen}
        />

        <StatCard
          title="AI Generations"
          value="248"
          subtitle="21 this week"
          icon={Sparkles}
        />

        <StatCard
          title="Videos"
          value="63"
          subtitle="Ready to export"
          icon={Video}
        />

        <StatCard
          title="Storage"
          value="18 GB"
          subtitle="of 100 GB used"
          icon={HardDrive}
        />

      </div>

    </div>
  </AppLayout>
  );
}