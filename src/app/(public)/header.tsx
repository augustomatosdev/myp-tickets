"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const isAuthenticated = false; // 🔹 depois pode vir do contexto/auth
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/myp-logo-full.png"
            alt="MyP Tickets"
            className="h-8 sm:h-10"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-3">
          <Button variant="default" asChild size="sm">
            <Link href="/ticket/new">Abrir ticket</Link>
          </Button>

          {isAuthenticated ? (
            <Button variant="ghost" asChild size="sm">
              <Link href="/tickets">Meus tickets</Link>
            </Button>
          ) : (
            <Button variant="ghost" asChild size="sm">
              <Link href="/login">Entrar</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-slate-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="sm:hidden border-t bg-white shadow-md">
          <div className="flex flex-col p-4 gap-3">
            <Button variant="default" asChild size="sm" className="w-full">
              <Link href="/ticket/new">Abrir ticket</Link>
            </Button>

            {isAuthenticated ? (
              <Button variant="ghost" asChild size="sm" className="w-full">
                <Link href="/tickets">Meus tickets</Link>
              </Button>
            ) : (
              <Button variant="ghost" asChild size="sm" className="w-full">
                <Link href="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
