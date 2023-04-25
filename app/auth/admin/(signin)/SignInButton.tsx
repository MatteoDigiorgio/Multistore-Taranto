"use client";
import React from "react";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import "app/(main)/global.css";

function SignInButton() {
  const [session, setSession] = useState<Session | null>();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const res = await getProviders();
      setProviders(res);
      setSession(session);
    })();
  }, []);

  if (session) {
    redirect("/auth/admin");
  }
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="flex items-center justify-center p-2 gap-2 shadow-md border border-[#888] rounded w-full  cursor-pointer text-black hover:bg-gray-100"
              onClick={() => signIn(provider.id)}
            >
              <img src="/google.svg" alt="Google icon" className="h-8 w-8" />
              Accedi con {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export default SignInButton;
