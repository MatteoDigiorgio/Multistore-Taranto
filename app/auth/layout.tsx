import Header from "../(main)/(header)/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex flex-col h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
