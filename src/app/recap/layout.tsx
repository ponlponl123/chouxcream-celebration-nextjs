"use server";
import React from "react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { dateBuilder } from "@/lib/utils";
import DefaultPage from "./[year]/page";
import { headers } from "next/headers";
import { celebrationDate } from "@/config/date";

export async function generateMetadata(
  _props: { params: Promise<any> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const header = await headers();
  const pathname = header.get("x-current-path");
  const year = pathname?.split("/recap/")[1];

  if (!year || typeof year !== "string" || !Number(year) || year.length !== 4) {
    return {};
  }

  return {
    title: `${year}`,
    description:
      "A celebratory gift for ChouxCream シュークリーム " + year + ".",
  };
}

async function RecapLayout({ children }: { children: React.ReactNode }) {
  const header = await headers();
  const pathname = header.get("x-current-path");
  const year = pathname?.split("/recap/")[1];

  if (!year || typeof year !== "string" || !Number(year) || year.length !== 4) {
    return <DefaultPage params={Promise.resolve({ year: String(year) })} />;
  }

  const now = new Date();
  const targetYear = Number(year) || now.getFullYear();
  const targetDate = dateBuilder(targetYear, celebrationDate);

  if (now <= targetDate) {
    return (
      <DefaultPage params={Promise.resolve({ year: String(targetYear) })} />
    );
  }

  return children;
}

export default RecapLayout;
