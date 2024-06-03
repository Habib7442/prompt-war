import Navbar from "@/components/Navbar";

const DashboardLayout = async ({ children }: any) => {
  return (
    <div className="h-full w-full bg-slate-950">
      <main className="flex flex-row ml-[50px]">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
