import { useState } from "react";

function App() {
  const [nome1, setNome1] = useState("");
  const [nome2, setNome2] = useState("");
  const [error, setError] = useState(null);

  async function gerarPDF() {
    if (!nome1 || !nome2) {
      setError("Por favor preencha ambos os nomes");
      return;
    }
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/gerar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome1, nome2 }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "convite.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Gerador de Convite</h1>

      <input
        type="text"
        placeholder="Primeiro nome"
        value={nome1}
        onChange={(e) => setNome1(e.target.value)}
        style={{ padding: 8, margin: "5px 0", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Segundo nome"
        value={nome2}
        onChange={(e) => setNome2(e.target.value)}
        style={{ padding: 8, margin: "5px 0", width: "100%" }}
      />

      <button
        onClick={gerarPDF}
        style={{ padding: "10px 15px", backgroundColor: "#0066cc", color: "white", border: "none", cursor: "pointer" }}
      >
        Gerar PDF
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
