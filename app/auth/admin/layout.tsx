import React from "react";
import SubHeader from "./(adminHeader)/SubHeader";
import ProvidersWrapper from "@/app/(main)/ProvidersWrapper";
import styles from "./Profile.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`flex flex-col ${styles.main}`}>
        <ProvidersWrapper>
          <SubHeader />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
