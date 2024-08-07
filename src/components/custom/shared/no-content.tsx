"use client";
export default function NoContentFallback({title ,children }: { title:string; children?: React.ReactNode | React.ReactNode[] }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="bg-muted rounded-full p-4">
        <FileMinusIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{`No ${title} Available`}</h3>
        <p className="text-muted-foreground">
          {`There is currently no ${title} to display.`}
        </p>
        {children}
      </div>
    </div>
  )
}

function FileMinusIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 15h6" />
    </svg>
  )
}