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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-gray shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
      style={{
              boxShadow: "0 0 2px #ffff, 0 0 0 0 #fff", // Glow rosa neon
         
            }}>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-6"
        >
          Gerador de Convite
        </h1>

        <div className="space-y-4 bg-[#18122B] p-6 rounded-lg">
          <input
            type="text"
            placeholder="Primeiro nome"
            value={nome1}
            onChange={(e) => setNome1(e.target.value)}
            className="w-full px-4 py-3 bg-[#18122B] shadow-2xl   text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-700 transition"
            style={{
              boxShadow: "0 0 4px #ffff, 0 0 0 0 #fff", // Glow rosa neon
           
            }}
          />

          <button
            onClick={gerarPDF}
            className="w-full px-4 py-3 bg-[#18122B] shadow-2xl   text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-700 transition"
            style={{
              boxShadow: "0 0 4px #ffff, 0 0 0 0 #fff", // Glow rosa neon
            
            }}>
            Gerar PDF ✨
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
