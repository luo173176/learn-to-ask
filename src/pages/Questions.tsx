import { criticalQuestions } from '../data/criticalQuestions';
import { useProgressStore } from '../store/useProgressStore';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

export default function Questions() {
  const read = useProgressStore((s) => s.readQuestions);
  const toggleQuestion = useProgressStore((s) => s.toggleQuestion);

  return (
    <div>
      <h1 className="section-title">关键问题清单</h1>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        十个核心批判性问题。逐个展开学习，勾选你已掌握的问题，可一键复制随时取用。
      </p>
      <div className="mb-6">
        <ProgressBar label={`已掌握 ${read.length}/${criticalQuestions.length}`} value={(read.length / criticalQuestions.length) * 100} />
      </div>
      <div className="space-y-3">
        {criticalQuestions.map((q) => (
          <QuestionCard key={q.id} q={q} done={read.includes(q.id)} onToggle={() => toggleQuestion(q.id)} />
        ))}
      </div>
    </div>
  );
}
