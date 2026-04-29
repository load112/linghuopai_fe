# 领活派 V1 前端接口契约

> **用途**：前端已按此契约封装了 API Client（`src/api/client.ts`），后端按此实现即可。
>
> **Base URL**：`https://your-domain.com/api`
>
> **通用响应格式**：
> ```json
> { "code": 0, "message": "success", "data": {} }
> ```
> - `code = 0` 表示成功，非 0 为业务错误码
> - 所有接口统一返回此结构，`data` 内为实际数据

---

## 目录

1. [认证](#1-认证)
2. [用户画像](#2-用户画像)
3. [任务大厅](#3-任务大厅)
4. [报名 / 我的任务](#4-报名--我的任务)
5. [AI 面试](#5-ai-面试)
6. [AI 助手](#6-ai-助手)
7. [消息中心](#7-消息中心)
8. [个人发任务](#8-个人发任务)
9. [企业端](#9-企业端)
10. [运营后台](#10-运营后台)

---

## 1. 认证

### 1.1 发送验证码

```
POST /auth/send-code
```

**请求**：
```json
{ "phone": "13800138000" }
```

**响应**：`{ code: 0 }`

> 注：前端只校验 11 位手机号格式，不处理图形验证码。

---

### 1.2 登录（个人/企业）

```
POST /auth/login
```

**请求**：
```json
{ "phone": "13800138000", "code": "123456" }
```

**响应**：
```json
{
  "token": "jwt-string",
  "user": {
    "id": "u-xxx",
    "realm": "user",           // 或 "enterprise"
    "phone": "13800138000",
    "nickname": "陈领活",       // user 字段
    "resumeCompleteness": 92,  // user 字段
    "enterpriseName": "极光科技", // enterprise 字段
    "qualified": true          // enterprise 字段
  }
}
```

> `realm` 决定跳转目标：`user` → `/u/home`，`enterprise` → `/b/home`
> 同一手机号在个人端和企业端是两个独立账号。

---

### 1.3 登录（运营后台）

```
POST /auth/admin-login
```

**请求**：
```json
{ "account": "admin", "password": "***" }
```

**响应**：同 1.2，`realm` 为 `"admin"`

---

## 2. 用户画像

### 2.1 获取画像

```
GET /profile
```

**响应**：
```json
{
  "id": "u-xxx",
  "realm": "user",
  "phone": "138****0001",
  "nickname": "陈领活",
  "city": "上海",
  "industry": "设计 / 视觉",
  "experience": "5 年",
  "availableTime": "工作日 19:00 后 + 周末",
  "status": "可接单",
  "resumeCompleteness": 92,
  "tags": ["UI/UX Design", "Tailwind CSS"],
  "radarAxes": [
    { "label": "创新力", "value": 0.78 },
    { "label": "执行效率", "value": 0.92 },
    { "label": "沟通协调", "value": 0.66 },
    { "label": "专业广度", "value": 0.74 },
    { "label": "抗压性", "value": 0.84 }
  ],
  "skillChips": [
    { "name": "UI/UX Design", "primary": false },
    { "name": "Tailwind CSS", "primary": true }
  ],
  "projects": [
    {
      "name": "WarmLight 设计系统重构",
      "period": "2025.10 — 至今",
      "desc": "主导组件库 token 化迁移..."
    }
  ],
  "resumes": [
    {
      "id": "r-1",
      "name": "陈领活_全栈设计师_2026.pdf",
      "format": "pdf",
      "size": "2.4 MB",
      "updatedAt": "3 天前",
      "isPrimary": true
    }
  ],
  "aiSuggestion": {
    "content": "建议在简历中增加...",
    "relatedTask": "跨境电商 UI 优化"
  }
}
```

---

### 2.2 更新资料

```
POST /profile
```

**请求**：部分字段更新
```json
{ "nickname": "新昵称", "city": "北京" }
```

**响应**：`{ code: 0 }`

---

## 3. 任务大厅

### 3.1 任务列表

```
GET /tasks?keyword=&filter=all&page=1&pageSize=20
```

**查询参数**：
- `keyword`: 搜索关键词（标题、发布者）
- `filter`: `all` | `remote` | `design` | `frontend` | `operation`
- `page` / `pageSize`: 分页

**响应**：
```json
{
  "list": [
    {
      "id": "t-001",
      "title": "移动端 UI 界面优化",
      "source": "enterprise",      // 或 "individual"
      "publisher": "光合插画工作室",
      "budget": "¥800-1200",
      "budgetType": "按件计费",
      "tags": ["远程", "3天内交付"],
      "matchHint": "你的风格与该企业过往的插画偏好匹配度达 98%",
      "matchScore": 98,
      "status": "PUBLISHED"
    }
  ],
  "total": 6,
  "page": 1,
  "pageSize": 20
}
```

> `matchHint` 和 `matchScore` 为 AI 推荐字段，未登录用户可不返回。

---

### 3.2 任务详情

```
GET /tasks/:id
```

**响应**：
```json
{
  "id": "t-001",
  "title": "移动端 UI 界面优化",
  "source": "enterprise",
  "publisher": "光合插画工作室",
  "budget": "¥800-1200",
  "budgetType": "按件计费",
  "tags": ["远程", "3天内交付"],
  "matchHint": "...",
  "matchScore": 98,
  "status": "PUBLISHED",
  "description": "任务详细描述...",
  "deliverables": ["所有插画输出 SVG 与 PNG", "风格保持一致"],
  "processSteps": [
    { "order": 1, "title": "报名后自动开启 AI 面试", "desc": "..." },
    { "order": 2, "title": "完成面试后再确认是否投递", "desc": "..." },
    { "order": 3, "title": "企业看到你之后再开启沟通", "desc": "..." }
  ],
  "publisherInfo": {
    "name": "光合插画工作室",
    "verified": true,
    "type": "enterprise"
  }
}
```

---

### 3.3 报名

```
POST /tasks/:id/apply
```

**响应**：
```json
{ "screeningSessionId": "ss-xxx" }
```

> 报名成功即自动创建 AI 面试会话，前端直接跳转到 `/u/screening/:sessionId`

---

## 4. 报名 / 我的任务

### 4.1 报名列表

```
GET /applications?tab=ALL
```

**查询参数**：
- `tab`: `ALL` | `ACTIVE` | `FINISHED`

**响应**：
```json
{
  "list": [
    {
      "id": "a-1",
      "taskId": "t-001",
      "taskTitle": "移动端 UI 界面优化",
      "taskBudget": "¥800-1200",
      "publisher": "光合插画工作室",
      "stage": "INVITED",          // 或 SUBMITTED / INTERVIEW / AWAIT_CONFIRM / FINISHED
      "lastUpdate": "今天 14:21",
      "hint": "企业方已邀请你进一步沟通...",
      "progress": 65,              // INTERVIEW 阶段有效
      "invite": {
        "hrName": "HR 王经理",
        "hrTitle": "极光科技工作室",
        "hrInitial": "王",
        "expireIn": "24 小时内答复"
      }
    }
  ],
  "stats": {
    "total": 5,
    "interviewing": 1,
    "monthlyEarnings": null      // 第一版未上线
  }
}
```

---

### 4.2 确认投递

```
POST /applications/:id/confirm
```

---

### 4.3 接受/拒绝邀约

```
POST /applications/:id/accept-invite
POST /applications/:id/reject-invite
```

---

## 5. AI 面试

### 5.1 获取面试会话

```
GET /screening/:taskId
```

**响应**：
```json
{
  "sessionId": "ss-xxx",
  "taskId": "t-001",
  "taskTitle": "移动端 UI 界面优化",
  "publisher": "光合插画工作室",
  "tags": ["远程", "3天内交付"],
  "status": "ONGOING",           // 或 "COMPLETED"
  "turns": [
    { "id": "ai-1", "role": "ai", "text": "你好，欢迎来到..." }
  ]
}
```

> 前端不展示题数上限，不限时，支持中断后按题续接。

---

### 5.2 回复面试

```
POST /screening/:sessionId/reply
```

**请求**：
```json
{ "text": "我最近在做..." }
```

**响应**：返回更新后的 Session（含 AI 新回复）

> 后端在收到 4-5 轮用户回复后自然收尾，返回 `status: "COMPLETED"`

---

## 6. AI 助手

### 6.1 获取历史

```
GET /assistant/history
```

**响应**：
```json
{
  "messages": [
    {
      "id": "b-1",
      "from": "ai",
      "text": "你好，我是你的领活派 AI 助手...",
      "hint": "通用画像问答 · 跨任务复用"
    }
  ]
}
```

---

### 6.2 发送消息

```
POST /assistant/chat
```

**请求**：
```json
{ "text": "推荐 3 个我可以接的远程任务" }
```

**响应**：
```json
{
  "messages": [
    { "id": "u-1", "from": "user", "text": "推荐 3 个..." },
    {
      "id": "a-1",
      "from": "ai",
      "text": "已根据你的画像挑了 2 个匹配度较高的任务...",
      "hint": "本次回答仅生成草案，不会直接改写正式资料",
      "taskCards": [
        {
          "id": "t-001",
          "title": "移动端 UI 界面优化",
          "publisher": "光合插画工作室",
          "budget": "¥800-1200",
          "matchScore": 98
        }
      ]
    }
  ]
}
```

> `taskCards` 仅在用户询问推荐任务时返回。

---

## 7. 消息中心

### 7.1 消息列表

```
GET /messages
```

**响应**：
```json
{
  "list": [
    {
      "id": "m-001",
      "kind": "invite",            // system | invite | interview | report | thread | announcement
      "title": "极光科技工作室邀请你沟通",
      "preview": "你的画像匹配度达 96%...",
      "content": "完整内容...",      // 展开时显示
      "time": "刚刚",
      "read": false
    }
  ],
  "unreadCount": 2
}
```

---

### 7.2 标记已读

```
PUT /messages/:id/read
```

### 7.3 全部已读

```
PUT /messages/read-all
```

---

## 8. 个人发任务

### 8.1 我发布的任务列表

```
GET /posted-tasks
```

**响应**：
```json
{
  "list": [
    {
      "id": "p-1",
      "title": "周末校园活动主持",
      "budget": "¥600 / 场",
      "status": "PUBLISHED",       // PUBLISHED | IN_PROGRESS | CLOSED
      "publishedAt": "2 小时前",
      "applicants": 4,
      "unreadThreads": 1
    }
  ]
}
```

---

### 8.2 发布任务

```
POST /posted-tasks
```

**请求**：
```json
{
  "draft": "周末活动主持人，有舞台经验，杭州滨江，时薪 200 上下",
  "polished": "AI 润色后的结构化内容"
}
```

**响应**：返回新建的 PostedTask

---

## 9. 企业端

### 9.1 工作台数据

```
GET /enterprise/dashboard
```

**响应**：
```json
{
  "pendingCandidates": 3,
  "openings": 2,
  "aiReportsThisWeek": 12,
  "completionRate": 312,
  "matchAccuracy": 0.94,
  "candidateQualityScore": 8.2
}
```

---

### 9.2 岗位列表

```
GET /enterprise/jobs
```

**响应**：
```json
{
  "list": [
    {
      "id": "j-001",
      "title": "高级 UI/UX 设计师",
      "status": "进行中",
      "location": "杭州 · 滨江",
      "salary": "15k-25k",
      "applied": 42,
      "passed": 12
    }
  ]
}
```

---

### 9.3 发布岗位

```
POST /enterprise/jobs
```

**请求**：
```json
{
  "title": "高级 UI/UX 设计师",
  "salary": "15k-25k",
  "location": "远程 / 杭州",
  "requirement": "3 年以上相关经验..."
}
```

---

### 9.4 候选人列表

```
GET /enterprise/candidates
```

**响应**：
```json
{
  "list": [
    {
      "id": "c-001",
      "name": "陈领活",
      "title": "5年经验 · 高级 UI/UX",
      "matchScore": 96,
      "stage": "REPORT_GENERATED",  // IN_PROCESS | FINISHED
      "subStage": "邀约沟通",        // IN_PROCESS 时可能有
      "jobId": "j-001",
      "highlight": "在 SaaS 项目重构与设计系统方面有完整案例",
      "appliedAt": "2026-04-25 14:21"
    }
  ]
}
```

---

### 9.5 候选人详情

```
GET /enterprise/candidates/:id
```

**响应**：
```json
{
  "id": "c-001",
  "name": "陈领活",
  "title": "5年经验 · 高级 UI/UX",
  "matchScore": 96,
  "stage": "REPORT_GENERATED",
  "subStage": "邀约沟通",
  "jobId": "j-001",
  "jobTitle": "高级 UI/UX 设计师",
  "highlight": "...",
  "appliedAt": "2026-04-25 14:21",
  "reportSummary": "...",
  "dimensions": {
    "ability": "经验充分，重点能力覆盖率高",
    "time": "可工作日晚 + 周末",
    "risk": "项目周期偏紧，建议提前对齐节奏"
  }
}
```

---

### 9.6 企业信息

```
GET /enterprise/me
```

**响应**：
```json
{
  "id": "e-xxx",
  "realm": "enterprise",
  "phone": "138****1010",
  "enterpriseName": "深圳暖光科技有限公司",
  "creditCode": "91440300MA5EXXXX1X",
  "legalRep": "张三",
  "contactPhone": "0755-XXXX-XXXX",
  "address": "深圳市南山区科技园",
  "website": "https://example.com",
  "description": "暖光科技是领先的数字化人才服务商...",
  "qualified": true,
  "tags": ["人力资源服务", "高新企业", "A 轮融资", "200-500 人"]
}
```

---

### 9.7 资质认证状态

```
GET /enterprise/qualification/status
```

**响应**：
```json
{
  "qualified": true,
  "documents": [
    { "key": "license", "label": "营业执照", "required": true, "uploaded": true },
    { "key": "legal", "label": "法人身份证（正反面）", "required": true, "uploaded": true },
    { "key": "extra", "label": "授权委托书", "required": false, "uploaded": false }
  ]
}
```

---

### 9.8 提交资质认证

```
POST /enterprise/qualification
```

---

## 10. 运营后台

### 10.1 看板数据

```
GET /admin/dashboard
```

**响应**：
```json
{
  "metrics": {
    "registration": {
      "weekTotal": 1284,
      "weekDelta": 12.4,
      "activeRate": 0.62
    },
    "taskFlow": {
      "publishedThisWeek": 318,
      "inProgress": 542,
      "delta": 8.1
    },
    "aiScreening": {
      "sessions": 1024,
      "reports": 762,
      "convertRate": 0.43
    },
    "funnel": {
      "newApply": 1280,
      "enterInterview": 1024,
      "reportGenerated": 762,
      "enterCommunication": 312
    }
  },
  "events": [
    { "time": "10:42", "type": "任务发布", "msg": "..." }
  ]
}
```

---

### 10.2 用户管理

```
GET /admin/users
```

**响应**：
```json
{
  "list": [
    {
      "id": "u-001",
      "phone": "138****0001",
      "nickname": "陈领活",
      "registeredAt": "2026-03-12",
      "status": "正常",            // 正常 | 待审核 | 已封禁
      "taskCount": 14
    }
  ]
}
```

---

### 10.3 企业管理

```
GET /admin/enterprises
```

**响应**：
```json
{
  "list": [
    {
      "id": "e-001",
      "name": "极光科技工作室",
      "contact": "138****1010",
      "verified": true,
      "jobs": 3,
      "registeredAt": "2026-03-04"
    }
  ]
}
```

---

### 10.4 任务管理

```
GET /admin/tasks
```

**响应**：
```json
{
  "list": [
    {
      "id": "ta-001",
      "title": "高级 UI/UX 设计师",
      "publisher": "极光科技工作室",
      "source": "enterprise",      // 或 "individual"
      "publishedAt": "2026-04-12",
      "status": "IN_PROGRESS",     // PUBLISHED | IN_PROGRESS | CLOSED
      "reportCount": 12
    }
  ]
}
```

---

### 10.5 修改任务状态

```
PUT /admin/tasks/:id/status
```

**请求**：
```json
{ "status": "CLOSED" }
```

---

### 10.6 系统配置

```
GET /admin/config
```

**响应**：
```json
{
  "policies": [
    { "key": "ai-pace", "label": "AI 面试问答上限", "value": 5 },
    { "key": "report-ttl", "label": "报告有效期（天）", "value": 30 },
    { "key": "candidate-keep", "label": "候选人列表保留时长（天）", "value": 90 }
  ],
  "skillTags": ["UI 设计", "交互设计", "插画 / 视觉", "前端开发"]
}
```

---

### 10.7 发布公告

```
POST /admin/announcement
```

**请求**：
```json
{ "title": "服务条款更新", "content": "正文内容..." }
```

---

## 附录 A：状态枚举

| 字段 | 可选值 |
|------|--------|
| `TaskStatus` | `PUBLISHED`, `IN_PROGRESS`, `CLOSED` |
| `ApplicationStage` | `INTERVIEW`, `AWAIT_CONFIRM`, `SUBMITTED`, `INVITED`, `FINISHED` |
| `CandidateStage` | `REPORT_GENERATED`, `IN_PROCESS`, `FINISHED` |
| `MessageKind` | `system`, `invite`, `interview`, `report`, `thread`, `announcement` |
| 用户状态 | `正常`, `待审核`, `已封禁` |

---

## 附录 B：前端已实现

- ✅ `src/api/types.ts` —— TypeScript 类型定义
- ✅ `src/api/client.ts` —— Mock API Client（带延迟）
- ✅ 所有页面已按此契约封装（正在迁移中）

后端实现后，前端只需修改 `BASE_URL` 即可切换。
