import Analytics from "@/components/Analytics";
import Overview from "@/components/Overview";
import RTransactions from "@/components/RTransactions";

export default function DashboardPage() {
  return (
    <div className="w-full">
      
      {/* Dynamic Header */}
      <div className="mb-10 flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
          Financial Dashboard
        </h1>
        <p className="text-sm font-medium text-gray-500">
          Good morning, Rubaiya. Check your balance trend and summary cards below.
        </p>
      </div>

      {/* Your established Overview Section */}
      <Overview />
      <Analytics/>
      <RTransactions/>

      
    </div>
  );
}