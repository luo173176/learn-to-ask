import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { exercises } from '../data/exercises';
import { fallacies } from '../data/fallacies';
import { useProgressStore } from '../store/useProgressStore';
import ProgressBar from '../components/ProgressBar';

const PATH = [
  { n: '01', title: '读章节地图', desc: '13 章核心概念 + 自创示例，先建立问题意识', to: '/chapters' },
  { n: '02', title: '练关键问题', desc: '10 个关键问题清单 + 练习题，形成提问反射', to: '/questions' },
  { n: '03', title: '上手真论证', desc: '用分析器拆一篇真实文章，导出 Markdown 报告', to: '/analyzer' },
];

const TOOLS = [
  { title: '论证分析器', desc: '8 步引导式拆解一篇文章', to: '/analyzer' },
  { title: '谬误图鉴', desc: '13 种谬误的定义与回应话术', to: '/fallacies' },
  { title: '证据评估器', desc: '8 类证据的检查清单', to: '/evidence' },
  { title: '练习模式', desc: `${exercises.length} 道自创练习题`, to: '/practice' },
  { title: 'AI 提示词', desc: '生成给 ChatGPT / Claude 的分析提示词', to: '/prompts' },
  { title: '全文搜索', desc: '搜章节、问题、谬误与练习', to: '/search' },
];

export default function Home() {
  const completed = useProgressStore((s) => s.completedChapters);
  const stats = useProgressStore((s) => s.exerciseStats);
  const reportCount = useProgressStore((s) => s.reportCount);
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">学会提问 · 批判性思维训练营</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
          把《学会提问》中的十大关键问题，变成可操作的提问流程、论证分析器和练习系统。
          纯前端运行，所有数据保存在你自己的浏览器里。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/chapters" className="btn-primary">
            从第 01 章开始
          </Link>
          <Link to="/analyzer" className="btn-secondary">
            直接进入分析器
          </Link>
        </div>
      </section>

      {/* 学习路径 */}
      <section>
        <h2 className="section-title">三步学习路径</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PATH.map((p) => (
            <Link key={p.to} to={p.to} className="card block transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{p.n}</p>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 进度概览 */}
      <section>
        <h2 className="section-title">我的进度</h2>
        <div className="card space-y-4">
          <ProgressBar label={`章节完成（${completed.length}/${chapters.length}）`} value={(completed.length / chapters.length) * 100} />
          <ProgressBar label={`练习正确率（已答 ${stats.total} 题）`} value={accuracy} />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            已保存 {reportCount} 份分析报告 · 谬误图鉴收录 {fallacies.length} 种
          </p>
        </div>
      </section>

      {/* 工具入口 */}
      <section>
        <h2 className="section-title">训练工具</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="card block transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
