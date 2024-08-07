"use client";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-[#2c34c2] md:bg-[url('/img/bd.svg')] bg-[url('/img/bd.svg')] md:bg-right bg-bottom over-flow-hidden bg-contain bg-no-repeat sm:pb-0 pb-5"
      style={{
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container lg:px-20 md:px-10 px-5">
        <div className="header w-full relatve md:py-6">
          <div className="relative mx-auto h-full py-6">
            <nav className="flex h-full flex-row gap-5 items-center justify-between lg:justify-start">
              <div className="flex lg:flex-1  md:pt-0 pt-5">
                <Link href="/" className="w-full max-w-28 md:w-36">
                  <Image
                    className=""
                    src="/img/logo.png"
                    width="147"
                    height={70}
                    alt=""
                  />
                </Link>
              </div>

              <div className="md:flex hidden md:flex-row flex-col md:items-center md:gap-5 gap-1">
                <Sheet>
                  <SheetTrigger>
                    <span className="text-white text-sm hover:underline underline-offset-4">
                      Contact Us
                    </span>
                  </SheetTrigger>
                  <SheetContent className="w-full pt-10">
                    <div className="flex flex-col gap-2 text-sm">
                      <h4 className="font-bold text-lg">We are here to help</h4>
                      <p>
                        <b>Email: </b>
                        <a
                          href="mailto:admin@etap.com"
                          className="text-[#240C4B]"
                        >
                          admin@etap.com
                        </a>
                      </p>
                      <p>
                        <b>Phone:</b>{" "}
                        <a href="tel:07043841461" className="text-[#240C4B]">
                          0704005827
                        </a>
                      </p>
                      <p>
                        <b>Address:</b>{" "}
                        <span className="text-[#240C4B]">Ottawa, CA</span>
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <Sheet>
                <SheetTrigger className="md:hidden block">
                  <Menu size={24} color="#fff" />
                </SheetTrigger>
                <SheetContent className="w-full flex flex-col gap-5 pt-10">
                  <a
                    href="javascript:void(Tawk_API.toggle())"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Contact Us
                  </a>
                  <Link
                    className="text-sm hover:underline underline-offset-4"
                    href="/terms-and-conditions"
                  >
                    <span>Terms and Conditions</span>
                  </Link>
                  <Link
                    className="text-sm hover:underline underline-offset-4"
                    href="/privacy-policy"
                  >
                    <span>Privacy Policy</span>
                  </Link>
                  <Link
                    className="text-sm hover:underline underline-offset-4"
                    href="/refund-policy"
                  >
                    <span>Refund Policy</span>
                  </Link>
                  <div className="flex flex-col gap-2 text-sm">
                    <h4 className="font-bold text-lg">We are here to help</h4>
                    <p>
                      <b>Email: </b>
                      <a
                        href="mailto:admin@etap.com"
                        className="text-[#D40C4E]"
                      >
                        admin@etap.com
                      </a>
                    </p>
                    <p>
                      <b>Phone:</b>{" "}
                      <a href="tel:07043841461" className="text-[#D40C4E]">
                        07043841461
                      </a>
                    </p>
                    <p>
                      <b>Address:</b>{" "}
                      <span className="text-[#D40C4E]">
                        5 Petit Daho street, Somolu
                      </span>
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
        <div className="w-full flex justify-between flex-col md:flex-row">
          <div className="flex flex-col md:mt-16 mt-6 pb-8">
            <h1 className="animate-fade-up animate-ease-in-out animate-duration-1000 text-center md:text-left md:block text-3xl font-bold  text-white sm:text-5xl text-wrap max-w-full md:max-w-[531px] md:font-bold md:leading-none lg:text-6xl">
              Innovative Learning, Inspiring Results{" "}
            </h1>
            <p className="animate-fade-up animate-ease-in-out animate-delay-100 animate-duration-1000 mt-4 text-sm font-light leading-7 tracking-wide text-white text-wrap max-w-full md:max-w-[455px] lg:text-lg flex  md:text-left text-center opacity-65 md:mx-0 mx-auto ">
              Unlock your potential with cutting-edge courses. Transform your
              knowledge into real-world success.
            </p>
            <div className="animate-fade-up animate-duration-1000 animate-ease-in-out animate-delay-200 mt-12 flex flex-wrap sm:flex-row flex-col justify-start gap-4 md:gap-6 md:mx-0 mx-auto">
              <Link
                href={"/register"}
                type="submit"
                className=" md:w-content p-3 flex text-base items-center justify-center gap-1 rounded-md bg-[#D40C4E]  transition-colors ease-in font-medium text-[#240C4B] hover:bg-[#D40C4E] hover:text-[#240C4B]"
              >
                <span>Start Learning</span>
              </Link>
              <Link
                href={"/login"}
                className="md:w-content py-3 md:pr-3 flex items-center justify-center gap-3 rounded-md font-medium text-white duration-200 bg-transparent text-base"
              >
                <span>Continue my course</span>
                <span>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33301 13.8337L11.6663 10.5003L8.33301 7.16699"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="w-full flex animate-fade-down animate-duration-1000 animate-ease-in-out animate-delay-50 justify-center overflow-hidden max-w-[450px] md:mx-0 mx-auto md:mt-0 mt-10 ">
            <Image
              src={
                "https://academyocean.com/img/webflow/solution/social-learning/Group-4331.webp"
              }
              className="object-contain h-full w-full"
              alt="hero image"
              width={700}
              height={1000}
            />
          </div>
        </div>
        <div>
          <p className="text-xs sm:absolute relative bottom-0 font-light lg:leading-7 leading-5 tracking-wide text-white text-wrap max-w-full md:max-w-[455px] lg:text-base md:text-left text-center opacity-65 md:my-6 my-5 justify-center md:justify-start ">
            Tested and Trusted by{" "}
            <span className="text-[#99C0FF] pr-1 pl-1"> 1,500+ </span> Students
            across Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}
