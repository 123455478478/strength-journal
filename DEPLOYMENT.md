# 力记部署说明

## 当前状态

`prototype` 文件夹已经是独立的静态 PWA：

- 不需要服务器或数据库。
- 可部署到任意 HTTPS 静态托管平台。
- 首次打开后会缓存应用外壳，支持离线再次打开。
- 训练和个人数据仍保存在用户当前浏览器本机。

## 发布目录

```text
prototype/
├── index.html
├── app.js
├── styles.css
├── manifest.webmanifest
├── service-worker.js
└── icon.svg
```

部署平台的发布目录应设置为 `prototype`，不需要构建命令。

## 可选托管方式

### GitHub Pages

将项目推送到 GitHub 后，把 `prototype` 文件夹作为 Pages 发布内容。页面必须使用 HTTPS，安装和离线缓存才会启用。

### Netlify / Cloudflare Pages

- 构建命令：留空。
- 发布目录：`prototype`。
- 部署完成后直接访问平台分配的 HTTPS 地址。

## 部署后检查

1. 首页能正常打开。
2. 浏览器开发工具中 Manifest 可识别。
3. Service Worker 状态为 activated。
4. 添加一条测试训练，刷新后记录仍然存在。
5. 断网刷新，应用外壳仍能打开。
6. 手机浏览器可以“添加到主屏幕”。

## 数据限制

当前版本使用浏览器本地存储：

- 不同设备之间不会自动同步。
- 清理浏览器站点数据会删除本地记录。
- 正式使用前应通过“我的”定期导出 JSON 备份。

如果下一阶段需要多设备同步，需要增加账号、后端数据库、身份验证和隐私策略。
