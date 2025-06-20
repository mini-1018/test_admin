import { Toaster } from "sonner";
import "./globals.css";
import { Metadata } from "next";
import SidebarContainer from "@/components/sidebar/SidebarContainer";

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SidebarContainer>{children}</SidebarContainer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
