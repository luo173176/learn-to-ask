import { useState } from 'react';
import type { EvidenceType } from '../types';

export default function EvidenceChecklist({ t }: { t: EvidenceType }) {
  const [checked, setChecked] = useState<boolean[]>(t.checklist.map(() => false));
  const done = checked.filter(Boolean).length;

  return (
    <div className="card">
      <h3 className="font-semibold">
        {t.name}
        <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">{t.enName}</span>
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.description}</p>

      <ul className="mt-3 space-y-2 text-sm">
        {t.checklist.map((c, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((arr) => arr.map((v, j) => (j === i ? !v : v)))}
                className="mt-0.5 h-4 w-4 accent-primary-500"
              />
              <span className="text-slate-600 dark:text-slate-300">{c}</span>
            </label>
          </li>
        ))}
      </ul>

      <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-slate-700 dark:text-amber-300">
        ⚠ 常见坑：{t.pitfall}
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        已核对 {done}/{t.checklist.length}
      </p>
    </div>
  );
}
