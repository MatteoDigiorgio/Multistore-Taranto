"use client";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Pin from "../../../public/Pin.json";
import { useSelector } from "react-redux";
import { ClockIcon } from "@heroicons/react/20/solid";
import { selectGoogleValue } from "@/slices/googleSlice";

interface GoogleData {
  result?: {
    opening_hours: {
      weekday_text: string[];
    };
  };
}

function GoogleMaps({ locationRef }: { locationRef: any }) {
  const router = useRouter();
  const googleData: GoogleData = useSelector(selectGoogleValue);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS!,
    language: "it",
  });

  if (!isLoaded) return <div>Loading...</div>;

  const redirectToExternalPage = (page: string) => {
    router.push(page);
  };
  return (
    <>
      <div
        className="flex flex-col w-full max-w-7xl mx-auto gap-4 p-8"
        ref={locationRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 items-center">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-end justify-center md:justify-end gap-2">
            <h1 className="inline-block align-baseline items-end font-bold text-2xl md:text-4xl ">
              Dove Siamo
            </h1>
            <Lottie animationData={Pin} className="flex w-8 items-start" />
          </div>
          <h2 className="flex md:order-last xl:order-none items-end justify-center md:justify-end xl:justify-center md:pr-6 text-center text-sm md:text-xl whitespace-pre">
            Vienici a trovare in{"\n"}Viale Liguria 40 - Taranto
          </h2>
          <div className="flex flex-col md:flex-row md:row-span-2 xl:row-span-1 items-center gap-3 justify-center md:justify-start">
            <ClockIcon className="h-7" />
            <div className="flex flex-col  text-sm capitalize items-center">
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
        <div className="h-80 m-4">
          <GoogleMap
            zoom={16}
            center={{ lat: 40.45851422869044, lng: 17.259984879017054 }}
            mapContainerClassName={styles.map_container}
          >
            <Marker
              title="Marker"
              position={{ lat: 40.45851422869044, lng: 17.259984879017054 }}
              icon={{
                url: "/pinpoint.png",
                scaledSize: new window.google.maps.Size(70, 70),
              }}
              onClick={() =>
                redirectToExternalPage(
                  "https://www.google.com/maps/place/Multistore+Taranto/@40.4585005,17.2574073,17z/data=!3m1!4b1!4m6!3m5!1s0x134703b91e86ee75:0x20f2331f4696a631!8m2!3d40.4584964!4d17.2599822!16s%2Fg%2F11fl8cl29q?entry=ttu"
                )
              }
            />
          </GoogleMap>
        </div>
      </div>
    </>
  );
}

export default GoogleMaps;
