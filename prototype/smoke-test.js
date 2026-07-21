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
  await page.getByRole("button", { name: "结束健身" }).click();
  if (!await page.getByRole("button", { name: "开始健身" }).isVisible()) throw new Error("空训练结束后没有返回首页");
  const emptyHistoryCount = await page.evaluate(() => JSON.parse(localStorage.getItem("strength-journal-recorder-v2")).history.length);
  if (emptyHistoryCount !== 0) throw new Error("没有动作的空训练被错误写入历史");

  await page.getByRole("button", { name: "开始健身" }).click();
  await page.getByRole("button", { name: "先添加一个动作" }).click();
  await page.locator('[data-add-exercise="bench"]').click();
  await page.getByRole("button", { name: "‹" }).click();
  await page.getByRole("button", { name: "结束健身" }).click();
  if (!await page.getByRole("button", { name: "开始健身" }).isVisible()) throw new Error("添加动作但未完成组时无法结束健身");
  const unfinishedHistoryCount = await page.evaluate(() => JSON.parse(localStorage.getItem("strength-journal-recorder-v2")).history.length);
  if (unfinishedHistoryCount !== 0) throw new Error("没有完成组的训练被错误写入历史");

  await page.getByRole("button", { name: "开始健身" }).click();
  await page.getByRole("button", { name: "先添加一个动作" }).click();
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
  await page.getByRole("button", { name: "结束健身" }).click();
  await page.getByLabel("本次训练心得").fill("卧推状态稳定，第二组注意控制下放。");
  await page.getByRole("button", { name: "完成", exact: true }).click();
  const savedNote = await page.evaluate(() => JSON.parse(localStorage.getItem("strength-journal-recorder-v2")).history[0].note);
  if (savedNote !== "卧推状态稳定，第二组注意控制下放。") throw new Error("结束总结页的训练心得未保存");
  const chestIds = ["bench", "incline", "chestpress", "fly", "dbbench", "inclinebar", "declinepress", "pecdeck", "pushup"];
  if (chestIds.includes(await page.locator(".quick-exercise").first().getAttribute("data-quick-add"))) throw new Error("训练前建议没有避开上次胸部");

  await page.getByRole("button", { name: "开始健身" }).click();
  await page.getByRole("button", { name: "×" }).click();
  const heroTimeBefore = await page.locator('[data-live="workout"]').textContent();
  await page.waitForTimeout(1100);
  const heroTimeAfter = await page.locator('[data-live="workout"]').textContent();
  if (heroTimeBefore === heroTimeAfter) throw new Error("首页训练计时没有实时更新");
  await page.locator(".quick-exercise").first().click();
  await page.getByRole("button", { name: "开始第 1 组" }).click();
  await page.getByRole("button", { name: "结束本组" }).click();
  await page.getByRole("button", { name: "保存本组" }).click();
  await page.getByRole("button", { name: "完成该动作" }).click();
  await page.getByRole("button", { name: "×" }).click();
  const liveReasons = await page.locator(".quick-exercise span").allTextContents();
  if (!liveReasons.every(text => text.startsWith("继续本次"))) throw new Error("开始训练后建议没有切换到相关肌群");
  await page.screenshot({ path: path.join(__dirname, "preview-suggestions.png"), fullPage: true });
  await page.locator('.bottom-nav [data-nav="exercises"]').click();
  if (!await page.locator(".bottom-nav").isVisible()) throw new Error("训练中的动作库缺少底部导航");
  await page.locator('[data-detail-id]').first().click();
  if (!await page.locator(".bottom-nav").isVisible()) throw new Error("动作详情缺少底部导航");
  await page.getByRole("button", { name: "‹" }).click();
  await page.getByRole("button", { name: "×" }).click();
  if (!await page.getByRole("heading", { name: "记录真实训练" }).isVisible()) throw new Error("动作详情退出后没有返回训练首页");
  await page.locator(".hero-end").click();
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
  const swipeCard = page.locator(".swipe-record").first();
  await swipeCard.locator(".recent-record").dispatchEvent("touchstart", { touches: [{ identifier: 0, clientX: 300, clientY: 100 }] });
  await swipeCard.locator(".recent-record").dispatchEvent("touchmove", { touches: [{ identifier: 0, clientX: 210, clientY: 100 }] });
  await swipeCard.locator(".recent-record").dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 210, clientY: 100 }] });
  if (!await swipeCard.evaluate(node => node.classList.contains("open"))) throw new Error("历史记录左滑未显示删除按钮");
  page.once("dialog", dialog => dialog.accept());
  await swipeCard.locator(".swipe-delete").click();
  if (await page.locator(".recent-record").count() !== 2) throw new Error("左滑删除记录失败");
  await page.getByRole("button", { name: "‹" }).click();
  await page.screenshot({ path: path.join(__dirname, "preview-history.png"), fullPage: true });

  await page.locator('[data-nav="exercises"]').click();
  for (const group of ["胸部", "背部", "肩部", "手臂", "腿"]) {
    await page.getByRole("button", { name: group, exact: true }).click();
    if (await page.locator(".group-summary strong").textContent() !== group) throw new Error(`${group}筛选按钮无法使用`);
  }
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
