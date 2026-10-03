import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExerciseStats {
  /** 已作答题数（每题只计第一次作答） */
  total: number;
  /** 答对题数 */
  correct: number;
}

interface ProgressState {
  theme: 'light' | 'dark';
  completedChapters: number[];
  readQuestions: string[];
  exerciseStats: ExerciseStats;
  /** exerciseId -> 最近一次是否答对 */
  exerciseRecord: Record<string, boolean>;
  reportCount: number;
  toggleTheme: () => void;
  toggleChapter: (id: number) => void;
  toggleQuestion: (id: string) => void;
  recordExercise: (id: string, correct: boolean) => void;
  incrementReportCount: () => void;
  resetProgress: () => void;
}

const initialStats: ExerciseStats = { total: 0, correct: 0 };

// 进度数据全部保存在 localStorage（key: lta-progress）
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      theme: 'light',
      completedChapters: [],
      readQuestions: [],
      exerciseStats: initialStats,
      exerciseRecord: {},
      reportCount: 0,
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      toggleChapter: (id) =>
        set((s) => ({
          completedChapters: s.completedChapters.includes(id)
            ? s.completedChapters.filter((c) => c !== id)
            : [...s.completedChapters, id],
        })),
      toggleQuestion: (id) =>
        set((s) => ({
          readQuestions: s.readQuestions.includes(id)
            ? s.readQuestions.filter((x) => x !== id)
            : [...s.readQuestions, id],
        })),
      recordExercise: (id, correct) =>
        set((s) => {
          const prev = s.exerciseRecord[id];
          if (prev === correct) return s;
          let { total, correct: c } = s.exerciseStats;
          if (prev === undefined) total += 1;
          if (correct) c += 1;
          return {
            exerciseRecord: { ...s.exerciseRecord, [id]: correct },
            exerciseStats: { total, correct: c },
          };
        }),
      incrementReportCount: () => set((s) => ({ reportCount: s.reportCount + 1 })),
      resetProgress: () =>
        set({
          completedChapters: [],
          readQuestions: [],
          exerciseStats: initialStats,
          exerciseRecord: {},
          reportCount: 0,
        }),
    }),
    { name: 'lta-progress' },
  ),
);
