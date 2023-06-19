"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Social from "../../../public/Socials.json";

function Socials({ socialRef }: { socialRef: any }) {
  const router = useRouter();

  const redirectToExternalPage = (page: string) => {
    router.push(page);
  };
  return (
    <div ref={socialRef} className="flex flex-col w-full gap-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Lottie animationData={Social} className="flex w-3/4 -z-10 mx-auto" />
        <div className="flex flex-col md:max-w-md gap-4 items-center md:items-start">
          <h1 className="flex whitespace-pre md:whitespace-normal justify-start items-start font-bold text-2xl md:text-4xl text-center">
            Resta sempre aggiornato{"\n"}seguendoci su 📲
          </h1>
          <div className="flex w-full justify-center gap-4">
            <Image
              src={"/facebook.png"}
              title="Facebook"
              alt="Facebook"
              className={`h-12 w-auto aspect-auto object-contain cursor-pointer`}
              width={512}
              height={512}
              loading="eager"
              priority={true}
              onClick={() =>
                redirectToExternalPage(
                  "https://www.facebook.com/multistoretaranto"
                )
              }
            />
            <Image
              src={"/instagram.png"}
              title="Instagram"
              alt="Instagram"
              className={`h-12 w-auto aspect-auto object-contain cursor-pointer`}
              width={512}
              height={512}
              loading="eager"
              priority={true}
              onClick={() =>
                redirectToExternalPage(
                  "https://www.instagram.com/multistoretaranto"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Socials;
