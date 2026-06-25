# Poções e Soluções

Web service e vitrine de poções para a atividade prática 2 de SCC0219 - Introdução ao Desenvolvimento Web.

## O que foi implementado

- Web Service em Node.js com Express.
- Banco SQLite em memória usando Sequelize.
- Cadastro, listagem e remoção de poções.
- Página pública com descrição da loja, histórico desde 1867, fotos, rodapé e produtos.
- Listagem das poções via JavaScript e AJAX (`fetch`).
- Página administrativa para gerenciar as poções.
- Banco inicial populado com as poções sugeridas no PDF.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Acesse:

- Loja: `http://localhost:3000`
- Administração: `http://localhost:3000/admin.html`
- API de poções: `http://localhost:3000/api/potions`

## Endpoints

- `GET /api/potions` lista todas as poções.
- `POST /api/potions` cadastra uma poção.
- `DELETE /api/potions/:id` remove uma poção pelo id.

Exemplo de corpo para cadastro:

```json
{
  "name": "Poção da Boa Nota",
  "description": "Aumenta a confiança antes da avaliação.",
  "image": "https://exemplo.com/pocao.png",
  "price": 500
}
```

## Observação sobre o banco

O SQLite está configurado no modo memória (`storage: ":memory:"`), como indicado no enunciado. Por isso, os dados cadastrados manualmente existem enquanto o servidor estiver em execução e são reiniciados quando o servidor é fechado.
