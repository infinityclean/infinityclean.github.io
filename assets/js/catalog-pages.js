/* Infinity Cleaning Service — catalog page builder, shared by the printed PDF (src/print/catalog.js)
   and the "digital catalog" website variant. Pages are laid out on an A5 canvas (148×210 mm). */
(function () {
  "use strict";

  function build({ lang = "ro", W = 148, H = 210, logo = "../brand/logo/", only = null } = {}) {
    const D = window.ICS, IC = window.ICS_ICONS, ILL = window.ICS_ILL;
    const T = D.t[lang], C = D.contacts;
    const L = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? "");
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const icon = (n, cls = "") =>
      `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ""}</svg>`;
    const check = () =>
      `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.6l4.6 4.6L19.6 6.7"/></svg>`;
    const star = () => `<svg viewBox="-10 -11 20 22" aria-hidden="true"><path d="${ILL.sparkle(0, 0, 9, 0.1, 1.12)}"/></svg>`;
    const orn = () => `<div class="orn"><i></i>${star()}<i></i></div>`;
    const checks = (items, cls = "") => `<ul class="checks ${cls}">${items.map((t) => `<li>${check()}<span>${esc(t)}</span></li>`).join("")}</ul>`;
    const logoImg = (cls = "") => `<img class="logo ${cls}" src="${logo}logo-stacked-gold.svg" alt="Infinity Cleaning Service">`;
    const pill = (t) => `<h2 class="pill">${esc(t)}</h2>`;
    const lead = (t) => (t ? `<p class="lead">${esc(t)}</p>` : "");
    const pad2 = (n) => String(n).padStart(2, "0");
    const priceLabel = (p) => (typeof p.label === "string" ? T[p.label] : L(p.label));
    const medal = (n) => `<span class="medal">${icon(n)}</span>`;

    function qrSvg(text) {
      const qr = window.qrcode(0, "M");
      qr.addData(text);
      qr.make();
      const n = qr.getModuleCount();
      let d = "";
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
      return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" aria-label="QR"><path fill="#15100A" d="${d}"/></svg>`;
    }

    const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <linearGradient id="gSw" gradientUnits="userSpaceOnUse" x1="-6" y1="60" x2="52" y2="-6">
        <stop offset="0" stop-color="#F0C75C" stop-opacity="0"/><stop offset=".32" stop-color="#F9E3A0" stop-opacity=".95"/>
        <stop offset=".7" stop-color="#D4A23A" stop-opacity=".55"/><stop offset="1" stop-color="#D4A23A" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="gFrame" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F0C75C" stop-opacity=".8"/><stop offset=".5" stop-color="#D4A23A" stop-opacity=".25"/><stop offset="1" stop-color="#F0C75C" stop-opacity=".8"/>
      </linearGradient>
      <linearGradient id="gText" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FCE7A6"/><stop offset=".38" stop-color="#F0C75C"/><stop offset=".74" stop-color="#D9A43C"/><stop offset="1" stop-color="#B9862A"/>
      </linearGradient></defs></svg>`;

    function decor(kind) {
      const sw = `<path d="M-6 50C8 40 19 21 39 -6" stroke="url(#gSw)" stroke-width=".55"/>
                  <path d="M-6 59C14 47 30 21 51 -6" stroke="url(#gSw)" stroke-width=".3"/>
                  <path d="M-6 40C5 33 12 18 26 -6" stroke="url(#gSw)" stroke-width=".25"/>`;
      const frame = kind === "cover" ? "" : `<rect class="frame" x="5" y="5" width="${W - 10}" height="${H - 10}" rx="3"/>`;
      return `<svg class="decor" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
        ${frame}<g class="sw">${sw}</g><g class="sw" transform="rotate(180 ${W / 2} ${H / 2})">${sw}</g></svg>`;
    }
    const foot = (n) => `<footer class="foot"><i></i><span>${pad2(n)}</span><i></i></footer>`;
    const page = (cls, inner, n, kind) =>
      `<section class="page ${cls}" data-n="${n}"><div class="bg"></div>${decor(kind)}<div class="sheet">${inner}${n ? foot(n) : ""}</div></section>`;

    const SVC = D.services;
    const ORDER = ["cover", "about", "contents", ...SVC.map((s) => "svc:" + s.id), "prices", "process", "contact"];
    const pageOf = (key) => ORDER.indexOf(key) + 1;

    function pCover() {
      const [k, ...rest] = T.catalog.split(" ");
      const strip = ["spray", "bucket", "window", "sofa", "bath", "vacuum", "armchair"].map(medal).join("");
      return page("p-cover", `
        <img class="cover-logo" src="${logo}logo-stacked-gold.svg" alt="Infinity Cleaning Service">
        <p class="cover-tag">${esc(L(D.brand.tagline))}</p>
        ${orn()}
        <h2 class="cover-title"><span class="k gold-text">${esc(k)}</span><span class="s">${esc(rest.join(" "))}</span></h2>
        <div class="cover-strip">${strip}</div>
        <div class="cover-foot">${esc(C.website)}</div>`, 0, "cover");
    }

    function pAbout(n) {
      const vals = D.values.map((v) => `<div class="value">${medal(v.icon)}<div><h3>${esc(L(v.title))}</h3><p>${esc(L(v.text))}</p></div></div>`).join("");
      return page("p-about", `
        ${logoImg()}
        ${pill(T.about)}
        <div class="fill">
          <p class="about-text">${esc(L(D.about))}</p>
          <div class="quote">${orn()}<p class="gold-text">${esc(L(D.brand.tagline))}</p>${orn()}</div>
          <div style="width:100%"><h3 class="h2"><span class="gold-text">${esc(T.whyUs)}</span></h3><div class="values">${vals}</div></div>
        </div>`, n);
    }

    function pContents(n) {
      const row = (ic, t, p) => `<a data-goto="${p}">${medal(ic)}<span class="t">${esc(t)}</span><span class="dots"></span><span class="n">${pad2(p)}</span></a>`;
      const rows = SVC.map((s) => row(s.icon, L(s.title), pageOf("svc:" + s.id))).join("");
      const extra = [["receipt", T.priceList, pageOf("prices")], ["list-check", T.howWeWork, pageOf("process")], ["phone-call", T.contact, pageOf("contact")]]
        .map((r) => row(...r)).join("");
      return page("p-contents", `${logoImg()}${pill(T.services)}<nav class="toc">${rows}<div class="sep"></div>${extra}</nav>`, n);
    }

    function tariffs(s) {
      const rows = s.prices.map((p) => `<div class="price"><div class="box">${p.from ? `<span class="from">${esc(T.from)}</span>` : ""}<span class="v gold-text">${esc(p.value)}</span><span class="u">${esc(T[p.unit])}</span></div><div class="lbl">${esc(priceLabel(p))}</div></div>`).join("");
      return `<div class="tariffs"><div class="tag">${esc(T.tariffs)}</div>${rows}${s.note ? `<div class="note">${esc(L(s.note))}</div>` : ""}</div>`;
    }

    function pService(s, n) {
      const head = `${logoImg(s.layout === "pricelist" ? "sm" : "")}${pill(L(s.title))}${lead(L(s.lead))}`;
      const inc = (cls = "") => `<div class="inc ${cls}"><h3 class="gold-text">${esc(T.includes)}:</h3>${checks(L(s.includes))}</div>`;
      let body = "";
      if (s.layout === "tariffs") {
        body = `<div class="mid"><div class="arch">${ILL.scene(s.ill)}</div>${tariffs(s)}</div>${inc()}`;
      } else if (s.layout === "plain") {
        body = `<div class="mid"><div class="arch big">${ILL.scene(s.ill)}</div></div>${inc("center")}`;
      } else if (s.layout === "plans") {
        const plans = s.plans.map((p, i) => `<div class="plan ${i === 0 ? "hi" : ""}">${p.tag ? `<span class="ribbon">${esc(L(p.tag))}</span>` : ""}
            <div><div class="nm gold-text">${esc(p.name)}</div><span class="vs">${esc(L(p.visits))}</span></div>
            <div class="pp"><b><span class="gold-text">${esc(p.our)}</span><small>${esc(T.perM2)}</small></b><span>${esc(T.withOur)}</span></div>
            <div class="pp"><b><span class="gold-text">${esc(p.client)}</span><small>${esc(T.perM2)}</small></b><span>${esc(T.withClient)}</span></div></div>`).join("");
        body = `<div class="mid"><div class="arch med">${ILL.scene(s.ill)}</div></div><div class="plans">${plans}</div>
          <div class="paynote">${check()}<span>${esc(L(s.note))}</span></div>`;
      } else if (s.layout === "pricelist") {
        const rows = s.items.map((it) => `<div class="prow">${ILL.mini(it.icon)}<span class="nm">${esc(L(it.name))}</span><span class="pr">${it.from ? `<small>${esc(T.from)}</small>` : ""}${esc(it.price)}<small>${esc(T.lei)}</small></span></div>`).join("");
        const notes = L(s.notes).map((t) => `<li>${check()}<span>${esc(t)}</span></li>`).join("");
        body = `<div class="uph-top">${inc()}<div class="arch sm">${ILL.scene(s.ill)}</div></div>
          <div class="ptable">${rows}</div>
          <div class="notes">${icon("vacuum", "big")}<ul>${notes}</ul></div>`;
      }
      return page("p-svc p-" + s.layout, head + body, n);
    }

    function pPrices(n) {
      const v = (x, from) => `<td class="v">${from ? `<small>${esc(T.from)}</small> ` : ""}<span class="gold-text">${esc(x)}</span></td>`;
      const byId = Object.fromEntries(SVC.map((s) => [s.id, s]));
      const gen = byId.generala, mnt = byId.intretinere, sub = byId.abonamente, win = byId.geamuri, bal = byId.balcoane, uph = byId.tapitate;
      const cleanRows = [
        `<tr><td>${esc(L(gen.title))}</td>${v(gen.prices[0].value)}${v(gen.prices[1].value)}</tr>`,
        `<tr><td>${esc(L(mnt.title))}</td>${v(mnt.prices[0].value)}${v(mnt.prices[1].value)}</tr>`,
        ...sub.plans.map((p) => `<tr><td>${esc(T.subscription)} ${esc(p.name)} <span style="color:var(--muted)">· ${esc(L(p.visits))}</span></td>${v(p.our)}${v(p.client)}</tr>`),
        `<tr><td>${esc(L(bal.title))}</td><td class="v" colspan="2"><small>${esc(T.from)}</small> <span class="gold-text">${esc(bal.prices[0].value)}</span></td></tr>`
      ].join("");
      const winRows = win.prices.map((p) => `<tr><td>${esc(priceLabel(p))}</td>${v(p.value)}</tr>`).join("") +
        `<tr><td>${esc(lang === "ro" ? "Murdărie accentuată" : "Сильное загрязнение")}</td>${v("45", true)}</tr>`;
      const half = Math.ceil(uph.items.length / 2);
      const uphTbl = (arr) => `<table class="tbl"><tbody>${arr.map((it) => `<tr><td>${esc(L(it.name))}</td>${v(it.price, it.from)}</tr>`).join("")}</tbody></table>`;
      return page("p-prices", `
        ${logoImg("sm")}${pill(T.priceList)}
        <div class="sum">
          <section><h3>${esc(T.cleaningPerM2)}</h3>
            <table class="tbl"><thead><tr><th>${esc(T.service)}</th><th>${esc(T.ourProducts)}</th><th>${esc(T.clientProducts)}</th></tr></thead><tbody>${cleanRows}</tbody></table></section>
          <section><h3>${esc(T.windowsPerM2)}</h3><table class="tbl"><tbody>${winRows}</tbody></table></section>
          <section><h3>${esc(T.upholsteryPerItem)} · ${esc(T.lei)}</h3><div class="grid2">${uphTbl(uph.items.slice(0, half))}${uphTbl(uph.items.slice(half))}</div></section>
        </div>`, n);
    }

    function pProcess(n) {
      const steps = D.steps.map((s, i) => `<div class="step"><div class="num">${icon(s.icon)}<b>${i + 1}</b></div><div><h3>${esc(L(s.title))}</h3><p>${esc(L(s.text))}</p></div></div>`).join("");
      return page("p-process", `${logoImg("sm")}${pill(T.howWeWork)}<div class="fill"><div class="steps">${steps}</div>
        <div class="infobox"><h3 class="gold-text">${esc(T.goodToKnow)}</h3>${checks(L(D.terms))}</div></div>`, n);
    }

    function pContact() {
      const msgName = { whatsapp: "WhatsApp", viber: "Viber", telegram: "Telegram" };
      const msgs = (C.messengers || []).map((m) => `<span>${icon("brand-" + m)}${msgName[m]}</span>`).join("");
      const social = [C.instagram && "@" + C.instagram, C.facebook && "fb.com/" + C.facebook].filter(Boolean).join(" · ") || D.brand.name;
      const rows = [
        `<div class="crow">${medal("phone")}<div><small>${esc(T.phone)}</small><b class="ph gold-text">${esc(C.phone)}</b>${msgs ? `<div class="msgs">${msgs}</div>` : ""}</div></div>`,
        `<div class="crow">${medal("brand-instagram")}<div><small>Instagram · Facebook</small><b>${esc(social)}</b></div></div>`,
        `<div class="crow">${medal("world")}<div><small>${esc(T.web)}</small><b>${esc(C.website)}</b></div></div>`,
        C.email && `<div class="crow">${medal("mail")}<div><small>${esc(T.email)}</small><b>${esc(C.email)}</b></div></div>`,
        L(C.area) && `<div class="crow">${medal("map-pin")}<div><small>${esc(T.area)}</small><b>${esc(L(C.area))}</b></div></div>`,
        L(C.hours) && `<div class="crow">${medal("clock")}<div><small>${esc(T.hours)}</small><b>${esc(L(C.hours))}</b></div></div>`
      ].filter(Boolean).join("");
      return page("p-contact", `
        <img class="contact-logo" src="${logo}logo-stacked-gold.svg" alt="Infinity Cleaning Service">
        ${pill(T.contact)}
        <p class="book gold-text">${esc(T.book)}</p>
        <div class="clist">${rows}</div>
        <div class="qrwrap"><div class="qr">${qrSvg(C.websiteUrl)}</div><p><b>${esc(C.website)}</b>${esc(T.scan)}</p></div>
        <footer class="foot"><i></i><em>${esc(L(D.brand.tagline))}</em><i></i></footer>`, 0);
    }

    const pages = ORDER.map((key, i) => {
      const n = i + 1;
      if (only && !only.includes(n)) return null;
      let html;
      if (key === "cover") html = pCover();
      else if (key === "about") html = pAbout(n);
      else if (key === "contents") html = pContents(n);
      else if (key === "prices") html = pPrices(n);
      else if (key === "process") html = pProcess(n);
      else if (key === "contact") html = pContact();
      else html = pService(SVC.find((s) => "svc:" + s.id === key), n);
      const svc = key.startsWith("svc:") ? SVC.find((s) => "svc:" + s.id === key) : null;
      const title = svc ? L(svc.title) : { cover: T.catalog, about: T.about, contents: T.services, prices: T.priceList, process: T.howWeWork, contact: T.contact }[key];
      return { key, n, title, html };
    }).filter(Boolean);

    return { defs, pages };
  }

  /* shrink a pill title until it fits in two lines */
  function fitPill(p) {
    for (let i = 0; i < 20; i++) {
      const cs = getComputedStyle(p);
      const lh = parseFloat(cs.lineHeight), inner = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      if (inner <= lh * 2.2 && p.scrollWidth <= p.clientWidth + 1) return;
      p.style.fontSize = parseFloat(cs.fontSize) * 0.95 + "px";
    }
  }

  window.ICS_CATALOG = { build, fitPill };
})();
