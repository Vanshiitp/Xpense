import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-semibold tracking-tight gradient-title">
          Dashboard
        </h1>
      </div>
      {/* Suspense pauses the rendering until the async data gets ready */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#000000" />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}