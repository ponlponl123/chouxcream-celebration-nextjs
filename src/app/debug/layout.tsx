"use client";
import Sidebar from "@/components/dev/sidebar";
import { GithubLogoIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

function DebuggerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const allowedOnly = ["/debug/workspace", "/debug/contributors"];
  const isRefAllowed =
    ref ===
      process.env?.NEXT_PUBLIC_DEVELOPMENT_WORKSPACE_PUBLIC_ACCESS_TOKEN ||
    "choux-edgy";

  if (
    process.env.NODE_ENV !== "development" &&
    (!isRefAllowed || (isRefAllowed && !allowedOnly.includes(pathname)))
  )
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-screen">
          <img src="/1261930658469777519.webp" alt="ChouxCreamii Nani" />
          <h1 className="text-4xl font-bold mt-4">หน้านี้น่ะนะ ชึบๆ</h1>
          <p className="text-xl mt-2">
            สำหรับการ Debug เท่านั้น (Not available on production)
          </p>
          <div className="flex flex-col items-center justify-center mt-6 gap-3">
            <Link href="/">
              <button className="px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                <HouseIcon weight="fill" size={16} className="mr-2" />
                กลับหน้าแรก
              </button>
            </Link>
            <span className="text-sm text-foreground/20">หรือ</span>
            <Link href="https://github.com/ponlponl123/chouxcream-celebration-nextjs">
              <button className="px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                <GithubLogoIcon weight="fill" size={16} className="mr-2" />
                ดู Github
              </button>
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <>
      <header className="flex flex-row items-center gap-2 px-4 py-2 h-10 border-b border-b-white/10 bg-black">
        <img src="/favicon.ico" alt="dev portal logo" className="w-6" />
        <h1 className="text-sm font-bold">Developer Portal</h1>
      </header>
      <main className="flex flex-row w-full h-full bg-white/5">
        <Sidebar />
        <div
          className="relative bg-black h-[calc(100vh-3.5rem)] flex-1 min-w-0 m-2 ml-0 max-md:m-0 md:rounded-xl overflow-y-auto overflow-x-hidden p-4"
          id="main-content"
        >
          {children}
        </div>
      </main>
    </>
  );
}

export default function DebuggerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={null}>
      <DebuggerLayoutContent>{children}</DebuggerLayoutContent>
    </React.Suspense>
  );
}
