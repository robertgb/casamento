import { NavLink, useNavigate } from "react-router-dom";
import { Gift, LogOut, Users } from "lucide-react";

import { useAdmin } from "../../context/Admin/admin.hook";
import Button from "../ui/Button";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin/presentes", icon: Gift, label: "Presentes" },
    { to: "/admin/convidados", icon: Users, label: "Convidados" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl text-neutral-800 hidden sm:block">
              Painel Admin
            </span>
            <span className="text-gray-300 hidden sm:block">|</span>
            <h1 className="text-lg font-medium text-neutral-700">{title}</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:block w-56 bg-white border-r border-gray-200 shrink-0">
          <nav className="p-3 flex flex-col gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 min-w-0 pb-24 md:pb-6">{children}</main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive ? "text-primary-700" : "text-gray-500 hover:text-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
