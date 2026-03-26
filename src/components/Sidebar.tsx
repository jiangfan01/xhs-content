import { Bot, Library, SearchCode } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "笔记采集",
    path: "/workspace/collection",
    icon: Library,
    description: "采集任务、笔记池、素材分组",
  },
  {
    label: "关键词采集",
    path: "/workspace/keyword-collection",
    icon: SearchCode,
    description: "公共关键词库、tab 结果、共享笔记池",
  },
  {
    label: "内容生成",
    path: "/workspace/generation",
    icon: Bot,
    description: "生成队列、策略配置、产出结果",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 border-r border-[var(--border-light)] bg-[var(--bg-elevated)] lg:block">
      <div className="h-full overflow-y-auto px-3 py-4">
        <div className="px-3 pb-3 text-[12px] font-semibold text-[var(--text-muted)]">
          功能菜单
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-start gap-3 rounded-md px-3 py-3 no-underline transition-colors ${
                  isActive
                    ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary-solid)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)]"
                }`
              }
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border-light)] bg-white">
                <item.icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-[var(--text-heading)]">
                  {item.label}
                </span>
                <span className="mt-1 block text-[12px] leading-5 text-[var(--text-muted)]">
                  {item.description}
                </span>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
