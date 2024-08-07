"use client";
import { CheckCircle2Icon } from "lucide-react";
import useTopics from "./use-topics";
import { Button } from "@/components/ui/button";
export default function Topics() {
  const {
    topics,
    completedAllTopics,
    currentTopic,
    setCurrentTopic,
    completeTopic,
    completeSubject,
  } = useTopics();
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
                {currentTopic && (
                  <Button
                    disabled={!currentTopic || currentTopic.isCompleted}
                    onClick={() => completeTopic(currentTopic?.id)}
                  >
                    Complete Topic
                  </Button>
                )}
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
            {topics.map((topic) => (
              <div key={topic.id} className="">
                <Button
                  onClick={() => setCurrentTopic(topic)}
                  disabled={topic.isCompleted}
                  className="flex items-center justify-between rounded-md bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 w-full"
                >
                  <div className="flex items-center gap-3">
                    <PlayIcon className="w-5 h-5" />
                    <span>{topic.title}</span>
                  </div>
                  {currentTopic?.id === topic.id && (
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      Current
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={completeSubject}
            disabled={!completedAllTopics}
            className=""
          >
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="w-5 h-5" />
              <span>Complete Subject</span>
            </div>
          </Button>
        </div>
      </div>
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
