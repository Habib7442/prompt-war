import type { Metadata } from "next";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";

export const metadata: Metadata = {
  title: "Promptwar",
  description: "Prompt selling and buying made easy.",
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
