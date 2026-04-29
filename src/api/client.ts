/**
 * API Client：统一数据层
 *
 * 当前阶段：所有接口返回 mock 数据（带 100-800ms 延迟模拟网络）
 * 联调阶段：修改 BASE_URL 即可切换为真实后端
 *
 * 使用方式：
 *   import { api } from '@/api/client'
 *   const tasks = await api.tasks.list({ keyword: 'UI' })
 */

import type {
  AdminConfig,
  AdminDashboardMetrics,
  AdminEnterpriseRow,
  AdminEventLog,
  AdminTaskRow,
  AdminUserRow,
  ApiResponse,
  ApplicationItem,
  ApplicationListRequest,
  ApplicationStats,
  CandidateDetail,
  CandidateItem,
  ChatHistoryResponse,
  ChatSendRequest,
  EnterpriseDashboard,
  EnterpriseProfile,
  JobItem,
  LoginRequest,
  LoginResponse,
  MessageListResponse,
  PostedTask,
  ProfileResponse,
  PublishTaskRequest,
  QualificationDocument,
  ScreeningReplyRequest,
  ScreeningSession,
  TaskCard,
  TaskDetailResponse,
  TaskListRequest,
  TaskListResponse,
  TaskStatus,
  UserProfile,
} from "./types";

import {
  adminDashboardMetrics,
  adminTasks,
  adminUsers,
  enterpriseCandidates,
  enterpriseJobs,
  taskHall,
  userMessages,
} from "@/shared/mock/data";

// ========== 配置 ==========

const BASE_URL = ""; // 联调时改为真实后端地址

async function mockDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockFetch<T>(
  data: T,
  delay = 400,
): Promise<ApiResponse<T>> {
  await mockDelay(delay);
  return { code: 0, message: "success", data };
}

// ========== 认证 ==========

export const authApi = {
  /** POST /api/auth/send-code */
  sendCode: async (_phone: string): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 200);
  },

  /** POST /api/auth/login */
  login: async (req: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    await mockDelay(300);
    const isUser = req.phone.startsWith("1");
    return {
      code: 0,
      message: "success",
      data: {
        token: `mock-token-${Date.now()}`,
        user: isUser
          ? ({
              id: "u-mock",
              realm: "user",
              phone: req.phone,
              nickname: `用户${req.phone.slice(-4)}`,
              city: "上海",
              industry: "设计 / 视觉",
              experience: "5 年",
              availableTime: "工作日 19:00 后 + 周末",
              status: "可接单",
              resumeCompleteness: 92,
              tags: ["UI/UX Design", "Tailwind CSS", "Project Mgmt"],
            } satisfies UserProfile)
          : ({
              id: "e-mock",
              realm: "enterprise",
              phone: req.phone,
              enterpriseName: "极光科技工作室",
              qualified: true,
              tags: ["人力资源服务", "高新企业"],
            } satisfies EnterpriseProfile),
      },
    };
  },

  /** POST /api/auth/admin-login */
  adminLogin: async (
    _account: string,
    _password: string,
  ): Promise<ApiResponse<LoginResponse>> => {
    await mockDelay(300);
    return {
      code: 0,
      message: "success",
      data: {
        token: `mock-token-admin-${Date.now()}`,
        user: {
          id: "a-mock",
          realm: "admin",
          phone: _account,
          displayName: "运营管理员",
        } as LoginResponse["user"],
      },
    };
  },
};

// ========== 用户画像 / 个人资料 ==========

export const profileApi = {
  /** GET /api/profile */
  get: async (): Promise<ApiResponse<ProfileResponse>> => {
    return mockFetch({
      id: "u-mock",
      realm: "user",
      phone: "138****0001",
      nickname: "陈领活",
      city: "上海",
      industry: "设计 / 视觉",
      experience: "5 年",
      availableTime: "工作日 19:00 后 + 周末",
      status: "可接单",
      resumeCompleteness: 92,
      tags: ["UI/UX Design", "Tailwind CSS", "Project Mgmt"],
      radarAxes: [
        { label: "创新力", value: 0.78 },
        { label: "执行效率", value: 0.92 },
        { label: "沟通协调", value: 0.66 },
        { label: "专业广度", value: 0.74 },
        { label: "抗压性", value: 0.84 },
      ],
      skillChips: [
        { name: "UI/UX Design", primary: false },
        { name: "Tailwind CSS", primary: true },
        { name: "Project Mgmt", primary: false },
        { name: "AI Prompting", primary: false },
        { name: "Brand Identity", primary: false },
        { name: "Python", primary: false },
      ],
      projects: [
        {
          name: "WarmLight 设计系统重构",
          period: "2025.10 — 至今",
          desc: "主导组件库 token 化迁移，整理跨端规范，配合工程团队建立 Storybook。",
        },
        {
          name: "Bento 风格作品集",
          period: "2025.06 — 2025.09",
          desc: "为活动品牌设计 12 张主插画 + 配套图标，参与营销侧整体节奏设计。",
        },
      ],
      resumes: [
        {
          id: "r-1",
          name: "陈领活_全栈设计师_2026.pdf",
          format: "pdf",
          size: "2.4 MB",
          updatedAt: "3 天前",
          isPrimary: true,
        },
      ],
      aiSuggestion: {
        content:
          '基于你近期的「跨境电商 UI 优化」项目成果，建议在简历的「专业成就」板块增加：「通过 A/B 测试将结账转化率提升了 18%」。',
        relatedTask: "跨境电商 UI 优化",
      },
    });
  },

  /** POST /api/profile */
  update: async (_data: Partial<ProfileResponse>): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 300);
  },
};

// ========== 任务大厅 ==========

export const tasksApi = {
  /** GET /api/tasks */
  list: async (req?: TaskListRequest): Promise<ApiResponse<TaskListResponse>> => {
    await mockDelay(300);
    let list = [...taskHall];

    if (req?.keyword?.trim()) {
      const kw = req.keyword.toLowerCase();
      list = list.filter(
        (t) => t.title.toLowerCase().includes(kw) || t.publisher.includes(kw),
      );
    }

    if (req?.filter && req.filter !== "all") {
      list = list.filter((t) => {
        if (req.filter === "remote") return t.tags.some((tag) => tag.includes("远程"));
        if (req.filter === "design") return /UI|插画|设计/i.test(t.title);
        if (req.filter === "frontend") return t.title.includes("前端");
        if (req.filter === "operation") return /脚本|活动|运营|内容/.test(t.title);
        return true;
      });
    }

    const page = req?.page ?? 1;
    const pageSize = req?.pageSize ?? 20;
    const start = (page - 1) * pageSize;
    const paged = list.slice(start, start + pageSize);

    return {
      code: 0,
      message: "success",
      data: { list: paged, total: list.length, page, pageSize },
    };
  },

  /** GET /api/tasks/:id */
  detail: async (id: string): Promise<ApiResponse<TaskDetailResponse>> => {
    await mockDelay(200);
    const task = taskHall.find((t) => t.id === id) ?? taskHall[0];
    return {
      code: 0,
      message: "success",
      data: {
        ...task,
        description:
          "我们正在寻找一位能在 3 天内交付高质量插画的设计师。任务包含 6 张主插画，2 张头图，以及配套的 SVG 图标 12 枚。需要熟悉品牌的暖光气质，配色克制。",
        deliverables: [
          "所有插画输出 SVG 与 PNG 两种格式",
          "风格保持一致，避免单张作品过度独立",
          "提交前请通过站内沟通做一次中期评审",
        ],
        processSteps: [
          {
            order: 1,
            title: "报名后自动开启 AI 面试",
            desc: "你不需要点击「开始面试」，系统会基于这个任务给你一段对话式问答，最多几轮即可完成。",
          },
          {
            order: 2,
            title: "完成面试后再确认是否投递",
            desc: "你随时可以中断回来续接。报告由后端生成，仅企业可见。",
          },
          {
            order: 3,
            title: "企业看到你之后再开启沟通",
            desc: "消息中心会同步进度，期间不会有人催你。",
          },
        ],
        publisherInfo: {
          name: task.publisher,
          verified: task.source === "enterprise",
          type: task.source,
        },
      },
    };
  },

  /** POST /api/tasks/:id/apply */
  apply: async (_id: string): Promise<ApiResponse<{ screeningSessionId: string }>> => {
    return mockFetch({ screeningSessionId: `ss-${Date.now()}` }, 400);
  },
};

// ========== 报名 / 我的任务 ==========

const mockApplications: ApplicationItem[] = [
  {
    id: "a-1",
    taskId: "t-001",
    taskTitle: "移动端 UI 界面优化",
    taskBudget: "¥800-1200",
    publisher: "光合插画工作室",
    stage: "INVITED",
    lastUpdate: "今天 14:21",
    hint: "企业方已邀请你进一步沟通，可前往任务详情查看。",
    invite: {
      hrName: "HR 王经理",
      hrTitle: "极光科技工作室",
      hrInitial: "王",
      expireIn: "24 小时内答复",
    },
  },
  {
    id: "a-2",
    taskId: "t-002",
    taskTitle: "企业内刊插画绘制",
    taskBudget: "¥5,000",
    publisher: "雾灰设计事务所",
    stage: "SUBMITTED",
    lastUpdate: "今天 09:48",
    hint: "AI 报告已交给企业方，等待企业反馈。企业方正在查看你的画像与作品集。",
  },
  {
    id: "a-3",
    taskId: "t-003",
    taskTitle: "交互逻辑评审专家",
    taskBudget: "¥200/时",
    publisher: "极光科技工作室",
    stage: "INTERVIEW",
    lastUpdate: "昨天 21:30",
    hint: "AI 面试还差最后一段问答即可完成，可随时回到面试页继续。",
    progress: 65,
  },
  {
    id: "a-4",
    taskId: "t-006",
    taskTitle: "线下品牌快闪布展支持",
    taskBudget: "¥1,500/天",
    publisher: "WarmLight 营销",
    stage: "AWAIT_CONFIRM",
    lastUpdate: "2 天前",
    hint: "AI 面试已完成，等你确认是否投递。",
  },
  {
    id: "a-5",
    taskId: "t-005",
    taskTitle: "短视频脚本润色（教育类）",
    taskBudget: "¥300-500",
    publisher: "活动方 · 王老师",
    stage: "FINISHED",
    lastUpdate: "上周",
    hint: "本次合作已结束，欢迎在我的协议查看记录。",
  },
];

export const applicationsApi = {
  /** GET /api/applications */
  list: async (
    _req?: ApplicationListRequest,
  ): Promise<ApiResponse<{ list: ApplicationItem[]; stats: ApplicationStats }>> => {
    await mockDelay(300);
    const stats: ApplicationStats = {
      total: mockApplications.length,
      interviewing: mockApplications.filter((a) => a.stage === "INTERVIEW").length,
      monthlyEarnings: undefined,
    };
    return {
      code: 0,
      message: "success",
      data: { list: mockApplications, stats },
    };
  },

  /** POST /api/applications/:id/confirm */
  confirm: async (_id: string): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 300);
  },

  /** POST /api/applications/:id/reject-invite */
  rejectInvite: async (_id: string): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 200);
  },

  /** POST /api/applications/:id/accept-invite */
  acceptInvite: async (_id: string): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 200);
  },
};

// ========== AI 面试 ==========

export const screeningApi = {
  /** GET /api/screening/:taskId */
  getSession: async (taskId: string): Promise<ApiResponse<ScreeningSession>> => {
    await mockDelay(300);
    const task = taskHall.find((t) => t.id === taskId) ?? taskHall[0];
    return {
      code: 0,
      message: "success",
      data: {
        sessionId: `ss-${taskId}`,
        taskId,
        taskTitle: task.title,
        publisher: task.publisher,
        tags: task.tags,
        status: "ONGOING",
        turns: [
          {
            id: "ai-1",
            role: "ai",
            text: "你好，欢迎来到这次的智能初筛。咱们先从你最熟的事情说起：能不能简单聊聊你最近一次做插画的过程？",
          },
        ],
      },
    };
  },

  /** POST /api/screening/:sessionId/reply */
  reply: async (
    _sessionId: string,
    _req: ScreeningReplyRequest,
    round: number,
  ): Promise<ApiResponse<ScreeningSession>> => {
    await mockDelay(800);
    const isDone = round >= 4;
    const followUps = [
      "听起来你对节奏有偏好。如果给你 3 天交付 8 张插画，你会怎么排时间？",
      "你提到风格保持一致，能聊聊你判断「风格一致」的标准吗？",
      "如果中期评审被指出风格偏了，你打算怎么处理？",
    ];
    const nextText = isDone
      ? "我了解了。你的回答和这个任务非常契合，谢谢你的耐心。我已经把要点整理好，企业方稍后会看到结构化结果。"
      : followUps[round - 1] ?? "再多讲一点你最得意的细节，可以是色彩、节奏或文案。";

    return {
      code: 0,
      message: "success",
      data: {
        sessionId: _sessionId,
        taskId: "t-001",
        taskTitle: "任务",
        publisher: "",
        tags: [],
        status: isDone ? "COMPLETED" : "ONGOING",
        turns: [
          {
            id: `u-${Date.now()}`,
            role: "user",
            text: _req.text,
          },
          {
            id: `ai-${Date.now()}`,
            role: "ai",
            text: nextText,
          },
        ],
      },
    };
  },
};

// ========== AI 助手 ==========

export const assistantApi = {
  /** GET /api/assistant/history */
  history: async (): Promise<ApiResponse<ChatHistoryResponse>> => {
    return mockFetch({
      messages: [
        {
          id: "b-1",
          from: "ai",
          text: "你好，我是你的领活派 AI 助手。我可以帮你解析简历、补全画像、找匹配任务。要不要先告诉我，你最近在思考哪类机会？",
          hint: "通用画像问答 · 跨任务复用",
        },
      ],
    });
  },

  /** POST /api/assistant/chat */
  send: async (req: ChatSendRequest): Promise<ApiResponse<ChatHistoryResponse>> => {
    await mockDelay(700);
    const wantsTaskRecommendation = /推荐|任务|工作/.test(req.text);
    const recommended = taskHall
      .filter((t) => t.matchScore && t.matchScore >= 88)
      .slice(0, 2);

    return {
      code: 0,
      message: "success",
      data: {
        messages: [
          {
            id: `u-${Date.now()}`,
            from: "user",
            text: req.text,
          },
          {
            id: `a-${Date.now()}`,
            from: "ai",
            text: wantsTaskRecommendation
              ? "已根据你的画像挑了 2 个匹配度较高的任务。点击卡片可以直接看详情。"
              : "已记录。我会用你刚才说的内容更新草案，你可以在「简历与能力画像」里确认是否写入。",
            hint: wantsTaskRecommendation
              ? undefined
              : "本次回答仅生成草案，不会直接改写正式资料。",
            taskCards: wantsTaskRecommendation ? recommended : undefined,
          },
        ],
      },
    };
  },
};

// ========== 消息中心 ==========

export const messagesApi = {
  /** GET /api/messages */
  list: async (): Promise<ApiResponse<MessageListResponse>> => {
    await mockDelay(200);
    return {
      code: 0,
      message: "success",
      data: {
        list: userMessages,
        unreadCount: userMessages.filter((m) => !m.read).length,
      },
    };
  },

  /** PUT /api/messages/:id/read */
  markRead: async (_id: string): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 100);
  },

  /** PUT /api/messages/read-all */
  markAllRead: async (): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 100);
  },
};

// ========== 个人发任务 ==========

const mockPostedTasks: PostedTask[] = [
  {
    id: "p-1",
    title: "周末校园活动主持",
    budget: "¥600 / 场",
    status: "PUBLISHED",
    publishedAt: "2 小时前",
    applicants: 4,
    unreadThreads: 1,
  },
  {
    id: "p-2",
    title: "短视频脚本润色（教育类）",
    budget: "¥300-500",
    status: "IN_PROGRESS",
    publishedAt: "昨天",
    applicants: 9,
    unreadThreads: 2,
  },
  {
    id: "p-3",
    title: "毕业作品集排版校对",
    budget: "¥150 / 份",
    status: "CLOSED",
    publishedAt: "上周",
    applicants: 12,
    unreadThreads: 0,
  },
];

export const postedTasksApi = {
  /** GET /api/posted-tasks */
  list: async (): Promise<ApiResponse<{ list: PostedTask[] }>> => {
    return mockFetch({ list: mockPostedTasks });
  },

  /** POST /api/posted-tasks */
  create: async (req: PublishTaskRequest): Promise<ApiResponse<PostedTask>> => {
    await mockDelay(400);
    const newTask: PostedTask = {
      id: `p-${Date.now()}`,
      title: req.draft.split(/[，。\n]/)[0].slice(0, 18) || "新任务",
      budget: "¥可议",
      status: "PUBLISHED",
      publishedAt: "刚刚",
      applicants: 0,
      unreadThreads: 0,
    };
    mockPostedTasks.unshift(newTask);
    return { code: 0, message: "success", data: newTask };
  },
};

// ========== 企业端 ==========

export const enterpriseApi = {
  /** GET /api/enterprise/dashboard */
  dashboard: async (): Promise<ApiResponse<EnterpriseDashboard>> => {
    await mockDelay(300);
    return {
      code: 0,
      message: "success",
      data: {
        pendingCandidates: enterpriseCandidates.filter(
          (c) => c.stage === "REPORT_GENERATED" || c.stage === "IN_PROCESS",
        ).length,
        openings: enterpriseJobs.filter((j) => j.status === "ACTIVE").length,
        aiReportsThisWeek: 12,
        completionRate: 312,
        matchAccuracy: 0.94,
        candidateQualityScore: 8.2,
      },
    };
  },

  /** GET /api/enterprise/jobs */
  jobs: async (): Promise<ApiResponse<{ list: JobItem[] }>> => {
    return mockFetch({ list: enterpriseJobs });
  },

  /** POST /api/enterprise/jobs */
  createJob: async (_data: {
    title: string;
    salary: string;
    location: string;
    requirement: string;
  }): Promise<ApiResponse<JobItem>> => {
    await mockDelay(400);
    const newJob: JobItem = {
      id: `j-${Date.now()}`,
      title: _data.title,
      status: "ACTIVE",
      location: _data.location,
      salary: _data.salary,
      applied: 0,
      passed: 0,
    };
    return { code: 0, message: "success", data: newJob };
  },

  /** GET /api/enterprise/candidates */
  candidates: async (): Promise<ApiResponse<{ list: CandidateItem[] }>> => {
    return mockFetch({ list: enterpriseCandidates });
  },

  /** GET /api/enterprise/candidates/:id */
  candidateDetail: async (
    id: string,
  ): Promise<ApiResponse<CandidateDetail>> => {
    await mockDelay(200);
    const c = enterpriseCandidates.find((x) => x.id === id)!;
    const job = enterpriseJobs.find((j) => j.id === c.jobId);
    return {
      code: 0,
      message: "success",
      data: {
        ...c,
        jobTitle: job?.title ?? "",
        reportSummary: c.highlight,
        dimensions: {
          ability: "经验充分，重点能力覆盖率高",
          time: "可工作日晚 + 周末",
          risk: "项目周期偏紧，建议提前对齐节奏",
        },
      },
    };
  },

  /** GET /api/enterprise/me */
  me: async (): Promise<ApiResponse<EnterpriseProfile>> => {
    return mockFetch({
      id: "e-mock",
      realm: "enterprise",
      phone: "138****1010",
      enterpriseName: "深圳暖光科技有限公司",
      creditCode: "91440300MA5EXXXX1X",
      legalRep: "张三",
      contactPhone: "0755-XXXX-XXXX",
      address: "深圳市南山区科技园",
      website: "https://example.com",
      description:
        "暖光科技是领先的数字化人才服务商，致力于为高增长企业提供灵活的弹性用工方案。",
      qualified: true,
      tags: ["人力资源服务", "高新企业", "A 轮融资", "200-500 人"],
    });
  },

  /** GET /api/enterprise/qualification/status */
  qualificationStatus: async (): Promise<
    ApiResponse<{ qualified: boolean; documents: QualificationDocument[] }>
  > => {
    return mockFetch({
      qualified: true,
      documents: [
        { key: "license", label: "营业执照", required: true, uploaded: true },
        { key: "legal", label: "法人身份证（正反面）", required: true, uploaded: true },
        { key: "extra", label: "授权委托书（如经办人非法人）", required: false, uploaded: false },
      ],
    });
  },

  /** POST /api/enterprise/qualification */
  submitQualification: async (): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 500);
  },
};

// ========== 运营后台 ==========

const adminEventLog: AdminEventLog[] = [
  { time: "10:42", type: "任务发布", msg: "雾灰设计事务所发布「企业内刊插画绘制」" },
  { time: "10:31", type: "AI 初筛", msg: "陈领活完成「移动端 UI 界面优化」初筛，报告已生成" },
  { time: "10:18", type: "邀约沟通", msg: "极光科技工作室向林沐风发起邀约" },
  { time: "09:55", type: "用户注册", msg: "139****0017 完成手机号注册" },
];

export const adminApi = {
  /** GET /api/admin/dashboard */
  dashboard: async (): Promise<
    ApiResponse<{ metrics: AdminDashboardMetrics; events: AdminEventLog[] }>
  > => {
    return mockFetch({
      metrics: {
        registration: adminDashboardMetrics.registration,
        taskFlow: adminDashboardMetrics.taskFlow,
        aiScreening: adminDashboardMetrics.aiScreening,
        funnel: {
          newApply: 1280,
          enterInterview: 1024,
          reportGenerated: 762,
          enterCommunication: 312,
        },
      },
      events: adminEventLog,
    });
  },

  /** GET /api/admin/users */
  users: async (): Promise<ApiResponse<{ list: AdminUserRow[] }>> => {
    return mockFetch({ list: adminUsers });
  },

  /** GET /api/admin/enterprises */
  enterprises: async (): Promise<ApiResponse<{ list: AdminEnterpriseRow[] }>> => {
    await mockDelay(200);
    const list: AdminEnterpriseRow[] = [
      { id: "e-001", name: "极光科技工作室", contact: "138****1010", verified: true, jobs: 3, registeredAt: "2026-03-04" },
      { id: "e-002", name: "雾灰设计事务所", contact: "138****2020", verified: true, jobs: 2, registeredAt: "2026-03-08" },
      { id: "e-003", name: "光合插画工作室", contact: "138****3030", verified: false, jobs: 0, registeredAt: "2026-04-12" },
      { id: "e-004", name: "WarmLight 营销", contact: "138****4040", verified: true, jobs: 5, registeredAt: "2026-02-21" },
    ];
    return { code: 0, message: "success", data: { list } };
  },

  /** GET /api/admin/tasks */
  tasks: async (): Promise<ApiResponse<{ list: AdminTaskRow[] }>> => {
    return mockFetch({ list: adminTasks });
  },

  /** PUT /api/admin/tasks/:id/status */
  updateTaskStatus: async (
    _id: string,
    _status: TaskStatus,
  ): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 200);
  },

  /** GET /api/admin/config */
  config: async (): Promise<ApiResponse<AdminConfig>> => {
    return mockFetch({
      policies: [
        { key: "ai-pace", label: "AI 面试问答上限（5 轮以内，前端不展示）", value: 5 },
        { key: "report-ttl", label: "报告有效期（天）", value: 30 },
        { key: "candidate-keep", label: "候选人列表保留时长（天）", value: 90 },
      ],
      skillTags: [
        "UI 设计", "交互设计", "插画 / 视觉", "前端开发",
        "活动主持", "短视频脚本", "运营 / 内容", "测试 / QA",
      ],
    });
  },

  /** POST /api/admin/announcement */
  publishAnnouncement: async (_data: {
    title: string;
    content: string;
  }): Promise<ApiResponse<void>> => {
    return mockFetch(undefined, 300);
  },
};

// ========== 统一导出 ==========

export const api = {
  auth: authApi,
  profile: profileApi,
  tasks: tasksApi,
  applications: applicationsApi,
  screening: screeningApi,
  assistant: assistantApi,
  messages: messagesApi,
  postedTasks: postedTasksApi,
  enterprise: enterpriseApi,
  admin: adminApi,
};
