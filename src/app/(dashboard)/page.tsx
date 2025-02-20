import ProtectedRoute from "@/components/shared/protected-route";
import DashboardView from "@/sections/dashboard/views/dashboard-view";

export const metadata = {
  title: "Dashbord",
};

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardView />
    </ProtectedRoute>
  );
}
