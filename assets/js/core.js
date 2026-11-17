/* Infinity Cleaning Service — shared website core (i18n, contacts, helpers, price calculator).
   Content lives in data.js (same file the printed catalog uses). */
(function () {
  "use strict";
  const D = window.ICS, IC = window.ICS_ICONS || {}, ILL = window.ICS_ILL;
  const C = D.contacts;
  const KEY = "ics-lang";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const qs = new URLSearchParams(location.search);
  let lang = qs.get("lang") || store.get(KEY) || "ro";
  if (lang !== "ro" && lang !== "ru") lang = "ro";
  const listeners = [];

  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const L = (o) => (o == null ? "" : typeof o === "string" || Array.isArray(o) ? o : (o[lang] ?? ""));
  const path = (obj, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), obj);
  const byId = Object.fromEntries(D.services.map((s) => [s.id, s]));
  const num = (v) => parseFloat(String(v).replace(",", "."));
  const isDemo = /x/i.test(C.phone || "") || !(C.phoneIntl || "").replace(/\D/g, "");

  const W = {
    D, C, byId, esc, L, isDemo,
    get lang() { return lang; },
    get t() { return D.web[lang]; },
    get p() { return D.t[lang]; },

    icon(name, cls = "", sw = 1.8) {
      return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[name] || ""}</svg>`;
    },
    check(cls = "") {
      return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.6l4.6 4.6L19.6 6.7"/></svg>`;
    },
    star(cls = "") {
      return `<svg class="${cls}" viewBox="-10 -11 20 22" aria-hidden="true"><path fill="currentColor" d="${ILL.sparkle(0, 0, 9, 0.1, 1.12)}"/></svg>`;
    },
    ill: (name, cls) => ILL.scene(name, cls),
    mini: (name, cls) => ILL.mini(name, cls),
    money(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); },
    unitM2() { return D.t[lang].perM2; },
    lei() { return D.t[lang].lei; },
    from() { return D.t[lang].from; },
    priceLabel(p) { return typeof p.label === "string" ? D.t[lang][p.label] : L(p.label); },

    /* ---------- contact links ---------- */
    links: {
      tel: () => `tel:+${C.phoneIntl}`,
      whatsapp: (text) => `https://wa.me/${C.phoneIntl}${text ? "?text=" + encodeURIComponent(text) : ""}`,
      viber: () => `viber://chat?number=%2B${C.phoneIntl}`,
      telegram: () => (C.telegramUser ? `https://t.me/${C.telegramUser}` : `https://t.me/+${C.phoneIntl}`)
    },
    socials() {
      const out = [];
      if (C.instagram) out.push({ name: "Instagram", icon: "brand-instagram", url: `https://instagram.com/${C.instagram}`, label: "@" + C.instagram });
      if (C.facebook) out.push({ name: "Facebook", icon: "brand-facebook", url: `https://facebook.com/${C.facebook}`, label: C.facebook });
      if (C.tiktok) out.push({ name: "TikTok", icon: "brand-tiktok", url: `https://tiktok.com/@${C.tiktok}`, label: "@" + C.tiktok });
      return out;
    },
    qr(text, color = "#15100A") {
      const qr = window.qrcode(0, "M");
      qr.addData(text);
      qr.make();
      const n = qr.getModuleCount();
      let d = "";
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
      return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img" aria-label="QR ${esc(text)}"><path fill="${color}" d="${d}"/></svg>`;
    },
    catalogUrl(l = lang) { return `${W.base}assets/catalog/Infinity_Catalog_${l.toUpperCase()}_A5.pdf`; },
    base: (document.currentScript && document.currentScript.src.split("assets/js/")[0]) || "../",

    /* ---------- i18n ---------- */
    setLang(l) {
      if (l !== "ro" && l !== "ru") return;
      lang = l;
      store.set(KEY, l);
      const u = new URL(location.href);
      u.searchParams.set("lang", l);
      history.replaceState(null, "", u);
      listeners.forEach((fn) => fn(l));
      W.applyStatic();
      W.bindContacts();
      W.fillIcons();
      document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")); // no re-animation on language switch
    },
    onLang(fn) { listeners.push(fn); },
    applyStatic(root = document) {
      document.documentElement.lang = lang;
      const t = D.web[lang];
      if (document.body.dataset.title !== "keep") document.title = t.meta.title;
      const md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", t.meta.description);
      root.querySelectorAll("[data-t]").forEach((el) => {
        const v = path(t, el.dataset.t) ?? path(D.t[lang], el.dataset.t) ?? L(path(D, el.dataset.t));
        if (typeof v === "string") el.textContent = v;
      });
      root.querySelectorAll("[data-t-attr]").forEach((el) => {
        el.dataset.tAttr.split(";").forEach((pair) => {
          const [attr, key] = pair.split("=");
          const v = path(t, key);
          if (typeof v === "string") el.setAttribute(attr.trim(), v);
        });
      });
      root.querySelectorAll("[data-lang-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)));
      root.querySelectorAll("[data-catalog]").forEach((a) => (a.href = W.catalogUrl(a.dataset.catalog || lang)));
    },

    /* ---------- behaviours ---------- */
    toast(msg) {
      let el = document.querySelector(".ics-toast");
      if (!el) { el = document.createElement("div"); el.className = "ics-toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(el._t);
      el._t = setTimeout(() => el.classList.remove("show"), 3200);
    },
    bindContacts(root = document) {
      root.querySelectorAll("[data-contact]").forEach((a) => {
        const kind = a.dataset.contact;
        a.href = W.links[kind] ? W.links[kind]() : "#";
        if (kind !== "tel") { a.target = "_blank"; a.rel = "noopener"; }
        if (isDemo && !a._demo) {
          a._demo = true;
          a.addEventListener("click", (e) => { if (W.isDemo) { e.preventDefault(); W.toast(W.t.misc.demoPhone); } });
        }
      });
      root.querySelectorAll("[data-phone]").forEach((el) => (el.textContent = C.phone));
      root.querySelectorAll("[data-website]").forEach((el) => (el.textContent = C.website));
      root.querySelectorAll("[data-qr]").forEach((el) => (el.innerHTML = W.qr(C.websiteUrl)));
    },
    /* <span class="i-phone"></span> -> inline icon (aliases for brand icons) */
    fillIcons(root = document) {
      const alias = { wa: "brand-whatsapp", viber: "brand-viber", tg: "brand-telegram", ig: "brand-instagram", fb: "brand-facebook", dl: "download", web: "world", arrow: "arrow-right" };
      root.querySelectorAll("[class^='i-'],[class*=' i-']").forEach((el) => {
        if (el.firstChild) return;
        const cls = [...el.classList].find((c) => c.startsWith("i-"));
        const name = cls.slice(2);
        el.innerHTML = name === "check" ? W.check() : W.icon(alias[name] || name);
      });
    },
    pickService(id) {
      document.querySelectorAll("select[name=service]").forEach((s) => { if ([...s.options].some((o) => o.value === id)) s.value = id; });
    },
    initLangSwitch(root = document) {
      root.querySelectorAll("[data-lang-btn]").forEach((b) => b.addEventListener("click", () => W.setLang(b.dataset.langBtn)));
    },
    initReveal(root = document) {
      const els = root.querySelectorAll(".reveal:not(.in)");
      if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
      const io = W._io || (W._io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }));
      els.forEach((e) => io.observe(e));
    },
    initHeader(hdr, toggle, menu) {
      const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 24);
      addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      if (toggle && menu) {
        const set = (open) => { hdr.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); document.body.classList.toggle("menu-open", open); };
        toggle.addEventListener("click", () => set(!hdr.classList.contains("open")));
        menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
        addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
      }
    },

    /* ---------- request form -> WhatsApp ---------- */
    serviceOptions(selected) {
      const opts = D.services.map((s) => `<option value="${esc(s.id)}"${s.id === selected ? " selected" : ""}>${esc(L(s.title))}</option>`);
      opts.push(`<option value="other">${esc(W.t.form.other)}</option>`);
      return opts.join("");
    },
    bindForm(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = W.t.form, v = (n) => (form.elements[n] ? form.elements[n].value.trim() : "");
        const svc = byId[v("service")];
        const lines = [f.greeting];
        if (v("name")) lines.push(`• ${f.name}: ${v("name")}`);
        if (v("phone")) lines.push(`• ${f.phone}: ${v("phone")}`);
        lines.push(`• ${f.service}: ${svc ? L(svc.title) : f.other}`);
        if (v("area")) lines.push(`• ${f.area}: ${v("area")}`);
        if (v("date")) lines.push(`• ${f.date}: ${v("date")}`);
        if (v("message")) lines.push(`• ${v("message")}`);
        if (W.isDemo) { W.toast(W.t.misc.demoPhone); return; }
        window.open(W.links.whatsapp(lines.join("\n")), "_blank", "noopener");
      });
    },

    /* ---------- price calculator (prices come from data.js) ---------- */
    cleaningTypes() {
      const g = byId.generala, m = byId.intretinere, a = byId.abonamente, w = byId.geamuri, b = byId.balcoane;
      const visits = (p) => parseInt(L(p.visits), 10) || 1;
      return [
        { id: "generala", name: L(g.title), ours: num(g.prices[0].value), client: num(g.prices[1].value), visits: 1 },
        { id: "intretinere", name: L(m.title), ours: num(m.prices[0].value), client: num(m.prices[1].value), visits: 1 },
        ...a.plans.map((p) => ({ id: "plan-" + p.name.toLowerCase(), name: `${D.t[lang].subscription} ${p.name}`, ours: num(p.our), client: num(p.client), visits: visits(p), plan: true, sub: L(p.visits) })),
        { id: "geamuri", name: L(w.title), windows: w.prices.map((p, i) => ({ id: ["in", "out", "both"][i] || "w" + i, label: W.priceLabel(p), v: num(p.value) })) },
        { id: "balcoane", name: L(b.title), ours: num(b.prices[0].value), client: num(b.prices[0].value), visits: 1, from: true, noProducts: true }
      ];
    },
    estimate({ type, area, products = "ours", side = "both" }) {
      const t = W.cleaningTypes().find((x) => x.id === type) || W.cleaningTypes()[0];
      if (t.windows) {
        const s = t.windows.find((x) => x.id === side) || t.windows[t.windows.length - 1];
        return { type: t, perVisit: s.v * area, rate: s.v, visits: 1, monthly: null, from: false };
      }
      const rate = products === "client" && !t.noProducts ? t.client : t.ours;
      const perVisit = rate * area;
      return { type: t, rate, perVisit, visits: t.visits, monthly: t.plan ? perVisit * t.visits : null, from: !!t.from };
    },
    uphItems() {
      return byId.tapitate.items.map((it, i) => ({ i, name: L(it.name), price: num(it.price), from: !!it.from, icon: it.icon }));
    },

    /* ---------- boot ---------- */
    start(render) {
      document.documentElement.classList.add("js");
      if (render) { render(); W.onLang(render); }
      W.applyStatic();
      W.initLangSwitch();
      W.bindContacts();
      W.fillIcons();
      ILL.ensureDefs();
      W.initReveal();
      document.addEventListener("click", (e) => {
        const p = e.target.closest("[data-pick]");
        if (p) W.pickService(p.dataset.pick);
      });
      document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    }
  };
  window.ICSWeb = W;
})();
