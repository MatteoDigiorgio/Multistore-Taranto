import React from "react";
import SubHeader from "./SubHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col h-screen">
        <SubHeader />
        {children}
      </body>
    </html>
  );
}
