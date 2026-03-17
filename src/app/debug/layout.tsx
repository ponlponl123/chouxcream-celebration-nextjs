import { GithubLogoIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

function DebuggerLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development")
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

  return children;
}

export default DebuggerLayout;
