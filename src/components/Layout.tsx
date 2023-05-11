import { FC, ReactNode } from "react";
import { NavbarAdmin, NavbarUser } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div data-theme="cupcake" className="h-screen">
      <NavbarUser />
      {children}
    </div>
  );
};
