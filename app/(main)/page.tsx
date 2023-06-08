import React from "react";
import { ReactElement } from "react";
import Landing from "./(landing)/Landing";

export default function Home(): ReactElement {
  return (
    <>
      <div className="bg-white flex justify-center flex-grow z-0">
        <main className="mx-auto">
          <Landing />
        </main>
      </div>
    </>
  );
}
