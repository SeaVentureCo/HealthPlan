import PageHeader from "@/components/PageHeader";
import { loadAllSessions } from "@/lib/data";
import { weeks, currentWeekIndex } from "@/data/plan";
import TrainingClient from "./TrainingClient";

export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const sessions = await loadAllSessions();
  return (
    <>
      <PageHeader title="Weekly schedule" subtitle="Tick off each session as you complete it" />
      <TrainingClient initialSessions={sessions} initialWeek={currentWeekIndex()} />
    </>
  );
}
