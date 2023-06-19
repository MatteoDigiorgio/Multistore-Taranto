"use client";
import React from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";

function Logo() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity transform duration-1000 ease-in-out "
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity transform duration-100 ease-in-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        <div className="flex justify-center items-center">
          <Image
            src={"/multistore_logo.png"}
            alt=""
            className="z-10 w-2/3 md:w-1/2"
            width={128}
            height={80}
            unoptimized={true}
          />
        </div>
      </Transition>
    </div>
  );
}

export default Logo;
