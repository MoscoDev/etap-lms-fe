import { cn } from "@/lib/utils";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

export default function CopyButton({
  value,
}: {
  value: string;
  copyable?: boolean;
}) {
  const [copying, setCopying] = useState<number>(0);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopying((c) => c + 1);
      setTimeout(() => {
        setCopying((c) => c - 1);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [value]);

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.5 },
  };

  return (
    <Button
      onClick={onCopy}
      aria-label="Copy code"
      variant="ghost"
      className={cn(
        `relative p-0 flex h-8 w-8 items-center justify-center rounded-md `
      )}
    >
      <MotionConfig transition={{ duration: 0.15 }}>
        <AnimatePresence initial={false} mode="wait">
          {copying ? (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="check"
              variants={variants}
            >
              <Check className="w-3 h-3" color="#FF871D" stroke="#FF871D" />
            </motion.div>
          ) : (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="copy"
              variants={variants}
            >
              <Copy className="w-3 h-3" color="#FF871D" stroke="#FF871D" />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Button>
  );
}
