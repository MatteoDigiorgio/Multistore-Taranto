"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "./(signin)/SignInButton";

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
                <Link
                  href="/"
                  className="flex bg-green-400 justify-center border-solid border-2 hover:border-green-600 hover:bg-green-400 text-white rounded-md px-4 py-2 shadow-lg"
                >
                  <p>Torna al Negozio</p>
                </Link>
                <SignInButton />
              </div>
            )}
          </div>
          {session && (
            <div className="flex gap-2">
              <Link
                href="/"
                className="bg-green-400 border-solid border-2 hover:border-green-600 hover:bg-green-400 text-white rounded-md px-4 py-2 shadow-lg"
              >
                Torna al Negozio
              </Link>
              <button
                onClick={() => signOut()}
                className="border-solid border-2 hover:border-red-600 hover:bg-red-400 hover:text-white rounded-md px-4 py-2 shadow-lg"
              >
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
