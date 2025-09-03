"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TicketSentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center space-y-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Ticket enviado com sucesso!
        </h1>

        <p className="text-slate-600">
          Recebemos sua solicitação e nossa equipe entrará em contato em breve.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <Link href="/tickets/all">
            <Button variant="outline" className="w-full">
              Ver meus tickets
            </Button>
          </Link>
          <Link href="/ticket/new">
            <Button className="w-full">Abrir novo ticket</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
