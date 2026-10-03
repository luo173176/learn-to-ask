import { useState } from 'react';
import { chapters } from '../data/chapters';
import { exercises } from '../data/exercises';
import type { ExerciseType } from '../types';
import { useProgressStore } from '../store/useProgressStore';
import ExerciseCard from '../components/ExerciseCard';

const TYPE_OPTIONS: { value: ExerciseType | 'all'; label: string }[] = [
  { value: 'all', label: '全部题型' },
  { value: 'single', label: '单选' },
  { value: 'multiple', label: '多选' },
  { value: 'trueFalse', label: '判断' },
  { value: 'ordering', label: '排序' },
  { value: 'fill', label: '填空' },
  { value: 'analysis', label: '短文分析' },
];

export default function Practice() {
  const [chapter, setChapter] = useState<number | 'all'>('all');
  const [type, setType] = useState<ExerciseType | 'all'>('all');
  const stats = useProgressStore((s) => s.exerciseStats);
  const recordMap = useProgressStore((s) => s.exerciseRecord);

  const list = exercises.filter(
    (e) => (chapter === 'all' || e.chapterId === chapter) && (type === 'all' || e.type === type),
  );
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div>
      <h1 className="section-title">练习模式</h1>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        共 {exercises.length} 道自创练习。已答 {stats.total} 题，正确率 {accuracy}%。每题即时反馈与解析。
      </p>

      {/* 筛选 */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="input max-w-xs"
          value={chapter}
          onChange={(e) => setChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        >
          <option value="all">全部章节</option>
          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              第 {String(c.id).padStart(2, '0')} 章 {c.title}
            </option>
          ))}
        </select>
        <select className="input max-w-xs" value={type} onChange={(e) => setType(e.target.value as ExerciseType | 'all')}>
          {TYPE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">没有匹配的练习，换一个筛选条件试试。</p>
      ) : (
        <div className="space-y-4">
          {list.map((ex) => (
            <div key={ex.id} className="relative">
              {recordMap[ex.id] === true && (
                <span className="absolute right-4 top-4 z-10 text-sm text-green-600 dark:text-green-400">✓ 曾答对</span>
              )}
              <ExerciseCard ex={ex} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
