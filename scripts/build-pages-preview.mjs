import { cp, mkdir, writeFile } from "node:fs/promises";

const base = "/fishers-pdr-guide";
const routes = [
  "/",
  "/is-pdr-right-for-my-dent",
  "/paintless-dent-repair-cost",
  "/how-it-works",
  "/services/hail-damage-repair",
  "/services/door-ding-repair",
  "/services/minor-dent-repair",
  "/privacy",
  "/terms",
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const assets = { fetch: async () => new Response("Not found", { status: 404 }) };

await mkdir(new URL("../docs/", import.meta.url), { recursive: true });
await cp(new URL("../dist/client/", import.meta.url), new URL("../docs/", import.meta.url), { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://kfiggins.github.io${route}`, { headers: { accept: "text/html" } }),
    { ASSETS: assets },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`${route} rendered with ${response.status}`);
  let html = await response.text();
  html = html
    .replace("<head>", '<head><meta name="robots" content="noindex,nofollow">')
    .replaceAll('href="/', `href="${base}/`)
    .replaceAll('src="/', `src="${base}/`)
    .replaceAll('content="https://fishersdentrepair.com/', `content="https://kfiggins.github.io${base}/`)
    .replaceAll('https://fishersdentrepair.com"', `https://kfiggins.github.io${base}/"`);
  const directory = route === "/" ? new URL("../docs/", import.meta.url) : new URL(`../docs${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

await writeFile(new URL("../docs/.nojekyll", import.meta.url), "");
await writeFile(new URL("../docs/robots.txt", import.meta.url), "User-agent: *\nDisallow: /\n");
await writeFile(new URL("../docs/404.html", import.meta.url), '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Not found</title><p>That preview page does not exist. <a href="/fishers-pdr-guide/">Return home</a>.</p>');

console.log(`Generated ${routes.length} GitHub Pages routes in docs/`);
