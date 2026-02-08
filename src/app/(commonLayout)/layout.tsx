import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import ChildrenI from "@/define/interfaces/childrenI";

const LandingLayout = ({ children }: ChildrenI) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
