import Fuse from 'fuse.js';
import { chapters } from '../data/chapters';
import { criticalQuestions } from '../data/criticalQuestions';
import { fallacies } from '../data/fallacies';
import { evidenceTypes } from '../data/evidenceTypes';
import { exercises } from '../data/exercises';

export type SearchCategory = '章节' | '关键问题' | '谬误' | '练习' | '证据类型';

export interface SearchItem {
  id: string;
  category: SearchCategory;
  title: string;
  sub: string;
  path: string; // Hash 路由路径
}

// 把全部数据源拍平成可搜索条目
const items: SearchItem[] = [
  ...chapters.map((c) => ({
    id: `ch-${c.id}`,
    category: '章节' as const,
    title: `${String(c.id).padStart(2, '0')} ${c.title}`,
    sub: `${c.tagline} ${c.summary} ${c.concepts.map((x) => x.title).join(' ')}`,
    path: `/chapters/${c.id}`,
  })),
  ...criticalQuestions.map((q) => ({
    id: q.id,
    category: '关键问题' as const,
    title: q.question,
    sub: q.description,
    path: '/questions',
  })),
  ...fallacies.map((f) => ({
    id: f.id,
    category: '谬误' as const,
    title: `${f.name}（${f.enName}）`,
    sub: `${f.definition} ${f.example}`,
    path: '/fallacies',
  })),
  ...evidenceTypes.map((t) => ({
    id: t.id,
    category: '证据类型' as const,
    title: t.name,
    sub: t.description,
    path: '/evidence',
  })),
  ...exercises.map((e) => ({
    id: e.id,
    category: '练习' as const,
    title: e.question,
    sub: e.explanation,
    path: '/practice',
  })),
];

const fuse = new Fuse(items, {
  keys: ['title', 'sub'],
  threshold: 0.38,
  ignoreLocation: true, // 中文短查询必需
  minMatchCharLength: 1,
});

export function searchAll(query: string): SearchItem[] {
  const q = query.trim();
  if (!q) return [];
  return fuse.search(q).map((r) => r.item);
}
