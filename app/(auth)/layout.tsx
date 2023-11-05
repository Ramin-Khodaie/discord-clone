import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-9 bg-red-600 h-full">{children}</div>;
}

