"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";

type SubMenu = {
  page: string;
  text: string;
  icon: any;
};

const subMenu: Array<SubMenu> = [
  {
    page: "/auth/admin",
    text: "Profilo",
    icon: <PersonIcon />,
  },
  {
    page: "/auth/admin/gestisci",
    text: "Gestisci Prodotti",
    icon: <InventoryIcon />,
  },
];

function SubHeader() {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex flex-row items-center justify-center gap-8">
        {subMenu.map((menu) => (
          <li key={menu.text} className="p-2">
            <Link
              href={menu.page}
              className={`flex items-center gap-1 p-2 my-4 rounded-full ring-2 ring-gray-400 bg-gray-200 shadow-lg hover:ring-2 hover:ring-black hover:bg-gray-400 ${
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
