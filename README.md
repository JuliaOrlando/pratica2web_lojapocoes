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

## Checklist da atividade

- [x] Usar SQLite em modo memória.
- [x] Criar Web Service para poções.
- [x] Permitir cadastrar poções.
- [x] Permitir listar poções.
- [x] Permitir remover poções.
- [x] Incluir campos nome, descrição, imagem e preço.
- [x] Criar página administrativa.
- [x] Criar página pública para compradores.
- [x] Incluir descrição da loja.
- [x] Incluir histórico da loja criada em 1867 com fotos.
- [x] Incluir rodapé com contato.
- [x] Exibir produtos com nome, imagem, descrição, preço e botão Comprar.
- [x] Usar JavaScript e AJAX para recuperar dados do Web Service.
- [x] Usar fonte clássica/sóbria com Gill Sans e paleta escura.
- [x] Documentar configuração e execução no README.
