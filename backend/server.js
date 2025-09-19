const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const misturas = require("./data/misturas.json");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ name: "pode-mestirurar-api", status: "ok" });
});

app.get("/health", (_req, res) => {
  res.send({ status: "healthy" });
});

app.get("/api/misturas/:entrada", (req, res) => {
  const entrada = req.params.entrada.toLowerCase().replace(/\s+/g, "").split("+").sort().join("+");
  const resultado = misturas[entrada];
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ error: "Mistura desconhecida. Evite testar sem pesquisar!" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});