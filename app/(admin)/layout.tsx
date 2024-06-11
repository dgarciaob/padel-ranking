import Navbar from "@/components/admin/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AdminLayout;
