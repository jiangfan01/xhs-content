"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("~/contexts/useAuth");
require("./home.css");
var stats = [
    { value: "12K+", label: "日均采集笔记池" },
    { value: "4 步", label: "从采集到生成闭环" },
    { value: "82%", label: "素材命中率追踪" },
];
var features = [
    {
        icon: lucide_react_1.DatabaseZap,
        title: "自动采集对标笔记",
        description: "按关键词、场景词和竞品词批量抓取小红书内容，沉淀成可筛选的项目级采集池。",
    },
    {
        icon: lucide_react_1.ChartNoAxesCombined,
        title: "内容结构拆解",
        description: "从标题模式、开头钩子、情绪曲线到评论高频点，先提炼有效结构，再进入生成。",
    },
    {
        icon: lucide_react_1.Bot,
        title: "生成策略可编排",
        description: "按项目配置参考笔记、素材包、关键词和更新频率，让每轮生成遵循统一策略。",
    },
    {
        icon: lucide_react_1.ShieldCheck,
        title: "交付前质量兜底",
        description: "识别缺图、缺封面、素材风格不匹配等问题，把失败任务挂起，而不是悄悄产出废稿。",
    },
];
var workflow = [
    {
        index: "01",
        title: "采集",
        description: "把竞品、博主、关键词和评论反馈汇成项目采集池。",
    },
    {
        index: "02",
        title: "筛选",
        description: "在分组里挑出高价值参考笔记，控制本轮生成参考范围。",
    },
    {
        index: "03",
        title: "生成",
        description: "把素材、模板、风格约束和频率策略组合成自动化生产线。",
    },
    {
        index: "04",
        title: "交付",
        description: "结果进入内容池，异常任务回流到待补素材列表继续处理。",
    },
];
var boardItems = [
    { label: "采集分组", value: "6 组", meta: "品牌词 / 场景词 / 评论需求" },
    { label: "参考笔记", value: "63 篇", meta: "当前锁定 12 篇高相关内容" },
    { label: "生成队列", value: "18 篇", meta: "其中 4 篇封面同步生成" },
];
function HomePage() {
    var isAuthenticated = (0, useAuth_1.useAuth)().isAuthenticated;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "xhs-home", children: [(0, jsx_runtime_1.jsx)("div", { className: "xhs-home__orb xhs-home__orb--left" }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-home__orb xhs-home__orb--right" }), (0, jsx_runtime_1.jsxs)("header", { className: "xhs-home__nav", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/", className: "xhs-home__brand", children: [(0, jsx_runtime_1.jsx)("span", { className: "xhs-home__brand-mark", children: "C" }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "24CITY Content Engine" }), (0, jsx_runtime_1.jsx)("small", { children: "\u5C0F\u7EA2\u4E66\u91C7\u96C6\u4E0E\u7B14\u8BB0\u751F\u6210\u7CFB\u7EDF" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__nav-actions", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: isAuthenticated ? "/workspace" : "/login", className: "xhs-home__ghost-link", children: isAuthenticated ? "进入工作台" : "登录" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: isAuthenticated ? "/workspace" : "/login", className: "xhs-home__primary-link", children: isAuthenticated ? "打开内容引擎" : "立即体验" })] })] }), (0, jsx_runtime_1.jsxs)("main", { className: "xhs-home__main", children: [(0, jsx_runtime_1.jsxs)("section", { className: "xhs-home__hero", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__hero-copy", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__eyebrow", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 14 }), "\u91C7\u96C6\u9A71\u52A8\u7684\u5185\u5BB9\u751F\u4EA7"] }), (0, jsx_runtime_1.jsxs)("h1", { children: ["\u4E0D\u662F\u5355\u7EAF\u5199\u7B14\u8BB0\u3002", (0, jsx_runtime_1.jsx)("br", {}), "\u662F\u5148\u628A\u5C0F\u7EA2\u4E66\u5185\u5BB9\u6C60\u5EFA\u8D77\u6765\uFF0C\u518D\u7A33\u5B9A\u751F\u6210\u3002"] }), (0, jsx_runtime_1.jsx)("p", { className: "xhs-home__hero-text", children: "xhs-content \u7684\u6838\u5FC3\u4E0D\u662F\u4E00\u6B21\u6027 AI \u5199\u4F5C\uFF0C\u800C\u662F\u56F4\u7ED5\u9879\u76EE\u5236\u8FD0\u8425\uFF0C\u628A\u5BF9\u6807\u7B14\u8BB0\u91C7\u96C6\u3001\u7D20\u6750\u7BA1\u7406\u3001\u7B56\u7565\u914D\u7F6E\u548C\u6279\u91CF\u751F\u6210\u4E32\u6210\u4E00\u6761\u53EF\u6301\u7EED\u590D\u7528\u7684\u751F\u4EA7\u7EBF\u3002" }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__hero-actions", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: isAuthenticated ? "/workspace" : "/login", className: "xhs-home__cta xhs-home__cta--primary", children: [isAuthenticated ? "进入工作台" : "登录并开始", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] }), (0, jsx_runtime_1.jsx)("a", { href: "#workflow", className: "xhs-home__cta xhs-home__cta--ghost", children: "\u67E5\u770B\u4E1A\u52A1\u6D41\u7A0B" })] }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-home__stats", children: stats.map(function (item) { return ((0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__stat", children: [(0, jsx_runtime_1.jsx)("strong", { children: item.value }), (0, jsx_runtime_1.jsx)("span", { children: item.label })] }, item.label)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__hero-board", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__board-top", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "xhs-home__board-kicker", children: "\u9879\u76EE\u5FEB\u7167" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u80F6\u539F\u86CB\u767D\u996E\u4E3B\u9879\u76EE" })] }), (0, jsx_runtime_1.jsx)("span", { className: "xhs-home__live-pill", children: "AI \u81EA\u52A8\u751F\u6210\u4E2D" })] }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-home__board-grid", children: boardItems.map(function (item) { return ((0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__board-card", children: [(0, jsx_runtime_1.jsx)("span", { children: item.label }), (0, jsx_runtime_1.jsx)("strong", { children: item.value }), (0, jsx_runtime_1.jsx)("p", { children: item.meta })] }, item.label)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__board-flow", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__board-flow-head", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Workflow, { size: 18 }), (0, jsx_runtime_1.jsx)("span", { children: "\u672C\u8F6E\u751F\u6210\u94FE\u8DEF" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__flow-line", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5173\u952E\u8BCD\u91C7\u96C6" }), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u7B5B\u6389\u4F4E\u8D28\u91CF\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u5339\u914D\u7D20\u6750" }), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u8F93\u51FA\u5230\u5185\u5BB9\u6C60" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__note-preview", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__note-preview-head", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u6700\u65B0\u751F\u6210\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("span", { children: "09:11" })] }), (0, jsx_runtime_1.jsx)("h3", { children: "\u201C\u7A7A\u8179\u559D\u80F6\u539F\u86CB\u767D\u5230\u5E95\u6709\u6CA1\u6709\u7528\uFF1F\u201D\u771F\u5B9E\u4F53\u9A8C\u578B\u56FE\u6587\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4ECE 24 \u7BC7\u5019\u9009\u91CC\u7B5B\u51FA 6 \u7BC7\u9AD8\u76F8\u5173\u53C2\u8003\uFF0C\u5F53\u524D\u7248\u672C\u5DF2\u8865\u9F50\u5C01\u9762\u6807\u9898\u548C\u4EA7\u54C1\u5356\u70B9\u8282\u594F\uFF0C\u7B49\u5F85\u4EBA\u5DE5\u8FC7\u7A3F\u3002" })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "xhs-home__section", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__section-head", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u80FD\u529B\u7ED3\u6784" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u53C2\u8003 jike-geo \u7684\u4EA7\u54C1\u8868\u8FBE\uFF0C\u4F46\u66F4\u805A\u7126\u5185\u5BB9\u56E2\u961F\u7684\u5B9E\u9645\u751F\u4EA7\u52A8\u4F5C" })] }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-home__feature-grid", children: features.map(function (feature) { return ((0, jsx_runtime_1.jsxs)("article", { className: "xhs-home__feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "xhs-home__feature-icon", children: (0, jsx_runtime_1.jsx)(feature.icon, { size: 22 }) }), (0, jsx_runtime_1.jsx)("h3", { children: feature.title }), (0, jsx_runtime_1.jsx)("p", { children: feature.description })] }, feature.title)); }) })] }), (0, jsx_runtime_1.jsxs)("section", { id: "workflow", className: "xhs-home__section xhs-home__section--workflow", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__section-head", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E1A\u52A1\u95ED\u73AF" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u9996\u9875\u4E0D\u518D\u53EA\u662F\u767B\u5F55\u5F39\u6846\uFF0C\u800C\u662F\u628A\u8FD9\u5957\u4E1A\u52A1\u4E3A\u4EC0\u4E48\u6210\u7ACB\u8BF4\u6E05\u695A" })] }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-home__workflow-grid", children: workflow.map(function (item) { return ((0, jsx_runtime_1.jsxs)("article", { className: "xhs-home__workflow-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "xhs-home__workflow-index", children: item.index }), (0, jsx_runtime_1.jsx)("h3", { children: item.title }), (0, jsx_runtime_1.jsx)("p", { children: item.description })] }, item.index)); }) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "xhs-home__section xhs-home__section--split", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__story-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__story-head", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layers3, { size: 18 }), "\u9879\u76EE\u5236\u7BA1\u7406"] }), (0, jsx_runtime_1.jsx)("h2", { children: "\u6BCF\u4E2A\u9879\u76EE\u90FD\u7EF4\u62A4\u81EA\u5DF1\u7684\u53C2\u8003\u5E93\u3001\u7D20\u6750\u5305\u548C\u751F\u6210\u7B56\u7565" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4E0D\u628A\u6240\u6709\u7B14\u8BB0\u6DF7\u5728\u4E00\u4E2A\u5927\u6C60\u5B50\u91CC\uFF0C\u800C\u662F\u56F4\u7ED5\u5355\u4E2A\u54C1\u724C\u6216\u5355\u4E2A campaign \u53BB\u7EC4\u7EC7\u91C7\u96C6\u7ED3\u679C\uFF0C\u8FD9\u6837\u540E\u7EED\u751F\u6210\u98CE\u683C\u3001\u7D20\u6750\u548C\u53D1\u5E03\u8282\u594F\u624D\u80FD\u7A33\u5B9A\u3002" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__story-card xhs-home__story-card--dark", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-home__story-head", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { size: 18 }), "\u7ED3\u679C\u4E0D\u662F\u7EC8\u70B9"] }), (0, jsx_runtime_1.jsx)("h2", { children: "\u771F\u6B63\u91CD\u8981\u7684\u662F\u5931\u8D25\u4EFB\u52A1\u53EF\u8FFD\u8E2A\uFF0C\u7D20\u6750\u7F3A\u53E3\u53EF\u56DE\u8865" }), (0, jsx_runtime_1.jsx)("p", { children: "\u751F\u6210\u5931\u8D25\u3001\u7F3A\u56FE\u3001\u54C1\u724C\u7D20\u6750\u4E0D\u5339\u914D\uFF0C\u90FD\u8981\u56DE\u6D41\u5230\u4EFB\u52A1\u9762\u677F\u91CC\u7EE7\u7EED\u5904\u7406\uFF0C\u8FD9\u4E5F\u662F\u539F\u578B\u91CC\u90A3\u79CD\u5DE5\u4F5C\u53F0\u611F\u7684\u5173\u952E\u3002" })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "xhs-home__closing", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "xhs-home__closing-kicker", children: "\u51C6\u5907\u5F00\u59CB" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u628A\u9996\u9875\u3001\u767B\u5F55\u9875\u548C\u5DE5\u4F5C\u53F0\u7EDF\u4E00\u6210\u4E00\u5957\u5B8C\u6574\u4EA7\u54C1\u8BED\u8A00" }), (0, jsx_runtime_1.jsx)("p", { children: "\u73B0\u5728\u53EF\u4EE5\u4ECE\u4E1A\u52A1\u4ECB\u7ECD\u9875\u8FDB\u5165\u767B\u5F55\uFF0C\u518D\u8FDB\u5165\u65B0\u7684\u5185\u5BB9\u91C7\u96C6\u4E0E\u751F\u6210\u5DE5\u4F5C\u53F0\u3002" })] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: isAuthenticated ? "/workspace" : "/login", className: "xhs-home__cta xhs-home__cta--primary", children: [isAuthenticated ? "继续使用" : "登录体验", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] })] })] })] }));
}
