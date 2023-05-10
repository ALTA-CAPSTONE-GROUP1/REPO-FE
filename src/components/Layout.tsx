import { FC, ReactNode } from "react";
import { NavbarAdmin, NavbarUser } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen dark:bg-slate-900">
      <NavbarAdmin />
      {children}
    </div>
  );
};
