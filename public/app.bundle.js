(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // public/lib/dom.js
  var $ = (s) => document.querySelector(s);
  var esc = (s) => String(s != null ? s : "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
  function toast(s) {
    const x = $("#toast");
    x.textContent = s;
    x.classList.add("show");
    setTimeout(() => x.classList.remove("show"), 2400);
  }
  function pageHead(title, desc) {
    return `<div class="section-title" style="margin-top:0"><div><h2>${title}</h2><p>${desc}</p></div></div>`;
  }
  function stat(label, value, detail, icon) {
    return `<article class="card metric"><span class="metric-icon">${icon}</span><div class="label">${label}</div><strong>${value}</strong><small>${detail}</small></article>`;
  }
  function download(name, data, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
  }

  // public/lib/api.js
  async function get(url) {
    const r = await fetch(url);
    const j = await r.json();
    if (!r.ok) throw new Error(j.note || j.error || `HTTP ${r.status}`);
    return j;
  }
  async function post(url, data = {}) {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const j = await r.json();
    if (!r.ok && r.status !== 424) throw new Error(j.note || j.error || `HTTP ${r.status}`);
    return j;
  }

  // public/lib/evidence-coverage.js
  var profiles = {
    "PSI-20": { flame: "partial", conditions: "direct" },
    "PSI-21": { flame: "partial", conditions: "direct" },
    "PSI-22": { flame: "partial", conditions: "direct" },
    "PSI-23": { flame: "partial", conditions: "direct" },
    "PSI-25": { material: "direct", suppression: "partial", conditions: "direct" },
    "PSI-26": { material: "conditions", suppression: "conditions", conditions: "partial" },
    "PSI-39": { flame: "conditions", conditions: "direct" },
    "PSI-47": { smoke: "partial", conditions: "partial" },
    "PSI-68": { flame: "conditions", suppression: "conditions", conditions: "direct" },
    "PSI-69": { flame: "direct", suppression: "direct", conditions: "direct" },
    "PSI-98": { material: "partial", conditions: "partial" },
    "PSI-99": { material: "partial", conditions: "partial" },
    "PSI-100": { material: "conditions", conditions: "direct" },
    "PSI-101": { smoke: "direct", conditions: "direct" },
    "PSI-102": { material: "direct", smoke: "partial", conditions: "partial" },
    "PSI-107": { flame: "partial", conditions: "direct" }
  };
  var labels = {
    en: {
      title: "Evidence coverage by investigation",
      sub: "A quick map of what the bundled source tables contain. Statuses reflect the source review, not safety performance.",
      study: "NASA PSI investigation",
      flame: "Flame / ignition",
      material: "Materials / fires",
      smoke: "Smoke / aerosol",
      suppression: "Extinction / suppression",
      conditions: "Test conditions",
      direct: "Measured values or source outcomes",
      partial: "Limited or indirect rows",
      conditionsOnly: "Conditions / metadata only",
      none: "No bundled evidence in this domain",
      directShort: "Measured",
      partialShort: "Limited",
      conditionsShort: "Conditions",
      noneShort: "\u2014",
      source: "NASA PSI record \u2197",
      note: "Rows stay within their own investigation; a cell is not a cross-study score."
    },
    ar: {
      title: "\u062E\u0631\u064A\u0637\u0629 \u062A\u063A\u0637\u064A\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u062D\u0642\u064A\u0642",
      sub: "\u0645\u0644\u062E\u0635 \u0633\u0631\u064A\u0639 \u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629. \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0645\u0628\u0646\u064A\u0629 \u0639\u0644\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u0623\u062F\u0627\u0621 \u0627\u0644\u0633\u0644\u0627\u0645\u0629.",
      study: "\u062A\u062D\u0642\u064A\u0642 NASA PSI",
      flame: "\u0627\u0644\u0644\u0647\u0628 / \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644",
      material: "\u0627\u0644\u0645\u0648\u0627\u062F / \u0627\u0644\u062D\u0631\u0627\u0626\u0642",
      smoke: "\u0627\u0644\u062F\u062E\u0627\u0646 / \u0627\u0644\u0647\u0628\u0627\u0621",
      suppression: "\u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 / \u0627\u0644\u0625\u062E\u0645\u0627\u062F",
      conditions: "\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631",
      direct: "\u0642\u064A\u0645 \u0645\u0642\u0627\u0633\u0629 \u0623\u0648 \u0646\u062A\u0627\u0626\u062C \u0641\u064A \u0627\u0644\u0645\u0635\u062F\u0631",
      partial: "\u0635\u0641\u0648\u0641 \u0645\u062D\u062F\u0648\u062F\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0628\u0627\u0634\u0631\u0629",
      conditionsOnly: "\u0638\u0631\u0648\u0641 / \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637",
      none: "\u0644\u0627 \u062F\u0644\u064A\u0644 \u0645\u0631\u0641\u0642 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0627\u0644",
      directShort: "\u0645\u0642\u0627\u0633",
      partialShort: "\u0645\u062D\u062F\u0648\u062F",
      conditionsShort: "\u0638\u0631\u0648\u0641",
      noneShort: "\u2014",
      source: "\u0633\u062C\u0644 NASA PSI \u2197",
      note: "\u062A\u0628\u0642\u0649 \u0627\u0644\u0635\u0641\u0648\u0641 \u0636\u0645\u0646 \u062A\u062D\u0642\u064A\u0642\u0647\u0627\u061B \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0644\u064A\u0633\u062A \u062F\u0631\u062C\u0629 \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A."
    }
  };
  function renderEvidenceCoverage(investigations, lang2 = "en") {
    const l = labels[lang2 === "ar" ? "ar" : "en"];
    const columns = ["flame", "material", "smoke", "suppression", "conditions"];
    const table = investigations.map((study) => {
      const p = profiles[study.id] || {};
      const cells = columns.map((key) => {
        const status = p[key] || "none";
        const name = status === "direct" ? l.direct : status === "partial" ? l.partial : status === "conditions" ? l.conditionsOnly : l.none;
        const short = status === "direct" ? l.directShort : status === "partial" ? l.partialShort : status === "conditions" ? l.conditionsShort : l.noneShort;
        return `<td><span class="coverage-cell coverage-${status}" title="${esc(name)}" aria-label="${esc(name)}">${esc(short)}</span></td>`;
      }).join("");
      return `<tr><th scope="row"><a href="${esc(study.sourceUrl)}" target="_blank" rel="noreferrer">${esc(study.id)} \xB7 ${esc(study.title)} \u2197</a></th>${cells}</tr>`;
    }).join("");
    return `<section class="card evidence-coverage" aria-labelledby="coverage-title"><div class="card-head"><div><h3 id="coverage-title">${l.title}</h3><p class="sub">${l.sub}</p></div><span class="tag">${investigations.length} ${lang2 === "ar" ? "\u062C\u062F\u0627\u0648\u0644" : "bundled tables"}</span></div><div class="table-wrap"><table><thead><tr><th scope="col">${l.study}</th>${columns.map((key) => `<th scope="col">${l[key]}</th>`).join("")}</tr></thead><tbody>${table}</tbody></table></div><div class="coverage-legend"><span><i class="coverage-swatch coverage-direct"></i>${l.direct}</span><span><i class="coverage-swatch coverage-partial"></i>${l.partial}</span><span><i class="coverage-swatch coverage-conditions"></i>${l.conditionsOnly}</span><span><i class="coverage-swatch coverage-none"></i>${l.none}</span></div><p class="sub">${l.note}</p></section>`;
  }

  // public/lib/flame-scene3d.js
  function flameScene3d(lang2 = "en") {
    const ar = lang2 === "ar";
    return `<article class="card flame-scene-card"><div class="card-head"><div><h2>${ar ? "\u0645\u0634\u0647\u062F \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646" : "3D heat-transport and airflow scene"}</h2><p class="sub">${ar ? "\u063A\u064A\u0651\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0627\u0633\u062D\u0628 \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0633\u0647\u0645 \u0644\u062A\u062F\u0648\u064A\u0631 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0634\u0631\u062D \u0627\u0644\u0645\u0641\u0647\u0648\u0645 \u0648\u0644\u0627 \u064A\u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062C\u0631\u0628\u0629 \u0623\u0648 \u0646\u0638\u0627\u0645 \u0625\u062E\u0645\u0627\u062F \u0645\u064F\u062E\u062A\u0628\u0631\u0627\u064B." : "Change the conceptual state, then drag or use arrow keys to rotate. This is an explanatory model, not experimental data or a tested suppression system."}</p></div><span class="badge-sim">${ar ? "\u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \xB7 \u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u064B" : "ILLUSTRATIVE \xB7 NOT MEASURED"}</span></div><div class="scene-controls" role="group" aria-label="${ar ? "\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0634\u0647\u062F" : "Scene state"}"><button type="button" class="outline-btn active" data-scene-gravity="earth">${ar ? "\u062C\u0627\u0630\u0628\u064A\u0629 \u0623\u0631\u0636\u064A\u0629" : "Earth gravity"}</button><button type="button" class="outline-btn" data-scene-gravity="micro">${ar ? "\u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649" : "Microgravity"}</button><button type="button" class="outline-btn active" data-scene-air="on">${ar ? "\u062A\u0647\u0648\u064A\u0629 \u0645\u0641\u0631\u0648\u0636\u0629: \u062A\u0634\u063A\u064A\u0644" : "Forced airflow: on"}</button><button type="button" class="outline-btn" data-scene-air="off">${ar ? "\u062A\u0647\u0648\u064A\u0629 \u0645\u0641\u0631\u0648\u0636\u0629: \u0625\u064A\u0642\u0627\u0641" : "Forced airflow: off"}</button><button type="button" class="quiet-btn" data-scene-reset>${ar ? "\u0625\u0639\u0627\u062F\u0629 \u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0639\u0631\u0636" : "Reset view"}</button></div><div class="scene3d-stage" tabindex="0" role="group" aria-label="${ar ? "\u0645\u0634\u0647\u062F \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F\u060C \u0627\u0633\u062D\u0628 \u0644\u062A\u062F\u0648\u064A\u0631\u0647" : "Interactive 3D schematic; drag to rotate"}"><div class="scene3d-room" data-gravity="earth" data-air="on"><div class="scene-cube"><i class="cube-face cube-front"></i><i class="cube-face cube-back"></i><i class="cube-face cube-left"></i><i class="cube-face cube-right"></i><i class="cube-face cube-top"></i><i class="cube-face cube-bottom"></i></div><div class="scene-flame"><i></i><i></i><i></i></div><div class="scene-plume"><i></i><i></i><i></i></div><div class="scene-streams"><i></i><i></i><i></i><i></i></div><div class="scene-fan"><b></b><b></b><b></b><span></span></div><div class="scene-caption scene-label-earth">${ar ? "\u0637\u0641\u0648 / \u062D\u0645\u0644 \u0637\u0628\u064A\u0639\u064A" : "BUOYANCY / NATURAL CONVECTION"}</div><div class="scene-caption scene-label-micro">${ar ? "\u0627\u0646\u062A\u0634\u0627\u0631 + \u062A\u0647\u0648\u064A\u0629 \u0639\u0646\u062F \u0648\u062C\u0648\u062F\u0647\u0627" : "DIFFUSION + FORCED FLOW IF PRESENT"}</div></div></div><p class="sub scene-state-note" aria-live="polite">${ar ? "\u064A\u0636\u0639\u0641 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u061B \u0644\u0627 \u062A\u062E\u062A\u0641\u064A \u062D\u0631\u0643\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A\u0629." : "Natural convection weakens in microgravity; forced airflow can remain."}</p><div class="callout">${ar ? "\u0645\u062E\u0637\u0637 \u0645\u0641\u0627\u0647\u064A\u0645\u064A \u0628\u0644\u0627 \u0645\u0642\u064A\u0627\u0633 \u0643\u0645\u064A. \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628 \u0648\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0647\u0646\u0627 \u0644\u064A\u0633\u062A \u0645\u062D\u0627\u0643\u0627\u0629 CFD \u0648\u0644\u0627 \u0635\u0648\u0631\u0627\u064B \u0645\u0646 NASA\u061B \u0623\u0631\u0628\u0637 \u0627\u0644\u062A\u0635\u0627\u0645\u064A\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0644\u0625\u062E\u0645\u0627\u062F \u0628\u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0648\u0645\u0635\u0627\u062F\u0631\u0647\u0627 \u0639\u0646\u062F \u0625\u0636\u0627\u0641\u062A\u0647\u0627." : "Conceptual and not to scale. Flame shape and flow paths are not CFD results or NASA imagery. Suppression designs can be added later as a separate, source-linked layer."} <a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA fire-safety research \u2197</a></div></article>`;
  }
  function bindFlameScene3d(root, lang2 = "en") {
    var _a;
    const stage = root.querySelector(".scene3d-stage");
    const room = root.querySelector(".scene3d-room");
    const note = root.querySelector(".scene-state-note");
    if (!stage || !room) return;
    let rx = -16, ry = -28, dragging = false, sx = 0, sy = 0;
    const applyRotation = () => {
      room.style.setProperty("--rx", `${rx}deg`);
      room.style.setProperty("--ry", `${ry}deg`);
    };
    applyRotation();
    root.querySelectorAll("[data-scene-gravity]").forEach(
      (button) => button.addEventListener("click", () => {
        room.dataset.gravity = button.dataset.sceneGravity;
        root.querySelectorAll("[data-scene-gravity]").forEach((item) => item.classList.toggle("active", item === button));
        if (note)
          note.textContent = lang2 === "ar" ? room.dataset.gravity === "earth" ? "\u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645\u064A \u064A\u0638\u0647\u0631 \u0645\u0633\u0627\u0631 \u0635\u0627\u0639\u062F \u0644\u0644\u063A\u0627\u0632 \u0627\u0644\u0633\u0627\u062E\u0646 \u0628\u0641\u0639\u0644 \u0627\u0644\u0637\u0641\u0648." : "\u064A\u0636\u0639\u0641 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u061B \u0644\u0627 \u062A\u062E\u062A\u0641\u064A \u062D\u0631\u0643\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A\u0629." : room.dataset.gravity === "earth" ? "The conceptual plume indicates hot-gas buoyancy." : "Natural convection weakens in microgravity; forced airflow can remain.";
      })
    );
    root.querySelectorAll("[data-scene-air]").forEach(
      (button) => button.addEventListener("click", () => {
        room.dataset.air = button.dataset.sceneAir;
        root.querySelectorAll("[data-scene-air]").forEach((item) => item.classList.toggle("active", item === button));
      })
    );
    (_a = root.querySelector("[data-scene-reset]")) == null ? void 0 : _a.addEventListener("click", () => {
      rx = -16;
      ry = -28;
      applyRotation();
    });
    stage.addEventListener("pointerdown", (event) => {
      dragging = true;
      sx = event.clientX;
      sy = event.clientY;
      stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      ry += (event.clientX - sx) * 0.45;
      rx = Math.max(-65, Math.min(30, rx - (event.clientY - sy) * 0.35));
      sx = event.clientX;
      sy = event.clientY;
      applyRotation();
    });
    stage.addEventListener("pointerup", () => {
      dragging = false;
    });
    stage.addEventListener("pointercancel", () => {
      dragging = false;
    });
    stage.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 12 : 5;
      if (event.key === "ArrowLeft") ry -= step;
      else if (event.key === "ArrowRight") ry += step;
      else if (event.key === "ArrowUp") rx = Math.max(-65, rx - step);
      else if (event.key === "ArrowDown") rx = Math.min(30, rx + step);
      else return;
      event.preventDefault();
      applyRotation();
    });
  }

  // public/challenge-research.js
  var studyNotes = {
    "PSI-20": "ACME BRE \xB7 gaseous flames and burning-rate emulator test conditions",
    "PSI-21": "ACME CLD \xB7 coflow laminar diffusion flame test inventory",
    "PSI-22": "ACME E-FIELD \xB7 electric-field diffusion flame test inventory",
    "PSI-23": "ACME s-Flame \xB7 spherical diffusion flame test inventory",
    "PSI-25": "BASS-II \xB7 solid-fuel burning and suppression",
    "PSI-26": "BASS \xB7 solid-fuel burning and suppression",
    "PSI-39": "CFI \xB7 Cool Flames Investigation test conditions",
    "PSI-47": "DAFT \xB7 dust and aerosol measurement sessions",
    "PSI-68": "FLEX-2 \xB7 droplet-combustion test envelope",
    "PSI-69": "FLEX \xB7 liquid-droplet flames and gaseous suppressants",
    "PSI-98": "SAFFIRE-I \xB7 spacecraft fire and material flammability",
    "PSI-99": "SAFFIRE-II \xB7 spacecraft fire and flame spread",
    "PSI-100": "SAFFIRE-III \xB7 spacecraft fire and flame spread",
    "PSI-101": "SAME-R \xB7 smoke and aerosol measurements",
    "PSI-102": "SAME \xB7 smoke and aerosol measurements",
    "PSI-107": "SPICE \xB7 Smoke Point In Co-flow Experiment"
  };
  var studyNotesArabic = {
    "PSI-20": "ACME BRE \xB7 \u0634\u0631\u0648\u0637 \u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u063A\u0627\u0632\u064A \u0648\u0645\u062D\u0627\u0643\u064A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642",
    "PSI-21": "ACME CLD \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u062A\u0648\u0627\u0632\u064A",
    "PSI-22": "ACME E-FIELD \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u062A\u062D\u062A \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A",
    "PSI-23": "ACME s-Flame \xB7 \u0641\u0647\u0631\u0633 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0643\u0631\u0648\u064A",
    "PSI-25": "BASS-II \xB7 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u0625\u062E\u0645\u0627\u062F\u0647\u0627",
    "PSI-26": "BASS \xB7 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u0625\u062E\u0645\u0627\u062F\u0647\u0627",
    "PSI-39": "CFI \xB7 \u0634\u0631\u0648\u0637 \u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0628\u0627\u0631\u062F",
    "PSI-47": "DAFT \xB7 \u062C\u0644\u0633\u0627\u062A \u0642\u064A\u0627\u0633 \u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-68": "FLEX-2 \xB7 \u0646\u0637\u0627\u0642 \u062A\u062C\u0627\u0631\u0628 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0627\u062A",
    "PSI-69": "FLEX \xB7 \u0644\u0647\u0628 \u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0625\u062E\u0645\u0627\u062F",
    "PSI-98": "SAFFIRE-I \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0648\u0627\u062F",
    "PSI-99": "SAFFIRE-II \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628",
    "PSI-100": "SAFFIRE-III \xB7 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628",
    "PSI-101": "SAME-R \xB7 \u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-102": "SAME \xB7 \u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0627\u0644\u062C\u0648\u064A",
    "PSI-107": "SPICE \xB7 \u062A\u062C\u0631\u0628\u0629 \u0646\u0642\u0637\u0629 \u0627\u0644\u062F\u062E\u0627\u0646 \u0641\u064A \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u062A\u0648\u0627\u0632\u064A"
  };
  var analysisNotesArabic = {
    "PSI-20": "\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u064A\u0648\u0645\u064A\u0629\u061B \u0627\u0644\u0639\u062F\u062F \u064A\u0635\u0641 \u0635\u0641 \u0627\u0644\u0645\u0644\u062E\u0635 \u0648\u0644\u0627 \u064A\u0645\u062B\u0644 \u062A\u062C\u0627\u0631\u0628 \u0644\u0647\u0628 \u0641\u0631\u062F\u064A\u0629. \u062A\u0633\u0645\u064A\u0627\u062A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0645\u062D\u0641\u0648\u0638\u0629 \u0648\u0644\u0627 \u062A\u064F\u0631\u0628\u0637 \u0628\u0646\u062A\u064A\u062C\u0629 \u0641\u0631\u062F\u064A\u0629.",
    "PSI-21": "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631. \u062A\u064F\u062D\u0641\u0638 \u062D\u0642\u0648\u0644 MFC \u0648\u0648\u062D\u062F\u0627\u062A\u0647\u0627 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A\u061B \u0648\u0644\u0627 \u064A\u0639\u0632\u0644 \u0647\u0630\u0627 \u0627\u0644\u0648\u0635\u0641 \u0623\u062B\u0631 \u0627\u0644\u0648\u0642\u0648\u062F \u0623\u0648 \u0627\u0644\u062A\u062F\u0641\u0642.",
    "PSI-22": "\u062A\u064F\u0644\u062E\u0651\u0635 \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0641\u0642\u0637\u060C \u0648\u062A\u0638\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0641\u0627\u0631\u063A\u0629 \u0623\u0648 \u0627\u0644\u062A\u0639\u0644\u064A\u0642\u0627\u062A \u0636\u0645\u0646 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0635\u062F\u0631. \u0644\u0627 \u064A\u0646\u062A\u062C \u0639\u0646\u0647\u0627 \u0646\u0645\u0648\u0630\u062C \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0643\u0644 \u0644\u0647\u0628.",
    "PSI-23": "\u0627\u0644\u0635\u0641\u0648\u0641 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u062E\u062A\u0628\u0627\u0631\u061B \u062D\u064F\u0641\u0638\u062A \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u0646\u062C\u0645\u0629 \u0648\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0645\u0635\u062F\u0631. \u0644\u0627 \u062A\u064F\u0633\u062A\u0646\u062A\u062C \u0628\u0646\u064A\u0629 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0633\u0631\u0639\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644.",
    "PSI-25": "\u0647\u0630\u0647 \u0646\u0637\u0627\u0642\u0627\u062A \u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0639\u0628\u0631 \u0635\u0641\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A\u060C \u0648\u0644\u064A\u0633\u062A \u0623\u062B\u0631\u064B\u0627 \u0645\u0639\u0632\u0648\u0644\u064B\u0627 \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646. \u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u062A\u062F\u0641\u0642\u0627\u062A \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0625\u0634\u0639\u0627\u0644\u061B \u0648\u0623\u064F\u0628\u0642\u064A\u062A \u0642\u0631\u0627\u0621\u0627\u062A CO \u0627\u0644\u0633\u0627\u0644\u0628\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A.",
    "PSI-26": "\u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0641\u0647\u0631\u0633 \u0644\u0644\u0639\u064A\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u062F\u0648\u0646 \u0646\u062A\u064A\u062C\u0629 \u0631\u0642\u0645\u064A\u0629 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628 \u0623\u0648 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061B \u064A\u0641\u064A\u062F \u0641\u064A \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0648\u062A\u0648\u062B\u064A\u0642\u0647\u0627 \u0644\u0627 \u0641\u064A \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u062E\u0627\u0637\u0631.",
    "PSI-39": "\u062D\u0642\u0648\u0644 \u062A\u0631\u0643\u064A\u0628 \u0644\u0644\u062C\u0648 \u0627\u0644\u0645\u062D\u064A\u0637 \u0648\u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0627\u062D\u062A\u0631\u0627\u0642. \u0644\u0627 \u062A\u0630\u0643\u0631 \u0639\u0646\u0627\u0648\u064A\u0646 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0648\u062D\u062F\u0627\u062A\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u0646\u062D\u0648\u0644 \u0627\u0644\u0642\u064A\u0645 \u0648\u0644\u0627 \u0646\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0643\u062F\u0631\u062C\u0627\u062A \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644.",
    "PSI-47": "\u064A\u062D\u062A\u0648\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0648\u0635\u0641 \u062C\u0644\u0633\u062A\u064A \u0642\u064A\u0627\u0633 \u063A\u0628\u0627\u0631/\u0647\u0628\u0627\u0621 \u0641\u0642\u0637 \u0648\u0644\u0627 \u064A\u062A\u0636\u0645\u0646 \u0646\u062A\u064A\u062C\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0631\u0642\u0645\u064A\u0629.",
    "PSI-68": "\u0647\u0630\u0627 \u062C\u062F\u0648\u0644 \u0646\u0637\u0627\u0642\u0627\u062A \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u062A \u0641\u0631\u062F\u064A\u0629\u061B \u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0646\u0635\u0648\u0635 \u0648\u0627\u0644\u0646\u0637\u0627\u0642\u0627\u062A \u0643\u0645\u0627 \u0647\u064A \u0648\u0644\u0627 \u062A\u062D\u0633\u0628 \u0645\u0646\u0647\u0627 \u0625\u062D\u0635\u0627\u0621\u0627\u062A.",
    "PSI-69": "\u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0646\u0636\u062F\u0629 FLEX \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0647\u0630\u0627 \u0627\u0644\u062B\u0627\u0628\u062A \u062E\u0627\u0635 \u0628\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u0641\u0642 \u0642\u0627\u0646\u0648\u0646 d\xB2 \u0648\u0644\u064A\u0633 \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u062D\u0631\u064A\u0642 \u0645\u0627\u062F\u0629 \u0635\u0644\u0628\u0629.",
    "PSI-98": "\u0623\u064F\u062F\u0631\u062C \u0635\u0641\u0627 \u0627\u0644\u0639\u064A\u0646\u0629 S# \u0641\u0642\u0637\u061B \u0625\u062F\u062E\u0627\u0644\u0627\u062A F# \u0645\u0631\u0627\u062C\u0639 \u062A\u0635\u0648\u064A\u0631 \u0644\u062A\u062F\u0641\u0642 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631. \u0639\u064A\u0646\u062A\u0627\u0646 \u0644\u0627 \u062A\u0643\u0641\u064A\u0627\u0646 \u0644\u0625\u062B\u0628\u0627\u062A \u0623\u062B\u0631 \u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u062C\u0631\u064A\u0627\u0646.",
    "PSI-99": "\u062A\u062A\u0636\u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0639\u064A\u0646\u0627\u062A \u062A\u0633\u0645\u064A\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0648\u0623\u0637\u0648\u0627\u0644\u064B\u0627 \u0645\u062E\u062A\u0644\u0637\u0629. \u062D\u0642\u0644 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0643\u062A\u0648\u0628 \u201C?-g\u201D\u061B \u0644\u0630\u0644\u0643 \u0644\u0645 \u0646\u0635\u0646\u0641\u0647 \u0639\u0644\u0649 \u0623\u0646\u0647 \u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649 \u0648\u0644\u0645 \u0646\u062F\u0645\u062C \u0642\u064A\u0645\u0647.",
    "PSI-100": "\u064A\u0635\u0641 \u0627\u0644\u0635\u0641\u0627\u0646 \u0634\u0631\u0648\u0637 \u0639\u064A\u0646\u062A\u064A SIBAL \u0648\u0645\u0639\u0631\u0641\u0627\u062A \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627\u060C \u0648\u0645\u0646\u0647\u0627 \u062C\u0631\u064A\u0627\u0646 30 cm/s \u0628\u0627\u062A\u062C\u0627\u0647\u064A\u0646. \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0627\u0644\u062C\u062F\u0648\u0644 \u0646\u062A\u064A\u062C\u0629 \u0645\u0642\u0627\u0633\u0629 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628.",
    "PSI-101": "\u0647\u0630\u0647 \u062D\u0642\u0648\u0644 \u0646\u0642\u0644 \u0648\u0642\u064A\u0627\u0633 \u0644\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621\u060C \u0648\u0644\u064A\u0633\u062A \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628. \u062A\u062A\u0643\u0631\u0631 \u0645\u0639\u0631\u0641\u0627\u062A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0627\u0642\u0635\u0629\u060C \u0641\u0644\u0627 \u062A\u0639\u0627\u0645\u0644 \u0627\u0644\u0635\u0641\u0648\u0641 \u0643\u062D\u0631\u0627\u0626\u0642 \u0645\u0633\u062A\u0642\u0644\u0629.",
    "PSI-102": "\u0623\u064F\u0628\u0642\u064A\u062A \u0642\u064A\u0627\u0633\u0627\u062A \u0641\u0642\u062F\u0627\u0646 \u0643\u062A\u0644\u0629 Teflon \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A. \u062A\u062E\u062A\u0644\u0641 \u0633\u0631\u0639\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0648\u0645\u062F\u0629 \u0627\u0644\u062A\u0639\u062A\u064A\u0642\u061B \u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0648\u0635\u0641\u064A \u0648\u0644\u064A\u0633 \u0645\u0639\u062F\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628.",
    "PSI-107": "\u0633\u062C\u0644 SPICE \u0630\u0648 469 \u0635\u0641\u064B\u0627 \u064A\u0643\u0631\u0631 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u062D\u062F\u062B \u0639\u0628\u0631 \u0638\u0631\u0648\u0641 \u0627\u0644\u062A\u0634\u063A\u064A\u0644. \u062A\u0644\u062E\u0635 \u0627\u0644\u0642\u064A\u0645 \u0645\u062F\u062E\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u062D\u0631\u0627\u0626\u0642 \u0645\u0633\u062A\u0642\u0644\u0629 \u0623\u0648 \u0639\u0644\u0627\u0642\u0629 \u0633\u0628\u0628\u064A\u0629\u061B \u0648\u0641\u064F\u062D\u0635 \u062A\u0631\u062A\u064A\u0628 \u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0627\u0646\u0637\u0641\u0627\u0621 \u0645\u0646\u0641\u0635\u0644\u064B\u0627."
  };
  function triageFactorLabels(item, ar) {
    const { relevanceScore, environmentScore, dataAvailabilityScore } = item.triage;
    if (!ar) return item.triage.scoreFactors;
    const relevance = relevanceScore === 3 ? "\u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0645\u0648\u0636\u0648\u0639 \u0633\u0644\u0627\u0645\u0629 \u062D\u0631\u064A\u0642 \u0627\u0644\u0637\u0627\u0642\u0645 (3/3)" : relevanceScore === 2 ? "\u0635\u0644\u0629 \u0639\u0627\u0645\u0629 \u0628\u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0623\u0648 \u0627\u0644\u0644\u0647\u0628 (2/3)" : "\u062A\u062D\u0642\u064A\u0642 \u0636\u0645\u0646 \u0641\u0647\u0631\u0633 \u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0631\u0633\u0645\u064A (1/3)";
    const environment = environmentScore ? "\u0633\u064A\u0627\u0642 \u0641\u0636\u0627\u0626\u064A \u0623\u0648 \u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0645\u0630\u0643\u0648\u0631 \u0641\u064A \u0628\u064A\u0627\u0646\u0627\u062A PSI (2/2)" : "\u0644\u0645 \u064A\u064F\u062D\u062F\u0651\u062F \u0633\u064A\u0627\u0642 \u0637\u064A\u0631\u0627\u0646 \u0623\u0648 \u062C\u0627\u0630\u0628\u064A\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629 (0/2)";
    const availability = dataAvailabilityScore ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A \u0627\u0644\u0623\u0635\u0644\u064A \u0645\u0631\u0641\u0642 \u0648\u0645\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0635\u0645\u062A\u0647\u061B \u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644 \u0641\u0642\u0637" : "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u062A\u062C\u0631\u064A\u0628\u064A \u0623\u0635\u0644\u064A \u0645\u0631\u0641\u0642 \u0645\u062D\u0644\u064A\u0627\u064B\u061B \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637 \u0648\u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644";
    return [relevance, environment, availability];
  }
  function genericTable(rows, headers) {
    const shown = headers.slice(0, 8);
    return `<div class="table-wrap"><table><thead><tr>${shown.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${shown.map((h) => {
      var _a;
      return `<td>${esc((_a = row[h]) != null ? _a : "\u2014")}</td>`;
    }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  async function renderChallengeLibrary(lang2 = "en") {
    const data = await get("/api/challenge/catalog");
    const ar = lang2 === "ar";
    const cards = data.investigations.map((item) => `<article class="card evidence-card">
    <div class="card-head"><div><span class="eyebrow">${esc(item.id)} \xB7 NASA PSI</span><h3>${esc(item.title)}</h3><p class="sub">${esc(ar ? studyNotesArabic[item.id] || "" : studyNotes[item.id] || "")}</p></div><span class="tag ${item.sourceIntegrity === "VERIFIED" ? "obs" : "warn"}">${esc(item.sourceIntegrity)}</span></div>
    <div class="list-row"><span>${ar ? "\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062C\u062F\u0648\u0644" : "Source table rows"}</span><b>${item.rowCount}</b></div>
    <div class="list-row"><span>${ar ? "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A" : "Source row classes"}</span><b>${Object.entries(item.rowClassification.counts).map(([key, value]) => `${esc(key)}: ${value}`).join(" \xB7 ")}</b></div>
    <div class="list-row"><span>${ar ? "\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u0635\u062F\u0631" : "Source fields"}</span><b>${item.headers.length}</b></div>
    <div class="list-row"><span>DOI</span>${item.doi ? `<a class="mono" href="https://doi.org/${encodeURIComponent(item.doi)}" target="_blank" rel="noreferrer">${esc(item.doi)} \u2197</a>` : `<span class="sub">${ar ? "\u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0647\u0631\u0633\u061B \u0631\u0627\u062C\u0639 \u0633\u062C\u0644 PSI" : "Not provided in inventory metadata; see PSI record"}</span>`}</div>
    <div class="list-row"><span>${ar ? "\u0627\u0644\u062A\u0631\u062E\u064A\u0635" : "License"}</span><b>${esc(item.license)}</b></div>
    <details class="field-details"><summary>${ar ? "\u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u0646\u0642\u0635" : "Fields and missingness"}</summary><div class="field-list">${item.fields.map((f) => `<div class="list-row"><span>${esc(f.name)}</span><b>${f.nonEmpty}/${item.rowCount} \xB7 ${f.missing} missing</b></div>`).join("")}</div></details>
    <div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI" : "NASA PSI record"} \u2197</a><button class="outline-btn" data-investigation="${esc(item.id)}">${ar ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0635\u0641\u0648\u0641" : "Inspect source rows"}</button></div>
    <div id="source-table-${esc(item.id)}"></div>
  </article>`).join("");
    const rankedInventory = [...data.officialInventory.records].sort((a, b) => b.triage.missionRelevanceScore - a.triage.missionRelevanceScore || b.triage.dataAvailabilityScore - a.triage.dataAvailabilityScore || a.id.localeCompare(b.id, void 0, { numeric: true }));
    const inventory = rankedInventory.map((item, index) => {
      var _a, _b;
      const fileStatus = item.rawTableBundled ? ar ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u0645\u0631\u0641\u0642" : "TABLE BUNDLED" : ((_a = item.psiFileManifest) == null ? void 0 : _a.retrieved) ? ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u0645\u062A\u0627\u062D \xB7 \u0644\u0627 \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A" : "FILE INDEXED \xB7 NO LOCAL TABLE" : ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D" : "FILE INDEX UNAVAILABLE";
      const fileDetails = ((_b = item.psiFileManifest) == null ? void 0 : _b.retrieved) ? `${item.psiFileManifest.listedFileCount} ${ar ? "\u0645\u0644\u0641\u0627\u064B \u0641\u064A \u0627\u0644\u0641\u0647\u0631\u0633" : "files listed"} \xB7 ${item.psiFileManifest.experimentalTableCount} ${ar ? "\u062C\u062F\u0627\u0648\u0644 \u062A\u062C\u0631\u064A\u0628\u064A\u0629" : "experimental tables"}` : ar ? "\u0644\u0645 \u064A\u064F\u0631\u062C\u0639 endpoint \u0645\u0644\u0641\u0651\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0641\u0647\u0631\u0633" : "The file-list endpoint returned no manifest in this snapshot; this does not prove no files exist.";
      return `<article class="inventory-card"><div class="inventory-row"><span><b>#${index + 1} \xB7 ${esc(item.id)} \xB7 ${esc(item.acronym || item.title)}</b><small>${esc(item.title)} \xB7 ${esc(item.subResearchArea || "Combustion Science")} \xB7 ${esc(item.projectType || "Type not specified")}</small></span><span class="inventory-status ${item.rawTableBundled ? "available" : "metadata"}">${fileStatus}</span><span class="inventory-score">${item.triage.missionRelevanceScore}/5<small>${ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629" : "mission fit"}</small></span><a href="${esc(item.nasaRecordUrl)}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></div><div class="inventory-factors">${triageFactorLabels(item, ar).map((reason) => `<span>${esc(reason)}</span>`).join(" \xB7 ")}</div><p class="sub">${esc(fileDetails)}</p><details><summary>${ar ? "\u0623\u0647\u062F\u0627\u0641 \u0648\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0631\u0627\u0633\u0629" : "Study objectives and approach"}</summary><p><b>${ar ? "\u0627\u0644\u0623\u0647\u062F\u0627\u0641" : "Objectives"}</b><br>${esc(item.objectives || "Not provided in returned PSI metadata.")}</p><p><b>${ar ? "\u0627\u0644\u0637\u0631\u064A\u0642\u0629" : "Approach"}</b><br>${esc(item.approach || "Not provided in returned PSI metadata.")}</p>${item.hypothesis ? `<p><b>${ar ? "\u0627\u0644\u0641\u0631\u0636\u064A\u0629 \u0627\u0644\u0645\u0633\u062C\u0644\u0629" : "Recorded hypothesis"}</b><br>${esc(item.hypothesis)}</p>` : ""}<p class="sub">${esc(item.keywords || "")}</p></details></article>`;
    }).join("");
    const findings = data.findings.map((item) => `<article class="card"><div class="card-head"><div><span class="eyebrow">${esc(item.investigationId)} \xB7 ${esc(item.evidence)}</span><h3>${esc(item.title)}</h3></div><span class="tag">n=${esc(item.n)}</span></div><b>${esc(item.value)}</b><p class="sub">${esc(item.interpretation)}</p></article>`).join("");
    const bundledCount = data.investigations.length;
    const archive = data.fileArchiveInventory;
    const archiveTB = (archive.reportedBytes / 1e12).toFixed(2);
    const archiveCoverageNote = ar ? "\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u064A\u0635\u0641 \u0645\u0633\u062A\u0648\u062F\u0639 PSI \u0627\u0644\u0643\u0627\u0645\u0644 \u0628\u0646\u062D\u0648 12 \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A\u061B \u0623\u0645\u0627 \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0641\u064A\u062E\u0635 \u0627\u0644\u0641\u0647\u0627\u0631\u0633 \u0627\u0644\u062A\u064A \u0627\u0633\u062A\u062C\u0627\u0628\u062A \u0647\u0646\u0627 \u0641\u0642\u0637\u060C \u0648\u0644\u064A\u0633 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0643\u0627\u0645\u0644." : "The challenge video describes the full PSI repository as roughly 12 TB; this total covers only the file manifests returned in this snapshot, not the full downloaded archive.";
    const archiveCategories = archive.categories.map((item) => `<div class="list-row"><span>${esc(item.category)} \xB7 ${item.fileCount.toLocaleString()} ${ar ? "\u0645\u0644\u0641" : "files"}</span><b>${(item.reportedBytes / 1e9).toFixed(2)} GB</b></div>`).join("");
    return `${pageHead(ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062D\u062F\u064A \u0627\u0644\u0644\u0647\u0628 \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649" : "Flame in Freefall \xB7 NASA PSI Evidence", ar ? "\u0641\u0647\u0631\u0633 NASA PSI \u0627\u0644\u0631\u0633\u0645\u064A \u0645\u0639 \u0641\u0631\u0632 \u0634\u0641\u0627\u0641 \u0644\u0645\u062F\u0649 \u0635\u0644\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0628\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645." : "Official NASA PSI Combustion Science inventory with transparent mission-relevance ranking and source-checked findings.")}<div class="grid stats">${stat(ar ? "\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0641\u064A \u0627\u0644\u0641\u0647\u0631\u0633" : "PSI INVESTIGATIONS", data.officialInventory.total, "Official NASA PSI \xB7 Combustion Science", "\u25C9")}${stat(ar ? "\u062C\u062F\u0627\u0648\u0644 \u0645\u0631\u0641\u0642\u0629" : "TABLES BUNDLED", bundledCount, "Original table files checksum verified", "\u25A4")}${stat(ar ? "\u0635\u0641\u0648\u0641 \u0627\u0644\u062C\u062F\u0627\u0648\u0644" : "SOURCE ROWS", data.recordCountAcrossFiles, "Separate tables; never pooled", "\u25A4")}${stat(ar ? "\u0645\u0644\u0641\u0627\u062A \u062F\u0627\u0639\u0645\u0629" : "SUPPORTING ASSETS", data.supportingAssets.length, "Selected imagery, telemetry, and documents", "\u2197")}</div>${renderEvidenceCoverage(data.investigations, lang2)}<article class="card" style="margin-top:15px"><h3>${ar ? "\u062D\u062C\u0645 \u0623\u0631\u0634\u064A\u0641 NASA PSI \u062D\u0633\u0628 \u0627\u0644\u0641\u0647\u0627\u0631\u0633" : "NASA PSI archive inventory"}</h3><p class="sub">${ar ? `\u0627\u0633\u062A\u0644\u0645\u0646\u0627 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0644\u0640 ${archive.listedFileCount.toLocaleString()} \u0645\u0644\u0641\u0627\u064B \u0639\u0628\u0631 ${archive.manifestsRetrieved} \u0641\u0647\u0631\u0633 \u062F\u0631\u0627\u0633\u0629\u061B \u0645\u062C\u0645\u0648\u0639 \u0623\u062D\u062C\u0627\u0645 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0646\u0629 ${archiveTB} \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A. \u0647\u0630\u0627 \u0648\u0635\u0641 \u0644\u0644\u0623\u0631\u0634\u064A\u0641 \u0648\u0644\u064A\u0633 \u062A\u0646\u0632\u064A\u0644 \u0645\u062D\u062A\u0648\u064A\u0627\u062A\u0647.` : `Metadata lists ${archive.listedFileCount.toLocaleString()} files across ${archive.manifestsRetrieved} retrieved study manifests; the reported file sizes sum to ${archiveTB} TB. This is archive inventory metadata, not a download of those contents.`}</p>${archiveCategories}<p class="sub">${esc(archiveCoverageNote)}</p><div class="callout warn">${ar ? `${archive.manifestsUnavailable} \u0641\u0647\u0627\u0631\u0633 \u0645\u0646 \u0623\u0635\u0644 ${data.officialInventory.total} \u0644\u0645 \u062A\u064F\u0631\u062C\u0639 \u0642\u0627\u0626\u0645\u0629 \u0645\u0644\u0641\u0627\u062A \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645\u061B \u0644\u0627 \u064A\u0639\u0646\u064A \u0630\u0644\u0643 \u0623\u0646 NASA \u0644\u0627 \u062A\u0645\u0644\u0643 \u0645\u0644\u0641\u0627\u062A \u0644\u062A\u0644\u0643 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A. \u0644\u0645 \u0646\u0646\u0632\u0651\u0644 \u0645\u062C\u0645\u0648\u0639\u0629 Raw Data \u0627\u0644\u0636\u062E\u0645\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.` : `${archive.manifestsUnavailable} of ${data.officialInventory.total} study manifests returned no file listing in this snapshot; this does not mean NASA has no files for those investigations. The multi-terabyte Raw Data collection was not downloaded automatically.`}</div></article><div class="callout warn">${ar ? `\u0623\u064F\u0631\u0641\u0642 ${bundledCount} \u062C\u062F\u0648\u0644\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0645\u0639 \u0628\u0635\u0645\u0627\u062A \u062A\u062D\u0642\u0642. \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u062A\u0628\u0642\u0649 \u0628\u064A\u0627\u0646\u0627\u062A\u0647\u0627 \u0627\u0644\u0648\u0635\u0641\u064A\u0629 \u0648\u0631\u0648\u0627\u0628\u0637\u0647\u0627 \u0638\u0627\u0647\u0631\u0629\u061B \u0648\u062D\u0627\u0644\u0629 \u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0645\u0648\u0636\u062D\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0626\u0645\u0629.` : `${bundledCount} original experimental tables are bundled and checksum-verified. Other investigations remain visible with metadata and source links; their file-index retrieval status is shown below.`}</div><div class="callout">${ar ? "\u062F\u0631\u062C\u0629 \u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 = \u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0648\u0636\u0648\u0639 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 (1\u20133) + \u0633\u064A\u0627\u0642 \u0637\u064A\u0631\u0627\u0646/\u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649 (0 \u0623\u0648 2). \u062A\u0648\u0641\u0631 \u0627\u0644\u062C\u062F\u0648\u0644 \u0638\u0627\u0647\u0631 \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0648\u064A\u0643\u0633\u0631 \u0627\u0644\u062A\u0639\u0627\u062F\u0644 \u0641\u0642\u0637\u061B \u0627\u0644\u062F\u0631\u062C\u0629 \u0644\u064A\u0633\u062A \u062E\u0637\u0648\u0631\u0629 \u0623\u0648 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0634\u062A\u0639\u0627\u0644." : "Mission relevance = crew-fire-safety topic match (1\u20133) + flight/reduced-gravity context (0 or 2). Table availability is shown separately and only breaks ties; the score is not hazard or flammability."}</div><details class="card" style="margin:15px 0"><summary><b>${ar ? "\u062A\u0631\u062A\u064A\u0628 \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI \u062D\u0633\u0628 \u0635\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0629 \u0648\u0623\u0647\u062F\u0627\u0641\u0647\u0627" : "NASA PSI studies ranked by mission relevance with objectives"}</b> \xB7 ${data.officialInventory.total}</summary><div class="inventory-list">${inventory}</div><p class="sub">${ar ? "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0648\u0627\u0644\u0645\u0646\u0647\u062C \u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A NASA PSI \u0627\u0644\u0648\u0635\u0641\u064A\u0629\u061B \u0644\u0627 \u062A\u064F\u0639\u0631\u0636 \u0639\u0644\u0649 \u0623\u0646\u0647\u0627 \u0646\u062A\u0627\u0626\u062C \u0645\u0642\u0627\u0633\u0629." : "Objectives and approaches are NASA PSI metadata, not measured findings. Ground/model and flight investigations are identified separately."}</p></details><h2>${ar ? "\u0646\u062A\u0627\u0626\u062C \u0645\u062F\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0629" : "Findings supported by bundled source tables"}</h2><div class="grid two">${findings}</div><div class="callout warn" style="margin-top:15px">${ar ? "\u0644\u0627 \u062A\u062C\u0645\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0628\u064A\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A\u061B \u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0635\u0641\u0648\u0641 \u0641\u0647\u0631\u0633 \u0645\u0644\u0641\u0627\u062A \u0641\u0642\u0637 \u0648\u0644\u064A\u0633 \u0639\u064A\u0646\u0629 \u0639\u0644\u0645\u064A\u0629 \u0645\u0648\u062D\u062F\u0629." : "Do not pool rows across studies. The summed row count is a file inventory, not one scientific sample."}</div><h2>${ar ? "\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0627\u0644\u0645\u0631\u0641\u0642\u0629" : "Bundled original experimental tables"}</h2><div class="grid two evidence-grid">${cards}</div><article class="card" style="margin-top:15px"><h3>${ar ? "\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" : "Supporting measurements and documents"}</h3>${data.supportingAssets.map((a) => `<div class="list-row"><span>${esc(a.investigationId)} \xB7 ${esc(a.filename)}${a.rowCount ? ` \xB7 ${a.rowCount} rows \xD7 ${a.headers.length} fields` : ""}</span><a href="${esc(a.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI \xB7 ${esc(a.category)} \xB7 ${esc(a.sourceIntegrity)} \u2197</a></div>`).join("")}</article>`;
  }
  function bindChallengeLibrary(root, lang2 = "en") {
    root.querySelectorAll("[data-investigation]").forEach((button) => {
      button.onclick = async () => {
        const id = button.dataset.investigation;
        const target = [...root.querySelectorAll('[id^="source-table-"]')].find((element) => element.id === `source-table-${id}`);
        if (target.dataset.loaded === "true") {
          target.hidden = !target.hidden;
          return;
        }
        button.disabled = true;
        button.textContent = lang2 === "ar" ? "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0635\u062F\u0631\u2026" : "Loading source\u2026";
        try {
          const data = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
          target.innerHTML = `<div class="source-table-result"><p class="sub">${esc(data.rows.length)} rows \xB7 ${esc(data.headers.length)} source fields \xB7 SHA-256 <code>${esc(data.sourceSha256)}</code></p>${genericTable(data.rows.slice(0, 24), data.headers)}<p class="sub">Showing first ${Math.min(24, data.rows.length)} rows and first ${Math.min(8, data.headers.length)} fields. ${esc(data.note)}</p></div>`;
          target.dataset.loaded = "true";
        } catch (error) {
          target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
        } finally {
          button.disabled = false;
          button.textContent = lang2 === "ar" ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0635\u0641\u0648\u0641" : "Inspect source rows";
        }
      };
    });
  }
  function studyAnalysisMarkup(item, ar) {
    const analysis2 = item.studyAnalysis;
    const title = ar ? studyNotesArabic[item.id] || item.title : item.title;
    if (!analysis2) return `<div class="callout warn">${ar ? "\u0644\u0627 \u064A\u062A\u0648\u0641\u0631 \u062A\u0639\u0631\u064A\u0641 \u062A\u062D\u0644\u064A\u0644 \u0644\u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629." : "No study-specific analysis definition is available."}</div>`;
    const dedicated = analysis2.status === "dedicated-workbench";
    const metrics = analysis2.metrics.map((metric) => {
      var _a;
      const enoughForMean = metric.n >= 5 && Number.isFinite(metric.mean);
      return `<article class="card metric"><div class="label">${esc(metric.field)}</div><strong>${metric.min === null ? "\u2014" : `${metric.min}\u2013${metric.max}`}</strong><small>${esc(metric.unit)} \xB7 n=${metric.n} \xB7 ${ar ? "\u0648\u0633\u064A\u0637" : "median"} ${(_a = metric.median) != null ? _a : "\u2014"}</small>${enoughForMean ? `<p class="sub">${ar ? "\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0648\u0635\u0641\u064A" : "Descriptive mean"} ${metric.mean.toFixed(3)}</p>` : ""}<p class="sub">${ar ? "\u0645\u0641\u0642\u0648\u062F/\u063A\u064A\u0631 \u0631\u0642\u0645\u064A" : "Missing/non-numeric"}: ${metric.missingOrNonNumeric}</p></article>`;
    }).join("");
    const conditions = (analysis2.conditions || []).map((condition) => {
      const values = condition.values.map((entry) => `<code>${esc(entry.value)}</code> <small>\xD7 ${entry.count}</small>`).join(" \xB7 ");
      const omitted = condition.omittedValueCount ? ` \xB7 ${ar ? `\u0648\u0642\u064A\u0645 \u0623\u062E\u0631\u0649 ${condition.omittedValueCount}` : `${condition.omittedValueCount} more distinct values`}` : "";
      return `<div class="list-row"><span><b>${esc(condition.field)}</b><br><small>${ar ? `\u0642\u064A\u0645 \u0645\u0645\u064A\u0632\u0629 ${condition.distinctValueCount} \xB7 \u0645\u0641\u0642\u0648\u062F ${condition.missing}` : `${condition.distinctValueCount} distinct values \xB7 ${condition.missing} missing`}</small></span><span>${values || "\u2014"}${omitted}</span></div>`;
    }).join("");
    const note = ar ? analysisNotesArabic[item.id] || "\u0647\u0630\u0627 \u062A\u0644\u062E\u064A\u0635 \u0648\u0635\u0641\u064A \u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0645\u0635\u062F\u0631 \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629 \u0648\u0644\u0627 \u064A\u062F\u0645\u062C \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A." : analysis2.note;
    const limitations = ar ? "\u0644\u0627 \u062A\u0639\u0648\u064A\u0636 \u0644\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629\u060C \u0648\u0644\u0627 \u062F\u0645\u062C \u0628\u064A\u0646 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A\u060C \u0648\u0644\u0627 \u0641\u0648\u0627\u0635\u0644 \u062B\u0642\u0629 \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u0631\u0636\u064A\u0627\u062A. \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0645\u062D\u0641\u0648\u0638\u0629 \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631." : analysis2.methods;
    const special = dedicated ? `<button class="outline-btn" data-go="Analysis Workbench">${ar ? "\u0627\u0641\u062A\u062D \u062A\u062D\u0644\u064A\u0644 FLEX \u0627\u0644\u0645\u0641\u0635\u0644 \u2190" : "Open detailed FLEX analysis \u2192"}</button>` : "";
    const statusTag = dedicated ? ar ? "\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0645\u062A\u0627\u062D" : "DETAILED ANALYSIS AVAILABLE" : analysis2.metrics.length ? ar ? "\u062A\u0644\u062E\u064A\u0635 \u0648\u0635\u0641\u064A" : "DESCRIPTIVE" : ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629/\u0634\u0631\u0648\u0637" : "NO SAFE OUTCOME SUMMARY";
    const noMetric = dedicated ? `<div class="callout">${ar ? "\u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0645\u0646\u0636\u062F\u0629 \u062A\u062D\u0644\u064A\u0644 \u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u062E\u0627\u0635\u0629\u061B \u0627\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0628\u062F\u0644 \u0645\u0644\u062E\u0635 \u0639\u0627\u0645." : "This investigation has its own detailed analysis workbench; use it instead of a generic summary."}</div>` : analysis2.metrics.length === 0 ? `<div class="callout warn">${ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u064A\u062C\u0629 \u0631\u0642\u0645\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0644\u062E\u064A\u0635 \u0628\u0623\u0645\u0627\u0646 \u0645\u0646 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642. \u0631\u0627\u062C\u0639 \u0633\u0628\u0628 \u0630\u0644\u0643 \u0623\u062F\u0646\u0627\u0647 \u0648\u0627\u0641\u062A\u062D \u0633\u062C\u0644 NASA PSI." : "No numeric outcome can be summarized safely from this bundled table. See the study-specific reason below and inspect the NASA PSI record."}</div>` : "";
    return `<div class="card-head"><div><span class="eyebrow">${esc(item.id)} \xB7 NASA PSI \xB7 ${analysis2.includedRows}/${analysis2.sourceRows} ${ar ? "\u0635\u0641\u064B\u0627 \u0645\u0634\u0645\u0648\u0644\u064B\u0627" : "rows included"}</span><h3>${esc(title)}</h3></div><span class="tag ${analysis2.metrics.length || dedicated ? "comp" : "warn"}">${statusTag}</span></div>${metrics ? `<div class="grid three">${metrics}</div>` : ""}${conditions ? `<details class="card" style="margin:12px 0"><summary><b>${ar ? "\u0634\u0631\u0648\u0637 \u0627\u0644\u062A\u062C\u0631\u0628\u0629 \u0643\u0645\u0627 \u0648\u0631\u062F\u062A \u0641\u064A NASA PSI" : "NASA PSI experiment conditions (verbatim)"}</b></summary><div class="field-list">${conditions}</div><p class="sub">${ar ? "\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0623\u0635\u0644\u064A\u0629\u061B \u0644\u0645 \u062A\u064F\u0648\u062D\u0651\u062F \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0644\u0645 \u062A\u064F\u0641\u0633\u0631 \u0643\u0646\u0648\u0627\u062A\u062C." : "Original source values; units are not harmonized and condition labels are not interpreted as outcomes."}</p></details>` : ""}${noMetric}<p class="sub">${esc(note)}</p><div class="callout">${esc(limitations)}</div><div class="hero-actions"><a class="outline-btn" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI" : "NASA PSI record"} \u2197</a>${special}<button class="outline-btn" data-study-rows="${esc(item.id)}">${ar ? "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631" : "Inspect source rows"}</button></div><div id="study-source-rows"></div>`;
  }
  async function renderInvestigationLab(lang2 = "en") {
    const data = await get("/api/challenge/catalog");
    const ar = lang2 === "ar";
    const selected = data.officialInventory.records.find((item) => item.rawTableBundled) || data.officialInventory.records[0];
    const rows = data.officialInventory.records.map((item) => `<option value="${esc(item.id)}" ${item.id === (selected == null ? void 0 : selected.id) ? "selected" : ""}>${esc(item.id)} \xB7 ${esc(ar ? studyNotesArabic[item.id] || item.acronym || item.title : item.acronym || item.title)}${item.rawTableBundled ? "" : ar ? " \xB7 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637" : " \xB7 metadata only"}</option>`).join("");
    const firstTable = data.investigations.find((item) => item.id === (selected == null ? void 0 : selected.id));
    return `${pageHead(ar ? "\u0645\u062E\u062A\u0628\u0631 \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI" : "NASA PSI Investigation Lab", ar ? "\u062A\u062D\u0644\u064A\u0644 \u0648\u0635\u0641\u064A \u0644\u0643\u0644 \u062C\u062F\u0648\u0644 \u0645\u062A\u0627\u062D\u060C \u0645\u0639 \u0639\u0631\u0636 \u062D\u062F\u0648\u062F \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0645\u0646\u0639 \u062F\u0645\u062C \u062A\u062C\u0627\u0631\u0628 \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0641\u0642\u0629." : "Study-specific descriptive summaries for available PSI tables, with explicit measurement limits and no cross-study pooling.")}<article class="card"><div class="toolbar"><label class="field-label" for="studySelect">${ar ? "\u0627\u062E\u062A\u0631 \u062A\u062D\u0642\u064A\u0642\u064B\u0627 \u0645\u0646 \u0641\u0647\u0631\u0633 NASA PSI" : "Select an investigation from the NASA PSI index"}</label><select class="field" id="studySelect">${rows}</select></div><p class="sub">${ar ? "\u0627\u0644\u0641\u0647\u0631\u0633 \u0627\u0644\u0643\u0627\u0645\u0644" : "Full inventory"}: ${data.officialInventory.total} ${ar ? "\u062A\u062D\u0642\u064A\u0642\u064B\u0627" : "investigations"} \xB7 ${data.investigations.length} ${ar ? "\u062C\u062F\u0627\u0648\u0644 \u0623\u0635\u0644\u064A\u0629 \u0645\u0631\u0641\u0642\u0629" : "original tables bundled"}. ${ar ? "\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0644\u064A\u0633 \u062F\u0631\u062C\u0629 \u062E\u0637\u0648\u0631\u0629\u061B \u0643\u0644 \u0625\u062D\u0635\u0627\u0621 \u064A\u0628\u0642\u0649 \u0636\u0645\u0646 \u062F\u0631\u0627\u0633\u062A\u0647." : "Priority is not a hazard score; all summaries stay inside their source study."}</p><div class="callout warn">${ar ? "\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0644\u062E\u0635\u0629 \u0648\u0635\u0641\u064A\u0629 \u0641\u0642\u0637\u061B \u0644\u0627 \u062A\u0639\u0646\u064A \u0635\u0641\u0648\u0641\u064B\u0627 \u0645\u0633\u062A\u0642\u0644\u0629 \u0623\u0648 \u0623\u062B\u0631\u064B\u0627 \u0633\u0628\u0628\u064A\u064B\u0627. \u0627\u0641\u062A\u062D \u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0635 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0623\u0647\u062F\u0627\u0641 \u0648\u0627\u0644\u0637\u0631\u0642 \u0645\u0646 NASA PSI." : "Summaries are descriptive only; they do not imply independent rows or causal effects. Open Challenge Evidence for full NASA PSI objectives and approaches."}</div></article><section id="studyAnalysisPanel" style="margin-top:15px">${firstTable ? studyAnalysisMarkup(firstTable, ar) : `<div class="callout warn">${ar ? "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0644\u0642\u0637\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629." : "No local table is available for this investigation in the current file-index snapshot."}</div>`}</section>`;
  }
  function bindInvestigationLab(root, lang2 = "en") {
    const ar = lang2 === "ar";
    let dataPromise;
    const loadData = () => dataPromise || (dataPromise = get("/api/challenge/catalog"));
    const select = root.querySelector("#studySelect");
    const panel = root.querySelector("#studyAnalysisPanel");
    if (!select || !panel) return;
    const renderSelected = async () => {
      const data = await loadData();
      const id = select.value;
      const item = data.investigations.find((study) => study.id === id);
      if (!item) {
        const metadata = data.officialInventory.records.find((study) => study.id === id);
        panel.innerHTML = `<article class="card"><div class="card-head"><h3>${esc((metadata == null ? void 0 : metadata.title) || id)}</h3><span class="tag warn">${ar ? "\u0644\u0627 \u064A\u0648\u062C\u062F \u062C\u062F\u0648\u0644 \u0645\u062D\u0644\u064A" : "NO LOCAL TABLE"}</span></div><p class="sub">${ar ? "\u0644\u0645 \u064A\u064F\u0631\u062C\u0639 \u0641\u0647\u0631\u0633 NASA PSI \u062C\u062F\u0648\u0644\u064B\u0627 \u062A\u062C\u0631\u064A\u0628\u064A\u064B\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0641\u064A \u0627\u0644\u0644\u0642\u0637\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629. \u0647\u0630\u0627 \u0644\u0627 \u064A\u062B\u0628\u062A \u0639\u062F\u0645 \u0648\u062C\u0648\u062F \u0645\u0644\u0641\u0627\u062A \u0623\u062E\u0631\u0649 \u0644\u062F\u0649 NASA." : "The NASA PSI file-index snapshot returned no experimental table for this investigation. This does not prove NASA has no other files."}</p><a class="outline-btn" href="${esc((metadata == null ? void 0 : metadata.nasaRecordUrl) || "#")}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></article>`;
        return;
      }
      panel.innerHTML = studyAnalysisMarkup(item, ar);
      const button = panel.querySelector("[data-study-rows]");
      if (button) button.onclick = async () => {
        const target = panel.querySelector("#study-source-rows");
        if (target.dataset.loaded === "true") {
          target.hidden = !target.hidden;
          return;
        }
        button.disabled = true;
        try {
          const table = await get(`/api/challenge/table?id=${encodeURIComponent(id)}`);
          target.innerHTML = `<div class="source-table-result"><p class="sub">${table.rows.length} ${ar ? "\u0635\u0641\u064B\u0627" : "source rows"} \xB7 ${table.headers.length} ${ar ? "\u062D\u0642\u0648\u0644" : "fields"} \xB7 SHA-256 <code>${esc(table.sourceSha256)}</code></p>${genericTable(table.rows.slice(0, 24), table.headers)}<p class="sub">${ar ? "\u0639\u0631\u0636 \u0623\u0648\u0644 24 \u0635\u0641\u064B\u0627 \u0648\u0623\u0648\u0644 8 \u062D\u0642\u0648\u0644 \u0641\u0642\u0637\u061B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0635\u0644\u064A \u064A\u0628\u0642\u0649 \u0645\u062D\u0641\u0648\u0638\u064B\u0627 \u0643\u0645\u0627 \u0648\u0631\u062F." : `Showing first ${Math.min(24, table.rows.length)} rows and first ${Math.min(8, table.headers.length)} fields; source bytes remain unchanged.`}</p></div>`;
          target.dataset.loaded = "true";
        } catch (error) {
          target.innerHTML = `<div class="callout warn">${esc(error.message)}</div>`;
        } finally {
          button.disabled = false;
        }
      };
    };
    select.onchange = renderSelected;
  }
  function electricFieldNote(ar) {
    return `<article class="card" style="margin-top:15px"><h2>${ar ? "\u0627\u0644\u0644\u0647\u0628 \u062A\u062D\u062A \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A \xB7 PSI-22" : "Electric-field flame demonstration \xB7 PSI-22"}</h2><p>${ar ? "\u064A\u0639\u0631\u0636 \u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u062A\u062C\u0631\u0628\u0629 \u0644\u0647\u0628 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A: \u064A\u062D\u0631\u0643 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0623\u064A\u0648\u0646\u0627\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u0644\u0647\u0628\u060C \u0648\u062A\u0646\u0642\u0644 \u062A\u0635\u0627\u062F\u0645\u0627\u062A\u0647\u0627 \u062C\u0632\u0621\u0627\u064B \u0645\u0646 \u0627\u0644\u0632\u062E\u0645 \u0625\u0644\u0649 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062A\u0639\u0627\u062F\u0644\u060C \u0641\u064A\u0646\u0634\u0623 \u062C\u0631\u064A\u0627\u0646 \u0623\u064A\u0648\u0646\u064A \u064A\u0645\u0643\u0646\u0647 \u062A\u063A\u064A\u064A\u0631 \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628 \u0631\u063A\u0645 \u0636\u0639\u0641 \u0627\u0644\u0637\u0641\u0648." : "The challenge video shows the E-FIELD flame experiment: an electric field moves ions in the flame; collisions transfer momentum to neutral gas and create an ionic wind that can reshape the flame even when buoyancy is weak."}</p><div class="equation"><b>${ar ? "\u0642\u0648\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u062D\u062C\u0645\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0634\u062D\u0646\u0629" : "Electric body force on charge"}</b><code>f\u2091 = \u03C1\u2091 E</code><p class="sub">${ar ? "\u03C1\u2091 \u0643\u062B\u0627\u0641\u0629 \u0627\u0644\u0634\u062D\u0646\u0629 \u0627\u0644\u062D\u062C\u0645\u064A\u0629 \u0648E \u0634\u062F\u0629 \u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A. \u0647\u0630\u0647 \u0639\u0644\u0627\u0642\u0629 \u0644\u0644\u0642\u0648\u0629 \u0639\u0644\u0649 \u0627\u0644\u0634\u062D\u0646\u0627\u062A\u061B \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0632\u062E\u0645 \u0625\u0644\u0649 \u0627\u0644\u063A\u0627\u0632 \u064A\u0639\u062A\u0645\u062F \u0639\u0644\u0649 \u0627\u0642\u062A\u0631\u0627\u0646 \u0627\u0644\u0623\u064A\u0648\u0646\u0627\u062A \u0628\u0627\u0644\u062C\u0632\u064A\u0626\u0627\u062A \u0627\u0644\u0645\u062A\u0639\u0627\u062F\u0644\u0629." : "\u03C1\u2091 is volumetric charge density and E is electric-field strength. This is the force on charged species; momentum transfer to neutral gas depends on ion\u2013neutral coupling."}</p></div><div class="callout warn">${ar ? "\u0647\u0630\u0627 \u0645\u062B\u0627\u0644 \u0639\u0644\u0649 \u0646\u0642\u0644 \u0642\u0633\u0631\u064A \u0644\u0644\u0632\u062E\u0645\u060C \u0648\u0644\u064A\u0633 \u0645\u062D\u0627\u0643\u0627\u0629 \u0644\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0642\u0645\u0631\u064A\u0629 \u0623\u0648 \u0642\u064A\u0627\u0633\u0627\u064B \u0639\u0646\u062F 1/6 g. \u0644\u0627 \u064A\u0633\u062A\u0646\u062A\u062C \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062C\u0631\u064A\u0627\u0646\u0627\u064B \u0623\u0648 \u0642\u0648\u0629 \u0645\u0646 \u062C\u062F\u0648\u0644 PSI-22 \u062F\u0648\u0646 \u062D\u0642\u0648\u0644 \u0645\u0639\u0627\u064A\u0631\u0629 \u0645\u0646\u0627\u0633\u0628\u0629." : "This is an example of forced momentum transport, not a simulation of lunar gravity or a measurement at 1/6 g. The project does not infer flow or force from PSI-22 without suitable calibrated fields."} <a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-22" target="_blank" rel="noreferrer">${ar ? "\u0633\u062C\u0644 NASA PSI-22 \u2197" : "NASA PSI-22 record \u2197"}</a></div></article>`;
  }
  function renderFlamePhysics(lang2 = "en") {
    const ar = lang2 === "ar";
    const earthLabel = ar ? "\u0627\u0644\u0623\u0631\u0636: \u0627\u0644\u0637\u0641\u0648 \u064A\u0635\u0646\u0639 \u062A\u064A\u0627\u0631\u0627\u064B \u0637\u0628\u064A\u0639\u064A\u0627\u064B" : "Earth: buoyancy drives natural convection";
    const microLabel = ar ? "\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649: \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629" : "Microgravity: diffusion and forced ventilation";
    const science = ar ? `<h2>\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u062A\u063A\u064A\u0631 \u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0627\u064B\u061F</h2><p>\u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0623\u0631\u0636\u064A\u0629\u060C \u062A\u0633\u062E\u0651\u0646 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u063A\u0627\u0632 \u0641\u062A\u0642\u0644 \u0643\u062B\u0627\u0641\u062A\u0647\u061B \u0648\u0645\u0639 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u064A\u0638\u0647\u0631 \u062F\u0641\u0639 \u0627\u0644\u0637\u0641\u0648 \u0648\u064A\u0631\u062A\u0641\u0639 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0633\u0627\u062E\u0646\u060C \u0648\u062A\u062F\u062E\u0644 \u063A\u0627\u0632\u0627\u062A \u0623\u0628\u0631\u062F \u0625\u0644\u0649 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644. \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u064A\u0636\u0639\u0641 \u0647\u0630\u0627 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0628\u0634\u062F\u0629\u060C \u0644\u0643\u0646 \u0627\u0644\u062D\u0631\u0643\u0629 \u0644\u0627 \u062A\u062E\u062A\u0641\u064A: \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u062C\u0632\u064A\u0626\u064A \u0648\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0631\u0627\u0648\u062D \u0623\u0648 \u062A\u062F\u0641\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u062A\u0638\u0644 \u062A\u0646\u0642\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629.</p><p>\u0644\u0630\u0644\u0643 \u0642\u062F \u064A\u0635\u0628\u062D \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0634\u0628\u0647 \u0643\u0631\u0648\u064A \u0641\u064A \u062C\u0648 \u0633\u0627\u0643\u0646\u060C \u0648\u0642\u062F \u064A\u062A\u063A\u064A\u0631 \u0634\u0643\u0644\u0647 \u0648\u0627\u0646\u062A\u0634\u0627\u0631\u0647 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062A\u0647\u0648\u064A\u0629. \u0644\u064A\u0633 \u0643\u0644 \u0644\u0647\u0628 \u0641\u064A \u0627\u0644\u0641\u0636\u0627\u0621 \u0643\u0631\u0629\u060C \u0648\u0644\u0627 \u062A\u0639\u0646\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0627\u0646\u0639\u062F\u0627\u0645 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0627\u0646\u0639\u062F\u0627\u0645 \u0643\u0644 \u062D\u0631\u0643\u0629.</p>` : `<h2>What changes physically?</h2><p>On Earth, heating makes gases less dense; gravity then drives buoyant motion. Hot products rise while cooler reactants are drawn toward the reaction zone. In microgravity, buoyancy-driven natural convection is strongly reduced, but motion does not vanish: molecular diffusion, fan-driven ventilation, and fuel flow still transport species and heat.</p><p>A diffusion flame can become nearly spherical in a quiescent environment, while ventilation changes its shape and spread. Not every space flame is a sphere, and microgravity does not remove oxygen or all fluid motion.</p>`;
    return `${pageHead(ar ? "\u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628" : "Flame Physics", ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0639\u0644\u0645\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0623\u0631\u0636\u064A\u0629 \u0648\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0645\u0639 \u062A\u0645\u064A\u064A\u0632 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A \u0639\u0646 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629." : "A physics-grounded comparison of buoyant natural convection, diffusion, and forced ventilation.")}<article class="card"><div class="flame-compare"><section><h3>${earthLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u0627\u0644\u0644\u0647\u0628 \u0648\u062A\u064A\u0627\u0631 \u0627\u0644\u0637\u0641\u0648 \u0639\u0644\u0649 \u0627\u0644\u0623\u0631\u0636" : "Schematic flame and buoyancy flow on Earth"}"><defs><marker id="arrUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,8 L4,0 L8,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker><linearGradient id="earthFlame" x1="0" x2="0" y1="1" y2="0"><stop stop-color="#ffd56c"/><stop offset=".62" stop-color="#ff7c52"/><stop offset="1" stop-color="#e94b55"/></linearGradient></defs><path d="M180 200 C142 164 171 134 169 103 C196 127 188 75 204 48 C233 96 246 120 224 160 C214 179 200 194 180 200Z" fill="url(#earthFlame)"/><path d="M180 105 C180 79 180 57 180 28" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M94 63 C76 110 84 160 128 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><path d="M266 63 C284 110 276 160 232 190" fill="none" stroke="#4bc8ed" stroke-width="3" marker-end="url(#arrUp)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? "\u0639\u0645\u0648\u062F \u063A\u0627\u0632 \u0633\u0627\u062E\u0646 \u2191 \xB7 \u062F\u062E\u0648\u0644 \u0647\u0648\u0627\u0621 \u0623\u0628\u0631\u062F \u2193" : "hot plume \u2191 \xB7 cool air in \u2193"}</text></svg><p class="sub">${ar ? "\u0642\u062F \u064A\u0645\u064A\u0644 \u0627\u0644\u0644\u0647\u0628 \u0625\u0644\u0649 \u0627\u0644\u0627\u0633\u062A\u0637\u0627\u0644\u0629 \u0623\u0648 \u0627\u0644\u0648\u0645\u064A\u0636 \u0628\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u062F \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646\u061B \u0627\u0644\u0631\u0633\u0645 \u062A\u062E\u0637\u064A\u0637\u064A." : "Elongated / flickering tendencies depend on burner and flow; the diagram is schematic."}</p></section><section><h3>${microLabel}</h3><svg viewBox="0 0 360 230" role="img" aria-label="${ar ? "\u0645\u062E\u0637\u0637 \u0644\u0647\u0628 \u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649" : "Schematic diffusion flame under microgravity"}"><defs><radialGradient id="roundFlame"><stop stop-color="#ffe59b"/><stop offset=".47" stop-color="#ff995e"/><stop offset=".82" stop-color="#b760ff"/><stop offset="1" stop-color="#66cdf2" stop-opacity=".15"/></radialGradient><marker id="arrFlow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#4bc8ed" stroke-width="1.5"/></marker></defs><circle cx="180" cy="121" r="56" fill="url(#roundFlame)"/><path d="M62 121 H108 M298 121 H252 M180 35 V65 M180 207 V177" stroke="#4bc8ed" stroke-width="2.5" marker-end="url(#arrFlow)"/><text x="180" y="222" text-anchor="middle" fill="currentColor">${ar ? "\u0627\u0646\u062A\u0634\u0627\u0631 + \u062A\u062F\u0641\u0642 \u0647\u0648\u0627\u0621 \u0645\u0641\u0631\u0648\u0636 \u0625\u0646 \u0648\u064F\u062C\u062F" : "oxidizer diffusion \xB7 airflow if present"}</text></svg><p class="sub">${ar ? "\u0642\u062F \u064A\u0635\u0628\u062D \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631\u064A \u0645\u0633\u062A\u062F\u064A\u0631\u0627\u064B \u0639\u0646\u062F \u0636\u0639\u0641 \u0627\u0644\u062C\u0631\u064A\u0627\u0646\u061B \u0648\u062A\u0638\u0644 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u0629 \u0645\u0624\u062B\u0631\u0629 \u0641\u064A \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629." : "A rounded diffusion flame is possible in low-flow microgravity; imposed ventilation still shapes transport."}</p></section></div><div class="callout">${ar ? "\u0631\u0633\u0645 \u062A\u0648\u0636\u064A\u062D\u064A \u062A\u062E\u0637\u064A\u0637\u064A\u060C \u0648\u0644\u064A\u0633 \u0635\u0648\u0631\u0629 \u0645\u0646 \u062A\u062C\u0631\u0628\u0629 NASA \u0623\u0648 \u0635\u0648\u0631\u0629 \u0644\u0647\u0628 \u0645\u0642\u0627\u0633\u0629. \u0627\u0644\u062A\u0641\u0633\u064A\u0631 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A:" : "Illustrative schematic, not a NASA experiment photograph or a measured flame image. Physical explanation:"} <a href="https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA combustion and fire safety \u2197</a></div></article><div class="grid two" style="margin-top:15px"><article class="card">${science}<div class="equation"><b>${ar ? "\u0634\u062F\u0629 \u0627\u0644\u0637\u0641\u0648 \xB7 \u0639\u062F\u062F \u063A\u0631\u0627\u0634\u0648\u0641" : "Buoyancy strength \xB7 Grashof number"}</b><code>Gr = g \u03B2 \u0394T L\xB3 / \u03BD\xB2</code><p class="sub">${ar ? "\u064A\u0642\u0627\u0631\u0646 \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0637\u0641\u0648 \u0628\u0627\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u0644\u0632\u062C\u0629. \u0639\u0646\u062F\u0645\u0627 \u062A\u0642\u062A\u0631\u0628 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0641\u0639\u0627\u0644\u0629 g \u0645\u0646 \u0627\u0644\u0635\u0641\u0631 \u064A\u0636\u0639\u0641 \u062F\u0641\u0639 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u061B \u0648\u0644\u0627 \u064A\u0645\u062B\u0651\u0644 Gr \u0646\u0645\u0648\u0630\u062C\u0627\u064B \u0643\u0627\u0645\u0644\u0627\u064B \u0644\u0644\u062D\u0631\u064A\u0642." : "Compares buoyancy to viscous effects. As effective gravity g approaches zero, buoyant natural-convection forcing shrinks; Gr is not a complete fire model."}</p></div><div class="equation"><b>${ar ? "\u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0642\u0633\u0631\u064A \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \xB7 \u0639\u062F\u062F \u0628\u064A\u0643\u0644\u064A\u0647" : "Advection versus diffusion \xB7 P\xE9clet number"}</b><code>Pe = U L / D</code><p class="sub">${ar ? "\u064A\u0645\u062B\u0644 U \u0633\u0631\u0639\u0629 \u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u060C \u0648L \u0645\u0642\u064A\u0627\u0633 \u0637\u0648\u0644\u060C \u0648D \u0645\u0639\u0627\u0645\u0644 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629. \u0642\u062F \u062A\u064F\u0628\u0642\u064A \u0627\u0644\u0645\u0631\u0627\u0648\u062D Pe \u063A\u064A\u0631 \u0635\u0641\u0631\u064A \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649." : "U is imposed flow speed, L a length scale, and D a species diffusivity. Fan-driven airflow can keep Pe nonzero in microgravity."}</p></div></article><article class="card"><h2>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u0627\u0642\u0645" : "Oxygen and crew safety"}</h2><p>${ar ? "\u0632\u064A\u0627\u062F\u0629 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0636\u063A\u0637\u0647 \u0627\u0644\u062C\u0632\u0626\u064A \u0642\u062F \u062A\u0648\u0633\u0651\u0639 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0645\u0648\u0627\u062F \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u062A\u0633\u0631\u0651\u0639 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642. \u0644\u0643\u0646 \u0636\u063A\u0637 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0648\u062A\u0631\u0643\u064A\u0628 \u063A\u0627\u0632\u0647\u0627 \u064A\u062D\u062F\u062F\u0647\u0645\u0627 \u062A\u0648\u0627\u0632\u0646 \u0637\u0628\u064A \u0648\u0647\u0646\u062F\u0633\u064A\u060C \u0648\u0644\u064A\u0633 \u0642\u0631\u0627\u0631\u0627\u064B \u0628\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0644\u0627 \u0642\u064A\u0648\u062F." : "Increasing oxygen fraction or partial pressure can widen material flammability and intensify combustion. Cabin pressure and composition are a medical and engineering trade, not a simple instruction to add oxygen without limits."}</p><div class="equation"><b>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062C\u0632\u0626\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646" : "Oxygen partial pressure"}</b><code>pO\u2082 = xO\u2082 \xB7 Ptotal</code><p class="sub">${ar ? "\u0644\u0627 \u062A\u0643\u0641\u064A \u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062D\u062F\u0647\u0627\u061B \u0641\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0647\u0645\u0629 \u0623\u064A\u0636\u0627\u064B." : "The oxygen mole fraction alone is not enough: total pressure and material/test conditions matter."}</p></div><div class="callout warn">${ar ? "\u062A\u0635\u062D\u064A\u062D \u0645\u0647\u0645: \u062A\u0642\u0644\u064A\u0644 \u062E\u0637\u0631 \u062F\u0627\u0621 \u062A\u062E\u0641\u064A\u0641 \u0627\u0644\u0636\u063A\u0637 \u0642\u0628\u0644 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u064A\u0631\u062A\u0628\u0637 \u0628\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u0648\u0642\u062A\u061B \u0644\u0627 \u064A\u0639\u0646\u064A \u0630\u0644\u0643 \u0623\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u062A\u064F\u0632\u0627\u062F \u0623\u0643\u0633\u062C\u064A\u0646\u0627\u064B \u062F\u0627\u0626\u0645\u0627\u064B. \u062A\u0648\u062B\u0651\u0642 NASA \u0623\u0646 \u0627\u0644\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u063A\u0646\u064A\u0629 \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062A\u0631\u0641\u0639 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642." : "Important correction: reducing decompression-sickness risk before an EVA involves denitrogenation, pressure, and timing protocols; it does not mean the cabin is simply kept oxygen-enriched. NASA documents the fire hazards of oxygen-rich atmospheres."}</div><p class="sub">${ar ? "\u0627\u0644\u0645\u0631\u0627\u062C\u0639: " : "References: "}<a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">NASA-STD-3001 Vol. 2 \u2197</a> \xB7 <a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">NASA Fire Protection technical brief \u2197</a></p></article></div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0648\u062D\u062F\u0648\u062F\u0647" : "Research equations and limits"}</h2><div class="grid three"><div class="equation"><b>${ar ? "\u0642\u0627\u0646\u0648\u0646 \u0645\u0631\u0628\u0639 \u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0633\u0627\u0626\u0644\u0629" : "Liquid-droplet d\xB2 law"}</b><code>D\xB2(t) = D\u2080\xB2 \u2212 Kt</code><p class="sub">${ar ? "\u0639\u0644\u0627\u0642\u0629 \u0646\u0645\u0648\u0630\u062C\u064A\u0629 \u0639\u0646\u062F \u062A\u062D\u0642\u0642 \u0627\u0641\u062A\u0631\u0627\u0636\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 \u0634\u0628\u0647 \u0627\u0644\u0645\u0633\u062A\u0642\u0631. \u064A\u0639\u062A\u0645\u062F K \u0639\u0644\u0649 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u0648\u0644\u0627 \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0623\u0648 \u0639\u0646\u062F \u063A\u064A\u0627\u0628 \u062A\u0639\u0631\u064A\u0641 \u0648\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0636\u062D\u0629." : "A model under stated quasi-steady droplet-burning assumptions. K is condition-dependent; do not apply it to solid-material flame spread or infer K where units/definitions are absent."}</p></div><div class="equation"><b>${ar ? "\u0646\u0633\u0628\u0629 \u062A\u0633\u0627\u0631\u0639 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629" : "Gravitational acceleration ratio"}</b><code>g* = g_eff / g\u2080</code><p class="sub">${ar ? "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062A\u0633\u0627\u0631\u0639 \u0648\u0639\u062F\u0645 \u0627\u0644\u064A\u0642\u064A\u0646 \u0627\u0644\u0644\u0630\u064A\u0646 \u0623\u0628\u0644\u063A\u062A \u0639\u0646\u0647\u0645\u0627 \u0627\u0644\u062A\u062C\u0631\u0628\u0629. \xAB\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\xBB \u0628\u064A\u0626\u0629 \u062A\u0634\u063A\u064A\u0644\u064A\u0629\u060C \u0648\u0644\u064A\u0633\u062A \u0628\u0627\u0644\u0636\u0631\u0648\u0631\u0629 g = 0 \u0631\u064A\u0627\u0636\u064A\u0627\u064B." : "Use the experiment's reported acceleration and uncertainty. \u201CMicrogravity\u201D is an operational environment, not mathematical g = 0."}</p></div><div class="equation"><b>${ar ? "\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u0627\u0644\u062D\u0631\u064A\u0642" : "Fire-control framing"}</b><code>risk = f(fuel, oxidizer, ignition, flow, geometry)</code><p class="sub">${ar ? "\u0642\u0627\u0626\u0645\u0629 \u0639\u0648\u0627\u0645\u0644 \u062A\u0635\u0648\u0631\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u0639\u0627\u062F\u0644\u0629 \u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0645\u0639\u0627\u064A\u0631\u0629. \u064A\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0644\u0627 \u064A\u0635\u062F\u0631 \u0623\u0648\u0627\u0645\u0631 \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0644\u0644\u0625\u062E\u0645\u0627\u062F." : "A conceptual factor list, not a calibrated probability equation. The project reports evidence and test conditions; it does not issue operational suppression commands."}</p></div></div></article>${electricFieldNote(ar)}${flameScene3d(lang2)}`;
  }
  function renderMissionAtmospheres(lang2 = "en") {
    const ar = lang2 === "ar";
    const cases = [
      { en: "Earth / ISS reference", ar: "\u0645\u0631\u062C\u0639 \u0627\u0644\u0623\u0631\u0636 / \u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621", p: 14.7, o: 21, noteEn: "Nominal sea-level / ISS atmosphere; reference condition.", noteAr: "\u062C\u0648 \u0627\u0633\u0645\u064A \u0639\u0646\u062F \u0645\u0633\u062A\u0648\u0649 \u0633\u0637\u062D \u0627\u0644\u0628\u062D\u0631 / \u0645\u062D\u0637\u0629 \u0627\u0644\u0641\u0636\u0627\u0621\u061B \u062D\u0627\u0644\u0629 \u0645\u0631\u062C\u0639\u064A\u0629." },
      { en: "Shuttle campout atmosphere", ar: "\u062C\u0648 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0640 EVA \u0641\u064A \u0627\u0644\u0645\u0643\u0648\u0643", p: 10.2, o: 26.5, noteEn: "A lower-pressure EVA preparation atmosphere used in shuttle operations.", noteAr: "\u062C\u0648 \u0623\u0642\u0644 \u0636\u063A\u0637\u0627\u064B \u0627\u0633\u062A\u064F\u062E\u062F\u0645 \u0644\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0643\u0648\u0643." },
      { en: "Exploration atmosphere concept", ar: "\u062A\u0635\u0648\u0631 \u062C\u0648 \u0627\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641", p: 8.2, o: 34, noteEn: "A NASA exploration design concept for habitats / surface vehicles; not a universal or final flight setting.", noteAr: "\u062A\u0635\u0648\u0631 \u062A\u0635\u0645\u064A\u0645\u064A \u0644\u0646\u0627\u0633\u0627 \u0644\u0644\u0645\u0633\u0627\u0643\u0646 \u0623\u0648 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0627\u0644\u0633\u0637\u062D\u064A\u0629\u061B \u0644\u064A\u0633 \u0625\u0639\u062F\u0627\u062F\u0627\u064B \u0645\u0648\u062D\u062F\u0627\u064B \u0623\u0648 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0644\u0643\u0644 \u0631\u062D\u0644\u0629." },
      { en: "US EVA suit reference", ar: "\u0645\u0631\u062C\u0639 \u0628\u062F\u0644\u0629 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629", p: 4.3, o: 100, noteEn: "Low-pressure pure-oxygen suit environment; operational protocols remain mission-specific.", noteAr: "\u0628\u064A\u0626\u0629 \u0628\u062F\u0644\u0629 \u0645\u0646\u062E\u0641\u0636\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0623\u0643\u0633\u062C\u064A\u0646 \u0646\u0642\u064A\u061B \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u062A\u062E\u062A\u0644\u0641 \u062D\u0633\u0628 \u0627\u0644\u0645\u0647\u0645\u0629." }
    ];
    const rows = cases.map((c) => `<tr><td><b>${ar ? c.ar : c.en}</b><br><small>${ar ? c.noteAr : c.noteEn}</small></td><td>${c.p.toFixed(1)} psia</td><td>${c.o}%</td><td>${(c.p * c.o / 100).toFixed(2)} psia</td></tr>`).join("");
    const title = ar ? "\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u0648\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0637\u0627\u0642\u0645" : "Mission Atmospheres & EVA Transitions";
    return `${pageHead(title, ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0636\u063A\u0637 \u0648\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637\u0647 \u0627\u0644\u062C\u0632\u0626\u064A\u060C \u0648\u0644\u0645\u0627\u0630\u0627 \u062A\u0631\u062A\u0628\u0637 \u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062C\u0648 \u0628\u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642." : "Compare total pressure, oxygen fraction, and dry-gas oxygen partial pressure\u2014and why atmosphere choices couple EVA preparation with fire safety.")}<div class="callout warn">${ar ? "\u0647\u0630\u0647 \u0638\u0631\u0648\u0641 \u0645\u0631\u062C\u0639\u064A\u0629 \u0648\u062A\u0635\u0645\u064A\u0645\u064A\u0629 \u0645\u0646 \u0648\u062B\u0627\u0626\u0642 \u0646\u0627\u0633\u0627\u060C \u0648\u0644\u064A\u0633\u062A \u0648\u0635\u0641\u0629 \u062C\u0648 \u0644\u0645\u0631\u0643\u0628\u0629 \u0623\u0648 \u0627\u062F\u0639\u0627\u0621\u064B \u0628\u0623\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0642\u062F \u0627\u0639\u062A\u064F\u0645\u062F \u0644\u0643\u0644 \u0645\u0647\u0645\u0629 \u0642\u0645\u0631\u064A\u0629." : "These are reference and design-study conditions from NASA documents, not a prescribed vehicle atmosphere or a claim that one setting is final for every lunar mission."}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0631\u062C\u0639\u064A\u0629" : "Reference atmosphere cases"}</h2><div class="table-wrap"><table><thead><tr><th>${ar ? "\u0627\u0644\u062D\u0627\u0644\u0629" : "Case"}</th><th>${ar ? "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A" : "Total pressure"}</th><th>${ar ? "\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062D\u062C\u0645\u0627\u064B" : "O\u2082 by volume"}</th><th>${ar ? "\u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u062C\u0627\u0641 \u0627\u0644\u0645\u062D\u0633\u0648\u0628" : "Computed dry-gas pO\u2082"}</th></tr></thead><tbody>${rows}</tbody></table></div><p class="sub">${ar ? "\u0627\u0644\u062D\u0633\u0627\u0628: \u0636\u063A\u0637 O\u2082 \u0627\u0644\u062C\u0632\u0626\u064A = \u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \xD7 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A. \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0645\u0634\u062A\u0642\u0629 \u062D\u0633\u0627\u0628\u064A\u0627\u064B \u0645\u0646 \u0642\u064A\u0645 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629\u060C \u0648\u0644\u064A\u0633\u062A \u0642\u064A\u0627\u0633\u0627\u062A PSI." : "Calculation: oxygen partial pressure = oxygen mole fraction \xD7 total pressure. Values are calculated from the cited pressure/composition inputs; they are not PSI experiment measurements."}</p></article><div class="grid two" style="margin-top:15px"><article class="card"><h2>${ar ? "\u0644\u0645\u0627\u0630\u0627 \u064A\u062A\u063A\u064A\u0631 \u062C\u0648 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0642\u0628\u0644 EVA\u061F" : "Why change a cabin atmosphere before EVA?"}</h2><p>${ar ? "\u0639\u0646\u062F \u062E\u0641\u0636 \u0627\u0644\u0636\u063A\u0637 \u0644\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0628\u062F\u0644\u0629 \u0627\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u060C \u0642\u062F \u064A\u0633\u0628\u0628 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0627\u0644\u0630\u0627\u0626\u0628 \u0641\u064A \u0627\u0644\u0623\u0646\u0633\u062C\u0629 \u062E\u0637\u0631 \u062F\u0627\u0621 \u062A\u062E\u0641\u064A\u0641 \u0627\u0644\u0636\u063A\u0637. \u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644\u0627\u062A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646 \u0642\u0628\u0644 \u0627\u0644\u062E\u0631\u0648\u062C\u060C \u0628\u0645\u0627 \u0641\u064A\u0647\u0627 \u062A\u0646\u0641\u0633 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0648\u0627\u0644\u0636\u063A\u0637\u060C \u062A\u0642\u0644\u0644 \u0627\u0644\u062E\u0637\u0631. \u0644\u0630\u0644\u0643 \u062A\u062F\u0631\u0633 \u0646\u0627\u0633\u0627 \u0623\u062C\u0648\u0627\u0621 \u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0628\u0636\u063A\u0637 \u0643\u0644\u064A \u0623\u0642\u0644 \u0648\u0646\u0633\u0628\u0629 O\u2082 \u0623\u0639\u0644\u0649 \u0644\u062A\u0642\u0644\u064A\u0644 \u0639\u0628\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631\u061B \u0647\u0630\u0647 \u0645\u0648\u0627\u0632\u0646\u0629 \u0637\u0628\u064A\u0629 \u0648\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0648\u0647\u0646\u062F\u0633\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0642\u0627\u0639\u062F\u0629 \u0623\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u062A\u064F\u063A\u0646\u0649 \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u062F\u0627\u0626\u0645\u0627\u064B." : "Reducing pressure for an EVA suit transition can create decompression-sickness risk from inert nitrogen dissolved in body tissues. Prebreathe / denitrogenation protocols, transition pressure, and timing manage that risk. NASA studies lower-pressure, higher-O\u2082 exploration atmospheres to reduce EVA preparation burden; this is a medical, operational, and engineering trade\u2014not a rule that cabins are always oxygen-enriched."}</p><p class="sub">${ar ? "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u062A\u0634\u0645\u0644 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062C\u0632\u0626\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u0634\u0642 \u0648\u0628\u062E\u0627\u0631 \u0627\u0644\u0645\u0627\u0621\u061B \u0627\u0644\u062C\u062F\u0648\u0644 \u0623\u0639\u0644\u0627\u0647 \u064A\u0639\u0631\u0636 \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0641\u064A \u062E\u0644\u064A\u0637 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u062C\u0627\u0641 \u0644\u0644\u062A\u0648\u0636\u064A\u062D \u0641\u0642\u0637." : "Physiological inspired oxygen also depends on water-vapor pressure and the breathing protocol; the table uses dry-gas partial pressure as a clear atmosphere comparison only."}</p></article><article class="card"><h2>${ar ? "\u0644\u0645\u0627\u0630\u0627 \u0647\u0630\u0627 \u0645\u0647\u0645 \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F" : "Why this matters to combustion"}</h2><p>${ar ? "\u0641\u064A \u0627\u0644\u0645\u062B\u0627\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645\u064A 8.2 psia \u064834% O\u2082\u060C \u064A\u0628\u0642\u0649 pO\u2082 \u0627\u0644\u062C\u0627\u0641 \u0642\u0631\u064A\u0628\u0627\u064B \u0645\u0646 \u0645\u0631\u062C\u0639 14.7 psia \u064821% O\u2082\u060C \u0644\u0643\u0646 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0639\u0644\u0649 \u0628\u0643\u062B\u064A\u0631. \u062A\u0634\u0627\u0628\u0647 pO\u2082 \u0644\u0627 \u064A\u062C\u0639\u0644 \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0645\u062A\u0637\u0627\u0628\u0642\u0629: \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u064A\u062A\u0623\u062B\u0631 \u0628\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u0627\u0644\u062A\u062F\u0641\u0642 \u0648\u0645\u0635\u062F\u0631 \u0627\u0644\u0625\u0634\u0639\u0627\u0644." : "In the 8.2-psia / 34%-O\u2082 design case, dry-gas pO\u2082 is near the 14.7-psia / 21%-O\u2082 reference, while oxygen fraction is much higher. Similar pO\u2082 does not mean equivalent flammability: combustion also depends on oxygen concentration, total pressure, diluent, fuel, geometry, flow, and ignition."}</p><div class="callout">${ar ? "\u0628\u064A\u0627\u0646\u0627\u062A NASA PSI-20 (ACME BRE) \u062A\u0630\u0643\u0631 21%, 26.5%, 34% \u064840% \u0636\u0645\u0646 \u0645\u0644\u062E\u0635\u0627\u062A \u0623\u064A\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u060C \u0644\u0643\u0646\u0647\u0627 \u0644\u0627 \u062A\u0633\u062C\u0644 \u0627\u0644\u0636\u063A\u0637 \u0644\u0643\u0644 \u0645\u0644\u062E\u0635\u061B \u0644\u0630\u0644\u0643 \u0644\u0627 \u062A\u0635\u0644\u062D \u0648\u062D\u062F\u0647\u0627 \u0644\u0631\u0628\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0627\u0644\u0636\u063A\u0637 \u0623\u0648 \u0627\u0633\u062A\u0646\u062A\u0627\u062C \u062D\u062F \u0627\u0634\u062A\u0639\u0627\u0644." : "NASA PSI-20 (ACME BRE) day summaries include oxygen-concentration entries such as 21%, 26.5%, 34%, and 40%, but pressure is not resolved for each summary. They cannot alone establish a pressure\u2013oxygen relationship or a flammability limit."}</div></article></div><article class="card" style="margin-top:15px"><h2>${ar ? "\u062F\u0644\u0627\u0644\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642" : "Research implications for fire safety"}</h2><ol><li>${ar ? "\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u062F \u0646\u0641\u0633\u0647\u0627 \u0639\u0646\u062F \u0646\u0637\u0627\u0642\u0627\u062A O\u2082 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643\u0644 \u062A\u0635\u0645\u064A\u0645\u060C \u0645\u0639 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F." : "Test the actual materials across each design\u2019s oxygen and pressure envelope; report ignition, sustained burning, and extinction separately."}</li><li>${ar ? "\u062A\u063A\u064A\u064A\u0631 \u0645\u062A\u063A\u064A\u0631 \u0648\u0627\u062D\u062F \u0623\u0648 \u0628\u0646\u0627\u0621 \u062A\u0635\u0645\u064A\u0645 \u062A\u062C\u0631\u064A\u0628\u064A \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0639\u0648\u0627\u0645\u0644\u060C \u062D\u062A\u0649 \u064A\u0645\u0643\u0646 \u0641\u0635\u0644 \u0623\u062B\u0631 O\u2082 \u0639\u0646 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629." : "Use controlled or factorial experiments to separate oxygen-fraction effects from pressure and ventilation effects."}</li><li>${ar ? "\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0639\u0627\u064B\u061B \u0636\u0639\u0641 \u0627\u0644\u0637\u0641\u0648 \u0644\u0627 \u064A\u0644\u063A\u064A \u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0642\u0633\u0631\u064A \u0623\u0648 \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062F\u062E\u0627\u0646." : "Evaluate ventilation, detection, and suppression together; weak buoyancy does not remove forced flow or smoke transport."}</li></ol><p class="sub">${ar ? "\u0627\u0644\u062C\u062F\u0648\u0644 \u064A\u0636\u0645 \u0638\u0631\u0648\u0641\u0627\u064B \u062A\u0627\u0631\u064A\u062E\u064A\u0629 \u0623\u0648 \u062A\u0635\u0645\u064A\u0645\u064A\u0629 \u0645\u0646 \u0645\u0635\u0627\u062F\u0631 NASA\u061B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u062A\u0628\u0642\u0649 \u0645\u0644\u0641\u0627\u062A NASA PSI\u060C \u0648\u0644\u0627 \u064A\u064F\u0633\u062A\u0646\u062A\u062C \u0645\u0646\u0647 \u062A\u0631\u062A\u064A\u0628 \u062E\u0637\u0631 \u0645\u0639\u062A\u0645\u062F." : "The table mixes historical and design-study contexts from NASA sources. The project\u2019s primary experimental evidence remains NASA PSI; these scenarios do not establish a certified hazard ranking."}</p><div class="list-row"><span>NASA OCHMO-TB-003 \xB7 Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA 2026 \xB7 Lunar and Planetary Science Conference atmosphere presentation</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS \u2197</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>Primary experiment context \xB7 NASA PSI-20 / ACME BRE</span><a href="https://psi.nasa.gov/physci/repo/data/investigations/PSI-20" target="_blank" rel="noreferrer">NASA PSI \u2197</a></div></article>`;
  }
  function renderSafetyInsights(lang2 = "en") {
    const ar = lang2 === "ar";
    const cards = ar ? [
      ["1 \xB7 \u0625\u062F\u0627\u0631\u0629 \u062C\u0648 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F", "\u062A\u062D\u062F\u064A\u062F \u0646\u0637\u0627\u0642 \u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0636\u063A\u0637 \u064A\u0641\u064A \u0628\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0633\u064A\u0631 \u0627\u0644\u0641\u0636\u0627\u0626\u064A\u060C \u0645\u0646 \u062F\u0648\u0646 \u0625\u062B\u0631\u0627\u0621 \u063A\u064A\u0631 \u0645\u0628\u0631\u0631\u061B \u062B\u0645 \u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0648\u0627\u062F \u0646\u0641\u0633\u0647\u0627 \u0636\u0645\u0646 \u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0642\u0635\u0648\u062F. \u0644\u0627 \u062A\u0643\u0641\u064A \u0634\u0647\u0627\u062F\u0629 \u0627\u0644\u0645\u0627\u062F\u0629 \u0641\u064A \u0647\u0648\u0627\u0621 \u0627\u0644\u0623\u0631\u0636 \u0648\u062D\u062F\u0647.", "NASA-STD-3001 \xB7 \u0645\u0648\u0627\u0632\u0646\u0629 \u0635\u062D\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062D\u0631\u064A\u0642\u061B PSI-25 \xB7 BASS-II \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631."],
      ["2 \xB7 \u0627\u0644\u062A\u062D\u0643\u0645 \u0628\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0625\u0634\u0639\u0627\u0644", "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u062D\u0631\u0627\u0631\u0629\u060C \u0648\u0625\u0632\u0627\u0644\u0629 \u062A\u0631\u0627\u0643\u0645 \u0627\u0644\u0623\u0644\u064A\u0627\u0641 \u0648\u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644\u060C \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u062A\u064A \u0642\u062F \u062A\u0648\u0644\u0651\u062F \u0634\u0631\u0631\u0627\u064B \u0623\u0648 \u0623\u0633\u0637\u062D\u0627\u064B \u0633\u0627\u062E\u0646\u0629.", "NASA Fire Protection \xB7 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u062C\u0632\u0621 \u0645\u0646 \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u062D\u0645\u0627\u064A\u0629."],
      ["3 \xB7 \u0643\u0634\u0641 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u063A\u0627\u0632\u0627\u062A", "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0648\u0627\u0634\u0641 \u0648\u0641\u0642 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629. \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649 \u0644\u0627 \u064A\u0635\u0639\u062F \u0627\u0644\u062F\u062E\u0627\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0625\u0644\u0649 \u0627\u0644\u0633\u0642\u0641\u061B \u062D\u0631\u0643\u0629 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0642\u0633\u0631\u064A\u0629 \u0645\u0647\u0645\u0629. \u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0624\u0634\u0631\u0627\u062A \u0645\u0646\u0627\u0633\u0628\u0629 \u0645\u062B\u0644 \u0627\u0644\u062C\u0633\u064A\u0645\u0627\u062A \u0648CO \u0648\u0641\u0642 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0646\u0638\u0627\u0645.", "PSI-98 / 99 / 100 \u0648PSI-101 / 102 \xB7 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0645\u0648\u0636\u0648\u0639 \u0645\u0633\u062A\u0642\u0644 \u0639\u0646 \u0633\u0631\u0639\u0629 \u0627\u0644\u0644\u0647\u0628."],
      ["4 \xB7 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629", "\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0639\u0644\u0649 \u0646\u0648\u0639 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u0627\u0644\u0636\u063A\u0637 \u0648xO\u2082 \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629\u060C \u062B\u0645 \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0637\u0627\u0642\u0645 \u0639\u0644\u0649 \u0627\u0644\u0639\u0632\u0644 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629. \u0644\u0627 \u062A\u0648\u062C\u062F \u0648\u0633\u064A\u0644\u0629 \u0648\u0627\u062D\u062F\u0629 \u064A\u0645\u0643\u0646 \u062A\u0639\u0645\u064A\u0645\u0647\u0627 \u0645\u0646 \u0635\u0641\u064A\u0646 \u0623\u0648 \u062A\u062C\u0631\u0628\u0629 \u0645\u062E\u062A\u0644\u0641\u0629.", "NASA OCHMO-TB-008 \xB7 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F \u0645\u0639\u0627\u064B."]
    ] : [
      ["1 \xB7 Manage cabin atmosphere and materials", "Keep oxygen fraction and total pressure within the minimum validated mission and crew-health envelope; do not enrich without a defined need. Then qualify the actual materials across that composition, pressure, and ventilation range. Terrestrial-air qualification alone is not enough.", "NASA-STD-3001 \xB7 crew-health/fire trade; PSI-25 \xB7 BASS-II material-test evidence."],
      ["2 \xB7 Control ignition sources", "Manage electrical and thermal energy, remove lint, dust, and combustible accumulation, and qualify equipment that can create sparks or hot surfaces.", "NASA Fire Protection \xB7 prevention is one layer of an integrated safety strategy."],
      ["3 \xB7 Detect smoke and gases", "Place detectors with cabin ventilation paths in mind. In microgravity smoke does not rise to a ceiling by buoyancy; forced airflow shapes transport. Use validated particle and CO detection suited to the vehicle.", "PSI-98 / 99 / 100 and PSI-101 / 102 address spacecraft fire/smoke evidence, not a universal flame-speed metric."],
      ["4 \xB7 Suppress and respond", "Test suppressant delivery against the actual fuel, geometry, oxygen fraction, pressure, and ventilation. Train isolation and response procedures. Two trials or a different experiment cannot establish a universal best suppressant.", "NASA OCHMO-TB-008 \xB7 prevention, detection, response, and suppression belong together."]
    ];
    const ref = ar ? "\u0645\u0628\u0627\u062F\u0626 \u062A\u0635\u0645\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0634\u063A\u064A\u0644 \u0623\u0648 \u0648\u0635\u0641\u0627\u062A \u0644\u062C\u0648 \u0627\u0644\u0645\u0631\u0643\u0628\u0629." : "Research design implications only; these are not vehicle operating procedures or cabin-atmosphere prescriptions.";
    return `${pageHead(ar ? "\u0627\u0633\u062A\u0646\u062A\u0627\u062C\u0627\u062A \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642" : "Fire Safety Insights", ar ? "\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0623\u062F\u0644\u0629 \u0625\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u062A\u0635\u0645\u064A\u0645 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0646 \u062F\u0648\u0646 \u0627\u062F\u0639\u0627\u0621 \u062A\u0635\u062F\u064A\u0642 \u0623\u0648 \u062A\u0635\u0646\u064A\u0641 \u062E\u0637\u0631 \u0639\u0627\u0645." : "Turn NASA evidence into testable design actions without claiming certification or a universal hazard ranking.")}<div class="equation"><b>${ar ? "\u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u062C\u0632\u0626\u064A" : "Oxygen partial pressure"}</b><code>pO\u2082 = xO\u2082 \xB7 Ptotal</code><p class="sub">${ar ? "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u062D\u062F\u0647\u0627 \u0644\u0627 \u062A\u0643\u0641\u064A \u0644\u0648\u0635\u0641 \u0627\u0644\u062C\u0648. \u062A\u063A\u064A\u0651\u0631 \u0627\u0644\u0636\u063A\u0637 \u0623\u0648 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0642\u062F \u064A\u063A\u064A\u0651\u0631 \u062D\u062F\u0648\u062F \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644\u061B \u0644\u0627 \u0646\u0648\u0635\u064A \u0628\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062C\u0648 \u0644\u0644\u0637\u0627\u0642\u0645." : "Oxygen fraction alone does not define the atmosphere. Changing total pressure or composition changes flammability conditions; this dashboard does not prescribe crew atmosphere settings."}</p></div><div class="grid two safety-grid">${cards.map(([title, body, evidence]) => `<article class="card safety-card"><span class="tag comp">${ar ? "\u0625\u062C\u0631\u0627\u0621 \u0648\u0642\u0627\u0626\u064A" : "DESIGN CONTROL"}</span><h2>${title}</h2><p>${body}</p><div class="callout">${evidence}</div></article>`).join("")}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0623\u0633\u0626\u0644\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0646\u0641\u064A\u0630" : "Actionable qualification questions"}</h2><ol><li>${ar ? "\u0647\u0644 \u0627\u0644\u0645\u0627\u062F\u0629 \u0646\u0641\u0633\u0647\u0627 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0639\u0646\u062F \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u060C \u0644\u0627 \u0639\u0646\u062F \u0646\u0633\u0628\u0629 O\u2082 \u0648\u062D\u062F\u0647\u0627\u061F" : "Was the exact material tested at the expected oxygen partial pressure, not oxygen fraction alone?"}</li><li>${ar ? "\u0647\u0644 \u0627\u062A\u062C\u0627\u0647 \u0648\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0648\u0645\u0648\u0636\u0639 \u0627\u0644\u0643\u0627\u0634\u0641 \u0645\u0637\u0627\u0628\u0642 \u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u061F" : "Do airflow speed/direction and detector location match the intended environment?"}</li><li>${ar ? "\u0647\u0644 \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0625\u062E\u0645\u0627\u062F \u062A\u0642\u064A\u0633 \u0625\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A \u0648\u062A\u0648\u0642\u0641 \u0627\u0644\u062A\u0641\u0627\u0639\u0644 \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A \u0643\u0644\u0651\u064C \u0639\u0644\u0649 \u062D\u062F\u0629\u061F" : "Does the suppression outcome separately measure visible-flame extinction and cessation of chemical reaction?"}</li><li>${ar ? "\u0647\u0644 \u0639\u062F\u062F \u0627\u0644\u062A\u0643\u0631\u0627\u0631\u0627\u062A \u0648\u0639\u062F\u0645 \u0627\u0644\u064A\u0642\u064A\u0646 \u0643\u0627\u0641\u064A\u0627\u0646 \u0642\u0628\u0644 \u062A\u0639\u0645\u064A\u0645 \u0627\u0644\u0627\u0633\u062A\u0646\u062A\u0627\u062C\u061F" : "Are replication and uncertainty adequate before generalizing the result?"}</li></ol><p class="sub">${ref}</p><div class="list-row"><span>NASA OCHMO-TB-008 \xB7 Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 Revision F</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div><div class="list-row"><span>NASA combustion and fire safety investigations</span><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">${ar ? "\u0641\u062A\u062D \u0627\u0644\u0645\u0635\u062F\u0631 \u2197" : "Open source \u2197"}</a></div></article>`;
  }

  // public/csv-safe.js
  function csvCell(value) {
    const raw = value == null ? "" : String(value);
    const safe = typeof value === "string" && /^[\s\uFEFF]*[=+\-@]/u.test(raw) ? `'${raw}` : raw;
    return `"${safe.replaceAll('"', '""')}"`;
  }

  // public/lib/charts.js
  function chartSVG(rows, key, label, unit, color = "#258cb4") {
    const vals = rows.map((r) => r[key]).filter(Number.isFinite);
    if (!vals.length) return `<div class="empty">No measured values for ${label}.</div>`;
    const w = 640, h = 210, p = { l: 48, r: 12, t: 16, b: 38 }, min = Math.min(0, ...vals), max = Math.max(...vals) * 1.12 || 1, xx = (i) => p.l + i * (w - p.l - p.r) / Math.max(1, rows.length - 1), yy = (v) => h - p.b - (v - min) / (max - min) * (h - p.t - p.b);
    const last = rows[rows.length - 1];
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} in ${unit}"><g stroke="var(--line)" stroke-width="1"><line x1="${p.l}" y1="${h - p.b}" x2="${w - p.r}" y2="${h - p.b}"/><line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${h - p.b}"/><line x1="${p.l}" y1="${yy(max * 0.5)}" x2="${w - p.r}" y2="${yy(max * 0.5)}" stroke-dasharray="3 4"/></g><text x="5" y="15" fill="var(--muted)" font-size="9">${esc(label)} (${esc(unit)})</text>${rows.map((r, i) => Number.isFinite(r[key]) ? `<circle cx="${xx(i)}" cy="${yy(Number(r[key]))}" r="4.2" fill="${color}"><title>${esc(r.id || r.test)} \xB7 ${Number(r[key]).toFixed(3)} ${unit}</title></circle>` : "").join("")}<text x="${p.l}" y="${h - 9}" fill="var(--muted)" font-size="9">${esc(rows[0].id || rows[0].date || "Record 1")}</text><text x="${w - p.r}" y="${h - 9}" text-anchor="end" fill="var(--muted)" font-size="9">${esc(last.id || last.date || "Record " + rows.length)}</text><text x="${p.l - 8}" y="${yy(max * 0.5) + 3}" text-anchor="end" fill="var(--muted)" font-size="9">${(max * 0.5).toFixed(2)}</text><text x="${p.l - 8}" y="${yy(min) + 3}" text-anchor="end" fill="var(--muted)" font-size="9">${min.toFixed(2)}</text></svg>`;
  }
  function flexOxygenScatterSVG(rows, labelX, labelY) {
    const points = rows.filter((r) => Number.isFinite(r.oxygen_mole_fraction) && Number.isFinite(r.burning_rate_mm_s));
    if (!points.length) return `<div class="empty">No rows have both oxygen fraction and burning-rate values.</div>`;
    const w = 760, h = 300, p = { l: 64, r: 20, t: 24, b: 52 };
    const xs = points.map((r) => r.oxygen_mole_fraction * 100);
    const ys = points.map((r) => r.burning_rate_mm_s);
    const xmin = Math.min(...xs), xmax = Math.max(...xs), ymin = Math.min(0, ...ys), ymax = Math.max(...ys) * 1.08 || 1;
    const dx = xmax - xmin || 1;
    const xx = (v) => p.l + (v - xmin) / dx * (w - p.l - p.r);
    const yy = (v) => h - p.b - (v - ymin) / (ymax - ymin || 1) * (h - p.t - p.b);
    const ticks = 4;
    const grid = Array.from({ length: ticks + 1 }, (_, i) => {
      const y = ymin + (ymax - ymin) * i / ticks;
      return `<line x1="${p.l}" y1="${yy(y)}" x2="${w - p.r}" y2="${yy(y)}" stroke="var(--line)"/><text x="${p.l - 9}" y="${yy(y) + 3}" text-anchor="end" fill="var(--muted)" font-size="10">${y.toFixed(2)}</text>`;
    }).join("");
    const circles = points.map((r) => {
      var _a;
      const x = r.oxygen_mole_fraction * 100, y = r.burning_rate_mm_s;
      const color = r.test_end === "Extinction" ? "#39a77e" : r.test_end === "Disruption" ? "#d59a3d" : "#7d73d3";
      return `<circle cx="${xx(x)}" cy="${yy(y)}" r="4.2" fill="${color}" fill-opacity=".8" stroke="var(--surface)" stroke-width="1"><title>${esc(r.id)} \xB7 ${esc(r.fuel)} \xB7 O\u2082 ${x.toFixed(1)}% \xB7 K ${y.toFixed(3)} mm\xB2/s \xB7 ${esc((_a = r.pressure_mmHg) != null ? _a : "\u2014")} mmHg \xB7 ${esc(r.test_end)}</title></circle>`;
    }).join("");
    return `<svg class="chart flex-scatter" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(labelX)} against ${esc(labelY)}"><g>${grid}</g><line x1="${p.l}" y1="${h - p.b}" x2="${w - p.r}" y2="${h - p.b}" stroke="var(--muted)"/><line x1="${p.l}" y1="${p.t}" x2="${p.l}" y2="${h - p.b}" stroke="var(--muted)"/>${circles}<text x="${(p.l + w - p.r) / 2}" y="${h - 12}" text-anchor="middle" fill="var(--muted)" font-size="11">${esc(labelX)}</text><text transform="translate(16 ${(p.t + h - p.b) / 2}) rotate(-90)" text-anchor="middle" fill="var(--muted)" font-size="11">${esc(labelY)}</text><text x="${xx(xmin)}" y="${h - p.b + 19}" text-anchor="middle" fill="var(--muted)" font-size="10">${xmin.toFixed(1)}%</text><text x="${xx(xmax)}" y="${h - p.b + 19}" text-anchor="middle" fill="var(--muted)" font-size="10">${xmax.toFixed(1)}%</text></svg>`;
  }

  // public/lib/interactive-charts.js
  var NS = "http://www.w3.org/2000/svg";
  var COLORS = ["#1688be", "#d59a3d", "#39a77e", "#7d73d3", "#d36d7c", "#5077a8"];
  function linearFit(points) {
    if (points.length < 3) return null;
    const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    const meanY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    const variance = points.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
    if (!variance) return null;
    const slope = points.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0) / variance;
    const intercept = meanY - slope * meanX;
    const total = points.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0);
    const residual = points.reduce((sum, point) => sum + (point.y - intercept - slope * point.x) ** 2, 0);
    return { slope, intercept, r2: total ? 1 - residual / total : 1 };
  }
  function tick(value, digits = 3) {
    return Number(value.toFixed(digits)).toString();
  }
  function scientificScatter({
    rows,
    xKey,
    yKey,
    xLabel,
    yLabel,
    xUnit = "",
    yUnit = "",
    xFactor = 1,
    yFactor = 1,
    groupKey = "fuel",
    labels: labels2
  }) {
    const points = rows.filter((row) => Number.isFinite(row[xKey]) && Number.isFinite(row[yKey])).map((row) => ({
      row,
      x: row[xKey] * xFactor,
      y: row[yKey] * yFactor,
      group: String(row[groupKey] || "Unreported")
    }));
    if (!points.length) return '<div class="empty">No source rows contain both measurements.</div>';
    const base = { x: 0, y: 0, width: 800, height: 400 };
    const plot = { left: 86, right: 26, top: 24, bottom: 67 };
    const xMin = Math.min(...points.map((point) => point.x));
    const xMax = Math.max(...points.map((point) => point.x));
    const yMin = Math.min(0, ...points.map((point) => point.y));
    const yMax = Math.max(...points.map((point) => point.y));
    const xPad = (xMax - xMin) * 0.04 || Math.max(Math.abs(xMin) * 0.04, 0.01);
    const yPad = (yMax - yMin) * 0.06 || Math.max(Math.abs(yMax) * 0.06, 0.01);
    const domain = { xMin: xMin - xPad, xMax: xMax + xPad, yMin, yMax: yMax + yPad };
    const sx = (value) => plot.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * (base.width - plot.left - plot.right);
    const sy = (value) => base.height - plot.bottom - (value - domain.yMin) / (domain.yMax - domain.yMin || 1) * (base.height - plot.top - plot.bottom);
    const groups = [...new Set(points.map((point) => point.group))];
    const colorByGroup = new Map(groups.map((group, index) => [group, COLORS[index % COLORS.length]]));
    const fits = groups.map((group) => [group, linearFit(points.filter((point) => point.group === group))]);
    const grid = Array.from({ length: 6 }, (_, index) => {
      const x = domain.xMin + (domain.xMax - domain.xMin) * index / 5;
      const y = domain.yMin + (domain.yMax - domain.yMin) * index / 5;
      return `<line x1="${sx(x)}" y1="${plot.top}" x2="${sx(x)}" y2="${base.height - plot.bottom}" class="chart-gridline"/><line x1="${plot.left}" y1="${sy(y)}" x2="${base.width - plot.right}" y2="${sy(y)}" class="chart-gridline"/><text x="${sx(x)}" y="${base.height - plot.bottom + 19}" class="chart-tick" text-anchor="middle">${tick(x)}</text><text x="${plot.left - 10}" y="${sy(y) + 4}" class="chart-tick" text-anchor="end">${tick(y)}</text>`;
    }).join("");
    const marks = points.map(({ row, x, y, group }) => {
      var _a;
      const info = `${row.id || `Test ${row.test}`} \xB7 ${row.fuel || "Fuel unreported"} \xB7 ${xLabel}: ${tick(x)} ${xUnit} \xB7 ${yLabel}: ${tick(y)} ${yUnit} \xB7 O\u2082 ${(row.oxygen_mole_fraction * 100).toFixed(1)}% \xB7 ${(_a = row.pressure_mmHg) != null ? _a : "\u2014"} mmHg \xB7 ${row.test_end || "End state unreported"}`;
      return `<circle class="chart-point" cx="${sx(x)}" cy="${sy(y)}" r="5" fill="${colorByGroup.get(group)}" fill-opacity=".82" tabindex="0" aria-label="${esc(info)}" data-info="${esc(info)}"><title>${esc(info)}</title></circle>`;
    }).join("");
    const legend = groups.map((group) => `<span><i style="--legend-color:${colorByGroup.get(group)}"></i>${esc(group)}</span>`).join("");
    const fitted = fits.filter(([, fit]) => fit);
    const fitSummary = fitted.length ? `${labels2.fit}: ${fitted.map(([group, fit]) => `${group}: y = ${tick(fit.intercept)} + ${tick(fit.slope)}x, R\xB2 = ${fit.r2.toFixed(3)} (n=${points.filter((point) => point.group === group).length})`).join(" \xB7 ")}` : `${labels2.fitUnavailable}`;
    const trend = fitted.map(
      ([group, fit]) => `<line class="chart-trendline" stroke="${colorByGroup.get(group)}" x1="${sx(domain.xMin)}" y1="${sy(fit.intercept + fit.slope * domain.xMin)}" x2="${sx(domain.xMax)}" y2="${sy(fit.intercept + fit.slope * domain.xMax)}" visibility="hidden"/>`
    ).join("");
    return `<section class="scientific-chart" data-chart-panel><div class="chart-toolbar" role="group" aria-label="${esc(labels2.controls)}"><button type="button" data-chart-action="zoom-in" aria-label="${esc(labels2.zoomIn)}">\uFF0B</button><button type="button" data-chart-action="zoom-out" aria-label="${esc(labels2.zoomOut)}">\u2212</button><button type="button" data-chart-action="reset">${esc(labels2.reset)}</button>${fitted.length ? `<button type="button" data-chart-action="fit" aria-pressed="false">${esc(labels2.fitLine)}</button>` : ""}<button type="button" data-chart-action="draw" aria-pressed="false" data-idle-label="${esc(labels2.drawLine)}" data-active-label="${esc(labels2.drawLineActive)}">${esc(labels2.drawLine)}</button><button type="button" data-chart-action="undo">${esc(labels2.undo)}</button></div><div class="chart-viewport"><svg class="scientific-plot" viewBox="${base.x} ${base.y} ${base.width} ${base.height}" role="img" aria-label="${esc(`${xLabel} versus ${yLabel}`)}"><g class="chart-grid">${grid}</g><line x1="${plot.left}" y1="${base.height - plot.bottom}" x2="${base.width - plot.right}" y2="${base.height - plot.bottom}" class="chart-axis"/><line x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${base.height - plot.bottom}" class="chart-axis"/><g class="chart-trend">${trend}</g><g class="chart-annotations"></g><g>${marks}</g><text x="${(plot.left + base.width - plot.right) / 2}" y="${base.height - 12}" class="chart-axis-label" text-anchor="middle">${esc(xLabel)}${xUnit ? ` (${esc(xUnit)})` : ""}</text><text transform="translate(18 ${(plot.top + base.height - plot.bottom) / 2}) rotate(-90)" class="chart-axis-label" text-anchor="middle">${esc(yLabel)}${yUnit ? ` (${esc(yUnit)})` : ""}</text></svg><div class="chart-tooltip" role="status" hidden></div></div><div class="chart-legend">${legend}</div><p class="sub chart-caption">${esc(labels2.rows)}: n=${points.length}/${rows.length} \xB7 ${esc(labels2.fitNote)} ${esc(fitSummary)}</p></section>`;
  }
  function bindInteractiveCharts(root) {
    root.querySelectorAll("[data-chart-panel]").forEach((panel) => {
      if (panel.dataset.bound === "true") return;
      panel.dataset.bound = "true";
      const svg = panel.querySelector("svg");
      const tooltip = panel.querySelector(".chart-tooltip");
      const initial = svg.viewBox.baseVal;
      const original = { x: initial.x, y: initial.y, width: initial.width, height: initial.height };
      const annotations = svg.querySelector(".chart-annotations");
      let drawing = false;
      let drag = null;
      let lineStart = null;
      const view = () => svg.viewBox.baseVal;
      const setView = (next) => svg.setAttribute("viewBox", `${next.x} ${next.y} ${next.width} ${next.height}`);
      const point = (event) => {
        const p = svg.createSVGPoint();
        p.x = event.clientX;
        p.y = event.clientY;
        return p.matrixTransform(svg.getScreenCTM().inverse());
      };
      const zoom = (factor, anchorX = view().x + view().width / 2, anchorY = view().y + view().height / 2) => {
        const current2 = view();
        const width = Math.max(100, Math.min(original.width * 8, current2.width * factor));
        const height = Math.max(70, Math.min(original.height * 8, current2.height * factor));
        const rx = (anchorX - current2.x) / current2.width;
        const ry = (anchorY - current2.y) / current2.height;
        setView({ x: anchorX - width * rx, y: anchorY - height * ry, width, height });
      };
      panel.querySelectorAll("[data-chart-action]").forEach((button) => {
        button.addEventListener("click", () => {
          var _a;
          const action = button.dataset.chartAction;
          if (action === "zoom-in") zoom(0.78);
          if (action === "zoom-out") zoom(1.28);
          if (action === "reset") setView(original);
          if (action === "fit") {
            const lines = [...svg.querySelectorAll(".chart-trendline")];
            const visible = lines.some((line) => line.getAttribute("visibility") !== "visible");
            lines.forEach((line) => line.setAttribute("visibility", visible ? "visible" : "hidden"));
            button.setAttribute("aria-pressed", String(visible));
          }
          if (action === "draw") {
            drawing = !drawing;
            button.setAttribute("aria-pressed", String(drawing));
            button.textContent = drawing ? button.dataset.activeLabel : button.dataset.idleLabel;
            svg.classList.toggle("drawing-line", drawing);
            lineStart = null;
          }
          if (action === "undo") (_a = annotations.lastElementChild) == null ? void 0 : _a.remove();
        });
      });
      svg.addEventListener(
        "wheel",
        (event) => {
          event.preventDefault();
          const p = point(event);
          zoom(event.deltaY < 0 ? 0.88 : 1.14, p.x, p.y);
        },
        { passive: false }
      );
      svg.addEventListener("pointerdown", (event) => {
        if (event.target.closest(".chart-point")) {
          const info = event.target.closest(".chart-point").dataset.info;
          tooltip.textContent = info;
          tooltip.hidden = false;
          return;
        }
        const p = point(event);
        if (drawing) {
          lineStart = p;
          const line = document.createElementNS(NS, "line");
          line.setAttribute("class", "chart-user-line");
          line.setAttribute("x1", p.x);
          line.setAttribute("y1", p.y);
          line.setAttribute("x2", p.x);
          line.setAttribute("y2", p.y);
          annotations.append(line);
          drag = { kind: "draw", pointerId: event.pointerId, line };
        } else {
          drag = { kind: "pan", pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: __spreadValues({}, view()) };
        }
        svg.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      svg.addEventListener("pointermove", (event) => {
        var _a, _b;
        const mark = (_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, ".chart-point");
        if (mark && event.pointerType !== "touch") {
          tooltip.textContent = mark.dataset.info;
          tooltip.hidden = false;
          const box = panel.querySelector(".chart-viewport").getBoundingClientRect();
          tooltip.style.left = `${Math.max(4, Math.min(box.width - 240, event.clientX - box.left + 12))}px`;
          tooltip.style.top = `${Math.max(4, event.clientY - box.top + 12)}px`;
        }
        if (!drag || drag.pointerId !== event.pointerId) return;
        if (drag.kind === "draw") {
          const p = point(event);
          drag.line.setAttribute("x2", p.x);
          drag.line.setAttribute("y2", p.y);
        } else {
          const rect = svg.getBoundingClientRect();
          const dx = (event.clientX - drag.x) * drag.view.width / rect.width;
          const dy = (event.clientY - drag.y) * drag.view.height / rect.height;
          setView(__spreadProps(__spreadValues({}, drag.view), { x: drag.view.x - dx, y: drag.view.y - dy }));
          if (tooltip) tooltip.hidden = true;
        }
      });
      const stop = (event) => {
        if (!drag || drag.pointerId !== event.pointerId) return;
        if (drag.kind === "draw" && lineStart) {
          const end = point(event);
          if (Math.hypot(end.x - lineStart.x, end.y - lineStart.y) < 4) drag.line.remove();
        }
        drag = null;
        lineStart = null;
      };
      svg.addEventListener("pointerup", stop);
      svg.addEventListener("pointercancel", stop);
      svg.addEventListener("pointerleave", () => {
        if (tooltip) tooltip.hidden = true;
      });
    });
  }

  // public/lib/system-concepts.js
  var copy = {
    en: {
      title: "Research system concepts",
      intro: "Concepts inspired by the Flame in Freefall work. The diagrams explain questions and measurement ideas; they are not qualified hardware or validated suppression systems.",
      model: "HARBOR \xB7 perimeter observation concept",
      modelIntro: "Browse and rotate the original GLB concept models in your browser. The models show research concepts, not qualified hardware.",
      orbit: "Drag to rotate \xB7 scroll to zoom \xB7 use arrow keys to navigate controls",
      spin: "Auto-rotate",
      reset: "Reset camera",
      select: "Choose a 3D concept",
      download: "Download selected GLB",
      gallery: "Download Blender gallery",
      modelLoaded: "3D model ready",
      modelLoading: "Loading 3D model\u2026",
      labelRing: "Perimeter sensor ring",
      labelHood: "Test hood / enclosure",
      labelBase: "Mounting frame",
      concern: "ENGINEERING BOUNDARY",
      concernText: "The current Blender report records about 15 mm minimum sampled surface separation and no sampled BVH overlap for this assembly pose. This is only a visual CAD check; it does not assess manufacturing tolerance, deflection, loads, installation envelope, thermal behavior, or flight qualification.",
      pathway: "2D \xB7 candidate extinction pathways",
      pathwayIntro: "A proposed comparison framework for controlled tests: change one transport or boundary condition at a time and record the response. Pathways below are hypotheses and measurement prompts, not proven suppression outcomes.",
      oxygen: "Oxygen availability",
      oxygenText: "Candidate variable: local oxidizer concentration. Measure concentration and flow independently.",
      flow: "Forced flow",
      flowText: "Candidate variable: imposed ventilation velocity and direction. Do not infer it from flame shape.",
      heat: "Heat transfer",
      heatText: "Candidate response: temperature history and heat loss at defined locations.",
      fuel: "Fuel boundary",
      fuelText: "Candidate variable: fuel form, exposed area, and supply condition, controlled per test protocol.",
      source: "Evidence and design boundary",
      sourceText: "NASA research motivates the scientific questions. These concepts are MORS research proposals; the cited studies did not test or endorse these devices.",
      ntrs: "NASA NTRS \xB7 SoFIE-GEL investigation",
      psi: "NASA PSI \xB7 Combustion Science",
      note: "PSI-69 droplet burning-rate measurements do not validate solid-material behavior or these proposed system concepts.",
      status: "Concept only \xB7 no prototype test or qualification"
    },
    ar: {
      title: "\u062A\u0635\u0627\u0645\u064A\u0645 \u0623\u0646\u0638\u0645\u0629 \u0628\u062D\u062B\u064A\u0629",
      intro: "\u0623\u0641\u0643\u0627\u0631 \u0645\u0633\u062A\u0644\u0647\u0645\u0629 \u0645\u0646 \u0639\u0645\u0644 Flame in Freefall. \u062A\u0634\u0631\u062D \u0627\u0644\u0631\u0633\u0648\u0645\u0627\u062A \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0628\u062D\u062B \u0648\u0623\u0641\u0643\u0627\u0631 \u0627\u0644\u0642\u064A\u0627\u0633\u061B \u0648\u0644\u064A\u0633\u062A \u0639\u062A\u0627\u062F\u0627\u064B \u0645\u0624\u0647\u0644\u0627\u064B \u0623\u0648 \u0623\u0646\u0638\u0645\u0629 \u0625\u062E\u0645\u0627\u062F \u0645\u062B\u0628\u062A\u0629.",
      model: "HARBOR \xB7 \u0645\u0641\u0647\u0648\u0645 \u0631\u0635\u062F \u0645\u062D\u064A\u0637\u064A",
      modelIntro: "\u062A\u0635\u0641\u0651\u062D \u0646\u0645\u0627\u0630\u062C GLB \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0648\u062F\u0648\u0651\u0631\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u062A\u0635\u0641\u062D. \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0645\u0641\u0627\u0647\u064A\u0645 \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u0639\u062A\u0627\u062F\u0627\u064B \u0645\u0624\u0647\u0644\u0627\u064B.",
      orbit: "\u0627\u0633\u062D\u0628 \u0644\u0644\u062A\u062F\u0648\u064A\u0631 \xB7 \u0643\u0628\u0651\u0631 \u0628\u0639\u062C\u0644\u0629 \u0627\u0644\u0641\u0623\u0631\u0629 \xB7 \u0627\u0633\u062A\u062E\u062F\u0645 Tab \u0644\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0627\u0644\u0623\u0632\u0631\u0627\u0631",
      spin: "\u062A\u062F\u0648\u064A\u0631 \u062A\u0644\u0642\u0627\u0626\u064A",
      reset: "\u0625\u0639\u0627\u062F\u0629 \u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627",
      select: "\u0627\u062E\u062A\u0631 \u062A\u0635\u0645\u064A\u0645\u0627\u064B \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F",
      download: "\u062A\u0646\u0632\u064A\u0644 \u0646\u0645\u0648\u0630\u062C GLB \u0627\u0644\u0645\u062E\u062A\u0627\u0631",
      gallery: "\u062A\u0646\u0632\u064A\u0644 \u0645\u0639\u0631\u0636 Blender",
      modelLoaded: "\u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062C\u0627\u0647\u0632",
      modelLoading: "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F\u2026",
      labelRing: "\u062D\u0644\u0642\u0629 \u062D\u0633\u0627\u0633\u0627\u062A \u0645\u062D\u064A\u0637\u064A\u0629",
      labelHood: "\u063A\u0637\u0627\u0621 / \u062D\u064A\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631",
      labelBase: "\u0625\u0637\u0627\u0631 \u062A\u062B\u0628\u064A\u062A",
      concern: "\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0647\u0646\u062F\u0633\u064A",
      concernText: "\u064A\u0633\u062C\u0644 \u062A\u0642\u0631\u064A\u0631 Blender \u0627\u0644\u062D\u0627\u0644\u064A \u0641\u0627\u0635\u0644\u0627\u064B \u0633\u0637\u062D\u064A\u0627\u064B \u0623\u062F\u0646\u0649 \u064A\u0642\u0627\u0631\u0628 \u0661\u0665 \u0645\u0645 \u062F\u0648\u0646 \u062A\u062F\u0627\u062E\u0644 BVH \u0645\u0631\u0635\u0648\u062F \u0641\u064A \u0648\u0636\u0639\u064A\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0639\u0629. \u0647\u0630\u0627 \u0641\u062D\u0635 CAD \u0628\u0635\u0631\u064A \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u0642\u064A\u0651\u0645 \u0633\u0645\u0627\u062D\u0627\u062A \u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0623\u0648 \u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0623\u0648 \u0627\u0644\u0623\u062D\u0645\u0627\u0644 \u0623\u0648 \u062D\u064A\u0632 \u0627\u0644\u062A\u0631\u0643\u064A\u0628 \u0623\u0648 \u0627\u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u062D\u0631\u0627\u0631\u064A \u0623\u0648 \u0627\u0644\u062A\u0623\u0647\u064A\u0644 \u0644\u0644\u0637\u064A\u0631\u0627\u0646.",
      pathway: "\u0662D \xB7 \u0645\u0633\u0627\u0631\u0627\u062A \u0625\u062E\u0645\u0627\u062F \u0645\u062D\u062A\u0645\u0644\u0629",
      pathwayIntro: "\u0625\u0637\u0627\u0631 \u0645\u0642\u0627\u0631\u0646\u0629 \u0645\u0642\u062A\u0631\u062D \u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0645\u0636\u0628\u0648\u0637\u0629: \u062A\u063A\u064A\u064A\u0631 \u0634\u0631\u0637 \u0627\u0646\u062A\u0642\u0627\u0644 \u0623\u0648 \u062D\u062F\u0651\u064A \u0648\u0627\u062D\u062F \u0641\u064A \u0643\u0644 \u0645\u0631\u0629 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629. \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0623\u062F\u0646\u0627\u0647 \u0641\u0631\u0636\u064A\u0627\u062A \u0648\u0645\u062D\u0641\u0632\u0627\u062A \u0644\u0644\u0642\u064A\u0627\u0633\u060C \u0648\u0644\u064A\u0633\u062A \u0646\u062A\u0627\u0626\u062C \u0625\u062E\u0645\u0627\u062F \u0645\u062B\u0628\u062A\u0629.",
      oxygen: "\u062A\u0648\u0641\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646",
      oxygenText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u062A\u0631\u0643\u064A\u0632 \u0627\u0644\u0645\u0624\u0643\u0633\u062F \u0645\u062D\u0644\u064A\u0627\u064B. \u064A\u0642\u0627\u0633 \u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0648\u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0643\u0644\u0651\u064C \u0639\u0644\u0649 \u062D\u062F\u0629.",
      flow: "\u0627\u0644\u062C\u0631\u064A\u0627\u0646 \u0627\u0644\u0642\u0633\u0631\u064A",
      flowText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u0629 \u0648\u0627\u062A\u062C\u0627\u0647\u0647\u0627. \u0644\u0627 \u064A\u064F\u0633\u062A\u0646\u062A\u062C \u0645\u0646 \u0634\u0643\u0644 \u0627\u0644\u0644\u0647\u0628.",
      heat: "\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629",
      heatText: "\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0645\u062D\u062A\u0645\u0644\u0629: \u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0641\u0642\u062F\u0647\u0627 \u0639\u0646\u062F \u0645\u0648\u0627\u0636\u0639 \u0645\u062D\u062F\u062F\u0629.",
      fuel: "\u062D\u062F\u0648\u062F \u0627\u0644\u0648\u0642\u0648\u062F",
      fuelText: "\u0645\u062A\u063A\u064A\u0631 \u0645\u062D\u062A\u0645\u0644: \u0634\u0643\u0644 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0645\u0633\u0627\u062D\u062A\u0647 \u0627\u0644\u0645\u0643\u0634\u0648\u0641\u0629 \u0648\u0638\u0631\u0648\u0641 \u062A\u063A\u0630\u064A\u062A\u0647\u060C \u0648\u0641\u0642 \u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631.",
      source: "\u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062D\u062F\u0648\u062F \u0627\u0644\u062A\u0635\u0645\u064A\u0645",
      sourceText: "\u062A\u064F\u0644\u0647\u0645 \u0623\u0628\u062D\u0627\u062B NASA \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0639\u0644\u0645\u064A\u0629. \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0627\u062A \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0645\u0646 MORS\u061B \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0644\u0645 \u062A\u062E\u062A\u0628\u0631 \u0647\u0630\u0647 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0648\u0644\u0645 \u062A\u0639\u062A\u0645\u062F\u0647\u0627.",
      ntrs: "NASA NTRS \xB7 \u062A\u062D\u0642\u064A\u0642 SoFIE-GEL",
      psi: "NASA PSI \xB7 \u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642",
      note: "\u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0641\u064A PSI-69 \u0644\u0627 \u062A\u062A\u062D\u0642\u0642 \u0645\u0646 \u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0623\u0648 \u0645\u0646 \u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629 \u0647\u0646\u0627.",
      status: "\u0645\u0641\u0647\u0648\u0645 \u0641\u0642\u0637 \xB7 \u0644\u0627 \u0627\u062E\u062A\u0628\u0627\u0631 \u0644\u0646\u0645\u0648\u0630\u062C \u0623\u0648\u0644\u064A \u0623\u0648 \u062A\u0623\u0647\u064A\u0644"
    }
  };
  async function renderSystemConcepts(lang2 = "en") {
    const x = copy[lang2 === "ar" ? "ar" : "en"];
    const t2 = (key) => x[key];
    await import("/vendor/model-viewer.min.js");
    const response = await fetch("/models/catalog.json");
    if (!response.ok) throw new Error("3D model catalog is unavailable.");
    const models = await response.json();
    const featured = ["HARBOR-PERIMETER-SCAN-assembly.glb", "HARBOR-perimeter-sensor-ring.glb", "HARBOR-DOCK-MIST-robot.glb", "PULSE-MIST-cassette.glb", "VAPOR-TRACE-spool.glb"];
    const ordered = [...featured.map((name) => models.find((model) => model.file === name)).filter(Boolean), ...models.filter((model) => !featured.includes(model.file))];
    const selected = ordered[0];
    return `<div class="system-concepts">
    <div class="page-head"><div><div class="eyebrow">MORS AEGIS \xB7 FLAME IN FREEFALL</div><h2>${t2("title")}</h2><p class="sub">${t2("intro")}</p></div></div>
    <article class="card concept-card"><div class="card-head"><div><h3>${t2("model")}</h3><p class="sub">${t2("modelIntro")}</p></div><span class="concept-badge">${ordered.length} ${lang2 === "ar" ? "\u0646\u0645\u0648\u0630\u062C\u0627\u064B \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "3D models"}</span></div>
      <div class="concept-controls" role="group" aria-label="${t2("model")}"><label class="model-picker">${t2("select")}<select id="conceptModel">${ordered.map((model) => `<option value="${model.file}"${model.file === selected.file ? " selected" : ""}>${model.title}</option>`).join("")}</select></label><button class="outline-btn" type="button" data-model-spin aria-pressed="false">${t2("spin")}</button><button class="quiet-btn" type="button" data-model-reset>${t2("reset")}</button><span class="sub">${t2("orbit")}</span></div>
      <model-viewer id="conceptViewer" class="model-viewer" src="/models/${selected.file}" alt="${selected.title} \u2014 ${t2("status")}" camera-controls shadow-intensity="0.8" exposure="1" interaction-prompt="auto" loading="eager" reveal="auto"></model-viewer>
      <div class="concept-model-meta"><span id="modelStatus" class="sub" role="status" aria-live="polite">${t2("modelLoading")}</span><a id="modelDownload" class="outline-btn" href="/models/${selected.file}" download>${t2("download")}</a><a class="outline-btn" href="/models/FLAME-IN-FREEFALL-3D-GALLERY.blend" download>${t2("gallery")}</a></div>
      <div class="callout warn"><b>${t2("concern")}:</b> ${t2("concernText")} <a href="/models/methods/harbor_perimeter_scan_clearance.json" target="_blank" rel="noopener noreferrer">${lang2 === "ar" ? "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0641\u062D\u0635" : "View clearance report"} \u2197</a></div></article>
    <article class="card concept-card"><div class="card-head"><div><h3>${t2("pathway")}</h3><p class="sub">${t2("pathwayIntro")}</p></div><span class="concept-badge">${t2("status")}</span></div>
      <svg class="pathway-svg" viewBox="0 0 900 300" role="img" aria-label="${t2("pathway")}"><defs><marker id="pathArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#64bddd"/></marker></defs><rect class="path-core" x="370" y="105" width="160" height="90" rx="20"/><text class="path-core-text" x="450" y="141">${lang2 === "ar" ? "\u062D\u062C\u0645 \u0627\u062E\u062A\u0628\u0627\u0631" : "TEST VOLUME"}</text><text class="path-core-sub" x="450" y="166">${lang2 === "ar" ? "\u0645\u0642\u062A\u0631\u062D \u0644\u0644\u0642\u064A\u0627\u0633" : "PROPOSED MEASUREMENTS"}</text>
      <path class="path-link" d="M365 122 245 72"/><path class="path-link" d="M535 122 655 72"/><path class="path-link" d="M365 178 245 228"/><path class="path-link" d="M535 178 655 228"/>
      <g class="path-node"><rect x="20" y="28" width="230" height="82" rx="14"/><text x="135" y="60">${t2("oxygen")}</text><text class="path-small" x="135" y="83">O\u2082 \xB7 \u0394C (measure)</text></g><g class="path-node"><rect x="650" y="28" width="230" height="82" rx="14"/><text x="765" y="60">${t2("flow")}</text><text class="path-small" x="765" y="83">u \xB7 direction (measure)</text></g><g class="path-node"><rect x="20" y="190" width="230" height="82" rx="14"/><text x="135" y="222">${t2("heat")}</text><text class="path-small" x="135" y="245">T(t) \xB7 q (measure)</text></g><g class="path-node"><rect x="650" y="190" width="230" height="82" rx="14"/><text x="765" y="222">${t2("fuel")}</text><text class="path-small" x="765" y="245">form \xB7 area \xB7 feed</text></g></svg>
      <div class="grid two concept-notes"><div><h4>${t2("oxygen")}</h4><p class="sub">${t2("oxygenText")}</p></div><div><h4>${t2("flow")}</h4><p class="sub">${t2("flowText")}</p></div><div><h4>${t2("heat")}</h4><p class="sub">${t2("heatText")}</p></div><div><h4>${t2("fuel")}</h4><p class="sub">${t2("fuelText")}</p></div></div>
      <div class="list-row"><span>EXTINCTION-PATHWAY-MAP \xB7 GLB</span><a href="/models/EXTINCTION-PATHWAY-MAP-rig.glb" download>${lang2 === "ar" ? "\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F" : "Download 3D rig"} \u2197</a></div><div class="list-row"><span>EXTINCTION-PATHWAY-MAP \xB7 method</span><a href="/models/methods/extinction_pathway_map_method_ar.md" target="_blank" rel="noopener noreferrer">${lang2 === "ar" ? "\u0627\u0644\u0645\u0646\u0647\u062C \u0648\u0627\u0644\u062D\u062F\u0648\u062F" : "Method and limits"} \u2197</a></div></article>
    <article class="card"><h3>${t2("source")}</h3><p class="sub">${t2("sourceText")}</p>
      <div class="list-row"><span>NASA PSI-25 \xB7 BASS-II</span><a href="https://psi.nasa.gov/physci/repo/investigation/PSI-25" target="_blank" rel="noopener noreferrer">NASA PSI \u2197</a></div>
      <div class="list-row"><span>NASA NTRS 20130000582 \xB7 local jet/wake</span><a href="https://ntrs.nasa.gov/citations/20130000582" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA NTRS 20240007628 \xB7 SoFIE-GEL</span><a href="https://ntrs.nasa.gov/citations/20240007628" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA MIST \xB7 NASA NTRS 20040053582</span><a href="https://ntrs.nasa.gov/citations/20040053582" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="list-row"><span>NASA FWM PFE \xB7 NTRS 20110012300</span><a href="https://ntrs.nasa.gov/citations/20110012300" target="_blank" rel="noopener noreferrer">NASA NTRS \u2197</a></div>
      <div class="callout">${t2("note")}</div><a href="/models/methods/harbor_perimeter_scan_method_ar.md" target="_blank" rel="noopener noreferrer">HARBOR measurement method \u2197</a> \xB7 <a href="/models/methods/pulse_mist_method_ar.md" target="_blank" rel="noopener noreferrer">PULSE-MIST method \u2197</a> \xB7 <a href="/models/methods/vapor_trace_method_ar.md" target="_blank" rel="noopener noreferrer">VAPOR-TRACE method \u2197</a></article>
  </div>`;
  }
  function bindSystemConcepts(root, lang2 = "en") {
    const viewer = root.querySelector("#conceptViewer");
    const picker = root.querySelector("#conceptModel");
    const status = root.querySelector("#modelStatus");
    const download2 = root.querySelector("#modelDownload");
    const spin = root.querySelector("[data-model-spin]");
    const reset = root.querySelector("[data-model-reset]");
    if (!viewer || !picker) return;
    const ready = copy[lang2 === "ar" ? "ar" : "en"].modelLoaded;
    const loading = copy[lang2 === "ar" ? "ar" : "en"].modelLoading;
    viewer.addEventListener("load", () => {
      if (status) status.textContent = ready;
    });
    viewer.addEventListener("error", () => {
      if (status) status.textContent = lang2 === "ar" ? "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u0627\u0633\u062A\u062E\u062F\u0645 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631." : "Could not load this model. Use the direct download link.";
    });
    if (viewer.loaded && status) status.textContent = ready;
    picker.addEventListener("change", () => {
      var _a;
      const file = picker.value;
      viewer.src = `/models/${encodeURIComponent(file)}`;
      viewer.alt = `${((_a = picker.selectedOptions[0]) == null ? void 0 : _a.textContent) || file} \u2014 ${copy[lang2 === "ar" ? "ar" : "en"].status}`;
      if (download2) download2.href = `/models/${encodeURIComponent(file)}`;
      if (status) status.textContent = loading;
    });
    spin == null ? void 0 : spin.addEventListener("click", () => {
      viewer.autoRotate = !viewer.autoRotate;
      spin.setAttribute("aria-pressed", String(viewer.autoRotate));
      spin.classList.toggle("active", viewer.autoRotate);
    });
    reset == null ? void 0 : reset.addEventListener("click", () => {
      viewer.cameraOrbit = "auto auto auto";
      viewer.fieldOfView = "auto";
      viewer.jumpCameraToGoal();
      viewer.resetTurntableRotation();
    });
  }

  // public/app.js
  var nav = [
    ["Overview", "Challenge overview", "\u2302", "COMMAND"],
    ["Flame Physics", "Gravity, transport & flame behavior", "\u223F", "SCIENCE"],
    ["Mission Atmospheres", "Oxygen, pressure & EVA transitions", "\u25C9", "SCIENCE"],
    ["Safety Insights", "Prevention, detection & suppression", "\u25C7", "SCIENCE"],
    ["System Concepts", "HARBOR observation concept & microgravity fire-response map", "\u2318", "SCIENCE"],
    ["Mission Lessons", "NASA incidents & technology transfer", "\u2301", "SCIENCE"],
    ["Challenge Evidence", "NASA PSI investigation tables", "\u25A4", "SCIENCE"],
    ["Investigation Lab", "Study-specific NASA PSI evidence summaries", "\u25C9", "ANALYSIS"],
    ["Analysis Workbench", "FLEX-only descriptive analysis", "\u2211", "ANALYSIS"],
    ["Comparison Studio", "Compare matched FLEX tests", "\u25EB", "ANALYSIS"],
    ["AI Copilot", "Evidence-grounded research assistant", "\u2727", "RESEARCH"],
    ["Sources", "NASA PSI sources & methods", "\u25CE", "RESEARCH"],
    ["Reports", "Scientific reports & exports", "\u2197", "RESEARCH"],
    ["Settings", "Language & appearance", "\u2699", "SYSTEM"]
  ];
  function pageFromHash() {
    try {
      const requested = decodeURIComponent(location.hash.slice(1));
      return nav.some(([name]) => name === requested) ? requested : "Overview";
    } catch (e) {
      return "Overview";
    }
  }
  function storageGet(key, fallback = null) {
    var _a;
    try {
      return (_a = window.localStorage.getItem(key)) != null ? _a : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
    }
  }
  var current = pageFromHash();
  var lang = storageGet("mors-lang", "en");
  var theme = storageGet("mors-theme", "arctic");
  var dataset = null;
  var analysis = null;
  var chatThread = [];
  var chatBusy = false;
  var navigationId = 0;
  try {
    const saved = JSON.parse(storageGet("mors-chat-v1", "[]"));
    if (Array.isArray(saved))
      chatThread = saved.filter((m) => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string").slice(-60).map((m) => ({
        role: m.role,
        content: m.content.slice(0, 8e3),
        provider: typeof m.provider === "string" ? m.provider.slice(0, 120) : "",
        citation: m.role === "assistant" ? "/psi-69" : "",
        toolsExecuted: Array.isArray(m.toolsExecuted) ? m.toolsExecuted.slice(0, 3).filter(
          (x) => x && ["runAnalysis", "compareExperiments", "pearson", "lookupExperiment"].includes(x.tool) && x.status === "complete"
        ).map((x) => ({
          tool: x.tool,
          status: "complete",
          evidence: x.tool === "lookupExperiment" ? "OBSERVED" : "COMPUTED",
          resultSha256: typeof x.resultSha256 === "string" ? x.resultSha256.slice(0, 64) : ""
        })) : []
      }));
  } catch (e) {
    chatThread = [];
  }
  var t = (a, b) => lang === "ar" ? b : a;
  var navArabic = {
    Overview: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
    "Flame Physics": "\u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628",
    "Mission Atmospheres": "\u0623\u062C\u0648\u0627\u0621 \u0627\u0644\u0645\u0647\u0645\u0627\u062A",
    "Safety Insights": "\u0631\u0624\u0649 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642",
    "System Concepts": "\u062A\u0635\u0627\u0645\u064A\u0645 \u0627\u0644\u0623\u0646\u0638\u0645\u0629",
    "Mission Lessons": "\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0647\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0629",
    "Challenge Evidence": "\u0623\u062F\u0644\u0629 \u0627\u0644\u062A\u062D\u062F\u064A",
    "Investigation Lab": "\u0645\u062E\u062A\u0628\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A",
    "Analysis Workbench": "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644",
    "Comparison Studio": "\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u0628",
    "AI Copilot": "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0628\u062D\u0627\u062B",
    Sources: "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0627\u0644\u0645\u0646\u0647\u062C\u064A\u0629",
    Reports: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",
    Settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A"
  };
  var sectionArabic = {
    COMMAND: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    SCIENCE: "\u0627\u0644\u0639\u0644\u0645",
    ANALYSIS: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644",
    RESEARCH: "\u0627\u0644\u0628\u062D\u062B",
    SYSTEM: "\u0627\u0644\u0646\u0638\u0627\u0645"
  };
  var pageLabel = (key) => lang === "ar" ? navArabic[key] || key : key;
  function setTheme() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
    document.body.className = (theme === "space" ? "theme-space" : theme === "observatory" ? "theme-observatory" : "") + (lang === "ar" ? " rtl" : "");
    $("#themeBtn").textContent = t(
      "Theme \xB7 " + { arctic: "Arctic", space: "Deep Space", observatory: "Observatory" }[theme],
      "\u0627\u0644\u0645\u0638\u0647\u0631 \xB7 " + { arctic: "\u0642\u0637\u0628\u064A", space: "\u0641\u0636\u0627\u0621 \u0639\u0645\u064A\u0642", observatory: "\u0645\u0631\u0635\u062F" }[theme]
    );
  }
  function renderNav() {
    const n = $("#nav");
    let group = "";
    n.innerHTML = nav.map(([k, label, ico, section]) => {
      const heading = section !== group ? `<div class="nav-group">${lang === "ar" ? sectionArabic[section] : section}</div>` : "";
      group = section;
      return `${heading}<button data-page="${k}" title="${esc(lang === "ar" ? label : navArabic[k] || label)}" ${current === k ? 'aria-current="page"' : ""} class="${current === k ? "active" : ""}"><span class="nav-icon">${ico}</span>${esc(lang === "ar" ? navArabic[k] || label : label)}</button>`;
    }).join("");
    n.querySelectorAll("button").forEach((b) => b.onclick = () => go(b.dataset.page));
  }
  function rowsTable(rows) {
    return `<div class="table-wrap"><table><thead><tr><th>${t("Test ID", "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")}</th><th>${t("Date \xB7 UTC", "\u0627\u0644\u062A\u0627\u0631\u064A\u062E \xB7 UTC")}</th><th>${t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F")}</th><th>${t("Pressure \xB7 mmHg", "\u0627\u0644\u0636\u063A\u0637 \xB7 mmHg")}</th><th>O\u2082</th><th>CO\u2082</th><th>He</th><th>${t("Droplet \xB7 mm", "\u0627\u0644\u0642\u0637\u0631\u0629 \xB7 mm")}</th><th>${t("Extinction \xB7 mm", "\u0627\u0644\u0625\u062E\u0645\u0627\u062F \xB7 mm")}</th><th>${t("Burn-rate constant \xB7 mm\xB2/s", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 mm\xB2/s")}</th><th>${t("Burn \xB7 s", "\u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \xB7 s")}</th><th>${t("End state", "\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629")}</th></tr></thead><tbody>${rows.map((r) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return `<tr><td class="mono">${esc(r.id)}</td><td>${esc(r.date)} <span class="mono">${esc(r.time_utc)}</span></td><td>${esc(r.fuel)}</td><td>${esc((_a = r.pressure_mmHg) != null ? _a : "\u2014")}</td><td>${esc((_b = r.oxygen_mole_fraction) != null ? _b : "\u2014")}</td><td>${esc((_c = r.carbon_dioxide_mole_fraction) != null ? _c : "\u2014")}</td><td>${esc((_d = r.helium_mole_fraction) != null ? _d : "\u2014")}</td><td>${esc((_e = r.initial_droplet_diameter_mm) != null ? _e : "\u2014")}</td><td>${esc((_f = r.visible_flame_extinction_diameter_mm) != null ? _f : "\u2014")}</td><td>${esc((_g = r.burning_rate_mm_s) != null ? _g : "\u2014")}</td><td>${esc((_h = r.burn_time_s) != null ? _h : "\u2014")}</td><td>${esc(r.test_end)}</td></tr>`;
    }).join("")}</tbody></table></div>`;
  }
  function hero() {
    return `<div class="hero"><div class="hero-copy"><div class="eyebrow">MORS AEGIS \xB7 FLAME IN FREEFALL</div><h2>${t("NASA microgravity combustion evidence, connected to fire-safety research.", "\u0623\u062F\u0644\u0629 \u0646\u0627\u0633\u0627 \u0639\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0628\u062D\u0648\u062B \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u0627\u0626\u0642.")}</h2><p>${t("Explore challenge-relevant NASA PSI investigations, inspect original experiment tables, and compare what gravity changes in flame transport. Every study remains linked to its own evidence and limits.", "\u0627\u0633\u062A\u0643\u0634\u0641 \u062A\u062D\u0642\u064A\u0642\u0627\u062A NASA PSI \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u060C \u0648\u0627\u0641\u062D\u0635 \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0623\u0635\u0644\u064A\u0629\u060C \u0648\u0642\u0627\u0631\u0646 \u0623\u062B\u0631 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0639\u0644\u0649 \u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u062F. \u0644\u0643\u0644 \u062F\u0631\u0627\u0633\u0629 \u0645\u0635\u062F\u0631\u0647\u0627 \u0648\u062D\u062F\u0648\u062F\u0647\u0627.")}</p><div class="hero-actions"><button class="primary-btn" data-go="Challenge Evidence">${t("Explore NASA PSI data \u2192", "\u0627\u0633\u062A\u0643\u0634\u0641 \u0628\u064A\u0627\u0646\u0627\u062A NASA PSI \u2190")}</button><button class="secondary-btn" data-go="Flame Physics">${t("Study flame physics \u2192", "\u0627\u0641\u0647\u0645 \u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u2190")}</button></div></div><div class="hero-meta">NASA PSI \xB7 COMBUSTION SCIENCE<br>${t("CHALLENGE-SCOPED \xB7 INVESTIGATION-LEVEL EVIDENCE", "\u0646\u0637\u0627\u0642 \u0627\u0644\u062A\u062D\u062F\u064A \xB7 \u0627\u0644\u0623\u062F\u0644\u0629 \u062D\u0633\u0628 \u0643\u0644 \u062A\u062D\u0642\u064A\u0642")}</div></div>`;
  }
  function flexScatterPanel() {
    const fuels = [...new Set(dataset.rows.map((row) => row.fuel).filter(Boolean))].sort();
    const options = fuels.map((fuel) => `<option value="${esc(fuel)}">${esc(fuel)}</option>`).join("");
    const included = dataset.rows.filter(
      (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s)
    ).length;
    return `<article class="card flex-scatter-card"><div class="card-head"><div><h3>${t("PSI-69 \xB7 Oxygen fraction and droplet burning rate", "PSI-69 \xB7 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629")}</h3><p class="sub">${t("Each point is one NASA FLEX source row. Hover for test ID, fuel, pressure and recorded end state.", "\u0643\u0644 \u0646\u0642\u0637\u0629 \u062A\u0645\u062B\u0644 \u0635\u0641\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0645\u0646 NASA FLEX. \u0645\u0631\u0631 \u0627\u0644\u0645\u0624\u0634\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0639\u0631\u0651\u0641 \u0648\u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629.")}</p></div><span class="tag obs">${t("OBSERVED ROWS", "\u0635\u0641\u0648\u0641 \u0645\u0631\u0635\u0648\u062F\u0629")}</span></div><div class="toolbar"><label>${t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F")} <select id="flexScatterFuel"><option value="">${t("All fuels", "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F")}</option>${options}</select></label><label>${t("Pressure \xB7 mmHg", "\u0627\u0644\u0636\u063A\u0637 \xB7 mmHg")} <select id="flexScatterPressure"><option value="all">${t("All pressures", "\u0643\u0644 \u0627\u0644\u0636\u063A\u0648\u0637")}</option><option value="low">\u2264 760</option><option value="mid">760\u20131520</option><option value="high">&gt; 1520</option><option value="unknown">${t("Unreported", "\u063A\u064A\u0631 \u0645\u0633\u062C\u0644")}</option></select></label></div><div id="flexScatterPlot">${flexOxygenScatterSVG(dataset.rows, t("Oxygen mole fraction (%)", "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 (%)"), t("Droplet burning-rate constant (mm\xB2/s)", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 (mm\xB2/s)"))}</div><p class="sub" id="flexScatterCount">${t("Rows shown", "\u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629")}: n=${included} / ${dataset.rows.length} ${t("source rows with both plotted values", "\u0635\u0641 \u0645\u0635\u062F\u0631 \u064A\u062D\u0648\u064A \u0627\u0644\u0642\u064A\u0645\u062A\u064A\u0646")}</p><div class="legend"><span style="--legend-color:#39a77e">${t("Source test_end: Extinction", "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 test_end: Extinction")}</span><span style="--legend-color:#d59a3d">${t("Source test_end: Disruption", "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0635\u062F\u0631 test_end: Disruption")}</span><span style="--legend-color:#7d73d3">${t("Other / source label", "\u0623\u062E\u0631\u0649 / \u062A\u0633\u0645\u064A\u0629 \u0627\u0644\u0645\u0635\u062F\u0631")}</span></div><div class="callout warn">${t("The FLEX burning-rate constant is for liquid droplets under the d\xB2 law, not solid-material flame-spread speed. These points are descriptive; mixed conditions do not establish an oxygen effect or causality. Source: PSI-69 \xB7 DOI 10.60555/mbq8-0451.", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0641\u064A FLEX \u062E\u0627\u0635 \u0628\u0627\u0644\u0642\u0637\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0626\u0644\u0629 \u0648\u0641\u0642 \u0642\u0627\u0646\u0648\u0646 d\xB2\u060C \u0648\u0644\u064A\u0633 \u0633\u0631\u0639\u0629 \u0627\u0646\u062A\u0634\u0627\u0631 \u0627\u0644\u0644\u0647\u0628 \u0639\u0644\u0649 \u0645\u0627\u062F\u0629 \u0635\u0644\u0628\u0629. \u0627\u0644\u0646\u0642\u0627\u0637 \u0648\u0635\u0641\u064A\u0629\u061B \u0627\u062E\u062A\u0644\u0627\u0641 \u0627\u0644\u0634\u0631\u0648\u0637 \u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0623\u0648 \u0627\u0644\u0633\u0628\u0628\u064A\u0629. \u0627\u0644\u0645\u0635\u062F\u0631: PSI-69 \xB7 DOI 10.60555/mbq8-0451.")}</div></article>`;
  }
  function bindFlexScatter(root) {
    const fuel = root.querySelector("#flexScatterFuel");
    const pressure = root.querySelector("#flexScatterPressure");
    const plot = root.querySelector("#flexScatterPlot");
    const count = root.querySelector("#flexScatterCount");
    if (!fuel || !pressure || !plot) return;
    const update = () => {
      const rows = dataset.rows.filter((row) => {
        if (fuel.value && row.fuel !== fuel.value) return false;
        if (pressure.value === "unknown") return !Number.isFinite(row.pressure_mmHg);
        if (!Number.isFinite(row.pressure_mmHg) && pressure.value !== "all") return false;
        if (pressure.value === "low") return row.pressure_mmHg <= 760;
        if (pressure.value === "mid") return row.pressure_mmHg > 760 && row.pressure_mmHg <= 1520;
        if (pressure.value === "high") return row.pressure_mmHg > 1520;
        return true;
      });
      plot.innerHTML = flexOxygenScatterSVG(
        rows,
        t("Oxygen mole fraction (%)", "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646 (%)"),
        t("Droplet burning-rate constant (mm\xB2/s)", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629 (mm\xB2/s)")
      );
      const shown = rows.filter(
        (row) => Number.isFinite(row.oxygen_mole_fraction) && Number.isFinite(row.burning_rate_mm_s)
      ).length;
      if (count)
        count.textContent = `${t("Rows shown", "\u0627\u0644\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629")}: n=${shown} / ${rows.length} ${t("filtered source rows with both plotted values", "\u0635\u0641 \u0645\u0641\u0644\u062A\u0631 \u064A\u062D\u0648\u064A \u0627\u0644\u0642\u064A\u0645\u062A\u064A\u0646")}`;
    };
    fuel.onchange = update;
    pressure.onchange = update;
  }
  function challengeGoals() {
    const goals = lang === "ar" ? [
      [
        "1 \xB7 \u0627\u0643\u062A\u0634\u0627\u0641 \u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0637\u0627\u0642\u0645",
        "\u064A\u0639\u0631\u0636 \u0641\u0647\u0631\u0633 NASA PSI \u0627\u0644\u0643\u0627\u0645\u0644 (24 \u062A\u062D\u0642\u064A\u0642\u0627\u064B) \u0645\u0639 \u062F\u0631\u062C\u0629 \u0635\u0644\u0629 \u0628\u0627\u0644\u0645\u0647\u0645\u0629 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629. \u062A\u0648\u0641\u0631 \u0627\u0644\u062C\u062F\u0648\u0644 \u0638\u0627\u0647\u0631 \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0648\u0644\u0627 \u064A\u062F\u062E\u0644 \u0641\u064A \u0627\u0644\u062F\u0631\u062C\u0629\u061B \u0644\u064A\u0633\u062A \u062F\u0631\u062C\u0629 \u062E\u0637\u0648\u0631\u0629."
      ],
      [
        "2 \xB7 \u0623\u062F\u0644\u0629 \u0644\u0644\u0646\u0645\u0630\u062C\u0629 \u0627\u0644\u062A\u0646\u0628\u0624\u064A\u0629",
        "\u064A\u0643\u0634\u0641 \u0627\u0644\u0645\u062E\u062A\u0628\u0631 \u0638\u0631\u0648\u0641 \u0627\u0644\u0642\u064A\u0627\u0633 \u0648\u0627\u0644\u062D\u0642\u0648\u0644 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0648\u0627\u0644\u0646\u0642\u0635 \u0644\u0643\u0644 \u062F\u0631\u0627\u0633\u0629\u061B \u0648\u064A\u062D\u0644\u0644 FLEX \u0645\u0646\u0641\u0635\u0644\u0627\u064B \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641\u0647. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0627 \u062A\u062B\u0628\u062A \u0646\u0645\u0648\u0630\u062C \u062E\u0637\u0631 \u0645\u0648\u062D\u062F\u0627\u064B \u0639\u0628\u0631 \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A."
      ],
      [
        "3 \xB7 \u0623\u0646\u0638\u0645\u0629 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062C\u064A\u0644 \u0627\u0644\u0642\u0627\u062F\u0645",
        "\u062A\u0631\u0628\u0637 \u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u0628\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0648\u0627\u0644\u0643\u0634\u0641 \u0648\u0627\u0644\u0625\u062E\u0645\u0627\u062F. \u0647\u0630\u0647 \u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0628\u062D\u062B\u064A\u0629 \u0648\u0644\u064A\u0633\u062A \u062A\u0648\u0635\u064A\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0645\u0635\u062F\u0651\u0642\u0629."
      ]
    ] : [
      [
        "1 \xB7 Find crew-relevant studies",
        "Browse all 24 NASA PSI investigations with a metadata-based mission-relevance score. Table availability is separate and does not change the score; this is not a fire-hazard ranking."
      ],
      [
        "2 \xB7 Expose evidence for predictive models",
        "Inspect conditions, fields, outcomes, and gaps per study; analyze FLEX separately by test conditions. Current evidence does not validate a universal cross-study risk model."
      ],
      [
        "3 \xB7 Inform next-generation safety systems",
        "Connect evidence to prevention, detection, and suppression research questions. These are design directions, not certified operating recommendations."
      ]
    ];
    return `<article class="card" style="margin:15px 0"><div class="card-head"><div><span class="eyebrow">OFFICIAL CHALLENGE VIDEO \xB7 07:15\u201308:39</span><h3>${t("What the challenge asks us to deliver", "\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u0637\u0644\u0628\u0647 \u0627\u0644\u062A\u062D\u062F\u064A \u0645\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639")}</h3></div><a href="https://www.youtube.com/watch?v=AVuEiKxOpc0" target="_blank" rel="noreferrer">${t("Watch video \u2197", "\u0634\u0627\u0647\u062F \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u2197")}</a></div><div class="grid three">${goals.map(([title, body]) => `<section class="card"><h3>${title}</h3><p class="sub">${body}</p></section>`).join("")}</div><p class="sub">${t("SI is used to help navigate and explain cited evidence; generated text is not an experimental measurement. Optional Earth applications are documented separately.", "\u064A\u0633\u0627\u0639\u062F SI \u0639\u0644\u0649 \u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0627\u0644\u0623\u062F\u0644\u0629 \u0627\u0644\u0645\u0648\u062B\u0642\u0629 \u0648\u0634\u0631\u062D\u0647\u0627\u061B \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0648\u0644\u0651\u062F \u0644\u064A\u0633 \u0642\u064A\u0627\u0633\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B. \u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0623\u0631\u0636 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629 \u0645\u0648\u062B\u0642\u0629 \u0645\u0646\u0641\u0635\u0644\u0629.")}</p></article>`;
  }
  async function overview() {
    const evidence = await get("/api/challenge/catalog");
    return `${hero()}${challengeGoals()}<div class="grid stats">${stat(t("PSI COMBUSTION INVESTIGATIONS", "\u062A\u062D\u0642\u064A\u0642\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0641\u064A PSI"), evidence.officialInventory.total, t("Official NASA inventory snapshot", "\u0644\u0642\u0637\u0629 \u0645\u0646 \u0641\u0647\u0631\u0633 NASA \u0627\u0644\u0631\u0633\u0645\u064A"), "\u25C9")}${stat(t("TABLES BUNDLED", "\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u0641\u0642\u0629"), evidence.investigations.length, t("NASA PSI tables \xB7 checksums verified", "\u062C\u062F\u0627\u0648\u0644 NASA PSI \xB7 \u0627\u0644\u0628\u0635\u0645\u0627\u062A \u0645\u062A\u062D\u0642\u0642\u0629"), "\u25A4")}${stat(t("SEPARATE SOURCE ROWS", "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u0646\u0641\u0635\u0644\u0629"), evidence.recordCountAcrossFiles, t("Separate studies \xB7 never pooled", "\u062F\u0631\u0627\u0633\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \xB7 \u063A\u064A\u0631 \u0645\u062F\u0645\u062C\u0629"), "\u25A4")}${stat(t("VERIFIED TABLE HASHES", "\u0628\u0635\u0645\u0627\u062A \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0645\u062A\u062D\u0642\u0642\u0629"), evidence.investigations.filter((x) => x.sourceIntegrity === "VERIFIED").length, t("Original source bytes verified", "\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0627\u064A\u062A\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0623\u0635\u0644\u064A\u0629"), "\u2713")}</div><div class="grid two"><article class="card"><div class="card-head"><div><h3>FLEX \xB7 PSI-69</h3><p class="sub">${t("One investigation selected for detailed, condition-stratified analysis.", "\u062A\u062D\u0642\u064A\u0642 \u0648\u0627\u062D\u062F \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631.")}</p></div><span class="tag obs">${t("OBSERVED", "\u0645\u0631\u0635\u0648\u062F")}</span></div>${chartSVG(dataset.rows, "burning_rate_mm_s", t("FLEX droplet burning-rate constant", "\u062B\u0627\u0628\u062A \u0627\u062D\u062A\u0631\u0627\u0642 \u0642\u0637\u0631\u0627\u062A FLEX"), "mm\xB2/s")}<div class="legend"><span>PSI-69 \xB7 DOI 10.60555/mbq8-0451</span></div></article><article class="card"><h3>${t("NASA challenge-source coverage", "\u062A\u063A\u0637\u064A\u0629 \u0645\u0635\u062F\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A")}</h3><p class="sub">${t(`Measurements come from the challenge-relevant NASA PSI Combustion Science repository. NASA PSI lists ${evidence.officialInventory.total} investigations; ${evidence.investigations.length} original table files are bundled, checksummed, and inspectable. Studies remain separate because their methods and outcomes differ.`, `\u062A\u0623\u062A\u064A \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0645\u0646 \u0645\u0633\u062A\u0648\u062F\u0639 NASA PSI Combustion Science \u0627\u0644\u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u062A\u062D\u062F\u064A. \u064A\u0633\u062C\u0644 \u0627\u0644\u0641\u0647\u0631\u0633 ${evidence.officialInventory.total} \u062A\u062D\u0642\u064A\u0642\u0627\u064B\u061B \u0623\u0631\u0641\u0642\u0646\u0627 ${evidence.investigations.length} \u062C\u062F\u0648\u0644\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0645\u0639 \u0628\u0635\u0645\u0627\u062A\u0647\u0627 \u0644\u0641\u062D\u0635\u0647\u0627. \u0628\u0642\u064A\u062A \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A \u0645\u0646\u0641\u0635\u0644\u0629 \u0644\u0627\u062E\u062A\u0644\u0627\u0641 \u0637\u0631\u0642\u0647\u0627 \u0648\u0646\u062A\u0627\u0626\u062C\u0647\u0627.`)}</p><div class="list-row"><span>${t("Flame and droplet studies", "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u0644\u0647\u0628 \u0648\u0627\u0644\u0642\u0637\u0631\u0627\u062A")}</span><b>ACME \xB7 CFI \xB7 FLEX \xB7 SPICE</b></div><div class="list-row"><span>${t("Solid materials and spacecraft fires", "\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0635\u0644\u0628\u0629 \u0648\u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0645\u0631\u0643\u0628\u0627\u062A")}</span><b>BASS \xB7 SAFFIRE</b></div><div class="list-row"><span>${t("Smoke and aerosol studies", "\u062F\u0631\u0627\u0633\u0627\u062A \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621")}</span><b>SAME \xB7 DAFT</b></div><div class="callout warn">${t("Other PSI records remain metadata and source links. Unlike experiments are not pooled into a universal fire-hazard rank.", "\u062A\u0628\u0642\u0649 \u0633\u062C\u0644\u0627\u062A PSI \u0627\u0644\u0623\u062E\u0631\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0648\u0631\u0648\u0627\u0628\u0637 \u0644\u0644\u0645\u0635\u0627\u062F\u0631. \u0644\u0627 \u0646\u062F\u0645\u062C \u062A\u062C\u0627\u0631\u0628 \u0645\u062E\u062A\u0644\u0641\u0629 \u0641\u064A \u062A\u0635\u0646\u064A\u0641 \u0639\u0627\u0645 \u0644\u062E\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642.")}</div></article></div>${flexScatterPanel()}<div class="grid three"><article class="card"><h3>${t("Study the physics", "\u0627\u062F\u0631\u0633 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621")}</h3><p class="sub">${t("Buoyancy-driven convection weakens in microgravity; diffusion and forced ventilation remain.", "\u064A\u0636\u0639\u0641 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0646\u0627\u062A\u062C \u0639\u0646 \u0627\u0644\u0637\u0641\u0648 \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649\u060C \u0628\u064A\u0646\u0645\u0627 \u064A\u0633\u062A\u0645\u0631 \u0627\u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u0648\u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0642\u0633\u0631\u064A\u0629.")}</p><button class="outline-btn" data-go="Flame Physics">${t("Open Flame Physics \u2192", "\u0627\u0641\u062A\u062D \u0641\u064A\u0632\u064A\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u2190")}</button></article><article class="card"><h3>${t("Inspect primary data", "\u0627\u0641\u062D\u0635 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629")}</h3><p class="sub">${t("Browse source rows, missing values, DOIs, and integrity checks for each study.", "\u0627\u0633\u062A\u0639\u0631\u0636 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629 \u0648DOI \u0648\u0641\u062D\u0648\u0635 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0643\u0644 \u062F\u0631\u0627\u0633\u0629.")}</p><button class="outline-btn" data-go="Challenge Evidence">${t("Open evidence library \u2192", "\u0627\u0641\u062A\u062D \u0645\u0643\u062A\u0628\u0629 \u0627\u0644\u0623\u062F\u0644\u0629 \u2190")}</button></article><article class="card"><h3>${t("Decision-support boundary", "\u062D\u062F\u0648\u062F \u062F\u0639\u0645 \u0627\u0644\u0642\u0631\u0627\u0631")}</h3><p class="sub">${t("This research dashboard does not certify spacecraft fire risk or replace flight-safety procedures.", "\u0644\u0648\u062D\u0629 \u0627\u0644\u0623\u0628\u062D\u0627\u062B \u0644\u0627 \u062A\u0635\u0627\u062F\u0642 \u0639\u0644\u0649 \u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0631\u064A\u0642 \u0648\u0644\u0627 \u062A\u0633\u062A\u0628\u062F\u0644 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0637\u064A\u0631\u0627\u0646.")}</p><a href="https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/" target="_blank" rel="noreferrer">NASA \xB7 ${t("fire-safety research", "\u0623\u0628\u062D\u0627\u062B \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062D\u0631\u064A\u0642")} \u2197</a></article></div>`;
  }
  var WB_VARIABLES = [
    ["burning_rate_mm_s", "Burning-rate constant (mm\xB2/s)"],
    ["initial_droplet_diameter_mm", "Initial droplet diameter (mm)"],
    ["visible_flame_extinction_diameter_mm", "Flame extinction diameter (mm)"],
    ["burn_time_s", "Burn time (s)"],
    ["pressure_mmHg", "Pressure (mmHg)"],
    ["oxygen_mole_fraction", "Oxygen mole fraction"]
  ];
  var WB_DEFAULT = { fuel: "", pressureBand: "", diluent: "", variable: "burning_rate_mm_s" };
  var wbFilter = __spreadValues({}, WB_DEFAULT);
  var fmt = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : "\u2014";
  function ciCell(ci) {
    if (!ci) return "\u2014";
    if (ci.low === null)
      return `<span style="color:var(--muted)" title="${esc(ci.reason || "")}">${ci.n < 5 ? t("not reported (n &lt; 5)", "\u063A\u064A\u0631 \u0645\u064F\u0628\u0644\u063A \u0639\u0646\u0647 (n &lt; 5)") : t("not reported", "\u063A\u064A\u0631 \u0645\u064F\u0628\u0644\u063A \u0639\u0646\u0647")}</span>`;
    return `${fmt(ci.low)} \u2013 ${fmt(ci.high)}`;
  }
  function wbSelect(id, label, options, value) {
    return `<label style="font-size:10px;color:var(--muted)">${label} <select id="${id}">${options.map(([v, text]) => `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(text)}</option>`).join("")}</select></label>`;
  }
  function wbGroupRow(label, g, bold = false) {
    const a = g.association, name = bold ? `<b>${esc(label)}</b>` : esc(label);
    return `<tr><td>${name}</td><td>${g.records}</td><td>${g.n}</td><td><b>${fmt(g.mean)}</b></td><td>${ciCell(g.ci95)}</td><td>${fmt(g.sampleSd)}</td><td>${a.r === null ? "\u2014" : fmt(a.r)} <span style="color:var(--muted)">(n=${a.n})</span></td><td>${a.r === null ? "\u2014" : ciCell(a.ci95)}</td></tr>`;
  }
  function scientificChartGallery(rows) {
    const labels2 = {
      controls: t("Chart controls", "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0645\u062E\u0637\u0637"),
      zoomIn: t("Zoom in", "\u062A\u0643\u0628\u064A\u0631"),
      zoomOut: t("Zoom out", "\u062A\u0635\u063A\u064A\u0631"),
      reset: t("Reset view", "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0639\u0631\u0636"),
      fitLine: t("Linear fit", "\u062E\u0637 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629"),
      drawLine: t("Draw guide line", "\u0627\u0631\u0633\u0645 \u062E\u0637\u0627\u064B \u0625\u0631\u0634\u0627\u062F\u064A\u0627\u064B"),
      drawLineActive: t("Drag to draw \xB7 tap to stop", "\u0627\u0633\u062D\u0628 \u0644\u0631\u0633\u0645 \u0627\u0644\u062E\u0637 \xB7 \u0627\u0636\u063A\u0637 \u0644\u0644\u0625\u064A\u0642\u0627\u0641"),
      undo: t("Undo line", "\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0627\u0644\u062E\u0637"),
      fit: t("Exploratory linear fit", "\u0645\u0644\u0627\u0621\u0645\u0629 \u062E\u0637\u064A\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629"),
      fitUnavailable: t("Fit unavailable (need at least 3 points)", "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0644\u0627\u0621\u0645\u0629 (\u064A\u0644\u0632\u0645 3 \u0646\u0642\u0627\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644)"),
      fitNote: t("Exploratory association only; it does not show causation.", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A \u0641\u0642\u0637\u061B \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0633\u0628\u0628\u064A\u0629."),
      rows: t("Valid source rows", "\u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0635\u0627\u0644\u062D\u0629")
    };
    const configs = [
      { title: t("Oxygen fraction and droplet burning rate", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"), xKey: "oxygen_mole_fraction", yKey: "burning_rate_mm_s", xLabel: t("Oxygen mole fraction", "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646"), xUnit: "%", xFactor: 100, yLabel: t("Burning-rate constant", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), yUnit: "mm\xB2/s" },
      { title: t("Initial droplet diameter and burning rate", "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), xKey: "initial_droplet_diameter_mm", yKey: "burning_rate_mm_s", xLabel: t("Initial droplet diameter", "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A"), xUnit: "mm", yLabel: t("Burning-rate constant", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), yUnit: "mm\xB2/s" },
      { title: t("Pressure and droplet burning rate", "\u0627\u0644\u0636\u063A\u0637 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"), xKey: "pressure_mmHg", yKey: "burning_rate_mm_s", xLabel: t("Pressure", "\u0627\u0644\u0636\u063A\u0637"), xUnit: "mmHg", yLabel: t("Burning-rate constant", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), yUnit: "mm\xB2/s" },
      { title: t("Burn time and droplet burning rate", "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0648\u0645\u0639\u062F\u0644 \u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0642\u0637\u0631\u0629"), xKey: "burn_time_s", yKey: "burning_rate_mm_s", xLabel: t("Burn time", "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), xUnit: "s", yLabel: t("Burning-rate constant", "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642"), yUnit: "mm\xB2/s" },
      { title: t("Oxygen fraction and flame-extinction diameter", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628"), xKey: "oxygen_mole_fraction", yKey: "visible_flame_extinction_diameter_mm", xLabel: t("Oxygen mole fraction", "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646"), xUnit: "%", xFactor: 100, yLabel: t("Visible flame extinction diameter", "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A"), yUnit: "mm" },
      { title: t("Pressure and flame-extinction diameter", "\u0627\u0644\u0636\u063A\u0637 \u0648\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628"), xKey: "pressure_mmHg", yKey: "visible_flame_extinction_diameter_mm", xLabel: t("Pressure", "\u0627\u0644\u0636\u063A\u0637"), xUnit: "mmHg", yLabel: t("Visible flame extinction diameter", "\u0642\u0637\u0631 \u0627\u0646\u0637\u0641\u0627\u0621 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A"), yUnit: "mm" }
    ];
    return `<section class="chart-gallery"><div class="section-title"><div><h2>${t("Interactive FLEX research plots", "\u0645\u062E\u0637\u0637\u0627\u062A FLEX \u0627\u0644\u0628\u062D\u062B\u064A\u0629 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629")}</h2><p>${t("Each dot is a source test. Missing pairs are excluded for that chart only. Color separates fuel types.", "\u0643\u0644 \u0646\u0642\u0637\u0629 \u062A\u0645\u062B\u0644 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631. \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0646\u0627\u0642\u0635\u0629 \u0644\u0643\u0644 \u0645\u062E\u0637\u0637 \u0641\u0642\u0637. \u0627\u0644\u0644\u0648\u0646 \u064A\u0645\u064A\u0632 \u0646\u0648\u0639 \u0627\u0644\u0648\u0642\u0648\u062F.")}</p></div></div><div class="grid two">${configs.map((cfg) => `<article class="card"><h3>${cfg.title}</h3>${scientificScatter(__spreadProps(__spreadValues({}, cfg), { rows, groupKey: "fuel", labels: labels2 }))}</article>`).join("")}</div></section>`;
  }
  async function analysisPage() {
    var _a, _b, _c, _d;
    const params = new URLSearchParams(Object.entries(wbFilter).filter(([, v]) => v));
    const wb = await get(`/api/analysis?${params}`);
    const variableLabels = WB_VARIABLES.map(([key, label]) => [
      key,
      t(
        label,
        {
          "Burning-rate constant (mm\xB2/s)": "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 (mm\xB2/s)",
          "Initial droplet diameter (mm)": "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A (mm)",
          "Flame extinction diameter (mm)": "\u0642\u0637\u0631 \u0625\u062E\u0645\u0627\u062F \u0627\u0644\u0644\u0647\u0628 (mm)",
          "Burn time (s)": "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 (s)",
          "Pressure (mmHg)": "\u0627\u0644\u0636\u063A\u0637 (mmHg)",
          "Oxygen mole fraction": "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u0645\u0648\u0644\u064A \u0644\u0644\u0623\u0643\u0633\u062C\u064A\u0646"
        }[label]
      )
    ]);
    const c = wb.conditions, strata = wb.strata, filtered = Object.keys(wb.filter).length > 0, varLabel = ((_a = variableLabels.find(([k]) => k === wbFilter.variable)) == null ? void 0 : _a[1]) || wbFilter.variable, any = (label) => [["", label]];
    const bar = `<article class="card"><div class="card-head"><div><h3>${t("Test-condition filter", "\u062A\u0635\u0641\u064A\u0629 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")}</h3><p class="sub">${esc(c.bandDefinition)} ${t("Diluent is the added inert gas (CO\u2082 or He); \u201Cno diluent\u201D means O\u2082/N\u2082 only.", "\u0627\u0644\u0645\u062E\u0641\u0641 \u0647\u0648 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u062E\u0627\u0645\u0644 \u0627\u0644\u0645\u0636\u0627\u0641 (CO\u2082 \u0623\u0648 He)\u061B \u0648\u062A\u0639\u0646\u064A \xAB\u0645\u0646 \u062F\u0648\u0646 \u0645\u062E\u0641\u0641\xBB \u0645\u0632\u064A\u062C O\u2082/N\u2082 \u0641\u0642\u0637.")}</p></div><span class="tag obs">${wb.records} ${t("OF", "\u0645\u0646 \u0623\u0635\u0644")} ${dataset.dataset.records} ${t("TESTS", "\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B")}</span></div><div class="toolbar" style="margin:0">${wbSelect("wbFuel", t("Fuel", "\u0627\u0644\u0648\u0642\u0648\u062F"), any(t("All fuels", "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0648\u0642\u0648\u062F")).concat(c.fuels.map((f) => [f.id, `${f.label} (${f.n})`])), wbFilter.fuel)}${wbSelect("wbBand", t("Pressure", "\u0627\u0644\u0636\u063A\u0637"), any(t("All pressures", "\u0643\u0644 \u0627\u0644\u0636\u063A\u0648\u0637")).concat(c.pressureBands.map((b) => [b.id, `${b.label} \xB7 ${b.observed} (${b.n})`])), wbFilter.pressureBand)}${wbSelect("wbDiluent", t("Diluent", "\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641"), any(t("All diluents", "\u0643\u0644 \u0627\u0644\u063A\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u062E\u0641\u0641\u0629")).concat(c.diluents.map((d) => [d.id, `${d.label} (${d.n})`])), wbFilter.diluent)}${wbSelect("wbVariable", t("Grouped variable", "\u0645\u062A\u063A\u064A\u0631 \u0627\u0644\u062A\u062C\u0645\u064A\u0639"), variableLabels, wbFilter.variable)}<button class="outline-btn" id="wbReset">${t("Reset", "\u0625\u0639\u0627\u062F\u0629 \u0636\u0628\u0637")}</button></div></article>`;
    if (!strata)
      return `${pageHead(t("Scientific Analysis Workbench", "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u0644\u0645\u064A"), t("Reproducible summary statistics computed from source rows.", "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0645\u062D\u0633\u0648\u0628\u0629 \u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631."))}${bar}<div class="callout warn" style="margin-top:15px">${t("No bundled test matches", "\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0631\u0641\u0642 \u064A\u0637\u0627\u0628\u0642")} ${esc(wb.conditionLabel)}. ${t("Nothing is computed for an empty group.", "\u0644\u0627 \u062A\u064F\u062D\u0633\u0628 \u0646\u062A\u0627\u0626\u062C \u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0641\u0627\u0631\u063A\u0629.")}</div>`;
    const st = wb.summary.stats, pooled = strata.pooled, boot = strata.bootstrap, highBand = c.pressureBands.find((b) => b.id === ">2atm");
    const metrics = Object.entries(st).map(
      ([k, v]) => {
        var _a2, _b2;
        return `<article class="card metric"><div class="label">${t({ burning_rate_mm_s: "Burning-rate constant", burn_time_s: "Burn time", initial_droplet_diameter_mm: "Initial droplet diameter", visible_flame_extinction_diameter_mm: "Visible flame extinction diameter" }[k] || k.replaceAll("_", " "), { burning_rate_mm_s: "\u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", burn_time_s: "\u0632\u0645\u0646 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642", initial_droplet_diameter_mm: "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A", visible_flame_extinction_diameter_mm: "\u0642\u0637\u0631 \u0625\u062E\u0645\u0627\u062F \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u0631\u0626\u064A" }[k] || k.replaceAll("_", " "))}</div><strong>${v.mean === null ? "\u2014" : v.mean.toFixed(3)}</strong><small>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")} \xB7 ${v.unit} \xB7 n=${v.n} \xB7 ${t("missing", "\u0645\u0641\u0642\u0648\u062F")}=${v.missing}</small><p class="sub">${t("Sample SD", "\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A \u0644\u0644\u0639\u064A\u0646\u0629")} ${v.sd === null ? "\u2014" : v.sd.toFixed(3)} \xB7 ${t("range", "\u0627\u0644\u0646\u0637\u0627\u0642")} ${(_a2 = v.min) != null ? _a2 : "\u2014"}\u2013${(_b2 = v.max) != null ? _b2 : "\u2014"}</p></article>`;
      }
    ).join("");
    const table = `<article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t("Per-condition results", "\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0628\u062D\u0633\u0628 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631")} \xB7 ${esc(varLabel)}</h3><p class="sub">${esc(wb.conditionLabel)} \xB7 ${t("grouped by fuel, pressure band and diluent. 95% CIs are seeded percentile bootstrap intervals", "\u0645\u062C\u0645\u0639\u0629 \u062D\u0633\u0628 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u0646\u0637\u0627\u0642 \u0627\u0644\u0636\u063A\u0637 \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641. \u0641\u0648\u0627\u0635\u0644 \u0627\u0644\u062B\u0642\u0629 95% \u0645\u062D\u0633\u0648\u0628\u0629 \u0628\u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629 bootstrap \u0630\u0627\u062A \u0628\u0630\u0631\u0629 \u062B\u0627\u0628\u062A\u0629")} (seed ${boot.seed}, ${boot.resamples} ${t("resamples; withheld when n", "\u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629\u061B \u0644\u0627 \u062A\u064F\u0639\u0631\u0636 \u0639\u0646\u062F\u0645\u0627 n")} &lt; ${boot.minN}.</p></div><span class="tag comp">${t("COMPUTED", "\u0645\u062D\u0633\u0648\u0628")}</span></div><div class="table-wrap"><table><thead><tr><th>${t("Condition", "\u0627\u0644\u0638\u0631\u0641")}</th><th>${t("Tests", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A")}</th><th>n</th><th>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")}</th><th>95% CI (${t("mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")})</th><th>SD (${t("sample", "\u0627\u0644\u0639\u064A\u0646\u0629")})</th><th>Pearson r \xB7 ${t("diameter vs burning rate", "\u0627\u0644\u0642\u0637\u0631 \u0645\u0642\u0627\u0628\u0644 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</th><th>95% CI (r)</th></tr></thead><tbody>${wbGroupRow(filtered ? `${wb.conditionLabel} (${t("all", "\u0627\u0644\u0643\u0644")})` : t("All tests (pooled)", "\u0643\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A (\u0645\u062C\u0645\u0639\u0629)"), pooled, true)}${strata.groups.map((g) => wbGroupRow(g.label, g)).join("")}</tbody></table></div><div class="callout warn" style="margin-top:12px">${filtered ? t("Oxygen fraction, diluent fraction and droplet size still vary among tests within each row.", "\u0645\u0627 \u062A\u0632\u0627\u0644 \u0646\u0633\u0628\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641 \u0648\u062D\u062C\u0645 \u0627\u0644\u0642\u0637\u0631\u0629 \u062A\u062E\u062A\u0644\u0641 \u0628\u064A\u0646 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0635\u0641 \u0627\u0644\u0648\u0627\u062D\u062F.") : t("The first row pools different fuels, pressures and diluents; prefer the per-condition rows.", "\u064A\u062C\u0645\u0639 \u0627\u0644\u0635\u0641 \u0627\u0644\u0623\u0648\u0644 \u0623\u0646\u0648\u0627\u0639 \u0648\u0642\u0648\u062F \u0648\u0636\u063A\u0648\u0637\u0627\u064B \u0648\u063A\u0627\u0632\u0627\u062A \u0645\u062E\u0641\u0641\u0629 \u0645\u062E\u062A\u0644\u0641\u0629\u061B \u0627\u0639\u062A\u0645\u062F \u0635\u0641\u0648\u0641 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0645\u0646\u0641\u0635\u0644\u0629.")} ${t("The >2 atm band spans 2.0\u20133.1 atm and contains", "\u064A\u0645\u062A\u062F \u0646\u0637\u0627\u0642 >2 atm \u0645\u0646 2.0 \u0625\u0644\u0649 3.1 atm \u0648\u064A\u0636\u0645")} ${(_b = highBand == null ? void 0 : highBand.n) != null ? _b : 0} ${t("tests. Intervals describe resampling, not instrument uncertainty.", "\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B. \u062A\u0635\u0641 \u0627\u0644\u0641\u0648\u0627\u0635\u0644 \u0625\u0639\u0627\u062F\u0629 \u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0648\u0644\u0627 \u062A\u0645\u062B\u0644 \u0639\u062F\u0645 \u064A\u0642\u064A\u0646 \u0627\u0644\u0623\u062C\u0647\u0632\u0629.")}</div></article>`;
    const assoc = `<article class="card"><div class="card-head"><div><h3>${t("Exploratory association", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A")}</h3><p class="sub">${t("Initial droplet diameter vs. burning rate", "\u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A \u0645\u0642\u0627\u0628\u0644 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")} \xB7 ${esc(wb.conditionLabel)}</p></div><span class="tag comp">${t("COMPUTED", "\u0645\u062D\u0633\u0648\u0628")}</span></div><div style="font-size:34px;font-weight:800;margin:18px 0">${(_d = (_c = wb.associations.r) == null ? void 0 : _c.toFixed(3)) != null ? _d : "\u2014"}</div><p class="sub">Pearson r \xB7 n = ${wb.associations.n} \xB7 95% CI ${wb.associations.r === null ? "\u2014" : ciCell(pooled.association.ci95)}. ${t("Conditions still vary within this selection, so this association cannot establish causality.", "\u062A\u0628\u0642\u0649 \u0638\u0631\u0648\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062A\u063A\u064A\u0631\u0629 \u0636\u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u060C \u0644\u0630\u0644\u0643 \u0644\u0627 \u064A\u062B\u0628\u062A \u0627\u0644\u0627\u0631\u062A\u0628\u0627\u0637 \u0639\u0644\u0627\u0642\u0629 \u0633\u0628\u0628\u064A\u0629.")}</p><div class="callout warn">${t("No hypothesis test is run. Small-group r values are exploratory.", "\u0644\u0645 \u064A\u064F\u062C\u0631\u064E \u0627\u062E\u062A\u0628\u0627\u0631 \u0641\u0631\u0636\u064A\u0629. \u0642\u064A\u0645 r \u0644\u0644\u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641\u064A\u0629.")}</div></article>`;
    const methods = `<article class="card"><h3>${t("Methods & reproducibility", "\u0627\u0644\u0637\u0631\u0642 \u0648\u0642\u0627\u0628\u0644\u064A\u0629 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C")}</h3><div class="list-row"><span>${t("Mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637")}</span><b>${t("Arithmetic mean", "\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u064A")}</b></div><div class="list-row"><span>${t("Spread", "\u0627\u0644\u062A\u0634\u062A\u062A")}</span><b>${t("Sample standard deviation (n \u2212 1)", "\u0627\u0644\u0627\u0646\u062D\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A \u0644\u0644\u0639\u064A\u0646\u0629 (n \u2212 1)")}</b></div><div class="list-row"><span>${t("Interval", "\u0627\u0644\u0641\u0627\u0635\u0644")}</span><b>95% ${t("percentile bootstrap", "bootstrap \u0627\u0644\u0645\u0626\u064A\u0646\u064A")} \xB7 seed ${boot.seed} \xB7 ${boot.resamples} \xB7 n \u2265 ${boot.minN}</b></div><div class="list-row"><span>${t("Grouping", "\u0627\u0644\u062A\u062C\u0645\u064A\u0639")}</span><b>${t("Fuel \xB7 pressure band \xB7 diluent", "\u0627\u0644\u0648\u0642\u0648\u062F \xB7 \u0646\u0637\u0627\u0642 \u0627\u0644\u0636\u063A\u0637 \xB7 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0645\u062E\u0641\u0641")}</b></div><div class="list-row"><span>${t("Missing values", "\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0641\u0642\u0648\u062F\u0629")}</span><b>${t("Excluded per variable; no imputation", "\u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0644\u0643\u0644 \u0645\u062A\u063A\u064A\u0631\u061B \u0628\u0644\u0627 \u062A\u0639\u0648\u064A\u0636")}</b></div><div class="list-row"><span>${t("Source table", "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</span><b>NASA PSI-69</b></div><div class="list-row"><span>${t("Software", "\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C")}</span><b>MORS AEGIS 3.0 \xB7 JS</b></div></article>`;
    return `${pageHead(t("Scientific Analysis Workbench", "\u0645\u0646\u0636\u062F\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0639\u0644\u0645\u064A"), t("Reproducible statistics computed from source rows by test condition; nulls are excluded per variable.", "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0645\u0646 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0628\u062D\u0633\u0628 \u0638\u0631\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061B \u062A\u064F\u0633\u062A\u0628\u0639\u062F \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0641\u0627\u0631\u063A\u0629 \u0644\u0643\u0644 \u0645\u062A\u063A\u064A\u0631."))}${bar}${scientificChartGallery(dataset.rows)}<div class="grid three" style="margin-top:15px">${metrics}</div>${table}<div class="grid two" style="margin-top:15px">${assoc}${methods}</div>`;
  }
  function comparePage() {
    return `${pageHead(t("Experiment Comparison Studio", "\u0627\u0633\u062A\u0648\u062F\u064A\u0648 \u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u062A\u062C\u0627\u0631\u0628"), t("Compare two FLEX tests. Differences are computed only when fuel and gas composition match.", "\u0642\u0627\u0631\u0646 \u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0645\u0646 FLEX. \u0644\u0627 \u062A\u064F\u062D\u0633\u0628 \u0627\u0644\u0641\u0631\u0648\u0642 \u0625\u0644\u0627 \u0625\u0630\u0627 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u063A\u0627\u0632."))}<div class="grid two"><article class="card"><h3>${t("Test A", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 A")}</h3><label class="field-label">${t("Select record", "\u0627\u062E\u062A\u0631 \u0633\u062C\u0644\u0627\u064B")}</label><select id="compareA" class="field">${dataset.rows.map((r) => {
      var _a;
      return `<option value="${esc(r.id)}">${esc(r.id)} \xB7 ${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} mm\xB2/s</option>`;
    }).join("")}</select><div id="compareResultA"></div></article><article class="card"><h3>${t("Test B", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 B")}</h3><label class="field-label">${t("Select record", "\u0627\u062E\u062A\u0631 \u0633\u062C\u0644\u0627\u064B")}</label><select id="compareB" class="field">${dataset.rows.map((r, i) => {
      var _a;
      return `<option value="${esc(r.id)}" ${i === 1 ? "selected" : ""}>${esc(r.id)} \xB7 ${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} mm\xB2/s</option>`;
    }).join("")}</select><div id="compareResultB"></div></article></div><article class="card" style="margin-top:15px"><div class="card-head"><div><h3>${t("Paired variables", "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629")}</h3><p class="sub">${t("Observed source values shown side by side", "\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u0631\u0635\u0648\u062F\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u062C\u0646\u0628\u0627\u064B \u0625\u0644\u0649 \u062C\u0646\u0628")}</p></div><span class="tag obs">${t("OBSERVED", "\u0645\u0631\u0635\u0648\u062F")}</span></div><div id="compareTable"></div></article><div class="callout warn" style="margin-top:14px">${t("These are individual records, not controlled matched groups. A difference does not establish a physical effect.", "\u0647\u0630\u0647 \u0633\u062C\u0644\u0627\u062A \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0646\u0641\u0631\u062F\u0629 \u0648\u0644\u064A\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0645\u0636\u0628\u0648\u0637\u0629 \u0648\u0645\u062A\u0637\u0627\u0628\u0642\u0629\u061B \u0648\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0638\u0627\u0647\u0631 \u0644\u0627 \u064A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0627\u064B.")}</div>`;
  }
  function renderCompare() {
    var _a, _b;
    const a = dataset.rows.find((r) => r.id === $("#compareA").value), b = dataset.rows.find((r) => r.id === $("#compareB").value);
    for (const [id, r] of [
      ["compareResultA", a],
      ["compareResultB", b]
    ])
      $("#" + id).innerHTML = `<div style="margin:20px 0 5px;font-size:29px;font-weight:800">${(_a = r.burning_rate_mm_s) != null ? _a : "\u2014"} <small style="font-size:11px;color:var(--muted)">mm\xB2/s</small></div><p class="sub">${r.date} ${(_b = r.time_utc) != null ? _b : "\u2014"} UTC \xB7 ${r.test_end}</p>`;
    const conditions = [
      "fuel",
      "oxygen_mole_fraction",
      "nitrogen_mole_fraction",
      "carbon_dioxide_mole_fraction",
      "helium_mole_fraction"
    ];
    const mismatched = conditions.filter((k) => a[k] == null || b[k] == null || a[k] !== b[k]);
    const comparable = a.id !== b.id && mismatched.length === 0;
    const keys = [
      ...conditions,
      "pressure_mmHg",
      "initial_droplet_diameter_mm",
      "visible_flame_extinction_diameter_mm",
      "burning_rate_mm_s",
      "burn_time_s"
    ];
    const difference = (k) => !conditions.includes(k) && comparable && Number.isFinite(a[k]) && Number.isFinite(b[k]) ? (b[k] - a[k]).toFixed(3) : "\u2014";
    const notice = comparable ? "" : `<div class="callout warn" style="margin-bottom:12px">${a.id === b.id ? t("Select two different tests.", "\u0627\u062E\u062A\u0631 \u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0645\u062E\u062A\u0644\u0641\u064A\u0646.") : `${t("Differences withheld; the tests differ in", "\u062D\u064F\u062C\u0628\u062A \u0627\u0644\u0641\u0631\u0648\u0642 \u0644\u0627\u062E\u062A\u0644\u0627\u0641 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u064A\u0646 \u0641\u064A")} ${mismatched.map((k) => k.replaceAll("_", " ")).join(", ")}. ${t("A numeric comparison requires the same fuel and gas composition.", "\u062A\u062A\u0637\u0644\u0628 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0639\u062F\u062F\u064A\u0629 \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0648\u0642\u0648\u062F \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u063A\u0627\u0632.")}`}</div>`;
    $("#compareTable").innerHTML = `${notice}<table><thead><tr><th>${t("Variable", "\u0627\u0644\u0645\u062A\u063A\u064A\u0631")}</th><th>${esc(a.id)}</th><th>${esc(b.id)}</th><th>${t("Difference \xB7 B \u2212 A", "\u0627\u0644\u0641\u0631\u0642 \xB7 B \u2212 A")}</th></tr></thead><tbody>${keys.map((k) => {
      var _a2, _b2;
      return `<tr${mismatched.includes(k) ? ' class="mismatch"' : ""}><td>${k.replaceAll("_", " ")}</td><td>${esc((_a2 = a[k]) != null ? _a2 : "\u2014")}</td><td>${esc((_b2 = b[k]) != null ? _b2 : "\u2014")}</td><td>${difference(k)}</td></tr>`;
    }).join("")}</tbody></table>`;
  }
  function copilot() {
    const ar = lang === "ar";
    return `${pageHead(ar ? "\u0645\u0633\u0627\u0639\u062F \u0623\u0628\u062D\u0627\u062B MORS AEGIS" : "AEGIS AI Research Chat", ar ? "\u0645\u062D\u0627\u062F\u062B\u0629 \u0628\u062D\u062B\u064A\u0629 \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0628\u064A\u0627\u0646\u0627\u062A NASA PSI-69 \u0645\u0639 \u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0642\u064A\u0648\u062F." : "Ask about the FLEX evidence, methods, or limitations. Answers distinguish source observations from computed results.")}<article class="card chat-shell"><div class="chat-top"><div class="chat-brand"><div class="chat-avatar">\u2727</div><div><h3>${ar ? "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0639\u0644\u0645\u064A" : "AEGIS Research Assistant"}</h3><p class="sub">${ar ? "NASA PSI-69 \xB7 \u062C\u062F\u0648\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0643\u0627\u0645\u0644 \xB7 DOI 10.60555/mbq8-0451" : "NASA PSI-69 \xB7 full experimental table \xB7 DOI 10.60555/mbq8-0451"}</p></div></div><div class="chat-top-actions"><span class="tag" id="copilotMode">${ar ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062E\u062F\u0645\u0629\u2026" : "Checking provider\u2026"}</span><button class="outline-btn" id="newChat" type="button">${ar ? "\u0645\u062D\u0627\u062F\u062B\u0629 \u062C\u062F\u064A\u062F\u0629" : "New chat"}</button></div></div><div class="chat-context"><span class="tag obs">OBSERVED \xB7 PSI-69</span><span class="tag comp">COMPUTED \xB7 ${ar ? "\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629" : "descriptive statistics"}</span><span class="tag">${ar ? "\u0627\u0644\u0633\u062C\u0644 \u0645\u062D\u0641\u0648\u0638 \u0645\u062D\u0644\u064A\u064B\u0627 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D" : "Chat saved locally in this browser"}</span></div><div class="chat-log" id="chatLog" role="log" aria-live="polite" aria-relevant="additions text"></div><div id="chatTyping" class="chat-typing" hidden>${ar ? "\u064A\u0641\u062D\u0635 \u0627\u0644\u0623\u062F\u0644\u0629\u2026" : "Checking the evidence\u2026"}</div><div class="chat-suggestions" id="chatSuggestions"><button class="suggestion" data-question="${t("What is the mean burning rate, and how was it computed?", "\u0645\u0627 \u0645\u062A\u0648\u0633\u0637 \u062B\u0627\u0628\u062A \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u060C \u0648\u0643\u064A\u0641 \u062D\u064F\u0633\u0628\u061F")}">${t("Mean burning rate", "\u0645\u062A\u0648\u0633\u0637 \u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</button><button class="suggestion" data-question="${t("What do these records tell us about droplet diameter and burning rate?", "\u0645\u0627\u0630\u0627 \u062A\u062E\u0628\u0631\u0646\u0627 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0639\u0646 \u0642\u0637\u0631 \u0627\u0644\u0642\u0637\u0631\u0629 \u0648\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u061F")}">${t("Explore relationship", "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0639\u0644\u0627\u0642\u0629")}</button><button class="suggestion" data-question="${t("What are the main limitations of this table?", "\u0645\u0627 \u0623\u0628\u0631\u0632 \u062D\u062F\u0648\u062F \u0647\u0630\u0627 \u0627\u0644\u062C\u062F\u0648\u0644\u061F")}">${t("Evidence limits", "\u062D\u062F\u0648\u062F \u0627\u0644\u0623\u062F\u0644\u0629")}</button></div><div class="chat-compose"><form id="chatForm"><textarea class="field" id="question" rows="2" maxlength="1500" required aria-label="${ar ? "\u0631\u0633\u0627\u0644\u0629 \u0625\u0644\u0649 \u0645\u0633\u0627\u0639\u062F \u0623\u0628\u062D\u0627\u062B AEGIS" : "Message AEGIS research assistant"}" placeholder="${ar ? "\u0627\u0643\u062A\u0628 \u0633\u0624\u0627\u0644\u0643 \u0639\u0646 \u0627\u0644\u0623\u062F\u0644\u0629\u2026" : "Message AEGIS about the evidence\u2026"}"></textarea><button class="primary-btn chat-send" id="chatSend" type="submit">${ar ? "\u0625\u0631\u0633\u0627\u0644 \u2191" : "Send \u2191"}</button></form><div class="chat-disclosure">${ar ? "\u062A\u064F\u062D\u0641\u0638 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629 \u0641\u064A \u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0641\u0642\u0637. \u0644\u0627 \u062A\u062F\u062E\u0644 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u062E\u0635\u064A\u0629 \u0623\u0648 \u0633\u0631\u064A\u0629." : "Conversation is stored in this browser only. Do not enter personal or confidential information."} \xB7 ${ar ? "\u0642\u062F \u064A\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0633\u0624\u0627\u0644 Gemini \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0627\u0644\u062E\u062F\u0645\u0629 \u0645\u062A\u0627\u062D\u0629\u061B \u0648\u0625\u0644\u0627 \u064A\u0638\u0647\u0631 \u0645\u0644\u062E\u0635 \u0645\u062D\u0644\u064A \u0645\u062D\u062F\u062F \u0628\u0648\u0636\u0648\u062D." : "Questions may be sent to Gemini when configured; otherwise a clearly labeled local summary is shown."}</div></div></article>`;
  }
  function missionLessons() {
    const ar = lang === "ar";
    const incidents = [
      {
        title: "Apollo 1 \xB7 Pad test, 1967",
        tag: ar ? "\u062D\u0627\u062F\u062B \u0623\u0631\u0636\u064A \xB7 \u0644\u064A\u0633 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0627\u0630\u0628\u064A\u0629 \u0635\u063A\u0631\u0649" : "GROUND INCIDENT \xB7 NOT MICROGRAVITY DATA",
        facts: ar ? "\u0643\u0627\u0646 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u062F\u0627\u062E\u0644 \u0627\u0644\u0643\u0628\u0633\u0648\u0644\u0629 \u0627\u0644\u0645\u0636\u063A\u0648\u0637\u0629 \u0628\u0623\u0643\u0633\u062C\u064A\u0646 \u0646\u0642\u064A. \u0644\u0645 \u064A\u062D\u062F\u062F \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u0645\u0635\u062F\u0631 \u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u062D\u062F\u0627\u064B \u0628\u0634\u0643\u0644 \u0642\u0627\u0637\u0639\u060C \u0644\u0643\u0646\u0647 \u0648\u062C\u062F \u0623\u062F\u0644\u0629 \u0639\u0644\u0649 \u062A\u0642\u0648\u0633 \u0643\u0647\u0631\u0628\u0627\u0626\u064A. \u0623\u062F\u0649 \u0627\u0644\u062C\u0648 \u0627\u0644\u063A\u0646\u064A \u0628\u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0625\u0644\u0649 \u0627\u0646\u062A\u0634\u0627\u0631 \u0633\u0631\u064A\u0639 \u0648\u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0636\u063A\u0637\u060C \u0648\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0627\u0644\u0641\u062A\u062D\u0629 \u0628\u0633\u0631\u0639\u0629." : "The prelaunch capsule test used a pressurized, pure-oxygen atmosphere. Investigators did not identify one definitive ignition source, but found evidence of electrical arcing. The oxygen-rich environment supported rapid fire growth and pressure rise; the hatch could not be opened quickly.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u0627\u0636\u0628\u0637 \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0627\u0634\u062A\u0639\u0627\u0644 \u0648\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642\u060C \u0648\u0631\u0627\u062C\u0639 \u0641\u062A\u062D\u0627\u062A \u0627\u0644\u062E\u0631\u0648\u062C \u0648\u0627\u0644\u0625\u0646\u0642\u0627\u0630 \u0641\u064A \u0638\u0631\u0648\u0641 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0641\u0639\u0644\u064A\u0629. \u0627\u0644\u062D\u0627\u062F\u062B \u064A\u0648\u0636\u062D \u0627\u0644\u062E\u0637\u0631 \u0648\u0644\u0627 \u064A\u0642\u064A\u0633 \u0627\u0646\u062A\u0634\u0627\u0631 \u0644\u0647\u0628 \u0641\u064A \u0627\u0646\u0639\u062F\u0627\u0645 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629." : "Design lesson: control ignition sources and combustible materials, and validate egress and rescue under the actual pressure condition. This incident demonstrates a hazard; it does not measure flame spread in microgravity.",
        url: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-1",
        label: "NASA Apollo 1 accident record"
      },
      {
        title: "Apollo 13 \xB7 Oxygen-tank failure, 1970",
        tag: ar ? "\u0639\u0637\u0644 \u0646\u0638\u0627\u0645 \u0623\u0643\u0633\u062C\u064A\u0646 \xB7 \u0644\u064A\u0633 \u062A\u062C\u0631\u0628\u0629 \u0644\u0647\u0628" : "OXYGEN-SYSTEM FAILURE \xB7 NOT A FLAME TEST",
        facts: ar ? "\u062A\u0636\u0631\u0631\u062A \u0623\u0633\u0644\u0627\u0643 \u0648\u0639\u0648\u0627\u0632\u0644 \u062F\u0627\u062E\u0644 \u062E\u0632\u0627\u0646 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0628\u0639\u062F \u062A\u0633\u062E\u064A\u0646 \u0645\u0641\u0631\u0637 \u0641\u064A \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0623\u0631\u0636\u064A\u060C \u062B\u0645 \u0648\u0642\u0639 \u0627\u0646\u0641\u062C\u0627\u0631 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u062D\u0644\u0629 \u0648\u0641\u064F\u0642\u062F \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0637\u0627\u0642\u0629 \u0645\u0646 \u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0648\u0642\u0648\u062F. \u0643\u0627\u0646\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u062A\u0641\u0627\u0639\u0644\u0627\u064B \u0628\u064A\u0646 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0648\u0627\u0644\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0647\u0646\u062F\u0633\u064A \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631." : "Wiring and insulation inside an oxygen tank were damaged by overheating during ground testing. The tank later failed in flight, causing oxygen loss and fuel-cell power loss. The review identified interacting design, configuration, and test-process failures.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u062A\u062A\u0628\u0639 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0627\u0644\u062A\u0647\u064A\u0626\u0629\u060C \u0648\u0647\u0648\u0627\u0645\u0634 \u062F\u0631\u062C\u0627\u062A \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u0648\u0627\u0644\u062C\u0647\u062F\u060C \u0648\u0627\u0639\u0632\u0644 \u0623\u0639\u0637\u0627\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0637\u0627\u0642\u0629. \u0644\u0627 \u0646\u0639\u0627\u0645\u0644 \u0627\u0646\u0641\u062C\u0627\u0631 \u0627\u0644\u062E\u0632\u0627\u0646 \u0643\u0642\u064A\u0627\u0633 \u0644\u0627\u0646\u062A\u0634\u0627\u0631 \u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629." : "Design lesson: maintain configuration control, temperature and voltage margins, and fault isolation for oxygen and power systems. Do not treat the tank failure as a cabin-fire propagation measurement.",
        url: "https://sma.nasa.gov/sma-disciplines/accllp/apollo-13",
        label: "NASA Apollo 13 accident record"
      },
      {
        title: "Mir \xB7 Solid-fuel oxygen generator fire, 1997",
        tag: ar ? "\u062D\u0631\u064A\u0642 \u0639\u0644\u0649 \u0645\u062A\u0646 \u0645\u062D\u0637\u0629 \xB7 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u062F\u062E\u0627\u0646" : "ON-ORBIT FIRE \xB7 CREW RESPONSE & SMOKE",
        facts: ar ? "\u0627\u0634\u062A\u0639\u0644 \u0645\u0648\u0644\u062F \u0623\u0643\u0633\u062C\u064A\u0646 \u0643\u064A\u0645\u064A\u0627\u0626\u064A \u0635\u0644\u0628 \u0623\u062B\u0646\u0627\u0621 \u0648\u062C\u0648\u062F \u0633\u062A\u0629 \u0623\u0641\u0631\u0627\u062F. \u0623\u0646\u062A\u062C \u0644\u0647\u0628\u0627\u064B \u0648\u0634\u0631\u0631\u0627\u064B \u0648\u062F\u062E\u0627\u0646\u0627\u064B \u0643\u062B\u064A\u0641\u0627\u064B \u0648\u0633\u062F\u0651 \u0645\u0633\u0627\u0631\u0627\u064B \u0625\u0644\u0649 \u0645\u0631\u0643\u0628\u0629 \u0647\u0631\u0648\u0628. \u0623\u062E\u0645\u062F \u0627\u0644\u0637\u0627\u0642\u0645 \u0627\u0644\u062D\u0631\u064A\u0642 \u0628\u0637\u0641\u0627\u064A\u0627\u062A\u061B \u062B\u0645 \u0627\u062D\u062A\u0627\u062C\u062A \u0623\u0646\u0638\u0645\u0629 \u062F\u0639\u0645 \u0627\u0644\u062D\u064A\u0627\u0629 \u0633\u0627\u0639\u0627\u062A \u0644\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062F\u062E\u0627\u0646. \u0631\u062C\u0651\u062D \u0627\u0644\u062A\u062D\u0642\u064A\u0642 \u062F\u062E\u0648\u0644 \u0645\u0627\u062F\u0629 \u0647\u064A\u062F\u0631\u0648\u0643\u0631\u0628\u0648\u0646\u064A\u0629 \u0625\u0644\u0649 \u0627\u0644\u0639\u0628\u0648\u0629." : "A solid-fuel oxygen generator ignited with six crew aboard, producing flame, sparks, and dense smoke that blocked an escape route. The crew used extinguishers; life support took hours to clear the smoke. Investigators later considered hydrocarbon contamination of the canister the likely cause.",
        insight: ar ? "\u062F\u0631\u0633 \u0627\u0644\u062A\u0635\u0645\u064A\u0645: \u0642\u064A\u0651\u0645 \u0645\u0648\u0644\u062F\u0627\u062A \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0643\u0645\u0635\u062F\u0631 \u0627\u0634\u062A\u0639\u0627\u0644 \u0645\u0633\u062A\u0642\u0644\u060C \u062E\u0637\u0637 \u0644\u0644\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0628\u062F\u064A\u0644\u0629\u060C \u0648\u0627\u062C\u0645\u0639 \u0628\u064A\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0648\u0643\u0634\u0641 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u062A\u0646\u0642\u064A\u062A\u0647. \u0647\u0630\u0627 \u062D\u0627\u062F\u062B \u062A\u0634\u063A\u064A\u0644\u064A \u0648\u0644\u064A\u0633 \u062A\u062C\u0631\u0628\u0629 \u0627\u062D\u062A\u0631\u0627\u0642 \u0645\u0636\u0628\u0648\u0637\u0629." : "Design lesson: treat oxygen-generation hardware as a potential ignition source, protect alternate egress, and combine training, suppression, smoke detection, and cleanup. This is an operational incident, not a controlled combustion experiment.",
        url: "https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/",
        label: "NASA Mir fire history"
      }
    ];
    const transfers = [
      {
        title: ar ? "\u0643\u0634\u0641 \u0627\u0644\u062D\u0631\u064A\u0642 \u0627\u0644\u0645\u0628\u0643\u0631" : "Incipient-fire detection",
        facts: ar ? "\u064A\u0639\u0631\u0636 \u0645\u0648\u0631\u062F NASA Spinoff \u0643\u0627\u0634\u0641\u0627\u064B \u0644\u0645\u0643\u0648\u0643 \u0627\u0644\u0641\u0636\u0627\u0621 \u064A\u0631\u0635\u062F \u062C\u0633\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0648\u064A\u0645\u064A\u0651\u0632\u0647\u0627 \u0639\u0646 \u0627\u0644\u063A\u0628\u0627\u0631\u060C \u0648\u0642\u062F \u0635\u064F\u0645\u0645 \u0644\u0644\u062A\u0646\u0628\u064A\u0647 \u0642\u0628\u0644 \u0638\u0647\u0648\u0631 \u0644\u0647\u0628 \u0623\u0648 \u062F\u062E\u0627\u0646 \u0648\u0627\u0636\u062D." : "The NASA Spinoff resource describes a Shuttle detector that samples combustion particles and distinguishes them from dust, aiming to signal a fire condition before visible flame or smoke.",
        use: ar ? "\u0641\u0631\u0635\u0629 \u0628\u062D\u062B: \u0627\u062E\u062A\u0628\u0631 \u0632\u0645\u0646 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631\u0627\u062A \u0627\u0644\u0643\u0627\u0630\u0628\u0629 \u0645\u0639 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062F\u062E\u0627\u0646 \u0648\u0627\u0644\u0647\u0628\u0627\u0621 \u0648\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0645\u0631\u0643\u0628\u0627\u062A \u0627\u0644\u0645\u0623\u0647\u0648\u0644\u0629." : "Research opportunity: test response time and false alarms across smoke/aerosol types and ventilation paths relevant to crewed vehicles.",
        url: "https://spinoff.nasa.gov/node/9407",
        label: "NASA Spinoff \xB7 Fire Detector"
      },
      {
        title: ar ? "\u0645\u0639\u062F\u0627\u062A \u062A\u0646\u0641\u0633 \u0623\u062E\u0641" : "Lighter firefighter air tanks",
        facts: ar ? "\u064A\u0648\u062B\u0642 \u0627\u0644\u0645\u0648\u0631\u062F \u062A\u0639\u0627\u0648\u0646\u0627\u064B \u0644\u0646\u0642\u0644 \u062A\u0635\u0645\u064A\u0645 \u0623\u0633\u0637\u0648\u0627\u0646\u0629 \u0645\u0631\u0643\u0628\u0629 \u0623\u062E\u0641 \u0645\u0639 \u0642\u0646\u0627\u0639 \u0623\u0648\u0636\u062D \u0648\u0645\u0646\u0628\u0647 \u0634\u062E\u0635\u064A \u0644\u0627\u0646\u062E\u0641\u0627\u0636 \u0627\u0644\u0647\u0648\u0627\u0621 \u0625\u0644\u0649 \u0645\u0639\u062F\u0627\u062A \u0631\u062C\u0627\u0644 \u0627\u0644\u0625\u0637\u0641\u0627\u0621." : "The resource documents transfer of a lighter composite air-tank design, improved mask visibility, and a personal low-air warning to firefighter equipment.",
        use: ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639: \u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631 \u0648\u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A \u0639\u0646\u0627\u0635\u0631 \u0641\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0637\u0627\u0642\u0645\u061B \u0647\u0630\u0627 \u0627\u0644\u0645\u062B\u0627\u0644 \u0644\u0627 \u064A\u0628\u0631\u0631 \u062A\u063A\u064A\u064A\u0631 \u062E\u0644\u064A\u0637 \u0623\u0643\u0633\u062C\u064A\u0646 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629." : "Project relevance: mobility, alerts, and reserve capacity matter to crew equipment; this example does not justify changing cabin oxygen composition.",
        url: "https://spinoff.nasa.gov/node/9582",
        label: "NASA Spinoff \xB7 Fireman's Air Tanks"
      },
      {
        title: ar ? "\u0645\u0648\u0627\u062F \u0645\u0644\u0627\u0628\u0633 \u0648\u0627\u0642\u064A\u0629" : "Protective clothing materials",
        facts: ar ? "\u064A\u0635\u0641 Project FIRES \u062A\u0643\u064A\u064A\u0641 \u0645\u0648\u0627\u062F \u0648\u062A\u0635\u0627\u0645\u064A\u0645 \u062E\u0641\u064A\u0641\u0629 \u0648\u0645\u0642\u0627\u0648\u0645\u0629 \u0644\u0644\u062D\u0631\u0627\u0631\u0629 \u0637\u064F\u0648\u0631\u062A \u0644\u0628\u062F\u0644\u0627\u062A \u0627\u0644\u0641\u0636\u0627\u0621 \u0623\u0648 \u0627\u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u064A\u0629 \u0625\u0644\u0649 \u0645\u0644\u0627\u0628\u0633 \u0631\u062C\u0627\u0644 \u0627\u0644\u0625\u0637\u0641\u0627\u0621." : "Project FIRES adapted lightweight, heat-protective materials and design concepts from spacesuits and spacecraft thermal protection for firefighter ensembles.",
        use: ar ? "\u0635\u0644\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639: \u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629 \u064A\u062D\u062A\u0627\u062C \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0623\u062F\u0627\u0621 \u0648\u0631\u0627\u062D\u0629 \u0648\u0633\u0644\u0627\u0645\u0629 \u0645\u0633\u062A\u0642\u0644\u0629\u061B \u0646\u062C\u0627\u062D \u0645\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u0645\u0644\u0627\u0628\u0633 \u0644\u0627 \u064A\u062C\u0639\u0644\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0645\u0642\u0635\u0648\u0631\u0629 \u0623\u0648 \u0628\u062F\u0644\u0629 \u0641\u0636\u0627\u0621." : "Project relevance: technology transfer still requires independent performance, comfort, and safety testing; a material suitable for clothing is not automatically suitable for a spacecraft cabin or suit.",
        url: "https://spinoff.nasa.gov/node/9918",
        label: "NASA Spinoff \xB7 New Technology for the Fire Attire"
      }
    ];
    const card = (item) => `<article class="card"><div class="card-head"><h3>${item.title}</h3><span class="tag">${item.tag || (ar ? "\u0646\u0642\u0644 \u062A\u0642\u0646\u064A\u0629 \xB7 \u0644\u064A\u0633 \u0642\u064A\u0627\u0633 \u0627\u062D\u062A\u0631\u0627\u0642" : "TECH TRANSFER \xB7 NOT COMBUSTION DATA")}</span></div><p>${item.facts}</p><div class="callout">${item.insight || item.use}</div><a href="${item.url}" target="_blank" rel="noreferrer">${item.label} \u2197</a></article>`;
    return `${pageHead(ar ? "\u062F\u0631\u0648\u0633 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0647\u0645\u0627\u062A" : "Mission Safety Lessons", ar ? "\u062A\u062D\u0644\u064A\u0644 \u0645\u0648\u0627\u0631\u062F \u0646\u0627\u0633\u0627 \u0627\u0644\u062A\u064A \u0623\u0631\u0641\u0642\u0647\u0627 \u0627\u0644\u062A\u062D\u062F\u064A: \u062D\u0648\u0627\u062F\u062B \u0641\u0636\u0627\u0626\u064A\u0629 \u0648\u0646\u0642\u0644 \u062A\u0642\u0646\u064A\u0629\u060C \u0645\u0639 \u0641\u0635\u0644\u0647\u0627 \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628." : "Analyze the NASA incident histories and technology-transfer resources supplied with the challenge, separately from experiment data.")}<div class="callout warn"><b>${ar ? "\u062D\u062F\u0648\u062F \u0627\u0644\u062F\u0644\u064A\u0644:" : "Evidence boundary:"}</b> ${ar ? "\u0647\u0630\u0647 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0634\u0631\u062D \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062E\u0637\u0631 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0648\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629. \u0644\u0627 \u062A\u0636\u064A\u0641 \u0642\u064A\u0627\u0633\u0627\u062A \u0625\u0644\u0649 \u0642\u0627\u0639\u062F\u0629 NASA PSI \u0648\u0644\u0627 \u062A\u062B\u0628\u062A \u0623\u062B\u0631\u0627\u064B \u0633\u0628\u0628\u064A\u0627\u064B \u0641\u064A \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0635\u063A\u0631\u0649." : "These records describe hazards, response, and technology transfer. They add no measurements to the NASA PSI dataset and do not establish causal effects in microgravity."}</div><h2 style="margin:22px 0 12px">${ar ? "\u062D\u0648\u0627\u062F\u062B \u0645\u0648\u062B\u0642\u0629 \u0645\u0646 \u0646\u0627\u0633\u0627" : "NASA incident records"}</h2><div class="grid three">${incidents.map(card).join("")}</div><h2 style="margin:22px 0 12px">${ar ? "\u0623\u0645\u062B\u0644\u0629 \u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629" : "Technology-transfer examples"}</h2><div class="grid three">${transfers.map(card).join("")}</div><article class="card" style="margin-top:15px"><h2>${ar ? "\u0643\u064A\u0641 \u062A\u062A\u062D\u0648\u0644 \u0625\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u062A\u0635\u0645\u064A\u0645 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u061F" : "Turn lessons into testable design questions"}</h2><ol>${(ar ? ["\u0647\u0644 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A \u0639\u0646\u062F \u0636\u063A\u0637 \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646 \u0648\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u064A \u0648\u062A\u062F\u0641\u0642 \u0627\u0644\u0647\u0648\u0627\u0621 \u0627\u0644\u0645\u0642\u0635\u0648\u062F\u061F", "\u0647\u0644 \u062A\u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0633\u0627\u062A \u0646\u0648\u0627\u062A\u062C \u0627\u0644\u0627\u062D\u062A\u0631\u0627\u0642 \u0627\u0644\u0645\u0628\u0643\u0631 \u0648\u062A\u0641\u0635\u0644\u0647\u0627 \u0639\u0646 \u0627\u0644\u063A\u0628\u0627\u0631 \u0648\u0627\u0644\u0625\u0646\u0630\u0627\u0631\u0627\u062A \u0627\u0644\u0643\u0627\u0630\u0628\u0629\u061F", "\u0647\u0644 \u064A\u0628\u0642\u0649 \u0645\u0633\u0627\u0631 \u0647\u0631\u0648\u0628 \u0628\u062F\u064A\u0644 \u0645\u062A\u0627\u062D\u0627\u064B \u0645\u0639 \u062F\u062E\u0627\u0646 \u0643\u062B\u064A\u0641 \u0623\u0648 \u0639\u0637\u0644 \u0641\u064A \u0645\u0648\u0644\u062F \u0627\u0644\u0623\u0643\u0633\u062C\u064A\u0646\u061F", "\u0647\u0644 \u0627\u062E\u062A\u064F\u0628\u0631\u062A \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u0632\u0644 \u0648\u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0648\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062C\u0648 \u0645\u0639 \u0627\u0644\u0637\u0627\u0642\u0645 \u0648\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629\u061F"] : ["Were materials and components tested at the intended oxygen partial pressure, total pressure, and airflow?", "Can detectors identify early combustion products while rejecting dust and nuisance alarms?", "Does an alternate egress route remain available during dense smoke or oxygen-generator failure?", "Were isolation, suppression, and atmosphere-cleanup procedures tested with representative crew and hardware?"]).map((x) => `<li>${x}</li>`).join("")}</ol><p class="sub">${ar ? "\u0647\u0630\u0647 \u0623\u0633\u0626\u0644\u0629 \u0628\u062D\u062B \u0648\u062A\u0623\u0647\u064A\u0644 \u0648\u0644\u064A\u0633\u062A \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0623\u0648 \u062A\u0648\u0635\u064A\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0644\u0645\u0631\u0643\u0628\u0627\u062A." : "These are research and qualification questions, not operational settings or certified spacecraft recommendations."}</p></article>`;
  }
  async function sourcesPage() {
    const evidence = await get("/api/challenge/catalog");
    const ar = lang === "ar";
    const challengeResources = [
      [
        "NASA PSI Data Repository \xB7 Combustion Science (challenge-specified source)",
        "https://psi.nasa.gov/physci/repo/search?q=combustion",
        "PRIMARY DATA"
      ],
      [
        "2026 Space Apps challenge video \xB7 Flame in Freefall",
        "https://www.youtube.com/watch?v=AVuEiKxOpc0",
        "OFFICIAL CHALLENGE VIDEO"
      ],
      [
        "NASA Combustion Science overview",
        "https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/",
        "CONTEXT"
      ],
      ["NASA ScienceCasts \xB7 combustion on the ISS (2018)", "https://www.youtube.com/watch?v=W1oXykoz9zg", "VIDEO"],
      [
        "NASA Researcher's Guide to ISS Combustion Science",
        "https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/",
        "CONTEXT"
      ],
      ["Apollo 1 investigation and lessons", "https://sma.nasa.gov/sma-disciplines/accllp/apollo-1", "INCIDENT HISTORY"],
      [
        "Apollo 13 oxygen-tank investigation",
        "https://sma.nasa.gov/sma-disciplines/accllp/apollo-13",
        "INCIDENT HISTORY"
      ],
      [
        "Fire aboard Mir (1997)",
        "https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/",
        "INCIDENT HISTORY"
      ],
      ["NASA Spinoff \xB7 Fireman's air tanks", "https://spinoff.nasa.gov/node/9582", "TECHNOLOGY TRANSFER"],
      ["NASA Spinoff \xB7 Shuttle fire detector", "https://spinoff.nasa.gov/node/9407", "TECHNOLOGY TRANSFER"],
      ["NASA Spinoff \xB7 Firefighter attire", "https://spinoff.nasa.gov/node/9918", "TECHNOLOGY TRANSFER"]
    ];
    const categoryArabic = {
      "PRIMARY DATA": "\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629",
      CONTEXT: "\u0633\u064A\u0627\u0642 \u0639\u0644\u0645\u064A",
      VIDEO: "\u0641\u064A\u062F\u064A\u0648",
      "OFFICIAL CHALLENGE VIDEO": "\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A",
      "INCIDENT HISTORY": "\u062D\u0648\u0627\u062F\u062B \u062A\u0627\u0631\u064A\u062E\u064A\u0629",
      "TECHNOLOGY TRANSFER": "\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629"
    };
    return `${pageHead(t("Sources & Methods", "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0648\u0627\u0644\u0645\u0646\u0647\u062C\u064A\u0629"), t("Challenge data, background explanations, the official challenge video, and the separate NASA ScienceCasts video.", "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0648\u0641\u064A\u062F\u064A\u0648 \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A \u0648\u0641\u064A\u062F\u064A\u0648 NASA ScienceCasts \u0627\u0644\u0645\u0646\u0641\u0635\u0644."))}
    <article class="card"><h3>${t("Primary experimental evidence \xB7 NASA Physical Sciences Informatics", "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \xB7 NASA Physical Sciences Informatics")}</h3>
    <p class="sub">${t("The official challenge names NASA PSI Combustion Science as its data source. PSI is the only source of experimental measurements in this project. The 24-record PSI index and file metadata are shown in Challenge Evidence. Sixteen original tables are bundled and linked to their NASA records; DOI and rights information are shown only when available. Eight manifest lookups returned no listing in this snapshot. PSI does not provide one harmonized cross-study experiment table.", "\u064A\u062D\u062F\u062F \u0627\u0644\u062A\u062D\u062F\u064A \u0627\u0644\u0631\u0633\u0645\u064A \u0645\u0633\u062A\u0648\u062F\u0639 NASA PSI Combustion Science \u0645\u0635\u062F\u0631\u0627\u064B \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u060C \u0648\u0647\u0648 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0648\u062D\u064A\u062F \u0644\u0642\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639. \u064A\u0639\u0631\u0636 \u0642\u0633\u0645 \u0623\u062F\u0644\u0629 \u0627\u0644\u062A\u062D\u062F\u064A \u0641\u0647\u0631\u0633 PSI \u0630\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u064024 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629. \u0623\u0631\u0641\u0642\u0646\u0627 16 \u062C\u062F\u0648\u0644\u0627\u064B \u0623\u0635\u0644\u064A\u0627\u064B \u0648\u0631\u0628\u0637\u0646\u0627\u0647\u0627 \u0628\u0633\u062C\u0644\u0627\u062A NASA\u061B \u0644\u0627 \u0646\u0639\u0631\u0636 DOI \u0623\u0648 \u062D\u0642\u0648\u0642\u0627\u064B \u0625\u0644\u0627 \u0639\u0646\u062F \u062A\u0648\u0641\u0631\u0647\u0627. \u0644\u0645 \u062A\u064F\u0631\u062C\u0639 \u062B\u0645\u0627\u0646\u064A\u0629 \u0627\u0633\u062A\u0639\u0644\u0627\u0645\u0627\u062A \u0639\u0646 \u0627\u0644\u0641\u0647\u0627\u0631\u0633 \u0642\u0627\u0626\u0645\u0629 \u0645\u0644\u0641\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0644\u0642\u0637\u0629. \u0644\u0627 \u064A\u0642\u062F\u0645 PSI \u062C\u062F\u0648\u0644\u0627\u064B \u0645\u0648\u062D\u062F\u0627\u064B \u0635\u0627\u0644\u062D\u0627\u064B \u0644\u062F\u0645\u062C \u0643\u0644 \u0627\u0644\u062F\u0631\u0627\u0633\u0627\u062A.")}</p>
    <div class="table-wrap"><table><thead><tr><th>${t("Investigation", "\u0627\u0644\u062F\u0631\u0627\u0633\u0629")}</th><th>${t("Rows", "\u0627\u0644\u0635\u0641\u0648\u0641")}</th><th>DOI</th><th>${t("License", "\u0627\u0644\u062A\u0631\u062E\u064A\u0635")}</th><th>${t("Integrity", "\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0644\u0641")}</th><th>${t("Source record", "\u0633\u062C\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</th></tr></thead><tbody>${evidence.investigations.map((s) => `<tr><td><b>${esc(s.id)} \xB7 ${esc(s.title)}</b></td><td>${s.rowCount}</td><td class="mono">${esc(s.doi || "\u2014")}</td><td>${esc(s.license)}</td><td>${esc(s.sourceIntegrity)}</td><td><a href="${esc(s.sourceUrl)}" target="_blank" rel="noreferrer">NASA PSI \u2197</a></td></tr>`).join("")}</tbody></table></div></article>
    <div class="grid two" style="margin-top:15px"><article class="card"><h3>${t("Challenge-provided resources", "\u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0645\u0631\u0641\u0642\u0629 \u0628\u0627\u0644\u062A\u062D\u062F\u064A")}</h3><p class="sub">${t("PSI is the measurement source. The other resources provide context, incident history, or technology-transfer examples; they are not additional experiment datasets.", "PSI \u0647\u0648 \u0645\u0635\u062F\u0631 \u0627\u0644\u0642\u064A\u0627\u0633\u0627\u062A. \u0623\u0645\u0627 \u0628\u0642\u064A\u0629 \u0627\u0644\u0645\u0635\u0627\u062F\u0631 \u0641\u062A\u0642\u062F\u0645 \u0633\u064A\u0627\u0642\u0627\u064B \u0639\u0644\u0645\u064A\u0627\u064B \u0623\u0648 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0623\u0648 \u0623\u0645\u062B\u0644\u0629 \u0644\u0646\u0642\u0644 \u0627\u0644\u062A\u0642\u0646\u064A\u0629\u061B \u0648\u0644\u064A\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u0628.")}</p>
    ${challengeResources.map(([label, url, kind]) => `<div class="list-row"><span>${esc(label)} <small class="tag">${esc(ar ? categoryArabic[kind] || kind : kind)}</small></span><a href="${esc(url)}" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div>`).join("")}
    <div class="list-row"><span>${t("Official challenge \xB7 Flame in Freefall", "\u0635\u0641\u062D\u0629 \u062A\u062D\u062F\u064A Flame in Freefall \u0627\u0644\u0631\u0633\u0645\u064A\u0629")}</span><a href="https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div>
    <div class="list-row"><span>${t("PSI filtered API \xB7 investigation metadata refresh", "\u0648\u0627\u062C\u0647\u0629 PSI \u0627\u0644\u0645\u0641\u0644\u062A\u0631\u0629 \xB7 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0642\u064A\u0642\u0627\u062A")} <small class="tag">${t("METADATA API", "\u0648\u0627\u062C\u0647\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0635\u0641\u064A\u0629")}</small></span><a href="https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science" target="_blank" rel="noreferrer">${t("API \u2197", "\u0648\u0627\u062C\u0647\u0629 API \u2197")}</a></div>
    <div class="list-row"><span>${t("NASA NTRS API docs \xB7 references only; no dataset ingested", "\u062A\u0648\u062B\u064A\u0642 NASA NTRS API \xB7 \u0644\u0644\u0645\u0631\u0627\u062C\u0639 \u0641\u0642\u0637\u061B \u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F \u0645\u0646\u0647 \u0628\u064A\u0627\u0646\u0627\u062A")}</span><a href="https://ntrs.nasa.gov/api/openapi/" target="_blank" rel="noreferrer">${t("API docs \u2197", "\u062A\u0648\u062B\u064A\u0642 API \u2197")}</a></div>
    <div class="list-row"><span>NASA OCHMO-TB-003 \xB7 Habitable Atmosphere</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA OCHMO-TB-008 \xB7 Fire Protection</span><a href="https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA-STD-3001 Volume 2 \xB7 crew atmosphere constraints</span><a href="https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" target="_blank" rel="noreferrer">${t("Open \u2197", "\u0641\u062A\u062D \u2197")}</a></div><div class="list-row"><span>NASA 2026 \xB7 exploration atmosphere concept</span><a href="https://ntrs.nasa.gov/citations/20260001966" target="_blank" rel="noreferrer">NASA NTRS \u2197</a></div></article>
    <article class="card"><h3>${t("Services, provenance, and boundaries", "\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u062D\u062F\u0648\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</h3><p class="sub">${t("The PSI investigation-search and file-manifest endpoints refresh metadata; listing files does not download the multi-terabyte archive. The app serves a local inventory snapshot and checksummed files. NASA NTRS is linked for selected references, not harvested as an experiment dataset. Gemini is optional generated explanation, never experimental evidence.", "\u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062C\u0647\u062A\u0627 \u0627\u0644\u0628\u062D\u062B \u0648\u0627\u0644\u0641\u0647\u0631\u0633\u0629 \u0644\u062F\u0649 PSI \u0644\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629\u061B \u0641\u0647\u0631\u0633\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0644\u0627 \u062A\u0639\u0646\u064A \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0627\u0644\u0630\u064A \u064A\u062A\u062C\u0627\u0648\u0632 \u0639\u062F\u0629 \u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A. \u064A\u0639\u0631\u0636 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 \u0644\u0642\u0637\u0629 \u0645\u062D\u0644\u064A\u0629 \u0648\u0645\u0644\u0641\u0627\u062A \u0645\u062A\u062D\u0642\u0642\u0627\u064B \u0645\u0646 \u0628\u0635\u0645\u062A\u0647\u0627. \u0623\u064F\u062F\u0631\u062C NASA NTRS \u0643\u0645\u0635\u062F\u0631 \u0644\u0645\u0631\u0627\u062C\u0639 \u0645\u062E\u062A\u0627\u0631\u0629 \u0648\u0644\u0645 \u064A\u064F\u0633\u062A\u0648\u0631\u062F \u0643\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062C\u0627\u0631\u0628. Gemini \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0634\u0631\u062D \u0645\u0648\u0644\u0651\u062F \u0648\u0644\u0627 \u064A\u0639\u062F \u062F\u0644\u064A\u0644\u0627\u064B \u062A\u062C\u0631\u064A\u0628\u064A\u0627\u064B.")}</p><div class="list-row"><span>OBSERVED</span><b>${t("Values directly reported by NASA PSI.", "\u0642\u064A\u0645 \u0645\u0630\u0643\u0648\u0631\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0641\u064A NASA PSI.")}</b></div><div class="list-row"><span>COMPUTED</span><b>${t("Deterministic arithmetic or summaries with stated inputs.", "\u062D\u0633\u0627\u0628\u0627\u062A \u0623\u0648 \u0645\u0644\u062E\u0635\u0627\u062A \u062D\u062A\u0645\u064A\u0629 \u0628\u0645\u062F\u062E\u0644\u0627\u062A \u0645\u0639\u0644\u0646\u0629.")}</b></div><div class="list-row"><span>INTERPRETATION</span><b>${t("Scientific explanation linked to references.", "\u062A\u0641\u0633\u064A\u0631 \u0639\u0644\u0645\u064A \u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0631\u0627\u062C\u0639.")}</b></div><div class="list-row"><span>HYPOTHESIS</span><b>${t("A question that needs experiments or validation.", "\u0633\u0624\u0627\u0644 \u064A\u062D\u062A\u0627\u062C \u062A\u062C\u0627\u0631\u0628 \u0623\u0648 \u062A\u062D\u0642\u0642\u0627\u064B.")}</b></div><div class="callout warn">${t("Earth-fire hotspots, NOAA space weather, solar-event feeds, and unrelated challenge data from the earlier prototype are excluded from active research.", "\u0627\u0633\u062A\u064F\u0628\u0639\u062F\u062A \u062D\u0631\u0627\u0626\u0642 \u0627\u0644\u0623\u0631\u0636 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0637\u0642\u0633 \u0627\u0644\u0641\u0636\u0627\u0621 \u0648\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0634\u0645\u0633\u064A\u0629 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649 \u0645\u0646 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062D\u0627\u0644\u064A.")}</div><a href="../docs/CHALLENGE_BRIEF_AND_VIDEO.md">${t("Read the challenge and video review \u2197", "\u0627\u0642\u0631\u0623 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A \u0648\u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u2197")}</a></article></div>`;
  }
  function reports() {
    return `${pageHead(t("Scientific Reports Center", "\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0639\u0644\u0645\u064A\u0629"), t("Export reproducible source rows, analysis results, or a printable report.", "\u0635\u062F\u0651\u0631 \u0635\u0641\u0648\u0641 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0623\u0648 \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u0637\u0628\u0627\u0639\u0629."))}<div class="grid three"><article class="card"><div class="eyebrow">${t("DATA", "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A")}</div><h3 style="margin:10px 0">${t("Source table", "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631")}</h3><p class="sub">${t("Observed rows and field names from NASA PSI-69.", "\u0635\u0641\u0648\u0641 \u0645\u0631\u0635\u0648\u062F\u0629 \u0648\u0623\u0633\u0645\u0627\u0621 \u062D\u0642\u0648\u0644 \u0645\u0646 NASA PSI-69.")}</p><button class="outline-btn" id="downloadCsv">${t("Download CSV", "\u062A\u0646\u0632\u064A\u0644 CSV")}</button></article><article class="card"><div class="eyebrow">${t("REPRODUCIBILITY", "\u0642\u0627\u0628\u0644\u064A\u0629 \u0627\u0644\u0625\u0639\u0627\u062F\u0629")}</div><h3 style="margin:10px 0">${t("Analysis package", "\u062D\u0632\u0645\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644")}</h3><p class="sub">${t("JSON with source metadata, summary statistics, validation, and limitations.", "\u0645\u0644\u0641 JSON \u064A\u062D\u0648\u064A \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0642\u064A\u0648\u062F.")}</p><button class="outline-btn" id="downloadJson">${t("Download JSON", "\u062A\u0646\u0632\u064A\u0644 JSON")}</button></article><article class="card"><div class="eyebrow">${t("PRESENTATION", "\u0627\u0644\u0639\u0631\u0636")}</div><h3 style="margin:10px 0">${t("Scientific summary", "\u0645\u0644\u062E\u0635 \u0639\u0644\u0645\u064A")}</h3><p class="sub">${t("Open a printable report and use Save as PDF in your browser.", "\u0627\u0641\u062A\u062D \u062A\u0642\u0631\u064A\u0631\u0627\u064B \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0641\u0638 \u0628\u0635\u064A\u063A\u0629 PDF \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D.")}</p><button class="outline-btn" id="printReport">${t("Print / Save PDF", "\u0637\u0628\u0627\u0639\u0629 / \u062D\u0641\u0638 PDF")}</button></article></div><div class="callout" style="margin-top:15px">${t("Exports preserve evidence labels and include DOI, units, methods, and limitations. AI interpretation is not an experimentally verified result.", "\u062A\u062D\u0627\u0641\u0638 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0651\u0631\u0629 \u0639\u0644\u0649 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062A\u0634\u0645\u0644 DOI \u0648\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0644\u0637\u0631\u0642 \u0648\u0627\u0644\u0642\u064A\u0648\u062F. \u062A\u0641\u0633\u064A\u0631 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u064A\u0633 \u0646\u062A\u064A\u062C\u0629 \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0645\u062A\u062D\u0642\u0642\u0627\u064B \u0645\u0646\u0647\u0627.")}</div>`;
  }
  async function health() {
    const h = await get("/api/health");
    $("#dataMode").textContent = t("NASA PSI challenge evidence \xB7 offline-ready", "\u0623\u062F\u0644\u0629 \u062A\u062D\u062F\u064A NASA PSI \xB7 \u0645\u062A\u0627\u062D\u0629 \u062F\u0648\u0646 \u0627\u062A\u0635\u0627\u0644");
    return h;
  }
  function settings() {
    return `${pageHead(t("Settings & Theme Manager", "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0638\u0647\u0631"), t("Appearance and language preferences are saved in this browser.", "\u062A\u064F\u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0638\u0647\u0631 \u0648\u0627\u0644\u0644\u063A\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."))}<div class="grid two"><article class="card"><h3>${t("Visual theme", "\u0627\u0644\u0645\u0638\u0647\u0631")}</h3><p class="sub">${t("Three MORS themes preserve the same evidence labels and reading order.", "\u062B\u064A\u0645\u0627\u062A MORS \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u062A\u062D\u0627\u0641\u0638 \u0639\u0644\u0649 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0623\u062F\u0644\u0629 \u0648\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0642\u0631\u0627\u0621\u0629.")}</p>${[
      ["arctic", "MORS Arctic", "Light research surfaces with blue accents"],
      ["space", "MORS Deep Space", "Dark navy mission-control palette"],
      ["observatory", "MORS Observatory", "Neutral lab surfaces with dark data panels"]
    ].map(
      ([v, n, d]) => `<div class="list-row"><span><b>${n}</b><br><small>${t(d, { "Light research surfaces with blue accents": "\u0648\u0627\u062C\u0647\u0629 \u0628\u062D\u062B \u0641\u0627\u062A\u062D\u0629 \u0648\u0644\u0645\u0633\u0627\u062A \u0632\u0631\u0642\u0627\u0621", "Dark navy mission-control palette": "\u0644\u0648\u062D\u0629 \u062F\u0627\u0643\u0646\u0629 \u0628\u0644\u0648\u0646 \u0623\u0632\u0631\u0642 \u0627\u0644\u0645\u0647\u0645\u0627\u062A", "Neutral lab surfaces with dark data panels": "\u0648\u0627\u062C\u0647\u0629 \u0645\u062E\u062A\u0628\u0631 \u0645\u062D\u0627\u064A\u062F\u0629 \u0645\u0639 \u0623\u0644\u0648\u0627\u062D \u0628\u064A\u0627\u0646\u0627\u062A \u062F\u0627\u0643\u0646\u0629" }[d])}</small></span><button class="outline-btn" data-theme="${v}">${theme === v ? t("Active", "\u0645\u0641\u0639\u0651\u0644") : t("Apply", "\u062A\u0637\u0628\u064A\u0642")}</button></div>`
    ).join(
      ""
    )}</article><article class="card"><h3>${t("Language", "\u0627\u0644\u0644\u063A\u0629")}</h3><p class="sub">${t("The interface supports English and Arabic with right-to-left layout.", "\u062A\u062F\u0639\u0645 \u0627\u0644\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 \u0648\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0645\u0639 \u062A\u062E\u0637\u064A\u0637 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.")}</p><div class="list-row"><span>English</span><button class="outline-btn" data-lang="en">${lang === "en" ? t("Active", "\u0645\u0641\u0639\u0651\u0644") : t("Apply", "\u062A\u0637\u0628\u064A\u0642")}</button></div><div class="list-row"><span>\u0627\u0644\u0639\u0631\u0628\u064A\u0629</span><button class="outline-btn" data-lang="ar">${lang === "ar" ? "\u0646\u0634\u0637" : "\u062A\u0637\u0628\u064A\u0642"}</button></div><div class="callout" style="margin-top:15px">${t("Scientific field names and source values stay in their original form for traceability.", "\u062A\u0628\u0642\u0649 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0648\u0642\u064A\u0645 \u0627\u0644\u0645\u0635\u062F\u0631 \u0628\u0635\u064A\u063A\u062A\u0647\u0627 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0644\u062A\u0633\u0647\u064A\u0644 \u0627\u0644\u062A\u062A\u0628\u0639.")}</div></article></div>`;
  }
  var pageMap = {
    Overview: overview,
    "Flame Physics": () => renderFlamePhysics(lang),
    "Mission Atmospheres": () => renderMissionAtmospheres(lang),
    "Safety Insights": () => renderSafetyInsights(lang),
    "System Concepts": () => renderSystemConcepts(lang),
    "Mission Lessons": missionLessons,
    "Challenge Evidence": () => renderChallengeLibrary(lang),
    "Investigation Lab": () => renderInvestigationLab(lang),
    "Analysis Workbench": analysisPage,
    "Comparison Studio": comparePage,
    "AI Copilot": copilot,
    Sources: sourcesPage,
    Reports: reports,
    Settings: settings
  };
  async function go(name) {
    const id = ++navigationId;
    current = name;
    const nextHash = `#${encodeURIComponent(name)}`;
    if (location.hash !== nextHash) location.hash = nextHash;
    renderNav();
    $("#pageTitle").textContent = pageLabel(name);
    $("#crumb").textContent = lang === "ar" ? `MORS AEGIS / ${pageLabel(name)}` : "MORS AEGIS / " + name.toUpperCase();
    $(".evidence-pill").innerHTML = `<i></i> ${t("EVIDENCE FIRST", "\u0627\u0644\u0623\u062F\u0644\u0629 \u0623\u0648\u0644\u0627\u064B")}`;
    $("#reportBtn").title = t("Export report", "\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");
    $("#reportBtn").innerHTML = `\u2197 <span>${t("Export", "\u062A\u0635\u062F\u064A\u0631")}</span>`;
    document.querySelector("footer").innerHTML = `<span>${t("\xA9 2026 MORS \xB7 NASA PSI COMBUSTION RESEARCH", "\xA9 2026 MORS \xB7 \u0623\u0628\u062D\u0627\u062B NASA PSI \u0644\u0644\u0627\u062D\u062A\u0631\u0627\u0642")}</span><span>${t("Source-linked \xB7 Reproducible \xB7 Research use only", "\u0645\u0648\u062B\u0651\u0642 \u0627\u0644\u0645\u0635\u062F\u0631 \xB7 \u0642\u0627\u0628\u0644 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \xB7 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u062D\u062B\u064A")}</span>`;
    const c = $("#content");
    c.innerHTML = `<div class="empty">${t("Loading research view\u2026", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u062D\u062B\u2026")}</div>`;
    try {
      const html = await pageMap[name]();
      if (id !== navigationId) return;
      c.innerHTML = html;
      bindPage();
      if (name === "Overview") bindFlexScatter(c);
      if (name === "Challenge Evidence") bindChallengeLibrary(c, lang);
      if (name === "Investigation Lab") bindInvestigationLab(c, lang);
      if (name === "Flame Physics") bindFlameScene3d(c, lang);
      if (name === "System Concepts") bindSystemConcepts(c, lang);
      if (name === "Comparison Studio") renderCompare();
      if (name === "AI Copilot") {
        const provider = (await get("/api/health")).credentials.gemini;
        if (id === navigationId)
          $("#copilotMode").textContent = provider ? "GEMINI CONFIGURED \xB7 CHECKED PER REPLY" : "LOCAL EVIDENCE MODE";
      }
    } catch (e) {
      if (id === navigationId)
        c.innerHTML = `<div class="callout warn">View could not be loaded: ${esc(e.message)}</div>`;
    }
  }
  function persistChat() {
    try {
      storageSet("mors-chat-v1", JSON.stringify(chatThread.slice(-60)));
    } catch (e) {
      toast("Local chat history could not be saved in this browser.");
    }
  }
  function addChatMessage(log, message) {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${message.role}`;
    const meta = document.createElement("div");
    meta.className = "bubble-meta";
    meta.textContent = message.role === "user" ? lang === "ar" ? "\u0623\u0646\u062A" : "YOU" : message.provider || "AEGIS \xB7 LOCAL EVIDENCE";
    const body = document.createElement("div");
    body.className = "bubble-body";
    body.textContent = message.content;
    bubble.append(meta, body);
    if (message.role === "assistant") {
      if (Array.isArray(message.toolsExecuted) && message.toolsExecuted.length) {
        const details = document.createElement("details"), summary = document.createElement("summary"), pre = document.createElement("pre");
        summary.textContent = lang === "ar" ? "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0646\u0641\u0630\u0629" : "Executed analysis tools";
        pre.textContent = message.toolsExecuted.map(
          (item) => `${item.tool}: ${item.status} \xB7 ${item.evidence}${item.resultSha256 ? ` \xB7 SHA-256 ${item.resultSha256}` : ""}`
        ).join("\n");
        details.append(summary, pre);
        bubble.append(details);
      }
      const cite = document.createElement("div");
      cite.className = "bubble-citation";
      cite.textContent = lang === "ar" ? "\u0627\u0644\u0645\u0635\u062F\u0631: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 " : "Source: NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ";
      const link = document.createElement("a");
      link.href = "https://psi.nasa.gov/physci/repo/data/investigations/PSI-69";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = lang === "ar" ? "\u0641\u062A\u062D \u0633\u062C\u0644 NASA" : "Open NASA record";
      cite.append(link);
      bubble.append(cite);
    }
    log.append(bubble);
  }
  function renderChat() {
    const log = $("#chatLog");
    if (!log) return;
    log.replaceChildren();
    if (!chatThread.length) {
      addChatMessage(log, {
        role: "assistant",
        provider: lang === "ar" ? "\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0628\u062D\u0627\u062B" : "AEGIS \xB7 RESEARCH ASSISTANT",
        content: lang === "ar" ? "\u0645\u0631\u062D\u0628\u064B\u0627. \u0627\u0633\u0623\u0644 \u0639\u0646 \u0642\u064A\u0627\u0633\u0627\u062A FLEX \u0623\u0648 \u0637\u0631\u0642 \u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u062D\u062F\u0648\u062F \u0627\u0644\u0623\u062F\u0644\u0629. \u0633\u0623\u0648\u0636\u062D \u0625\u0646 \u0643\u0627\u0646\u062A \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0642\u064A\u0627\u0633\u0627\u064B \u0645\u0631\u0635\u0648\u062F\u0627\u064B \u0623\u0645 \u062D\u0633\u0627\u0628\u0627\u064B \u0648\u0635\u0641\u064A\u0627\u064B\u060C \u0648\u0633\u0623\u0630\u0643\u0631 \u0639\u0646\u062F\u0645\u0627 \u0644\u0627 \u062A\u0643\u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0625\u062C\u0627\u0628\u0629." : "Hello. Ask about FLEX measurements, calculations, or evidence limits. I will distinguish observations from computed summaries and flag questions this table cannot answer."
      });
    } else chatThread.forEach((message) => addChatMessage(log, message));
    log.scrollTop = log.scrollHeight;
  }
  async function submitChat(event) {
    var _a, _b, _c, _d, _e;
    event.preventDefault();
    if (chatBusy) return;
    const input = $("#question"), question = input.value.trim();
    if (!question) return;
    const history = chatThread.slice(-8).map(({ role, content }) => ({ role, content }));
    chatThread.push({ role: "user", content: question });
    persistChat();
    renderChat();
    input.value = "";
    chatBusy = true;
    $("#chatTyping").hidden = false;
    $("#chatSend").disabled = true;
    try {
      const result = await post("/api/copilot", { question, history });
      const provider = result.status === "live" ? `AI INTERPRETATION \xB7 GEMINI ${result.model || ""}` : (result.provider || "DETERMINISTIC LOCAL SUMMARY").toUpperCase();
      chatThread.push({
        role: "assistant",
        content: result.answer || "No text was returned. Please try again.",
        provider,
        citation: true,
        toolsExecuted: result.toolsExecuted || []
      });
    } catch (e) {
      const mean = (_c = (_b = (_a = analysis == null ? void 0 : analysis.summary) == null ? void 0 : _a.stats) == null ? void 0 : _b.burning_rate_mm_s) == null ? void 0 : _c.mean;
      chatThread.push({
        role: "assistant",
        provider: "DETERMINISTIC LOCAL SUMMARY \xB7 REQUEST FAILED",
        citation: true,
        content: `The AI request could not be completed. Local evidence: ${(_e = (_d = dataset == null ? void 0 : dataset.dataset) == null ? void 0 : _d.records) != null ? _e : 0} PSI-69 table rows; computed mean burning rate ${Number.isFinite(mean) ? mean.toFixed(3) + " mm\xB2/s" : "not available"}. These pooled records cannot establish causality or represent every FLEX test. Source DOI: 10.60555/mbq8-0451.`
      });
    } finally {
      chatBusy = false;
      persistChat();
      if ($("#chatTyping")) $("#chatTyping").hidden = true;
      if ($("#chatSend")) $("#chatSend").disabled = false;
      if ($("#chatLog")) {
        renderChat();
        if ($("#question")) $("#question").focus();
      }
    }
  }
  function bindPage() {
    bindInteractiveCharts(document);
    document.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => go(b.dataset.go));
    if ($("#compareA")) {
      $("#compareA").onchange = renderCompare;
      $("#compareB").onchange = renderCompare;
    }
    if ($("#chatForm")) {
      renderChat();
      $("#chatForm").onsubmit = submitChat;
      $("#question").addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!chatBusy) $("#chatForm").requestSubmit();
        }
      });
      $("#newChat").onclick = () => {
        if (chatThread.length && !window.confirm(
          lang === "ar" ? "\u0628\u062F\u0621 \u0645\u062D\u0627\u062F\u062B\u0629 \u062C\u062F\u064A\u062F\u0629\u061F \u0633\u064A\u064F\u0645\u0633\u062D \u0633\u062C\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D." : "Start a new chat? This clears this conversation from this browser."
        ))
          return;
        chatThread = [];
        persistChat();
        renderChat();
      };
      document.querySelectorAll("[data-question]").forEach(
        (b) => b.onclick = () => {
          if (chatBusy) return;
          $("#question").value = b.dataset.question;
          $("#question").focus();
        }
      );
    }
    for (const [id, key] of [
      ["#wbFuel", "fuel"],
      ["#wbBand", "pressureBand"],
      ["#wbDiluent", "diluent"],
      ["#wbVariable", "variable"]
    ])
      if ($(id))
        $(id).onchange = (e) => {
          wbFilter = __spreadProps(__spreadValues({}, wbFilter), { [key]: e.target.value });
          go("Analysis Workbench");
        };
    if ($("#wbReset"))
      $("#wbReset").onclick = () => {
        wbFilter = __spreadValues({}, WB_DEFAULT);
        go("Analysis Workbench");
      };
    if ($("#chatLog")) $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
    if ($("#downloadCsv"))
      $("#downloadCsv").onclick = () => download("mors-aegis-psi69-flex.csv", awaitlessCSV(), "text/csv");
    if ($("#downloadJson"))
      $("#downloadJson").onclick = () => download("mors-aegis-report.json", JSON.stringify(report(), null, 2), "application/json");
    if ($("#printReport")) $("#printReport").onclick = printSummary;
    if ($("#saveProject"))
      $("#saveProject").onclick = () => {
        const p = {
          name: $("#projectName").value,
          question: $("#projectQuestion").value,
          dataset: "PSI-69",
          savedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        storageSet("mors-project", JSON.stringify(p));
        $("#savedProject").innerHTML = `<div class="callout good">Saved locally in this browser: <b>${esc(p.name)}</b>. No server storage configured.</div>`;
      };
    document.querySelectorAll("[data-theme]").forEach(
      (b) => b.onclick = () => {
        theme = b.dataset.theme;
        storageSet("mors-theme", theme);
        setTheme();
        go(current);
      }
    );
    document.querySelectorAll("[data-lang]").forEach(
      (b) => b.onclick = () => {
        lang = b.dataset.lang;
        storageSet("mors-lang", lang);
        setTheme();
        $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
        renderNav();
        go(current);
      }
    );
  }
  function awaitlessCSV() {
    const keys = Object.keys(dataset.rows[0]);
    return [keys, ...dataset.rows.map((r) => keys.map((k) => r[k]))].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  }
  function report() {
    return {
      product: "MORS AEGIS",
      evidence_classification: "OBSERVED source rows \u2192 COMPUTED summary",
      dataset: dataset.dataset,
      rows: dataset.rows,
      analysis,
      limitations: [
        "Official PSI-69 experimental table; raw imagery and archive assets not included.",
        "Descriptive analysis is not causal inference.",
        "No imagery attached to current data extract."
      ],
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  function printSummary() {
    const d = report(), w = window.open("", "_blank"), ar = lang === "ar";
    if (!w) {
      toast(t("Allow a popup to print the report", "\u0627\u0633\u0645\u062D \u0628\u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"));
      return;
    }
    w.document.write(
      `<html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${t("MORS AEGIS Scientific Summary", "MORS AEGIS \xB7 \u0645\u0644\u062E\u0635 \u0639\u0644\u0645\u064A")}</title><style>body{font:14px Arial;margin:40px;color:#123}h1{color:#123}table{border-collapse:collapse}td,th{padding:8px;border:1px solid #abc}small{color:#567}pre{white-space:pre-wrap;direction:ltr;text-align:left}</style></head><body><h1>MORS AEGIS \xB7 ${t("FLEX Evidence Summary", "\u0645\u0644\u062E\u0635 \u0623\u062F\u0644\u0629 FLEX")}</h1><p>NASA PSI-69 \xB7 DOI 10.60555/mbq8-0451 \xB7 ${(/* @__PURE__ */ new Date()).toISOString()}</p><p>${t("Evidence: observed source-table values and computed descriptive statistics.", "\u0627\u0644\u0623\u062F\u0644\u0629: \u0642\u064A\u0645 \u0645\u0631\u0635\u0648\u062F\u0629 \u0641\u064A \u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0648\u0635\u0641\u064A\u0629 \u0645\u062D\u0633\u0648\u0628\u0629.")}</p><p><b>${t("Scope:", "\u0627\u0644\u0646\u0637\u0627\u0642:")}</b> ${t("all tests in the official PSI-69 experimental table; raw imagery and other archive assets are not included.", "\u0643\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0641\u064A \u062C\u062F\u0648\u0644 NASA PSI-69 \u0627\u0644\u0631\u0633\u0645\u064A\u061B \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062E\u0627\u0645 \u0648\u0628\u0642\u064A\u0629 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u063A\u064A\u0631 \u0645\u0636\u0645\u0651\u0646\u0629.")}</p>${rowsTable(dataset.rows)}<h2>${t("Computed summary", "\u0627\u0644\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u062D\u0633\u0648\u0628")}</h2><pre>${esc(JSON.stringify(analysis.summary, null, 2))}</pre><h2>${t("Limitations", "\u0627\u0644\u0642\u064A\u0648\u062F")}</h2><ul>${d.limitations.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p>${t("Source:", "\u0627\u0644\u0645\u0635\u062F\u0631:")} https://psi.nasa.gov/physci/repo/data/investigations/PSI-69</p></body></html>`
    );
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 400);
  }
  $("#reportBtn").onclick = () => go("Reports");
  $("#langBtn").textContent = lang === "ar" ? "English" : "\u0639\u0631\u0628\u064A";
  $("#langBtn").onclick = () => {
    lang = lang === "en" ? "ar" : "en";
    storageSet("mors-lang", lang);
    setTheme();
    renderNav();
    go(current);
  };
  $("#themeBtn").onclick = () => {
    theme = { arctic: "space", space: "observatory", observatory: "arctic" }[theme];
    storageSet("mors-theme", theme);
    setTheme();
    go(current);
  };
  window.addEventListener("hashchange", () => {
    const requested = pageFromHash();
    if (requested !== current) go(requested);
  });
  setTheme();
  renderNav();
  $("#content").innerHTML = `<div class="empty">${t("Loading research view\u2026", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u062D\u062B\u2026")}</div>`;
  (async () => {
    try {
      [dataset, analysis] = await Promise.all([get("/api/datasets/flex"), get("/api/analysis")]);
      health().catch(() => {
      });
      await go(current);
      document.documentElement.dataset.morsAppReady = "true";
    } catch (e) {
      $("#content").innerHTML = `<div class="callout warn">Backend not ready. Start this application with <code>npm start</code> in its folder. ${esc(e.message)}</div>`;
    }
  })();
})();
