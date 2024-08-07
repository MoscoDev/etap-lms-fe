import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

/**
 * Renders the layout for authentication pages.
 *
 * @param {React.PropsWithChildren} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactElement} The rendered layout.
 */
export function AuthLayout({
  children,
}: React.PropsWithChildren): React.ReactElement {
  return (
    <div
      className={`relative h-screen flex items-center justify-center bg-[url('/img/bq.png')] bg-cover bg-center over-flow-hidden bg-no-repeat sm:pb-0 pb-5`}
      style={{
        backgroundRepeat: "no-repeat",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="absolute z-0 inset-0 bg-black opacity-20"></div>
      <div className="w-full flex items-center justify-center">
        <Card
          className="md:max-w-[628px] flex flex-col gap-6 w-full  justify-center sm:p-12 p-0 border-0 sm:rounded-[40px] backdrop-blur-md text-white sm:h-auto h-screen rounded-none"
          style={{
            background:
              "linear-gradient(305deg, rgba(255, 255, 255, 0.00) 2.08%, rgba(255, 255, 255, 0.053) 89.5%), rgba(29, 29, 29, 0.70)",
          }}
        >
          <CardHeader>
            <CardTitle className="">
              <Link
                href="/"
                className={`flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground w-auto`}
              >
                <Image
                  width={"70"}
                  priority
                  height={"0"}
                  src="/img/logo.png"
                  alt=""
                  className="w-auto h-auto"
                />

                <span className="sr-only">{"etap LMS"}</span>
              </Link>
            </CardTitle>
          </CardHeader>
          {children}
        </Card>
      </div>
    </div>
  );
}

export default AuthLayout;
