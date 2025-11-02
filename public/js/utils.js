// utils.js
export function formatCurrency(num) {
  if (isNaN(num)) num = 0;
  return "$" + new Intl.NumberFormat("es-CO").format(Number(num));
}

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function parseProductsFromHTML(htmlString) {
  const tmp = document.createElement("div");
  tmp.innerHTML = htmlString;
  const cards = tmp.querySelectorAll(".product-card");
  const products = Array.from(cards).map((card) => {
    const id = card.dataset.id || "";
    const name =
      card.dataset.name ||
      card.querySelector(".product-title")?.textContent?.trim() ||
      "";
    const price = Number(
      card.dataset.price ||
        card.querySelector(".price")?.textContent?.replace(/\D/g, "") ||
        0
    );
    const image =
      card.dataset.image ||
      card.querySelector("img")?.getAttribute("src") ||
      "";
    const desc = card.querySelector(".product-desc")?.textContent?.trim() || "";
    return {
      id,
      name,
      price,
      image,
      desc,
      html: card.outerHTML,
    };
  });
  return products;
}
