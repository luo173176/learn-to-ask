import { describe, expect, it } from 'vitest';
import { exercises } from '../exercises';
import { chapters } from '../chapters';

describe('exercises 数据完整性', () => {
  it('练习总量不少于 20 道，且每章至少 3 道', () => {
    expect(exercises.length).toBeGreaterThanOrEqual(20);
    for (const ch of chapters) {
      const count = exercises.filter((e) => e.chapterId === ch.id).length;
      expect(count, `第 ${ch.id} 章练习数量`).toBeGreaterThanOrEqual(3);
    }
  });

  it('练习 id 唯一', () => {
    const ids = exercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('每道题的答案字段与题型匹配且合法', () => {
    for (const ex of exercises) {
      if (ex.type === 'single') {
        expect(ex.answer).toBeDefined();
        expect(ex.answer!).toBeGreaterThanOrEqual(0);
        expect(ex.answer!).toBeLessThan(ex.options!.length);
      }
      if (ex.type === 'multiple') {
        expect(ex.answers!.length).toBeGreaterThan(0);
        for (const a of ex.answers!) {
          expect(a).toBeGreaterThanOrEqual(0);
          expect(a).toBeLessThan(ex.options!.length);
        }
      }
      if (ex.type === 'trueFalse') {
        expect(typeof ex.isTrue).toBe('boolean');
      }
      if (ex.type === 'ordering') {
        expect(ex.items!.length).toBe(ex.correctOrder!.length);
      }
      if (ex.type === 'fill') {
        expect(ex.blanks!.length).toBeGreaterThan(0);
      }
      if (ex.type === 'analysis') {
        expect(ex.referenceAnswer).toBeTruthy();
      }
    }
  });
});
