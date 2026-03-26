"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Topbar;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("~/contexts/useAuth");
var ThemeToggle_1 = require("./ThemeToggle");
function Topbar() {
    var _this = this;
    var _a = (0, useAuth_1.useAuth)(), user = _a.user, logout = _a.logout;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logout()];
                case 1:
                    _a.sent();
                    navigate("/", { replace: true });
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("header", { className: "fixed inset-x-0 top-0 z-40 h-16 border-b border-[var(--border-light)] bg-[var(--bg-default)] shadow-[0_1px_0_rgba(15,23,42,0.04)]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-full items-center justify-between px-4 lg:pl-6 lg:pr-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-3", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/workspace/collection", className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand-gradient)] text-[16px] font-bold text-white no-underline", children: "C" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-[16px] font-semibold text-[var(--text-heading)]", children: "\u5185\u5BB9\u5DE5\u4F5C\u53F0" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden rounded bg-[var(--brand-primary-light)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-primary-solid)] md:inline-flex", children: "XHS" })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-[12px] text-[var(--text-muted)]", children: "\u5C0F\u7EA2\u4E66\u7B14\u8BB0\u91C7\u96C6\u4E0E\u5185\u5BB9\u751F\u6210\u540E\u53F0" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 md:gap-3", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/", className: "hidden items-center gap-1 rounded-md border border-[var(--border-light)] bg-white px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] no-underline hover:text-[var(--text-heading)] lg:inline-flex", children: ["\u4EA7\u54C1\u9996\u9875", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, { size: 14 })] }), (0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 rounded-md border border-[var(--border-light)] bg-white px-2 py-1.5", children: [(user === null || user === void 0 ? void 0 : user.avatar) ? ((0, jsx_runtime_1.jsx)("img", { src: user.avatar, alt: user.nickName, className: "h-7 w-7 rounded-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-7 w-7 items-center justify-center rounded-full", style: { background: "var(--brand-gradient)" }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { size: 14, color: "white" }) })), (0, jsx_runtime_1.jsx)("span", { className: "hidden max-w-24 truncate text-[13px] font-medium text-[var(--text-primary)] sm:inline", children: (user === null || user === void 0 ? void 0 : user.nickName) || "用户" })] }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleLogout, className: "flex cursor-pointer items-center gap-1.5 rounded-md border border-[var(--border-light)] bg-white px-3 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-heading)]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 15 }), "\u9000\u51FA"] })] })] }) }));
}
