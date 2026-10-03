import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="section-title">关于本项目</h1>
      </header>

      <section className="card">
        <h2 className="mb-2 font-semibold">项目定位</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          learn-to-ask 是一个批判性思维学习与训练工具，基于《学会提问》（尼尔·布朗、斯图尔特·基利，原书第
          11 版）的核心思想构建。项目只做概念提炼、结构化整理、自创示例、交互工具和练习，
          不复制原书大段原文、练习题或受版权保护的完整内容。
        </p>
        <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-slate-700 dark:text-amber-300">
          ⚠️ 本项目与原书作者及出版社（机械工业出版社）无任何官方关联。
        </p>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold">版权与许可</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>代码：MIT License（见仓库 LICENSE 文件）</li>
          <li>
            章节摘要、示例、练习、谬误卡片等教学内容：CC BY-NC-SA 4.0（署名—非商业性使用—相同方式共享）
          </li>
        </ul>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold">贡献指南</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          欢迎 PR 补充章节摘要、自创示例、练习题与谬误案例。请先阅读仓库中的 CONTRIBUTING.md：
          所有内容必须为原创或已获授权，示例尽量贴近日常生活（广告、新闻、社交媒体、职场、消费、健康、教育等）。
        </p>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold">参考书目</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>尼尔·布朗、斯图尔特·基利《学会提问（原书第 11 版）》——思想来源</li>
          <li>T. Edward Damer《好好讲道理：反击谬误的逻辑学训练》——谬误扩展阅读</li>
          <li>丹尼尔·卡尼曼《思考，快与慢》——系统 1 / 系统 2</li>
          <li>乔纳森·海特《正义之心》——价值观与道德心理</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold">免责声明</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          本项目是学习工具，不构成专业、医疗、法律或投资建议。论证分析器输出的报告只反映使用者在表单中填写的内容，
          不代表任何权威结论。学习数据仅保存在你的浏览器 localStorage 中，清空浏览器数据即被删除。
        </p>
      </section>

      <p className="text-center text-sm">
        <Link to="/" className="text-primary-600 hover:underline dark:text-primary-400">
          返回首页
        </Link>
      </p>
    </div>
  );
}
