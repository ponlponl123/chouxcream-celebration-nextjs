"use client";
import React from "react";
import { celebrationDate } from "@/config/date";
import { dateBuilder, formatRemaining } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  CraneTowerIcon,
  WrenchIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type DevTask = {
  id: number;
  title: string;
  created_date: string;
  accepted_date: string;
  canceled_date: string;
  completed_date: string;
  assigned: string[];
  is_accepted: boolean;
  is_canceled: boolean;
  is_completed: boolean;
  state: number;
};

function Page() {
  const [devTasks, setDevTasks] = React.useState<DevTask[]>([]);
  const [devTaskCount, setDevTaskCount] = React.useState(0);
  const now = new Date();
  const [targetYear, setTargetYear] = React.useState(now.getFullYear());
  const deadline = dateBuilder(now.getFullYear(), celebrationDate);

  React.useEffect(() => {
    if (targetYear < 2026) {
      setDevTasks([]);
      setDevTaskCount(0);
      return;
    }
    fetch(
      "https://api.ponlponl123.com/v1/services/choux/dev/tasks?year=" +
        targetYear,
    )
      .then((res) => res.json())
      .then((data) => {
        setDevTasks(
          (data as DevTask[]).map((task) => {
            return {
              ...task,
              state: task.is_completed
                ? 3
                : task.is_canceled
                  ? 2
                  : task.is_accepted
                    ? 1
                    : 0,
            };
          }),
        );
      });
    fetch(
      "https://api.ponlponl123.com/v1/services/choux/dev/tasks/" + targetYear,
    )
      .then((res) => res.json())
      .then((data) => {
        setDevTaskCount(data.count);
      });
  }, [targetYear]);

  return (
    <>
      <h1 className="text-2xl font-bold mt-4">พื้นที่ทำงานสำหรับนักพัฒนา</h1>
      <span className="text-foreground/40 text-sm">
        นี่คือรายการงานที่คุณต้องทำก่อนถึงกำหนดส่ง
      </span>
      <div className="w-full gap-4 mt-4 grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-1 p-3 border-2 border-emerald-400/10 rounded-lg bg-emerald-400/10 w-full">
          <h1>วันนี้</h1>
          <span>
            {now.toLocaleDateString("th-TH", { dateStyle: "long" })} (
            {now.toLocaleDateString()})
          </span>
        </div>
        <div className="flex flex-col gap-1 p-3 border-2 border-rose-400/10 rounded-lg bg-rose-400/10 w-full">
          <h1>กำหนดเวลา</h1>
          <span>
            {deadline.toLocaleDateString("th-TH", { dateStyle: "long" })} (
            {deadline.toLocaleDateString()})
          </span>
        </div>
        <div className="flex flex-col gap-1 p-3 border-2 border-amber-400/10 rounded-lg bg-amber-400/10 w-full">
          <h1>เหลืออีก</h1>
          <span>{formatRemaining(now, deadline)}</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <span className="text-foreground/40 text-sm">ข้อมูลปี</span>
          <Select
            value={targetYear.toString()}
            defaultValue={targetYear.toString()}
            onValueChange={(value) => {
              Number(value) && setTargetYear(Number(value));
            }}
          >
            <SelectTrigger className="w-max border-2 border-foreground/10 rounded-lg">
              <SelectValue placeholder="ปี" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2 border-foreground/10">
              <SelectGroup>
                {Array.from({
                  length: new Date().getFullYear() - 2025 + 1,
                }).map((_, index) => {
                  const year = 2025 + index;
                  return (
                    <SelectItem value={year.toString()} key={index}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="mt-2 w-full rounded-lg bg-foreground/5 overflow-hidden">
        <TableCaption suppressHydrationWarning>
          อัพเดทล่าสุดเมื่อ {new Date().toLocaleString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead align="center" className="w-16 text-center">
              ลำดับ
            </TableHead>
            <TableHead>รายการ</TableHead>
            <TableHead className="w-36">เพิ่มเมื่อ</TableHead>
            <TableHead className="w-36">มอบหมายให้</TableHead>
            <TableHead className="w-36">สถานะ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {targetYear <= 2026 && (
            <TableRow>
              <TableCell className="text-center" colSpan={5}>
                <div className="flex items-center justify-center gap-2 text-foreground/40 font-medium w-full">
                  <XCircleIcon weight="fill" size={16} />
                  ไม่สามารถโหลดงานก่อนวันที่{" "}
                  {new Date("2026-03-17T21:03:00+07:00").toLocaleDateString(
                    "th-TH",
                    {
                      dateStyle: "long",
                    },
                  )}{" "}
                  ได้
                </div>
              </TableCell>
            </TableRow>
          )}
          {targetYear >= 2026 && devTasks.length === 0 ? (
            <>
              <TableRow>
                <TableCell className="text-center" colSpan={5} rowSpan={2}>
                  <div className="text-foreground/60 flex flex-col justify-center items-center gap-1">
                    <CircleNotchIcon
                      weight="bold"
                      size={20}
                      className="animate-spin"
                    />
                    <span>กำลังโหลด</span>
                  </div>
                </TableCell>
              </TableRow>
            </>
          ) : (
            devTasks.map((task: DevTask, index) => (
              <TableRow className="h-12" key={"task-" + index}>
                <TableCell align="center" className="font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  {new Date(task.created_date).toLocaleDateString("th-TH", {
                    dateStyle: "long",
                  })}
                </TableCell>
                <TableCell>
                  <div>
                    {task.assigned.map((assign, a_index) => (
                      <Tooltip key={"task-" + index + "-assign-" + a_index}>
                        <TooltipTrigger>
                          <Avatar>
                            <AvatarImage
                              src={
                                "https://github.com/" +
                                assign.toString() +
                                ".png"
                              }
                            />
                            <AvatarFallback>
                              {(
                                assign.toString().split("/").pop()?.[0] ?? "?"
                              ).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{assign.toString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={twMerge(
                      "flex items-center gap-2 px-2 py-0.5 rounded-full w-max text-xs",
                      task.state === 3
                        ? "text-emerald-500 bg-emerald-500/10"
                        : task.state === 2
                          ? "text-rose-500 bg-rose-500/10"
                          : task.state === 1
                            ? "text-cyan-500 bg-cyan-500/10"
                            : "text-amber-500 bg-amber-500/10",
                    )}
                  >
                    {task.state === 3 ? (
                      <>
                        <CheckCircleIcon weight="bold" size={16} />
                        ดำเนินการแล้ว
                      </>
                    ) : task.state === 2 ? (
                      <>
                        <XIcon weight="bold" size={16} />
                        ยกเลิกแล้ว
                      </>
                    ) : task.state === 1 ? (
                      <>
                        <WrenchIcon weight="bold" size={16} />
                        กำลังดำเนินการ
                      </>
                    ) : (
                      <>
                        <CraneTowerIcon weight="bold" size={16} />
                        อยู่ในแผน
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>งานทั้งหมด</TableCell>
            <TableCell className="text-right">
              {devTaskCount || devTasks.length} รายการ
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default Page;
