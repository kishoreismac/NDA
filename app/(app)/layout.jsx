import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";

export default function AppLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-grid-faint" style={{ backgroundSize: "24px 24px" }}>
        <Sidebar />
        <main className="flex-1 px-5 md:px-8 py-6 md:py-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </ToastProvider>
  );
}
