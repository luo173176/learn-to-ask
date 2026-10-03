<div align="center">

# learn-to-ask · 学会提问 · 批判性思维训练营

**把《学会提问》里的 10 个关键问题，变成可操作的提问流程、论证分析器和练习系统。**

[![CI](https://github.com/luo173176/learn-to-ask/actions/workflows/deploy.yml/badge.svg)](https://github.com/luo173176/learn-to-ask/actions)
[![Code License: MIT](https://img.shields.io/badge/Code%20License-MIT-green.svg)](./LICENSE)
[![Content License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content%20License-CC%20BY--NC--SA%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)

</div>

> ⚠️ 本项目与《学会提问》原书作者（尼尔·布朗、斯图尔特·基利）及出版社（机械工业出版社）**无任何官方关联**。
> 项目只做**概念提炼、结构化整理、自创示例、交互工具和练习**，不复制原书大段原文、练习题或受版权保护的完整内容。

## 这是什么

一个**纯前端、无后端、无 API Key** 的批判性思维学习与训练工具，部署在 GitHub Pages 上：

- 🗺️ **章节地图**：按《学会提问》13 章主题组织，每章含核心概念、关键问题、自创生活化示例与练习入口。
- ✅ **关键问题清单**：10 个核心批判性问题，可勾选、可展开、可一键复制。
- 🔬 **论证分析器**：8 步引导式表单，从论题、结论一路拆到合理结论，生成 Markdown 分析报告，支持保存历史、导出 `.md`。
- 🃏 **谬误图鉴**：13 种常见论证谬误（人身攻击、滑坡、诉诸公众……），每种含定义、识别问题、自创例子、反例与回应话术。
- 🧪 **证据评估器**：直觉、个人经历、典型案例、当事人证言、专家意见、个人观察、研究报告、类比 8 类证据的检查清单。
- ✍️ **练习模式**：39 道自创练习（单选 / 多选 / 判断 / 排序 / 填空 / 短文分析），即时反馈与解析。
- 🤖 **AI 提示词生成器**：根据你的分析内容生成可复制到 ChatGPT / Claude 等工具的提示词，让外部 AI 当你的“分析陪练”。
- 📈 **进度追踪**：localStorage 记录章节完成度、练习正确率、报告数量。
- 🔍 **全文搜索**：基于 Fuse.js，搜章节、关键问题、谬误、练习。
- 🌗 **响应式 + 暗色模式**。

## 技术栈

Vite 5 · React 18 · TypeScript · Tailwind CSS 3 · React Router（HashRouter，适配 GitHub Pages）· Zustand（localStorage 持久化）· Fuse.js · Vitest

## 快速开始

```bash
git clone https://github.com/luo173176/learn-to-ask.git
cd learn-to-ask
npm install
npm run dev        # 本地开发 http://localhost:5173
npm run test       # 运行 Vitest 测试
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 部署

已内置 `.github/workflows/deploy.yml`：推送到 `main` 分支即自动测试 → 构建 → 发布到 GitHub Pages（仓库 Settings → Pages → Source 选 **GitHub Actions**）。

默认构建路径为 `/learn-to-ask/`。若使用自定义域名或仓库名不同，修改 `vite.config.ts` 中的 `base` 或在构建时设置环境变量 `VITE_BASE_PATH`。

## 目录结构

```text
learn-to-ask/
├─ .github/workflows/deploy.yml   # Pages 部署工作流
├─ public/favicon.svg
├─ src/
│  ├─ components/                 # 可复用组件（导航、卡片、练习卡等）
│  ├─ data/                       # 全部教学内容的单一数据源（纯 TS）
│  │  ├─ chapters.ts              #   13 章：摘要 / 概念 / 自创示例
│  │  ├─ criticalQuestions.ts     #   10 个关键问题
│  │  ├─ fallacies.ts             #   13 种谬误卡片
│  │  ├─ evidenceTypes.ts         #   8 类证据检查清单
│  │  ├─ exercises.ts             #   39 道自创练习
│  │  └─ obstacles.ts             #   第 2 章思维习惯卡片
│  ├─ pages/                      # 路由页面
│  ├─ store/                      # Zustand + localStorage 持久化
│  ├─ types/                      # 类型定义
│  ├─ utils/                      # 报告导出 / AI 提示词 / Fuse.js 搜索
│  └─ __tests__/…                 # Vitest 测试（数据完整性与工具函数）
└─ README.md
```

核心约定：改教学内容只需要动 `src/data/`，不需要动组件。

## 内容与许可

| 部分 | 许可 |
| --- | --- |
| 代码 | [MIT](./LICENSE) |
| 章节摘要、示例、练习、谬误卡片等教学内容 | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)（署名—非商业性使用—相同方式共享） |

欢迎 PR 补充章节摘要、自创示例、练习题和谬误案例，请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。提交内容即表示你同意以 CC BY-NC-SA 4.0 授权，并保证为原创或已获授权。

## 免责声明

本项目是学习工具，不构成专业、医疗、法律或投资建议。工具输出的“分析报告”只反映使用者在表单中填写的内容，不代表任何权威结论。

## 参考与致谢

- 尼尔·布朗、斯图尔特·基利《学会提问（原书第 11 版）》——本项目的思想来源，仅做概念层面的提炼与再创作
- T. Edward Damer《好好讲道理：反击谬误的逻辑学训练》
- 丹尼尔·卡尼曼《思考，快与慢》
- Jonathan Haidt《正义之心》
