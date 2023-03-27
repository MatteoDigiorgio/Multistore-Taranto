import React from "react";
import ProvidersWrapper from "./ProvidersWrapper";
import Header from "./(header)/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Multistore Taranto</title>
      </head>
      <body className="flex flex-col h-screen">
        <ProvidersWrapper>
          <Header />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
