/**
 * 我的页：
 * - 个人协议入口（占位说明页）
 * - 占位能力（仅展示不可点）
 * - 退出登录
 */
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/auth/store";

const placeholderModules = [
  { name: "信用评分", icon: "shield_person" },
  { name: "AI 技能培训", icon: "school" },
  { name: "灵活用工参保", icon: "health_and_safety" },
  { name: "积分商城", icon: "redeem" },
  { name: "AI 收入规划", icon: "trending_up" },
  { name: "AI 工具调用", icon: "smart_toy" },
  { name: "我的收入", icon: "account_balance_wallet" },
];

export function MePage() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const nickname = session?.realm === "user" ? session.nickname : "你";

  return (
    <div className="space-y-xl">
      <Card className="p-md md:p-lg flex items-center gap-md">
        <span className="h-14 w-14 bg-linghuo-amber text-white flex items-center justify-center text-title font-headline">
          {nickname.slice(0, 1)}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-headline text-headline text-deep-char font-medium">
            {nickname}
          </h2>
          <p className="text-label text-graphite mt-sm leading-[1.5]">
            {session?.phone ? `手机号 ${session.phone}` : "已登录"}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/u/profile")}
        >
          <Icon name="edit" size={16} />
          编辑资料
        </Button>
      </Card>

      <Card className="p-md md:p-lg space-y-sm">
        <h3 className="font-title text-title text-deep-char">常用</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
          <Link
            to="/u/applications"
            className="flex items-center gap-md px-md py-sm hover:bg-bone-cream-dim transition-colors"
          >
            <Icon name="folder_open" className="text-deep-char" />
            <span className="flex-1 text-deep-char">我的报名 / 任务</span>
            <Icon name="chevron_right" className="text-graphite" />
          </Link>
          <Link
            to="/u/posted-tasks"
            className="flex items-center gap-md px-md py-sm hover:bg-bone-cream-dim transition-colors"
          >
            <Icon name="add_task" className="text-deep-char" />
            <span className="flex-1 text-deep-char">我发布的任务</span>
            <Icon name="chevron_right" className="text-graphite" />
          </Link>
          <Link
            to="/u/me/agreements"
            className="flex items-center gap-md px-md py-sm hover:bg-bone-cream-dim transition-colors"
          >
            <Icon name="description" className="text-misty-slate" />
            <span className="flex-1 text-deep-char">我的协议</span>
            <Icon name="chevron_right" className="text-graphite" />
          </Link>
        </div>
      </Card>

      <Card tone="warm" className="p-md md:p-md md:p-lg">
        <h3 className="font-title text-title text-deep-char">敬请期待</h3>
        <p className="text-body text-graphite mt-xs leading-[1.7]">
          这些能力即将开放，仅展示，不可点。
        </p>
        <ul className="mt-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-sm">
          {placeholderModules.map((m) => (
            <li
              key={m.name}
              className="bg-bone-cream-dim border border-ash-veil px-md py-md text-center opacity-80 cursor-not-allowed select-none"
              role="presentation"
              aria-disabled
            >
              <Icon name={m.icon} className="text-warm-ash" size={22} />
              <p className="text-label text-graphite mt-xs font-medium">{m.name}</p>
              <p className="text-label text-warm-ash mt-1 uppercase tracking-widest opacity-50">
                即将开放
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="w-full md:w-auto px-md h-11 border border-ash-veil text-graphite hover:text-error hover:bg-error-container/30 transition-colors flex items-center justify-center gap-1"
      >
        <Icon name="logout" size={16} />
        退出登录
      </button>
    </div>
  );
}
