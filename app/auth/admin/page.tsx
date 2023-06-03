"use client";
import React, { useState } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import SignInButton from "./(signin)/SignInButton";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

function Admin() {
  const [loggedUser, setLoggedUser] = useState<User>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedUser(user);
    } else {
      setLoggedUser(undefined);
    }
  });

  return (
    <>
      <div className="relative m-auto">
        <div className={styles.card}>
          <Image
            src={loggedUser?.photoURL ? loggedUser?.photoURL : "/Admin.png"}
            alt="Profile"
            className="h-16 w-16 rounded-full mb-1 shadow-lg"
            width={64}
            height={64}
            unoptimized={true}
          />

          <div className="">
            {loggedUser?.email ? (
              <>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-gray-400 text-xs italic font-light mb-4">
                    {loggedUser?.email}
                  </p>
                  <p className="gray-500 text-2xl font-light">Ciao,</p>
                  <p className="gray-500 text-lg font-medium mb-8 drop-shadow-xl">
                    {loggedUser?.displayName}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <SignInButton />
              </div>
            )}
          </div>
          {loggedUser && (
            <button
              onClick={() => signOut(auth)}
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
