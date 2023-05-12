import { FC, ReactNode } from "react";
import { NavbarAdmin, NavbarUser } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const LayoutAdmin: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div data-theme="light" className="h-screen">
      <NavbarAdmin />
      {children}
    </div>
  );
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div data-theme="cupcake" className="h-screen max-w-[1400px] mx-auto">
      <NavbarUser />

      {children}
    </div>
  );
};
