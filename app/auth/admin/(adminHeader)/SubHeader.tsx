"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

type SubMenu = {
  page: string;
  text: string;
  icon: any;
};

const subMenu: Array<SubMenu> = [
  {
    page: "/",
    text: "",
    icon: (
      <Image
        src="/multistore_icon.png"
        alt="Multistore Icon"
        width={21}
        height={21}
        unoptimized={true}
      />
    ),
  },
  {
    page: "/auth/admin/gestisci",
    text: "Prodotti",
    icon: <InventoryIcon />,
  },
  {
    page: "/auth/admin",
    text: "Profilo",
    icon: <PersonIcon />,
  },
];

function SubHeader() {
  const pathname = usePathname();
  const [loggedUser, setLoggedUser] = useState<User>();

  onAuthStateChanged(auth, (user) => {
    if (user?.email) {
      setLoggedUser(user);
    } else {
      setLoggedUser(undefined);
    }
  });
  return (
    <div>
      <ul className="flex flex-row items-center justify-center gap-2">
        {subMenu.map((menu) => (
          <li
            key={menu.text}
            className={`p-2 ${
              !loggedUser && menu.text === "Prodotti" && "hidden"
            }`}
          >
            <Link
              href={menu.page}
              className={`flex items-center gap-1 p-2 px-4 my-4 rounded-full ring-2 ring-gray-400 bg-gray-200 shadow-lg hover:ring-2 hover:ring-black hover:bg-gray-400 ${
                pathname === menu.page ? "bg-gray-400" : null
              }`}
            >
              {menu.icon}
              {menu.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubHeader;
