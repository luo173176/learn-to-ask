import { useState } from 'react';
import type { Fallacy } from '../types';

export default function FallacyCard({ f }: { f: Fallacy }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <div>
          <h3 className="font-semibold">{f.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{f.enName}</p>
        </div>
        <span className="text-xs text-slate-400">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.definition}</p>

      {open && (
        <div className="mt-3 space-y-3 border-t border-slate-100 pt-3 text-sm dark:border-slate-700">
          <section>
            <h4 className="font-medium text-primary-600 dark:text-primary-400">怎么识别</h4>
            <ul className="ml-5 list-disc space-y-1 text-slate-600 dark:text-slate-300">
              {f.identify.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="font-medium text-primary-600 dark:text-primary-400">自创例子</h4>
            <p className="text-slate-600 dark:text-slate-300">{f.example}</p>
          </section>
          <section>
            <h4 className="font-medium text-primary-600 dark:text-primary-400">什么时候不算谬误</h4>
            <p className="text-slate-600 dark:text-slate-300">{f.counter}</p>
          </section>
          <section>
            <h4 className="font-medium text-primary-600 dark:text-primary-400">如何回应</h4>
            <p className="rounded-lg bg-primary-50 px-3 py-2 text-primary-800 dark:bg-slate-700 dark:text-primary-200">
              {f.response}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
