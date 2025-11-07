import { Suspense } from "react";
import { TestContent } from "./test-content";

export default function DiagnosePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" />}>
      <TestContent />
    </Suspense>
  );
}
