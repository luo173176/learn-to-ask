import type { AnalyzerDraft } from '../types';
import { fallacies } from '../data/fallacies';
import { evidenceTypes } from '../data/evidenceTypes';

// 把分析器草稿组装成 Markdown 分析报告（只包含已填写的部分）
export function buildReportMarkdown(draft: AnalyzerDraft): string {
  const lines: string[] = [];

  const add = (heading: string, body?: string) => {
    if (body && body.trim()) {
      lines.push(`## ${heading}`, '', body.trim(), '');
    }
  };

  lines.push(`# 论证分析报告：${draft.title || '未命名'}`, '');
  if (draft.material.trim()) {
    lines.push('## 分析材料', '', draft.material.trim(), '');
  }

  add('论题', draft.issue);
  add('结论', draft.conclusion);
  add('理由', draft.reasons);
  add('哪些词语意思不明确', draft.ambiguities);
  add('价值观假设', draft.valueAssumptions);
  add('描述性假设', draft.descriptiveAssumptions);

  if (draft.fallacyIds.length) {
    const names = draft.fallacyIds
      .map((id) => fallacies.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join('、');
    lines.push('## 论证中的谬误', '', names, '');
    add('谬误备注', draft.fallacyNotes);
  }

  if (draft.evidenceTypeIds.length) {
    const names = draft.evidenceTypeIds
      .map((id) => evidenceTypes.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join('、');
    lines.push('## 涉及的证据类型', '', names, '');
    add('证据评估备注', draft.evidenceNotes);
  }

  add('替代原因', draft.rivalCauses);
  add('数据问题', draft.dataProblems);
  add('被省略的重要信息', draft.omittedInfo);
  add('能得出的合理结论', draft.reasonableConclusions);

  lines.push('---', '');
  lines.push('> 由 learn-to-ask 论证分析器生成 · 教学内容遵循 CC BY-NC-SA 4.0');
  return lines.join('\n');
}

// 触发浏览器下载 .md 文件
export function downloadMarkdown(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
