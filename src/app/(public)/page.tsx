import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircleQuestion, Search, TicketCheck } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

//support ticket portal request page
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">
            Olá, como podemos te ajudar?
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Pesquise sua questão aqui..."
              className="flex-1 h-12 text-slate-200"
            />
            <Button
              className="bg-white text-slate-800 hover:bg-slate-100 h-12 px-6"
              type="submit"
            >
              <Search className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Open Ticket Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/ticket/new" className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <MessageCircleQuestion className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-semibold mb-2">
                  Abrir um ticket
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  Para abrir um ticket, descreva seu problema preenchendo o
                  formulário de ticket de suporte.
                </CardDescription>
              </div>
            </Link>
          </Card>
          {/* View Tickets Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/ticket/all" className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TicketCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-semibold mb-2">
                  Visualizar todos os tickets
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  Acompanhe o progresso de todos os seus tickets e sua interação
                  com a equipe de suporte
                </CardDescription>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
