import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-9">
      <p className="text-2xl font-bold text-indigo-400">
        <UserButton afterSignOutUrl="/" />
      </p>
    </div>
  );
}
