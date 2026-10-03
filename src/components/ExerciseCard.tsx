import { useState } from 'react';
import type { Exercise } from '../types';
import { useProgressStore } from '../store/useProgressStore';

const TYPE_LABELS: Record<Exercise['type'], string> = {
  single: '单选',
  multiple: '多选',
  trueFalse: '判断',
  ordering: '排序',
  fill: '填空',
  analysis: '短文分析',
};

// Fisher-Yates 洗牌，用于排序题初始乱序
function shuffle(arr: number[]): number[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExerciseCard({ ex }: { ex: Exercise }) {
  const record = useProgressStore((s) => s.recordExercise);

  const [picked, setPicked] = useState<number[]>([]);
  const [tf, setTf] = useState<boolean | null>(null);
  const [order, setOrder] = useState<number[]>(() => shuffle((ex.items ?? []).map((_, i) => i)));
  const [fills, setFills] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<null | boolean>(null);

  const checkCorrect = (): boolean => {
    switch (ex.type) {
      case 'single':
        return picked.length === 1 && picked[0] === ex.answer;
      case 'multiple': {
        const ans = [...(ex.answers ?? [])].sort((a, b) => a - b);
        const got = [...picked].sort((a, b) => a - b);
        return ans.length === got.length && ans.every((v, i) => v === got[i]);
      }
      case 'trueFalse':
        return tf === ex.isTrue;
      case 'ordering': {
        const arranged = order.map((i) => (ex.items ?? [])[i]);
        return arranged.join('|') === (ex.correctOrder ?? []).join('|');
      }
      case 'fill':
        return (ex.blanks ?? []).every((b, i) => {
          const v = (fills[i] ?? '').trim();
          return [b.answer, ...(b.accepted ?? [])].map((x) => x.trim()).includes(v);
        });
      case 'analysis':
        return text.trim().length >= 15;
    }
  };

  const submit = () => {
    const ok = checkCorrect();
    setResult(ok);
    if (ex.type === 'analysis') setRevealed(true);
    else record(ex.id, ok);
  };

  const selfAssess = (ok: boolean) => record(ex.id, ok);

  const retry = () => {
    setPicked([]);
    setTf(null);
    setOrder(shuffle((ex.items ?? []).map((_, i) => i)));
    setFills([]);
    setText('');
    setRevealed(false);
    setResult(null);
  };

  const move = (from: number, dir: -1 | 1) => {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
  };

  return (
    <div className="card">
      <div className="mb-2 flex items-center gap-2">
        <span className="tag">{TYPE_LABELS[ex.type]}</span>
        <span className="tag">第 {ex.chapterId} 章</span>
      </div>
      <p className="whitespace-pre-wrap font-medium">{ex.question}</p>

      {/* 单选 / 多选 */}
      {(ex.type === 'single' || ex.type === 'multiple') && (
        <ul className="mt-3 space-y-2">
          {(ex.options ?? []).map((opt, i) => {
            const chosen = picked.includes(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                    chosen
                      ? 'border-primary-400 bg-primary-50 dark:border-primary-700 dark:bg-slate-700'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700'
                  }`}
                  onClick={() =>
                    setPicked((p) =>
                      ex.type === 'single' ? [i] : p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                    )
                  }
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* 判断 */}
      {ex.type === 'trueFalse' && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`btn-secondary flex-1 ${tf === true ? '!border-primary-400 !bg-primary-50 dark:!bg-slate-700' : ''}`}
            onClick={() => setTf(true)}
          >
            对
          </button>
          <button
            type="button"
            className={`btn-secondary flex-1 ${tf === false ? '!border-primary-400 !bg-primary-50 dark:!bg-slate-700' : ''}`}
            onClick={() => setTf(false)}
          >
            错
          </button>
        </div>
      )}

      {/* 排序 */}
      {ex.type === 'ordering' && (
        <ul className="mt-3 space-y-2">
          {order.map((itemIdx, pos) => (
            <li
              key={itemIdx}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600"
            >
              <span className="text-xs text-slate-400">{pos + 1}.</span>
              <span className="flex-1">{(ex.items ?? [])[itemIdx]}</span>
              <span className="flex gap-1">
                <button type="button" aria-label="上移" onClick={() => move(pos, -1)} className="rounded px-1 hover:bg-slate-100 dark:hover:bg-slate-700">
                  ↑
                </button>
                <button type="button" aria-label="下移" onClick={() => move(pos, 1)} className="rounded px-1 hover:bg-slate-100 dark:hover:bg-slate-700">
                  ↓
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* 填空 */}
      {ex.type === 'fill' && (
        <div className="mt-3 space-y-2">
          {(ex.blanks ?? []).map((_, i) => (
            <input
              key={i}
              className="input"
              placeholder={`第 ${i + 1} 个空`}
              value={fills[i] ?? ''}
              onChange={(e) => setFills((arr) => arr.map((v, j) => (j === i ? e.target.value : v)))}
            />
          ))}
        </div>
      )}

      {/* 短文分析 */}
      {ex.type === 'analysis' && (
        <textarea
          className="input mt-3"
          rows={4}
          placeholder="写下你的分析……（提交后可对照参考答案自评）"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      <div className="mt-4 flex gap-2">
        <button type="button" className="btn-primary" onClick={submit}>
          {ex.type === 'analysis' ? '对照参考答案' : '提交'}
        </button>
        {result !== null && (
          <button type="button" className="btn-secondary" onClick={retry}>
            再试一次
          </button>
        )}
      </div>

      {/* 短文分析：参考答案 + 自评 */}
      {ex.type === 'analysis' && revealed && (
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-700">
          <p className="font-medium text-primary-700 dark:text-primary-300">参考答案</p>
          <p className="mt-1 whitespace-pre-wrap text-slate-600 dark:text-slate-300">{ex.referenceAnswer}</p>
          <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">自评：</p>
          <div className="mt-1 flex gap-2">
            <button type="button" className="btn-secondary !py-1 text-xs" onClick={() => selfAssess(true)}>
              接近参考答案
            </button>
            <button type="button" className="btn-secondary !py-1 text-xs" onClick={() => selfAssess(false)}>
              还需要练习
            </button>
          </div>
        </div>
      )}

      {/* 即时反馈 */}
      {result !== null && (
        <div
          className={`mt-3 rounded-lg p-3 text-sm ${
            result
              ? 'bg-green-50 text-green-700 dark:bg-slate-700 dark:text-green-300'
              : 'bg-red-50 text-red-700 dark:bg-slate-700 dark:text-red-300'
          }`}
        >
          <p className="font-medium">{result ? '✅ 答对了' : '❌ 答错了'}</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{ex.explanation}</p>
        </div>
      )}
    </div>
  );
}
