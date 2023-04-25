import React from "react";
import SubHeader from "./(adminHeader)/SubHeader";
import ProvidersWrapper from "@/app/(main)/ProvidersWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col h-screen">
        <ProvidersWrapper>
          <SubHeader />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
