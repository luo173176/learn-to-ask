import { useState } from 'react';
import type { CriticalQuestion } from '../types';
import CopyButton from './CopyButton';

interface Props {
  q: CriticalQuestion;
  done: boolean;
  onToggle: () => void;
}

export default function QuestionCard({ q, done, onToggle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-lg border p-4 transition ${
        done
          ? 'border-primary-300 bg-primary-50 dark:border-primary-800 dark:bg-slate-800'
          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={onToggle}
          aria-label={`标记完成：${q.question}`}
          className="mt-1 h-4 w-4 accent-primary-500"
        />
        <div className="flex-1 cursor-pointer" onClick={() => setOpen(!open)}>
          <h3 className={`font-medium ${done ? 'text-primary-700 dark:text-primary-300' : ''}`}>
            <span className="tag mr-2">第 {q.chapterId} 章</span>
            {q.question}
          </h3>
          {!open && (
            <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">{q.description}</p>
          )}
        </div>
        <CopyButton text={q.question} className="shrink-0" />
      </div>

      {open && (
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">{q.description}</p>
          <div>
            <p className="font-medium text-primary-600 dark:text-primary-400">怎么问：</p>
            <ol className="ml-5 list-decimal space-y-1 text-slate-600 dark:text-slate-300">
              {q.howTo.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
