const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const url = pathToFileURL(path.join(__dirname, "index.html")).href;

  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.getByRole("button", { name: "开始健身" }).click();
  await page.getByRole("button", { name: "添加动作" }).click();
  await page.locator('[data-add-exercise="bench"]').click();
  await page.getByRole("button", { name: "开始第 1 组" }).click();
  await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "结束本组" }).click();
  await page.screenshot({ path: path.join(__dirname, "preview-set-entry.png"), fullPage: true });
  await page.getByLabel("本组重量").fill("62.5");
  await page.getByLabel("完成次数").fill("8");
  await page.getByRole("button", { name: "保存本组" }).click();
  await page.getByRole("button", { name: /添加一组/ }).click();

  const restText = await page.locator(".rest-row").first().textContent();
  if (!restText.includes("组间歇")) throw new Error("组间歇未显示");

  await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "开始第 2 组" }).click();
  await page.waitForTimeout(1100);
  await page.getByRole("button", { name: "结束本组" }).click();
  await page.getByLabel("本组重量").fill("60");
  await page.getByLabel("完成次数").fill("9");
  await page.getByRole("button", { name: "保存本组" }).click();

  await page.screenshot({ path: path.join(__dirname, "preview.png"), fullPage: true });
  await page.getByRole("button", { name: "完成该动作" }).click();
  await page.getByLabel("本次训练记录").fill("卧推状态稳定，第二组注意控制下放。");
  await page.getByRole("button", { name: "结束健身" }).click();
  await page.getByRole("button", { name: "完成", exact: true }).click();
  const chestIds = ["bench", "incline", "chestpress", "fly", "dbbench", "inclinebar", "declinepress", "pecdeck", "pushup"];
  if (chestIds.includes(await page.locator(".quick-exercise").first().getAttribute("data-quick-add"))) throw new Error("训练前建议没有避开上次胸部");

  await page.getByRole("button", { name: "开始健身" }).click();
  await page.getByRole("button", { name: "×" }).click();
  await page.locator(".quick-exercise").first().click();
  await page.getByRole("button", { name: "开始第 1 组" }).click();
  await page.getByRole("button", { name: "结束本组" }).click();
  await page.getByRole("button", { name: "保存本组" }).click();
  await page.getByRole("button", { name: "完成该动作" }).click();
  await page.getByRole("button", { name: "×" }).click();
  const liveReasons = await page.locator(".quick-exercise span").allTextContents();
  if (!liveReasons.every(text => text.startsWith("继续本次"))) throw new Error("开始训练后建议没有切换到相关肌群");
  await page.screenshot({ path: path.join(__dirname, "preview-suggestions.png"), fullPage: true });
  await page.getByRole("button", { name: "继续健身" }).click();
  await page.getByRole("button", { name: "结束健身" }).click();
  await page.getByRole("button", { name: "完成", exact: true }).click();
  await page.locator('[data-nav="history"]').click();
  if (await page.locator(".recent-record").count() !== 2) throw new Error("训练历史未保存");
  if (await page.locator(".calendar-day.trained").count() !== 1) throw new Error("训练日未在日历标记");
  await page.locator(".calendar-day.trained").click();
  await page.locator(".recent-record").first().click();
  await page.getByRole("button", { name: "编辑记录" }).click();
  await page.locator("[data-edit-note]").fill("修改后的训练心得");
  await page.getByRole("button", { name: "保存记录" }).click();
  await page.getByRole("button", { name: "新增当日训练" }).click();
  await page.getByRole("button", { name: "添加动作" }).click();
  await page.locator('[data-add-exercise="bench"]').click();
  await page.locator('[data-edit-set="0:0:weight"]').fill("50");
  await page.locator('[data-edit-set="0:0:reps"]').fill("10");
  await page.locator("[data-edit-note]").fill("补录当日训练");
  await page.screenshot({ path: path.join(__dirname, "preview-history-edit.png"), fullPage: true });
  await page.getByRole("button", { name: "保存记录" }).click();
  if (await page.locator(".recent-record").count() !== 3) throw new Error("当日新增记录未保存");
  await page.getByRole("button", { name: "‹" }).click();
  await page.screenshot({ path: path.join(__dirname, "preview-history.png"), fullPage: true });

  await page.locator('[data-nav="exercises"]').click();
  await page.getByRole("button", { name: "背部", exact: true }).click();
  await page.locator('[data-detail-id="pulldown"]').click();
  if (await page.locator(".tip-card li").count() !== 3) throw new Error("动作要点未显示");
  await page.screenshot({ path: path.join(__dirname, "preview-exercise-detail.png"), fullPage: true });
  await page.getByRole("button", { name: "‹" }).click();
  await page.locator('[data-nav="profile"]').click();
  await page.locator('[data-profile="height"]').fill("175");
  await page.locator('[data-profile="weight"]').fill("70");
  await page.locator('[data-profile="benchMax"]').fill("80");
  await page.reload();
  if (await page.locator('[data-profile="height"]').inputValue() !== "175") throw new Error("个人档案未保存");
  await page.screenshot({ path: path.join(__dirname, "preview-profile.png"), fullPage: true });
  await browser.close();
  process.stdout.write("Prototype smoke test passed\n");
})().catch(error => {
  process.stderr.write(`${error.stack}\n`);
  process.exit(1);
});
