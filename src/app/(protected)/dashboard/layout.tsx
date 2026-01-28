import DashboardLayout from "@/components/layouts/DashboardLayout";
import ChildrenI from "@/define/interfaces/childrenI";

const layout = ({ children }: ChildrenI) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
