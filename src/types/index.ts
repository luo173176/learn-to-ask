// ---------- 章节内容 ----------

/** 章节核心概念卡片 */
export interface Concept {
  title: string;
  description: string;
}

/** 章节自创示例 */
export interface ChapterExample {
  title: string;
  /** 案例材料（自创，贴近日常生活） */
  content: string;
  /** 用本章工具拆解该案例的分析 */
  analysis: string;
}

/** 13 章中的某一章 */
export interface Chapter {
  id: number; // 1-13
  title: string;
  tagline: string;
  summary: string;
  concepts: Concept[];
  example: ChapterExample;
  /** 是否展示第 2 章的思维习惯卡片 */
  showObstacles?: boolean;
}

// ---------- 关键问题 ----------

export interface CriticalQuestion {
  id: string;
  question: string;
  /** 为什么要问这个问题 */
  description: string;
  /** 具体怎么问：可操作步骤 */
  howTo: string[];
  chapterId: number;
}

// ---------- 谬误图鉴 ----------

export interface Fallacy {
  id: string;
  name: string;
  enName: string;
  definition: string;
  /** 识别问题清单 */
  identify: string[];
  /** 自创例子 */
  example: string;
  /** 什么情况下不算谬误（反例/边界） */
  counter: string;
  /** 如何回应：可直接使用的话术 */
  response: string;
}

// ---------- 证据评估 ----------

export interface EvidenceType {
  id: string;
  name: string;
  enName: string;
  description: string;
  /** 检查问题清单 */
  checklist: string[];
  /** 最常见的坑 */
  pitfall: string;
}

// ---------- 练习 ----------

export type ExerciseType =
  | 'single' // 单选
  | 'multiple' // 多选
  | 'trueFalse' // 判断
  | 'ordering' // 排序
  | 'fill' // 填空
  | 'analysis'; // 短文分析

export interface FillBlank {
  answer: string;
  accepted?: string[];
}

export interface Exercise {
  id: string;
  chapterId: number;
  type: ExerciseType;
  question: string;
  options?: string[]; // single / multiple
  answer?: number; // single：正确选项下标
  answers?: number[]; // multiple：正确选项下标数组
  isTrue?: boolean; // trueFalse
  items?: string[]; // ordering：打乱后的选项
  correctOrder?: string[]; // ordering：正确顺序的完整序列
  blanks?: FillBlank[]; // fill
  referenceAnswer?: string; // analysis
  explanation: string;
}

// ---------- 第 2 章思维习惯卡片 ----------

export interface ThinkingPair {
  left: string;
  leftDesc: string;
  right: string;
  rightDesc: string;
}

export interface SpeedBump {
  name: string;
  definition: string;
  /** 自查问题 */
  selfCheck: string;
  /** 应对方法 */
  counter: string;
}

// ---------- 论证分析器 ----------

export interface AnalyzerDraft {
  title: string;
  material: string;
  issue: string; // 论题
  conclusion: string; // 结论
  reasons: string; // 理由
  ambiguities: string; // 关键词歧义
  valueAssumptions: string; // 价值观假设
  descriptiveAssumptions: string; // 描述性假设
  fallacyIds: string[]; // 发现的谬误
  fallacyNotes: string;
  evidenceTypeIds: string[]; // 涉及的证据类型
  evidenceNotes: string;
  rivalCauses: string; // 替代原因
  dataProblems: string; // 数据问题
  omittedInfo: string; // 省略的信息
  reasonableConclusions: string; // 合理结论
}

export interface SavedReport {
  id: string;
  createdAt: number;
  title: string;
  markdown: string;
}
