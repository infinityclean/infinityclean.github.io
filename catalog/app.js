/* Varianta 2 — Catalog digital: the printed brochure pages, live and bilingual */
(function () {
  "use strict";
  const W = window.ICSWeb, CAT = window.ICS_CATALOG, $ = (s) => document.querySelector(s);
  const pad = (n) => String(n).padStart(2, "0");
  const LOGO = W.base + "assets/img/logo/";
  let pages = [], cur = 0;

  const track = $("#track"), chips = $("#chips");

  function render() {
    const built = CAT.build({ lang: W.lang, logo: LOGO });
    pages = built.pages;
    if (!document.getElementById("catDefs")) document.body.insertAdjacentHTML("afterbegin", built.defs.replace("<svg ", '<svg id="catDefs" '));
    track.innerHTML = pages.map((p, i) => `<figure class="slide" data-i="${i}">
        <button class="open" type="button" aria-label="${W.esc(pad(i + 1) + " · " + p.title)}"><div class="cat">${p.html}</div><span class="zoom"><span class="i-zoom-in"></span></span></button>
        <figcaption><b>${pad(i + 1)}</b>${W.esc(p.title)}</figcaption></figure>`).join("");
    chips.innerHTML = pages.map((p, i) => `<button type="button" class="chip" role="tab" data-i="${i}"><b>${pad(i + 1)}</b>${W.esc(p.title)}</button>`).join("");
    $("#coverSlot").innerHTML = pages[0].html;
    const jump = ["generala", "abonamente", "geamuri", "tapitate"].map((id) => {
      const i = pages.findIndex((p) => p.key === "svc:" + id);
      return `<li><button type="button" data-go="${i}">${W.icon(W.byId[id].icon)}<span>${W.esc(W.L(W.byId[id].title))}</span></button></li>`;
    });
    jump.push(`<li><button type="button" data-go="${pages.findIndex((p) => p.key === "prices")}">${W.icon("receipt")}<span>${W.esc(W.p.priceList)}</span></button></li>`);
    $("#quick").innerHTML = jump.join("");
    $("#dlGrid").innerHTML = ["ro", "ru"].map((l) => {
      const cover = CAT.build({ lang: l, logo: LOGO, only: [1] }).pages[0].html;
      return `<a class="dl reveal" href="${W.catalogUrl(l)}" download>
          <div class="dl-cover cat">${cover}</div>
          <div class="dl-meta"><b>${W.esc(W.t.misc[l === "ro" ? "pdfRo" : "pdfRu"])}</b><span>${W.esc(W.t.misc.pages)}</span>
          <span class="btn btn-gold sm"><span class="i-dl"></span>PDF</span></div></a>`;
    }).join("");
    const sel = $("#fService"), keep = sel.value;
    sel.innerHTML = W.serviceOptions(keep || "generala");
    W.fillIcons();
    requestAnimationFrame(sync);
    if (!$("#lb").hidden) showLb(cur);
  }

  /* ---------- track navigation ---------- */
  const slides = () => [...track.children];
  function go(i, smooth = true) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    const s = slides()[i];
    if (!s) return;
    track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  }
  function sync() {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, dist = Infinity;
    slides().forEach((s, i) => { const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i; } });
    cur = best;
    $("#count").textContent = `${pad(cur + 1)} / ${pad(pages.length)}`;
    $("#bar").style.width = ((cur + 1) / pages.length) * 100 + "%";
    slides().forEach((s, i) => s.classList.toggle("on", i === cur));
    [...chips.children].forEach((c, i) => {
      const on = i === cur;
      c.classList.toggle("on", on);
      c.setAttribute("aria-selected", String(on));
      if (on) chips.scrollTo({ left: c.offsetLeft - chips.clientWidth / 2 + c.offsetWidth / 2, behavior: "smooth" });
    });
  }
  let raf = 0;
  track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
  $("#prev").addEventListener("click", () => go(cur - 1));
  $("#next").addEventListener("click", () => go(cur + 1));
  chips.addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) go(+c.dataset.i); });
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
  });
  /* drag to scroll with a mouse */
  let drag = null;
  track.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; drag = { x: e.clientX, left: track.scrollLeft, moved: false }; });
  addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 4) { drag.moved = true; track.classList.add("dragging"); }
    track.scrollLeft = drag.left - dx;
  });
  addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved; drag = null; track.classList.remove("dragging");
    if (moved) { track.dataset.justDragged = "1"; setTimeout(() => delete track.dataset.justDragged, 60); go(cur); }
  });

  /* ---------- lightbox ---------- */
  const lb = $("#lb");
  function showLb(i) {
    cur = Math.max(0, Math.min(pages.length - 1, i));
    $("#lbPage").innerHTML = pages[cur].html;
    $("#lbCount").textContent = `${pad(cur + 1)} / ${pad(pages.length)} · ${pages[cur].title}`;
    W.fillIcons(lb);
  }
  function openLb(i) { showLb(i); lb.hidden = false; document.body.classList.add("lb-open"); $("#lbClose").focus(); }
  function closeLb() { lb.hidden = true; document.body.classList.remove("lb-open"); go(cur, false); }
  track.addEventListener("click", (e) => {
    if (track.dataset.justDragged) return;
    const g = e.target.closest("[data-goto]");
    if (g) { e.preventDefault(); go(+g.dataset.goto - 1); return; }
    const o = e.target.closest(".open");
    if (o) openLb(+o.closest(".slide").dataset.i);
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => showLb(cur - 1));
  $("#lbNext").addEventListener("click", () => showLb(cur + 1));
  lb.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto]");
    if (g) { e.preventDefault(); showLb(+g.dataset.goto - 1); return; }
    if (e.target === lb) closeLb();
  });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") showLb(cur + 1);
    if (e.key === "ArrowLeft") showLb(cur - 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx == null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) showLb(cur + (dx < 0 ? 1 : -1));
  });

  /* quick links in the hero + hero cover opens the catalog */
  document.addEventListener("click", (e) => {
    const q = e.target.closest("[data-go]");
    if (q) { document.getElementById("catalog").scrollIntoView({ behavior: "smooth" }); setTimeout(() => go(+q.dataset.go), 350); }
  });
  $("#heroBook").addEventListener("click", () => openLb(0));
  /* subtle 3D tilt of the brochure */
  const book = document.querySelector(".book");
  $("#top").addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    book.style.setProperty("--rx", (y * -6).toFixed(2) + "deg");
    book.style.setProperty("--ry", (-18 + x * 10).toFixed(2) + "deg");
  });

  W.start(render);
  W.initHeader($("#hdr"));
  W.bindForm($("#form"));
  addEventListener("resize", () => requestAnimationFrame(sync));
})();
