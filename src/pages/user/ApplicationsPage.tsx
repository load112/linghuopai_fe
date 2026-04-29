/**
 * 我的报名 / 我的任务（对照 stitch 个人端_6）
 * - sticky Tab：全部 / 进行中 / 已结束
 * - 顶部 3 格 stat：累计参加 / 面试中 / 本月收益（占位 · 即将开放）
 * - 邀约卡：HR 头像 + 「拒绝 / 立即接受」
 * - 候选人本人不看 AI 报告原文
 */
import { useMemo, useState } from "react";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { api } from "@/api/client";
import type { ApplicationItem } from "@/api/types";
import { cn } from "@/shared/utils/cn";
import { useEffect } from "react";

type ApplicationStage =
  | "INTERVIEW"
  | "AWAIT_CONFIRM"
  | "SUBMITTED"
  | "INVITED"
  | "FINISHED";

interface MyApplication {
  id: string;
  taskId: string;
  stage: ApplicationStage;
  lastUpdate: string;
  hint: string;
  progress?: number;
  invite?: { hrName: string; hrTitle: string; hrInitial: string; expireIn: string };
}

const stageMeta: Record<
  ApplicationStage,
  { label: string; tone: "amber" | "slate" | "graphite"; icon: string }
> = {
  INTERVIEW: { label: "AI 面试中", tone: "amber", icon: "smart_toy" },
  AWAIT_CONFIRM: { label: "待你确认投递", tone: "amber", icon: "task_alt" },
  SUBMITTED: { label: "等待企业处理", tone: "slate", icon: "hourglass_empty" },
  INVITED: { label: "企业已邀约", tone: "amber", icon: "campaign" },
  FINISHED: { label: "已结束", tone: "graphite", icon: "history_toggle_off" },
};

type TabKey = "ALL" | "ACTIVE" | "FINISHED";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "ALL", label: "全部报名" },
  { key: "ACTIVE", label: "进行中" },
  { key: "FINISHED", label: "已结束" },
];

export function ApplicationsPage() {
  const [tab, setTab] = useState<TabKey>("ALL");
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [stats, setStats] = useState({ total: 0, interviewing: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.applications.list().then((res) => {
      setApps(res.data.list);
      setStats(res.data.stats);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (tab === "ALL") return apps;
    if (tab === "FINISHED")
      return apps.filter((a) => a.stage === "FINISHED");
    return apps.filter((a) => a.stage !== "FINISHED");
  }, [tab, apps]);

  if (loading) {
    return (
      <div className="space-y-md animate-pulse">
        <div className="h-24 bg-bone-cream-dim border border-ash-veil" />
        <div className="h-48 bg-bone-cream-dim border border-ash-veil" />
      </div>
    );
  }

  return (
    <div className="space-y-md">
      <header>
        <h2 className="font-headline text-headline text-deep-char">
          我的报名
        </h2>
        <p className="text-graphite text-body mt-xs">
          推进路径在这里同步：你看到的不是报告原文，而是「现在你在哪一步」。
        </p>
      </header>

      {/* Tab：sticky */}
      <nav
        className="sticky top-16 md:top-16 z-20 bg-bone-cream/85 flex items-center gap-md md:gap-lg border-b border-ash-veil -mx-md md:-mx-lg px-md md:px-lg"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "relative py-sm px-md font-title text-body transition-colors",
              tab === t.key
                ? "text-linghuo-amber"
                : "text-graphite hover:text-deep-char",
            )}
          >
            {t.label}
            {tab === t.key ? (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-1/2 bg-linghuo-amber" />
            ) : null}
          </button>
        ))}
      </nav>

      {/* 3 格 stat */}
      <section className="grid grid-cols-3 gap-sm md:gap-md">
        <Card tone="warm" className="p-md md:p-md md:p-lg">
          <p className="text-label text-graphite">累计参加</p>
          <p className="font-headline text-headline text-linghuo-amber mt-1">
            {stats.total}
          </p>
        </Card>
        <Card tone="warm" className="p-md md:p-md md:p-lg">
          <p className="text-label text-graphite">面试中</p>
          <p className="font-headline text-headline text-linghuo-amber mt-1">
            {stats.interviewing}
          </p>
        </Card>
        <Card
          tone="warm"
          className="p-md md:p-md md:p-lg opacity-80 cursor-not-allowed select-none"
          aria-disabled
        >
          <p className="text-label text-graphite">本月收益</p>
          <p className="font-headline text-title text-warm-ash mt-1">
            ¥ —
          </p>
          <p className="text-label text-warm-ash uppercase tracking-widest mt-1">
            即将开放
          </p>
        </Card>
      </section>

      {/* 列表 */}
      <ul className="space-y-md">
        {filtered.map((app) => {
          const meta = stageMeta[app.stage];
          return (
            <li key={app.id}>
              <Card
                hoverable={app.stage !== "FINISHED"}
                className={cn(
                  "p-md md:p-lg flex flex-col gap-md",
                  app.stage === "FINISHED" && "opacity-80",
                )}
              >
                <header className="flex items-start justify-between gap-sm">
                  <div className="flex flex-wrap items-center gap-sm">
                    <Badge tone={meta.tone}>
                      <Icon name={meta.icon} size={12} filled />
                      {meta.label}
                    </Badge>
                    <span className="text-label text-warm-ash">
                      {app.lastUpdate}
                    </span>
                  </div>
                  <span className="text-linghuo-amber font-headline text-title whitespace-nowrap">
                    {app.taskBudget}
                  </span>
                </header>

                <div>
                  <h3 className="font-title text-title text-deep-char">
                    {app.taskTitle}
                  </h3>
                  <p className="text-label text-graphite mt-xs flex items-center gap-1">
                    <Icon name="business" size={14} />
                    {app.publisher}
                  </p>
                </div>

                {/* 面试中：进度条 */}
                {app.stage === "INTERVIEW" && app.progress != null ? (
                  <div>
                    <div className="flex justify-between text-label mb-1">
                      <span className="text-graphite">面试进度</span>
                      <span className="font-bold text-linghuo-amber">
                        {app.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-ash-veil overflow-hidden">
                      <div
                        className="h-full bg-linghuo-amber"
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                {/* 邀约：HR 头像 + 双按钮 */}
                {app.stage === "INVITED" && app.invite ? (
                  <>
                    <div className="bg-bone-cream-dim border border-ash-veil px-md py-sm flex items-center gap-sm">
                      <span className="h-10 w-10 border border-ash-veil bg-bone-cream-dim text-deep-char flex items-center justify-center font-medium">
                        {app.invite.hrInitial}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-body font-medium text-deep-char">
                          {app.invite.hrName}
                        </p>
                        <p className="text-label text-graphite mt-0.5">
                          {app.invite.hrTitle} · {app.invite.expireIn}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-sm">
                      <Button variant="secondary" fullWidth>
                        拒绝
                      </Button>
                      <Button fullWidth>
                        <Icon name="check" size={16} />
                        立即接受
                      </Button>
                    </div>
                  </>
                ) : null}

                {/* 等待企业处理：温和进度提示 */}
                {app.stage === "SUBMITTED" ? (
                  <p className="text-label text-graphite italic flex items-center gap-1">
                    <Icon name="info" size={14} />
                    {app.hint}
                  </p>
                ) : null}

                {/* 其他状态：通用提示 + 操作 */}
                {app.stage !== "INVITED" && app.stage !== "SUBMITTED" ? (
                  <>
                    <p className="text-body text-graphite leading-relaxed max-w-body">
                      {app.hint}
                    </p>
                    {app.stage !== "FINISHED" ? (
                      <div className="flex flex-wrap gap-sm pt-sm border-t border-ash-veil">
                        {app.stage === "INTERVIEW" ? (
                          <Button>继续面试</Button>
                        ) : null}
                        {app.stage === "AWAIT_CONFIRM" ? (
                          <Button>
                            <Icon name="task_alt" size={16} />
                            确认投递
                          </Button>
                        ) : null}
                        <Button variant="secondary">查看任务</Button>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </Card>
            </li>
          );
        })}
        {filtered.length === 0 ? (
          <li className="py-xl text-center text-graphite">
            <Icon name="inbox" size={32} className="text-warm-ash" />
            <p className="mt-sm">这个标签下还没有报名记录。</p>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
