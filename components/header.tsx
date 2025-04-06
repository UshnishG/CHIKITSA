"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, CalendarDays, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDropdown } from "@/components/notification-dropdown";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const role = user?.role || "guest";

  const navItems: Record<string, { name: string; href: string }[]> = {
    guest: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Product", href: "/product" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Technology", href: "/technology" },
      { name: "Contact", href: "/contact" },
    ],
    patient: [
      { name: "Home", href: "/" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Dosage AI", href: "/dosage-ai" },
      { name: "Health Log", href: "/health-log" },
      { name: "Drug DB", href: "/drug-database" },
      { name: "My Doctor", href: "/my-doctor" },
      { name: "Appointment", href: "/appointments" },
    ],
    doctor: [
      { name: "Clinical Copilot", href: "/clinical-copilot" },
      { name: "Patients", href: "/patients" },
      { name: "Doctor's Portal", href: "/doctors-portal" },
      { name: "Drug DB", href: "/drug-database" },
      { name: "Appointments", href: "/doctor-appointment" },
    ],
    admin: [
      { name: "Admin Dashboard", href: "/admin" },
      { name: "Feature Toggle", href: "/feature-toggle" },
      { name: "Users", href: "/users" },
    ],
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const rightSection = () => {
    if (!user) {
      return (
        <>
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full">
              Sign up
            </Button>
          </Link>
        </>
      );
    }

    return (
      <>
        {role === "doctor" && (
          <Link href="/appointments">
            <CalendarDays className="h-6 w-6 hover:text-primary transition-colors" />
          </Link>
        )}
        <NotificationDropdown />

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 hover:scale-110 transition-transform cursor-pointer">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
              />
              <AvatarFallback>👤</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {role === "patient" && (
              <>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/contact")}>
                  Support
                </DropdownMenuItem>
              </>
            )}
            {role === "doctor" && (
              <>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                </DropdownMenuItem>
              </>
            )}
            {(role === "patient" || role === "doctor") && (
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {role === "admin" && (
          <>
            <Settings className="h-6 w-6 hover:text-primary transition-colors" />
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 rounded-full px-4 py-2 text-sm"
            >
              Logout
            </Button>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center">
  <img 
    src="/logo.png" 
    alt="Company Logo" 
    className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto" 
  />
</Link>

        <nav className="hidden md:flex gap-6">
          {(navItems[role] || []).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {rightSection()}
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">
                  DevHouse
                </Link>
                <button
                  className="rounded-full p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6">
                {(navItems[role] || []).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-base font-medium ${
                      pathname === item.href
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-6 space-y-2">
                  {!user ? (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button size="sm" className="w-full rounded-full">
                          Sign up
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout().then(() => router.push("/login"));
                      }}
                      className="w-full bg-red-500 text-white hover:bg-red-600 rounded-full px-4 py-2 text-sm"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}