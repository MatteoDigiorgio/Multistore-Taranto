import React from "react";
import { Analytics } from "@vercel/analytics/react";
import ProvidersWrapper from "../ProvidersWrapper";
import Header from "../(header)/Header";
import Head from "next/head";
import styles from "../Main.module.css";
import Footer from "./Footer";
import getGoogleData from "../getGoogleData";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: object = await getGoogleData();

  return (
    <>
      <Head>
        <title>Multistore Taranto</title>
        <meta name="description" content="Showcase site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex flex-col ${styles.main}`}>
        <ProvidersWrapper>
          <Header data={data} />
          {children}
          <Footer />
        </ProvidersWrapper>
        <Analytics />
      </div>
    </>
  );
}
