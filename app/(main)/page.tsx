import React from "react";
import { ReactElement } from "react";
import Image from "next/image";

export default function Home(): ReactElement {
  return (
    <>
      <div className="bg-white flex justify-center flex-grow z-0">
        <main className="w-full">
          <div className="flex w-full">
            <div className="relative w-full">
              <div className="absolute inset-0 flex justify-center items-center ">
                <Image
                  src={"/multistore_logo.png"}
                  alt=""
                  className={`z-10 w-2/3`}
                  width={128}
                  height={80}
                  unoptimized={true}
                />
              </div>
              <div className="w-full">
                <Image
                  src={"/waves_bottom.svg"}
                  alt=""
                  className={`w-full`}
                  width={128}
                  height={80}
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-20  md:h-80 bg-[#009473]"></div>
          <div className="w-full">
            <Image
              src={"/waves_top.svg"}
              alt=""
              className={`w-full`}
              width={128}
              height={80}
              unoptimized={true}
            />
          </div>
        </main>
      </div>
    </>
  );
}
