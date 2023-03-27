"use client";
import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuElectronicsOpen, setIsSubMenuElectronicsOpen] =
    useState(false);
  const [isSubMenuInformaticsOpen, setIsSubMenuInformaticsOpen] =
    useState(false);
  const NavSidebar = ({ onClose }: { onClose: any }) => {
    const handleSidebarClose = () => {
      setIsSidebarOpen(false);
      onClose();
    };
    const handleOpenSubMenuElectronics = () => {
      if (isSubMenuElectronicsOpen === true) {
        setIsSubMenuElectronicsOpen(false);
      } else if (isSubMenuElectronicsOpen === false) {
        setIsSubMenuElectronicsOpen(true);
      }
    };

    const handleOpenSubMenuInformatics = () => {
      if (isSubMenuInformaticsOpen === true) {
        setIsSubMenuInformaticsOpen(false);
      } else if (isSubMenuInformaticsOpen === false) {
        setIsSubMenuInformaticsOpen(true);
      }
    };

    const Electronics = () => {
      return (
        <li>
          <div className="flex  p-2 mx-2  rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75">
            <button
              type="button"
              className="flex"
              onClick={() => handleOpenSubMenuElectronics()}
            >
              <span className="text-start mr-5">
                Grandi e piccoli elettrodomestici
              </span>
              {isSubMenuElectronicsOpen ? (
                <ChevronUpIcon height={16} />
              ) : (
                <ChevronDownIcon height={16} />
              )}
            </button>
          </div>
          <ul
            className={`ml-3 mt-3 space-y-2 z-40  ${
              isSubMenuElectronicsOpen ? "flex-col" : "hidden"
            }`}
          >
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Frigoriferi</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Condizionatori</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Lavatrici</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Lavastoviglie</span>
              </Link>
            </li>
          </ul>
        </li>
      );
    };

    const Informatics = () => {
      return (
        <li>
          <div className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75">
            <button
              type="button"
              className="flex"
              onClick={() => handleOpenSubMenuInformatics()}
            >
              <span className="text-start">
                Computer, informatica e periferiche
              </span>
              {isSubMenuInformaticsOpen ? (
                <ChevronUpIcon height={16} />
              ) : (
                <ChevronDownIcon height={16} />
              )}
            </button>
          </div>

          <ul
            className={`ml-3 mt-3 space-y-2 z-40 ${
              isSubMenuInformaticsOpen ? "flex-col" : "hidden"
            }`}
          >
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Portatili</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Fissi</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
              >
                <span className="flex">Monitor</span>
              </Link>
            </li>
          </ul>
        </li>
      );
    };

    return (
      <div
        className={`top-0 right-0 fixed max-h-screen w-64 bg-multistore_green shadow-xl shadow-green-500/50 z-40  ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }  ease-in-out duration-300`}
      >
        <nav className="mx-3 text-white">
          <div className="h-screen overflow-y-scroll">
            <div className="h-20 mx-3 flex justify-end">
              <button onClick={handleSidebarClose}>
                <XMarkIcon
                  height={24}
                  className="stroke-white justify-items-end "
                />
              </button>
            </div>
            <ul className="space-y-2 max-w-full">
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
                >
                  <span className="flex">Chi siamo</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
                >
                  <span className="flex">Dove trovarci</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
                >
                  <span className="flex">Contatti</span>
                </Link>
              </li>
              <Electronics />
              <Informatics />
              <li>
                <Link
                  href="/auth/signin"
                  className="flex items-center p-2 mx-2 rounded-md transition ease-in-out hover:bg-multistore_green-light duration-75"
                >
                  <span className="flex">Accesso admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setIsSidebarOpen(true)}>
        <Bars3Icon height={24} className="stroke-white" />
      </button>
      <NavSidebar onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
