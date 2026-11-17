/* =====================================================================
   Infinity Cleaning Service — gold line illustrations (original artwork)
   240×240 scenes for the services + 48×48 mini icons for the price list.
   Classes: l = line, t = thin line, f = soft gold fill, s = solid gold,
            o = occluder (background colour, hides lines behind objects), d = dark line
   ===================================================================== */
(function () {
  // 4-point sparkle, like the stars in the logo
  const S = (x, y, r, k = 0.1, ry = 1.12) => {
    const h = r * ry, a = k * r, b = k * h;
    return `M${x} ${y - h}Q${x + a} ${y - b} ${x + r} ${y}Q${x + a} ${y + b} ${x} ${y + h}Q${x - a} ${y + b} ${x - r} ${y}Q${x - a} ${y - b} ${x} ${y - h}Z`;
  };
  const sp = (...list) => list.map(([x, y, r]) => `<path class="s" d="${S(x, y, r)}"/>`).join("");
  const inf = (cx, cy, w) => { // tiny infinity sign
    const a = w / 4, h = w / 5;
    return `M${cx} ${cy}C${cx + a * 0.6} ${cy - h} ${cx + a * 2} ${cy - h} ${cx + a * 2} ${cy}C${cx + a * 2} ${cy + h} ${cx + a * 0.6} ${cy + h} ${cx} ${cy}C${cx - a * 0.6} ${cy - h} ${cx - a * 2} ${cy - h} ${cx - a * 2} ${cy}C${cx - a * 2} ${cy + h} ${cx - a * 0.6} ${cy + h} ${cx} ${cy}Z`;
  };

  const scenes = {
    /* ---------------- general cleaning: spray bottle + cloth ---------------- */
    spray: `
      <path class="f" d="M86 204Q74 204 74 192V134Q74 117 91 112L95 104H115L119 112Q136 117 136 134V192Q136 204 124 204Z"/>
      <path class="l" d="M86 204Q74 204 74 192V134Q74 117 91 112L95 104H115L119 112Q136 117 136 134V192Q136 204 124 204Z"/>
      <rect class="t" x="85" y="140" width="40" height="42" rx="7"/>
      <path class="t" d="${inf(105, 161, 26)}"/>
      <rect class="l" x="93" y="94" width="24" height="10" rx="2"/>
      <path class="f" d="M64 70H112Q124 70 124 82V94H90L84 82H64Z"/>
      <path class="l" d="M64 70H112Q124 70 124 82V94H90L84 82H64Z"/>
      <path class="l" d="M56 72H64V80H56Z"/>
      <path class="l" d="M86 84Q80 98 86 116"/>
      <path class="t" d="M48 66L34 58M47 76H30M48 86L34 94" opacity=".8"/>
      <circle class="s" cx="28" cy="52" r="2.2"/><circle class="s" cx="24" cy="76" r="2.6"/><circle class="s" cx="28" cy="100" r="2.2"/>
      <path class="o" d="M146 204Q140 204 140 198V182Q140 176 146 176H196Q204 176 204 184V198Q204 204 198 204Z"/>
      <path class="f" d="M146 204Q140 204 140 198V182Q140 176 146 176H196Q204 176 204 184V198Q204 204 198 204Z"/>
      <path class="l" d="M146 204Q140 204 140 198V182Q140 176 146 176H196Q204 176 204 184V198Q204 204 198 204Z"/>
      <path class="t" d="M146 190H198M160 176Q156 183 160 190"/>
      ${sp([178, 92, 15], [200, 136, 7], [156, 58, 8])}`,

    /* ---------------- maintenance: bucket with foam + mop ---------------- */
    bucket: `
      <path class="l" d="M152 34L124 134" stroke-width="5"/>
      <path class="l" d="M152.6 32L156 20" stroke-width="9"/>
      <path class="o" d="M66 142L77 196Q78 204 86 204H138Q146 204 147 196L158 142Z"/>
      <path class="f" d="M66 142L77 196Q78 204 86 204H138Q146 204 147 196L158 142Z"/>
      <path class="l" d="M66 142L77 196Q78 204 86 204H138Q146 204 147 196L158 142"/>
      <path class="t" d="M71 166Q112 174 153 166"/>
      <path class="l" d="M68 146Q112 96 156 146" stroke-width="2.4"/>
      <circle class="o" cx="84" cy="132" r="11"/><circle class="o" cx="104" cy="124" r="13"/><circle class="o" cx="126" cy="128" r="11"/><circle class="o" cx="143" cy="135" r="7"/>
      <circle class="t" cx="84" cy="132" r="11"/><circle class="t" cx="104" cy="124" r="13"/><circle class="t" cx="126" cy="128" r="11"/><circle class="t" cx="143" cy="135" r="7"/>
      <circle class="t" cx="96" cy="104" r="5"/><circle class="t" cx="118" cy="104" r="3.5"/>
      <ellipse class="l" cx="112" cy="142" rx="46" ry="7"/>
      ${sp([186, 74, 15], [60, 84, 9], [196, 124, 7])}`,

    /* ---------------- subscriptions: calendar with weekly checks ---------------- */
    calendar: `
      <rect class="f" x="50" y="62" width="140" height="140" rx="14"/>
      <rect class="l" x="50" y="62" width="140" height="140" rx="14"/>
      <path class="f" d="M64 62H176Q190 62 190 76V94H50V76Q50 62 64 62Z" style="fill-opacity:.32"/>
      <path class="l" d="M50 94H190"/>
      <path class="l" d="M88 48V76M152 48V76" stroke-width="6"/>
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => {
        const x = 64 + c * 23, y = 106 + r * 23;
        return c === 1
          ? `<rect class="s" x="${x}" y="${y}" width="18" height="16" rx="4"/><path class="d" d="M${x + 4.5} ${y + 8.5}l3.5 3.5l6 -7"/>`
          : `<rect class="t" x="${x}" y="${y}" width="18" height="16" rx="4" opacity=".7"/>`;
      }).join("")).join("")}
      ${sp([204, 46, 15], [36, 84, 8], [212, 104, 6])}`,

    /* ---------------- living room: sofa, lamp, picture, plant ---------------- */
    sofa: `
      <rect class="l" x="94" y="40" width="56" height="40" rx="3"/>
      <path class="t" d="M101 72L114 58L123 66L131 56L143 72"/><circle class="s" cx="135" cy="50" r="3"/>
      <path class="l" d="M42 204V96"/><path class="l" d="M32 204H52"/>
      <path class="f" d="M28 96H56L50 66H34Z" style="fill-opacity:.3"/><path class="l" d="M28 96H56L50 66H34Z"/>
      <path class="f" d="M70 150V112Q70 100 82 100H158Q170 100 170 112V150Z"/>
      <path class="l" d="M70 150V112Q70 100 82 100H158Q170 100 170 112V150"/>
      <path class="o" d="M60 184V136Q60 124 71 124Q82 124 82 136V184Z"/><path class="f" d="M60 184V136Q60 124 71 124Q82 124 82 136V184Z"/><path class="l" d="M60 184V136Q60 124 71 124Q82 124 82 136V184Z"/>
      <path class="o" d="M180 184V136Q180 124 169 124Q158 124 158 136V184Z"/><path class="f" d="M180 184V136Q180 124 169 124Q158 124 158 136V184Z"/><path class="l" d="M180 184V136Q180 124 169 124Q158 124 158 136V184Z"/>
      <rect class="l" x="82" y="148" width="76" height="20" rx="5"/><path class="t" d="M120 148V168"/>
      <path class="l" d="M60 184H180M82 168V184M158 168V184"/>
      <path class="l" d="M68 184L66 196M172 184L174 196"/>
      ${[[101, 134, -12], [139, 134, 12]].map(([x, y, a]) => {
        const p = "M-12 -11Q0 -14 12 -11Q15 0 12 11Q0 14 -12 11Q-15 0 -12 -11Z";
        return `<g transform="translate(${x} ${y}) rotate(${a})"><path class="o" d="${p}"/><path class="f" d="${p}" style="fill-opacity:.35"/><path class="l" d="${p}"/><circle class="s" cx="0" cy="0" r="1.8"/></g>`;
      }).join("")}
      <path class="f" d="M190 204L187 180H215L212 204Z"/><path class="l" d="M190 204L187 180H215L212 204Z"/>
      <path class="t" d="M201 180Q198 158 186 146M201 180Q202 156 206 138M201 180Q208 162 218 152"/>
      <path class="f" d="M186 146Q178 150 182 160Q192 158 186 146ZM206 138Q198 146 204 156Q212 148 206 138ZM218 152Q208 152 210 162Q220 162 218 152Z" style="fill-opacity:.45"/>
      ${sp([196, 64, 12], [72, 56, 7])}`,

    /* ---------------- kitchen: hood, pot with steam, cabinets ---------------- */
    kitchen: `
      <path class="l" d="M108 26V58M132 26V58"/>
      <path class="f" d="M84 78H156L142 58H98Z"/><path class="l" d="M84 78H156L142 58H98Z"/>
      <path class="t" d="M110 82H130" opacity=".7"/>
      <path class="t" d="M40 112H200M40 132H200M72 112V132M120 112V132M168 112V132M96 92V112M144 92V112" opacity=".28"/>
      <path class="t" d="M104 108q-6 -8 0 -16t0 -16M120 104q-6 -8 0 -16t0 -16M136 108q-6 -8 0 -16t0 -16" opacity=".85"/>
      <path class="o" d="M92 122H148V140Q148 150 138 150H102Q92 150 92 140Z"/>
      <path class="f" d="M92 122H148V140Q148 150 138 150H102Q92 150 92 140Z"/><path class="l" d="M92 122H148V140Q148 150 138 150H102Q92 150 92 140Z"/>
      <path class="l" d="M88 122H152M84 128H92M148 128H156"/><path class="l" d="M104 122Q120 108 136 122"/><circle class="s" cx="120" cy="113" r="3"/>
      <rect class="f" x="34" y="150" width="172" height="8" rx="2" style="fill-opacity:.35"/><rect class="l" x="34" y="150" width="172" height="8" rx="2"/>
      <rect class="l" x="40" y="158" width="160" height="46"/>
      <path class="l" d="M92 158V204M148 158V204"/>
      <rect class="t" x="99" y="168" width="42" height="26" rx="4"/><path class="t" d="M104 164H136"/>
      <path class="l" d="M74 168V180M166 168V180"/>
      ${sp([188, 92, 12], [52, 82, 8], [206, 60, 6])}`,

    /* ---------------- bathroom: clawfoot tub, faucet, bubbles, towel ---------------- */
    bath: `
      <path class="l" d="M188 122V90Q188 78 176 78H166V88"/><path class="s" d="M166 100q-3 5 0 7q3 -2 0 -7Z"/>
      <circle class="t" cx="68" cy="106" r="12"/><circle class="t" cx="91" cy="99" r="9"/><circle class="t" cx="112" cy="109" r="10"/><circle class="t" cx="131" cy="100" r="7"/><circle class="t" cx="80" cy="84" r="5"/><circle class="t" cx="148" cy="112" r="6"/><circle class="t" cx="104" cy="86" r="3.5"/>
      <path class="o" d="M42 130Q44 178 86 184H154Q196 178 198 130Z"/>
      <path class="f" d="M42 130Q44 178 86 184H154Q196 178 198 130Z"/><path class="l" d="M42 130Q44 178 86 184H154Q196 178 198 130"/>
      <rect class="o" x="34" y="120" width="172" height="10" rx="5"/><rect class="f" x="34" y="120" width="172" height="10" rx="5" style="fill-opacity:.35"/><rect class="l" x="34" y="120" width="172" height="10" rx="5"/>
      <path class="l" d="M70 182Q66 194 58 198M170 182Q174 194 182 198"/>
      <path class="o" d="M44 120V152Q44 158 50 158H62Q68 158 68 152V120Z"/><path class="f" d="M44 120V152Q44 158 50 158H62Q68 158 68 152V120Z" style="fill-opacity:.4"/><path class="l" d="M44 120V152Q44 158 50 158H62Q68 158 68 152V120Z"/>
      <path class="t" d="M44 146H68"/>
      ${sp([200, 56, 14], [40, 70, 8], [150, 64, 6])}`,

    /* ---------------- windows: window + squeegee ---------------- */
    window: `
      <rect class="f" x="46" y="34" width="128" height="156" rx="4" style="fill-opacity:.08"/>
      <rect class="l" x="46" y="34" width="128" height="156" rx="4"/>
      <rect class="t" x="55" y="43" width="110" height="138" rx="2"/>
      <path class="l" d="M110 43V181M55 106H165"/>
      <rect class="f" x="38" y="190" width="144" height="10" rx="3" style="fill-opacity:.35"/><rect class="l" x="38" y="190" width="144" height="10" rx="3"/>
      <path class="t" d="M64 84L88 60M70 96L100 66M118 150L138 130" opacity=".9"/>
      <g transform="translate(160 128) rotate(-28)">
        <rect class="o" x="-6" y="2" width="12" height="54" rx="6"/><rect class="f" x="-6" y="2" width="12" height="54" rx="6" style="fill-opacity:.35"/><rect class="l" x="-6" y="2" width="12" height="54" rx="6"/>
        <rect class="o" x="-38" y="-8" width="76" height="12" rx="4"/><rect class="f" x="-38" y="-8" width="76" height="12" rx="4" style="fill-opacity:.35"/><rect class="l" x="-38" y="-8" width="76" height="12" rx="4"/>
        <path class="l" d="M-40 -12H40" stroke-width="4"/>
      </g>
      <path class="s" d="M128 160q-4 6 0 9q4 -3 0 -9Z"/><path class="s" d="M118 172q-3 5 0 7q3 -2 0 -7Z"/>
      ${sp([200, 50, 13], [128, 70, 8], [30, 120, 6])}`,

    /* ---------------- balconies & hallways: railing, plant, bistro set, skyline ---------------- */
    balcony: `
      <circle class="f" cx="176" cy="50" r="12" style="fill-opacity:.3"/><circle class="t" cx="176" cy="50" r="12"/>
      <path class="t" d="M30 128V98H50V82H68V108H84V70H102V94H120V58H138V90H156V78H174V102H192V88H210V128" opacity=".5"/>
      <rect class="f" x="24" y="128" width="192" height="8" rx="3" style="fill-opacity:.35"/><rect class="l" x="24" y="128" width="192" height="8" rx="3"/>
      <path class="t" d="${Array.from({ length: 12 }, (_, i) => `M${34 + i * 16} 136V196`).join("")}"/>
      <rect class="l" x="24" y="196" width="192" height="6" rx="2"/>
      <path class="o" d="M40 204L36 178H70L66 204Z"/><path class="f" d="M40 204L36 178H70L66 204Z"/><path class="l" d="M40 204L36 178H70L66 204Z"/>
      <path class="t" d="M53 178Q46 154 32 142M53 178Q52 150 54 128M53 178Q62 156 76 146"/>
      <path class="f" d="M32 142Q24 150 30 160Q40 154 32 142ZM54 128Q46 138 52 148Q60 140 54 128ZM76 146Q66 146 66 158Q78 158 76 146Z" style="fill-opacity:.5"/>
      <path class="o" d="M126 166H170V172H126Z"/>
      <ellipse class="o" cx="148" cy="166" rx="24" ry="5"/><ellipse class="f" cx="148" cy="166" rx="24" ry="5" style="fill-opacity:.35"/><ellipse class="l" cx="148" cy="166" rx="24" ry="5"/>
      <path class="l" d="M148 171V202M138 204H158"/>
      <path class="o" d="M180 178Q178 150 194 148Q210 150 208 178Z"/><path class="l" d="M180 178Q178 150 194 148Q210 150 208 178"/>
      <ellipse class="o" cx="194" cy="178" rx="16" ry="4"/><ellipse class="l" cx="194" cy="178" rx="16" ry="4"/>
      <path class="l" d="M182 181L178 204M206 181L210 204"/>
      ${sp([62, 48, 11], [108, 40, 6])}`,

    /* ---------------- extra services: canister vacuum / steam cleaner ---------------- */
    vacuum: `
      <path class="l" d="M118 160C150 160 146 96 170 92" stroke-width="5"/>
      <path class="l" d="M168 86L184 96" stroke-width="7"/>
      <path class="l" d="M178 96L198 186" stroke-width="5"/>
      <path class="o" d="M176 186H220Q224 186 224 190V198Q224 202 220 202H176Q172 202 172 198V190Q172 186 176 186Z"/>
      <path class="f" d="M176 186H220Q224 186 224 190V198Q224 202 220 202H176Q172 202 172 198V190Q172 186 176 186Z" style="fill-opacity:.35"/>
      <path class="l" d="M176 186H220Q224 186 224 190V198Q224 202 220 202H176Q172 202 172 198V190Q172 186 176 186Z"/>
      <rect class="o" x="30" y="132" width="88" height="62" rx="28"/><rect class="f" x="30" y="132" width="88" height="62" rx="28"/><rect class="l" x="30" y="132" width="88" height="62" rx="28"/>
      <path class="l" d="M56 132Q74 112 92 132"/>
      <path class="t" d="M44 160H86" opacity=".8"/>
      <circle class="o" cx="52" cy="192" r="11"/><circle class="l" cx="52" cy="192" r="11"/><circle class="s" cx="52" cy="192" r="3"/>
      <circle class="l" cx="118" cy="160" r="6"/>
      <path class="t" d="M156 178q-6 -6 0 -12q6 -6 0 -12M142 182q-5 -5 0 -10q5 -5 0 -10" opacity=".8"/>
      ${sp([196, 56, 14], [60, 88, 8], [212, 150, 7])}`,

    /* ---------------- upholstery: tufted wing armchair ---------------- */
    armchair: `
      <path class="f" d="M72 134L68 74Q68 50 92 48H148Q172 50 172 74L168 134Z"/>
      <path class="l" d="M72 134L68 74Q68 50 92 48H148Q172 50 172 74L168 134"/>
      <path class="t" d="M96 68L108 88L120 68L132 88L144 68M96 108L108 88L120 108L132 88L144 108" opacity=".45"/>
      ${[[96, 68], [120, 68], [144, 68], [108, 88], [132, 88], [96, 108], [120, 108], [144, 108]].map(([x, y]) => `<circle class="s" cx="${x}" cy="${y}" r="2.6"/>`).join("")}
      <path class="o" d="M48 176V122Q48 106 63 106Q78 106 80 122V176Z"/><path class="f" d="M48 176V122Q48 106 63 106Q78 106 80 122V176Z"/><path class="l" d="M48 176V122Q48 106 63 106Q78 106 80 122V176Z"/>
      <path class="o" d="M192 176V122Q192 106 177 106Q162 106 160 122V176Z"/><path class="f" d="M192 176V122Q192 106 177 106Q162 106 160 122V176Z"/><path class="l" d="M192 176V122Q192 106 177 106Q162 106 160 122V176Z"/>
      <rect class="o" x="78" y="130" width="84" height="22" rx="8"/><rect class="f" x="78" y="130" width="84" height="22" rx="8" style="fill-opacity:.35"/><rect class="l" x="78" y="130" width="84" height="22" rx="8"/>
      <path class="l" d="M80 152V176M160 152V176M48 176H192"/>
      <path class="l" d="M60 176L56 198M180 176L184 198"/>
      ${sp([200, 54, 14], [42, 78, 8], [214, 112, 6])}`
  };

  /* -------- 48×48 mini icons for the upholstery price list -------- */
  const mini = {
    chair:    `<path d="M15 5h18v20H15z"/><path d="M11 25h26v6H11z"/><path d="M14 31l-2 13M34 31l2 13"/>`,
    armchair: `<path d="M12 22V12q0-5 5-5h14q5 0 5 5v10"/><path d="M8 34V24q0-4 4-4t4 4v4h16v-4q0-4 4-4t4 4v10z"/><path d="M11 34l-1 8M37 34l1 8"/>`,
    sofa2:    `<path d="M9 21v-6q0-4 4-4h22q4 0 4 4v6"/><path d="M4 34V24q0-4 4-4t4 4v4h24v-4q0-4 4-4t4 4v10z"/><path d="M24 20v8"/><path d="M7 34l-1 7M41 34l1 7"/>`,
    sofa3:    `<path d="M7 21v-6q0-4 4-4h26q4 0 4 4v6"/><path d="M2 34V24q0-4 4-4t4 4v4h28v-4q0-4 4-4t4 4v10z"/><path d="M19 20v8M29 20v8"/><path d="M5 34l-1 7M43 34l1 7"/>`,
    corner:   `<path d="M4 12h40v28H30V26H4z"/><path d="M8 16h32M34 16v20M8 22h22"/>`,
    mattress1:`<path d="M10 20l8-6h22l-8 6z"/><path d="M10 20v10h22V20M32 30l8-6V14"/><path d="M15 25h.1M21 25h.1M27 25h.1" stroke-width="3"/>`,
    mattress2:`<path d="M4 21l9-7h31l-9 7z"/><path d="M4 21v10h31V21M35 31l9-7V14"/><path d="M10 26h.1M16 26h.1M22 26h.1M28 26h.1" stroke-width="3"/>`,
    kcorner:  `<path d="M6 8v32h32"/><path d="M12 8v26h26"/><rect x="20" y="10" width="18" height="16" rx="2"/>`,
    ottoman:  `<ellipse cx="24" cy="18" rx="16" ry="5"/><path d="M8 18v14q0 5 16 5t16-5V18"/><path d="M16 26h.1M24 27h.1M32 26h.1" stroke-width="3"/>`
  };

  const GOLD_DEFS = `
    <linearGradient id="icsGold" gradientUnits="userSpaceOnUse" x1="40" y1="16" x2="200" y2="226">
      <stop offset="0" stop-color="#FCE7A6"/><stop offset=".35" stop-color="#F0C75C"/>
      <stop offset=".7" stop-color="#D9A43C"/><stop offset="1" stop-color="#B9862A"/>
    </linearGradient>
    <linearGradient id="icsGoldMini" gradientUnits="userSpaceOnUse" x1="0" y1="2" x2="0" y2="46">
      <stop offset="0" stop-color="#F7DB8A"/><stop offset="1" stop-color="#C99233"/>
    </linearGradient>`;

  const STYLE = `
    .ics-ill{overflow:visible}
    .ics-ill .l{fill:none;stroke:url(#icsGold);stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
    .ics-ill .t{fill:none;stroke:url(#icsGold);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .ics-ill .f{fill:url(#icsGold);fill-opacity:.13;stroke:none}
    .ics-ill .s{fill:url(#icsGold);stroke:none}
    .ics-ill .o{fill:var(--ill-bg,#111113);stroke:none}
    .ics-ill .d{fill:none;stroke:var(--ill-bg,#111113);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
    .ics-mini{fill:none;stroke:url(#icsGoldMini);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}`;

  function ensureDefs(doc) {
    doc = doc || document;
    if (doc.getElementById("ics-defs")) return;
    const holder = doc.createElement("div");
    holder.innerHTML = `<svg id="ics-defs" width="0" height="0" style="position:absolute;width:0;height:0" aria-hidden="true"><defs>${GOLD_DEFS}</defs></svg><style>${STYLE}</style>`;
    while (holder.firstChild) doc.body.prepend(holder.lastChild);
  }

  window.ICS_ILL = {
    names: Object.keys(scenes),
    scene(name, cls = "") {
      return `<svg class="ics-ill ${cls}" viewBox="0 0 240 240" aria-hidden="true">${scenes[name] || ""}</svg>`;
    },
    mini(name, cls = "") {
      return `<svg class="ics-mini ${cls}" viewBox="0 0 48 48" aria-hidden="true">${mini[name] || ""}</svg>`;
    },
    sparkle: S,
    ensureDefs
  };
})();
