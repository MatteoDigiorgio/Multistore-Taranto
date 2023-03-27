import React from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";
import Menu from "./Menu";
import Image from "next/image";

export const MultistoreLogo = () => {
  return (
    <div className="flex  items-center my-2 mx-4 sm:flex-grow-0">
      <Link title="Home" passHref href="/">
        <Image
          alt="Multistore Taranto Logo"
          src="/multistore_big.png"
          width={100}
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
      <div className="flex xs:flex-grow sm:flex-none sm:w-96 items-center h-10 rounded-md cursor-pointer bg-multistore_blue-light ">
        <input
          className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus: outline-none px-4"
          type="text"
        />
        <div className="flex-none h-10 px-4 py-2 hover:bg-multistore_blue rounded-r-md">
          <MagnifyingGlassIcon
            width={20}
            height={20}
            className="stroke-white"
          />
        </div>
      </div>
    </>
  );
};

function Header() {
  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center flex-grow justify-between px-1 py-2 h-20 bg-multistore_green">
        <MultistoreLogo />
        <div className="flex xs:flex-grow sm:flex-none items-center text-xs mx-6 space-x-6">
          <SearchBar />
          <Menu />
        </div>
      </div>
    </header>
  );
}

export default Header;
