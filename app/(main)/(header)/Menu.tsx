"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ComputerIcon from "@mui/icons-material/Computer";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import PrintIcon from "@mui/icons-material/Print";
import SellIcon from "@mui/icons-material/Sell";

const everything: Array<any> = [
  { page: "/", text: "Frigoriferi" },
  { page: "/", text: "Congelatori" },
  { page: "/", text: "Lavatrici" },
  { page: "/", text: "Asciugatrici" },
  { page: "/", text: "Lavastoviglie" },
  { page: "/", text: "Monopattini" },
  { page: "/", text: "Telefonia" },
  { page: "/", text: "Tablet" },
  { page: "/", text: "Notebook" },
  { page: "/", text: "Cordless" },
  { page: "/", text: "Console" },
  { page: "/", text: "Televisori" },
  { page: "/", text: "Forni" },
  { page: "/", text: "Climatizzatori" },
  { page: "/", text: "Ventilatori" },
  { page: "/", text: "Stufe" },
  { page: "/", text: "Fotocopie" },
  { page: "/", text: "Fax" },
];

const mainMenu: Array<any> = [
  {
    page: "/",
    text: "Elettrodomestici",
    color: "bg-rose-500",
    icon: <MicrowaveIcon />,
  },
  {
    page: "/",
    text: "Telefonia",
    color: "bg-sky-400",
    icon: <SmartphoneIcon />,
  },
  {
    page: "/",
    text: "Televisori",
    color: "bg-purple-400",
    icon: <LiveTvIcon />,
  },
  {
    page: "/",
    text: "Informatica",
    color: "bg-orange-500",
    icon: <ComputerIcon />,
  },
  {
    page: "/",
    text: "Console e Videogiochi",
    color: "bg-lime-500",
    icon: <GamepadIcon />,
  },
  {
    page: "/",
    text: "Monopattini",
    color: "bg-zinc-400",
    icon: <ElectricScooterIcon />,
  },
  {
    page: "/",
    text: "Fotocopie e Fax",
    color: "bg-red-500",
    icon: <PrintIcon />,
  },
  { page: "/", text: "Marche", color: "bg-yellow-500", icon: <SellIcon /> },
];

const elettrodomesticiMenu: Array<any> = [
  { page: "/", text: "Frigoriferi" },
  { page: "/", text: "Congelatori" },
  { page: "/", text: "Lavatrici" },
  { page: "/", text: "Asciugatrici" },
  { page: "/", text: "Lavastoviglie" },
  { page: "/", text: "Forni" },
  { page: "/", text: "Climatizzatori" },
  { page: "/", text: "Ventilatori" },
  { page: "/", text: "Stufe" },
];

const telefoniaMenu: Array<any> = [
  { page: "/", text: "Smarthphone e Cellulari" },
  { page: "/", text: "Cordless" },
  { page: "/", text: "Accessori Telefonia" },
];

const televisoriMenu: Array<any> = [
  { page: "/", text: "Televisori" },
  { page: "/", text: "DVD e Blu-ray" },
  { page: "/", text: "Accessori Televisori" },
];

const informaticaMenu: Array<any> = [
  { page: "/", text: "Notebook" },
  { page: "/", text: "Tablet" },
  { page: "/", text: "Accessori Informatica" },
];

export const MultistoreLogo = () => {
  return (
    <Link title="Home" passHref href="/">
      <Image
        alt="Multistore Taranto Logo"
        src="/multistore_logo.png"
        width={120}
        height={50}
        className="object-contain cursor-pointer "
      />
    </Link>
  );
};

export const Item = (props: { key: string; item: any }) => {
  return (
    <div className="h-24 justify-items-center">
      <Link
        title={`${props.item.text}`}
        passHref
        href={`${props.item.page}`}
        className="flex flex-col items-center"
      >
        <div
          className={`rounded-full ${props.item.color} h-16 w-16 drop-shadow-xl flex items-center justify-center`}
        >
          {props.item.icon}
        </div>
        <p className="w-18 text-sm text-center">{props.item.text}</p>
      </Link>
    </div>
  );
};

function Menu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const NavSidebar = () => {
    return (
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key={"menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="top-0 right-0 fixed max-h-screen w-full bg-[#F9F9F9] z-40"
          >
            <nav className="mx-3 text-black">
              <div className="h-screen overflow-y-scroll">
                <div className="h-28 mx-3">
                  <div className="flex justify-center content-start h-full mt-2 ">
                    <MultistoreLogo />
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute right-10 top-5"
                  >
                    <XMarkIcon height={24} className="stroke-black" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-y-8 justify-items-center">
                  {mainMenu.map((item) => (
                    <Item key={item.text} item={item} />
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <button
        className="md:justify-items-end"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Bars3Icon height={24} className="stroke-black" />
      </button>
      <NavSidebar />
    </>
  );
}

export default Menu;
