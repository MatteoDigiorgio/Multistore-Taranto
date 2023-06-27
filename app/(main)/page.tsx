import React from "react";
import { ReactElement } from "react";
import MainLanding from "./(landing)/MainLanding";

async function getData() {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJde6GHrkDRxMRMaaWRh8z8iA&language=it&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home(): Promise<ReactElement> {
  const data: object = await getData();
  return (
    <>
      <div className="bg-white flex justify-center flex-grow z-0">
        <main className="w-full">
          <MainLanding data={data} />
        </main>
      </div>
    </>
  );
}
