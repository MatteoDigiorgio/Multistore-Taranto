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
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ComputerIcon from "@mui/icons-material/Computer";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import PrintIcon from "@mui/icons-material/Print";
import SellIcon from "@mui/icons-material/Sell";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { redirect, useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";

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
  page: string | null;
  text: string;
  color: string;
  icon: any;
  subMenu: { page: string; text: string }[] | null;
};

const mainMenu: Array<MainMenu> = [
  {
    page: null,
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
    page: null,
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
    page: null,
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
    page: null,
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
    page: null,
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
    page: "/monopattini",
    text: "Monopattini",
    color: "bg-zinc-400",
    icon: <ElectricScooterIcon />,
    subMenu: null,
  },
  {
    page: "/fotocopiefax",
    text: "Fotocopie e Fax",
    color: "bg-red-500",
    icon: <PrintIcon />,
    subMenu: null,
  },
  {
    page: null,
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

export const MultistoreLogo = () => {
  return (
    <Link title="Home" passHref href="/">
      <Image
        alt="Multistore Taranto Logo"
        src="/multistore_logo.png"
        width={120}
        height={50}
        className="object-contain cursor-pointer "
        unoptimized={true}
      />
    </Link>
  );
};

export const TopNavMenu = ({
  isSubMenuOpen,
  setIsSubMenuOpen,
  setIsSubMenuOpenAndIsMenuOpen,
}: {
  isSubMenuOpen: boolean;
  setIsSubMenuOpen: any;
  setIsSubMenuOpenAndIsMenuOpen: any;
}) => {
  return (
    <div className="h-24 mx-3">
      {isSubMenuOpen && (
        <button onClick={setIsSubMenuOpen} className="absolute left-6 top-7">
          <ArrowLeftIcon height={24} className="stroke-black" />
        </button>
      )}
      <div className="flex justify-center content-start mt-2 ">
        <MultistoreLogo />
      </div>
      <button
        onClick={setIsSubMenuOpenAndIsMenuOpen}
        className="absolute right-6 top-7"
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
  const router = useRouter();

  const NavMenu = () => {
    return (
      <>
        {isMenuOpen && (
          <div
            key={"menu"}
            className="top-0 right-0 fixed h-screen w-full bg-[#F9F9F9] z-50 md:top-28 md:right-8 md:h-auto md:w-[470px] md:rounded-md md:shadow-md"
          >
            <nav className="m-3 text-black">
              <TopNavMenu
                isSubMenuOpen={isSubMenuOpen}
                setIsSubMenuOpen={() => setIsSubMenuOpen(false)}
                setIsSubMenuOpenAndIsMenuOpen={() => {
                  setIsMenuOpen(false);
                  setIsSubMenuOpen(false);
                }}
              />

              <div className="grid grid-cols-3 gap-y-8 justify-items-center">
                {mainMenu.map((item) => (
                  <>
                    <div className="h-24 justify-items-center">
                      <div>
                        <button
                          onClick={() => {
                            if (item.subMenu === null && item.page) {
                              setIsMenuOpen(false);
                              router.push(item.page);
                            } else {
                              setIsSubMenuOpen(true), setWhichMenu(item.text);
                            }
                          }}
                          className="flex flex-col items-center"
                        >
                          {/* Circular button */}
                          <div
                            className={`rounded-full ${item.color} h-16 w-16 drop-shadow-xl flex items-center justify-center hover:-translate-y-2 hover:scale-110 hover:duration-300`}
                          >
                            {item.icon}
                          </div>
                          <li className="w-18 text-sm text-center list-none">
                            {item.text}
                          </li>
                          {/* Sub Menu for each category */}
                          {isSubMenuOpen &&
                            item.subMenu &&
                            item.text === thisWhichMenu && (
                              <div
                                key={`submenu-${item.text}`}
                                className={`absolute top-24 left-0 right-0 bottom-0 overflow-auto overscroll-contain p-6 text-left bg-white z-50 rounded-t-xl rounded-b-md cursor-default shadow-[0_4px_24px_15px_rgba(32,33,36,.05)]`}
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
                                            onClick={() => {
                                              setIsMenuOpen(false);
                                              setIsSubMenuOpen(false);
                                            }}
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
                              </div>
                            )}
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </nav>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className={`hidden ${
          isMenuOpen && "md:flex"
        } fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-gray-500 opacity-25`}
        onClick={() => setIsMenuOpen(false)}
      />
      <button
        className="md:flex md:justify-items-end "
        onClick={() => setIsMenuOpen(true)}
      >
        <Bars3Icon height={24} className="stroke-black" />
      </button>
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-[200ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-[200ms]"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <NavMenu />
      </Transition>
    </>
  );
}

export default Menu;
