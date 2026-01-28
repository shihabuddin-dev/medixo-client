import LandingLayout from "@/components/layouts/LandingLayout";
import ChildrenI from "@/define/interfaces/childrenI";

const Layout = ({ children }: ChildrenI) => {
  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
