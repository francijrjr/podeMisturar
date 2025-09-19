import React, { useState } from "react";
import { Sparkles } from "lucide-react";

type MisturaDetalhes = {
  descricao: string;
  efeito: string;
  risco: string;
  aplicacao: string;
  alerta: string;
};

export default function PodeMestirurar() {
  const [mistura, setMistura] = useState("");
  const [resultado, setResultado] = useState<MisturaDetalhes | null>(null);
  const [erro, setErro] = useState("");

  async function verificarMistura() {
    const entrada = mistura.toLowerCase().replace(/\s+/g, "").split("+").sort().join("+");
    try {
      const res = await fetch(`/api/misturas/${entrada}`);
      if (!res.ok) throw new Error("Mistura desconhecida");
      const data = await res.json();
      setResultado(data);
      setErro("");
    } catch {
      setResultado(null);
      setErro("Não tenho informações sobre essa mistura. Evite testar sem pesquisar!");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="text-purple-500" /> Pode Mestirurar?
      </h1>
      <p className="mb-4">Digite duas substâncias separadas por '+'. Ex: alcool+vinagre</p>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
          value={mistura}
          onChange={(e) => setMistura(e.target.value)}
          placeholder="ex: alcool+vinagre"
        />
        <button
          className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
          onClick={verificarMistura}
        >
          Verificar
        </button>
      </div>
      {erro && <div className="text-red-500">{erro}</div>}
      {resultado && (
        <div className="rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 text-lg space-y-2">
            <p><strong>Descrição:</strong> {resultado.descricao}</p>
            <p><strong>Efeito:</strong> {resultado.efeito}</p>
            <p><strong>Risco:</strong> {resultado.risco}</p>
            <p><strong>Aplicação:</strong> {resultado.aplicacao}</p>
            <p><strong>Alerta:</strong> {resultado.alerta}</p>
          </div>
        </div>
      )}
    </div>
  );
}