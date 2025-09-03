import React from "react";
import { Header } from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-200 py-4 px-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Mypessoal. Todos os direitos reservados.
        </p>
        <div className="mt-2 flex justify-center items-center gap-4">
          <a href="tel:+244923913862" className="hover:underline text-sm">
            📞 +244 923 913 862
          </a>
          <a
            href="mailto:suporte@tecnologia.mypessoal.com"
            className="hover:underline text-sm"
          >
            ✉️ suporte@tecnologia.mypessoal.com
          </a>
          <a
            href="https://wa.me/244923913862"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
