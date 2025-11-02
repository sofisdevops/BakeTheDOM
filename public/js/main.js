// main.js
import { getProductsData } from "./api.js";
import {
  addToCart,
  loadCart,
  clearCart,
  getCart,
  removeFromCart,
  changeQty,
} from "./cart.js";
import { renderCart, wireCartViewEvents } from "./cart-view.js";
import { wireProductButtons } from "./product-wire.js";
import { qs, insertHTML } from "./dom.js";
import { formatCurrency } from "./utils.js";

async function init() {
  loadCart();
  renderCart();

  try {
    const { html } = await getProductsData();
    const container = qs("#product-container");
    if (container) insertHTML(container, html);

    wireProductButtons({
      onAdd: (product) => {
        addToCart(product);
        renderCart();
      },
    });

    wireCartViewEvents({ removeFromCart, changeQty, getCart });
  } catch (err) {
    console.error("Error al cargar productos:", err);
  }

  wireGlobalCartControls();
}

function wireGlobalCartControls() {
  const cartToggle = qs("#cart-toggle");
  const cartEl = qs("#cart");
  const clearBtn = qs("#clear-cart");
  const checkoutBtn = qs("#checkout");

  cartToggle?.addEventListener("click", () => {
    const open = cartEl.classList.toggle("open");
    cartToggle.setAttribute("aria-expanded", open);
  });

  clearBtn?.addEventListener("click", () => {
    if (confirm("¿Deseas vaciar el carrito?")) {
      clearCart();
      renderCart();
    }
  });

  checkoutBtn?.addEventListener("click", () => {
    const items = getCart();
    if (!items.length) return alert("Tu carrito está vacío.");
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    let resumen = "🧁 Resumen de compra:\n\n";
    items.forEach(
      (i) =>
        (resumen += `${i.name} x${i.qty} — ${formatCurrency(
          i.price * i.qty
        )}\n`)
    );
    resumen += `\nTotal: ${formatCurrency(
      subtotal
    )}\n\n¡Gracias por tu compra!`;
    alert(resumen);
    clearCart();
    renderCart();
  });
}

document.addEventListener("DOMContentLoaded", init);
