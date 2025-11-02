// product-wire.js
import { qsa } from "./dom.js";

export function wireProductButtons({ onAdd }) {
  const cards = qsa(".product-card");
  cards.forEach((card) => {
    const btn = card.querySelector(".add-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: Number(card.dataset.price),
        image: card.dataset.image,
        desc: card.querySelector(".product-desc")?.textContent?.trim() || "",
      };
      onAdd(product);
    });
  });
}
