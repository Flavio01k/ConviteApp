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
        body: JSON.stringify({ nome1}),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Gerador de Convite
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Primeiro nome"
            value={nome1}
            onChange={(e) => setNome1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={gerarPDF}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
