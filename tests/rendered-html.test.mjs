import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders an honest, indexable homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Paintless Dent Repair Fishers IN/);
  assert.match(html, /independent consumer resource and referral service/i);
  assert.match(html, /Request a free assessment/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /aggregateRating|LocalBusiness/i);
});

test("renders policy and substantive service pages", async () => {
  for (const [path, expected] of [["/privacy", "Privacy policy"], ["/terms", "Terms of use"], ["/services/hail-damage-repair", "Hail damage repair in Fishers"]]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(expected, "i"));
  }
});
