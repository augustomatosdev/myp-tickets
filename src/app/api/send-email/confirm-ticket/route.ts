// app/api/send-confirmation/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { ticketId, userName, userEmail } = await req.json();

    if (!ticketId || !userName || !userEmail) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando." },
        { status: 400 }
      );
    }

    const followUrl = `https://tickets.mypessoal.com/tickets/${ticketId}`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5;">Confirmação de Abertura de Ticket</h1>
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Seu ticket foi aberto com sucesso em nossa central de suporte.</p>
        <p><strong>ID do Ticket:</strong> ${ticketId}</p>
        <p>Você pode acompanhar o andamento do seu ticket no link abaixo:</p>
        <div style="margin: 30px 0;">
          <a href="${followUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; font-weight: bold;">
            Acompanhar Ticket
          </a>
        </div>
        <hr style="border-color: #eee; margin: 20px 0;" />
        <p style="color: #888; font-size: 14px;">
          © ${new Date().getFullYear()} MyP Tickets. Todos os direitos reservados.
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Suporte Mypessoal <suporte@tecnologia.mypessoal.com>",
      to: [userEmail],
      subject: `Ticket aberto com sucesso ID: ${ticketId}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Erro Resend API:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Falha ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar confirmação de ticket." },
      { status: 500 }
    );
  }
}
