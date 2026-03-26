"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkspaceLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Topbar_1 = require("~/components/Topbar");
var Sidebar_1 = require("~/components/Sidebar");
function WorkspaceLayout() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-[var(--bg-default)]", children: [(0, jsx_runtime_1.jsx)(Topbar_1.default, {}), (0, jsx_runtime_1.jsx)(Sidebar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "lg:pl-64", children: (0, jsx_runtime_1.jsx)("main", { className: "min-h-screen px-4 pb-6 pt-[84px] md:px-6 md:pb-8 md:pt-[88px]", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) }) })] }));
}
