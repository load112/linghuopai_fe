/**
 * AI 面试会话页：
 * - 报名后自动创建（spec），不做「开始面试」二级动作
 * - 不展示题数上限/剩余题数
 * - 中断恢复，按题恢复
 */
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { api } from "@/api/client";
import type { ScreeningSession, ScreeningTurn } from "@/api/types";
import { cn } from "@/shared/utils/cn";

export function ScreeningPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<ScreeningSession | null>(null);
  const [turns, setTurns] = useState<ScreeningTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;
    api.screening.getSession(sessionId).then((res) => {
      setSession(res.data);
      setTurns(res.data.turns);
      setDone(res.data.status === "COMPLETED");
      setLoading(false);
    });
  }, [sessionId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, thinking]);

  const submit = () => {
    const value = draft.trim();
    if (!value || thinking || done || !session) return;
    setTurns((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: value },
    ]);
    setDraft("");
    setThinking(true);
    const round = turns.filter((t) => t.role === "user").length + 1;
    api.screening.reply(session.sessionId, { text: value }, round).then((res) => {
      setTurns((prev) => [...prev, ...res.data.turns.slice(-1)]);
      setDone(res.data.status === "COMPLETED");
      setThinking(false);
    });
  };

  if (loading || !session) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg animate-pulse">
        <div className="lg:col-span-2 h-[70vh] bg-bone-cream-dim border border-ash-veil" />
        <div className="h-48 bg-bone-cream-dim border border-ash-veil" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
      <Card className="lg:col-span-2 flex flex-col h-[60vh] md:h-[70vh]">
        <header className="px-md md:px-lg py-md border-b border-ash-veil flex items-center justify-between gap-sm">
          <div className="flex items-center gap-sm">
            <span className="h-9 w-9 border border-ash-veil bg-bone-cream-dim text-linghuo-amber flex items-center justify-center">
              <Icon name="smart_toy" filled size={18} />
            </span>
            <div>
              <h2 className="font-title text-title text-deep-char">
                智能初筛 · {session.taskTitle}
              </h2>
              <p className="text-label text-graphite">
                可随时离开页面，回来时会接着上一题继续
              </p>
            </div>
          </div>
          <Badge tone={done ? "graphite" : "amber"}>
            <Icon name={done ? "task_alt" : "play_circle"} size={12} filled />
            {done ? "面试已完成" : "面试进行中"}
          </Badge>
        </header>

        <div className="flex-1 overflow-y-auto px-md md:px-lg py-md space-y-md no-scrollbar">
          {turns.map((t) => (
            <div
              key={t.id}
              className={cn(
                "flex gap-sm",
                t.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {t.role === "ai" ? (
                <span className="h-8 w-8 shrink-0 border border-ash-veil bg-bone-cream-dim text-linghuo-amber flex items-center justify-center">
                  <Icon name="smart_toy" size={16} filled />
                </span>
              ) : null}
              <div
                className={cn(
                  "max-w-[75%] px-md py-sm text-body leading-relaxed",
                  t.role === "ai"
                    ? "bg-bone-cream-dim border border-ash-veil text-deep-char"
                    : "bg-linghuo-amber text-white",
                )}
              >
                {t.text}
              </div>
            </div>
          ))}
          {thinking ? (
            <div className="flex gap-sm">
              <span className="h-8 w-8 border border-ash-veil bg-bone-cream-dim text-linghuo-amber flex items-center justify-center">
                <Icon name="smart_toy" size={16} filled />
              </span>
              <div className="px-md py-sm bg-bone-cream-dim border border-ash-veil text-graphite text-label">
                正在记录…
              </div>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="px-md md:px-lg py-md border-t border-ash-veil space-y-sm">
          {done ? (
            <div className="flex flex-col md:flex-row md:items-center gap-md">
              <p className="text-body text-graphite max-w-body">
                你已完成本次面试。是否确认把结果交给企业方？决定权仍在你这里。
              </p>
              <div className="flex gap-sm md:ml-auto">
                <Button variant="ghost" onClick={() => navigate("/u/applications")}>
                  以后再说
                </Button>
                <Button
                  onClick={() => navigate("/u/applications")}
                >
                  <Icon name="task_alt" size={18} />
                  确认投递
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex flex-col md:flex-row gap-sm"
            >
              <textarea
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="你的回答…回车发送，Shift + 回车换行"
                className="flex-1 px-md py-sm bg-bone-cream-dim border border-ash-veil text-body placeholder:text-warm-ash focus:border-linghuo-amber focus:ring-1 focus:ring-linghuo-amber outline-none resize-none"
              />
              <Button type="submit" disabled={!draft.trim() || thinking}>
                <Icon name="arrow_upward" size={18} />
                发送
              </Button>
            </form>
          )}
          <p className="text-label text-warm-ash">
            说明：本次面试仅生成报告供企业方参考；你的画像与正式资料不会被自动改写。
          </p>
        </div>
      </Card>

      <aside className="space-y-lg">
        <Card tone="warm" className="p-md md:p-lg">
          <h3 className="font-title text-title text-deep-char">这次面试关于</h3>
          <p className="text-body text-deep-char mt-sm font-medium">
            {session.taskTitle}
          </p>
          <p className="text-label text-graphite mt-1">{session.publisher}</p>
          <div className="mt-md flex flex-wrap gap-xs">
            {session.tags.map((tag) => (
              <Badge key={tag} tone="graphite">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
        <Card className="p-md md:p-lg">
          <h3 className="font-title text-title text-deep-char">几条小约定</h3>
          <ul className="mt-md space-y-sm text-body text-graphite">
            <li className="flex items-start gap-sm">
              <Icon name="bolt" size={16} className="text-linghuo-amber mt-0.5" />
              不限时；想清楚再答
            </li>
            <li className="flex items-start gap-sm">
              <Icon name="undo" size={16} className="text-misty-slate mt-0.5" />
              退出后回来，按题接着续
            </li>
            <li className="flex items-start gap-sm">
              <Icon name="lock" size={16} className="text-graphite mt-0.5" />
              报告仅企业可见，你看不到原文
            </li>
          </ul>
        </Card>
      </aside>
    </div>
  );
}
