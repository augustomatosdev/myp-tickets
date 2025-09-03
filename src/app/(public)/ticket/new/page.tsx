"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { db, storage } from "@/lib/firebase"; // 🔹 make sure you have firebase initialized
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    company: "",
    subject: "",
    type: "",
    priority: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  // remove file from list
  const removeDocument = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // upload files to Firebase Storage
  const uploadFilesToFirebase = async () => {
    const urls: string[] = [];
    for (const file of files) {
      const fileRef = ref(storage, `tickets/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
    }
    return urls;
  };

  // handle form submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // upload files
      const fileUrls = await uploadFilesToFirebase();

      // save ticket
      await addDoc(collection(db, "tickets"), {
        ...form,
        files: fileUrls,
        status: "open",
        createdAt: new Date().toISOString(),
      });

      alert("✅ Ticket criado com sucesso!");
      setForm({
        email: "",
        name: "",
        company: "",
        subject: "",
        type: "",
        priority: "",
        message: "",
      });
      setFiles([]);
      router.push("/ticket/success");
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao criar o ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-slate-800 text-white">
        <div className="max-w-2xl mx-auto py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Abrir um ticket</h1>
        </div>
      </div>

      <div className="py-8 px-4 max-w-screen-md mx-auto">
        <div className="shadow-md rounded-xl p-6 grid gap-6 bg-white">
          {/* Solicitante */}
          <div className="grid gap-2">
            <Label>Solicitante</Label>
            <Input
              required
              type="email"
              placeholder="Seu email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              required
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Select
              value={form.company}
              onValueChange={(val) => handleChange("company", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="mypessoal">Mypessoal</SelectItem>
                  <SelectItem value="vatrade">VATRADE</SelectItem>
                  <SelectItem value="reb">R&B</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Assunto */}
          <div className="grid gap-2">
            <Label>Assunto</Label>
            <Input
              required
              type="text"
              placeholder="Assunto"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </div>

          {/* Tipo */}
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Select
              value={form.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="question">Pergunta</SelectItem>
                  <SelectItem value="problem">Problema</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Prioridade */}
          <div className="grid gap-2">
            <Label>Prioridade</Label>
            <Select
              value={form.priority}
              onValueChange={(val) => handleChange("priority", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Mensagem */}
          <div className="grid gap-2">
            <Label>Mensagem</Label>
            <Textarea
              placeholder="Descreva sua solicitação..."
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          {/* Documentos */}
          <div className="grid gap-2">
            <Label>Documentos</Label>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Adicionar documentos
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Documentos selecionados ({files.length})
                </Label>
                <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                  {files.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1"
                    >
                      <span className="text-sm truncate flex-1">
                        {doc.name.length > 20
                          ? doc.name.slice(0, 40) + "..."
                          : doc.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                        className="h-6 w-6 p-0 ml-2"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 my-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setForm({
                  email: "",
                  name: "",
                  company: "",
                  subject: "",
                  type: "",
                  priority: "",
                  message: "",
                });
                setFiles([]);
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={
                loading ||
                !form.email ||
                !form.name ||
                !form.company ||
                !form.subject ||
                !form.type ||
                !form.priority ||
                !form.message
              }
              onClick={handleSubmit}
            >
              {loading ? "Enviando..." : "Abrir ticket"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
