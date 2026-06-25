const productsContainer = document.querySelector("[data-products]");
const coinFormatter = new Intl.NumberFormat("pt-BR");

function setFallbackImage(image) {
  image.src = "/assets/placeholder.svg";
}

function createPotionCard(potion) {
  const article = document.createElement("article");
  article.className = "product-card";

  const image = document.createElement("img");
  image.src = potion.image;
  image.alt = potion.name;
  image.loading = "lazy";
  image.addEventListener("error", () => setFallbackImage(image), { once: true });

  const content = document.createElement("div");
  content.className = "product-content";

  const title = document.createElement("h3");
  title.textContent = potion.name;

  const description = document.createElement("p");
  description.textContent = potion.description;

  const footer = document.createElement("div");
  footer.className = "product-footer";

  const price = document.createElement("strong");
  price.textContent = `${coinFormatter.format(potion.price)} moedas`;

  const button = document.createElement("button");
  button.className = "buy-button";
  button.type = "button";
  button.textContent = "Comprar";
  button.addEventListener("click", () => {
    window.alert("Compra não implementada nesta entrega.");
  });

  footer.append(price, button);
  content.append(title, description, footer);
  article.append(image, content);

  return article;
}

async function loadPotions() {
  try {
    const response = await fetch("/api/potions");

    if (!response.ok) {
      throw new Error("Erro ao buscar poções.");
    }

    const potions = await response.json();
    productsContainer.replaceChildren();

    if (!potions.length) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "loading-message";
      emptyMessage.textContent = "Nenhuma poção cadastrada.";
      productsContainer.append(emptyMessage);
      return;
    }

    potions.forEach((potion) => {
      productsContainer.append(createPotionCard(potion));
    });
  } catch (error) {
    productsContainer.innerHTML =
      '<p class="error-message">Não foi possível carregar as poções.</p>';
  }
}

loadPotions();
