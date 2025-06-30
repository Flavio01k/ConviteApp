import { useState } from "react";

function App() {
  const [nome1, setNome1] = useState("");
  const [nome2, setNome2] = useState("");
  const [error, setError] = useState(null);

  async function gerarPDF() {

    setError(null);

    try {
      const response = await fetch("http://localhost:3000/gerar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome1 }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const nomeArquivo = `Convite-${nome1.trim()}-${nome2.trim()}.pdf`;
      a.href = url;
      a.download = nomeArquivo;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-blue-900">
      <div className="bg-blue-900 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-100 mb-6">
          Gerador de Convite de Lizney
        </h1>

        <div className="space-y-4 bg-[#18122B] p-6 rounded-lg">
          <input
            type="text"
            placeholder="Primeiro nome"
            value={nome1}
            onChange={(e) => setNome1(e.target.value)}
            className="w-full px-4 py-3 bg-[#18122B] border border-white border-[1.5px] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-300 transition"
          />

          <button
            onClick={gerarPDF}
            className="w-full py-3 bg-[#18122B] border border-white border-[1.5px] text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-[#18122B] hover:border-[#18122B] transition duration-300"
          >
            Gerar PDF ✨
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
