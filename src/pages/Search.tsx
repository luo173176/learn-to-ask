import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAll } from '../utils/search';

export default function Search() {
  const [q, setQ] = useState('');
  const results = useMemo(() => searchAll(q), [q]);

  return (
    <div>
      <h1 className="section-title">搜索</h1>
      <input
        className="input mb-6"
        autoFocus
        placeholder="搜索章节、关键问题、谬误、证据类型、练习……"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {q.trim() && <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">找到 {results.length} 条结果</p>}

      <div className="space-y-3">
        {results.map((r) => (
          <Link key={`${r.category}-${r.id}`} to={r.path} className="card block transition hover:shadow-md">
            <span className="tag">{r.category}</span>
            <h3 className="mt-2 font-medium">{r.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{r.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
