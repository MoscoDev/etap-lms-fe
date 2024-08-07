/* eslint-disable @next/next/no-img-element */
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axiosReq from "@/services/httpClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const Body = (props: Props) => {
  const [topPicks, setTopPicks] = useState([]);
  useEffect(() => {
    const getTopPicks = async () => {
      try {
        const { data } = await axiosReq.get("/subjects/top-picks");
        setTopPicks(data.subjects);
      } catch (err) {
        console.log(err);
      }
    };
    getTopPicks();
  }, []);

  return (
    <div className="flex flex-col mb-8">
      <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-none p-0 outline-none">
        <div className="my-4 ">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Top Subjects
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <div className="bg-border h-[1px] my-4"></div>
        <ScrollArea className="flex-1 whitespace-nowrap rounded-md border">
          <div className="flex space-x-4 p-4 overflow-scroll flex-1">
            {topPicks.map((item: any) => (
              <Link
                href={`/subjects/${item.id}`}
                key={item.id}
                className="space-y-3 w-[250px] flex-shrink-0"
              >
                <div className="overflow-hidden rounded-md">
                  <img
                    alt={item.name}
                    loading="lazy"
                    width="250"
                    height="330"
                    decoding="async"
                    className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                    src={item.thumbnail}
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <h3 className="font-medium leading-none">{item.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Body;
