import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

import { Loader2 } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-end max-w-7xl mx-auto px-8 md:px-16 py-4">
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-8 animate-spin text-slate-300" />
      </ClerkLoading>
    </div>
  );
};

export default Navbar;
