"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ComputerIcon from "@mui/icons-material/Computer";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import PrintIcon from "@mui/icons-material/Print";
import SellIcon from "@mui/icons-material/Sell";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { redirect } from "next/navigation";

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

type MainMenu = {
  page: string;
  text: string;
  color: string;
  icon: any;
  subMenu: { page: string; text: string }[] | null;
};

const mainMenu: Array<MainMenu> = [
  {
    page: "/",
    text: "Elettrodomestici",
    color: "bg-rose-500",
    icon: <MicrowaveIcon />,
    subMenu: [
      { page: "/", text: "Frigoriferi" },
      { page: "/", text: "Congelatori" },
      { page: "/", text: "Lavatrici" },
      { page: "/", text: "Asciugatrici" },
      { page: "/", text: "Lavastoviglie" },
      { page: "/", text: "Forni" },
      { page: "/", text: "Climatizzatori" },
      { page: "/", text: "Ventilatori" },
      { page: "/", text: "Stufe" },
    ],
  },
  {
    page: "/",
    text: "Telefonia",
    color: "bg-sky-400",
    icon: <SmartphoneIcon />,
    subMenu: [
      { page: "/", text: "Smarthphone e Cellulari" },
      { page: "/", text: "Cordless" },
      { page: "/", text: "Accessori Telefonia" },
    ],
  },
  {
    page: "/",
    text: "Televisori",
    color: "bg-purple-400",
    icon: <LiveTvIcon />,
    subMenu: [
      { page: "/", text: "Televisori" },
      { page: "/", text: "DVD e Blu-ray" },
      { page: "/", text: "Accessori Televisori" },
    ],
  },
  {
    page: "/",
    text: "Informatica",
    color: "bg-orange-500",
    icon: <ComputerIcon />,
    subMenu: [
      { page: "/", text: "Notebook" },
      { page: "/", text: "Tablet" },
      { page: "/", text: "Accessori Informatica" },
    ],
  },
  {
    page: "/",
    text: "Console e Videogiochi",
    color: "bg-lime-500",
    icon: <GamepadIcon />,
    subMenu: [
      { page: "/", text: "Playstation 5" },
      { page: "/", text: "Playstation 4" },
      { page: "/", text: "Nintendo Switch" },
    ],
  },
  {
    page: "/",
    text: "Monopattini",
    color: "bg-zinc-400",
    icon: <ElectricScooterIcon />,
    subMenu: null,
  },
  {
    page: "/",
    text: "Fotocopie e Fax",
    color: "bg-red-500",
    icon: <PrintIcon />,
    subMenu: null,
  },
  {
    page: "",
    text: "Marche",
    color: "bg-yellow-500",
    icon: <SellIcon />,
    subMenu: [
      { page: "/", text: "Acer" },
      { page: "/", text: "Apple" },
      { page: "/", text: "LG" },
      { page: "/", text: "Samsung" },
      { page: "/", text: "Nokia" },
      { page: "/", text: "Sony" },
    ],
  },
  {
    page: "/auth/admin",
    text: "Admin",
    color: "bg-gray-300",
    icon: <AdminPanelSettingsIcon />,
    subMenu: null,
  },
];

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, when: "beforeChildren" },
  },
};

const subMenuVariants: Variants = {
  hidden: { opacity: 0, y: "+100vw" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

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

export const TopNavMenu = ({
  isSubMenuOpen,
  setIsSubMenuOpen,
  setIsSubMenuOpenAndisMenuOpen,
}: {
  isSubMenuOpen: boolean;
  setIsSubMenuOpen: any;
  setIsSubMenuOpenAndisMenuOpen: any;
}) => {
  return (
    <div className="h-24 mx-3">
      {isSubMenuOpen && (
        <button onClick={setIsSubMenuOpen} className="absolute left-10 top-5">
          <ArrowLeftIcon height={24} className="stroke-black" />
        </button>
      )}
      <div className="flex justify-center content-start mt-2 ">
        <MultistoreLogo />
      </div>
      <button
        onClick={setIsSubMenuOpenAndisMenuOpen}
        className="absolute right-10 top-5"
      >
        <XMarkIcon height={24} className="stroke-black" />
      </button>
    </div>
  );
};

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [thisWhichMenu, setWhichMenu] = useState("");

  const NavMenu = () => {
    return (
      <>
        {isMenuOpen && (
          <motion.div
            key={"menu"}
            variants={menuVariants}
            initial="hidden"
            animate={isMenuOpen ? "visible" : {}}
            className="top-0 right-0 fixed h-screen w-full bg-[#F9F9F9] z-50"
          >
            <nav className="mx-3 text-black">
              <TopNavMenu
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={() => setIsSubMenuOpen(false)}
                setIsSubMenuOpenAndisMenuOpen={() => {
                  setIsMenuOpen(false);
                  setIsSubMenuOpen(false);
                }}
              />

              <div className="grid grid-cols-3 gap-y-8 justify-items-center">
                {mainMenu.map((item) => (
                  <>
                    <div className="h-24 justify-items-center">
                      {/* TODO: Distinguere tra link e submenu */}
                      <Link title="Menu" passHref href={item.page}>
                        <button
                          onClick={() => {
                            if (item.subMenu === null) {
                              redirect(item.page);
                            } else {
                              setIsSubMenuOpen(true), setWhichMenu(item.text);
                            }
                          }}
                          className="flex flex-col items-center"
                        >
                          {/* Circular button */}
                          <div
                            className={`rounded-full ${item.color} h-16 w-16 drop-shadow-xl flex items-center justify-center`}
                          >
                            {item.icon}
                          </div>
                          <li className="w-18 text-sm text-center list-none">
                            {item.text}
                          </li>
                          {/* Sub Menu for each category */}
                          {item.subMenu && item.text === thisWhichMenu && (
                            <motion.div
                              key={`submenu-${item.text}`}
                              variants={subMenuVariants}
                              initial="hidden"
                              animate={isSubMenuOpen ? "visible" : {}}
                              className={`fixed top-24 right-0 left-0 bottom-0 h-screen w-full p-6 text-left bg-white z-50 rounded-t-xl cursor-default shadow-[0_4px_24px_15px_rgba(32,33,36,.05)]`}
                            >
                              {/* List for the Sub Menu */}
                              <h1 className="text-xl font-semibold">
                                {item.text}
                              </h1>
                              <ul className="divide-y">
                                {item.subMenu &&
                                  item.subMenu.map((subMenuItem) => (
                                    <>
                                      <li
                                        className="text-sm p-4"
                                        onClick={void 0}
                                      >
                                        <Link
                                          title={`${subMenuItem.text}`}
                                          passHref
                                          href={`${subMenuItem.page}`}
                                          className="flex justify-between items-center"
                                        >
                                          {subMenuItem.text}
                                          <ChevronRightIcon
                                            height={24}
                                            className="stroke-blue-500 justify-item-end"
                                          />
                                        </Link>
                                      </li>
                                    </>
                                  ))}
                              </ul>
                            </motion.div>
                          )}
                        </button>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </>
    );
  };

  return (
    <>
      <button
        className="md:justify-items-end"
        onClick={() => setIsMenuOpen(true)}
      >
        <Bars3Icon height={24} className="stroke-black" />
      </button>
      <NavMenu />
    </>
  );
}

export default Menu;
