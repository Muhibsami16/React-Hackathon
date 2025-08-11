import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "../mode-toggle";
import ProfileMenu from "../profile-menu";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
        <div className="p-2 flex justify-between items-center w-full border-2">
          <SidebarTrigger />
          <div class name="flex items-center gap-2">
          
          <ModeToggle />
          <ProfileMenu />
          

          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
