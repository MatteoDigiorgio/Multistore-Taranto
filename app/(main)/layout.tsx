import React from "react";
import ProvidersWrapper from "./ProvidersWrapper";
import Head from "next/head";
import styles from "./Main.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>Multistore Taranto</title>
        <meta name="description" content="Showcase site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/waves_bottom.svg" as="image" />
        <link rel="preload" href="/waves_top.svg" as="image" />
      </Head>
      <body className={`flex flex-col ${styles.main}`}>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
