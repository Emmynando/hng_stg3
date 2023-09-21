import { ReactNode } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <NavBar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
