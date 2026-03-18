"use client";
import {
  AirplaneLandingIcon,
  ArrowClockwiseIcon,
  CaretLeftIcon,
  EnvelopeSimpleOpenIcon,
  HandHeartIcon,
  HeartIcon,
  HouseIcon,
  ListIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

export function SidebarActiveButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className="contents">
      <button
        data-active={isActive}
        className={twMerge(
          "text-foreground/80 rounded-lg px-3 py-2 text-sm flex items-center justify-start w-full gap-2 apply-default-transition",
          "hover:bg-foreground/10",
          "active:bg-foreground/10 active:text-amber-400 active:scale-95 active:duration-75!",
          isActive && "bg-amber-400 hover:bg-amber-400 text-white",
          className,
        )}
      >
        {children}
      </button>
    </Link>
  );
}

function Sidebar() {
  const [visible, setVisible] = React.useState(false);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const refQuery = ref ? `?ref=${ref}` : "";

  return (
    <>
      <button
        className={twMerge(
          "fixed top-1 right-2 z-50 p-2 apply-default-transition flex items-center justify-center hover:bg-foreground/5 rounded-xl active:scale-95 active:duration-75! md:hidden",
          visible && "bg-amber-400/60 hover:bg-amber-400/60",
        )}
        onClick={() => setVisible(!visible)}
      >
        <ListIcon weight="bold" size={16} />
      </button>
      <div
        className={twMerge(
          "bg-foreground/5 w-48 h-[calc(100vh-3.5rem)] flex flex-col items-center overflow-y-auto gap-2 p-2 m-2 rounded-xl sticky top-2 z-50 max-md:backdrop-blur-3xl",
          "max-md:hidden max-md:fixed",
          visible && "max-md:flex",
        )}
      >
        <div />
        <div className="flex flex-row w-full items-center justify-center gap-1">
          <span className="text-xs text-foreground/10">Dev Workspace</span>
          <div className="flex-1 min-w-0 h-0.5 bg-foreground/10" />
        </div>
        <SidebarActiveButton
          href={"/debug/workspace" + refQuery}
          className="w-full"
        >
          <HouseIcon weight="fill" size={16} />
          หน้าแรก
        </SidebarActiveButton>
        <SidebarActiveButton
          href={"/debug/contributors" + refQuery}
          className="w-full"
        >
          <HandHeartIcon weight="fill" size={16} />
          ผู้มีส่วนร่วม
        </SidebarActiveButton>
        <div className="flex flex-row w-full items-center justify-center gap-1">
          <span className="text-xs text-foreground/10">Components</span>
          <div className="flex-1 min-w-0 h-0.5 bg-foreground/10" />
        </div>
        <div
          className={twMerge(
            "flex flex-col gap-2 w-full",
            process.env.NODE_ENV !== "development" &&
              "pointer-events-none p-1 relative",
          )}
        >
          {process.env.NODE_ENV !== "development" && (
            <div className="absolute w-full h-full flex items-center justify-center p-2 rounded-lg backdrop-blur-3xl bg-background/60 max-md:bg-background/90 z-10">
              <span className="text-foreground/40 text-xs text-center">
                This debug components not available production
              </span>
            </div>
          )}
          <SidebarActiveButton
            href={"/debug/flying-heart" + refQuery}
            className="w-full"
          >
            <HeartIcon weight="fill" size={16} />
            Flying Heart
          </SidebarActiveButton>
          <SidebarActiveButton
            href={"/debug/2026-intro" + refQuery}
            className="w-full"
          >
            <AirplaneLandingIcon weight="fill" size={16} />
            2026 Intro
          </SidebarActiveButton>
          <SidebarActiveButton
            href={"/debug/2026-mail" + refQuery}
            className="w-full"
          >
            <EnvelopeSimpleOpenIcon weight="fill" size={16} />
            2026 Mail
          </SidebarActiveButton>
        </div>
        <div className="mt-auto" />
        <SidebarActiveButton href={"/"} className="w-full">
          <CaretLeftIcon weight="bold" size={16} />
          กลับหน้าแรก
        </SidebarActiveButton>
        <button
          className={twMerge(
            "text-foreground/80 rounded-lg px-4 py-2 text-sm flex items-center justify-start w-full gap-2 apply-default-transition",
            "hover:bg-foreground/10",
            "active:bg-foreground/10 active:text-amber-400 active:scale-95 active:duration-75!",
          )}
          onClick={() => window.location.reload()}
        >
          <ArrowClockwiseIcon weight="bold" size={16} />
          รีเฟรช
        </button>
      </div>
    </>
  );
}

export default Sidebar;
