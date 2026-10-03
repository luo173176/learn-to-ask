import { describe, expect, it } from 'vitest';
import { buildReportMarkdown } from '../exportMarkdown';
import type { AnalyzerDraft } from '../../types';

const draft: AnalyzerDraft = {
  title: '测试报告',
  material: '一段材料',
  issue: '该不该禁止 A',
  conclusion: '',
  reasons: '因为 B',
  ambiguities: '',
  valueAssumptions: '',
  descriptiveAssumptions: '',
  fallacyIds: ['ad-hominem'],
  fallacyNotes: '',
  evidenceTypeIds: [],
  evidenceNotes: '',
  rivalCauses: '',
  dataProblems: '',
  omittedInfo: '',
  reasonableConclusions: '如果 C，那么 D',
};

describe('buildReportMarkdown', () => {
  it('包含标题与已填写的章节', () => {
    const md = buildReportMarkdown(draft);
    expect(md).toContain('# 论证分析报告：测试报告');
    expect(md).toContain('## 论题');
    expect(md).toContain('因为 B');
    expect(md).toContain('## 论证中的谬误');
    expect(md).toContain('人身攻击');
    expect(md).toContain('## 能得出的合理结论');
  });

  it('未填写的章节不出现', () => {
    const md = buildReportMarkdown(draft);
    expect(md).not.toContain('## 结论');
    expect(md).not.toContain('## 数据问题');
  });

  it('勾选证据类型后输出对应名称', () => {
    const md = buildReportMarkdown({ ...draft, evidenceTypeIds: ['research'], evidenceNotes: '样本存疑' });
    expect(md).toContain('研究报告');
    expect(md).toContain('样本存疑');
  });
});
