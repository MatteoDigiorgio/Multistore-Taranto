"use client";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";

function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS!,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={16}
      center={{ lat: 40.45851422869044, lng: 17.259984879017054 }}
      mapContainerClassName={styles.map_container}
    >
      <Marker position={{ lat: 40.45851422869044, lng: 17.259984879017054 }} />
    </GoogleMap>
  );
}

export default GoogleMaps;
