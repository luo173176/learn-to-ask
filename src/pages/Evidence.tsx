import { evidenceTypes } from '../data/evidenceTypes';
import EvidenceChecklist from '../components/EvidenceChecklist';

export default function Evidence() {
  return (
    <div>
      <h1 className="section-title">证据评估器</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        先识别证据类型，再按对应清单逐条检查。没有一锤定音的证据，只有可以被持续追问的证据。
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {evidenceTypes.map((t) => (
          <EvidenceChecklist key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}
