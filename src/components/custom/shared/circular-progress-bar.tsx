import { motion } from "framer-motion";

type CircleProgressProps = {
  value: number;
  size: number;
  className?: string;
};

export default function CircleProgress({
  value,
  size,
  className,
}: CircleProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-[${size}] h-[${size}]`}>
      <defs>
        <radialGradient
          id="circle-progress"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.1659 -18.1884) rotate(51.1683) scale(267.012 282.957)"
        >
          <stop stopColor="#F05F84" />
          <stop offset="1" stopColor="#FD312E" />
        </radialGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-neutral-300 stroke-[20px]"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        }}
      />

      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeLinecap="round"
        className="fill-none stroke-[url('#circle-progress')] stroke-[20px]"
        initial={{ strokeDashoffset: circumference, strokeDasharray: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ stiffness: 260, damping: 20, delay: 0.5, duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

