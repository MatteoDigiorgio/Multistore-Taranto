"use client";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";
import { useRouter } from "next/navigation";

function GoogleMaps({ locationRef }: { locationRef: any }) {
  const router = useRouter();

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
      <div className="flex flex-col w-full gap-4 p-8" ref={locationRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          <h1 className="flex whitespace-pre justify-center md:justify-end items-start font-bold text-2xl md:text-4xl text-center">
            Dove Siamo 📍
          </h1>
          <h2 className="flex justify-center md:justify-start items-center text-center text-sm md:text-xl whitespace-pre">
            Vienici a trovare in{"\n"}Viale Liguria 40 - Taranto
          </h2>
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
