/* Areej Handmade: shop behaviour. Settings live in config.js, products in products.js. */
(() => {
  const S = window.SHOP;
  const PRODUCTS = window.PRODUCTS;
  const CATEGORIES = window.CATEGORIES;

  const $ = (sel, root = document) => root.querySelector(sel);
  const money = n => S.currency + (Number.isInteger(n) ? n : n.toFixed(2));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = id => PRODUCTS.find(p => p.id === id);

  /* ------------------------------------------------------------------
     Stitched illustrations (used until a real photo is added)
     ------------------------------------------------------------------ */
  const C = {
    coral: "#E27B73", coralD: "#C65B55", sage: "#7C9358", sageD: "#566A3C",
    mustard: "#C58B1E", mustardL: "#F0C46A", ink: "#1E3B38",
    lav: "#9A86BF", lavD: "#6F5C9A", wood: "#D2A86C", woodD: "#B88A4F", woodL: "#E4C48F"
  };
  let uid = 0;

  const petalD = "M0 0C-26 -20 -22 -64 0 -72C22 -64 26 -20 0 0Z";
  const flower = (x, y, s, fill = C.coral, stroke = C.coralD) => {
    let petals = "", lines = "";
    for (let i = 0; i < 5; i++) {
      petals += `<path d="${petalD}" transform="rotate(${i * 72})" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>`;
      lines += `<path d="M0 -16V-58" transform="rotate(${i * 72})"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s})">${petals}
      <g stroke="rgba(255,255,255,.55)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 6" fill="none">${lines}</g>
      <circle r="14" fill="${C.mustard}"/><circle cx="-4.5" cy="-3.5" r="3.2" fill="${C.mustardL}"/><circle cx="4.5" cy="-4" r="3.2" fill="${C.mustardL}"/><circle cx="0" cy="5" r="3.2" fill="${C.mustardL}"/></g>`;
  };
  const daisy = (x, y, s) => {
    let p = "";
    for (let i = 0; i < 12; i++) p += `<path d="M0 0C-8 -12 -8 -44 0 -52C8 -44 8 -12 0 0Z" transform="rotate(${i * 30})" fill="#fff" stroke="#D8CFBC" stroke-width="2"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="15" fill="${C.mustard}"/><circle cx="-4" cy="-3" r="3.4" fill="${C.mustardL}"/><circle cx="5" cy="2" r="3.4" fill="${C.mustardL}"/></g>`;
  };
  const leaf = (x, y, rot, s) =>
    `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C16 -18 44 -18 58 0C44 18 16 18 0 0Z" fill="${C.sage}" stroke="${C.sageD}" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 0H50" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/></g>`;
  const sprig = () =>
    `<path d="M-4 130C-14 70 8 20 26 -30C38 -64 40 -96 34 -126" fill="none" stroke="${C.sage}" stroke-width="6" stroke-linecap="round"/>
     ${leaf(-6, 96, -158, 1)}${leaf(0, 60, -22, 1)}${leaf(14, 18, -156, .95)}${leaf(24, -22, -24, .9)}${leaf(32, -62, -152, .8)}${leaf(34, -96, -30, .7)}
     <circle cx="34" cy="-132" r="9" fill="${C.mustard}"/><circle cx="50" cy="-112" r="6" fill="${C.mustard}"/>`;
  const lavStem = (x0, dx) => {
    const x = y => x0 + dx * (130 - y) / 260;
    let buds = "";
    for (let y = -118, k = 0; y <= -10; y += 17, k++) {
      const side = k % 2 ? 1 : -1;
      buds += `<ellipse cx="${(x(y) + side * 8).toFixed(1)}" cy="${y}" rx="8" ry="13" transform="rotate(${side * 24} ${(x(y) + side * 8).toFixed(1)} ${y})" fill="${C.lav}" stroke="${C.lavD}" stroke-width="2"/>`;
    }
    buds += `<ellipse cx="${x(-134).toFixed(1)}" cy="-134" rx="7" ry="12" fill="${C.lav}" stroke="${C.lavD}" stroke-width="2"/>`;
    return `<path d="M${x0} 130L${x(-120).toFixed(1)} -120" stroke="${C.sage}" stroke-width="5" stroke-linecap="round"/>${buds}`;
  };
  const MOTIFS = {
    sprig,
    wildflower: () => `<path d="M-52 -4C-50 40 -12 72 14 100" fill="none" stroke="${C.sage}" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(58 14) scale(.85)">${sprig()}</g>${flower(-52, -44, 1)}`,
    lavender: () => `${lavStem(-52, -16)}${lavStem(0, 0)}${lavStem(52, 18)}${leaf(-30, 118, -150, .9)}${leaf(30, 118, -30, .9)}`,
    daisy: () => `${leaf(-4, 70, -150, 1)}${leaf(4, 70, -30, 1)}<path d="M0 60V6" stroke="${C.sage}" stroke-width="6" stroke-linecap="round"/>${daisy(0, -40, 1.5)}`,
    heart: () => `<g transform="translate(0 22) scale(1.6)"><path d="M0 40C-70 -10 -60 -70 -26 -68C-8 -66 0 -52 0 -44C0 -52 8 -66 26 -68C60 -70 70 -10 0 40Z" fill="${C.coral}" stroke="${C.coralD}" stroke-width="2"/>
      <path d="M0 40C-70 -10 -60 -70 -26 -68C-8 -66 0 -52 0 -44C0 -52 8 -66 26 -68C60 -70 70 -10 0 40Z" transform="translate(0 -6) scale(.74)" fill="none" stroke="#F6B3AC" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/></g>`,
    name: () => `<text x="0" y="14" text-anchor="middle" font-family="'Young Serif', Georgia, serif" font-size="82" fill="none" stroke="${C.ink}" stroke-width="3" stroke-dasharray="8 3" stroke-linecap="round" stroke-linejoin="round">Layla</text>${flower(0, 92, .42)}`
  };

  const weaveDef = `<pattern id="weave" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 3.5h7M3.5 0v7" stroke="#6b5130" stroke-opacity=".09"/></pattern>`;
  const cloth = (shape, fabric) => `${shape.replace("/>", ` fill="${fabric}"/>`)}${shape.replace("/>", ` fill="url(#weave)"/>`)}`;

  function artSVG(p) {
    if (p.photo) return `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">`;
    const a = p.art, id = ++uid, motif = (MOTIFS[a.motif] || MOTIFS.sprig)();
    let body = "";
    switch (a.form) {
      case "hoop":
        body = `<circle cx="206" cy="210" r="164" fill="rgba(30,59,56,.10)"/>
          <rect x="177" y="22" width="46" height="40" rx="8" fill="${C.woodD}"/><rect x="188" y="10" width="24" height="26" rx="5" fill="#9C7240"/>
          <circle cx="200" cy="204" r="164" fill="${C.wood}" stroke="${C.woodD}" stroke-width="2"/>
          <circle cx="200" cy="204" r="152" fill="${C.woodL}"/>
          <clipPath id="c${id}"><circle cx="200" cy="204" r="146"/></clipPath>
          ${cloth('<circle cx="200" cy="204" r="146"/>', a.fabric)}
          <g clip-path="url(#c${id})"><g transform="translate(200 214) scale(.74)">${motif}</g></g>`;
        break;
      case "tote":
        body = `<path d="M136 156C136 36 264 36 264 156" fill="none" stroke="#CDBA98" stroke-width="13" stroke-linecap="round"/>
          <rect x="76" y="152" width="260" height="230" rx="10" fill="rgba(30,59,56,.10)"/>
          <clipPath id="c${id}"><rect x="70" y="144" width="260" height="230" rx="10"/></clipPath>
          ${cloth('<rect x="70" y="144" width="260" height="230" rx="10"/>', a.fabric)}
          <path d="M70 172H330" stroke="rgba(30,59,56,.25)" stroke-width="2" stroke-dasharray="6 5"/>
          <g clip-path="url(#c${id})"><g transform="translate(200 276) scale(.5)">${motif}</g></g>`;
        break;
      case "pouch":
        body = `<path d="M130 134C100 84 62 96 70 140" fill="none" stroke="${C.woodD}" stroke-width="5" stroke-linecap="round"/>
          <path d="M270 134C300 84 338 96 330 140" fill="none" stroke="${C.woodD}" stroke-width="5" stroke-linecap="round"/>
          <path d="M101 146Q88 330 112 362Q200 380 288 362Q312 330 299 146Z" transform="translate(6 8)" fill="rgba(30,59,56,.10)"/>
          ${cloth('<path d="M101 146Q88 330 112 362Q200 380 288 362Q312 330 299 146Z"/>', a.fabric)}
          <rect x="98" y="122" width="204" height="38" rx="14" fill="${a.fabric}"/><rect x="98" y="122" width="204" height="38" rx="14" fill="rgba(30,59,56,.10)"/>
          <path d="M108 141H292" stroke="rgba(30,59,56,.3)" stroke-width="2" stroke-dasharray="5 5"/>
          <g transform="translate(200 262) scale(.46)">${motif}</g>`;
        break;
      case "patch":
        body = `<rect x="96" y="108" width="232" height="212" rx="48" fill="rgba(30,59,56,.12)"/>
          ${cloth('<rect x="88" y="98" width="232" height="212" rx="48"/>', a.fabric)}
          <rect x="101" y="111" width="206" height="186" rx="37" fill="none" stroke="#FDF8F0" stroke-width="4" stroke-dasharray="9 7" stroke-linecap="round"/>
          <g transform="translate(204 204) scale(.66)">${motif}</g>`;
        break;
      case "card":
        body = `<rect x="92" y="56" width="240" height="310" rx="8" fill="rgba(30,59,56,.12)"/>
          <rect x="84" y="46" width="240" height="310" rx="8" fill="${a.fabric}" stroke="rgba(30,59,56,.12)"/>
          <rect x="100" y="62" width="208" height="278" rx="4" fill="none" stroke="${C.coral}" stroke-width="2.5" stroke-dasharray="7 6" stroke-linecap="round"/>
          <g transform="translate(204 196) scale(.56)">${motif}</g>`;
        break;
      case "sachets":
        body = `<g transform="rotate(-7 130 232)"><rect x="62" y="162" width="150" height="150" rx="14" fill="rgba(30,59,56,.12)" transform="translate(5 7)"/>
          ${cloth('<rect x="55" y="155" width="150" height="150" rx="14"/>', a.fabric)}
          <rect x="63" y="163" width="134" height="134" rx="8" fill="none" stroke="rgba(30,59,56,.35)" stroke-width="2" stroke-dasharray="5 5"/>
          <g transform="translate(130 232) scale(.3)">${motif}</g></g>
          <g transform="rotate(6 270 200)"><rect x="202" y="134" width="150" height="150" rx="14" fill="rgba(30,59,56,.12)" transform="translate(5 7)"/>
          ${cloth('<rect x="195" y="127" width="150" height="150" rx="14"/>', "#E8EEDD")}
          <rect x="203" y="135" width="134" height="134" rx="8" fill="none" stroke="rgba(30,59,56,.35)" stroke-width="2" stroke-dasharray="5 5"/>
          <g transform="translate(270 202) scale(.3)">${motif}</g></g>`;
        break;
    }
    return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(p.name)}"><defs>${weaveDef}</defs><rect width="400" height="400" fill="${a.bg}"/>${body}</svg>`;
  }

  /* ------------------------------------------------------------------
     Basket
     ------------------------------------------------------------------ */
  const KEY = "areej-basket-v1";
  let basket = [];
  try {
    basket = (JSON.parse(localStorage.getItem(KEY)) || []).filter(i => byId(i.id));
  } catch (e) { basket = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) { /* private mode */ } };
  const itemCount = () => basket.reduce((n, i) => n + i.qty, 0);
  const total = () => basket.reduce((n, i) => n + byId(i.id).price * i.qty, 0);

  function addToBasket(id, text, qty) {
    const found = basket.find(i => i.id === id && i.text === text);
    if (found) found.qty += qty; else basket.push({ id, text, qty });
    save(); renderBasket(); bump();
  }
  function bump() {
    const el = $("#basket-count");
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  }

  function renderBasket() {
    $("#basket-count").textContent = itemCount();
    $("#open-basket").setAttribute("aria-label", `Open basket, ${itemCount()} item${itemCount() === 1 ? "" : "s"}`);
    const body = $("#bk-body"), foot = $("#bk-foot");
    if (!basket.length) {
      body.innerHTML = `<div class="bk-empty"><p>Your basket is empty. Pick something from the shop and it will appear here.</p><button class="btn btn-primary" type="button" data-close>Browse the shop</button></div>`;
      foot.hidden = true;
      return;
    }
    body.innerHTML = basket.map((i, idx) => {
      const p = byId(i.id);
      return `<div class="bk-item">
        <div class="bk-thumb">${artSVG(p)}</div>
        <div>
          <h3>${esc(p.name)}</h3>
          ${i.text ? `<p class="bk-note">${esc(p.personalise ? p.personalise.label.replace(/ \(optional\)/, "") : "Details")}: ${esc(i.text)}</p>` : ""}
          <div class="bk-row">
            <div class="qty" role="group" aria-label="Quantity of ${esc(p.name)}">
              <button type="button" data-dec="${idx}" aria-label="One fewer">−</button>
              <output>${i.qty}</output>
              <button type="button" data-inc="${idx}" aria-label="One more">+</button>
            </div>
            <button class="link-btn" type="button" data-remove="${idx}">Remove</button>
          </div>
        </div>
        <strong class="price">${money(p.price * i.qty)}</strong>
      </div>`;
    }).join("");
    $("#bk-total").textContent = money(total());
    foot.hidden = false;
  }

  /* ------------------------------------------------------------------
     Shop grid and filters
     ------------------------------------------------------------------ */
  let filter = "All";
  function renderFilters() {
    $("#filters").innerHTML = ["All", ...CATEGORIES].map(c =>
      `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${c === filter}">${esc(c)}</button>`).join("");
  }
  function renderGrid() {
    const list = PRODUCTS.filter(p => filter === "All" || p.category === filter);
    $("#grid").innerHTML = list.length ? list.map(p => `
      <button class="card" type="button" data-id="${esc(p.id)}" aria-label="${esc(p.name)}, ${money(p.price)}. View details">
        <div class="card-art">${artSVG(p)}</div>
        <div class="card-body">
          <div><h3>${esc(p.name)}</h3>${p.personalise ? `<p class="tag">Can be personalised</p>` : ""}</div>
          <span class="price">${money(p.price)}</span>
        </div>
      </button>`).join("") : `<p class="empty">Nothing here yet. Check back soon.</p>`;
  }

  /* ------------------------------------------------------------------
     Dialogs
     ------------------------------------------------------------------ */
  const pd = $("#product-dialog"), bk = $("#basket-dialog");
  let current = null, qty = 1, lastFocus = null;

  function openDialog(d) {
    lastFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    d.showModal();
  }
  [pd, bk].forEach(d => {
    d.addEventListener("close", () => { document.body.style.overflow = ""; if (lastFocus && lastFocus.focus) lastFocus.focus(); });
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    d.addEventListener("click", e => { if (e.target.closest("[data-close]")) d.close(); });
  });

  function openProduct(id) {
    current = byId(id); qty = 1;
    $("#pd-art").innerHTML = artSVG(current);
    $("#pd-art").style.background = !current.photo && current.art ? current.art.bg : "";
    $("#pd-cat").textContent = current.category;
    $("#pd-name").textContent = current.name;
    $("#pd-price").textContent = money(current.price);
    $("#pd-blurb").textContent = current.blurb;
    $("#pd-details").innerHTML = current.details.map(d => `<li>${esc(d)}</li>`).join("");
    $("#pd-qty").textContent = qty;
    const wrap = $("#pd-personalise"), input = $("#pd-text");
    if (current.personalise) {
      wrap.hidden = false;
      $("#pd-text-label").textContent = current.personalise.label;
      input.placeholder = current.personalise.placeholder || "";
      input.maxLength = current.personalise.max || 40;
      input.value = "";
      input.removeAttribute("aria-invalid");
      $("#pd-error").hidden = true;
    } else { wrap.hidden = true; }
    openDialog(pd);
  }

  function openBasket() { renderBasket(); openDialog(bk); }

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ------------------------------------------------------------------
     Sending messages
     ------------------------------------------------------------------ */
  const waLink = text => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;
  const mailLink = (subject, text) => `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  function orderText() {
    const lines = basket.map(i => {
      const p = byId(i.id);
      const label = p.personalise ? p.personalise.label.replace(/ \(optional\)/, "") : "Details";
      return `• ${p.name} × ${i.qty} (${money(p.price * i.qty)})${i.text ? `\n   ${label}: ${i.text}` : ""}`;
    }).join("\n");
    const note = $("#o-note").value.trim();
    return `Hello ${S.name}! I'd like to order:\n\n${lines}\n\nTotal before delivery: ${money(total())}\n\nName: ${$("#o-name").value.trim()}\nDelivery address: ${$("#o-address").value.trim()}${note ? `\nNote: ${note}` : ""}`;
  }
  function checkOrder() {
    const name = $("#o-name"), addr = $("#o-address"), err = $("#o-error");
    const bad = [name, addr].filter(f => !f.value.trim());
    [name, addr].forEach(f => f.setAttribute("aria-invalid", bad.includes(f)));
    err.hidden = !bad.length;
    if (bad.length) { err.textContent = "Add your name and delivery address so Areej can confirm your order."; bad[0].focus(); }
    return !bad.length;
  }
  function sendOrder(via) {
    if (!basket.length || !checkOrder()) return;
    const text = orderText();
    if (via === "wa") window.open(waLink(text), "_blank", "noopener");
    else window.location.href = mailLink(`Order from ${$("#o-name").value.trim()}`, text);
    toast("Your order message is ready. Send it to finish.");
  }

  function customText() {
    return `Hello ${S.name}! I'd like to ask about a custom piece.\n\nWhat: ${$("#c-what").value}\nMy idea: ${$("#c-idea").value.trim()}\nName: ${$("#c-name").value.trim()}`;
  }
  function sendCustom(via) {
    const idea = $("#c-idea"), name = $("#c-name"), err = $("#c-error");
    const bad = [idea, name].filter(f => !f.value.trim());
    [idea, name].forEach(f => f.setAttribute("aria-invalid", bad.includes(f)));
    err.hidden = !bad.length;
    if (bad.length) { err.textContent = "Describe your idea and add your name so Areej knows who to reply to."; bad[0].focus(); return; }
    if (via === "wa") window.open(waLink(customText()), "_blank", "noopener");
    else window.location.href = mailLink("Custom piece request", customText());
    toast("Your message is ready. Send it to finish.");
  }

  /* ------------------------------------------------------------------
     Wire everything up
     ------------------------------------------------------------------ */
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    filter = b.dataset.cat; renderFilters(); renderGrid();
    $(`[data-cat="${CSS.escape(filter)}"]`).focus();
  });
  $("#grid").addEventListener("click", e => { const c = e.target.closest("[data-id]"); if (c) openProduct(c.dataset.id); });

  $("#pd-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); $("#pd-qty").textContent = qty; });
  $("#pd-plus").addEventListener("click", () => { qty = Math.min(20, qty + 1); $("#pd-qty").textContent = qty; });
  $("#pd-add").addEventListener("click", () => {
    const input = $("#pd-text"), text = current.personalise ? input.value.trim() : "";
    if (current.personalise && current.personalise.required !== false && !text) {
      input.setAttribute("aria-invalid", "true");
      const err = $("#pd-error"); err.hidden = false; err.textContent = "Add the text to stitch before adding this to your basket.";
      input.focus(); return;
    }
    addToBasket(current.id, text, qty);
    pd.close();
    toast(`${current.name} added to your basket`);
  });

  $("#open-basket").addEventListener("click", openBasket);
  $("#bk-body").addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    const inc = t.dataset.inc, dec = t.dataset.dec, rem = t.dataset.remove;
    if (inc !== undefined) basket[inc].qty = Math.min(20, basket[inc].qty + 1);
    else if (dec !== undefined) basket[dec].qty = Math.max(1, basket[dec].qty - 1);
    else if (rem !== undefined) basket.splice(rem, 1);
    else return;
    save(); renderBasket();
  });
  $("#o-wa").addEventListener("click", () => sendOrder("wa"));
  $("#o-mail").addEventListener("click", () => sendOrder("mail"));
  $("#c-wa").addEventListener("click", () => sendCustom("wa"));
  $("#c-mail").addEventListener("click", () => sendCustom("mail"));
  $("#order-form").addEventListener("submit", e => e.preventDefault());
  $("#custom-form").addEventListener("submit", e => e.preventDefault());

  // Text from config
  $("#lead-time").textContent = S.leadTime;
  $("#f-lead").textContent = S.leadTime;
  $("#f-delivery").textContent = S.deliveryNote;
  $("#o-payment").textContent = `${S.deliveryNote} ${S.paymentNote}`;
  $("#f-wa").href = `https://wa.me/${S.whatsapp}`;
  $("#f-mail").href = `mailto:${S.email}`;
  if (S.instagram) { $("#f-ig").href = S.instagram; $("#f-ig-li").hidden = false; }
  $("#year").textContent = new Date().getFullYear();

  renderFilters(); renderGrid(); renderBasket();
})();
