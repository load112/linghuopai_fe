---
name: 领活派 Design System — 国际主义风格版
colors:
  surface: '#fff8f6'
  surface-dim: '#efd4cc'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#ffe9e3'
  surface-container-high: '#fee2da'
  surface-container-highest: '#f8ddd4'
  on-surface: '#261813'
  on-surface-variant: '#5a4138'
  inverse-surface: '#3d2d27'
  inverse-on-surface: '#ffede8'
  outline: '#8e7066'
  outline-variant: '#e2bfb3'
  surface-tint: '#a93700'
  primary: '#a53600'
  on-primary: '#ffffff'
  primary-container: '#cf4600'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59b'
  secondary: '#4a616f'
  on-secondary: '#ffffff'
  secondary-container: '#cde6f7'
  on-secondary-container: '#506776'
  tertiary: '#005ea3'
  on-tertiary: '#ffffff'
  tertiary-container: '#0077cd'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59b'
  on-primary-fixed: '#380d00'
  on-primary-fixed-variant: '#812800'
  secondary-fixed: '#cde6f7'
  secondary-fixed-dim: '#b2cada'
  on-secondary-fixed: '#041e2a'
  on-secondary-fixed-variant: '#334a57'
  background: '#fff8f6'
  on-background: '#261813'
  surface-variant: '#f8ddd4'
  linghuo-amber: '#EA5614'
  misty-slate: '#4A616F'
  bone-cream: oklch(98% 0.008 60)
  bone-cream-dim: oklch(96% 0.008 60)
  ash-veil: oklch(92% 0.006 60)
  warm-ash: oklch(75% 0.005 60)
  graphite: oklch(45% 0.005 60)
  deep-char: oklch(22% 0.008 60)
typography:
  display:
    fontFamily: Manrope, PingFang SC, Source Han Sans SC, Microsoft YaHei, sans-serif
    fontSize: clamp(2rem, 5vw, 3rem)
    fontWeight: '600'
    lineHeight: '1.1'
  headline:
    fontFamily: Manrope, PingFang SC, Source Han Sans SC, Microsoft YaHei, sans-serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.25'
  title:
    fontFamily: Manrope, PingFang SC, Source Han Sans SC, Microsoft YaHei, sans-serif
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.35'
  body:
    fontFamily: Manrope, PingFang SC, Source Han Sans SC, Microsoft YaHei, sans-serif
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label:
    fontFamily: Manrope, PingFang SC, Source Han Sans SC, Microsoft YaHei, sans-serif
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.04em
shape:
  DEFAULT: 0px
  sm: 0px
  md: 2px
  lg: 4px
  xl: 8px
  2xl: 12px
  3xl: 16px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max-body: 75ch
---

# 领活派 Design System — 国际主义风格版

> 以领活派原有"暖光工作站"为情感基调，叠加 International Typographic Style（瑞士/国际主义风格）的理性网格、直角、强层级与克制用色。

---

## 1. Overview

**Creative North Star: "暖光下的工作站"**

领活派的视觉系统是一间在傍晚开着暖光的工作站。墙是温厚中性的米白与雾蓝灰，做事的人坐下、动手、把任务说清楚；屋子里有一盏暖橙的灯，只在重要的时刻亮起：你被看见了、企业邀约了、AI 把工作做完了、可以下一步了。其他时间，灯是灯，人才是主角。

叠加国际主义风格后，这间工作站有了一套**数学网格**和**严格的排版纪律**：东西不随便放，每一行、每一块都落在网格上；圆角退到幕后，直角成为默认语言；字体承担全部层级工作，装饰彻底让位。

这个系统服务两类被传统招聘网站打疲了的人：被信息密集和广告条幅压怕的劳动者，被中后台默认皮肤伺候到麻木的企业用人方。所以舞台必须先安静下来，AI 的存在感必须先克制下来，重点色必须先稀少下来；然后才轮到品牌橙在该亮的时候亮，A2A 撮合动画在该出场的时候出场。

这个系统**明确拒绝**：
- 51job / 智联 / BOSS 直聘那种密集表格、广告条幅、"立即领取" 弹层的招聘网站气质
- 黑底紫光、神经网络背景、未来感霓虹的纯 AI 玄学风
- Ant Design / Element Plus 默认皮肤直接出场的蓝灰色 B 端中后台无感
- 圆角过多、药丸按钮、渐变背景、装饰性模糊等过度装饰

**Key Characteristics:**
- 温厚中性主导，品牌橙是稀少的强光
- 单无衬线字体承担全部排版，字重与字号传递全部层级
- 直角为主，功能性圆角极小
- 网格先行：先定网格，再填组件
- 大留白不是浪费，是呼吸
- 动效双轨：主链路安静，A2A 撮合场景才动起来
- 移动端是真的移动优先，不是桌面缩一缩
- 状态、节点、下一步永远讲清楚，不让人猜

---

## 2. Philosophy: 国际主义核心原则

### 2.1 网格先行（Grid First）

国际主义风格里，网格不是装饰，是**决策系统**。列宽、槽距（gutter）、基线、模块间距先定好，组件只是填进网格的结果。

- 页面布局以 Tailwind `grid` 为主，少用 `flex` 做宏观布局
- 主推网格：1 列（移动端）、2 列（平板）、3 列（桌面内容）、4 列（桌面数据）
- 非对称比例优先：2:1、3:1、1/4-3/4，而非均等分割
- 所有 Section 之间用统一 gap（`gap-lg` / `gap-xl`）保持呼吸节奏

### 2.2 排版即主视觉（Typography as Hero）

字体承担全部视觉层级工作，不靠色彩特效、不靠图标堆砌、不靠装饰元素。

- 无衬线字体（Manrope + PingFang SC）贯穿全部层级
- 左对齐右参差（flush-left, ragged-right），**禁止**正文两端对齐
- 标题可以更大胆，正文控制行长与行距
- 字重对比（400 vs 500 vs 600）比色彩对比更优先
- 数字列（预算、评分、ID）使用 `font-variant-numeric: tabular-nums` 保持对齐

### 2.3 结构、对比、留白取胜

- 少阴影、少渐变、少拟物
- 用字号对比、粗细对比、单一强调色去建立层级
- 留白是积极的，不是"还没填满"
- 一个卡片内的信息密度宁少勿多

---

## 3. Grid System

### 3.1 基础网格

领活派使用 Tailwind CSS 的 12 列隐式网格，配合以下约定：

| 场景 | 移动端 | 平板 | 桌面端 |
|---|---|---|---|
| 单栏内容 | `grid-cols-1` | `grid-cols-1` | `grid-cols-1`（max-width 75ch） |
| 卡片列表 | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| 数据看板 | `grid-cols-2` | `grid-cols-2` | `grid-cols-4` |
| 主从布局 | `grid-cols-1` | `grid-cols-1` | `grid-cols-3`（主 2 + 侧 1） |

### 3.2 槽距（Gap）

| Token | 值 | 用途 |
|---|---|---|
| `gap-sm` | 8px | 卡片内部元素间距、标签组 |
| `gap-md` | 16px | 卡片之间、表单字段 |
| `gap-lg` | 24px | Section 之间、页面区块 |
| `gap-xl` | 40px | 大区块之间、首屏分区 |

### 3.3 Section 分隔

Section header 统一使用底部边框分隔，而非背景色块：

```
mb-md pb-sm border-b border-ash-veil
```

- 边框线作为分区工具，替代背景色块
- header 内左对齐：`flex items-end justify-between`
- 标题在左，操作按钮/链接在右

---

## 4. Colors: 暖光与雾灰的 Restrained 调色板

整个调色板是温厚中性 + 一支暖橙重点色，再加一支冷雾蓝灰做次中性陪衬；策略是 **Restrained**：标准色出现频率 ≤5%。

### Primary

- **领活橙 (LingHuo Amber)** `#EA5614` / `oklch(63.8% 0.2 36)`：品牌标准色。**稀少**：用于关键 CTA、关键状态指示（"已邀约"、"AI 报告生成"）、品牌锚点（logo、loading 主色）、A2A 撮合动效中的"企业 Agent"头像。**禁止**：作为大面积背景、作为页面主色块、作为多个并列元素的统一强调色。
- **雾灰青 (Misty Slate)** `#4A616F` / `oklch(45.5% 0.035 232)`：品牌辅助色。承担次级强调、关键导航文字、信息标签、A2A 撮合动效中的"学生 Agent"头像。**不喧宾夺主**：永远比领活橙低一级。

### Neutral

由暖白逐级走到深炭，所有中性色微微向品牌橙的色相倾斜（chroma 0.005 ~ 0.012），这样品牌橙落在画面里时，是"同一光线下的强调"，不是"贴上去的"。

- **米白 (Bone Cream)** `oklch(98% 0.008 60)`：主背景。
- **米白-1 (Bone Cream Dim)** `oklch(96% 0.008 60)`：分区背景、表单底色、抽屉背景。
- **雾白 (Ash Veil)** `oklch(92% 0.006 60)`：分隔线、卡片描边、低强度边界。
- **暖灰 (Warm Ash)** `oklch(75% 0.005 60)`：占位文字、被禁用文字、辅助说明。
- **石墨 (Graphite)** `oklch(45% 0.005 60)`：次级正文、Label 文字。
- **深炭 (Deep Char)** `oklch(22% 0.008 60)`：主要正文、标题、关键数字。

### Named Rules

**The 5% 暖光 Rule.** 领活橙在任何一屏上的占面积不超过 5%。它是稀少光源，不是装饰漆。如果一屏里出现两个并列的橙色按钮、橙色 tag、橙色图标，就已经过亮了——挑出最重要的一个保留橙，其他降到雾灰青或深炭。

**The Tinted Neutral Rule.** **禁止** `#000` 与 `#fff`。所有中性色必须微微暖偏（色相 60 附近，chroma 0.005 ~ 0.012）。这是"同一盏暖灯下"的物理一致性。

**The Anti-AI-Slop Rule.** **禁止** 黑底紫光、神经网络背景、未来感霓虹、"AI 风暴" 视觉。AI 原生不是 AI 视觉装饰；它的表达是助手姿态、克制、稳定，不是粒子和发光。

---

## 5. Typography

**Font Family:** Manrope + PingFang SC + Source Han Sans SC + Microsoft YaHei + sans-serif

单无衬线，人文偏暖，承担全部排版工作。不引入第二种英文字体家族。

**Character:** 这套排版应该读起来像一个声音冷静、不抢话、有过经验的助手在跟你解释下一步。它不卖弄、不煽情、不写营销腔。它有人文温度，但温度是在字距与节奏里，不是在装饰里。

### Hierarchy

| Token | Size | Weight | Line-Height | Letter-Spacing | 用途 |
|---|---|---|---|---|---|
| Display | clamp(2rem, 5vw, 3rem) | 600 | 1.1 | — | 仅关键节点大标题（登录页、空状态） |
| Headline | 24px | 600 | 1.25 | — | 页面级主标题 |
| Title | 18px | 500 | 1.35 | — | 分区标题、卡片标题 |
| Body | 15px | 400 | 1.6 | — | 正文、描述，max-width 75ch |
| Label | 12px | 500 | 1 | 0.04em | 状态徽章、标签、辅助文字 |

### Named Rules

**The Two-Step Rule.** 每两级层级之间的字号比 ≥ 1.25。

- Headline(24) / Title(18) = 1.33 ✓
- Title(18) / Body(15) = 1.20 ✗ — 接近临界，需通过字重（500 vs 400）补偿
- Body(15) / Label(12) = 1.25 ✓

**禁止**出现 13px、14px、16px、20px 等中间字号。要么用设计系统定义的 token，要么不用。

**The Reading Comfort Rule.** Body 文本的容器最大宽度卡在 65–75ch。**禁止**让正文铺满 PC 大屏整行宽度。

**The No-Gradient-Text Rule.** **禁止** `background-clip: text` + 渐变背景的"梦幻文字"。强调用字重和字号，不用色彩特效。

**Flush-Left Rule.** 正文永远左对齐，保留右边缘参差。禁止 `text-justify` 和 `text-align: justify`。

---

## 6. Shape: 直角哲学

国际主义风格的核心形态语言是**直角**。圆角只出现在功能性场景（头像、状态点），且极小。

| Token | 值 | 用途 |
|---|---|---|
| `rounded-none` / `DEFAULT` | 0px | Card、Button、输入框、表格、Section 容器（默认） |
| `rounded-sm` | 0px | 与默认一致 |
| `rounded-md` | 2px | 极少使用 |
| `rounded-lg` | 4px | 大模块的极小区分（如抽屉） |
| `rounded-xl` | 8px | 弹层、toast |
| `rounded-2xl` | 12px | 不使用 |
| `rounded-3xl` | 16px | 不使用 |
| `rounded-full` | 9999px | **仅**头像、进度环、loading spinner 等功能性圆形 |

### 禁止

- 药丸按钮（`rounded-full` 按钮）
- 圆角卡片（`rounded-xl` 卡片）
- 圆角输入框（`rounded-lg` 输入框）
- 圆角表格
- 圆角图标容器（统一用 `border border-ash-veil` 方形）

### 图标容器规范

所有图标/头像/状态标识的容器统一为方形：

```
border border-ash-veil bg-bone-cream-dim
```

- 状态色通过文字色或边框色表达，不用背景色块
- 禁用 `bg-linghuo-amber/10` + `text-linghuo-amber` 的高饱和图标容器
- 禁用 `bg-amber-50`、`bg-emerald-50` 等彩色背景

---

## 7. Elevation

领活派**默认平面**。深度通过：
1. 中性色逐级递进的"色调分层"（米白 → 米白-1 → 雾白）
2. 仅在状态需要时（hover / focus / 抬起 / 弹层）出现的极轻阴影

阴影不是装饰，而是状态的回声。

### Shadow Vocabulary

- **ambient-rest** (`box-shadow: 0 1px 0 0 oklch(92% 0.006 60)`)：默认状态下卡片与表单的极轻分隔（实质是底部 1px 而非传统投影）。
- **ambient-hover** (`box-shadow: 0 4px 16px -4px oklch(45% 0.005 60 / 0.08)`)：hover 时卡片的"被注意"信号。
- **floating-overlay** (`box-shadow: 0 16px 40px -12px oklch(22% 0.008 60 / 0.18)`)：抽屉、弹层、消息中心面板。**仅**用于真正脱离文档流的元素。

### Named Rules

**The Flat-By-Default Rule.** 所有表面默认平面。阴影只作为状态的反应（hover、focus、elevation 提升、面板浮起）。**禁止**给静态卡片加默认投影。

**The No-Glassmorphism Rule.** **禁止** glassmorphism 当默认。**禁止** `backdrop-blur`、`blur-*`、半透明磨砂背景。模糊与玻璃质感不用于任何常规场景。

**The No-Gradient Rule.** **禁止**渐变背景（`bg-gradient-to-*`）。所有表面用纯色 flat-by-default。

---

## 8. Spacing

| Token | 值 | 用途 |
|---|---|---|
| `xs` | 4px | 图标与文字间距、标签内边距 |
| `sm` | 8px | 卡片内部紧凑间距、按钮内图标间距 |
| `md` | 16px | 表单字段间距、卡片 padding、表格行间距 |
| `lg` | 24px | Section 之间、Card 之间、页面侧边距 |
| `xl` | 40px | 大区块之间、首屏上下留白 |

### 留白原则

- 页面内容区左右留白至少 `px-md`（16px），桌面端可增至 `px-lg`（24px）
- 两个 Section 之间至少 `space-y-lg`
- 卡片内部 padding 统一 `p-lg`
- 宁可空，不要挤

---

## 9. Motion

### Easing

| Name | Value | 用途 |
|---|---|---|
| `ease-out-quart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 默认过渡、hover、状态切换 |
| `ease-out-quint` | `cubic-bezier(0.23, 1, 0.32, 1)` | 卡片 hover 浮起 |
| `ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | 弹层、抽屉进入 |

**禁止** bounce / elastic / spring 弹性缓动。

### 动效双轨

- **主链路**：安静。页面切换、表单提交、列表加载用极淡的过渡（200–300ms），不打扰。
- **A2A 撮合场景**：才动起来。双 Agent 头像、对话气泡、流式打字、进度条、数据可视化，按既定设计实现。

---

## 10. Components

### Button

| Variant | 样式 |
|---|---|
| Primary | `bg-linghuo-amber text-white` — 每屏仅一个 |
| Secondary | `bg-bone-cream-dim text-deep-char border border-ash-veil` |
| Ghost | `bg-transparent text-graphite hover:text-deep-char hover:bg-bone-cream-dim` |
| Danger | `bg-error text-on-error` |

- 所有 Button **直角**（`rounded-none`）
- 高度阶梯：`h-9`（sm）、`h-11`（md）、`h-12`（lg）
- hover 状态用 `brightness-110` 或 `bg` 色阶变化，不用阴影

### Card

- 默认：`bg-surface-container-lowest border border-ash-veil`
- 温暖变体：`bg-bone-cream-dim border border-ash-veil`
- hover：`shadow-ambient-hover hover:-translate-y-px`
- **直角**（`rounded-none`）

### Field / Input

- `bg-bone-cream-dim border border-ash-veil`
- focus：`focus:border-linghuo-amber focus:ring-1 focus:ring-linghuo-amber`
- **直角**（`rounded-none`）
- placeholder：`text-warm-ash`

### Badge

- 用 `text-label` 字号
- 背景轻染色或边框，不用实心大色块
- 状态色：amber（进行中）、slate（已发布）、graphite（已结束）、success（已通过）

### Table

- header：`text-left text-warm-ash uppercase tracking-widest text-label`
- 行分隔：`divide-y divide-ash-veil`
- 单元格 padding：`py-sm` / `py-md`
- **直角**，无圆角

---

## 11. Do's and Don'ts

### Do

- **Do** 让 `#EA5614` 领活橙在每一屏上的占面积 ≤ 5%；它是稀少光源。
- **Do** 先定网格，再画组件。列宽、gutter、模块间距先确定。
- **Do** 用无衬线字体、清晰字重层级、左对齐右参差传递层级。
- **Do** 把 Body 容器宽度卡在 65–75ch；让劳动者读得下去。
- **Do** 用字重和字号传达层级；强调通过节奏，而不是色彩特效。
- **Do** 让所有表面默认平面，阴影只作状态反应。
- **Do** 给数字列加 `tabular-nums` 保持对齐。
- **Do** 把"AI 在做什么、你在哪一步、企业是否看到"这三件事永远讲清楚。
- **Do** 让 A2A 撮合动效只在该出现的入口出现。
- **Do** 让所有动画走 ease-out-quart / quint / expo 指数缓动。
- **Do** 在 Mobile / Pad / PC 三设备上做真正的重排，不是缩放。

### Don't

- **Don't** 用渐变背景（`bg-gradient-to-*`）。
- **Don't** 用装饰性模糊（`blur-*`、`backdrop-blur`）。
- **Don't** 用 `rounded-full` 做按钮、卡片、输入框。直角是默认。
- **Don't** 用 `text-[13px]`、`text-[14px]` 等硬编码中间字号。严格走 label/body/title/headline 阶梯。
- **Don't** 用 `bg-linghuo-amber/10` + `text-linghuo-amber` 的高饱和图标容器。
- **Don't** 用 `bg-amber-50`、`bg-emerald-50` 等彩色背景。
- **Don't** 出现"领先 X% 的同类创作者"等排名攀比文案。
- **Don't** 用 `border-left` / `border-right` > 1px 的彩色侧条做强调。用完整描边或背景轻染色。
- **Don't** 用 `background-clip: text` + 渐变文字。
- **Don't** 让卡片默认带阴影。
- **Don't** 把每个 CTA 都做成大色块橙色按钮。一屏只能有一个真正的主行动。
- **Don't** 用 em dash 或 `--` 做分隔。
- **Don't** 在用户面前显示 AI 面试题数上限 / 剩余题数。
- **Don't** 让候选人在 AI 面前感到"被打分"。AI 是助手，不是裁判。
