import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const DashboardLayout = async ({ children }: any) => {
  return (
    <div className="h-full w-full bg-slate-950">
      <main className="flex flex-col ml-[50px]">
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
