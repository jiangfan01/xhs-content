"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var navItems = [
    {
        label: "笔记采集",
        path: "/workspace/collection",
        icon: lucide_react_1.Library,
        description: "采集任务、笔记池、素材分组",
    },
    {
        label: "关键词采集",
        path: "/workspace/keyword-collection",
        icon: lucide_react_1.SearchCode,
        description: "公共关键词库、tab 结果、共享笔记池",
    },
    {
        label: "内容生成",
        path: "/workspace/generation",
        icon: lucide_react_1.Bot,
        description: "生成队列、策略配置、产出结果",
    },
];
function Sidebar() {
    return ((0, jsx_runtime_1.jsx)("aside", { className: "fixed bottom-0 left-0 top-16 z-30 hidden w-64 border-r border-[var(--border-light)] bg-[var(--bg-elevated)] lg:block", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full overflow-y-auto px-3 py-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "px-3 pb-3 text-[12px] font-semibold text-[var(--text-muted)]", children: "\u529F\u80FD\u83DC\u5355" }), (0, jsx_runtime_1.jsx)("nav", { className: "flex flex-col gap-1.5", children: navItems.map(function (item) { return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, { to: item.path, className: function (_a) {
                            var isActive = _a.isActive;
                            return "flex items-start gap-3 rounded-md px-3 py-3 no-underline transition-colors ".concat(isActive
                                ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary-solid)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)]");
                        }, children: [(0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border-light)] bg-white", children: (0, jsx_runtime_1.jsx)(item.icon, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-[14px] font-semibold text-[var(--text-heading)]", children: item.label }), (0, jsx_runtime_1.jsx)("span", { className: "mt-1 block text-[12px] leading-5 text-[var(--text-muted)]", children: item.description })] })] }, item.path)); }) })] }) }));
}
