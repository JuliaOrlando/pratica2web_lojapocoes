import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeDatabase, Potion } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");
const app = express();
const port = globalThis.process?.env?.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

app.get("/api/potions", async (_request, response, next) => {
  try {
    const potions = await Potion.findAll({ order: [["id", "ASC"]] });
    response.json(potions);
  } catch (error) {
    next(error);
  }
});

app.post("/api/potions", async (request, response, next) => {
  try {
    const { name, description, image, price } = request.body;
    const parsedPrice = Number(price);

    if (!name?.trim() || !description?.trim() || !image?.trim()) {
      return response.status(400).json({
        message: "Nome, descrição e imagem são obrigatórios.",
      });
    }

    if (!Number.isInteger(parsedPrice) || parsedPrice < 0) {
      return response.status(400).json({
        message: "Preço deve ser um número inteiro maior ou igual a zero.",
      });
    }

    const potion = await Potion.create({
      name: name.trim(),
      description: description.trim(),
      image: image.trim(),
      price: parsedPrice,
    });

    response.status(201).json(potion);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/potions/:id", async (request, response, next) => {
  try {
    const deletedCount = await Potion.destroy({
      where: { id: request.params.id },
    });

    if (!deletedCount) {
      return response.status(404).json({ message: "Poção não encontrada." });
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({
    message: "Erro interno no servidor.",
  });
});

await initializeDatabase();

app.listen(port, () => {
  console.log(`Poções e Soluções disponível em http://localhost:${port}`);
});
