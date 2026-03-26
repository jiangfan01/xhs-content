import { ArrowUpRight, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "~/contexts/useAuth";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[var(--border-light)] bg-[var(--bg-elevated)] shadow-[0_1px_0_rgba(102,56,41,0.06)]">
      <div className="flex h-full items-center justify-between px-4 lg:pl-6 lg:pr-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/workspace/collection"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand-gradient)] text-[16px] font-bold text-white no-underline"
          >
            C
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-[16px] font-semibold text-[var(--text-heading)]">
                内容工作台
              </span>
              <span className="hidden rounded bg-[var(--brand-primary-light)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-primary-solid)] md:inline-flex">
                XHS
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12px] text-[var(--text-muted)]">
              小红书笔记采集与内容生成后台
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/"
            className="hidden items-center gap-1 rounded-md border border-[var(--border-light)] bg-[var(--bg-card)] px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] no-underline hover:bg-[var(--interactive-hover)] hover:text-[var(--text-heading)] lg:inline-flex"
          >
            产品首页
            <ArrowUpRight size={14} />
          </Link>

          <ThemeToggle />

          <div className="flex items-center gap-2 rounded-md border border-[var(--border-light)] bg-[var(--bg-card)] px-2 py-1.5">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.nickName}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "var(--brand-gradient)" }}
              >
                <User size={14} color="white" />
              </div>
            )}
            <span className="hidden max-w-24 truncate text-[13px] font-medium text-[var(--text-primary)] sm:inline">
              {user?.nickName || "用户"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--border-light)] bg-[var(--bg-card)] px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-heading)]"
          >
            <LogOut size={15} />
            退出
          </button>
        </div>
      </div>
    </header>
  );
}
