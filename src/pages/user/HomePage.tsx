/**
 * 个人端首页：国际主义风格（强化版）
 * - 非对称网格 3:1
 * - Display 级标题 + 极大字号对比
 * - 64px 大区块留白
 * - tabular-nums 数字对齐
 */
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { useAuth } from "@/shared/auth/store";
import { api } from "@/api/client";
import { cn } from "@/shared/utils/cn";
import { useEffect, useState } from "react";
import type { TaskCard } from "@/api/types";

const placeholderModules = [
  { name: "信用评分", icon: "shield_person" },
  { name: "AI 技能培训", icon: "school" },
  { name: "灵活用工参保", icon: "health_and_safety" },
  { name: "积分商城", icon: "redeem" },
  { name: "AI 收入规划", icon: "trending_up" },
  { name: "AI 工具调用", icon: "smart_toy" },
] as const;

export function UserHomePage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [recommended, setRecommended] = useState<TaskCard[]>([]);
  const [loading, setLoading] = useState(true);
  const nickname = session?.realm === "user" ? session.nickname : "你";
  const completeness =
    session?.realm === "user" ? session.resumeCompleteness : 92;

  useEffect(() => {
    api.tasks.list().then((res) => {
      const list = res.data.list
        .filter((t) => t.matchScore && t.matchScore >= 88)
        .slice(0, 3);
      setRecommended(list);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-2xl animate-pulse">
        <div className="h-32 bg-bone-cream-dim border border-ash-veil" />
        <div className="h-48 bg-bone-cream-dim border border-ash-veil" />
      </div>
    );
  }

  return (
    <div className="space-y-xl md:space-y-2xl">
      {/* 欢迎区：非对称 3:1 */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-lg">
        <div className="lg:col-span-3 space-y-xl">
          <div>
            <h1 className="font-headline text-headline text-deep-char">
              你好，{nickname}
            </h1>
            <p className="text-body text-graphite mt-md max-w-body leading-[1.7]">
              你的画像已更新，AI 为你找到了 {recommended.length} 个匹配岗位。继续完善资料，获得更精准的推荐。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="border border-ash-veil bg-bone-cream-dim p-md">
              <span className="block text-label text-graphite tracking-wider uppercase">
                能力画像
              </span>
              <div className="flex items-baseline gap-xs mt-1">
                <span className="font-headline text-headline text-deep-char">
                  UI 设计
                </span>
                <span className="text-label text-warm-ash">
                  Lvl. High
                </span>
              </div>
            </div>
            <div className="border border-ash-veil p-md">
              <div className="flex items-center justify-between">
                <span className="text-label text-graphite">资料完整度</span>
                <span className="text-title font-medium text-deep-char tabular-nums">
                  {completeness}%
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-ash-veil overflow-hidden">
                <div
                  className="h-full bg-graphite transition-all duration-500 ease-out-quart"
                  style={{ width: `${completeness}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-ash-veil bg-surface-container-lowest p-md md:p-lg flex flex-col justify-between">
          <div>
            <h3 className="font-title text-title text-deep-char">任务大厅</h3>
            <p className="text-body text-graphite mt-xs">
              探索新增灵活用工岗位，按你的画像智能排序。
            </p>
          </div>
          <Button
            className="self-start mt-lg"
            onClick={() => navigate("/u/tasks")}
          >
            立即前往
            <Icon name="arrow_forward" size={18} />
          </Button>
        </div>
      </section>

      {/* AI 推荐 */}
      <section>
        <header className="flex items-end justify-between mb-md md:mb-lg pb-sm border-b border-ash-veil">
          <div>
            <h2 className="font-headline text-headline text-deep-char">
              AI 智能匹配
            </h2>
            <p className="text-body text-graphite mt-xs">
              基于你的能力画像推荐
            </p>
          </div>
          <Link
            to="/u/tasks"
            className="text-body text-misty-slate font-medium hover:text-deep-char transition-colors"
          >
            查看更多
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {recommended.map((t) => (
            <Card
              key={t.id}
              tone="default"
              hoverable
              onClick={() => navigate(`/u/tasks/${t.id}`)}
              className="p-md md:p-lg cursor-pointer"
            >
              <div className="grid grid-cols-[40px_1fr] gap-x-sm gap-y-1.5 mb-sm">
                <div className="h-10 w-10 border border-ash-veil bg-bone-cream flex items-center justify-center text-deep-char overflow-hidden row-span-2">
                  <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden>
                    <rect x="6" y="6" width="20" height="20" fill="oklch(75% 0.005 60)" />
                  </svg>
                </div>
                <div className="flex items-baseline justify-between gap-sm min-w-0">
                  <h3 className="font-title text-title text-deep-char truncate">
                    {t.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="block text-title text-graphite tabular-nums">
                      {t.budget}
                    </span>
                    <span className="text-label text-warm-ash">
                      {t.budgetType}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-xs">
                  {t.tags.map((tag) => (
                    <Badge key={tag} tone="graphite">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {t.matchHint ? (
                <div className="bg-bone-cream-dim border border-ash-veil p-sm flex gap-sm items-start">
                  <Icon
                    name="smart_toy"
                    filled
                    size={16}
                    className="text-graphite mt-0.5 shrink-0"
                  />
                  <p className="text-[15px] font-normal text-graphite leading-[1.7]">
                    "{t.matchHint}"
                  </p>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </section>

      {/* 占位能力 */}
      <section>
        <header className="mb-md md:mb-lg pb-sm border-b border-ash-veil">
          <h2 className="font-title text-title text-deep-char">
            敬请期待
          </h2>
          <p className="text-body text-graphite mt-xs">
            这些能力即将开放，第一版仅作展示。
          </p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-sm">
          {placeholderModules.map((m) => (
            <div
              key={m.name}
              role="presentation"
              aria-disabled
              className={cn(
                "border border-ash-veil p-md text-center select-none",
                "opacity-60 cursor-not-allowed",
              )}
            >
              <Icon name={m.icon} className="text-warm-ash" size={22} />
              <p className="text-label text-graphite mt-xs leading-tight">
                {m.name}
              </p>
              <p className="text-label text-warm-ash mt-1 uppercase tracking-widest">
                即将开放
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 二级入口 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <Card
          tone="default"
          hoverable
          className="p-md md:p-lg flex items-center gap-md cursor-pointer"
          onClick={() => navigate("/u/posted-tasks")}
        >
          <span className="h-12 w-12 bg-bone-cream-dim text-deep-char flex items-center justify-center border border-ash-veil">
            <Icon name="add_task" />
          </span>
          <div className="flex-1">
            <h3 className="font-title text-title text-deep-char">我也想发任务</h3>
            <p className="text-body text-graphite mt-xs">
              复用 AI 帮你润色描述，发布后自动进入任务大厅。
            </p>
          </div>
          <Icon name="arrow_forward" className="text-graphite" />
        </Card>
        <Card
          tone="default"
          className="p-md md:p-lg flex items-center gap-md cursor-pointer hover:shadow-ambient-hover transition-shadow"
          onClick={() => navigate("/u/me/agreements")}
        >
          <span className="h-12 w-12 bg-bone-cream-dim text-deep-char flex items-center justify-center border border-ash-veil">
            <Icon name="description" />
          </span>
          <div className="flex-1">
            <h3 className="font-title text-title text-deep-char">我的协议</h3>
            <p className="text-body text-graphite mt-xs">
              查看与企业之间签署过的服务协议。本版为占位说明页。
            </p>
          </div>
          <Icon name="arrow_forward" className="text-graphite" />
        </Card>
      </section>
    </div>
  );
}
