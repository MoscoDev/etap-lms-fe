"use client";
import Body from "@/components/custom/dashboard/body";
import { Slider } from "@/components/custom/dashboard/slider";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <main className="sm:max-w-[calc(100vw-18rem)] flex-1 flex-col gap-3">
      <div className="flex flex-1">
        <Slider />
      </div>
      <Body />
    </main>
  );
};

export default DashboardPage;
