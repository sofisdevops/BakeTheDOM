// api.js
import { parseProductsFromHTML } from "./utils.js";

export async function getProductsHtml() {
  const res = await fetch("./productos.html", { cache: "no-cache" });
  if (!res.ok)
    throw new Error("No se pudo cargar productos.html: " + res.status);
  return await res.text();
}

export async function getProductsData() {
  const html = await getProductsHtml();
  const products = parseProductsFromHTML(html);
  return { html, products };
}
