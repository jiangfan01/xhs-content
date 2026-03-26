"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var ProtectedRoute_1 = require("~/components/ProtectedRoute");
var WorkspaceLayout_1 = require("~/layouts/WorkspaceLayout");
var Collection_1 = require("~/pages/Collection");
var Generation_1 = require("~/pages/Generation");
var Home_1 = require("~/pages/Home");
var KeywordCollection_1 = require("~/pages/KeywordCollection");
var Login_1 = require("~/pages/Login");
function App() {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.default, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/workspace", element: (0, jsx_runtime_1.jsx)(ProtectedRoute_1.default, { children: (0, jsx_runtime_1.jsx)(WorkspaceLayout_1.default, {}) }), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/workspace/collection", replace: true }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "collection", element: (0, jsx_runtime_1.jsx)(Collection_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "keyword-collection", element: (0, jsx_runtime_1.jsx)(KeywordCollection_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "generation", element: (0, jsx_runtime_1.jsx)(Generation_1.default, {}) })] })] }));
}
exports.default = App;
