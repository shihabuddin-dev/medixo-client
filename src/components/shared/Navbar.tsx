"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client"; // Better Auth client

const menu = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Blog", url: "/blog" },
  { title: "FAQs", url: "/faq" },
];

export function Navbar({ className }: { className?: string }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) return null;

  async function handleLogout() {
    await authClient.signOut();
  }

  return (
    <section
      className={cn(
        "py-4 sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-semibold">
              Medixo
            </Link>
          </div>
          <div className="flex gap-6">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-sm font-medium hover:text-primary transition"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {!user && (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>

                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}

            {user && (
              <>
                <button onClick={() => setOpen(!open)}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback>
                      {user.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {open && (
                  <div className="absolute right-0 top-12 w-44 rounded-lg border border-border bg-background shadow-lg p-2 flex flex-col gap-1">
                    <Link
                      href="/dashboard"
                      className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/privacy-policy"
                      className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/teams-of-service"
                      className="px-3 py-2 text-sm rounded-md hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      Teams of Service
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm rounded-md text-left hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            Medixo
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-xl">Medixo</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 px-4">
                {menu.map((item) => (
                  <Link key={item.title} href={item.url}>
                    {item.title}
                  </Link>
                ))}

                <div className="mt-6 flex flex-col gap-3">
                  {!user && (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>

                      <Button asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}

                  {user && (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>

                      <Button asChild variant="outline">
                        <Link href="/profile">Profile</Link>
                      </Button>

                      <Button variant="destructive" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
