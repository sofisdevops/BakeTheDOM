// cart-view.js
import { getCart, calculateSubtotal } from "./cart.js";
import { formatCurrency, escapeHtml } from "./utils.js";
import { qs, delegate } from "./dom.js";

export function renderCart() {
  const cartItemsEl = qs("#cart-items");
  const subtotalEl = qs("#cart-subtotal");
  const cartCountEl = qs("#cart-count");

  if (!cartItemsEl || !subtotalEl || !cartCountEl) return;

  const items = getCart();
  cartItemsEl.innerHTML = "";

  if (!items.length) {
    cartItemsEl.innerHTML = '<p class="empty">Tu carrito está vacío</p>';
    subtotalEl.textContent = formatCurrency(0);
    cartCountEl.textContent = "0";
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.dataset.id = item.id;
    row.innerHTML = `
      <div class="cart-thumb"><img src="${escapeHtml(
        item.image
      )}" alt="${escapeHtml(item.name)}" /></div>
      <div class="cart-info">
        <strong>${escapeHtml(item.name)}</strong>
        <div class="cart-meta">
          <span class="item-price">${formatCurrency(item.price)}</span>
          <div class="qty-controls" data-id="${escapeHtml(item.id)}">
            <button class="qty-decrease">−</button>
            <span class="qty">${escapeHtml(item.qty)}</span>
            <button class="qty-increase">+</button>
          </div>
          <button class="remove-btn">Eliminar</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  subtotalEl.textContent = formatCurrency(calculateSubtotal());
  cartCountEl.textContent = items.reduce((acc, i) => acc + i.qty, 0);
}

export function wireCartViewEvents(api) {
  const cartItemsEl = qs("#cart-items");
  if (!cartItemsEl) return;

  delegate(cartItemsEl, ".remove-btn", "click", (_, btn) => {
    const id = btn.closest(".cart-row")?.dataset.id;
    api.removeFromCart(id);
    renderCart();
  });

  delegate(cartItemsEl, ".qty-increase", "click", (_, btn) => {
    const id = btn.closest(".qty-controls")?.dataset.id;
    const item = api.getCart().find((i) => i.id === id);
    api.changeQty(id, item.qty + 1);
    renderCart();
  });

  delegate(cartItemsEl, ".qty-decrease", "click", (_, btn) => {
    const id = btn.closest(".qty-controls")?.dataset.id;
    const item = api.getCart().find((i) => i.id === id);
    api.changeQty(id, item.qty - 1);
    renderCart();
  });
}
