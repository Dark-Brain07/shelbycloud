"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UploadCloud, Folder, Download, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/dashboard/upload", icon: UploadCloud },
    { name: "My Files", href: "/dashboard/files", icon: Folder },
    { name: "Download", href: "/dashboard/download", icon: Download },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-20 md:w-56 border-r border-white/5 bg-surface/30 backdrop-blur-md hidden sm:flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-400 font-bold shadow-[inset_0_0_10px_rgba(236,72,153,0.15)]" : "text-pink-200/50 hover:text-pink-100 hover:bg-pink-500/5"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              )}
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-pink-400" : "text-pink-200/50 group-hover:text-pink-100"}`} />
              <span className="hidden md:block font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
