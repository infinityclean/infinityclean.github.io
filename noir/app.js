/* Varianta 1 — Noir Royal */
(function () {
  "use strict";
  const W = window.ICSWeb, D = W.D, $ = (s) => document.querySelector(s);
  const GRID = ["generala", "intretinere", "camere", "bucatarie", "baie", "geamuri", "balcoane", "suplimentare"];

  const price = (v, unit, from) => `<span class="pv">${from ? `<small>${W.esc(W.from())}</small> ` : ""}<b>${W.esc(v)}</b> <span>${W.esc(unit)}</span></span>`;
  const checks = (items) => items.map((t) => `<li>${W.check()}<span>${W.esc(t)}</span></li>`).join("");

  function services() {
    return GRID.map((id, i) => {
      const s = W.byId[id], inc = W.L(s.includes), first = inc.slice(0, 4), rest = inc.slice(4);
      const chips = (s.prices || []).map((p) => `<li class="chip">${price(p.value, W.unitM2(), p.from)}<em>${W.esc(W.priceLabel(p))}</em></li>`).join("");
      return `<article class="svc reveal" style="--d:${(i % 4) * 70}ms" id="svc-${id}">
        <div class="arch">${W.ill(s.ill)}</div>
        <div class="svc-body">
          <h3>${W.esc(W.L(s.title))}</h3>
          <p class="lead">${W.esc(W.L(s.lead))}</p>
          ${chips ? `<ul class="chips">${chips}</ul>` : ""}
          ${s.note ? `<p class="note">${W.esc(W.L(s.note))}</p>` : ""}
          <ul class="checks">${checks(first)}</ul>
          ${rest.length ? `<ul class="checks more" hidden>${checks(rest)}</ul><button class="more-btn" type="button" aria-expanded="false">${W.esc(W.t.cta.more)} <span class="i-chevron-down"></span></button>` : ""}
          <a class="svc-cta" href="#contact" data-pick="${id}">${W.esc(W.t.cta.bookShort)} <span class="i-arrow"></span></a>
        </div>
      </article>`;
    }).join("");
  }

  function board() {
    const g = W.byId.generala, m = W.byId.intretinere, b = W.byId.balcoane, w = W.byId.geamuri, P = W.p;
    const row = (s) => `<tr><th scope="row">${W.esc(W.L(s.title))}</th><td>${price(s.prices[0].value, W.unitM2())}</td><td>${price(s.prices[1].value, W.unitM2())}</td></tr>`;
    return `<div class="card tcard reveal">
        <h3><span class="i-home"></span>${W.esc(P.cleaningPerM2)}</h3>
        <table class="tbl"><thead><tr><th></th><th>${W.esc(P.ourProducts)}</th><th>${W.esc(P.clientProducts)}</th></tr></thead>
        <tbody>${row(g)}${row(m)}<tr><th scope="row">${W.esc(W.L(b.title))}</th><td colspan="2" class="c">${price(b.prices[0].value, W.unitM2(), true)}</td></tr></tbody></table>
        <a class="link" href="#abonamente">${W.esc(W.t.nav.plans)} — ${W.esc(W.from())} ${W.esc(Math.min(...W.byId.abonamente.plans.map((p) => +p.client)))} ${W.esc(W.unitM2())} <span class="i-arrow"></span></a>
      </div>
      <div class="card tcard reveal" style="--d:90ms">
        <h3><span class="i-window"></span>${W.esc(P.windowsPerM2)}</h3>
        <ul class="wlist">${w.prices.map((p) => `<li><span>${W.esc(W.priceLabel(p))}</span><i></i>${price(p.value, W.unitM2())}</li>`).join("")}</ul>
        <p class="note">${W.esc(W.L(w.note))}</p>
      </div>`;
  }

  function plans() {
    const a = W.byId.abonamente, P = W.p;
    return a.plans.map((p, i) => `<article class="plan ${i === 0 ? "hi" : ""} reveal" style="--d:${i * 90}ms">
        ${p.tag ? `<span class="badge">${W.esc(W.L(p.tag))}</span>` : ""}
        <h3 class="plan-nm gold-text">${W.esc(p.name)}</h3>
        <p class="plan-vs">${W.esc(W.L(p.visits))}</p>
        <div class="plan-pr"><b class="gold-text">${W.esc(p.our)}</b><span>${W.esc(W.unitM2())}</span><small>${W.esc(P.withOur)}</small></div>
        <div class="plan-pr two"><b>${W.esc(p.client)}</b><span>${W.esc(W.unitM2())}</span><small>${W.esc(P.withClient)}</small></div>
        <a class="btn ${i === 0 ? "btn-gold" : "btn-line"} wide" href="#contact" data-pick="abonamente">${W.esc(W.t.cta.choose)} ${W.esc(p.name)}</a>
      </article>`).join("") + `<p class="paynote reveal">${W.check()}<span>${W.esc(W.L(a.note))}</span></p>`;
  }

  function upholstery() {
    const s = W.byId.tapitate;
    const rows = s.items.map((it, i) => `<li class="prow reveal" style="--d:${i * 40}ms">${W.mini(it.icon)}<span class="nm">${W.esc(W.L(it.name))}</span><span class="pr">${it.from ? `<small>${W.esc(W.from())}</small>` : ""}${W.esc(it.price)} <small>${W.esc(W.lei())}</small></span></li>`).join("");
    return `<div class="uph-left card reveal">
        <div class="arch">${W.ill(s.ill)}</div>
        <h3 class="inc-h gold-text">${W.esc(W.p.includes)}:</h3>
        <ul class="checks">${checks(W.L(s.includes))}</ul>
      </div>
      <div class="uph-right">
        <ul class="ptable">${rows}</ul>
        <div class="notes card reveal"><span class="i-vacuum big"></span><ul>${W.L(s.notes).map((n) => `<li>${W.check()}<span>${W.esc(n)}</span></li>`).join("")}</ul></div>
        <a class="btn btn-gold" href="#contact" data-pick="tapitate">${W.esc(W.t.cta.book)}</a>
      </div>`;
  }

  const steps = () => D.steps.map((s, i) => `<li class="step reveal" style="--d:${i * 90}ms"><span class="num">${W.icon(s.icon)}<b>${i + 1}</b></span><h3>${W.esc(W.L(s.title))}</h3><p>${W.esc(W.L(s.text))}</p></li>`).join("");
  const values = () => D.values.map((v, i) => `<div class="value card reveal" style="--d:${i * 80}ms"><span class="medal">${W.icon(v.icon)}</span><h3>${W.esc(W.L(v.title))}</h3><p>${W.esc(W.L(v.text))}</p></div>`).join("");
  const faq = () => D.faq.map((f, i) => `<details class="qa reveal"${i === 0 ? " open" : ""}><summary><span>${W.esc(W.L(f.q))}</span><i aria-hidden="true"></i></summary><div class="a"><p>${W.esc(W.L(f.a))}</p></div></details>`).join("");

  function contactCard() {
    const C = W.C, t = W.t, so = W.socials();
    const lines = [
      `<div class="cline"><span class="i-web"></span><a href="${W.esc(C.websiteUrl)}" data-website></a></div>`,
      so.length ? so.map((s) => `<div class="cline"><span class="i-${s.icon === "brand-instagram" ? "ig" : s.icon === "brand-facebook" ? "fb" : "brand-tiktok"}"></span><a href="${W.esc(s.url)}" target="_blank" rel="noopener">${W.esc(s.label)}</a></div>`).join("")
        : `<div class="cline"><span class="i-ig"></span><span>Instagram · Facebook: <b>${W.esc(D.brand.name)}</b></span></div>`,
      C.email ? `<div class="cline"><span class="i-mail"></span><a href="mailto:${W.esc(C.email)}">${W.esc(C.email)}</a></div>` : "",
      W.L(C.area) ? `<div class="cline"><span class="i-map-pin"></span><span>${W.esc(W.L(C.area))}</span></div>` : "",
      W.L(C.hours) ? `<div class="cline"><span class="i-clock"></span><span>${W.esc(W.L(C.hours))}</span></div>` : ""
    ].join("");
    return `<p class="label">${W.esc(W.p.phone)}</p>
      <a class="big-phone gold-text" data-contact="tel" data-phone></a>
      <div class="mbtns">
        <a class="mbtn" data-contact="whatsapp"><span class="i-wa"></span>WhatsApp</a>
        <a class="mbtn" data-contact="viber"><span class="i-viber"></span>Viber</a>
        <a class="mbtn" data-contact="telegram"><span class="i-tg"></span>Telegram</a>
      </div>
      <div class="clines">${lines}</div>
      <div class="qrbox"><div class="qr" data-qr></div><p>${W.esc(t.misc.scan)}</p></div>`;
  }

  function render() {
    $("#facts").innerHTML = W.t.hero.facts.map((f) => `<li>${W.check()}<span>${W.esc(f)}</span></li>`).join("");
    $("#svcGrid").innerHTML = services();
    $("#board").innerHTML = board();
    $("#plans").innerHTML = plans();
    $("#uph").innerHTML = upholstery();
    $("#steps").innerHTML = steps();
    $("#values").innerHTML = values();
    $("#faq").innerHTML = faq();
    $("#ccard").innerHTML = contactCard();
    const sel = $("#fService"), keep = sel.value;
    sel.innerHTML = W.serviceOptions(keep || "generala");
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".more-btn");
    if (!b) return;
    const more = b.previousElementSibling, open = more.hidden;
    more.hidden = !open;
    b.setAttribute("aria-expanded", String(open));
    b.firstChild.textContent = (open ? W.t.cta.less : W.t.cta.more) + " ";
    b.classList.toggle("open", open);
  });

  /* mobile: swipe carousel dots for the services */
  function dots() {
    const grid = $("#svcGrid");
    let d = document.querySelector(".dots");
    if (!d) { d = document.createElement("div"); d.className = "dots"; grid.after(d); }
    const cards = [...grid.children];
    d.innerHTML = cards.map((c, i) => `<button type="button" aria-label="${i + 1}"></button>`).join("");
    const btns = [...d.children];
    const sync = () => {
      const mid = grid.scrollLeft + grid.clientWidth / 2;
      let best = 0, dist = 1e9;
      cards.forEach((c, i) => { const m = c.offsetLeft + c.offsetWidth / 2, dd = Math.abs(m - mid); if (dd < dist) { dist = dd; best = i; } });
      btns.forEach((b, i) => b.classList.toggle("on", i === best));
    };
    btns.forEach((b, i) => b.addEventListener("click", () => grid.scrollTo({ left: cards[i].offsetLeft - (grid.clientWidth - cards[i].offsetWidth) / 2, behavior: "smooth" })));
    grid.onscroll = () => requestAnimationFrame(sync);
    sync();
  }

  W.start(() => { render(); dots(); });
  W.initHeader($("#hdr"), $(".burger"), $("#menu"));
  /* sticky call bar appears after the hero */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => document.body.classList.toggle("show-mbar", !e.isIntersecting), { threshold: 0.15 }).observe($(".hero"));
  }
  W.bindForm($("#form"));
})();
