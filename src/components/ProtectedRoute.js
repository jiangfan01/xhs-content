"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("~/contexts/useAuth");
function ProtectedRoute(_a) {
    var children = _a.children;
    var _b = (0, useAuth_1.useAuth)(), isAuthenticated = _b.isAuthenticated, isLoading = _b.isLoading;
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center", style: { backgroundColor: "var(--bg-default)" }, children: (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 border-[3px] rounded-full animate-spin", style: {
                    borderColor: "var(--border-light)",
                    borderTopColor: "var(--brand-primary-solid)",
                } }) }));
    }
    if (!isAuthenticated) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login", replace: true });
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
