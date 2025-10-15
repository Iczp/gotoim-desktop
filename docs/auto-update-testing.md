# 本地自动更新（Auto Update）测试指南

此文档说明如何在本地测试 Electron 应用的自动更新功能（使用本仓库提供的简单 nginx 静态服务器）。

前提

- 已启动本地更新服务器（参见项目根的 `docker-compose.yml`，运行 `docker compose up -d`）。

- 本地服务器地址： `http://localhost:7755/auto-updates`

步骤

1. 确认 `dev-app-update.yml` 指向本地地址：

```yaml
provider: generic
url: http://localhost:7755/auto-updates
updaterCacheDirName: gotoim-desktop-updater
```

2. 把要发布的更新文件（例如 `sample-1.0.1.zip`）放入 `build/updates/`，并在该目录创建或更新描述文件（例如 `sample-update.yml`）。

3. 启动本地 nginx 更新服务：

```powershell
docker compose up -d
```

4. 在 Electron 主进程触发更新检查（示例）

在 `src/main/index.ts`（或你的主进程启动脚本）里调用自动更新 API：

```ts
import { autoUpdater } from 'electron-updater'

// 设置 feed URL（可选，如果使用 dev-app-update.yml，可直接由配置读取）
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'http://localhost:8080/auto-updates',
})

autoUpdater.checkForUpdatesAndNotify()

autoUpdater.on('update-available', (info) => {
  console.log('update available', info)
})

autoUpdater.on('update-downloaded', (info) => {
  console.log('update downloaded', info)
  // autoUpdater.quitAndInstall()
})
```

5. 在浏览器中确认 `dev-app-update.yml` 与更新文件可访问：

- `http://localhost:8080/auto-updates/dev-app-update.yml`
- `http://localhost:8080/auto-updates/files/sample-update.yml`

注意

- 本地测试使用 HTTP。若目标环境需要 HTTPS，请配置 nginx 使用自签名证书或使用 tunneling 服务（如 ngrok）以提供 HTTPS。
- 不要在公共网络中暴露未加密的更新服务器。
