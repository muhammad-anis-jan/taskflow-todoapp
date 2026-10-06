import DashboardLayout from "../layouts/DashboardLayout";
import TaskBoard from "../components/TaskBoard";
export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="welcome">
        <small>MONDAY, OCTOBER 5, 2026</small>
        <h1>Welcome Buddy</h1>
        <p>A new week, a fresh page. What matters today?</p>
      </section>
      <TaskBoard />
    </DashboardLayout>
  );
}
