import React from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";
import Menu from "./Menu";
import Image from "next/image";

export const MultistoreLogo = () => {
  return (
    <div className="flex justify-center items-center mx-4 sm:flex-grow-0 md:justify-start">
      <Link title="Home" passHref href="/">
        <Image
          alt="Multistore Taranto Logo"
          src="/multistore_logo.png"
          width={120}
          height={50}
          className="object-contain cursor-pointer "
        />
      </Link>
    </div>
  );
};

export const SearchBar = () => {
  return (
    <>
      <div className="flex flex-grow  items-center text-xs mx-6 rounded-full h-10 cursor-pointer shadow-md">
        <input
          className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-full focus: outline-none px-4 placeholder:italic placeholder:text-slate-400"
          type="text"
          placeholder="Cerca Prodotto, Modello, Brand"
        />
        <div className="flex-none h-10 px-4 py-2 bg-white rounded-r-full">
          <MagnifyingGlassIcon
            width={20}
            height={20}
            className="stroke-multistore_blue-light stroke-[2px]"
          />
        </div>
      </div>
    </>
  );
};

function Header() {
  return (
    <header className="z-50">
      {/* Top nav */}
      <div className="grid grid-rows-2 grid-flow-col gap-4 items-center mx-1 my-2 h-32 bg-[#F9F9F9] md:grid-rows-1 md:grid-cols-3 md:h-20 md:px-5 shadow-lg z-50">
        <MultistoreLogo />
        <div className="absolute right-10 top-5 md:top-7 md:items-center md:order-last">
          <Menu />
        </div>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
