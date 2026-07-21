const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml"
};

const server = http.createServer((request, response) => {
  const requested = request.url === "/" ? "/index.html" : request.url;
  const file = path.join(__dirname, requested.split("?")[0]);
  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    response.end(data);
  });
});

(async () => {
  await new Promise(resolve => server.listen(4173, "127.0.0.1", resolve));
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:4173/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  if (!controlled) throw new Error("Service Worker 未接管页面");

  await page.context().setOffline(true);
  await page.reload();
  if (!await page.getByRole("heading", { name: "记录真实训练" }).isVisible()) throw new Error("离线页面未打开");
  await page.context().setOffline(false);

  await browser.close();
  server.close();
  process.stdout.write("Deployment test passed\n");
})().catch(error => {
  server.close();
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
