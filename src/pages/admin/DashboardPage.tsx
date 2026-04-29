/**
 * 运营数据看板：国际主义风格
 * - 三类指标：注册与活跃、任务发布与进行中、AI 初筛与报告转化
 * - 纯只读
 */
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { api } from "@/api/client";
import type { AdminDashboardMetrics, AdminEventLog } from "@/api/types";
import { useState, useEffect } from "react";


export function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [events, setEvents] = useState<AdminEventLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.dashboard().then((res) => {
      setMetrics(res.data.metrics);
      setEvents(res.data.events);
      setLoading(false);
    });
  }, []);

  const sections = metrics
    ? [
        {
          key: "registration",
          icon: "person_add" as const,
          headline: metrics.registration.weekTotal,
          deltaLabel: `${metrics.registration.weekDelta > 0 ? "+" : ""}${metrics.registration.weekDelta}% / 周`,
          sub: `活跃率 ${(metrics.registration.activeRate * 100).toFixed(0)}%`,
          title: metrics.registration.title,
        },
        {
          key: "tasks",
          icon: "work" as const,
          headline: metrics.taskFlow.publishedThisWeek,
          deltaLabel: `${metrics.taskFlow.delta}% / 周`,
          sub: `进行中 ${metrics.taskFlow.inProgress}`,
          title: metrics.taskFlow.title,
        },
        {
          key: "ai",
          icon: "auto_awesome" as const,
          headline: metrics.aiScreening.reports,
          deltaLabel: `面试 ${metrics.aiScreening.sessions} 次`,
          sub: `报告转化率 ${(metrics.aiScreening.convertRate * 100).toFixed(0)}%`,
          title: metrics.aiScreening.title,
        },
        {
          key: "completion",
          icon: "check_circle" as const,
          headline: metrics.funnel.enterCommunication,
          deltaLabel: "+5.2% / 周",
          sub: "已结束任务 / 总任务",
          title: "任务完成率",
        },
      ]
    : [];

  const funnel = metrics
    ? [
        { label: "新报名", value: metrics.funnel.newApply, percent: 100 },
        {
          label: "进入 AI 面试",
          value: metrics.funnel.enterInterview,
          percent: Math.round((metrics.funnel.enterInterview / metrics.funnel.newApply) * 100),
        },
        {
          label: "报告生成",
          value: metrics.funnel.reportGenerated,
          percent: Math.round((metrics.funnel.reportGenerated / metrics.funnel.newApply) * 100),
        },
        {
          label: "进入沟通",
          value: metrics.funnel.enterCommunication,
          percent: Math.round((metrics.funnel.enterCommunication / metrics.funnel.newApply) * 100),
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-lg animate-pulse">
        <div className="h-24 bg-bone-cream-dim border border-ash-veil" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          <div className="lg:col-span-2 h-64 bg-bone-cream-dim border border-ash-veil" />
          <div className="h-64 bg-bone-cream-dim border border-ash-veil" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-lg">
      <header>
        <h2 className="font-headline text-headline text-deep-char">运营看板</h2>
        <p className="text-body text-graphite mt-xs">
          只展示三类核心指标：注册与活跃、任务发布与进行中、AI 初筛与报告转化。
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {sections.map((s) => (
          <Card key={s.key} className="p-md md:p-md md:p-lg">
            <header className="flex items-start justify-between">
              <span className="h-9 w-9 border border-ash-veil bg-bone-cream-dim text-misty-slate flex items-center justify-center">
                <Icon name={s.icon} />
              </span>
              <span className="text-label text-warm-ash uppercase tracking-widest">
                {s.deltaLabel}
              </span>
            </header>
            <p className="mt-md font-headline text-headline text-deep-char">
              {s.headline.toLocaleString()}
            </p>
            <p className="text-body text-graphite mt-1">{s.title}</p>
            <p className="text-label text-warm-ash mt-xs">{s.sub}</p>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <Card className="lg:col-span-2 p-md md:p-lg">
          <header className="flex items-center justify-between mb-md pb-sm border-b border-ash-veil">
            <h3 className="font-title text-title text-deep-char">本周转化漏斗</h3>
            <span className="text-label text-warm-ash">
              报名 → AI 面试 → 报告 → 邀约
            </span>
          </header>
          <ul className="space-y-md">
            {funnel.map((row) => (
              <li key={row.label}>
                <div className="flex items-center justify-between text-label mb-xs">
                  <span className="text-graphite">{row.label}</span>
                  <span className="font-bold text-deep-char">
                    {row.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 bg-bone-cream-dim overflow-hidden">
                  <div
                    className="h-full bg-deep-char"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-md md:p-md md:p-lg">
          <header className="flex items-center justify-between mb-md pb-sm border-b border-ash-veil">
            <h3 className="font-title text-title text-deep-char">实时事件</h3>
            <span className="text-label text-warm-ash">最近 1 小时</span>
          </header>
          <ul className="space-y-md">
            {events.map((ev, idx) => (
              <li key={idx} className="flex items-start gap-md">
                <span className="text-label text-warm-ash w-12 mt-1 shrink-0">
                  {ev.time}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-body text-deep-char">{ev.msg}</p>
                  <p className="text-label text-graphite mt-0.5">{ev.type}</p>
                </div>
                <span className="mt-1 h-2 w-2 shrink-0 bg-graphite" />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
