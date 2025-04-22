import { Navbar } from "@/components/navbar";
import Footer from "./Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col ">
      <Navbar />
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
