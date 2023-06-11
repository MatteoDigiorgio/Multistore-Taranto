"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";
import Menu from "./Menu";
import Image from "next/image";
import { connect } from "react-redux";
import { updateInputValue } from "../../../slices/actions";
import { useRouter } from "next/navigation";

export const MultistoreLogo = () => {
  return (
    <div className="flex justify-center items-center mx-4 mt-4 md:w-1/6 md:mt-0 sm:flex-grow-0 md:justify-start">
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

export const SearchBar = ({
  inputValue,
  updateInputValue,
}: {
  inputValue: any;
  updateInputValue: any;
}) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = input.replace(/\s+/g, " ").trim();
    updateInputValue(trimmedValue);
    setInput("");
    router.push("/");
    if (inputRef.current) {
      inputRef.current.blur(); // Hide the keyboard
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-grow md:w-4/6 items-center text-xs mx-6 rounded-full h-10 cursor-pointer shadow-md"
    >
      <input
        ref={inputRef}
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-full text-base focus:outline-none px-4 placeholder:italic placeholder:text-slate-400"
        type="text"
        name="search"
        placeholder="Cerca Prodotto, Modello, Brand"
        value={input}
        onChange={handleChange}
      />
      <div
        className="flex-none h-10 px-4 py-2 bg-white rounded-r-full"
        onClick={() => handleSubmit}
      >
        <MagnifyingGlassIcon
          width={20}
          height={20}
          className="stroke-multistore_blue-light stroke-[2px]"
        />
      </div>
    </form>
  );
};

const mapStateToProps = (state: { inputValue: any }) => {
  return {
    inputValue: state.inputValue,
  };
};

const mapDispatchToProps = {
  updateInputValue,
};

const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

function Header() {
  return (
    <header className="z-50 fixed w-full">
      {/* Top nav */}
      <div className="grid grid-rows-2 grid-flow-col gap-4 items-center mx-1 h-32 bg-[#F9F9F9] md:flex md:flex-row md:h-20 md:px-5 shadow-lg z-50">
        <MultistoreLogo />
        <div className="absolute right-10 top-5 md:relative md:flex md:justify-end md:w-1/6 md:top-0 md:right-0 md:items-center md:order-last">
          <Menu />
        </div>
        <ConnectedSearchBar />
      </div>
    </header>
  );
}

export default Header;
