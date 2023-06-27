"use client";
import {
  BuildingStorefrontIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectGoogleValue } from "@/slices/googleSlice";
import { usePathname } from "next/navigation";

interface GoogleData {
  result?: {
    opening_hours: {
      weekday_text: string[];
    };
    international_phone_number: string;
  };
}

export default function Footer() {
  const googleData: GoogleData = useSelector(selectGoogleValue);
  const pathname = usePathname();

  return (
    <div className="relative w-screen">
      <div
        className={`flex z-10 mt-5 ${
          pathname === "/prodotti"
            ? "text-gray-300 bg-black/30"
            : " text-gray-800 bg-slate-400/30"
        }  backdrop-blur-md  rounded-t-2xl`}
      >
        <div className="flex flex-col-reverse md:grid md:grid-cols-6 w-full p-4 justify-center items-center gap-8 md:gap-0">
          <div className="flex flex-col lg:flex-row md:col-span-4 gap-2 items-center justify-center ">
            <div className="flex flex-col  w-72 gap-1">
              <a
                href="mailto:multistoretaranto@gmail.com"
                className={`flex items-center gap-3 hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                } `}
              >
                <EnvelopeIcon className="h-5" />
                <p>multistoretaranto@gmail.com</p>
              </a>
              <a
                href={`tel:${googleData?.result?.international_phone_number}`}
                className={`flex items-center gap-3 hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                } `}
              >
                <PhoneIcon className="h-5" />
                <p>{googleData?.result?.international_phone_number}</p>
              </a>
              <a
                href="https://www.google.com/maps/place/Multistore+Taranto/@40.4585005,17.2574073,17z/data=!3m1!4b1!4m6!3m5!1s0x134703b91e86ee75:0x20f2331f4696a631!8m2!3d40.4584964!4d17.2599822!16s%2Fg%2F11fl8cl29q?entry=ttu"
                className={`flex items-center gap-3 hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                } `}
              >
                <BuildingStorefrontIcon className="h-5" />
                <p>Viale Liguria 40 - Taranto</p>
              </a>
            </div>
            <div className="flex w-72 items-start gap-3">
              <ClockIcon className="h-5" />
              <div className="flex flex-col text-sm capitalize">
                {googleData?.result?.opening_hours.weekday_text.map(
                  (
                    day:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined,
                    index: React.Key | null | undefined
                  ) => (
                    <p key={index}>{day}</p>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-48">
            <div className="flex justify-center items-center gap-4">
              <Link
                href={"/"}
                className={`hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                }`}
              >
                Home
              </Link>
              <Link
                href={"/prodotti"}
                className={`hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                }`}
              >
                Catalogo
              </Link>
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/multistoretaranto"
                className={`flex items-center gap-2 hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                } cursor-pointer`}
              >
                <Image
                  src={"/facebook.png"}
                  title="Facebook"
                  alt="Facebook"
                  className={`h-8 w-auto aspect-auto object-contain cursor-pointer`}
                  width={512}
                  height={512}
                  loading="eager"
                  priority={true}
                />
                <p className="shrink-0">Multistore Taranto</p>
              </a>
              <a
                href="https://www.instagram.com/multistoretaranto"
                className={`flex items-center gap-2 hover:underline ${
                  pathname === "/prodotti"
                    ? "hover:text-[#5ecfff]"
                    : "hover:text-[#009473]"
                } cursor-pointer`}
              >
                <Image
                  src={"/instagram.png"}
                  title="Instagram"
                  alt="Instagram"
                  className={`h-8 w-auto aspect-auto object-contain cursor-pointer`}
                  width={512}
                  height={512}
                  loading="eager"
                  priority={true}
                />
                <p>@multistoretaranto</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
