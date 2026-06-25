const form = document.querySelector("[data-potion-form]");
const statusMessage = document.querySelector("[data-form-status]");
const adminList = document.querySelector("[data-admin-list]");
const coinFormatter = new Intl.NumberFormat("pt-BR");

function setStatus(message, type = "neutral") {
  statusMessage.textContent = message;
  statusMessage.dataset.type = type;
}

function setFallbackImage(image) {
  image.src = "/assets/placeholder.svg";
}

function createAdminItem(potion) {
  const item = document.createElement("article");
  item.className = "admin-item";

  const image = document.createElement("img");
  image.src = potion.image;
  image.alt = potion.name;
  image.loading = "lazy";
  image.addEventListener("error", () => setFallbackImage(image), { once: true });

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = potion.name;

  const description = document.createElement("p");
  description.textContent = potion.description;

  const price = document.createElement("strong");
  price.textContent = `${coinFormatter.format(potion.price)} moedas`;

  content.append(title, description, price);

  const removeButton = document.createElement("button");
  removeButton.className = "danger-button";
  removeButton.type = "button";
  removeButton.textContent = "Remover";
  removeButton.addEventListener("click", () => removePotion(potion.id, potion.name));

  item.append(image, content, removeButton);
  return item;
}

async function loadPotions() {
  try {
    const response = await fetch("/api/potions");

    if (!response.ok) {
      throw new Error("Erro ao buscar poções.");
    }

    const potions = await response.json();
    adminList.replaceChildren();

    if (!potions.length) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "loading-message";
      emptyMessage.textContent = "Nenhuma poção cadastrada.";
      adminList.append(emptyMessage);
      return;
    }

    potions.forEach((potion) => {
      adminList.append(createAdminItem(potion));
    });
  } catch (error) {
    adminList.innerHTML =
      '<p class="error-message">Não foi possível carregar as poções.</p>';
  }
}

async function removePotion(id, name) {
  const confirmed = window.confirm(`Remover "${name}"?`);

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/potions/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Erro ao remover poção.");
    }

    setStatus("Poção removida.", "success");
    await loadPotions();
  } catch (error) {
    setStatus("Não foi possível remover a poção.", "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("Cadastrando...", "neutral");

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.price = Number(payload.price);

  try {
    const response = await fetch("/api/potions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(body.message || "Erro ao cadastrar poção.");
    }

    form.reset();
    setStatus("Poção cadastrada.", "success");
    await loadPotions();
  } catch (error) {
    setStatus(error.message, "error");
  }
});

loadPotions();
