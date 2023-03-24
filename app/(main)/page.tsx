import React from "react";
import { ReactElement } from "react";
import Landing from "./(landing)/Landing";

export default function Home(): ReactElement {
  return (
    <>
      <div className="bg-multistore_gray">
        <main className="mx-auto">
          <Landing />
        </main>
      </div>
    </>
  );
}
