"use client";
import React from "react";
import { Link } from "@heroui/link";
import {
  DiscordLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function Footer() {
  const pathname = usePathname();
  const isRecapPage = pathname.startsWith("/recap-");
  const RecapYear = isRecapPage
    ? pathname.split("/recap-")[1]
    : pathname === "/"
      ? String(new Date().getFullYear())
      : null;
  const totalRecapCount = new Date().getFullYear() - 2025 + 1;
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const RecapSelector = () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {Array.from({ length: totalRecapCount }, (_, index) => (
        <Link
          key={index}
          href={index === totalRecapCount - 1 ? "/" : `/recap-${2025 + index}`}
          className={twMerge(
            "bg-amber-400/10 text-amber-400 px-1 py-0.5 rounded-sm text-sm",
            RecapYear === String(2025 + index) &&
              "bg-amber-400 text-white pointer-events-none",
          )}
        >
          <span>{2025 + index}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <div
        className={twMerge(
          "xl:hidden w-full flex items-center justify-center mt-8",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
          "transition-opacity duration-500",
        )}
      >
        <RecapSelector />
      </div>
      <footer
        className={twMerge(
          "w-full flex max-md:flex-col md:items-center md:justify-between p-8 gap-8",
          visible ? "opacity-100" : "opacity-0 pointer-events-none",
          "transition-opacity duration-500",
        )}
      >
        <div className="flex-1 min-w-0 flex max-md:flex-col md:items-center gap-6">
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://www.youtube.com/@ChouxCreamii"
            title="ChouxCreamii YouTube channel"
          >
            <img
              src="/favicon.ico"
              alt="ChouxCreamii Logo"
              width="24"
              height="24"
            />
            <span>ChouxCreamii</span>
          </Link>
          <Link
            isExternal
            className="flex items-center gap-1 text-current/60 text-xs opacity-40"
            href="https://ponlponl123.com"
            title="ponlponl123.com homepage"
          >
            <span className="text-default-400">Made with 💛 by</span>
            <p className="text-default-400">Ponlponl123</p>
          </Link>
        </div>
        <div className="flex-1 min-w-0 flex flex-wrap items-center justify-center gap-4 max-xl:hidden">
          <RecapSelector />
        </div>
        <div className="lg:flex-1 min-w-0 flex items-center md:justify-end gap-6">
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://discord.gg/W4WwqRXSVN"
            title="ChouxCreamii Discord server"
          >
            <DiscordLogoIcon weight="fill" size={24} />
          </Link>
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://x.com/ChouxCreamii"
            title="ChouxCreamii Twitter"
          >
            <XLogoIcon weight="regular" size={24} />
          </Link>
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://www.tiktok.com/@chouxcreamii"
            title="ChouxCreamii TikTok"
          >
            <TiktokLogoIcon weight="fill" size={24} />
          </Link>
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://www.facebook.com/ChouxCreamii"
            title="ChouxCreamii Facebook"
          >
            <FacebookLogoIcon weight="fill" size={24} />
          </Link>
          <Link
            isExternal
            className="flex items-center gap-1 text-current text-lg"
            href="https://www.youtube.com/@ChouxCreamii"
            title="ChouxCreamii YouTube channel"
          >
            <YoutubeLogoIcon weight="fill" size={24} />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
