import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import MobileHeader from "@/components/MobileHeader";
import SignOutButton from "@/components/SignOutButton";
import TimezoneCookie from "@/components/TimezoneCookie";
import { daysToBermuda } from "@/data/plan";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const days = daysToBermuda();

  return (
    <div className="md:grid md:grid-cols-[220px_1fr] min-h-screen">
      <TimezoneCookie />
      <Sidebar daysToBermuda={days} />
      <MobileHeader daysToBermuda={days} />
      <SignOutButton />
      <main className="px-5 py-6 md:px-10 md:py-9 pb-24 md:pb-9 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
