"use client";;
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTopics, { Topic } from "./use-topics";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LeaderBoard from "@/components/custom/leader-boder";

const topicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video_url: z.string().url("Invalid URL"),
});

type CreateTopicDTO = z.infer<typeof topicSchema>;

export default function Topics() {
  const {
    topics,
    completedAllTopics,
    currentTopic,
    setCurrentTopic,
    completeTopic,
    completeSubject,
    createNewTopic,
  } = useTopics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateTopicDTO>({
    resolver: zodResolver(topicSchema),
  });

  const videoUrl = watch("video_url");
  const [isValidVideoUrl, setIsValidVideoUrl] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.oncanplay = () => setIsValidVideoUrl(true);
      video.onerror = () => setIsValidVideoUrl(false);
    }
  }, [videoUrl]);

  const onSubmit: SubmitHandler<CreateTopicDTO> = (data: CreateTopicDTO) => {
    if (isValidVideoUrl) {
      createNewTopic(data);
      reset();
    } else {
      alert("Invalid video URL");
    }
  };

  return (
    <div className="max-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 w-full max-w-[1400px] mx-auto py-12 md:py-8 px-4 md:px-6">
        <div className="flex flex-col gap-3">
          <div className="rounded-xl overflow-hidden aspect-video relative">
            <video
              className="w-full max-h-[600px] object-cover"
              controls={true}
              autoPlay
              src={currentTopic?.video_url}
            >
              <track
                kind="captions"
                src="/video-commentary.vtt"
                srcLang="en"
                label="English"
              />
            </video>
          </div>
          <div className="p-3 rounded-lg bg-muted w-full container overflow-y-auto">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  {currentTopic?.title}
                </h2>
              </div>
              <div>
                <h3 className="text-base md:text-base font-medium">
                  Description
                </h3>
                <p className="text-sm md:text-sm text-muted-foreground">
                  {currentTopic?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-xl max-h-[600px] overflow-y-scroll flex flex-col p-6 space-y-4">
          <h3 className="text-xl font-semibold">Topics</h3>
          <div className="space-y-2 flex-1">
            {topics.map((topic: Topic) => (
              <div key={topic.id} className="">
                <Button
                  onClick={() => setCurrentTopic(topic)}
                  className="flex items-center justify-between rounded-md bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 w-full"
                >
                  <div className="flex items-center gap-3">
                    <PlayIcon className="w-5 h-5" />
                    <span>{topic.title}</span>
                  </div>
                  {currentTopic?.id === topic.id && (
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      playing
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Create Topic</Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-md">
              <SheetHeader>
                <SheetTitle>Create Topic</SheetTitle>
                <SheetDescription>
                  Fill out the form to create a new topic.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter topic title"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter topic description"
                        className="min-h-[100px]"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4">
                      <Label htmlFor="video_url">Video URL</Label>
                      <Input
                        id="video_url"
                        placeholder="Enter topic video URL"
                        {...register("video_url")}
                      />
                      {errors.video_url && (
                        <p className="text-red-500 text-sm">
                          {errors.video_url.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {videoUrl && isValidVideoUrl && (
                    <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-span-4">
                      <video
                        className="w-full mt-4"
                        controls
                        src={videoUrl}
                      ></video>
                    </div>
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">
                      <div className="flex items-center gap-3">
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>Add Topic</span>
                      </div>
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <LeaderBoard />
    </div>
  );
}

/**
 * PlayIcon component
 *
 * @param {React.SVGProps<SVGSVGElement>} props - SVG props
 * @returns {React.ReactElement} - The PlayIcon component
 */
function PlayIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
