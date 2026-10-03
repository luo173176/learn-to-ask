import { Link, useParams } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { criticalQuestions } from '../data/criticalQuestions';
import { exercises } from '../data/exercises';
import { speedBumps, thinkingPairs } from '../data/obstacles';
import { useProgressStore } from '../store/useProgressStore';
import QuestionCard from '../components/QuestionCard';

export default function ChapterDetail() {
  const { id } = useParams();
  const chapter = chapters.find((c) => c.id === Number(id));

  const completed = useProgressStore((s) => s.completedChapters);
  const toggleChapter = useProgressStore((s) => s.toggleChapter);
  const readQuestions = useProgressStore((s) => s.readQuestions);
  const toggleQuestion = useProgressStore((s) => s.toggleQuestion);

  if (!chapter) {
    return <p className="text-center text-slate-500">未找到该章节。</p>;
  }

  const questions = criticalQuestions.filter((q) => q.chapterId === chapter.id);
  const chapterExercises = exercises.filter((e) => e.chapterId === chapter.id);
  const done = completed.includes(chapter.id);
  const prev = chapters.find((c) => c.id === chapter.id - 1);
  const next = chapters.find((c) => c.id === chapter.id + 1);

  return (
    <article className="space-y-8">
      {/* 标题区 */}
      <header>
        <p className="text-sm text-primary-600 dark:text-primary-400">第 {String(chapter.id).padStart(2, '0')} 章</p>
        <h1 className="mt-1 text-2xl font-bold">{chapter.title}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{chapter.tagline}</p>
      </header>

      {/* 摘要 */}
      <section className="card">
        <h2 className="mb-2 font-semibold">本章摘要</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{chapter.summary}</p>
      </section>

      {/* 核心概念 */}
      <section>
        <h2 className="section-title">核心概念</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {chapter.concepts.map((c) => (
            <div key={c.title} className="card">
              <h3 className="font-semibold text-primary-700 dark:text-primary-300">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 第 2 章：思维习惯卡片 */}
      {chapter.showObstacles && (
        <section>
          <h2 className="section-title">思维习惯卡片</h2>
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            {thinkingPairs.map((p) => (
              <div key={p.left} className="card text-sm">
                <p className="font-semibold text-primary-700 dark:text-primary-300">{p.left}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{p.leftDesc}</p>
                <hr className="my-3 border-slate-100 dark:border-slate-700" />
                <p className="font-semibold text-primary-700 dark:text-primary-300">{p.right}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{p.rightDesc}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {speedBumps.map((b) => (
              <div key={b.name} className="card text-sm">
                <h3 className="font-semibold">🚧 {b.name}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{b.definition}</p>
                <p className="mt-2 text-slate-500 dark:text-slate-400">自查：{b.selfCheck}</p>
                <p className="mt-1 text-primary-700 dark:text-primary-300">对策：{b.counter}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 自创示例 */}
      <section className="card">
        <h2 className="font-semibold">自创示例：{chapter.example.title}</h2>
        <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-700">
          {chapter.example.content}
        </p>
        <h3 className="mt-3 text-sm font-medium text-primary-600 dark:text-primary-400">用本章工具拆解</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{chapter.example.analysis}</p>
      </section>

      {/* 关键问题 */}
      {questions.length > 0 && (
        <section>
          <h2 className="section-title">本章关键问题</h2>
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionCard key={q.id} q={q} done={readQuestions.includes(q.id)} onToggle={() => toggleQuestion(q.id)} />
            ))}
          </div>
        </section>
      )}

      {/* 练习与操作 */}
      <section className="card flex flex-wrap items-center gap-3">
        <button type="button" className={done ? 'btn-secondary' : 'btn-primary'} onClick={() => toggleChapter(chapter.id)}>
          {done ? '✓ 已完成（点击取消）' : '标记本章已完成'}
        </button>
        {chapterExercises.length > 0 && (
          <Link to="/practice" className="btn-secondary">
            做本章 {chapterExercises.length} 道练习
          </Link>
        )}
        <Link to="/analyzer" className="btn-secondary">
          用分析器实战
        </Link>
      </section>

      {/* 上一章 / 下一章 */}
      <nav className="flex justify-between text-sm">
        {prev ? (
          <Link to={`/chapters/${prev.id}`} className="text-primary-600 hover:underline dark:text-primary-400">
            ← 上一章：{prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/chapters/${next.id}`} className="text-primary-600 hover:underline dark:text-primary-400">
            下一章：{next.title} →
          </Link>
        )}
      </nav>
    </article>
  );
}
