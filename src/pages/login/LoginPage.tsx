/**
 * 公共登录页：spec 第 5 节
 * 国际主义风格：网格对齐、大量留白、直角、极少装饰
 */
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { useAuth } from "@/shared/auth/store";
import { cn } from "@/shared/utils/cn";

type Mode = "user" | "enterprise" | "admin";

export function LoginPage() {
  const [mode, setMode] = useState<Mode>("user");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [adminAccount, setAdminAccount] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const [counting, setCounting] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginAsUser, loginAsEnterprise, loginAsAdmin } = useAuth();

  const sendCode = () => {
    if (!/^1\d{10}$/.test(phone)) {
      setError("请输入正确的 11 位手机号");
      return;
    }
    setError(null);
    setCounting(60);
    const timer = setInterval(() => {
      setCounting((c) => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "admin") {
      if (!adminAccount || !adminPwd) {
        setError("请填写后台账号与密码");
        return;
      }
      setError(null);
      loginAsAdmin(adminAccount);
      navigate("/admin/dashboard", { replace: true });
      return;
    }
    if (!/^1\d{10}$/.test(phone)) {
      setError("请输入正确的 11 位手机号");
      return;
    }
    if (code.length !== 6) {
      setError("请输入 6 位验证码");
      return;
    }
    setError(null);
    if (mode === "user") {
      loginAsUser(phone);
      navigate("/u/home", { replace: true });
    } else {
      loginAsEnterprise(phone);
      navigate("/b/home", { replace: true });
    }
  };

  const isAdmin = mode === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center px-md py-xl bg-bone-cream">
      <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-2 gap-xl md:gap-lg items-start">
        {/* 左侧：品牌区 */}
        <div className="md:pr-xl md:border-r border-ash-veil">
          <h1 className="font-display text-display text-deep-char tracking-tight">
            领活派
          </h1>
          <p className="font-body text-body text-graphite mt-sm max-w-body">
            让每一次灵活就业都温厚有力
          </p>
          <div className="mt-xl space-y-md">
            <div className="flex items-start gap-sm">
              <span className="h-8 w-8 bg-bone-cream-dim border border-ash-veil flex items-center justify-center shrink-0">
                <Icon name="person" size={18} className="text-graphite" />
              </span>
              <div>
                <p className="text-title font-title text-deep-char">AI 智能匹配</p>
                <p className="text-body text-graphite mt-xs">基于能力画像，为你找到最合适的灵活用工岗位</p>
              </div>
            </div>
            <div className="flex items-start gap-sm">
              <span className="h-8 w-8 bg-bone-cream-dim border border-ash-veil flex items-center justify-center shrink-0">
                <Icon name="shield" size={18} className="text-graphite" />
              </span>
              <div>
                <p className="text-title font-title text-deep-char">双向保障</p>
                <p className="text-body text-graphite mt-xs">平台监管 + AI 初筛，让企业和劳动者都安心</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：表单区 */}
        <div>
          {/* Tab */}
          {!isAdmin ? (
            <div className="flex border-b border-ash-veil mb-lg">
              <button
                type="button"
                onClick={() => setMode("user")}
                className={cn(
                  "pb-sm mr-lg text-title font-title transition-colors",
                  mode === "user"
                    ? "text-deep-char border-b-2 border-deep-char"
                    : "text-graphite hover:text-deep-char",
                )}
              >
                个人端
              </button>
              <button
                type="button"
                onClick={() => setMode("enterprise")}
                className={cn(
                  "pb-sm mr-lg text-title font-title transition-colors",
                  mode === "enterprise"
                    ? "text-deep-char border-b-2 border-deep-char"
                    : "text-graphite hover:text-deep-char",
                )}
              >
                企业端
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-sm mb-lg pb-sm border-b border-ash-veil">
              <Icon name="admin_panel_settings" size={20} className="text-deep-char" />
              <h2 className="text-title font-title text-deep-char">平台管理后台</h2>
              <button
                type="button"
                onClick={() => setMode("user")}
                className="ml-auto text-label text-misty-slate hover:text-linghuo-amber"
              >
                返回
              </button>
            </div>
          )}

          <form onSubmit={submit} className="space-y-lg">
            {!isAdmin ? (
              <div className="space-y-lg">
                <Field
                  label="手机号码"
                  placeholder="请输入手机号"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  leadingIcon={<Icon name="smartphone" size={18} />}
                />
                <Field
                  label="验证码"
                  placeholder="6 位短信验证码"
                  type="text"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  leadingIcon={<Icon name="verified_user" size={18} />}
                  trailing={
                    <button
                      type="button"
                      onClick={sendCode}
                      disabled={counting > 0}
                      className="px-md h-11 border border-ash-veil text-graphite text-label font-medium hover:bg-bone-cream-dim transition-colors whitespace-nowrap disabled:cursor-not-allowed disabled:text-warm-ash"
                    >
                      {counting > 0 ? `${counting}s 后重发` : "获取验证码"}
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="space-y-lg">
                <Field
                  label="账号"
                  placeholder="平台内部账号"
                  value={adminAccount}
                  onChange={(e) => setAdminAccount(e.target.value)}
                  leadingIcon={<Icon name="badge" size={18} />}
                />
                <Field
                  label="密码"
                  placeholder="请输入密码"
                  type="password"
                  value={adminPwd}
                  onChange={(e) => setAdminPwd(e.target.value)}
                  leadingIcon={<Icon name="lock" size={18} />}
                />
              </div>
            )}

            {error ? <p className="text-label text-error">{error}</p> : null}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              {isAdmin ? "进入后台" : "登录 / 注册"}
            </Button>

            {!isAdmin ? (
              <p className="text-center text-label text-warm-ash">
                登录即代表你同意{" "}
                <a href="#" className="text-primary hover:underline">用户协议</a>
                {" "}与{" "}
                <a href="#" className="text-primary hover:underline">隐私政策</a>
              </p>
            ) : null}
          </form>

          {!isAdmin ? (
            <div className="mt-xl pt-md border-t border-ash-veil">
              <button
                type="button"
                onClick={() => setMode("admin")}
                className="inline-flex items-center gap-1 text-label text-graphite hover:text-deep-char transition-colors"
              >
                <Icon name="admin_panel_settings" size={16} />
                平台管理后台入口
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
