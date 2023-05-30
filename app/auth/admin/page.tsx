"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "./(signin)/SignInButton";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Admin() {
  const { data: session } = useSession();

  return (
    <>
      <div className="relative m-auto">
        <div className={styles.card}>
          <Image
            src={session?.user?.image ? session?.user?.image : "/Admin.png"}
            alt="Profile"
            className="h-16 w-16 rounded-full mb-1 shadow-lg"
            width={64}
            height={64}
            unoptimized={true}
          />

          <div className="">
            {session?.user?.email ? (
              <>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-gray-400 text-xs italic font-light mb-4">
                    {session?.user?.email}
                  </p>
                  <p className="gray-500 text-2xl font-light">Ciao,</p>
                  <p className="gray-500 text-lg font-medium mb-8 drop-shadow-xl">
                    {session?.user?.name}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <SignInButton />
              </div>
            )}
          </div>
          {session && (
            <button
              onClick={() => signOut()}
              className="flex flex-row px-4 py-2 gap-2 items-center border-solid border-2 hover:border-red-600 hover:bg-red-400 hover:text-white rounded-md shadow-lg"
            >
              <p className="ml-1">Esci</p>
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
