// dom.js
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) =>
  Array.from(ctx.querySelectorAll(sel));

export function insertHTML(container, html) {
  container.innerHTML = html;
}

export function createEl(tag, attrs = {}, text = "") {
  const el = document.createElement(tag);
  for (const k in attrs) {
    if (k === "class") el.className = attrs[k];
    else if (k === "dataset") {
      for (const d in attrs.dataset) el.dataset[d] = attrs.dataset[d];
    } else el.setAttribute(k, attrs[k]);
  }
  if (text) el.textContent = text;
  return el;
}

export function delegate(parent, selector, eventName, handler) {
  parent.addEventListener(eventName, (e) => {
    const target = e.target.closest(selector);
    if (!target || !parent.contains(target)) return;
    handler(e, target);
  });
}
