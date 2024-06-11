import Link from "next/link";

import { Button } from "@/components/ui/button";

import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Loader2 } from "lucide-react";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <h1 className="text-xl font-medium">Padel Tracker</h1>
        {userId ? (
          <div className="flex flex-col gap-y-2 md:flex-row md:gap-y-0 md:gap-x-2 w-full">
            <Link href="/dashboard">
              <Button variant="ghost">Ranking</Button>
            </Link>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-300" />
            </ClerkLoading>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 md:flex-row md:gap-y-0 md:gap-x-2 w-full">
            <Link href={"/sign-in"}>
              <Button variant={"secondary"}>Ingresa</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button>Regístrate</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
