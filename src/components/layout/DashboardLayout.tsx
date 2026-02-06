import ChildrenI from "@/define/interfaces/childrenI";

const DashboardLayout = ({ children }: ChildrenI) => {
  return (
    <div>
      {/* <Navbar /> */}
      <main className="min-h-screen">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
