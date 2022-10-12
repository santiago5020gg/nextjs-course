import { NavigationItem } from "../../models/interfaces/navigationItem";

export default function NavBar({ menuItems }: { menuItems: NavigationItem[] }) {
  return (
    <>
      <ul>
        {menuItems.map((elem) => (
          <li key={elem.href}>{elem.label}</li>
        ))}
      </ul>
    </>
  );
}
