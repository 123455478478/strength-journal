# 力记 · Strength Journal

一款面向个人使用的健身房力量训练记录 PWA。它不安排训练计划，也不要求注册账号，只负责准确记录实际完成的动作、重量、次数、时间和组间歇。

**在线使用：** [https://123455478478.github.io/strength-journal/](https://123455478478.github.io/strength-journal/)

## 核心功能

- 自由开始一场训练，按实际情况添加动作和训练组。
- 每组通过“开始本组”和“完成本组”自动记录时间。
- 自动计算每组持续时间、动作内组间歇和动作总用时。
- 记录动作名称、目标肌群、重量、次数、组数和训练时间。
- 内置 54 个常见胸部、背部、肩部、手臂和腿部动作。
- 每个动作提供负重倾向、常用次数范围和关键注意事项。
- 根据最近训练记录和当前训练肌群实时排列建议动作。
- 通过月历标记训练日期，并按时间回看完整记录。
- 保存身高、体重、年龄、性别以及卧推、深蹲、引体向上和俯卧撑极限。
- 支持 JSON 完整备份和 CSV 训练记录导出。
- 支持添加到手机主屏幕，首次联网访问后可离线打开。

## 计时方式

应用使用每组的真实开始与结束时间计算训练数据：

```text
本组持续时间 = 本组结束时间 - 本组开始时间
组间间歇 = 下一组开始时间 - 上一组结束时间
动作总用时 = 最后一组结束时间 - 第一组开始时间
训练总用时 = 训练结束时间 - 训练开始时间
```

即使锁屏、切换应用或关闭页面，重新打开后也会根据时间戳恢复计时状态。

## 建议动作逻辑

建议只改变动作排列，不会自动制定训练计划：

- **第一组开始前：**读取前两次训练记录，避开上一次训练过的部位，优先显示最近覆盖较少的肌群。
- **第一组开始后：**只推荐与最近开始动作属于同一肌群的相关动作。
- **动作偏好：**在候选范围内，根据最近八次训练的使用频率排列常用动作。
- 已经加入本次训练的动作不会重复推荐。

全部计算都在浏览器本机完成。

## 界面预览

| 实时建议 | 动作详情 |
| --- | --- |
| ![实时建议](prototype/preview-suggestions.png) | ![动作详情](prototype/preview-exercise-detail.png) |

| 历史日历 | 个人档案 |
| --- | --- |
| ![历史日历](prototype/preview-history.png) | ![个人档案](prototype/preview-profile.png) |

## 数据与隐私

- 不需要注册或登录。
- 训练记录和个人档案默认只保存在当前浏览器的本地存储中。
- GitHub Pages、GitHub 仓库和应用开发者都不会自动收到个人训练数据。
- 不同设备和不同浏览器之间不会自动同步。
- 清理浏览器站点数据会删除本地记录，建议定期导出 JSON 备份。

## 安装到手机

1. 使用手机浏览器打开[在线应用](https://123455478478.github.io/strength-journal/)。
2. Android Chrome 选择“安装应用”或“添加到主屏幕”。
3. iPhone Safari 选择“分享”→“添加到主屏幕”。

## 本地运行

应用是无构建步骤的静态 PWA。进入 `prototype` 目录后启动任意静态文件服务器，例如：

```powershell
python -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

直接打开 `index.html` 可以体验主要功能，但 Service Worker 和离线缓存需要通过 `http://localhost` 或 HTTPS 运行。

## 项目结构

```text
strength-journal/
├── prototype/                   # 可直接部署的 PWA
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── manifest.webmanifest
│   ├── service-worker.js
│   └── icon.svg
├── .github/workflows/           # GitHub Pages 自动部署
├── PRODUCT_DESIGN.md            # 产品设计
├── SOFTWARE_DESIGN.md           # 软件设计
└── DEPLOYMENT.md                # 部署说明
```

## 部署

推送到 `main` 分支后，GitHub Actions 会将 `prototype` 目录自动发布到 GitHub Pages。详细说明见 [DEPLOYMENT.md](DEPLOYMENT.md)。

## 动作资料说明

负重和次数倾向参考 ACSM 阻力训练指南的一般原则；动作执行要点参考 ACE Exercise Library 后整理为简短中文提示。这些内容仅用于一般健身信息展示，不替代教练评估、康复指导或医疗建议。

- [ACSM Resistance Training Guidelines](https://acsm.org/resistance-training-guidelines-update-2026/)
- [ACE Exercise Library](https://www.acefitness.org/resources/everyone/exercise-library/equipment/)
