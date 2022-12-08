import Link from "next/link";
import { NavigationItem } from "../../models/interfaces/navigationItem";

export default function NavBar({ menuItems }: { menuItems: NavigationItem[] }) {
  return (
    <>
      <ul>
        {menuItems.map((elem) => (
          <Link key={elem.id} href={elem.href}>
            <li className="cursor-pointer">{elem.label}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
