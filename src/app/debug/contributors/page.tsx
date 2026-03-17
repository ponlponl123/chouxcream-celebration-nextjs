"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CircleNotchIcon,
  HandHeartIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

function Page() {
  const [contributors, setContributors] = React.useState<
    any[] | undefined | null
  >(undefined);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const api = await fetch("/api/contributors");
        if (!api.ok) throw new Error(`HTTP ${api.status}`);

        const json = await api.json();
        setContributors(Array.isArray(json) && json.length > 0 ? json : null);
      } catch (err) {
        console.error("Error while fetching contributors", err);
        setError(String(err));
        setContributors(null);
      }
    };

    load();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-3 items-center justify-center mt-3">
        <HandHeartIcon className="text-amber-300" weight="fill" size={48} />
        <h1 className="text-2xl md:text-3xl font-bold -mt-2 text-center text-amber-400">
          ขอขอบคุณ
        </h1>
        <span className="text-foreground/40 text-sm text-center">
          นี่คือเหล่านักพัฒนาที่ร่วมกันสร้างสรรค์ ChouxCreamii Recap ประจำปี
        </span>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-3 my-6">
        {error || contributors === null ? (
          <div className="text-foreground/60 flex flex-col justify-center items-center">
            <XIcon weight="bold" size={26} />
            <span>ไม่สามารถโหลดรายการผู้พัฒนาได้</span>
            {error && (
              <>
                <br />
                <span>ดีบัคสำหรับนักพัฒนา</span>
                <p className="text-foreground/40 text-xs">{error}</p>
              </>
            )}
          </div>
        ) : contributors === undefined ? (
          <div className="text-foreground/60 flex flex-col justify-center items-center">
            <CircleNotchIcon weight="bold" size={26} className="animate-spin" />
            <span>กำลังโหลด</span>
          </div>
        ) : (
          contributors.map((contrib, idx) => (
            <Tooltip key={contrib?.id ?? idx}>
              <TooltipTrigger>
                <Avatar size="lg">
                  <AvatarImage
                    src={
                      "https://github.com/" + contrib.login.toString() + ".png"
                    }
                  />
                  <AvatarFallback>
                    {(
                      contrib.login.toString().split("/").pop()?.[0] ?? "?"
                    ).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{contrib.login.toString()}</p>
              </TooltipContent>
            </Tooltip>
          ))
        )}
      </div>
    </>
  );
}

export default Page;
