import type { Metadata } from "next";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";

export const metadata: Metadata = {
  title: "Promptwar",
  description: "Where Words Clash and Ideas Spark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>{children}</ReduxWrapper>
      </body>
    </html>
  );
}
