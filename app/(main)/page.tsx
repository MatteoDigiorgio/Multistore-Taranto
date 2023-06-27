import React from "react";
import { ReactElement } from "react";
import MainLanding from "./(landing)/MainLanding";
import getGoogleData from "./getGoogleData";

export default async function Home(): Promise<ReactElement> {
  const data: object = await getGoogleData();
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
