import { ReactNode } from "react";
import { navigationMenuItemsConstant } from "../../constants/navbar";
import { Footer } from "../footer";
import NavBar from "../navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col justify-between h-full px-5">
        <NavBar menuItems={navigationMenuItemsConstant}></NavBar>
        <div>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
