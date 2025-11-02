// cart.js
const STORAGE_KEY = "sweet_tentation_cart_v1";
let cart = [];

export function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cart = raw ? JSON.parse(raw) : [];
  } catch {
    cart = [];
  }
}

export function getCart() {
  return cart;
}

export function addToCart(product) {
  const existing = cart.find((i) => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart();
  return cart;
}

export function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  return cart;
}

export function changeQty(id, qty) {
  const item = cart.find((i) => i.id === id);
  if (!item) return cart;
  if (qty <= 0) removeFromCart(id);
  else item.qty = qty;
  saveCart();
  return cart;
}

export function clearCart() {
  cart = [];
  saveCart();
  return cart;
}

export function calculateSubtotal() {
  return cart.reduce((acc, i) => acc + i.price * i.qty, 0);
}
