"use client";
import React, { useRef } from "react";
import { ReactElement } from "react";
import Image from "next/image";
import GoogleMaps from "./(landing)/GoogleMaps";
import Logo from "./(landing)/Logo";
import Socials from "./(landing)/Socials";
import Story from "./(landing)/Story";
import Welcome from "./(landing)/Welcome";

export default function Home(): ReactElement {
  const storyRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const handleScrollToStory = () => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleScrollToLocation = () => {
    if (locationRef.current) {
      locationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const handleScrollToSocials = () => {
    if (socialRef.current) {
      socialRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="bg-white flex justify-center flex-grow z-0">
        <main className="w-full">
          <div className="flex flex-col w-full">
            <div className="z-10 flex pt-2 justify-center items-center xs:gap-12 text-gray-400 font-light text-sm md:text-base cursor-pointer text-center">
              <button onClick={handleScrollToStory}>La Nostra Storia</button>
              <button onClick={handleScrollToSocials}>Social</button>
              <button onClick={handleScrollToLocation}>Dove Trovarci</button>
            </div>
            <div className="relative w-full">
              <Logo />
              <div className="w-full">
                <Image
                  src={"/waves_bottom.svg"}
                  alt=""
                  className={`w-full aspect-video pointer-events-none`}
                  width={128}
                  height={80}
                  loading="eager"
                  priority={true}
                />
              </div>
            </div>
            <Welcome />
            <div className="max-h-32 -translate-y-[1px] overflow-visible -z-10">
              <Image
                src={"/waves_top.svg"}
                alt=""
                className={`w-full object-fill overflow-hidden border-0 pointer-events-none`}
                width={128}
                height={80}
                loading="eager"
                priority={true}
              />
            </div>
            <div
              ref={locationRef}
              className="flex flex-col bg-transparent overflow-hidden"
            >
              <Story storyRef={storyRef} />
              <div className="flex flex-col w-full max-w-7xl mx-auto gap-8 overflow-visible -mt-24 -mb-20 md:-mt-40 md:-mb-28 lg:-mt-80 lg:-mb-40 -z-10">
                <Image
                  src={"/dash_line_mobile.svg"}
                  alt=""
                  className={`md:hidden w-full object-fill overflow-hidden border-0 pointer-events-none`}
                  width={128}
                  height={80}
                  loading="eager"
                  priority={true}
                />
                <Image
                  src={"/dash_line_desktop.svg"}
                  alt=""
                  className={`hidden md:flex w-full object-fill overflow-hidden border-0 pointer-events-none`}
                  width={128}
                  height={80}
                  loading="eager"
                  priority={true}
                />
              </div>
              <div>
                <GoogleMaps locationRef={locationRef} />
              </div>
              <Socials socialRef={socialRef} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
