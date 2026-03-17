import { HouseIcon, TimerIcon } from "@phosphor-icons/react/dist/ssr";
import { RecapSelector } from "@/components/footer";
import { celebrationDate } from "@/config/date";
import { dateBuilder } from "@/lib/utils";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;

  if (
    !year ||
    typeof year !== "string" ||
    !Number(year) ||
    year.length !== 4 ||
    Number(year) < 2025
  ) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-screen p-3">
          <img src="/1261930658469777519.webp" alt="ChouxCreamii Nani" />
          <h1 className="text-4xl font-bold mt-4 text-center">ปีไม่ถูกต้อง</h1>
          <p className="text-xl mt-2 mb-3 text-center">
            ลองตรวจสอบปีและลองใหม่อีกครั้ง
          </p>
          <RecapSelector />
          <span className="text-sm text-foreground/20 mt-3">หรือ</span>
          <div className="flex flex-col items-center justify-center mt-3 gap-3">
            <Link href="/">
              <button className="px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                <HouseIcon weight="fill" size={16} className="mr-2" />
                กลับหน้าแรก
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const targetYear = Number(year) || new Date().getFullYear();
  const targetDate = dateBuilder(targetYear, celebrationDate);

  if (new Date().toDateString() === targetDate.toDateString()) {
    return (
      <main>
        <div className="flex flex-col items-center justify-center h-screen p-3">
          <img src="/1261930359902175296.webp" alt="ChouxCreamii Nani" />
          <h1 className="text-4xl font-bold mt-4 text-center">
            ไกล้จะถึงเวลาแล้ว!
          </h1>
          <p className="text-xl mt-2 text-center">
            ร่วมสนุกกับการฉลองครบรอบ {targetYear - 2023} ปี ของ{" "}
            <Link
              className="text-amber-400"
              href="https://www.youtube.com/@ChouxCreamii"
              target="_blank"
              rel="noopener noreferrer"
            >
              ChouxCreamii
            </Link>{" "}
            ในวันที่{" "}
            {targetDate.toLocaleString("th-TH", {
              dateStyle: "long",
              timeStyle: "short",
              timeZone: "Asia/Bangkok",
            })}{" "}
            <span className="text-sm text-foreground/20">(เวลาประเทศไทย)</span>
          </p>
          <div className="flex flex-col items-center justify-center mt-6 gap-3">
            <Link href="/">
              <button className="px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
                <TimerIcon weight="fill" size={16} className="mr-2" />
                นับถอยหลัง
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen p-3">
        <img src="/1261930658469777519.webp" alt="ChouxCreamii Nani" />
        <h1 className="text-4xl font-bold mt-4 text-center">ยังก่อนฉี่ ชึบๆ</h1>
        <p className="text-xl mt-2 text-center">
          หน้านี้จะเปิดให้เข้าชมหลังจากวันที่{" "}
          {targetDate.toLocaleDateString("th-TH", { dateStyle: "long" })}
        </p>
        <div className="flex flex-col items-center justify-center mt-6 gap-3">
          <Link href="/">
            <button className="px-4 py-2 bg-amber-400 text-white flex items-center rounded-full hover:bg-amber-500 active:scale-95 apply-default-transition active:duration-75!">
              <HouseIcon weight="fill" size={16} className="mr-2" />
              กลับหน้าแรก
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Page;
