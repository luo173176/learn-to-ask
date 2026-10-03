import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnalyzerDraft, SavedReport } from '../types';
import { buildReportMarkdown } from '../utils/exportMarkdown';

const emptyDraft: AnalyzerDraft = {
  title: '',
  material: '',
  issue: '',
  conclusion: '',
  reasons: '',
  ambiguities: '',
  valueAssumptions: '',
  descriptiveAssumptions: '',
  fallacyIds: [],
  fallacyNotes: '',
  evidenceTypeIds: [],
  evidenceNotes: '',
  rivalCauses: '',
  dataProblems: '',
  omittedInfo: '',
  reasonableConclusions: '',
};

interface AnalyzerState {
  draft: AnalyzerDraft;
  reports: SavedReport[];
  updateDraft: (patch: Partial<AnalyzerDraft>) => void;
  toggleFallacy: (id: string) => void;
  toggleEvidence: (id: string) => void;
  /** 生成并保存报告，返回保存的记录；草稿为空时返回 null */
  saveReport: () => SavedReport | null;
  deleteReport: (id: string) => void;
  resetDraft: () => void;
}

// 分析器草稿与历史报告保存在 localStorage（key: lta-analyzer）
export const useAnalyzerStore = create<AnalyzerState>()(
  persist(
    (set, get) => ({
      draft: emptyDraft,
      reports: [],
      updateDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      toggleFallacy: (id) =>
        set((s) => ({
          draft: {
            ...s.draft,
            fallacyIds: s.draft.fallacyIds.includes(id)
              ? s.draft.fallacyIds.filter((f) => f !== id)
              : [...s.draft.fallacyIds, id],
          },
        })),
      toggleEvidence: (id) =>
        set((s) => ({
          draft: {
            ...s.draft,
            evidenceTypeIds: s.draft.evidenceTypeIds.includes(id)
              ? s.draft.evidenceTypeIds.filter((t) => t !== id)
              : [...s.draft.evidenceTypeIds, id],
          },
        })),
      saveReport: () => {
        const { draft, reports } = get();
        if (!draft.material.trim() && !draft.conclusion.trim()) return null;
        const title = draft.title.trim() || `分析报告 ${new Date().toLocaleString('zh-CN')}`;
        const report: SavedReport = {
          id: `${Date.now()}`,
          createdAt: Date.now(),
          title,
          markdown: buildReportMarkdown({ ...draft, title }),
        };
        set({ reports: [report, ...reports], draft: { ...draft, title } });
        return report;
      },
      deleteReport: (id) => set((s) => ({ reports: s.reports.filter((r) => r.id !== id) })),
      resetDraft: () => set({ draft: { ...emptyDraft } }),
    }),
    { name: 'lta-analyzer' },
  ),
);
