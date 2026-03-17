import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src="/1261930326171586632.webp" alt="ChouxCreamii Nani" />
        <h1 className="text-4xl font-bold mt-4">แปกๆ</h1>
        <p className="text-xl mt-2">เหมือนจะไม่มีหน้านี้นะ ชึบๆ</p>
        <Link href="/">
          <button className="mt-4 px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
            <HouseIcon weight="fill" size={16} className="mr-2" />
            กลับหน้าแรก
          </button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
