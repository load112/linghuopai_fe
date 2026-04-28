# 国际主义风格参考资料

> 下载日期：2026-04-28
> 用途：领活派 UI 国际主义风格（Swiss Style / International Typographic Style）参考

---

## 1. swiss-designsystem（瑞士联邦设计系统）

**最适合参考：网格系统 + 组件规范 + Tailwind 落地方式**

- 政府级设计系统，对 swiss 域名下网站具有约束力
- 使用 Tailwind + PostCSS，与领活派技术栈最接近
- **网格系统**最完整：响应式断点（xs/sm/md/lg/xl/3xl）、gap 阶梯（5/7/9/10/12/16）、非对称列（1/4-3/4、1/3-2/3）
- 组件拆分方式规范：foundations（typography/spacing/colors）+ layouts（grids/container/section）+ components（btn/card/form/navbar 等 40+ 组件）
- 含 Storybook 组件展示 + Figma Library
- 查看重点：`css/foundations/typography.postcss`、`css/layouts/grids.postcss`、`css/components/btn.postcss`、`css/components/card.postcss`

## 2. swisspost-design-system（瑞士邮政设计系统）

**最适合参考：多包架构 + 组织级维护方式**

- 真实企业级设计系统，release 频繁
- 多包架构：styles / components / icons 分离
- 技术实现指南写得详细
- 适合参考"如何在团队里维护设计系统"

## 3. eswiss

**最适合参考：React 组件化 Swiss Style 实现思路**

- 明确声明"用 Swiss 设计原则做基础并适配现代 UI 开发"
- React + Sass + Storybook
- **注意**：项目 README 明确标记 "CURRENTLY UNSTABLE"，仅作参考不直接引用
- 查看重点：`src/index.scss`（基础变量）、`src/components/`（组件结构）

## 4. swiss-jekyll（Jekyll 主题：Swiss）

**最适合参考：排版节奏 + 字级阶梯 + 留白逻辑**

- 重文字内容型产品（文档/博客）的典型 Swiss Style 排版
- 多主题色（black/blue/gray/magenta/orange/red/white/yellow）
- 查看重点：`_sass/_base.scss`（基础排版）、`_sass/_variables.scss`（变量系统）

## 5. swissfolio（Astro + Tailwind 模板）

**最适合参考：实际落地模板 + 极简双色调**

- Astro + Tailwind CSS v4
- 极简双色调：`--color-secondary: #161614`（近黑）、`--color-primary: #f4f5ef`（米白）
- `font-variant-numeric: tabular-nums` 等细节处理
- 适合快速感受"瑞士风作品集/个人页"的结构
- 查看重点：`src/styles/global.css`（极简单文件配置）、`src/pages/index.astro`（页面结构）

## 6. blueprint-css

**最适合参考：网格/排版基线原理（教材级）**

- 经典 CSS Grid 框架，已 archived
- README 把"可定制网格、默认排版、typographic baseline"讲得很直白
- 适合理解"排版基线/网格"如何影响 UI 观感
- 查看重点：`blueprint/screen.css`、`TUTORIAL.textile`

---

## 实操要点（与领活派对照）

| Swiss 原则 | 领活派已实现 | 可进一步对齐 |
|---|---|---|
| 网格先行 | Tailwind grid + gap 系统 | 参考 swiss-designsystem 的非对称列（1/4-3/4） |
| 排版当主视觉 | Manrope + 设计系统字级 | 参考 swiss-jekyll 的段落节奏 |
| 直角/极少圆角 | Card/Button 已去圆角 | 确认所有输入框、表格也保持直角 |
| 克制色彩 | 5% 暖光规则 | 参考 swissfolio 的双色调极简思路 |
| 无渐变/无模糊 | 已清理 | 持续保持 |
| 左对齐右参差 | 已左对齐 | 避免两端对齐（justify） |
| tabular-nums | 未配置 | 数字列（预算、评分）可加 `tabular-nums` |

---

## 建议阅读顺序

1. **先看 swissfolio**（5分钟）— 感受极简双色调的实际效果
2. **再看 swiss-jekyll**（10分钟）— 理解字级/留白/段落节奏
3. **重点精读 swiss-designsystem/css/layouts/grids.postcss**（15分钟）— 网格纪律
4. **对比 swiss-designsystem/css/components/btn.postcss + card.postcss**（10分钟）— 组件实现
5. **浏览 blueprint-css/TUTORIAL.textile**（10分钟）— 理解排版基线原理
