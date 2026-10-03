import { useState } from 'react';
import type { AnalyzerDraft } from '../types';
import { fallacies } from '../data/fallacies';
import { evidenceTypes } from '../data/evidenceTypes';
import { useAnalyzerStore } from '../store/useAnalyzerStore';
import { useProgressStore } from '../store/useProgressStore';
import { buildReportMarkdown, downloadMarkdown } from '../utils/exportMarkdown';
import CopyButton from '../components/CopyButton';

const STEPS = [
  { title: '输入材料', desc: '粘贴要分析的文章、观点或广告' },
  { title: '论题与结论', desc: '作者在讨论什么？想让你信什么？' },
  { title: '理由与歧义', desc: '凭什么相信？哪些词说不清？' },
  { title: '两类假设', desc: '价值观假设与描述性假设' },
  { title: '谬误排查', desc: '勾选你在材料中发现的谬误' },
  { title: '证据评估', desc: '勾选证据类型并评估效力' },
  { title: '原因与数据', desc: '替代原因与数据问题' },
  { title: '遗漏与结论', desc: '省略了什么？还能得出什么？' },
];

function Field(props: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{props.label}</label>
      {props.hint && <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">{props.hint}</p>}
      <textarea
        className="input"
        rows={props.rows ?? 3}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export default function Analyzer() {
  const draft = useAnalyzerStore((s) => s.draft);
  const update = useAnalyzerStore((s) => s.updateDraft);
  const toggleFallacy = useAnalyzerStore((s) => s.toggleFallacy);
  const toggleEvidence = useAnalyzerStore((s) => s.toggleEvidence);
  const saveReport = useAnalyzerStore((s) => s.saveReport);
  const reports = useAnalyzerStore((s) => s.reports);
  const deleteReport = useAnalyzerStore((s) => s.deleteReport);
  const resetDraft = useAnalyzerStore((s) => s.resetDraft);
  const bumpCount = useProgressStore((s) => s.incrementReportCount);

  const [step, setStep] = useState(0);
  const [report, setReport] = useState<string | null>(null);

  const set = (patch: Partial<AnalyzerDraft>) => update(patch);
  const generate = () => setReport(buildReportMarkdown(draft));

  const handleSave = () => {
    const r = saveReport();
    if (r) {
      bumpCount();
      setReport(r.markdown);
    }
  };

  const exportReport = () => {
    const md = report ?? buildReportMarkdown(draft);
    downloadMarkdown(draft.title.trim() || '论证分析报告', md);
  };

  // 按步骤渲染表单
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Field label="报告标题（可选）" value={draft.title} onChange={(v) => set({ title: v })} placeholder="例：某广告的分析" />
            <Field
              label="分析材料"
              hint="粘贴完整的文章、演讲稿、广告文案或一段观点"
              rows={8}
              value={draft.material}
              onChange={(v) => set({ material: v })}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Field
              label="论题"
              hint="引发讨论的问题是什么？它属于描述性论题（是什么样）还是规定性论题（应该怎样）？"
              value={draft.issue}
              onChange={(v) => set({ issue: v })}
            />
            <Field
              label="结论"
              hint="作者希望你接受的信息。找“因此”“所以”等指示词，优先看开头和结尾。"
              value={draft.conclusion}
              onChange={(v) => set({ conclusion: v })}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Field
              label="理由"
              hint="问一句“为什么相信这个结论”。用因为、由于、研究显示等指示词逐条找出。"
              value={draft.reasons}
              onChange={(v) => set({ reasons: v })}
            />
            <Field
              label="哪些词语意思不明确"
              hint="只在论题、结论、理由里找关键词；想出多种含义并替换验证。"
              value={draft.ambiguities}
              onChange={(v) => set({ ambiguities: v })}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Field
              label="价值观假设"
              hint="作者未明说地偏好哪种价值观？（如：安全 > 隐私、效率 > 公平）"
              value={draft.valueAssumptions}
              onChange={(v) => set({ valueAssumptions: v })}
            />
            <Field
              label="描述性假设"
              hint="理由成立依赖哪些关于“世界如何运作”的未明说信念？"
              value={draft.descriptiveAssumptions}
              onChange={(v) => set({ descriptiveAssumptions: v })}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {fallacies.map((f) => {
                const on = draft.fallacyIds.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`rounded-full border px-3 py-1 text-sm transition ${
                      on
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-slate-700 dark:text-primary-300'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => toggleFallacy(f.id)}
                  >
                    {on ? '✓ ' : ''}
                    {f.name}
                  </button>
                );
              })}
            </div>
            <Field
              label="谬误备注（可选）"
              hint="引用原文位置，说明为什么构成谬误"
              value={draft.fallacyNotes}
              onChange={(v) => set({ fallacyNotes: v })}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {evidenceTypes.map((t) => {
                const on = draft.evidenceTypeIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`rounded-full border px-3 py-1 text-sm transition ${
                      on
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-slate-700 dark:text-primary-300'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => toggleEvidence(t.id)}
                  >
                    {on ? '✓ ' : ''}
                    {t.name}
                  </button>
                );
              })}
            </div>
            <Field
              label="证据评估备注"
              hint="样本、测量方法、利益冲突、重复验证……对应证据评估器的清单逐项过一遍"
              value={draft.evidenceNotes}
              onChange={(v) => set({ evidenceNotes: v })}
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <Field
              label="有没有替代原因"
              hint="套用四种解释：甲→乙、乙→甲、共同原因丙、相互影响；区分“在这之后”与“因为这个”。"
              value={draft.rivalCauses}
              onChange={(v) => set({ rivalCauses: v })}
            />
            <Field
              label="数据有没有欺骗性"
              hint="数据怎么来的？是平均数、中位数还是众数？百分比有基数吗？数据证明的事和结论是同一件事吗？"
              value={draft.dataProblems}
              onChange={(v) => set({ dataProblems: v })}
            />
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <Field
              label="有什么重要信息被省略了"
              hint="反面论证？事实来源？负面效果？预测失败记录？"
              value={draft.omittedInfo}
              onChange={(v) => set({ omittedInfo: v })}
            />
            <Field
              label="能得出什么合理的结论"
              hint="用条件句生成多个“如果……那么……”，再挑出最站得住脚的。"
              value={draft.reasonableConclusions}
              onChange={(v) => set({ reasonableConclusions: v })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title">论证分析器</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          分步拆解一篇文章、观点或广告，生成 Markdown 分析报告。草稿与历史自动保存在本地。
        </p>
      </div>

      {/* 步骤条 */}
      <ol className="flex flex-wrap gap-2 text-xs">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`rounded-full px-3 py-1 transition ${
                i === step
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {i + 1}. {s.title}
            </button>
          </li>
        ))}
      </ol>

      {/* 当前步骤表单 */}
      <section className="card space-y-4">
        <div>
          <h2 className="font-semibold">
            步骤 {step + 1}/{STEPS.length}：{STEPS[step].title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{STEPS[step].desc}</p>
        </div>
        {renderStep()}
        <div className="flex justify-between">
          <button type="button" className="btn-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>
            ← 上一步
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn-primary" onClick={() => setStep(step + 1)}>
              下一步 →
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={generate}>
              生成报告
            </button>
          )}
        </div>
      </section>

      {/* 报告区 */}
      {report && (
        <section className="card space-y-3">
          <h2 className="font-semibold">分析报告预览</h2>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-3 text-xs leading-relaxed dark:bg-slate-900">
            {report}
          </pre>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={report} className="!px-3 !py-2 !text-sm" />
            <button type="button" className="btn-primary" onClick={exportReport}>
              导出 .md
            </button>
            <button type="button" className="btn-secondary" onClick={handleSave}>
              保存到历史
            </button>
          </div>
        </section>
      )}

      {/* 草稿操作 */}
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            if (confirm('确定清空当前草稿吗？已保存的历史报告不受影响。')) {
              resetDraft();
              setReport(null);
              setStep(0);
            }
          }}
        >
          重置草稿
        </button>
      </div>

      {/* 历史报告 */}
      <section>
        <h2 className="section-title">历史报告（{reports.length}）</h2>
        {reports.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">还没有保存过报告。生成报告后点击“保存到历史”。</p>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => (
              <details key={r.id} className="card">
                <summary className="cursor-pointer font-medium">
                  {r.title}
                  <span className="ml-2 text-xs text-slate-400">{new Date(r.createdAt).toLocaleString('zh-CN')}</span>
                </summary>
                <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-3 text-xs dark:bg-slate-900">
                  {r.markdown}
                </pre>
                <div className="mt-3 flex gap-2">
                  <CopyButton text={r.markdown} />
                  <button
                    type="button"
                    className="btn-secondary !py-1 text-xs"
                    onClick={() => downloadMarkdown(r.title, r.markdown)}
                  >
                    导出 .md
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1 text-xs !text-red-600 dark:!text-red-400"
                    onClick={() => deleteReport(r.id)}
                  >
                    删除
                  </button>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
