const kits = [
  ["Almonds", "ESARD-48", "nuts"],
  ["Beta Lactoglobulin", "ESMRDBLG-48", "milk"],
  ["Casein", "ESCASPRD-48", "milk"],
  ["Crustacean", "ESCRURD-48", "other"],
  ["Generation 3 Gluten", "ESGLT3-48", "grain"],
  ["Hazelnut", "ESHRD-48", "nuts"],
  ["Lupin", "ESLUP-48", "other"],
  ["Mustard", "ESMUS-48", "other"],
  ["Oat", "ESOAT-48", "grain"],
  ["Peanut", "ESPRDS-48", "other"],
  ["Processed Egg", "ESEGGPR-48", "milk"],
  ["Sesame", "ESSESE-48", "other"],
  ["Soy Drink Residue", "ESSMLK-48", "other"],
  ["Soy", "ESSOYPRD-48", "other"],
  ["Total Milk", "ESTMLK-48", "milk"],
  ["Walnut / Pecan", "Available on request", "nuts"],
  ["Macadamia Nut", "Available on request", "nuts"],
  ["Pistachio", "Available on request", "nuts"],
  ["Pine Nut", "Available on request", "nuts"],
  ["Cashew", "Available on request", "nuts"],
  ["Coconut", "Available on request", "nuts"],
];
const slugs = [
  "almondsesard-48",
  "beta-lactoglobulinesmrdblg-48",
  "caseinescasprd-48",
  "crustaceanescrurd-48",
  "generation-3-glutenesglt3-48",
  "hazelnuteshrd-48",
  "lupin-improvedeslup-48",
  "mustardesmus-48",
  "oatesoat-48",
  "peanutesprds-48",
  "processed-eggeseggpr-48",
  "sesameessese-48",
  "soy-drink-residueessmlk-48",
  "soyessoyprd-48",
  "total-milkestmlk-48",
  "",
  "",
  "",
  "",
  "",
  "",
];
const grid = document.querySelector("#kit-grid");
kits.forEach((kit, i) => {
  const col = i % 7,
    row = Math.floor(i / 7),
    x = (col * 100) / 6,
    y = (row * 100) / 2;
  const article = document.createElement("article");
  article.className = "kit-card";
  article.dataset.category = kit[2];
  article.dataset.search = (kit[0] + " " + kit[1]).toLowerCase();
  const href = slugs[i]
    ? `https://elisasystems.com/product/${slugs[i]}/`
    : "#support";
  article.innerHTML = `<a href="${href}" aria-label="View ${kit[0]} test details"><div class="kit-image"><div class="kit-photo" style="background-position:${x}% ${y}%"></div></div><div class="kit-info"><div class="kit-meta"><span>${kit[1]}</span><span>ELISA assay</span></div><h3>${kit[0]}</h3><span class="kit-link">View test details →</span></div></a>`;
  grid.append(article);
});
const filters = [...document.querySelectorAll(".filter")],
  search = document.querySelector("#kit-search"),
  empty = document.querySelector(".no-results");
let active = "all";
function update() {
  const q = search.value.trim().toLowerCase();
  let count = 0;
  document.querySelectorAll(".kit-card").forEach((card) => {
    const show =
      (active === "all" || card.dataset.category === active) &&
      card.dataset.search.includes(q);
    card.hidden = !show;
    if (show) count++;
  });
  empty.hidden = count > 0;
}
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    active = btn.dataset.filter;
    update();
  })
);
search.addEventListener("input", update);
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
const toggle = document.querySelector(".menu-toggle"),
  nav = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open");
});
nav
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
const dialog = document.querySelector("#quote-dialog"),
  select = dialog.querySelector("select");
kits.forEach((k) =>
  select.insertAdjacentHTML("beforeend", `<option>${k[0]}</option>`)
);
document
  .querySelectorAll(".quote-open")
  .forEach((b) => b.addEventListener("click", () => dialog.showModal()));
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
dialog.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Thank you — this concept form is ready to connect to your CRM or email workflow."
  );
  dialog.close();
});
