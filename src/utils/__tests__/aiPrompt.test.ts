import { describe, expect, it } from 'vitest';
import { PROMPT_TEMPLATES } from '../aiPrompt';

describe('aiPrompt 模板', () => {
  it('共提供 7 个模板且 key 唯一', () => {
    expect(PROMPT_TEMPLATES).toHaveLength(7);
    const keys = PROMPT_TEMPLATES.map((t) => t.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('空材料时使用占位符，有材料时包含原文', () => {
    const t = PROMPT_TEMPLATES[0];
    expect(t.build('')).toContain('请在此粘贴');
    expect(t.build('测试材料 ABC')).toContain('测试材料 ABC');
  });

  it('综合分析模板覆盖十大关键问题的核心关键词', () => {
    const full = PROMPT_TEMPLATES.find((t) => t.key === 'full')!;
    const prompt = full.build('x');
    for (const word of ['论题', '结论', '理由', '假设', '谬误', '证据', '替代原因', '省略']) {
      expect(prompt).toContain(word);
    }
  });
});
