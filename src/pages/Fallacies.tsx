import { useState } from 'react';
import { fallacies } from '../data/fallacies';
import FallacyCard from '../components/FallacyCard';

export default function Fallacies() {
  const [q, setQ] = useState('');
  const keyword = q.trim().toLowerCase();
  const list = fallacies.filter(
    (f) => !keyword || f.name.includes(keyword) || f.enName.toLowerCase().includes(keyword) || f.definition.includes(keyword),
  );

  return (
    <div>
      <h1 className="section-title">谬误图鉴</h1>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {fallacies.length} 种常见论证谬误。认出谬误只让你有理由拒绝那部分论证——记得公平对待其余理由。
      </p>
      <input className="input mb-6" placeholder="搜索谬误名称或定义……" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">没有匹配的谬误。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((f) => (
            <FallacyCard key={f.id} f={f} />
          ))}
        </div>
      )}
    </div>
  );
}
