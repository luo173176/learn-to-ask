# 贡献指南

感谢你关注 learn-to-ask！欢迎以下几类贡献：

## 可以贡献什么

1. **教学内容**：章节摘要、核心概念、自创示例、练习题、谬误案例、证据检查清单。
2. **功能与修复**：组件、页面、store、工具函数的问题修复与新特性。
3. **文档**：README、部署说明、翻译。

## 内容贡献的硬性规则

- **只做提炼与再创作**：不复制《学会提问》原书的大段原文、练习题或受版权保护的完整内容。所有摘要用自己的话写，所有示例自创。
- **自创示例贴近生活**：优先选广告、新闻、社交媒体、职场、消费、健康、教育等日常场景。
- **提交即授权**：提交内容即表示你同意以 CC BY-NC-SA 4.0 授权该内容，并保证其为原创或已获授权。

## 内容改动怎么改

全部教学内容集中在 `src/data/` 下的纯 TS 数据文件：

| 文件 | 内容 |
| --- | --- |
| `chapters.ts` | 13 章摘要、概念、自创示例 |
| `criticalQuestions.ts` | 10 个关键问题 |
| `fallacies.ts` | 13 种谬误卡片 |
| `evidenceTypes.ts` | 8 类证据检查清单 |
| `exercises.ts` | 练习题 |
| `obstacles.ts` | 第 2 章思维习惯卡片 |

新增练习时请同步运行 `npm run test`，数据完整性测试会校验每章练习数量与答案合法性。

## 开发流程

```bash
git clone https://github.com/luo173176/learn-to-ask.git
cd learn-to-ask && npm install
npm run dev          # 本地开发
npm run test         # 提交前跑测试
npm run build        # 确认构建通过
```

1. Fork → 新建分支（`feat/xxx` 或 `fix/xxx`）
2. 提交（建议中文提交信息，一句话说清做了什么）
3. 发起 PR，描述改动点与动机

## 代码风格

- TypeScript strict 模式，组件用函数组件 + Hooks
- 中文注释，注释只解释“为什么”，不复述代码
- UI 文案与 README 均为简体中文
