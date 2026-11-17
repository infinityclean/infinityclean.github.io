/* Varianta 3 — Modern: glass UI + live price calculator */
(function () {
  "use strict";
  const W = window.ICSWeb, D = W.D, $ = (s) => document.querySelector(s);
  const BENTO = ["generala", "intretinere", "geamuri", "camere", "bucatarie", "baie", "balcoane", "suplimentare"];
  const CALCABLE = { generala: "generala", intretinere: "intretinere", geamuri: "geamuri", balcoane: "balcoane" };
  const st = { tab: "clean", type: "generala", area: 60, products: "ours", side: "both", items: {}, planProd: "our" };
  const checks = (arr) => arr.map((t) => `<li>${W.check()}<span>${W.esc(t)}</span></li>`).join("");

  function bento() {
    return BENTO.map((id, i) => {
      const s = W.byId[id];
      const min = s.prices ? Math.min(...s.prices.map((p) => +p.value)) : null;
      return `<article class="tile glass ${i < 2 ? "big" : ""} reveal" style="--d:${(i % 4) * 60}ms">
          ${min ? `<span class="tag">${W.esc(W.from())} <b>${min}</b> ${W.esc(W.unitM2())}</span>` : ""}
          <div class="tile-ill">${W.ill(s.ill)}</div>
          <div class="tile-body">
            <h3>${W.esc(W.L(s.title))}</h3>
            <p>${W.esc(W.L(s.lead))}</p>
            <ul class="mchecks">${checks(W.L(s.includes).slice(0, i === 0 ? 99 : i === 1 ? 5 : 3))}</ul>
            ${CALCABLE[id] ? `<button class="tile-btn" type="button" data-calc="${id}">${W.icon("calculator")}<span>${W.esc(W.t.calc.title)}</span></button>` : `<a class="tile-btn" href="#contact" data-pick="${id}">${W.icon("arrow-right")}<span>${W.esc(W.t.cta.bookShort)}</span></a>`}
          </div>
        </article>`;
    }).join("");
  }

  function plans() {
    const a = W.byId.abonamente;
    return a.plans.map((p, i) => `<article class="plan glass ${i === 0 ? "hi" : ""} reveal" style="--d:${i * 80}ms">
        ${p.tag ? `<span class="badge">${W.esc(W.L(p.tag))}</span>` : ""}
        <h3>${W.esc(p.name)}</h3>
        <p class="vs">${W.esc(W.L(p.visits))}</p>
        <div class="price"><b class="gold-text">${W.esc(st.planProd === "our" ? p.our : p.client)}</b><span>${W.esc(W.unitM2())}</span></div>
        <p class="per">${W.esc(st.planProd === "our" ? W.p.withOur : W.p.withClient)}</p>
        <ul class="mchecks">${checks([W.L(p.visits), W.L(a.note)])}</ul>
        <a class="btn ${i === 0 ? "btn-gold" : "btn-glass"} wide" href="#contact" data-pick="abonamente">${W.esc(W.t.cta.choose)} ${W.esc(p.name)}</a>
      </article>`).join("");
  }

  function uph() {
    const s = W.byId.tapitate;
    const tiles = s.items.map((it, i) => `<div class="utile glass reveal" style="--d:${(i % 3) * 60}ms">${W.mini(it.icon)}<span class="nm">${W.esc(W.L(it.name))}</span>
        <b>${it.from ? `<small>${W.esc(W.from())}</small> ` : ""}${W.esc(it.price)} <small>${W.esc(W.lei())}</small></b></div>`).join("");
    return `<div class="ugrid">${tiles}</div>
      <aside class="uside glass reveal">
        <h3>${W.esc(W.p.includes)}</h3><ul class="mchecks">${checks(W.L(s.includes))}</ul>
        <div class="unotes">${W.L(s.notes).map((n, i) => `<p class="${i === 0 ? "strong" : ""}">${W.icon("info-circle")}<span>${W.esc(n)}</span></p>`).join("")}</div>
        <button class="btn btn-gold wide" type="button" data-calc-uph>${W.icon("calculator")}<span>${W.esc(W.t.calc.title)}</span></button>
      </aside>`;
  }

  const steps = () => D.steps.map((s, i) => `<li class="step glass reveal" style="--d:${i * 80}ms"><span class="sn">0${i + 1}</span><span class="si">${W.icon(s.icon)}</span><h3>${W.esc(W.L(s.title))}</h3><p>${W.esc(W.L(s.text))}</p></li>`).join("");
  const faq = () => D.faq.map((f, i) => `<details class="qa"${i === 0 ? " open" : ""}><summary>${W.esc(W.L(f.q))}<i></i></summary><p>${W.esc(W.L(f.a))}</p></details>`).join("");
  const why = () => D.values.map((v) => `<div class="w">${W.icon(v.icon)}<div><b>${W.esc(W.L(v.title))}</b><span>${W.esc(W.L(v.text))}</span></div></div>`).join("");

  /* ---------- calculator ---------- */
  function calcOptions() {
    const types = W.cleaningTypes();
    $("#cType").innerHTML = types.map((t) => `<option value="${t.id}">${W.esc(t.name)}${t.sub ? " · " + W.esc(t.sub) : ""}</option>`).join("");
    $("#cType").value = st.type;
    const win = types.find((t) => t.windows);
    $("#cSide").innerHTML = win.windows.map((w) => `<button type="button" data-v="${w.id}" class="${w.id === st.side ? "on" : ""}">${W.esc(w.label)}</button>`).join("");
    $("#uItems").innerHTML = W.uphItems().map((it) => `<li><span class="nm">${W.mini(it.icon)}<span>${W.esc(it.name)}</span></span>
        <span class="pr">${it.from ? W.esc(W.from()) + " " : ""}${it.price} ${W.esc(W.lei())}</span>
        <span class="qty"><button type="button" data-q="-1" data-i="${it.i}" aria-label="−">−</button><output>${st.items[it.i] || 0}</output><button type="button" data-q="1" data-i="${it.i}" aria-label="+">+</button></span></li>`).join("");
  }
  function update() {
    const t = W.t.calc, types = W.cleaningTypes(), ty = types.find((x) => x.id === st.type) || types[0];
    $("#sideFld").hidden = !ty.windows;
    $("#prodFld").hidden = !!(ty.windows || ty.noProducts);
    $("#areaLbl").textContent = ty.windows ? t.windowsArea : t.area;
    $("#cAreaOut").textContent = st.area;
    $("#cArea").style.setProperty("--p", ((st.area - 5) / 295) * 100 + "%");
    document.querySelectorAll(".tabs button").forEach((b) => { const on = b.dataset.tab === st.tab; b.classList.toggle("on", on); b.setAttribute("aria-selected", String(on)); });
    document.querySelectorAll(".pane").forEach((p) => (p.hidden = p.dataset.pane !== st.tab));
    let total = "—", sub = "", msg = W.t.form.greeting;
    if (st.tab === "clean") {
      const e = W.estimate({ type: st.type, area: st.area, products: st.products, side: st.side });
      const from = e.from ? W.esc(W.from()) + " " : "";
      if (e.monthly) {
        total = `${from}${W.money(e.monthly)} <small>${W.esc(W.lei())} / ${W.esc(t.perMonth)}</small>`;
        sub = `${W.money(e.perVisit)} ${W.lei()} ${t.perVisit} · ${ty.sub}`;
      } else {
        total = `${from}${W.money(e.perVisit)} <small>${W.esc(W.lei())}</small>`;
        sub = `${e.rate} ${W.unitM2()} × ${st.area} m²`;
      }
      const prod = ty.windows ? (ty.windows.find((w) => w.id === st.side) || {}).label : ty.noProducts ? "" : st.products === "ours" ? W.p.ourProducts : W.p.clientProducts;
      msg += `\n• ${ty.name}${ty.sub ? " (" + ty.sub + ")" : ""}\n• ${st.area} m²${prod ? "\n• " + prod : ""}\n• ${t.result}: ≈ ${(e.from ? W.from() + " " : "") + W.money(e.monthly || e.perVisit)} ${W.lei()}${e.monthly ? " / " + t.perMonth : ""}`;
    } else {
      const items = W.uphItems().filter((it) => st.items[it.i] > 0);
      const sum = items.reduce((a, it) => a + it.price * st.items[it.i], 0);
      if (items.length) {
        total = `${items.some((it) => it.from) ? W.esc(W.from()) + " " : ""}${W.money(sum)} <small>${W.esc(W.lei())}</small>`;
        sub = sum < 500 ? t.minOrder : items.map((it) => `${it.name} × ${st.items[it.i]}`).join(", ");
        msg += `\n${W.L(W.byId.tapitate.title)}:\n` + items.map((it) => `• ${it.name} × ${st.items[it.i]}`).join("\n") + `\n• ${t.result}: ≈ ${W.money(sum)} ${W.lei()}`;
      } else sub = t.empty;
    }
    $("#cTotal").innerHTML = total;
    $("#cSub").textContent = sub;
    $("#cSub").classList.toggle("warn", st.tab === "uph" && sub === t.minOrder);
    $("#cSend").href = W.links.whatsapp(msg);
    $("#cSend").target = "_blank";
    $("#cSend").rel = "noopener";
  }

  function render() {
    $("#facts").innerHTML = W.t.hero.facts.map((f) => `<li>${W.check()}<span>${W.esc(f)}</span></li>`).join("");
    const names = D.services.map((s) => W.esc(W.L(s.title)));
    const line = names.map((n) => `<span>${n}</span><i>✦</i>`).join("");
    $("#mq").innerHTML = line + line;
    $("#bento").innerHTML = bento();
    $("#plans").innerHTML = plans();
    $("#uph").innerHTML = uph();
    $("#steps").innerHTML = steps();
    $("#faqList").innerHTML = faq();
    $("#why").innerHTML = why();
    const sel = $("#fService"), keep = sel.value;
    sel.innerHTML = W.serviceOptions(keep || "generala");
    calcOptions();
    update();
    W.fillIcons();
  }

  /* ---------- events ---------- */
  $("#cType").addEventListener("change", (e) => { st.type = e.target.value; update(); });
  $("#cArea").addEventListener("input", (e) => { st.area = +e.target.value; update(); });
  $("#cProd").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st.products = b.dataset.v; [...e.currentTarget.children].forEach((x) => x.classList.toggle("on", x === b)); update(); });
  $("#cSide").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st.side = b.dataset.v; [...e.currentTarget.children].forEach((x) => x.classList.toggle("on", x === b)); update(); });
  document.querySelector(".tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; st.tab = b.dataset.tab; update(); });
  $("#uItems").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-q]"); if (!b) return;
    const i = +b.dataset.i;
    st.items[i] = Math.max(0, Math.min(20, (st.items[i] || 0) + +b.dataset.q));
    b.parentElement.querySelector("output").textContent = st.items[i];
    update();
  });
  $("#cSend").addEventListener("click", (e) => { if (W.isDemo) { e.preventDefault(); W.toast(W.t.misc.demoPhone); } });
  $("#planProd").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    st.planProd = b.dataset.v;
    [...e.currentTarget.children].forEach((x) => x.classList.toggle("on", x === b));
    $("#plans").innerHTML = plans();
    document.querySelectorAll("#plans .reveal").forEach((x) => x.classList.add("in"));
  });
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-calc]");
    if (c) { st.tab = "clean"; st.type = c.dataset.calc; $("#cType").value = st.type; update(); $("#calc").scrollIntoView({ behavior: "smooth", block: "center" }); }
    if (e.target.closest("[data-calc-uph]")) { st.tab = "uph"; update(); $("#calc").scrollIntoView({ behavior: "smooth", block: "center" }); }
  });

  W.start(render);
  W.initHeader($("#hdr"), $(".burger"), $("#menu"));
  W.bindForm($("#form"));
})();
