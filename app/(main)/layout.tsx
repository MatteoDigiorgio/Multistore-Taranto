import React from "react";
import ProvidersWrapper from "./ProvidersWrapper";
import Header from "./(header)/Header";
import Head from "next/head";

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
      </Head>
      <body className="flex flex-col h-screen">
        <ProvidersWrapper>
          <Header />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
