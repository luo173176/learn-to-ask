import { useState } from 'react';
import { PROMPT_TEMPLATES } from '../utils/aiPrompt';
import { useAnalyzerStore } from '../store/useAnalyzerStore';
import CopyButton from '../components/CopyButton';

export default function AIPrompts() {
  const [key, setKey] = useState(PROMPT_TEMPLATES[0].key);
  const [material, setMaterial] = useState('');
  const draftMaterial = useAnalyzerStore((s) => s.draft.material);

  const template = PROMPT_TEMPLATES.find((t) => t.key === key) ?? PROMPT_TEMPLATES[0];
  const prompt = template.build(material);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">AI 提示词生成器</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          本项目不含任何 AI 接口。选择一个任务，粘贴你的材料，生成提示词后复制到 ChatGPT / Claude 等工具，让外部 AI
          当你的“分析陪练”。
        </p>
      </div>

      {/* 模板选择 */}
      <section>
        <h2 className="mb-3 font-semibold">选择分析任务</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROMPT_TEMPLATES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setKey(t.key)}
              className={`card text-left transition ${
                t.key === key ? 'border-primary-400 ring-1 ring-primary-400 dark:border-primary-600' : 'hover:shadow-md'
              }`}
            >
              <h3 className="font-semibold">{t.label}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 材料输入 */}
      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">分析材料</h2>
          {draftMaterial.trim() && (
            <button type="button" className="btn-secondary !py-1 text-xs" onClick={() => setMaterial(draftMaterial)}>
              从分析器草稿导入
            </button>
          )}
        </div>
        <textarea
          className="input"
          rows={6}
          placeholder="粘贴文章、观点或广告……"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </section>

      {/* 生成的提示词 */}
      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">生成的提示词（{template.label}）</h2>
          <CopyButton text={prompt} />
        </div>
        <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-3 text-xs leading-relaxed dark:bg-slate-900">
          {prompt}
        </pre>
      </section>
    </div>
  );
}
