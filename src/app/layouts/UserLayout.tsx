/**
 * 个人端布局：
 * - Mobile：顶部 AppBar（带消息中心）+ 底部 Tab
 * - Pad/PC：顶部 AppBar（带消息中心）+ 顶部主导航
 */
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { useAuth } from "@/shared/auth/store";
import { cn } from "@/shared/utils/cn";
import { MessageCenter } from "@/features/user-message-center/MessageCenter";

const tabs = [
  { to: "/u/home", label: "首页", icon: "home" },
  { to: "/u/tasks", label: "任务大厅", icon: "work_outline" },
  { to: "/u/assistant", label: "AI助手", icon: "smart_toy" },
  { to: "/u/me", label: "我的", icon: "person" },
] as const;

const pageTitles: Record<string, string> = {
  "/u/home": "首页",
  "/u/tasks": "任务大厅",
  "/u/assistant": "AI 助手",
  "/u/me": "我的",
};

export function UserLayout() {
  const { session, logout } = useAuth();
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname];

  return (
    <div className="min-h-screen flex flex-col bg-bone-cream text-deep-char">
      <header className="sticky top-0 z-40 bg-bone-cream border-b border-ash-veil">
        <div className="max-w-screen-xl mx-auto h-16 px-md md:px-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center bg-linghuo-amber text-white">
              <Icon name="local_fire_department" filled size={20} />
            </span>
            <div>
              <h1 className="font-headline text-title tracking-tight text-deep-char leading-tight">
                领活派
              </h1>
              <p className="text-label text-warm-ash leading-none mt-0.5">
                让每一次灵活就业都温厚有力
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  cn(
                    "relative px-md py-sm text-body font-medium transition-all flex items-center gap-2",
                    isActive
                      ? "text-deep-char"
                      : "text-graphite hover:text-deep-char hover:bg-bone-cream-dim/60",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon name={tab.icon} size={18} filled={isActive} />
                    {tab.label}
                    {isActive ? (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-linghuo-amber" />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MessageCenter />
            <button
              type="button"
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-label text-graphite hover:text-deep-char hover:bg-bone-cream-dim transition-colors"
            >
              <Icon name="logout" size={16} />
              退出
            </button>
            <span className="hidden md:inline-flex items-center justify-center h-9 w-9 bg-bone-cream-dim text-label font-medium text-deep-char border border-ash-veil">
              {session?.realm === "user" ? session.nickname.slice(0, 1) : "U"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-12">
        <div className="max-w-screen-xl mx-auto px-md md:px-lg pt-md md:pt-lg">
          {pageTitle ? (
            <h1 className="font-headline text-pageTitle text-deep-char mb-md">
              {pageTitle}
            </h1>
          ) : null}
          <Outlet key={location.pathname} />
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bone-cream border-t border-ash-veil pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-2 gap-0.5 text-label",
                  isActive ? "text-deep-char font-medium" : "text-graphite",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={tab.icon} filled size={22} />
                  <span className="leading-none">{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
