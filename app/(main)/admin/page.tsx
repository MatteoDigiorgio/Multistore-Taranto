"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import Link from "next/link";

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
              <Link title="Accedi" href="/auth/signin">
                <p className="hover:font-bold hover:underline mt-4">
                  Effettua l&apos;accesso
                </p>
              </Link>
            )}
          </div>
          {session && (
            <div>
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
