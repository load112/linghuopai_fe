/**
 * API 类型定义：前后端接口契约
 * 前端基于这些类型调用接口，后端按此实现
 */

/* ==================== 通用 ==================== */

export type TaskStatus = "PUBLISHED" | "IN_PROGRESS" | "CLOSED";

export type ApplicationStage =
  | "INTERVIEW"
  | "AWAIT_CONFIRM"
  | "SUBMITTED"
  | "INVITED"
  | "FINISHED";

export type CandidateStage = "REPORT_GENERATED" | "IN_PROCESS" | "FINISHED";

export type MessageKind =
  | "system"
  | "invite"
  | "interview"
  | "report"
  | "thread"
  | "announcement";

/* ==================== 认证 ==================== */

export interface LoginRequest {
  phone: string;
  code: string;
}

export interface AdminLoginRequest {
  account: string;
  password: string;
}

export interface AdminProfile {
  id: string;
  realm: "admin";
  phone: string;
  displayName: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile | EnterpriseProfile | AdminProfile;
}

/* ==================== 用户画像 ==================== */

export interface UserProfile {
  id: string;
  realm: "user";
  phone: string;
  nickname: string;
  avatar?: string;
  city: string;
  industry: string;
  experience: string;
  availableTime: string;
  status: string;
  resumeCompleteness: number; // 0-100
  tags: string[];
}

export interface RadarAxis {
  label: string;
  value: number; // 0-1
}

export interface SkillChip {
  name: string;
  primary: boolean;
}

export interface ProjectItem {
  name: string;
  period: string;
  desc: string;
}

export interface ResumeDocument {
  id: string;
  name: string;
  format: "pdf" | "doc" | "docx";
  size: string;
  updatedAt: string;
  isPrimary: boolean;
}

export interface ProfileResponse extends UserProfile {
  radarAxes: RadarAxis[];
  skillChips: SkillChip[];
  projects: ProjectItem[];
  resumes: ResumeDocument[];
  aiSuggestion?: {
    content: string;
    relatedTask?: string;
  };
}

/* ==================== 任务大厅 ==================== */

export interface TaskCard {
  id: string;
  title: string;
  source: "enterprise" | "individual";
  publisher: string;
  budget: string;
  budgetType: string;
  tags: string[];
  matchHint?: string;
  matchScore?: number;
  status: TaskStatus;
}

export interface TaskListRequest {
  keyword?: string;
  filter?: "all" | "remote" | "design" | "frontend" | "operation";
  page?: number;
  pageSize?: number;
}

export interface TaskListResponse {
  list: TaskCard[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TaskDetailResponse extends TaskCard {
  description: string;
  deliverables: string[];
  processSteps: ProcessStep[];
  publisherInfo: PublisherInfo;
}

export interface ProcessStep {
  order: number;
  title: string;
  desc: string;
}

export interface PublisherInfo {
  name: string;
  verified: boolean;
  type: "enterprise" | "individual";
}

/* ==================== 报名 ==================== */

export interface ApplicationItem {
  id: string;
  taskId: string;
  taskTitle: string;
  taskBudget: string;
  publisher: string;
  stage: ApplicationStage;
  lastUpdate: string;
  hint: string;
  progress?: number; // AI面试进度 0-100
  invite?: {
    hrName: string;
    hrTitle: string;
    hrInitial: string;
    expireIn: string;
  };
}

export interface ApplicationListRequest {
  tab: "ALL" | "ACTIVE" | "FINISHED";
}

export interface ApplicationStats {
  total: number;
  interviewing: number;
  monthlyEarnings?: number;
}

/* ==================== AI 面试 ==================== */

export interface ScreeningTurn {
  id: string;
  role: "ai" | "user";
  text: string;
}

export interface ScreeningSession {
  sessionId: string;
  taskId: string;
  taskTitle: string;
  publisher: string;
  tags: string[];
  status: "ONGOING" | "COMPLETED";
  turns: ScreeningTurn[];
}

export interface ScreeningReplyRequest {
  text: string;
}

/* ==================== AI 助手 ==================== */

export interface ChatMessage {
  id: string;
  from: "ai" | "user";
  text: string;
  hint?: string;
  taskCards?: TaskCard[];
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
}

export interface ChatSendRequest {
  text: string;
}

/* ==================== 消息中心 ==================== */

export interface MessageItem {
  id: string;
  kind: MessageKind;
  title: string;
  preview: string;
  content?: string;
  time: string;
  read: boolean;
}

export interface MessageListResponse {
  list: MessageItem[];
  unreadCount: number;
}

/* ==================== 个人发任务 ==================== */

export interface PostedTask {
  id: string;
  title: string;
  budget: string;
  status: TaskStatus;
  publishedAt: string;
  applicants: number;
  unreadThreads: number;
}

export interface PublishTaskRequest {
  draft: string;
  polished?: string;
}

/* ==================== 企业端 ==================== */

export interface EnterpriseProfile {
  id: string;
  realm: "enterprise";
  phone: string;
  enterpriseName: string;
  creditCode?: string;
  legalRep?: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  description?: string;
  qualified: boolean;
  tags: string[];
}

export interface JobItem {
  id: string;
  title: string;
  status: "ACTIVE" | "CLOSED";
  location: string;
  salary: string;
  applied: number;
  passed: number;
}

export interface CandidateItem {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  stage: CandidateStage;
  subStage?: "邀约沟通" | "负面反馈" | "暂不推进";
  jobId: string;
  highlight: string;
  appliedAt: string;
}

export interface CandidateDetail extends CandidateItem {
  jobTitle: string;
  reportSummary: string;
  dimensions: {
    ability: string;
    time: string;
    risk: string;
  };
}

export interface EnterpriseDashboard {
  pendingCandidates: number;
  openings: number;
  aiReportsThisWeek: number;
  completionRate: number;
  matchAccuracy: number;
  candidateQualityScore: number;
}

export interface QualificationDocument {
  key: string;
  label: string;
  required: boolean;
  uploaded: boolean;
}

/* ==================== 运营后台 ==================== */

export interface AdminDashboardMetrics {
  registration: {
    title: string;
    weekTotal: number;
    weekDelta: number;
    activeRate: number;
  };
  taskFlow: {
    title: string;
    publishedThisWeek: number;
    inProgress: number;
    delta: number;
  };
  aiScreening: {
    title: string;
    sessions: number;
    reports: number;
    convertRate: number;
  };
  funnel: {
    newApply: number;
    enterInterview: number;
    reportGenerated: number;
    enterCommunication: number;
  };
}

export interface AdminEventLog {
  time: string;
  type: string;
  msg: string;
}

export interface AdminUserRow {
  id: string;
  phone: string;
  nickname: string;
  registeredAt: string;
  status: "正常" | "已封禁" | "待审核";
  taskCount: number;
}

export interface AdminEnterpriseRow {
  id: string;
  name: string;
  contact: string;
  verified: boolean;
  jobs: number;
  registeredAt: string;
}

export interface AdminTaskRow {
  id: string;
  title: string;
  publisher: string;
  source: "individual" | "enterprise";
  publishedAt: string;
  status: TaskStatus;
  reportCount: number;
}

export interface AdminConfig {
  policies: {
    key: string;
    label: string;
    value: number;
  }[];
  skillTags: string[];
}

/* ==================== 通用响应 ==================== */

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
