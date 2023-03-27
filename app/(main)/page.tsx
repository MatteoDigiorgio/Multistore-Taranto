import React from "react";
import { ReactElement } from "react";
import Landing from "./(landing)/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home(): ReactElement {
  return (
    <>
      <div className="bg-multistore_gray flex justify-center items-center flex-grow">
        <main className="mx-auto">
          <Landing />
        </main>
      </div>
    </>
  );
}
