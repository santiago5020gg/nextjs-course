import { ReactNode } from "react";
import { navigationMenuItems } from "../../constants/navbar";
import { Footer } from "../footer";
import NavBar from "../navbar";


export default function Layout({ children }: { children: ReactNode }) {
    return (
      <>
        <div className="w-full h-full">
          <NavBar menuItems={navigationMenuItems}></NavBar>
          <div className="h-full overflow-y-auto bg-neutral-200">
            <main className="h-full">{children}</main>
          </div>
          <Footer />
        </div>
      </>
    );
  }