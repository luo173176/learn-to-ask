import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useProgressStore } from '../store/useProgressStore';

export default function Chapters() {
  const completed = useProgressStore((s) => s.completedChapters);

  return (
    <div>
      <h1 className="section-title">章节地图</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        按《学会提问》13 章主题组织的概念提炼与自创示例。已完成 {completed.length}/{chapters.length}。
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((c) => {
          const done = completed.includes(c.id);
          return (
            <Link
              key={c.id}
              to={`/chapters/${c.id}`}
              className={`card block transition hover:-translate-y-0.5 hover:shadow-md ${
                done ? 'border-primary-300 dark:border-primary-800' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">
                  <span className="mr-2 text-primary-600 dark:text-primary-400">{String(c.id).padStart(2, '0')}</span>
                  {c.title}
                </h2>
                {done && <span className="shrink-0 text-sm text-primary-600 dark:text-primary-400">✓ 已完成</span>}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{c.tagline}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
