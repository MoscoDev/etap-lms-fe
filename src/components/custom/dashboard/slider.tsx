import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Slider() {
  const router = useRouter();
  const sliderShow: {
    imgUrl: string;
    title: string;
    description: string;
    action?: () => void;
  }[] = [
    {
      imgUrl: "/img/banner1.png",
      title: "Learning that gets you",
      description:
        "Skills for your present (and your future). Get started with us.",
      action: () => router.push("/subjects"),
    },

    {
      imgUrl: "/img/banner2.png",
      title: "Skills that drive you forward",
      description:
        "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
      action: () => router.push("/subjects"),
    },
    {
      imgUrl: "/img/banner1.png",
      title: "Learning that gets you",
      description:
        "Skills for your present (and your future). Get started with us.",
      action: () => router.push("/subjects"),
    },
    {
      imgUrl: "/img/banner2.png",
      title: "Skills that drive you forward",
      description:
        "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
      action: () => router.push("/subjects"),
    },
    {
      imgUrl: "/img/banner1.png",
      title: "Learning that gets you",
      description:
        "Skills for your present (and your future). Get started with us.",
      action: () => router.push("/subjects"),
    },
    {
      imgUrl: "/img/banner2.png",
      title: "Skills that drive you forward",
      description:
        "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
      action: () => router.push("/subjects"),
    },
  ];
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
      autoplay={true}
      autoplayInterval={9000}
    >
      <CarouselContent className="">
        {sliderShow.map((slide, index) => (
          <CarouselItem
            key={index}
            className="mx-2 h-[350px]"
            style={{
              backgroundImage: `url(${slide.imgUrl})`,
            }}
          >
            <Card className="bg-transparent relative">
              <CardContent className="flex flex-1 h-[350px] bg-transparent items-end justify-start p-6 bg-center"></CardContent>
              <div className="bg-white bg-opacity-75 p-4 max-w-lg absolute bottom-0 m-3 rounded shadow">
                <CardHeader className="pb-3">
                  <CardTitle>{slide.title}</CardTitle>
                  <CardDescription className="text-balance leading-relaxed">
                    {slide.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={slide.action!}>
                    View Subjects Available
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
