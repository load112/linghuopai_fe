/**
 * 企业端工作台：国际主义风格
 * - 网格对齐、大量留白、直角、极少装饰
 * - 首屏以「岗位」+「待处理候选人」为主
 */
import { useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { RingGauge } from "@/shared/ui/RingGauge";
import { useAuth } from "@/shared/auth/store";
import { enterpriseJobs, enterpriseCandidates } from "@/shared/mock/data";
import { cn } from "@/shared/utils/cn";

export function EnterpriseHomePage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const enterprise = session?.realm === "enterprise" ? session : null;
  const pendingCandidates = enterpriseCandidates.filter(
    (c) => c.stage === "REPORT_GENERATED" || c.stage === "IN_PROCESS",
  ).length;

  const stats = [
    {
      key: "candidates",
      icon: "group" as const,
      label: "待处理候选人",
      en: "Candidates",
      value: pendingCandidates,
      iconTone: "slate" as const,
    },
    {
      key: "openings",
      icon: "work" as const,
      label: "招聘中岗位",
      en: "Openings",
      value: enterpriseJobs.filter((j) => j.status === "进行中").length,
      iconTone: "slate" as const,
    },
    {
      key: "ai",
      icon: "auto_awesome" as const,
      label: "AI 报告生成（本周）",
      en: "AI Insight",
      value: 12,
      iconTone: "slate" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
      <div className="lg:col-span-2 space-y-lg">
        {/* 统计卡片 */}
        <section className="grid grid-cols-3 gap-md">
          {stats.map((s) => (
            <Card key={s.key} className="p-md md:p-lg">
              <div className="flex items-start justify-between">
                <span className="h-9 w-9 border border-ash-veil bg-bone-cream-dim text-misty-slate flex items-center justify-center">
                  <Icon name={s.icon} />
                </span>
                <span className="text-label text-warm-ash uppercase tracking-widest">
                  {s.en}
                </span>
              </div>
              <p className="mt-md font-headline text-headline text-deep-char">
                {s.value}
              </p>
              <p className="text-label text-graphite mt-1">{s.label}</p>
            </Card>
          ))}
        </section>

        {/* 岗位列表 */}
        <section>
          <header className="flex items-end justify-between mb-md pb-sm border-b border-ash-veil">
            <div>
              <h2 className="font-title text-title text-deep-char">
                我发布的岗位
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/b/jobs")}
              className="text-body text-misty-slate hover:text-linghuo-amber transition-colors flex items-center gap-1"
            >
              查看全部 <Icon name="arrow_forward" size={16} />
            </button>
          </header>
          <ul className="space-y-md">
            {enterpriseJobs.map((j) => (
              <Card
                key={j.id}
                hoverable
                className="p-lg flex flex-col md:flex-row md:items-center gap-md cursor-pointer"
                onClick={() => navigate("/b/candidates")}
              >
                <div className="flex-1 min-w-0">
                  <header className="flex items-center gap-sm mb-xs">
                    <h3 className="font-title text-title text-deep-char truncate">
                      {j.title}
                    </h3>
                    <Badge tone="info">{j.status}</Badge>
                  </header>
                  <p className="text-label text-graphite flex flex-wrap gap-x-md gap-y-1">
                    <span className="flex items-center gap-1">
                      <Icon name="location_on" size={14} />
                      {j.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="payments" size={14} />
                      {j.salary}
                    </span>
                  </p>
                </div>
                <div className="flex gap-lg">
                  <div className="text-center">
                    <p className="font-headline text-title text-deep-char">
                      {j.applied}
                    </p>
                    <p className="text-label text-warm-ash">报名人数</p>
                  </div>
                  <div className="text-center">
                    <p className="font-headline text-title text-linghuo-amber">
                      {j.passed}
                    </p>
                    <p className="text-label text-warm-ash">AI 初筛通过</p>
                  </div>
                </div>
              </Card>
            ))}
          </ul>
        </section>
      </div>

      {/* 侧边栏 */}
      <aside className="space-y-lg">
        {/* 资质状态 */}
        <Card className="p-lg">
          <header className="flex items-center gap-sm mb-md">
            <span
              className={cn(
                "h-9 w-9 flex items-center justify-center border",
                enterprise?.qualified
                  ? "border-ash-veil bg-bone-cream-dim text-misty-slate"
                  : "border-ash-veil bg-bone-cream-dim text-graphite",
              )}
            >
              <Icon name="verified" size={18} />
            </span>
            <h3 className="font-title text-title text-deep-char">
              企业资质状态
            </h3>
          </header>
          <div className="bg-bone-cream-dim border border-ash-veil p-md">
            <div className="flex justify-between items-center">
              <span className="text-label text-graphite font-medium">
                认证结果
              </span>
              <span
                className={cn(
                  "text-label font-bold",
                  enterprise?.qualified ? "text-misty-slate" : "text-graphite",
                )}
              >
                {enterprise?.qualified ? "已通过" : "待认证"}
              </span>
            </div>
            <p className="mt-1 text-label text-graphite leading-relaxed">
              {enterprise?.qualified
                ? "你的企业资质已通过审核，可使用全部业务能力。"
                : "未完成资质认证前，发布岗位、查看候选人、AI 报告与站内沟通将被锁定。"}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            className="mt-md"
            onClick={() => navigate("/b/qualification")}
          >
            查看认证详情
          </Button>
        </Card>

        {/* 发布 CTA — 改为浅色风格 */}
        <Card className="p-lg border-linghuo-amber">
          <span className="inline-flex items-center gap-1 text-label text-graphite uppercase tracking-widest">
            <Icon name="auto_awesome" size={14} />
            Smart Recruitment
          </span>
          <h3 className="mt-sm font-title text-title text-deep-char">
            需要发布新职位？
          </h3>
          <p className="text-body text-graphite mt-1 leading-relaxed">
            让 AI 在 30 秒内帮你润色 JD，吸引最合适的候选人。
          </p>
          <Button
            fullWidth
            className="mt-md"
            onClick={() =>
              enterprise?.qualified
                ? navigate("/b/jobs/new")
                : navigate("/b/qualification")
            }
          >
            <Icon name="add_circle" size={16} />
            {enterprise?.qualified ? "发布新岗位" : "先去完成资质认证"}
          </Button>
        </Card>

        {/* AI 数据看板 */}
        <Card className="p-lg">
          <header className="flex items-center justify-between mb-md">
            <h3 className="font-title text-title text-deep-char">AI 数据看板</h3>
            <span className="text-label text-warm-ash">实时更新</span>
          </header>
          <div className="grid grid-cols-2 gap-sm">
            <RingGauge value={0.94} label="匹配准确度" tone="amber" />
            <RingGauge
              value={0.82}
              label="候选人质量评分"
              display="8.2"
              tone="slate"
            />
          </div>
          <p className="mt-md text-label text-warm-ash leading-relaxed">
            数据由 AI 在每次报告生成后异步刷新；前端不提供「刷新」按钮。
          </p>
        </Card>
      </aside>
    </div>
  );
}
