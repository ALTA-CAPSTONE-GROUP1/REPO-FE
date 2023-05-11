import { FC, ReactNode } from "react";
import { NavbarAdmin, NavbarUser } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const LayoutAdmin: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-full bg-white pb-20">
      <NavbarAdmin />
      {children}
    </div>
  );
};
export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen bg-white">
      <NavbarAdmin />
      {children}
    </div>
  );
};
