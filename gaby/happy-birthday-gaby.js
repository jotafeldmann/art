<svg xmlns="http://www.w3.org/2000/svg" width="900" height="360" viewBox="0 0 900 360">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-opacity="0.35"/>
    </filter>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#0a1b12"/>
    </linearGradient>
  </defs>

  <rect width="900" height="360" fill="url(#bg)"/>

  <g filter="url(#shadow)">
    <rect x="70" y="50" width="760" height="260" rx="16" fill="#141414" stroke="#2b2b2b" stroke-width="1.2"/>
    <rect x="70" y="50" width="760" height="44" rx="16" fill="#222" />
    <rect x="70" y="78" width="760" height="16" fill="#222" />

    <circle cx="98" cy="72" r="6.5" fill="#ff5f57"/>
    <circle cx="120" cy="72" r="6.5" fill="#febc2e"/>
    <circle cx="142" cy="72" r="6.5" fill="#28c840"/>

    <text x="450" y="77" text-anchor="middle"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
          font-size="13" fill="#cfcfcf" opacity="0.85">gaby.js</text>

    <rect x="70" y="94" width="72" height="216" fill="#111" opacity="0.9"/>
    <line x1="142" y1="94" x2="142" y2="310" stroke="#2a2a2a" stroke-width="1"/>

    <!-- Line numbers (1..19) -->
    <g font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
       font-size="12" fill="#6f6f6f" opacity="0.9">
      <text x="125" y="118" text-anchor="end">1</text>
      <text x="125" y="129" text-anchor="end">2</text>
      <text x="125" y="140" text-anchor="end">3</text>
      <text x="125" y="151" text-anchor="end">4</text>
      <text x="125" y="162" text-anchor="end">5</text>
      <text x="125" y="173" text-anchor="end">6</text>
      <text x="125" y="184" text-anchor="end">7</text>
      <text x="125" y="195" text-anchor="end">8</text>
      <text x="125" y="206" text-anchor="end">9</text>
      <text x="125" y="217" text-anchor="end">10</text>
      <text x="125" y="228" text-anchor="end">11</text>
      <text x="125" y="239" text-anchor="end">12</text>
      <text x="125" y="250" text-anchor="end">13</text>
      <text x="125" y="261" text-anchor="end">14</text>
      <text x="125" y="272" text-anchor="end">15</text>
      <text x="125" y="283" text-anchor="end">16</text>
      <text x="125" y="294" text-anchor="end">17</text>
      <text x="125" y="305" text-anchor="end">18</text>
      <text x="125" y="316" text-anchor="end">19</text>
    </g>

    <!-- Code area -->
    <g id="codeArea"
       font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
       font-size="12" fill="#c6d0f5">
      <text id="l0"  x="160" y="118"></text>
      <text id="l1"  x="160" y="129"></text>
      <text id="l2"  x="160" y="140"></text>
      <text id="l3"  x="160" y="151"></text>
      <text id="l4"  x="160" y="162"></text>
      <text id="l5"  x="160" y="173"></text>
      <text id="l6"  x="160" y="184"></text>
      <text id="l7"  x="160" y="195"></text>
      <text id="l8"  x="160" y="206"></text>
      <text id="l9"  x="160" y="217"></text>
      <text id="l10" x="160" y="228"></text>
      <text id="l11" x="160" y="239"></text>
      <text id="l12" x="160" y="250"></text>
      <text id="l13" x="160" y="261"></text>
      <text id="l14" x="160" y="272"></text>
      <text id="l15" x="160" y="283"></text>
      <text id="l16" x="160" y="294"></text>
      <text id="l17" x="160" y="305"></text>

      <!-- Runtime output (line 19) -->
      <text id="runtimeLine" x="160" y="316" fill="#6ee7b7" opacity="0.95"></text>

      <!-- Invisible measurement line for caret positioning -->
      <text id="measure" x="160" y="118" opacity="0"></text>

      <!-- Caret -->
      <rect id="caret" x="160" y="108" width="7" height="12" rx="2" fill="#c6d0f5" opacity="0.85"/>
    </g>
  </g>

  <script><![CDATA[
    (function () {
      const x0 = 160;

      const lineEls = [
        document.getElementById("l0"),  document.getElementById("l1"),
        document.getElementById("l2"),  document.getElementById("l3"),
        document.getElementById("l4"),  document.getElementById("l5"),
        document.getElementById("l6"),  document.getElementById("l7"),
        document.getElementById("l8"),  document.getElementById("l9"),
        document.getElementById("l10"), document.getElementById("l11"),
        document.getElementById("l12"), document.getElementById("l13"),
        document.getElementById("l14"), document.getElementById("l15"),
        document.getElementById("l16"), document.getElementById("l17"),
      ];

      const caret = document.getElementById("caret");
      const measure = document.getElementById("measure");

      const src = [
        '(() => {',
        '  const t = "Happy Birthday Gaby";',
        '  const o = document.getElementById("runtimeLine");',
        '  const m = document.getElementById("measure");',
        '  const c = document.getElementById("caret");',
        '  const P = \'console.log("\', S = \'");\';',
        '  const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>?/\\\\|";',
        '  let r = 0, f = 8, b = 0;',
        '  const rc = () => L[(Math.random() * L.length) | 0];',
        '  const ri = (a, d) => a + ((Math.random() * (d - a + 1)) | 0);',
        '  const tick = () => {',
        '    b = (b + 1) % 20; c.style.opacity = b < 10 ? 0.85 : 0.15;',
        '    if (r < t.length && --f <= 0) { r++; f = ri(5, 12); }',
        '    let s = ""; for (let i = 0; i < t.length; i++) s += i < r ? t[i] : rc();',
        '    const line = P + s + S; o.textContent = line; m.setAttribute("y", o.getAttribute("y")); m.textContent = line;',
        '    c.setAttribute("y", (+o.getAttribute("y")) - 10); c.setAttribute("x", 160 + m.getComputedTextLength() + 2);',
        '    if (r >= t.length) o.textContent = P + t + S;',
        '    requestAnimationFrame(tick);',
        '  };',
        '  tick();',
        '})();'
      ];


      let li = 0;              
      let ci = 0;
      let blink = 0;
      let nextAt = 0;
      let running = true;

      function setCaret(text, y) {
        measure.setAttribute("y", String(y));
        measure.textContent = text;
        caret.setAttribute("x", String(x0 + measure.getComputedTextLength() + 2));
        caret.setAttribute("y", String(y - 10));
      }

      function step(ts) {
        if (!running) return;

        blink = (blink + 1) % 20;
        caret.style.opacity = blink < 10 ? "0.85" : "0.15";

        if (ts >= nextAt) {
          for (let i = 0; i < lineEls.length; i++) {
            if (i < li) lineEls[i].textContent = src[i] || "";
          }

          const line = src[li] || "";
          const partial = line.slice(0, ci);
          if (lineEls[li]) lineEls[li].textContent = partial;

          const y = lineEls[li] ? +lineEls[li].getAttribute("y") : 118;
          setCaret(partial, y);

          ci++;
          const baseDelay = 14 + ((Math.random() * 10) | 0); 
          nextAt = ts + baseDelay;

          if (ci > line.length) {
            if (lineEls[li]) lineEls[li].textContent = line;
            li++;
            ci = 0;
            nextAt = ts + 160 + ((Math.random() * 140) | 0);
          }

          if (li >= src.length) {
            for (let i = 0; i < src.length && i < lineEls.length; i++) lineEls[i].textContent = src[i];
            setCaret(src[src.length - 1], +lineEls[Math.min(src.length - 1, lineEls.length - 1)].getAttribute("y"));

            const program = src.join("\n");
            running = false;
            eval(program);
            return;
          }
        }

        requestAnimationFrame(step);
      }

      for (const el of lineEls) el.textContent = "";
      document.getElementById("runtimeLine").textContent = "";
      requestAnimationFrame(step);
    })();
  ]]></script>
</svg>
