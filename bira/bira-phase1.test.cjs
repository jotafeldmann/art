/**
 * B.I.R.A. Phase 1 tests — single file.
 *
 * Put this file next to game.html.
 *
 * Install test deps:
 *   npm i -D jest jest-environment-jsdom jsdom
 *
 * Logic tests with Node's built-in test runner:
 *   node --test bira-phase1.test.cjs
 *
 * Visual/DOM tests with Jest:
 *   npx jest bira-phase1.test.cjs --testEnvironment=jsdom
 *
 * Optional:
 *   BIRA_GAME_HTML=/path/to/game.html node --test bira-phase1.test.cjs
 */

const fs = require("node:fs");
const path = require("node:path");

const isJest = Boolean(process.env.JEST_WORKER_ID);

function findGameHtml() {
  const explicit = process.env.BIRA_GAME_HTML;
  if (explicit && fs.existsSync(explicit)) return explicit;

  const local = path.join(process.cwd(), "game.html");
  if (fs.existsSync(local)) return local;

  const besideThisFile = path.join(__dirname, "game.html");
  if (fs.existsSync(besideThisFile)) return besideThisFile;

  throw new Error(
    "Could not find game.html. Put this test file next to game.html or set BIRA_GAME_HTML=/path/to/game.html."
  );
}

function requireJsdom() {
  try {
    return require("jsdom");
  } catch (err) {
    throw new Error(
      "Missing dependency: jsdom. Install with: npm i -D jsdom jest jest-environment-jsdom"
    );
  }
}

async function loadGame() {
  const { JSDOM } = requireJsdom();
  const html = fs.readFileSync(findGameHtml(), "utf8");

  const dom = new JSDOM(html, {
    url: "http://localhost/game.html",
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    beforeParse(window) {
      window.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);
      window.cancelAnimationFrame = (id) => window.clearTimeout(id);

      // Keep the game deterministic for tests. We do not need real Chrome AI here.
      window.LanguageModel = undefined;

      if (!window.structuredClone) {
        window.structuredClone = (value) => JSON.parse(JSON.stringify(value));
      }
    }
  });

  // Let the inline boot() finish.
  await new Promise((resolve) => dom.window.setTimeout(resolve, 40));
  return dom;
}

function getText(dom, selector) {
  const el = dom.window.document.querySelector(selector);
  return el ? el.textContent.trim() : "";
}

async function withGame(fn) {
  const dom = await loadGame();
  try {
    return await fn(dom.window, dom.window.document, dom);
  } finally {
    dom.window.close();
  }
}

if (!isJest) {
  const test = require("node:test");
  const assert = require("node:assert/strict");

  test("logic: column labels support A, Z, AA, AB", async () => {
    await withGame((window) => {
      assert.equal(window.colName(0), "A");
      assert.equal(window.colName(25), "Z");
      assert.equal(window.colName(26), "AA");
      assert.equal(window.colName(27), "AB");

      assert.equal(window.parseColName("A"), 0);
      assert.equal(window.parseColName("Z"), 25);
      assert.equal(window.parseColName("AA"), 26);
      assert.equal(window.parseColName("AB"), 27);
    });
  });

  test("logic: fabricated action IDs are rejected", async () => {
    await withGame((window) => {
      const legalActions = [
        { actionId: "A1", unitId: "u1", type: "MOVE", to: [2, 2] }
      ];

      const result = window.resolveChosenActions(
        { actions: [{ actionId: "move:u1:0:0" }] },
        legalActions
      );

      assert.equal(result.resolved.length, 0);
      assert.equal(result.invalid.length, 1);
      assert.match(result.invalid[0].reason, /not in legalActions/i);
    });
  });

  test("logic: simultaneous attacks can destroy both units", async () => {
    await withGame((window) => {
      const start = [
        { id: "u1", side: "player", hp: 1, x: 1, y: 1 },
        { id: "e1", side: "enemy", hp: 1, x: 1, y: 2 }
      ];

      const playerActions = [
        { unitId: "u1", side: "player", type: "ATTACK", targetId: "e1" }
      ];

      const enemyActions = [
        { unitId: "e1", side: "enemy", type: "ATTACK", targetId: "u1" }
      ];

      const result = window.resolveSimultaneousTurn(start, playerActions, enemyActions);

      assert.deepEqual(result.list, []);
      assert.ok(result.events.some((e) => String(e.text || e).includes("Player u1")));
      assert.ok(result.events.some((e) => String(e.text || e).includes("Enemy e1")));
    });
  });

  test("logic: legal actions contain only MOVE or ATTACK", async () => {
    await withGame((window) => {
      const state = [
        { id: "u1", side: "player", hp: 2, x: 1, y: 1 },
        { id: "e1", side: "enemy", hp: 2, x: 3, y: 1 }
      ];

      const actions = window.makeLegalActionsForSide(state, "player", "attack if possible");

      assert.ok(actions.length > 0);
      assert.ok(actions.every((a) => a.type === "MOVE" || a.type === "ATTACK"));
      assert.ok(actions.some((a) => a.type === "ATTACK" && a.targetId === "e1"));
    });
  });

  test("logic: outcome is draw when both sides have no units", async () => {
    await withGame((window) => {
      const outcome = window.checkOutcome([], 0);
      assert.match(outcome, /draw/i);
    });
  });
}

if (isJest) {
  describe("B.I.R.A. visual smoke tests", () => {
    test("renders title, subtitle, and main tabs", async () => {
      await withGame((window, document) => {
        expect(getText({ window }, "h1")).toContain("B.I.R.A. Tactics Prompt");
        expect(getText({ window }, "#subtitle")).toContain("Battle Intelligence Response Arena");

        expect(document.querySelector("#gameTabBtn")).toBeTruthy();
        expect(document.querySelector("#settingsTabBtn")).toBeTruthy();
        expect(document.querySelector("#helpTabBtn")).toBeTruthy();
      });
    });

    test("settings tab shows setup board and settings panel", async () => {
      await withGame((window, document) => {
        document.querySelector("#settingsTabBtn").click();

        expect(document.querySelector("#settingsTab").classList.contains("hidden")).toBe(false);
        expect(document.querySelector("#settingsSide").classList.contains("hidden")).toBe(false);
        expect(document.querySelector("#gameSide").classList.contains("hidden")).toBe(true);
        expect(getText({ window }, "#resetBtn")).toBe("Reset to standards");
        expect(document.querySelector("#setupBoard")).toBeTruthy();
      });
    });

    test("settings apply supports AA column labels", async () => {
      await withGame((window, document) => {
        document.querySelector("#settingsTabBtn").click();

        const cols = document.querySelector("#cfgCols");
        cols.value = "27";
        document.querySelector("#applySettingsBtn").click();

        expect(getText({ window }, "#setupColLabels")).toContain("AA");
      });
    });

    test("reset to standards restores default 20 columns", async () => {
      await withGame((window, document) => {
        document.querySelector("#settingsTabBtn").click();

        document.querySelector("#cfgCols").value = "27";
        document.querySelector("#applySettingsBtn").click();
        expect(getText({ window }, "#setupColLabels")).toContain("AA");

        document.querySelector("#resetBtn").click();
        expect(document.querySelector("#cfgCols").value).toBe("20");
        expect(getText({ window }, "#setupColLabels")).not.toContain("AA");
      });
    });

    test("help tab contains rules, author, and dedication", async () => {
      await withGame((window, document) => {
        document.querySelector("#helpTabBtn").click();

        const help = getText({ window }, "#helpTab");
        expect(help).toContain("Configurable grid");
        expect(help).toContain("Simultaneous turn resolution");
        expect(help).toContain("Author: Jota Feldmann");
        expect(help).toContain("dedication to my brother Bira");
      });
    });
  });
}
